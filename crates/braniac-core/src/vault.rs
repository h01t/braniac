use std::collections::{HashMap, HashSet};
use std::path::{Component, Path, PathBuf};

use braniac_types::{HistoryEntry, KnowledgeDocument, VaultFileEntry, VaultManifest};
use chrono::{DateTime, Utc};
use git2::{Repository, Signature};
use parking_lot::Mutex;
use regex::Regex;
use walkdir::WalkDir;

use crate::error::{BraniacError, Result};
use crate::vault_scan::{content_hash, VaultDocumentScan, VaultRevision};

const ALLOWED_PREFIXES: &[&str] = &["concepts/", "entities/", "sources/", "events/", "papers/"];

#[derive(Debug, Clone)]
pub enum VaultWriteOp {
    Write { path: String, content: String },
    Delete { path: String },
}

#[derive(Debug, Clone)]
pub struct VaultBatchResult {
    pub committed: bool,
    pub touched_paths: Vec<String>,
}

/// Prior file content: `Some` = existed, `None` = did not exist.
type VaultBatchSnapshot = HashMap<String, Option<String>>;

lazy_static::lazy_static! {
    static ref WIKILINK_RE: Regex = Regex::new(r"\[\[([^\]]+)\]\]").unwrap();
}

pub struct VaultResolver {
    vaults_root: PathBuf,
    open_vaults: Mutex<HashSet<String>>,
}

impl VaultResolver {
    pub fn new(vaults_root: PathBuf) -> Self {
        Self {
            vaults_root,
            open_vaults: Mutex::new(HashSet::new()),
        }
    }

    pub fn vaults_root(&self) -> &Path {
        &self.vaults_root
    }

    pub fn resolve_vault_path(&self, vault_id: &str) -> Result<PathBuf> {
        validate_vault_id(vault_id)?;
        let path = self.vaults_root.join(vault_id);
        Ok(path)
    }

    pub fn resolve_document_path(&self, vault_id: &str, rel_path: &str) -> Result<PathBuf> {
        validate_vault_id(vault_id)?;
        let vault_path = self.resolve_vault_path(vault_id)?;
        let normalized = normalize_relative_path(rel_path)?;
        validate_document_path(&normalized)?;
        let full = vault_path.join(&normalized);
        ensure_within_vault(&vault_path, &full)?;
        Ok(full)
    }

    pub fn list_vaults(&self) -> Result<Vec<VaultManifest>> {
        std::fs::create_dir_all(&self.vaults_root)?;
        let mut manifests = Vec::new();
        for entry in std::fs::read_dir(&self.vaults_root)? {
            let entry = entry?;
            if !entry.file_type()?.is_dir() {
                continue;
            }
            let id = entry.file_name().to_string_lossy().to_string();
            if id.starts_with('.') {
                continue;
            }
            let root_path = entry.path();
            let document_count = count_markdown_files(&root_path)?;
            manifests.push(VaultManifest {
                id: id.clone(),
                name: id,
                root_path: root_path.to_string_lossy().to_string(),
                document_count,
                last_opened_at: None,
            });
        }
        manifests.sort_by(|a, b| a.id.cmp(&b.id));
        Ok(manifests)
    }

    pub fn open_vault(&self, vault_id: &str) -> Result<VaultManifest> {
        let vault_path = self.resolve_vault_path(vault_id)?;
        if !vault_path.exists() {
            std::fs::create_dir_all(&vault_path)?;
        }
        init_git_repo(&vault_path)?;
        self.open_vaults.lock().insert(vault_id.to_string());
        let document_count = count_markdown_files(&vault_path)?;
        Ok(VaultManifest {
            id: vault_id.to_string(),
            name: vault_id.to_string(),
            root_path: vault_path.to_string_lossy().to_string(),
            document_count,
            last_opened_at: Some(Utc::now()),
        })
    }

