use std::collections::HashMap;
use std::sync::Arc;

use braniac_types::{DocumentPatch, IngestRequest, JobEvent, LintFix, LintResult};
use parking_lot::Mutex;
use uuid::Uuid;

use crate::ai::{AiProviderAdapter, LINT_SYSTEM_PROMPT, INGEST_SYSTEM_PROMPT};
use crate::error::{BraniacError, Result};
use crate::extract::prepare_source;
use crate::vault::VaultResolver;

pub struct JobManager {
    cancel_flags: Arc<Mutex<HashMap<Uuid, bool>>>,
    patches: Arc<Mutex<HashMap<Uuid, Vec<DocumentPatch>>>>,
    lint_results: Arc<Mutex<HashMap<Uuid, LintResult>>>,
    active_job: Arc<Mutex<Option<Uuid>>>,
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

    pub fn take_lint_result(&self, job_id: Uuid) -> Option<LintResult> {
        self.lint_results.lock().remove(&job_id)
    }

    pub fn latest_lint_result(&self) -> Option<LintResult> {
        self.lint_results.lock().values().next().cloned()
    }

    pub fn clear_lint_results(&self) {
        self.lint_results.lock().clear();
    }

    pub async fn run_ingest(
        &self,
        vaults: &Mutex<VaultResolver>,
        adapter: &dyn AiProviderAdapter,
        request: IngestRequest,
        mut on_event: impl FnMut(JobEvent) + Send,
    ) -> Result<Uuid> {
        let job_id = Uuid::new_v4();
        self.cancel_flags.lock().insert(job_id, false);
        *self.active_job.lock() = Some(job_id);
        on_event(JobEvent::Started { job_id });

        let pre_hash = {
            let vault = vaults.lock();
            vault.current_head_hash(&request.vault_id).ok()
        };

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
            if let Some(hash) = pre_hash {
                let _ = vaults.lock().reset_hard(&request.vault_id, &hash);
            }
            on_event(JobEvent::Failed {
                job_id,
                error: e.to_string(),
            });
        }

        *self.active_job.lock() = None;
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
        self.cancel_flags.lock().insert(job_id, false);
        *self.active_job.lock() = Some(job_id);
        on_event(JobEvent::Started { job_id });

        let result: Result<Uuid> = async {
            on_event(JobEvent::Progress {
                job_id,
                message: "Reading vault".into(),
                percent: Some(10),
            });

            let corpus = {
                let vault = vaults.lock();
                let files = vault.list_files(vault_id)?;
                let mut parts = Vec::new();
                for file in files.iter().take(40) {
                    if let Ok(doc) = vault.read_document(vault_id, &file.path) {
                        parts.push(format!("--- {} ---\n{}", file.path, doc.content));
                    }
                }
                parts.join("\n\n")
            };

            if corpus.is_empty() {
                let lint = LintResult {
                    report: "The vault is empty. Nothing to lint.".into(),
                    fixes: Vec::new(),
                };
                self.lint_results.lock().insert(job_id, lint.clone());
                on_event(JobEvent::Completed { job_id });
                return Ok(job_id);
            }

            on_event(JobEvent::Progress {
                job_id,
                message: "Calling lint model".into(),
                percent: Some(50),
            });

            let user = format!("<vault id=\"{vault_id}\">\n{corpus}\n</vault>");
            let output = adapter.complete(LINT_SYSTEM_PROMPT, &user).await?;
            on_event(JobEvent::Chunk {
                job_id,
                content: output.clone(),
            });

            let lint = parse_lint_output(&output);
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

        *self.active_job.lock() = None;
        result
    }

    pub fn apply_lint(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        lint: &LintResult,
    ) -> Result<usize> {
        let mut applied = 0usize;
        for fix in &lint.fixes {
            match fix.action.as_str() {
                "delete" => {
                    if vault.read_document(vault_id, &fix.path).is_ok() {
                        vault.delete_document(vault_id, &fix.path, &fix.reason)?;
                        applied += 1;
                    }
                }
                "update" | "create" => {
                    let content = fix.content.clone().unwrap_or_default();
                    if !content.is_empty() {
                        vault.write_document(vault_id, &fix.path, &content, &fix.reason)?;
                        applied += 1;
                    }
                }
                _ => {}
            }
        }
        Ok(applied)
    }

