use std::path::Path;
use std::process::Command;

use braniac_types::IngestRequest;

use crate::error::{BraniacError, Result};

pub struct PreparedSource {
    pub text: String,
    pub label: String,
}

pub fn prepare_source(request: &IngestRequest) -> Result<PreparedSource> {
    if let Some(path) = &request.file_path {
        let text = extract_from_path(path)?;
        let label = Path::new(path)
            .file_name()
            .map(|n| n.to_string_lossy().to_string())
            .unwrap_or_else(|| path.clone());
        return Ok(PreparedSource { text, label });
    }

    if let Some(url) = &request.source_url {
        if url.trim().is_empty() {
            return Err(BraniacError::InvalidInput("empty source URL".into()));
        }
        let text = extract_from_url(url.trim())?;
        return Ok(PreparedSource {
            text,
            label: url.trim().to_string(),
        });
    }

    if let Some(text) = &request.text {
        if text.trim().is_empty() {
            return Err(BraniacError::InvalidInput("empty ingest text".into()));
        }
        return Ok(PreparedSource {
            text: text.clone(),
            label: "Manual Input".into(),
        });
    }

    Err(BraniacError::InvalidInput(
        "ingest requires text, sourceUrl, or filePath".into(),
    ))
}

fn grapper_bin() -> String {
    std::env::var("GRAPPER_PATH").unwrap_or_else(|_| "grapper".into())
}

/// argv passed to grapper for a single URL or file path (`grapper --stdout <source>`).
pub fn grapper_args(source: &str) -> Vec<String> {
    vec!["--stdout".into(), source.into()]
}

fn run_grapper(source: &str) -> Result<String> {
    let args = grapper_args(source);
    let output = Command::new(grapper_bin())
        .args(&args)
        .output()
        .map_err(|e| {
            BraniacError::Job(format!(
                "failed to run grapper ({}): {e}. Install grapper or set GRAPPER_PATH.",
                grapper_bin()
            ))
        })?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(BraniacError::Job(format!("grapper failed: {stderr}")));
    }
    let stdout = String::from_utf8_lossy(&output.stdout).trim().to_string();
    if stdout.is_empty() {
        return Err(BraniacError::Job("grapper returned no text".into()));
    }
    Ok(stdout)
}

pub fn extract_from_url(url: &str) -> Result<String> {
    run_grapper(url)
}

pub fn extract_from_path(path: &str) -> Result<String> {
    let p = Path::new(path);
    if !p.exists() {
        return Err(BraniacError::NotFound(path.into()));
    }
    run_grapper(path)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_empty_request() {
        let req = IngestRequest {
            vault_id: "v".into(),
            source_url: None,
            text: None,
            file_path: None,
        };
        assert!(prepare_source(&req).is_err());
    }

    #[test]
    fn grapper_args_use_stdout_and_source() {
        let url_args = grapper_args("https://example.com/article");
        assert_eq!(url_args, vec!["--stdout", "https://example.com/article"]);

        let path_args = grapper_args("/tmp/paper.pdf");
        assert_eq!(path_args, vec!["--stdout", "/tmp/paper.pdf"]);
    }

    #[test]
    fn passes_through_text() {
        let req = IngestRequest {
            vault_id: "v".into(),
            source_url: None,
            text: Some("hello world".into()),
            file_path: None,
        };
        let prepared = prepare_source(&req).unwrap();
        assert_eq!(prepared.text, "hello world");
    }
}