    pub fn list_files(&self, vault_id: &str) -> Result<Vec<VaultFileEntry>> {
        let vault_path = self.resolve_vault_path(vault_id)?;
        let mut files = Vec::new();
        if !vault_path.exists() {
            return Ok(files);
        }
        for entry in WalkDir::new(&vault_path)
            .into_iter()
            .filter_map(|e| e.ok())
            .filter(|e| e.file_type().is_file())
        {
            let rel = entry
                .path()
                .strip_prefix(&vault_path)
                .map_err(|e| BraniacError::Vault(e.to_string()))?;
            let rel_str = rel.to_string_lossy().replace('\\', "/");
            if rel_str.contains("/.git/") || rel_str.starts_with(".git/") {
                continue;
            }
            if !rel_str.ends_with(".md") {
                continue;
            }
            files.push(VaultFileEntry {
                name: entry.file_name().to_string_lossy().to_string(),
                path: rel_str,
                entry_type: "file".into(),
            });
        }
        files.sort_by(|a, b| a.path.cmp(&b.path));
        Ok(files)
    }

    pub fn read_document(&self, vault_id: &str, rel_path: &str) -> Result<KnowledgeDocument> {
        let full = self.resolve_document_path(vault_id, rel_path)?;
        if !full.exists() {
            return Err(BraniacError::NotFound(rel_path.into()));
        }
        let content = std::fs::read_to_string(&full)?;
        let modified_at = full
            .metadata()
            .ok()
            .and_then(|m| m.modified().ok())
            .map(DateTime::<Utc>::from);
        let title = content
            .lines()
            .find(|l| l.starts_with("# "))
            .map(|l| l.trim_start_matches("# ").to_string());
        Ok(KnowledgeDocument {
            path: rel_path.replace('\\', "/"),
            title,
            content,
            modified_at,
        })
    }

    pub fn write_document(
        &self,
        vault_id: &str,
        rel_path: &str,
        content: &str,
        message: &str,
    ) -> Result<()> {
        let full = self.resolve_document_path(vault_id, rel_path)?;
        if let Some(parent) = full.parent() {
            std::fs::create_dir_all(parent)?;
        }
        std::fs::write(&full, content)?;
        commit_file(&self.resolve_vault_path(vault_id)?, rel_path, message)?;
        Ok(())
    }

    pub fn delete_document(&self, vault_id: &str, rel_path: &str, message: &str) -> Result<()> {
        let full = self.resolve_document_path(vault_id, rel_path)?;
        if !full.exists() {
            return Err(BraniacError::NotFound(rel_path.into()));
        }
        std::fs::remove_file(&full)?;
        let repo = Repository::open(&self.resolve_vault_path(vault_id)?)?;
        let mut index = repo.index()?;
        index.remove_path(Path::new(rel_path))?;
        index.write()?;
        let tree_id = index.write_tree()?;
        let tree = repo.find_tree(tree_id)?;
        let head = repo.head()?.peel_to_commit()?;
        let sig = default_signature(&repo)?;
        repo.commit(Some("HEAD"), &sig, &sig, message, &tree, &[&head])?;
        Ok(())
    }

    pub fn is_worktree_dirty(&self, vault_id: &str) -> Result<bool> {
        let repo = Repository::open(&self.resolve_vault_path(vault_id)?)?;
        is_worktree_dirty(&repo)
    }

