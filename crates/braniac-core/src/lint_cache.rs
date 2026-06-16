use std::collections::HashMap;
use std::path::Path;

use braniac_types::LintFix;
use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::error::{BraniacError, Result};

const LINT_CACHE_FILE: &str = ".lint-cache.json";
const CACHE_VERSION: u32 = 1;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct LintFileStatus {
    pub healthy: bool,
    pub issues: Vec<String>,
    pub last_checked: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct LintCache {
    pub version: u32,
    pub timestamp: String,
    pub commit_hash: String,
    pub file_statuses: HashMap<String, LintFileStatus>,
}

impl Default for LintCache {
    fn default() -> Self {
        Self {
            version: CACHE_VERSION,
            timestamp: String::new(),
            commit_hash: String::new(),
            file_statuses: HashMap::new(),
        }
    }
}

pub fn read_lint_cache(vault_path: &Path) -> Option<LintCache> {
    let file_path = vault_path.join(LINT_CACHE_FILE);
    let raw = std::fs::read_to_string(file_path).ok()?;
    serde_json::from_str(&raw).ok()
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
    current_hash: &str,
) -> LintCache {
    let now = Utc::now().to_rfc3339();

    for path in skipped_healthy {
        cache
            .file_statuses
            .entry(path.clone())
            .or_insert_with(|| LintFileStatus {
                healthy: true,
                issues: Vec::new(),
                last_checked: now.clone(),
            });
    }

    for path in md_paths {
        if skipped_healthy.contains(path) {
            continue;
        }
        let file_fixes: Vec<_> = fixes.iter().filter(|f| f.path == *path).collect();
        cache.file_statuses.insert(
            path.clone(),
            LintFileStatus {
                healthy: file_fixes.is_empty(),
                issues: file_fixes.iter().map(|f| f.reason.clone()).collect(),
                last_checked: now.clone(),
            },
        );
    }

    cache.version = CACHE_VERSION;
    cache.timestamp = now;
    cache.commit_hash = current_hash.to_string();
    cache
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn read_write_roundtrip() {
        let dir = tempdir().unwrap();
        let mut cache = LintCache::default();
        cache.commit_hash = "abc123".into();
        cache
            .file_statuses
            .insert("concepts/a.md".into(), LintFileStatus {
                healthy: true,
                issues: vec![],
                last_checked: "now".into(),
            });
        write_lint_cache(dir.path(), &cache).unwrap();
        let loaded = read_lint_cache(dir.path()).unwrap();
        assert_eq!(loaded.commit_hash, "abc123");
    }

    #[test]
    fn update_marks_analyzed_files() {
        let cache = LintCache::default();
        let updated = update_cache_after_lint(
            cache,
            &["concepts/a.md".into()],
            &[],
            &[LintFix {
                path: "concepts/a.md".into(),
                action: "update".into(),
                reason: "fix format".into(),
                content: Some("# A".into()),
            }],
            "deadbeef",
        );
        let status = updated.file_statuses.get("concepts/a.md").unwrap();
        assert!(!status.healthy);
        assert_eq!(updated.commit_hash, "deadbeef");
    }
}
