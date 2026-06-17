use std::collections::{HashMap, HashSet};
use std::sync::Arc;

use braniac_types::{ApplyLintResult, DocumentPatch, IngestRequest, JobEvent, LintFix, LintResult};
use parking_lot::Mutex;
use uuid::Uuid;

use crate::ai::{AiProviderAdapter, LINT_SYSTEM_PROMPT, INGEST_SYSTEM_PROMPT};
use crate::error::{BraniacError, Result};
use crate::extract::prepare_source;
use crate::job_parsers::{parse_file_tags, parse_lint_output};
use crate::job_patches::{apply_document_patches, rollback_document_patches};
use crate::lint_cache::{read_lint_cache, update_cache_after_lint, write_lint_cache, LintCache, CACHE_VERSION};
use crate::vault::{VaultResolver, VaultWriteOp};
use crate::vault_scan::VaultRevision;

const MAX_LINT_CORPUS_BYTES: usize = 500_000;

struct VaultJobScope<'a> {
    jobs: &'a JobManager,
    vault_id: String,
    job_id: Uuid,
}

impl<'a> VaultJobScope<'a> {
    fn new(jobs: &'a JobManager, vault_id: String, job_id: Uuid) -> Self {
        Self {
            jobs,
            vault_id,
            job_id,
        }
    }
}

impl Drop for VaultJobScope<'_> {
    fn drop(&mut self) {
        *self.jobs.active_job.lock() = None;
        self.jobs.cancel_flags.lock().remove(&self.job_id);
        self.jobs.end_vault_job(&self.vault_id, self.job_id);
    }
}

pub struct JobManager {
    cancel_flags: Arc<Mutex<HashMap<Uuid, bool>>>,
    patches: Arc<Mutex<HashMap<Uuid, Vec<DocumentPatch>>>>,
    lint_results: Arc<Mutex<HashMap<Uuid, LintResult>>>,
    active_job: Arc<Mutex<Option<Uuid>>>,
    active_vault_jobs: Arc<Mutex<HashMap<String, Uuid>>>,
}

impl Default for JobManager {
    fn default() -> Self {
        Self::new()
    }
}