    pub fn apply_batch(
        &self,
        vault_id: &str,
        ops: &[VaultWriteOp],
        message: &str,
    ) -> Result<VaultBatchResult> {
        if ops.is_empty() {
            return Ok(VaultBatchResult {
                committed: false,
                touched_paths: Vec::new(),
            });
        }

        let mut touched_paths = Vec::with_capacity(ops.len());
        let mut snapshot: VaultBatchSnapshot = HashMap::new();

        for op in ops {
            let path = match op {
                VaultWriteOp::Write { path, .. } | VaultWriteOp::Delete { path } => path,
            };
            self.resolve_document_path(vault_id, path)?;
            if !snapshot.contains_key(path) {
                let prior = self.read_document(vault_id, path).ok().map(|d| d.content);
                snapshot.insert(path.clone(), prior);
            }
            if !touched_paths.contains(path) {
                touched_paths.push(path.clone());
            }
        }

        let vault_path = self.resolve_vault_path(vault_id)?;
        let mut written_paths: Vec<String> = Vec::new();
        let mut deleted_paths: Vec<String> = Vec::new();

        let apply_result: Result<()> = (|| {
            for op in ops {
                match op {
                    VaultWriteOp::Write { path, content } => {
                        let full = self.resolve_document_path(vault_id, path)?;
                        if let Some(parent) = full.parent() {
                            std::fs::create_dir_all(parent)?;
                        }
                        std::fs::write(&full, content)?;
                        written_paths.push(path.clone());
                    }
                    VaultWriteOp::Delete { path } => {
                        let full = self.resolve_document_path(vault_id, path)?;
                        if !full.exists() {
                            return Err(BraniacError::NotFound(path.clone()));
                        }
                        std::fs::remove_file(&full)?;
                        deleted_paths.push(path.clone());
                    }
                }
            }
            let mut commit_paths = written_paths.clone();
            commit_paths.extend(deleted_paths.iter().cloned());
            commit_files(&vault_path, &commit_paths, message)?;
            Ok(())
        })();

        if let Err(e) = apply_result {
            restore_batch_snapshot(self, vault_id, &snapshot)?;
            return Err(e);
        }

        Ok(VaultBatchResult {
            committed: true,
            touched_paths,
        })
    }

    pub fn current_head_hash(&self, vault_id: &str) -> Result<String> {
        Ok(self.vault_revision(vault_id)?.head_hash)
    }

    pub fn vault_revision(&self, vault_id: &str) -> Result<VaultRevision> {
        let repo = Repository::open(&self.resolve_vault_path(vault_id)?)?;
        let head = repo.head()?.peel_to_commit()?;
        let worktree_dirty = is_worktree_dirty(&repo)?;
        Ok(VaultRevision {
            head_hash: head.id().to_string(),
            worktree_dirty,
        })
    }

    pub fn scan_documents(
        &self,
        vault_id: &str,
        include_content: bool,
    ) -> Result<Vec<VaultDocumentScan>> {
        let files = self.list_files(vault_id)?;
        let mut scans = Vec::with_capacity(files.len());
        for file in &files {
            let doc = self.read_document(vault_id, &file.path)?;
            let title = doc
                .title
                .clone()
                .unwrap_or_else(|| file.name.clone());
            let hash = content_hash(&doc.content);
            scans.push(VaultDocumentScan {
                path: file.path.clone(),
                title,
                content_hash: hash,
                content: if include_content {
                    Some(doc.content)
                } else {
                    None
                },
            });
        }
        Ok(scans)
    }

    pub fn files_changed_since(&self, vault_id: &str, from_hash: &str) -> Result<Vec<String>> {
        let repo = Repository::open(&self.resolve_vault_path(vault_id)?)?;
        let from = repo.find_commit(parse_oid(from_hash)?)?;
        let to = repo.head()?.peel_to_commit()?;
        if from.id() == to.id() {
            return Ok(Vec::new());
        }
        let diff = repo.diff_tree_to_tree(Some(&from.tree()?), Some(&to.tree()?), None)?;
        let mut paths = Vec::new();
        diff.foreach(
            &mut |_, _| true,
            None,
            None,
            Some(&mut |delta, _, _| {
                if let Some(path) = delta
                    .new_file()
                    .path()
                    .or_else(|| delta.old_file().path())
                {
                    paths.push(path.to_string_lossy().replace('\\', "/"));
                }
                true
            }),
        )?;
        paths.sort();
        paths.dedup();
        Ok(paths)
    }

