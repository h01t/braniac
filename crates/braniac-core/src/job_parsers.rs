use braniac_types::{DocumentPatch, LintFix, LintResult};
use uuid::Uuid;

use crate::error::{BraniacError, Result};
use crate::vault::VaultResolver;

pub fn parse_file_tags(
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

pub fn parse_lint_output(text: &str, job_id: Uuid) -> LintResult {
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
        if action != "delete" {
            continue;
        }
        let index = fixes.len();
        fixes.push(LintFix {
            id: format!("{job_id}:{index}"),
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
        let index = fixes.len();
        fixes.push(LintFix {
            id: format!("{job_id}:{index}"),
            path: cap[1].to_string(),
            action: cap[2].to_lowercase(),
            reason: cap[3].to_string(),
            content: Some(cap[4].trim().to_string()),
        });
    }

    LintResult {
        report,
        fixes,
        from_cache: false,
        skipped_count: 0,
        cache_commit_hash: None,
        current_commit_hash: None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_lint_ignores_self_closing_update_tags() {
        let job_id = Uuid::new_v4();
        let lint = parse_lint_output(
            r#"<report>ok</report>
<fix path="a.md" action="update" reason="fix header"/>
<fix path="b.md" action="delete" reason="stale"/>"#,
            job_id,
        );
        assert_eq!(lint.fixes.len(), 1);
        assert_eq!(lint.fixes[0].action, "delete");
        assert_eq!(lint.fixes[0].path, "b.md");
    }
}