    pub fn apply_patches(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        patches: &[DocumentPatch],
    ) -> Result<()> {
        for patch in patches {
            vault.write_document(vault_id, &patch.path, &patch.new_content, &patch.message)?;
        }
        Ok(())
    }

    pub fn rollback_patches(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        patches: &[DocumentPatch],
    ) -> Result<()> {
        for patch in patches {
            if let Some(old) = &patch.old_content {
                vault.write_document(vault_id, &patch.path, old, "rollback patch")?;
            } else if vault.read_document(vault_id, &patch.path).is_ok() {
                vault.delete_document(vault_id, &patch.path, "rollback new file")?;
            }
        }
        Ok(())
    }
}

fn parse_file_tags(
    output: &str,
    vault: &VaultResolver,
    vault_id: &str,
) -> Result<Vec<DocumentPatch>> {
    let re = regex::Regex::new(r#"(?s)<file path="([^"]+)">\s*(.*?)\s*</file>"#).unwrap();
    let mut patches = Vec::new();
    for cap in re.captures_iter(output) {
        let path = cap.get(1).unwrap().as_str().to_string();
        let new_content = cap.get(2).unwrap().as_str().trim().to_string();
        let old_content = vault.read_document(vault_id, &path).ok().map(|d| d.content);
        patches.push(DocumentPatch {
            path,
            old_content,
            new_content,
            message: "ingest apply".into(),
        });
    }
    if patches.is_empty() {
        return Err(BraniacError::Job("no file patches in provider output".into()));
    }
    Ok(patches)
}

pub fn parse_lint_output(text: &str) -> LintResult {
    let report_re = regex::Regex::new(r"(?s)<report>(.*?)</report>").unwrap();
    let report = report_re
        .captures(text)
        .and_then(|c| c.get(1))
        .map(|m| m.as_str().trim().to_string())
        .unwrap_or_else(|| text.trim().to_string());

    let mut fixes = Vec::new();
    let self_close =
        regex::Regex::new(r#"(?i)<fix\s+path="([^"]+)"\s+action="(delete|update|create)"\s+reason="([^"]*)"\s*/>"#)
            .unwrap();
    for cap in self_close.captures_iter(text) {
        let action = cap[2].to_lowercase();
        // Self-closing tags carry no body; only delete is actionable without content.
        if action != "delete" {
            continue;
        }
        fixes.push(LintFix {
            path: cap[1].to_string(),
            action,
            reason: cap[3].to_string(),
            content: None,
        });
    }

    let content_re = regex::Regex::new(
        r#"(?is)<fix\s+path="([^"]+)"\s+action="(update|create)"\s+reason="([^"]*)">(.*?)</fix>"#,
    )
    .unwrap();
    for cap in content_re.captures_iter(text) {
        fixes.push(LintFix {
            path: cap[1].to_string(),
            action: cap[2].to_lowercase(),
            reason: cap[3].to_string(),
            content: Some(cap[4].trim().to_string()),
        });
    }

    LintResult { report, fixes }
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

    #[test]
    fn parse_lint_ignores_self_closing_update_tags() {
        let lint = parse_lint_output(
            r#"<report>ok</report>
<fix path="a.md" action="update" reason="fix header"/>
<fix path="b.md" action="delete" reason="stale"/>"#,
        );
        assert_eq!(lint.fixes.len(), 1);
        assert_eq!(lint.fixes[0].action, "delete");
        assert_eq!(lint.fixes[0].path, "b.md");
    }

    #[tokio::test]
    async fn clear_lint_results_removes_cached_results() {
        let dir = tempdir().unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().to_path_buf()));
        vault.lock().open_vault("v").unwrap();
        vault
            .lock()
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();
        let jobs = JobManager::new();
        jobs.run_lint(&vault, &MockAiAdapter, "v", |_| {})
            .await
            .unwrap();
        assert!(jobs.latest_lint_result().is_some());
        jobs.clear_lint_results();
        assert!(jobs.latest_lint_result().is_none());
    }
}