    pub fn reset_hard(&self, vault_id: &str, commit_hash: &str) -> Result<()> {
        let repo = Repository::open(&self.resolve_vault_path(vault_id)?)?;
        let commit = repo.find_commit(parse_oid(commit_hash)?)?;
        let object = commit.as_object();
        repo.reset(object, git2::ResetType::Hard, None)?;
        Ok(())
    }

    pub fn history_log(&self, vault_id: &str) -> Result<Vec<HistoryEntry>> {
        let repo = Repository::open(&self.resolve_vault_path(vault_id)?)?;
        let mut revwalk = repo.revwalk()?;
        revwalk.push_head()?;
        let mut entries = Vec::new();
        for oid in revwalk {
            let oid = oid?;
            let commit = repo.find_commit(oid)?;
            entries.push(HistoryEntry {
                hash: oid.to_string(),
                message: commit.message().unwrap_or("").to_string(),
                date: commit.time().seconds().to_string(),
            });
        }
        Ok(entries)
    }

    pub fn history_diff(&self, vault_id: &str, from_hash: &str, to_hash: &str) -> Result<String> {
        let repo = Repository::open(&self.resolve_vault_path(vault_id)?)?;
        let from = repo.find_commit(parse_oid(from_hash)?)?;
        let to = repo.find_commit(parse_oid(to_hash)?)?;
        let from_tree = from.tree()?;
        let to_tree = to.tree()?;
        let diff = repo.diff_tree_to_tree(Some(&from_tree), Some(&to_tree), None)?;
        let mut output = String::new();
        diff.print(git2::DiffFormat::Patch, |_delta, _hunk, line| {
            output.push_str(std::str::from_utf8(line.content()).unwrap_or(""));
            true
        })?;
        Ok(output)
    }

    pub fn parse_wikilinks(content: &str) -> Vec<String> {
        WIKILINK_RE
            .captures_iter(content)
            .filter_map(|cap| cap.get(1).map(|m| m.as_str().trim().to_string()))
            .collect()
    }

    pub fn import_vault_from(&self, source: &Path, vault_id: &str) -> Result<VaultManifest> {
        validate_vault_id(vault_id)?;
        let dest = self.resolve_vault_path(vault_id)?;
        if dest.exists() {
            return Err(BraniacError::Vault(format!(
                "vault already exists: {vault_id}"
            )));
        }
        copy_dir_recursive(source, &dest)?;
        init_git_repo(&dest)?;
        self.open_vault(vault_id)
    }
}

pub fn validate_vault_id(vault_id: &str) -> Result<()> {
    if vault_id.is_empty()
        || vault_id.contains("..")
        || vault_id.contains('/')
        || vault_id.contains('\\')
        || vault_id.starts_with('.')
    {
        return Err(BraniacError::PathTraversal(vault_id.into()));
    }
    Ok(())
}

pub fn normalize_relative_path(rel_path: &str) -> Result<String> {
    let path = Path::new(rel_path);
    let mut normalized = PathBuf::new();
    for component in path.components() {
        match component {
            Component::ParentDir => {
                return Err(BraniacError::PathTraversal(rel_path.into()));
            }
            Component::Normal(part) => normalized.push(part),
            Component::CurDir => {}
            Component::RootDir | Component::Prefix(_) => {
                return Err(BraniacError::PathTraversal(rel_path.into()));
            }
        }
    }
    Ok(normalized.to_string_lossy().replace('\\', "/"))
}

pub fn validate_document_path(rel_path: &str) -> Result<()> {
    if rel_path.is_empty() || !rel_path.ends_with(".md") {
        return Err(BraniacError::InvalidInput(
            "document path must end with .md".into(),
        ));
    }
    if ALLOWED_PREFIXES.iter().any(|p| rel_path.starts_with(p)) || rel_path == "index.md" {
        return Ok(());
    }
    Err(BraniacError::InvalidInput(format!(
        "path must start with one of {:?} or be index.md",
        ALLOWED_PREFIXES
    )))
}