impl JobManager {
    pub fn new() -> Self {
        Self {
            cancel_flags: Arc::new(Mutex::new(HashMap::new())),
            patches: Arc::new(Mutex::new(HashMap::new())),
            lint_results: Arc::new(Mutex::new(HashMap::new())),
            active_job: Arc::new(Mutex::new(None)),
            active_vault_jobs: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub fn active_job_id(&self) -> Option<Uuid> {
        *self.active_job.lock()
    }

    pub fn cancel(&self, job_id: Uuid) -> Result<()> {
        self.cancel_flags.lock().insert(job_id, true);
        Ok(())
    }

    pub fn is_cancelled(&self, job_id: Uuid) -> bool {
        self.cancel_flags.lock().get(&job_id).copied().unwrap_or(false)
    }

    pub fn take_patches(&self, job_id: Uuid) -> Option<Vec<DocumentPatch>> {
        self.patches.lock().remove(&job_id)
    }

    pub fn get_lint_result(&self, job_id: Uuid) -> Option<LintResult> {
        self.lint_results.lock().get(&job_id).cloned()
    }

    pub fn take_lint_result(&self, job_id: Uuid) -> Option<LintResult> {
        self.lint_results.lock().remove(&job_id)
    }

    pub fn clear_job_state(&self, job_id: Uuid) {
        self.lint_results.lock().remove(&job_id);
        self.cancel_flags.lock().remove(&job_id);
        let mut vault_jobs = self.active_vault_jobs.lock();
        vault_jobs.retain(|_, id| *id != job_id);
    }

    fn begin_vault_job(&self, vault_id: &str, job_id: Uuid) -> Result<()> {
        let mut vault_jobs = self.active_vault_jobs.lock();
        if let Some(existing) = vault_jobs.get(vault_id) {
            if *existing != job_id {
                return Err(BraniacError::Job(format!(
                    "vault {vault_id} already has an active job"
                )));
            }
        }
        vault_jobs.insert(vault_id.to_string(), job_id);
        Ok(())
    }

    fn end_vault_job(&self, vault_id: &str, job_id: Uuid) {
        let mut vault_jobs = self.active_vault_jobs.lock();
        if vault_jobs.get(vault_id) == Some(&job_id) {
            vault_jobs.remove(vault_id);
        }
    }

    pub async fn run_ingest(
        &self,
        vaults: &Mutex<VaultResolver>,
        adapter: &dyn AiProviderAdapter,
        request: IngestRequest,
        mut on_event: impl FnMut(JobEvent) + Send,
    ) -> Result<Uuid> {
        let job_id = Uuid::new_v4();
        self.begin_vault_job(&request.vault_id, job_id)?;
        self.cancel_flags.lock().insert(job_id, false);
        *self.active_job.lock() = Some(job_id);
        let _scope = VaultJobScope::new(self, request.vault_id.clone(), job_id);

        {
            let vault = vaults.lock();
            if vault.is_worktree_dirty(&request.vault_id)? {
                return Err(BraniacError::Job(
                    "vault has uncommitted changes; commit or discard them before ingest".into(),
                ));
            }
        }

        on_event(JobEvent::Started { job_id });

        let result: Result<Uuid> = async {
            if self.is_cancelled(job_id) {
                on_event(JobEvent::Cancelled { job_id });
                return Ok(job_id);
            }

            on_event(JobEvent::Progress {
                job_id,
                message: "Extracting source".into(),
                percent: Some(10),
            });

            let prepared = prepare_source(&request)?;

            if self.is_cancelled(job_id) {
                on_event(JobEvent::Cancelled { job_id });
                return Ok(job_id);
            }

            on_event(JobEvent::Progress {
                job_id,
                message: "Calling provider".into(),
                percent: Some(40),
            });

            let user_prompt = format!(
                "Source: {}\n\n---\n\n{}",
                prepared.label, prepared.text
            );
            let output = adapter.complete(INGEST_SYSTEM_PROMPT, &user_prompt).await?;

            if self.is_cancelled(job_id) {
                on_event(JobEvent::Cancelled { job_id });
                return Ok(job_id);
            }

            on_event(JobEvent::Chunk {
                job_id,
                content: output.clone(),
            });

            let patches = {
                let vault = vaults.lock();
                parse_file_tags(&output, &vault, &request.vault_id)?
            };

            on_event(JobEvent::Progress {
                job_id,
                message: "Applying patches".into(),
                percent: Some(80),
            });

            {
                let vault = vaults.lock();
                self.apply_patches(&vault, &request.vault_id, &patches)?;
            }

            self.patches.lock().insert(job_id, patches);
            on_event(JobEvent::PatchReady {
                job_id,
                patches: self.patches.lock().get(&job_id).cloned().unwrap_or_default(),
            });
            on_event(JobEvent::Completed { job_id });
            Ok(job_id)
        }
        .await;

        if let Err(ref e) = result {
            on_event(JobEvent::Failed {
                job_id,
                error: e.to_string(),
            });
        }

        result
    }

    pub async fn run_lint(
        &self,
        vaults: &Mutex<VaultResolver>,
        adapter: &dyn AiProviderAdapter,
        vault_id: &str,
        mut on_event: impl FnMut(JobEvent) + Send,
    ) -> Result<Uuid> {
        let job_id = Uuid::new_v4();
        self.begin_vault_job(vault_id, job_id)?;
        self.cancel_flags.lock().insert(job_id, false);
        *self.active_job.lock() = Some(job_id);
        let _scope = VaultJobScope::new(self, vault_id.to_string(), job_id);
        on_event(JobEvent::Started { job_id });

        let result: Result<Uuid> = async {
            on_event(JobEvent::Progress {
                job_id,
                message: "Reading vault".into(),
                percent: Some(10),
            });

            let lint_plan = {
                let vault = vaults.lock();
                let vault_path = vault.resolve_vault_path(vault_id)?;
                let revision = vault.vault_revision(vault_id)?;
                let scans = vault.scan_documents(vault_id, true)?;
                let cache = read_lint_cache(&vault_path);
                let cache_commit_hash = cache.as_ref().map(|c| c.commit_hash.clone());
                let file_hashes: HashMap<String, String> = scans
                    .iter()
                    .map(|s| (s.path.clone(), s.content_hash.clone()))
                    .collect();

                let use_cache = !revision.worktree_dirty
                    && cache.as_ref().is_some_and(|c| {
                        c.commit_hash == revision.head_hash && !c.worktree_dirty
                    });

                let (changed_paths, from_cache) = if revision.worktree_dirty {
                    (None, false)
                } else if let Some(ref c) = cache {
                    if !use_cache {
                        (None, false)
                    } else if c.commit_hash != revision.head_hash {
                        match vault.files_changed_since(vault_id, &c.commit_hash) {
                            Ok(paths) => (
                                Some(paths.into_iter().collect::<HashSet<String>>()),
                                true,
                            ),
                            Err(_) => (None, false),
                        }
                    } else {
                        (Some(HashSet::new()), true)
                    }
                } else {
                    (None, false)
                };

                let mut skipped_count = 0usize;
                let mut skipped_healthy = Vec::new();
                let mut corpus_parts = Vec::new();
                let md_paths: Vec<String> = scans.iter().map(|s| s.path.clone()).collect();

                if scans.is_empty() {
                    LintPlan {
                        empty_vault: true,
                        corpus: String::new(),
                        skipped_count: 0,
                        skipped_healthy,
                        md_paths,
                        from_cache,
                        cache,
                        cache_commit_hash,
                        revision,
                        file_hashes,
                    }
                } else {
                    for scan in &scans {
                        if let Some(ref changed) = changed_paths {
                            if !changed.contains(&scan.path) {
                                let can_skip = cache
                                    .as_ref()
                                    .and_then(|c| c.file_statuses.get(&scan.path))
                                    .map(|s| {
                                        s.healthy
                                            && !s.content_hash.is_empty()
                                            && s.content_hash == scan.content_hash
                                    })
                                    .unwrap_or(false);
                                if can_skip {
                                    skipped_healthy.push(scan.path.clone());
                                    skipped_count += 1;
                                    continue;
                                }
                            }
                        }
                        if let Some(ref content) = scan.content {
                            corpus_parts.push(format!(
                                "<file path=\"{}\">\n{}\n</file>",
                                scan.path, content
                            ));
                        }
                    }

                    LintPlan {
                        empty_vault: false,
                        corpus: corpus_parts.join("\n\n"),
                        skipped_count,
                        skipped_healthy,
                        md_paths,
                        from_cache,
                        cache,
                        cache_commit_hash,
                        revision,
                        file_hashes,
                    }
                }
            };

            if lint_plan.empty_vault {
                let lint = LintResult {
                    report: "The vault is empty. Nothing to lint.".into(),
                    fixes: Vec::new(),
                    from_cache: false,
                    skipped_count: 0,
                    cache_commit_hash: None,
                    current_commit_hash: Some(lint_plan.revision.head_hash.clone()),
                };
                self.lint_results.lock().insert(job_id, lint);
                on_event(JobEvent::Completed { job_id });
                return Ok(job_id);
            }

            if lint_plan.corpus.is_empty() && lint_plan.skipped_count > 0 {
                let lint = LintResult {
                    report: format!(
                        "✅ All {} files were unchanged since the last checkpoint and previously marked healthy. Nothing new to lint.",
                        lint_plan.skipped_count
                    ),
                    fixes: Vec::new(),
                    from_cache: true,
                    skipped_count: lint_plan.skipped_count,
                    cache_commit_hash: lint_plan.cache_commit_hash,
                    current_commit_hash: Some(lint_plan.revision.head_hash.clone()),
                };
                self.lint_results.lock().insert(job_id, lint);
                on_event(JobEvent::Completed { job_id });
                return Ok(job_id);
            }

            if lint_plan.corpus.len() > MAX_LINT_CORPUS_BYTES {
                return Err(BraniacError::Job(format!(
                    "vault too large for one-pass lint ({} bytes, {} files); reduce vault size or lint in smaller batches",
                    lint_plan.corpus.len(),
                    lint_plan.md_paths.len()
                )));
            }

            on_event(JobEvent::Progress {
                job_id,
                message: "Calling lint model".into(),
                percent: Some(50),
            });

            let cache_note = if lint_plan.from_cache && lint_plan.skipped_count > 0 {
                format!(
                    "> **Checkpoint active**: {} previously-healthy unchanged files were skipped. Only changed or previously-flagged files are included below.\n\n",
                    lint_plan.skipped_count
                )
            } else {
                String::new()
            };

            let user = format!(
                "{cache_note}<vault id=\"{vault_id}\">\n{}\n</vault>",
                lint_plan.corpus
            );
            let output = adapter.complete(LINT_SYSTEM_PROMPT, &user).await?;
            on_event(JobEvent::Chunk {
                job_id,
                content: output.clone(),
            });

            let mut lint = parse_lint_output(&output, job_id);
            lint.from_cache = lint_plan.from_cache;
            lint.skipped_count = lint_plan.skipped_count;
            lint.cache_commit_hash = lint_plan.cache_commit_hash.clone();
            lint.current_commit_hash = Some(lint_plan.revision.head_hash.clone());

            {
                let vault = vaults.lock();
                let vault_path = vault.resolve_vault_path(vault_id)?;
                let base_cache = lint_plan.cache.unwrap_or_else(|| LintCache {
                    version: CACHE_VERSION,
                    ..Default::default()
                });
                let updated = update_cache_after_lint(
                    base_cache,
                    &lint_plan.md_paths,
                    &lint_plan.skipped_healthy,
                    &lint.fixes,
                    &lint_plan.revision,
                    &lint_plan.file_hashes,
                );
                write_lint_cache(&vault_path, &updated)?;
            }

            self.lint_results.lock().insert(job_id, lint);
            on_event(JobEvent::Completed { job_id });
            Ok(job_id)
        }
        .await;

        if let Err(ref e) = result {
            on_event(JobEvent::Failed {
                job_id,
                error: e.to_string(),
            });
        }

        result
    }

    pub fn apply_lint(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        lint: &LintResult,
    ) -> Result<usize> {
        Ok(self
            .apply_lint_fixes(vault, vault_id, &lint.fixes)
            .applied)
    }

    pub fn apply_lint_fixes_by_ids(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        lint: &LintResult,
        fix_ids: &[String],
    ) -> ApplyLintResult {
        let mut fixes = Vec::with_capacity(fix_ids.len());
        let mut errors = Vec::new();
        for id in fix_ids {
            match lint.fixes.iter().find(|f| f.id == *id) {
                Some(fix) => fixes.push(fix.clone()),
                None => errors.push(format!("unknown fix id: {id}")),
            }
        }
        if !errors.is_empty() {
            return ApplyLintResult {
                applied: 0,
                errors,
                index_warning: None,
            };
        }
        self.apply_lint_fixes(vault, vault_id, &fixes)
    }

    pub fn apply_lint_fixes(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        fixes: &[LintFix],
    ) -> ApplyLintResult {
        let mut errors = Vec::new();
        let mut ops = Vec::with_capacity(fixes.len());

        for fix in fixes {
            if let Err(e) = vault.resolve_document_path(vault_id, &fix.path) {
                errors.push(format!("{}: {e}", fix.path));
                continue;
            }
            let exists = vault.read_document(vault_id, &fix.path).is_ok();
            match fix.action.as_str() {
                "delete" => {
                    if !exists {
                        errors.push(format!("{}: not found", fix.path));
                        continue;
                    }
                    ops.push(VaultWriteOp::Delete {
                        path: fix.path.clone(),
                    });
                }
                "update" => {
                    if !exists {
                        errors.push(format!("{}: not found", fix.path));
                        continue;
                    }
                    let content = fix.content.clone().unwrap_or_default();
                    if content.is_empty() {
                        errors.push(format!("{}: empty content", fix.path));
                        continue;
                    }
                    ops.push(VaultWriteOp::Write {
                        path: fix.path.clone(),
                        content,
                    });
                }
                "create" => {
                    if exists {
                        errors.push(format!("{}: target already exists", fix.path));
                        continue;
                    }
                    let content = fix.content.clone().unwrap_or_default();
                    if content.is_empty() {
                        errors.push(format!("{}: empty content", fix.path));
                        continue;
                    }
                    ops.push(VaultWriteOp::Write {
                        path: fix.path.clone(),
                        content,
                    });
                }
                other => errors.push(format!("{}: unknown lint action: {other}", fix.path)),
            }
        }

        if !errors.is_empty() {
            return ApplyLintResult {
                applied: 0,
                errors,
                index_warning: None,
            };
        }

        if ops.is_empty() {
            return ApplyLintResult {
                applied: 0,
                errors: Vec::new(),
                index_warning: None,
            };
        }

        let message = format!("lint apply ({} fixes)", ops.len());
        match vault.apply_batch(vault_id, &ops, &message) {
            Ok(_) => ApplyLintResult {
                applied: ops.len(),
                errors: Vec::new(),
                index_warning: None,
            },
            Err(e) => ApplyLintResult {
                applied: 0,
                errors: vec![e.to_string()],
                index_warning: None,
            },
        }
    }

    pub fn apply_patches(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        patches: &[DocumentPatch],
    ) -> Result<()> {
        apply_document_patches(vault, vault_id, patches)
    }

    pub fn rollback_patches(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        patches: &[DocumentPatch],
    ) -> Result<()> {
        rollback_document_patches(vault, vault_id, patches)
    }
}

struct LintPlan {
    empty_vault: bool,
    corpus: String,
    skipped_count: usize,
    skipped_healthy: Vec<String>,
    md_paths: Vec<String>,
    from_cache: bool,
    cache: Option<LintCache>,
    cache_commit_hash: Option<String>,
    revision: VaultRevision,
    file_hashes: HashMap<String, String>,
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ai::MockAiAdapter;
    use tempfile::tempdir;

    #[tokio::test]
    async fn ingest_produces_and_applies_patches() {
        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        let jobs = JobManager::new();
        let adapter = MockAiAdapter;
        let mut events = Vec::new();
        let job_id = jobs
            .run_ingest(
                &vault,
                &adapter,
                IngestRequest {
                    vault_id: "v".into(),
                    source_url: None,
                    text: Some("hello".into()),
                    file_path: None,
                },
                |e| events.push(e),
            )
            .await
            .unwrap();
        assert!(events.iter().any(|e| matches!(e, JobEvent::Completed { .. })));
        let files = vault.lock().list_files("v").unwrap();
        assert!(files.iter().any(|f| f.path == "concepts/generated.md"));
        let _ = jobs.take_patches(job_id);
    }

    #[tokio::test]
    async fn lint_parses_fixes() {
        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        vault
            .lock()
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();
        let jobs = JobManager::new();
        let job_id = jobs
            .run_lint(&vault, &MockAiAdapter, "v", |_| {})
            .await
            .unwrap();
        let lint = jobs.take_lint_result(job_id).unwrap();
        assert!(!lint.fixes.is_empty());
    }

    #[test]
    fn cancel_flag_works() {
        let jobs = JobManager::new();
        let job_id = Uuid::new_v4();
        jobs.cancel(job_id).unwrap();
        assert!(jobs.is_cancelled(job_id));
    }

    #[tokio::test]
    async fn apply_lint_fixes_selected_subset() {
        let dir = tempdir().unwrap();
        let vault = VaultResolver::new(dir.path().to_path_buf());
        vault.open_vault("v").unwrap();
        vault
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();
        vault
            .write_document("v", "concepts/b.md", "# B\n", "init")
            .unwrap();
        let jobs = JobManager::new();
        let fixes = [
            LintFix {
                id: "job:0".into(),
                path: "concepts/a.md".into(),
                action: "update".into(),
                reason: "update a".into(),
                content: Some("# A updated\n".into()),
            },
            LintFix {
                id: "job:1".into(),
                path: "concepts/b.md".into(),
                action: "update".into(),
                reason: "update b".into(),
                content: Some("# B updated\n".into()),
            },
        ];
        let result = jobs.apply_lint_fixes(&vault, "v", &[fixes[0].clone()]);
        assert_eq!(result.applied, 1);
        assert!(result.errors.is_empty());
        let doc = vault.read_document("v", "concepts/a.md").unwrap();
        assert!(doc.content.contains("updated"));
        let doc_b = vault.read_document("v", "concepts/b.md").unwrap();
        assert_eq!(doc_b.content, "# B\n");
    }

    #[tokio::test]
    async fn clear_job_state_removes_cached_results() {
        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        vault
            .lock()
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();
        let jobs = JobManager::new();
        let job_id = jobs
            .run_lint(&vault, &MockAiAdapter, "v", |_| {})
            .await
            .unwrap();
        assert!(jobs.get_lint_result(job_id).is_some());
        jobs.clear_job_state(job_id);
        assert!(jobs.get_lint_result(job_id).is_none());
    }

    #[tokio::test]
    async fn stale_lint_cache_commit_falls_back_to_full_scan() {
        use crate::lint_cache::{write_lint_cache, LintCache, LintFileStatus};

        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        vault
            .lock()
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();

        let vault_path = vault.lock().resolve_vault_path("v").unwrap();
        let cache = LintCache {
            commit_hash: "c215dd1a0a9f803edda305861e0bcd087eb1d0b7".into(),
            file_statuses: [(
                "concepts/a.md".into(),
                LintFileStatus {
                    healthy: true,
                    issues: Vec::new(),
                    last_checked: "now".into(),
                    content_hash: String::new(),
                },
            )]
            .into_iter()
            .collect(),
            ..Default::default()
        };
        write_lint_cache(&vault_path, &cache).unwrap();

        let jobs = JobManager::new();
        let job_id = jobs
            .run_lint(&vault, &MockAiAdapter, "v", |_| {})
            .await
            .expect("stale cache hash should not abort lint");
        let lint = jobs.take_lint_result(job_id).unwrap();
        assert!(!lint.from_cache);
        assert!(!lint.fixes.is_empty());
    }

    #[tokio::test]
    async fn same_commit_relint_skips_healthy_files_only() {
        use crate::lint_cache::{write_lint_cache, LintCache, LintFileStatus};

        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        vault
            .lock()
            .write_document("v", "concepts/healthy.md", "# Healthy\n", "init")
            .unwrap();
        vault
            .lock()
            .write_document("v", "concepts/flagged.md", "# Flagged\n", "init")
            .unwrap();

        let head = vault.lock().current_head_hash("v").unwrap();
        let vault_path = vault.lock().resolve_vault_path("v").unwrap();
        use crate::vault_scan::content_hash;
        let cache = LintCache {
            commit_hash: head.clone(),
            file_statuses: [
                (
                    "concepts/healthy.md".into(),
                    LintFileStatus {
                        healthy: true,
                        issues: Vec::new(),
                        last_checked: "now".into(),
                        content_hash: content_hash("# Healthy\n"),
                    },
                ),
                (
                    "concepts/flagged.md".into(),
                    LintFileStatus {
                        healthy: false,
                        issues: vec!["needs format".into()],
                        last_checked: "now".into(),
                        content_hash: content_hash("# Flagged\n"),
                    },
                ),
            ]
            .into_iter()
            .collect(),
            ..Default::default()
        };
        write_lint_cache(&vault_path, &cache).unwrap();

        let jobs = JobManager::new();
        let job_id = jobs
            .run_lint(&vault, &MockAiAdapter, "v", |_| {})
            .await
            .unwrap();
        let lint = jobs.take_lint_result(job_id).unwrap();

        assert_eq!(lint.skipped_count, 1);
        assert!(lint.from_cache);
    }

    #[tokio::test]
    async fn same_commit_all_healthy_exits_without_llm_proposals() {
        use crate::lint_cache::{write_lint_cache, LintCache, LintFileStatus};

        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        vault
            .lock()
            .write_document("v", "concepts/healthy.md", "# Healthy\n", "init")
            .unwrap();

        let head = vault.lock().current_head_hash("v").unwrap();
        let vault_path = vault.lock().resolve_vault_path("v").unwrap();
        let scans = vault.lock().scan_documents("v", false).unwrap();
        let file_statuses = scans
            .into_iter()
            .map(|scan| {
                (
                    scan.path,
                    LintFileStatus {
                        healthy: true,
                        issues: Vec::new(),
                        last_checked: "now".into(),
                        content_hash: scan.content_hash,
                    },
                )
            })
            .collect();
        let cache = LintCache {
            commit_hash: head,
            file_statuses,
            ..Default::default()
        };
        write_lint_cache(&vault_path, &cache).unwrap();

        let jobs = JobManager::new();
        let job_id = jobs
            .run_lint(&vault, &MockAiAdapter, "v", |_| {})
            .await
            .unwrap();
        let lint = jobs.take_lint_result(job_id).unwrap();

        assert!(lint.fixes.is_empty());
        assert!(lint.from_cache);
        assert!(lint.report.contains("Nothing new to lint"));
    }

    #[tokio::test]
    async fn lint_jobs_cannot_cross_apply_fixes() {
        let dir = tempdir().unwrap();
        let vault = VaultResolver::new(dir.path().to_path_buf());
        vault.open_vault("v").unwrap();
        vault
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();

        let job_a = Uuid::new_v4();
        let job_b = Uuid::new_v4();
        let jobs = JobManager::new();
        let fix = LintFix {
            id: format!("{job_a}:0"),
            path: "concepts/a.md".into(),
            action: "update".into(),
            reason: "update a".into(),
            content: Some("# A updated\n".into()),
        };
        jobs.lint_results.lock().insert(
            job_a,
            LintResult {
                report: "report".into(),
                fixes: vec![fix],
                from_cache: false,
                skipped_count: 0,
                cache_commit_hash: None,
                current_commit_hash: None,
            },
        );
        jobs.lint_results.lock().insert(
            job_b,
            LintResult {
                report: "report".into(),
                fixes: vec![LintFix {
                    id: format!("{job_b}:0"),
                    path: "concepts/a.md".into(),
                    action: "update".into(),
                    reason: "other".into(),
                    content: Some("# B updated\n".into()),
                }],
                from_cache: false,
                skipped_count: 0,
                cache_commit_hash: None,
                current_commit_hash: None,
            },
        );

        let lint_a = jobs.get_lint_result(job_a).unwrap();
        let wrong = jobs.apply_lint_fixes_by_ids(&vault, "v", &lint_a, &[format!("{job_b}:0")]);
        assert_eq!(wrong.applied, 0);
        assert!(!wrong.errors.is_empty());

        let right = jobs.apply_lint_fixes_by_ids(&vault, "v", &lint_a, &[format!("{job_a}:0")]);
        assert_eq!(right.applied, 1);
    }

    #[test]
    fn create_update_delete_semantics_are_enforced() {
        let dir = tempdir().unwrap();
        let vault = VaultResolver::new(dir.path().to_path_buf());
        vault.open_vault("v").unwrap();
        vault
            .write_document("v", "concepts/existing.md", "# Existing\n", "init")
            .unwrap();
        let jobs = JobManager::new();

        let create_existing = jobs.apply_lint_fixes(
            &vault,
            "v",
            &[LintFix {
                id: "1".into(),
                path: "concepts/existing.md".into(),
                action: "create".into(),
                reason: "dup".into(),
                content: Some("# New\n".into()),
            }],
        );
        assert_eq!(create_existing.applied, 0);

        let update_missing = jobs.apply_lint_fixes(
            &vault,
            "v",
            &[LintFix {
                id: "2".into(),
                path: "concepts/missing.md".into(),
                action: "update".into(),
                reason: "missing".into(),
                content: Some("# Missing\n".into()),
            }],
        );
        assert_eq!(update_missing.applied, 0);

        let delete_missing = jobs.apply_lint_fixes(
            &vault,
            "v",
            &[LintFix {
                id: "3".into(),
                path: "concepts/missing.md".into(),
                action: "delete".into(),
                reason: "missing".into(),
                content: None,
            }],
        );
        assert_eq!(delete_missing.applied, 0);
    }

    #[tokio::test]
    async fn rejected_concurrent_job_preserves_active_job() {
        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();

        let jobs = JobManager::new();
        let first = Uuid::new_v4();
        jobs.begin_vault_job("v", first).unwrap();
        jobs.cancel_flags.lock().insert(first, false);
        *jobs.active_job.lock() = Some(first);

        let second = jobs
            .run_ingest(
                &vault,
                &MockAiAdapter,
                IngestRequest {
                    vault_id: "v".into(),
                    source_url: None,
                    text: Some("hello".into()),
                    file_path: None,
                },
                |_| {},
            )
            .await;
        assert!(second.is_err());
        assert_eq!(jobs.active_job_id(), Some(first));
    }

    #[tokio::test]
    async fn ingest_rejects_dirty_vault_without_touching_files() {
        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        vault
            .lock()
            .write_document("v", "concepts/user.md", "# User edit\n", "user")
            .unwrap();
        let vault_path = vault.lock().resolve_vault_path("v").unwrap();
        std::fs::write(
            vault_path.join("concepts/uncommitted.md"),
            "# Uncommitted\n",
        )
        .unwrap();

        let jobs = JobManager::new();
        let err = jobs
            .run_ingest(
                &vault,
                &MockAiAdapter,
                IngestRequest {
                    vault_id: "v".into(),
                    source_url: None,
                    text: Some("hello".into()),
                    file_path: None,
                },
                |_| {},
            )
            .await
            .unwrap_err();
        assert!(err.to_string().contains("uncommitted changes"));
        assert!(vault
            .lock()
            .read_document("v", "concepts/uncommitted.md")
            .is_ok());
        assert!(!vault
            .lock()
            .list_files("v")
            .unwrap()
            .iter()
            .any(|f| f.path == "concepts/generated.md"));
    }

    #[test]
    fn lint_batch_apply_is_all_or_nothing_on_prevalidation_failure() {
        let dir = tempdir().unwrap();
        let vault = VaultResolver::new(dir.path().to_path_buf());
        vault.open_vault("v").unwrap();
        vault
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();
        let jobs = JobManager::new();
        let result = jobs.apply_lint_fixes(
            &vault,
            "v",
            &[
                LintFix {
                    id: "1".into(),
                    path: "concepts/a.md".into(),
                    action: "update".into(),
                    reason: "ok".into(),
                    content: Some("# A updated\n".into()),
                },
                LintFix {
                    id: "2".into(),
                    path: "concepts/missing.md".into(),
                    action: "update".into(),
                    reason: "bad".into(),
                    content: Some("# Missing\n".into()),
                },
            ],
        );
        assert_eq!(result.applied, 0);
        let doc = vault.read_document("v", "concepts/a.md").unwrap();
        assert_eq!(doc.content, "# A\n");
    }
}
