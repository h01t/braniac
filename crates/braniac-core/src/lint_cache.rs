use std::collections::HashMap;
use std::path::Path;

use braniac_types::LintFix;
use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::error::{BraniacError, Result};
use crate::vault_scan::VaultRevision;

const LINT_CACHE_FILE: &str = ".lint-cache.json";
pub const CACHE_VERSION: u32 = 2;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct LintFileStatus {
    pub healthy: bool,
    pub issues: Vec<String>,
    pub last_checked: String,
    #[serde(default)]
    pub content_hash: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct LintCache {
    pub version: u32,
    pub timestamp: String,
    pub commit_hash: String,
    #[serde(default)]
    pub worktree_dirty: bool,
    pub file_statuses: HashMap<String, LintFileStatus>,
}

impl Default for LintCache {
    fn default() -> Self {
        Self {
            version: CACHE_VERSION,
            timestamp: String::new(),
            commit_hash: String::new(),
            worktree_dirty: false,
            file_statuses: HashMap::new(),
        }
    }
}

pub fn read_lint_cache(vault_path: &Path) -> Option<LintCache> {
    let file_path = vault_path.join(LINT_CACHE_FILE);
    let raw = std::fs::read_to_string(file_path).ok()?;
    let cache: LintCache = serde_json::from_str(&raw).ok()?;
    if cache.version < CACHE_VERSION {
        return None;
    }
    Some(cache)
}

pub fn write_lint_cache(vault_path: &Path, cache: &LintCache) -> Result<()> {
    let file_path = vault_path.join(LINT_CACHE_FILE);
    let json = serde_json::to_string_pretty(cache)
        .map_err(|e| BraniacError::Vault(format!("lint cache serialize: {e}")))?;
    std::fs::write(file_path, json)?;
    Ok(())
}

pub fn update_cache_after_lint(
    mut cache: LintCache,
    md_paths: &[String],
    skipped_healthy: &[String],
    fixes: &[LintFix],
    revision: &VaultRevision,
    file_hashes: &HashMap<String, String>,
) -> LintCache {
    let now = Utc::now().to_rfc3339();

    for path in skipped_healthy {
        let hash = file_hashes.get(path).cloned().unwrap_or_default();
        cache
            .file_statuses
            .entry(path.clone())
            .or_insert_with(|| LintFileStatus {
                healthy: true,
                issues: Vec::new(),
                last_checked: now.clone(),
                content_hash: hash,
            });
    }

    for path in md_paths {
        if skipped_healthy.contains(path) {
            continue;
        }
        let file_fixes: Vec<_> = fixes.iter().filter(|f| f.path == *path).collect();
        let hash = file_hashes.get(path).cloned().unwrap_or_default();
        cache.file_statuses.insert(
            path.clone(),
            LintFileStatus {
                healthy: file_fixes.is_empty(),
                issues: file_fixes.iter().map(|f| f.reason.clone()).collect(),
                last_checked: now.clone(),
                content_hash: hash,
            },
        );
    }

    cache.version = CACHE_VERSION;
    cache.timestamp = now;
    cache.commit_hash = revision.head_hash.clone();
    cache.worktree_dirty = revision.worktree_dirty;
    cache
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn read_write_roundtrip() {
        let dir = tempdir().unwrap();
        let cache = LintCache {
            commit_hash: "abc123".into(),
            file_statuses: [(
                "concepts/a.md".into(),
                LintFileStatus {
                    healthy: true,
                    issues: Vec::new(),
                    last_checked: "now".into(),
                    content_hash: "hash-a".into(),
                },
            )]
            .into_iter()
            .collect(),
            ..Default::default()
        };
        write_lint_cache(dir.path(), &cache).unwrap();
        let loaded = read_lint_cache(dir.path()).unwrap();
        assert_eq!(loaded.commit_hash, "abc123");
    }

    #[test]
    fn v1_cache_is_treated_as_stale() {
        let dir = tempdir().unwrap();
        let legacy = r#"{
            "version": 1,
            "timestamp": "now",
            "commitHash": "abc",
            "fileStatuses": {}
        }"#;
        std::fs::write(dir.path().join(LINT_CACHE_FILE), legacy).unwrap();
        assert!(read_lint_cache(dir.path()).is_none());
    }

    #[test]
    fn update_marks_analyzed_files() {
        let cache = LintCache::default();
        let mut hashes = HashMap::new();
        hashes.insert("concepts/a.md".into(), "hash-a".into());
        let updated = update_cache_after_lint(
            cache,
            &["concepts/a.md".into()],
            &[],
            &[LintFix {
                id: "fix-1".into(),
                path: "concepts/a.md".into(),
                action: "update".into(),
                reason: "fix format".into(),
                content: Some("# A".into()),
            }],
            &VaultRevision {
                head_hash: "deadbeef".into(),
                worktree_dirty: false,
            },
            &hashes,
        );
        let status = updated.file_statuses.get("concepts/a.md").unwrap();
        assert!(!status.healthy);
        assert_eq!(updated.commit_hash, "deadbeef");
    }
}