fn ensure_within_vault(vault_root: &Path, target: &Path) -> Result<()> {
    ensure_within_parent(vault_root, target)
}

pub fn ensure_within_parent(parent: &Path, target: &Path) -> Result<()> {
    let parent = parent
        .canonicalize()
        .unwrap_or_else(|_| parent.to_path_buf());
    let resolved = if target.exists() {
        target.canonicalize()?
    } else {
        let parent_of_target = target
            .parent()
            .and_then(|p| p.canonicalize().ok())
            .unwrap_or_else(|| parent.clone());
        parent_of_target.join(
            target
                .file_name()
                .unwrap_or_else(|| std::ffi::OsStr::new("")),
        )
    };
    if !resolved.starts_with(&parent) {
        return Err(BraniacError::PathTraversal(
            resolved.display().to_string(),
        ));
    }
    Ok(())
}

fn count_markdown_files(root: &Path) -> Result<u64> {
    if !root.exists() {
        return Ok(0);
    }
    let count = WalkDir::new(root)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| e.file_type().is_file())
        .filter(|e| e.path().extension().is_some_and(|ext| ext == "md"))
        .count() as u64;
    Ok(count)
}

fn init_git_repo(vault_path: &Path) -> Result<()> {
    if vault_path.join(".git").exists() {
        return Ok(());
    }
    let repo = Repository::init(vault_path)?;
    let sig = default_signature(&repo)?;
    if !vault_path.join("index.md").exists() {
        std::fs::write(vault_path.join("index.md"), "# Knowledge Vault\n\nInitial commit.")?;
    }
    let mut index = repo.index()?;
    index.add_all(["*"].iter(), git2::IndexAddOption::DEFAULT, None)?;
    index.write()?;
    let tree_id = index.write_tree()?;
    let tree = repo.find_tree(tree_id)?;
    repo.commit(Some("HEAD"), &sig, &sig, "Initial vault", &tree, &[])?;
    Ok(())
}

fn commit_file(vault_path: &Path, rel_path: &str, message: &str) -> Result<()> {
    commit_files(vault_path, &[rel_path.to_string()], message)
}

fn commit_files(vault_path: &Path, rel_paths: &[String], message: &str) -> Result<()> {
    let repo = Repository::open(vault_path)?;
    let mut index = repo.index()?;
    for rel_path in rel_paths {
        let path = Path::new(rel_path);
        let full = vault_path.join(rel_path);
        if full.exists() {
            index.add_path(path)?;
        } else {
            index.remove_path(path)?;
        }
    }
    index.write()?;
    let tree_id = index.write_tree()?;
    let tree = repo.find_tree(tree_id)?;
    let parent = repo.head().ok().and_then(|h| h.peel_to_commit().ok());
    let sig = default_signature(&repo)?;
    let parents: Vec<&git2::Commit> = parent.iter().collect();
    repo.commit(Some("HEAD"), &sig, &sig, message, &tree, &parents)?;
    Ok(())
}

fn restore_batch_snapshot(
    vault: &VaultResolver,
    vault_id: &str,
    snapshot: &VaultBatchSnapshot,
) -> Result<()> {
    for (path, prior) in snapshot {
        let full = vault.resolve_document_path(vault_id, path)?;
        match prior {
            Some(content) => {
                if let Some(parent) = full.parent() {
                    std::fs::create_dir_all(parent)?;
                }
                std::fs::write(&full, content)?;
            }
            None => {
                if full.exists() {
                    std::fs::remove_file(&full)?;
                }
            }
        }
    }
    Ok(())
}

fn default_signature(_repo: &Repository) -> Result<Signature<'_>> {
    Ok(Signature::now("Braniac", "braniac@local")?)
}

fn parse_oid(hash: &str) -> Result<git2::Oid> {
    git2::Oid::from_str(hash).map_err(BraniacError::Git)
}

fn copy_dir_recursive(src: &Path, dest: &Path) -> Result<()> {
    std::fs::create_dir_all(dest)?;
    for entry in WalkDir::new(src).into_iter().filter_map(|e| e.ok()) {
        let rel = entry.path().strip_prefix(src).unwrap();
        let target = dest.join(rel);
        if entry.file_type().is_dir() {
            if entry.file_name() == ".git" {
                continue;
            }
            std::fs::create_dir_all(&target)?;
        } else if entry.file_type().is_file() {
            if let Some(parent) = target.parent() {
                std::fs::create_dir_all(parent)?;
            }
            std::fs::copy(entry.path(), &target)?;
        }
    }
    Ok(())
}

fn is_worktree_dirty(repo: &Repository) -> Result<bool> {
    let mut opts = git2::StatusOptions::new();
    opts.include_untracked(true);
    opts.include_ignored(false);
    let statuses = repo.statuses(Some(&mut opts))?;
    Ok(statuses.iter().any(|entry| entry.path() != Some(".lint-cache.json")))
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn rejects_path_traversal() {
        assert!(normalize_relative_path("../secrets.md").is_err());
        assert!(validate_vault_id("../x").is_err());
    }

    #[test]
    fn vault_read_write_round_trip() {
        let root = tempdir().unwrap();
        let resolver = VaultResolver::new(root.path().to_path_buf());
        resolver.open_vault("test").unwrap();
        resolver
            .write_document(
                "test",
                "concepts/demo.md",
                "# Demo\n\nHello",
                "add demo",
            )
            .unwrap();
        let doc = resolver.read_document("test", "concepts/demo.md").unwrap();
        assert!(doc.content.contains("Hello"));
    }

    #[test]
    fn git_history_after_write() {
        let root = tempdir().unwrap();
        let resolver = VaultResolver::new(root.path().to_path_buf());
        resolver.open_vault("test").unwrap();
        resolver
            .write_document("test", "concepts/a.md", "# A", "first")
            .unwrap();
        resolver
            .write_document("test", "concepts/b.md", "# B", "second")
            .unwrap();
        let history = resolver.history_log("test").unwrap();
        assert!(history.len() >= 2);
    }

    #[test]
    fn batch_write_commits_once() {
        let root = tempdir().unwrap();
        let resolver = VaultResolver::new(root.path().to_path_buf());
        resolver.open_vault("test").unwrap();
        let ops = vec![
            VaultWriteOp::Write {
                path: "concepts/a.md".into(),
                content: "# A\n".into(),
            },
            VaultWriteOp::Write {
                path: "concepts/b.md".into(),
                content: "# B\n".into(),
            },
        ];
        resolver.apply_batch("test", &ops, "batch add").unwrap();
        let history = resolver.history_log("test").unwrap();
        assert!(history.first().unwrap().message.contains("batch add"));
        assert!(resolver.read_document("test", "concepts/a.md").is_ok());
        assert!(resolver.read_document("test", "concepts/b.md").is_ok());
    }

    #[test]
    fn batch_write_rollback_on_failure() {
        let root = tempdir().unwrap();
        let resolver = VaultResolver::new(root.path().to_path_buf());
        resolver.open_vault("test").unwrap();
        resolver
            .write_document("test", "concepts/keep.md", "# Keep\n", "init")
            .unwrap();
        let ops = vec![
            VaultWriteOp::Write {
                path: "concepts/new.md".into(),
                content: "# New\n".into(),
            },
            VaultWriteOp::Delete {
                path: "concepts/missing.md".into(),
            },
        ];
        assert!(resolver.apply_batch("test", &ops, "should fail").is_err());
        assert!(resolver.read_document("test", "concepts/keep.md").is_ok());
        assert!(resolver.read_document("test", "concepts/new.md").is_err());
    }
}
