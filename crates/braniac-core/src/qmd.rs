use std::io::Read;
use std::path::Path;
use std::process::{Command, Output, Stdio};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
use std::thread;

use braniac_types::SearchResult;
use serde::Deserialize;

use crate::error::{BraniacError, Result};

const MIN_SCORE: &str = "0.25";
const MASK: &str = "**/*.md";

pub fn qmd_bin() -> String {
    std::env::var("QMD_BIN").unwrap_or_else(|_| "qmd".into())
}

pub fn collection_name(vault_id: &str) -> String {
    format!("braniac-{vault_id}")
}

fn qmd_spawn_error(e: std::io::Error) -> BraniacError {
    BraniacError::Search(format!(
        "failed to run qmd ({}): {e}. Install qmd (https://github.com/tobi/qmd) and use Rebuild Index.",
        qmd_bin()
    ))
}

fn run_qmd(args: &[&str]) -> Result<Output> {
    let mut child = Command::new(qmd_bin())
        .args(args)
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(qmd_spawn_error)?;

    let stderr = child.stderr.take();
    let mut stdout = child
        .stdout
        .take()
        .ok_or_else(|| BraniacError::Search("qmd stdout pipe missing".into()))?;

    let stderr_handle = thread::spawn(move || {
        let mut buf = Vec::new();
        if let Some(mut pipe) = stderr {
            let _ = pipe.read_to_end(&mut buf);
        }
        buf
    });

    let mut stdout_buf = Vec::new();
    stdout
        .read_to_end(&mut stdout_buf)
        .map_err(|e| BraniacError::Search(format!("failed reading qmd stdout: {e}")))?;
    let status = child
        .wait()
        .map_err(|e| BraniacError::Search(format!("failed waiting on qmd: {e}")))?;
    let stderr_buf = stderr_handle.join().unwrap_or_default();

    Ok(Output {
        status,
        stdout: stdout_buf,
        stderr: stderr_buf,
    })
}

fn run_qmd_ok(args: &[&str]) -> Result<String> {
    let output = run_qmd(args)?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        let stdout = String::from_utf8_lossy(&output.stdout);
        let detail = if stderr.trim().is_empty() {
            stdout.trim().to_string()
        } else {
            stderr.trim().to_string()
        };
        return Err(BraniacError::Search(format!("qmd failed: {detail}")));
    }
    Ok(String::from_utf8_lossy(&output.stdout).into_owned())
}

fn is_path_conflict(stderr: &str) -> bool {
    stderr
        .to_lowercase()
        .contains("already exists for this path")
}

fn is_same_name_exists_error(stderr: &str) -> bool {
    if is_path_conflict(stderr) {
        return false;
    }
    let lower = stderr.to_lowercase();
    lower.contains("already exists")
        || lower.contains("duplicate")
        || lower.contains("collection exists")
}

fn parse_path_conflict_collection(stderr: &str) -> Option<String> {
    for line in stderr.lines() {
        let trimmed = line.trim();
        if let Some(rest) = trimmed.strip_prefix("Name:") {
            let name = rest.split_whitespace().next()?;
            if !name.is_empty() {
                return Some(name.to_string());
            }
        }
    }
    None
}

fn collection_exists(name: &str) -> Result<bool> {
    let output = run_qmd(&["collection", "show", name])?;
    Ok(output.status.success())
}

pub trait QmdClient: Send + Sync {
    fn resolve_collection(&self, vault_root: &Path, vault_id: &str) -> Result<String>;
    fn update_collection(&self, collection: &str) -> Result<()>;
    fn embed_collection(&self, collection: &str) -> Result<()>;
    fn query(&self, collection: &str, text: &str, limit: u32) -> Result<Vec<SearchResult>>;
    fn collection_exists(&self, collection: &str) -> bool;
}

pub struct ProcessQmdClient;

impl QmdClient for ProcessQmdClient {
    fn resolve_collection(&self, vault_root: &Path, vault_id: &str) -> Result<String> {
        resolve_collection_name(vault_root, vault_id)
    }

    fn update_collection(&self, collection: &str) -> Result<()> {
        update_collection_named(collection)
    }

    fn embed_collection(&self, collection: &str) -> Result<()> {
        embed_collection_named(collection)
    }

    fn query(&self, collection: &str, text: &str, limit: u32) -> Result<Vec<SearchResult>> {
        query_collection(collection, text, limit)
    }

    fn collection_exists(&self, collection: &str) -> bool {
        collection_exists(collection).unwrap_or(false)
    }
}

#[derive(Default)]
pub struct RecordingQmdClient {
    pub resolve_calls: AtomicUsize,
    pub query_calls: AtomicUsize,
}

impl RecordingQmdClient {
    pub fn new() -> Arc<Self> {
        Arc::new(Self::default())
    }
}

impl QmdClient for RecordingQmdClient {
    fn resolve_collection(&self, _vault_root: &Path, vault_id: &str) -> Result<String> {
        self.resolve_calls.fetch_add(1, Ordering::SeqCst);
        Ok(collection_name(vault_id))
    }

    fn update_collection(&self, _collection: &str) -> Result<()> {
        Ok(())
    }

    fn embed_collection(&self, _collection: &str) -> Result<()> {
        Ok(())
    }

    fn query(&self, _collection: &str, _text: &str, _limit: u32) -> Result<Vec<SearchResult>> {
        self.query_calls.fetch_add(1, Ordering::SeqCst);
        Ok(Vec::new())
    }

    fn collection_exists(&self, _collection: &str) -> bool {
        true
    }
}

fn parse_collection_names(list_stdout: &str) -> Vec<String> {
    list_stdout
        .lines()
        .filter_map(|line| {
            let trimmed = line.trim();
            let name = trimmed.split_whitespace().next()?;
            if name == "Collections" || name.ends_with(':') || name.starts_with('(') {
                return None;
            }
            Some(name.to_string())
        })
        .collect()
}

fn collection_path(name: &str) -> Result<Option<String>> {
    let output = run_qmd(&["collection", "show", name])?;
    if !output.status.success() {
        return Ok(None);
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    for line in stdout.lines() {
        let trimmed = line.trim();
        if let Some(path) = trimmed.strip_prefix("Path:") {
            return Ok(Some(path.trim().to_string()));
        }
    }
    Ok(None)
}

fn find_collection_for_path(vault_root: &Path) -> Result<Option<String>> {
    let output = run_qmd(&["collection", "list"])?;
    if !output.status.success() {
        return Ok(None);
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    let canonical = std::fs::canonicalize(vault_root).unwrap_or_else(|_| vault_root.to_path_buf());
    for name in parse_collection_names(&stdout) {
        if let Some(path) = collection_path(&name)? {
            let collection_root =
                std::fs::canonicalize(Path::new(&path)).unwrap_or_else(|_| Path::new(&path).to_path_buf());
            if collection_root == canonical {
                return Ok(Some(name));
            }
        }
    }
    Ok(None)
}

/// Resolve the qmd collection for a vault, creating `braniac-{vault_id}` when possible.
pub fn resolve_collection_name(vault_root: &Path, vault_id: &str) -> Result<String> {
    let preferred = collection_name(vault_id);
    let root = vault_root.to_string_lossy();
    if collection_exists(&preferred)? {
        return Ok(preferred);
    }

    let output = run_qmd(&[
        "collection",
        "add",
        &root,
        "--name",
        &preferred,
        "--mask",
        MASK,
    ])?;
    if output.status.success() {
        return Ok(preferred);
    }

    let stderr = String::from_utf8_lossy(&output.stderr);
    if is_path_conflict(&stderr) {
        let resolved = parse_path_conflict_collection(&stderr)
            .or_else(|| find_collection_for_path(vault_root).ok().flatten());
        if let Some(name) = resolved {
            return Ok(name);
        }
    }

    if is_same_name_exists_error(&stderr) {
        return Ok(preferred);
    }

    Err(BraniacError::Search(format!(
        "qmd collection add failed: {}",
        stderr.trim()
    )))
}

pub fn update_collection_named(name: &str) -> Result<()> {
    run_qmd_ok(&["update", "-c", name])?;
    Ok(())
}

pub fn embed_collection_named(name: &str) -> Result<()> {
    run_qmd_ok(&["embed", "-c", name])?;
    Ok(())
}

pub fn query_collection(name: &str, text: &str, limit: u32) -> Result<Vec<SearchResult>> {
    let limit_str = limit.to_string();
    let stdout = run_qmd_ok(&[
        "query",
        text,
        "--json",
        "-n",
        &limit_str,
        "-c",
        name,
        "--min-score",
        MIN_SCORE,
    ])?;
    parse_results(&stdout)
}

#[derive(Debug, Deserialize)]
struct QmdHit {
    #[serde(default)]
    file: Option<String>,
    #[serde(default)]
    filepath: Option<String>,
    #[serde(default)]
    path: Option<String>,
    #[serde(default)]
    title: Option<String>,
    #[serde(default)]
    score: Option<serde_json::Value>,
    #[serde(default)]
    snippet: Option<String>,
    #[serde(default)]
    context: Option<String>,
}

fn normalize_score(value: Option<&serde_json::Value>) -> f64 {
    let Some(v) = value else {
        return 0.0;
    };
    let raw = match v {
        serde_json::Value::Number(n) => n.as_f64().unwrap_or(0.0),
        serde_json::Value::String(s) => s.parse::<f64>().unwrap_or(0.0),
        _ => 0.0,
    };
    if raw > 1.0 {
        raw / 100.0
    } else {
        raw
    }
}

fn hit_path(hit: &QmdHit) -> String {
    hit.file
        .clone()
        .or_else(|| hit.filepath.clone())
        .or_else(|| hit.path.clone())
        .unwrap_or_default()
}

/// Strip qmd collection URIs to vault-relative paths (`qmd://wiki/concepts/foo.md` → `concepts/foo.md`).
pub fn normalize_qmd_file_path(raw: &str) -> String {
    let Some(rest) = raw.strip_prefix("qmd://") else {
        return raw.to_string();
    };
    let Some(slash) = rest.find('/') else {
        return raw.to_string();
    };
    rest[slash + 1..].to_string()
}

fn hit_snippet(hit: &QmdHit) -> String {
    hit.snippet
        .clone()
        .or_else(|| hit.context.clone())
        .unwrap_or_default()
}

pub fn parse_results(stdout: &str) -> Result<Vec<SearchResult>> {
    let trimmed = stdout.trim();
    if trimmed.is_empty() {
        return Ok(Vec::new());
    }

    let value: serde_json::Value = serde_json::from_str(trimmed)?;
    let items: Vec<serde_json::Value> = match value {
        serde_json::Value::Array(arr) => arr,
        serde_json::Value::Object(_) => vec![value],
        _ => return Ok(Vec::new()),
    };

    let mut results = Vec::new();
    for item in items {
        let hit: QmdHit = serde_json::from_value(item)?;
        let path = normalize_qmd_file_path(&hit_path(&hit));
        if path.is_empty() {
            continue;
        }
        let snippet = hit_snippet(&hit);
        results.push(SearchResult {
            path,
            title: hit.title,
            score: normalize_score(hit.score.as_ref()),
            snippet,
        });
    }
    Ok(results)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_qmd_json_array() {
        let json = r#"[
          {
            "file": "concepts/opus4.7.md",
            "title": "Opus 4.7",
            "score": 0.91,
            "snippet": "Model overview and benchmarks"
          },
          {
            "filepath": "sources/other.md",
            "score": "42",
            "context": "mentions opus in passing"
          }
        ]"#;
        let results = parse_results(json).unwrap();
        assert_eq!(results.len(), 2);
        assert_eq!(results[0].path, "concepts/opus4.7.md");
        assert_eq!(results[0].title.as_deref(), Some("Opus 4.7"));
        assert!((results[0].score - 0.91).abs() < f64::EPSILON);
        assert_eq!(results[1].path, "sources/other.md");
        assert!((results[1].score - 0.42).abs() < f64::EPSILON);
        assert_eq!(results[1].snippet, "mentions opus in passing");
    }

    #[test]
    fn parses_empty_stdout() {
        assert!(parse_results("").unwrap().is_empty());
    }

    #[test]
    fn collection_name_is_stable() {
        assert_eq!(collection_name("deepblue"), "braniac-deepblue");
    }

    #[test]
    fn parses_path_conflict_collection_name() {
        let stderr = "A collection already exists for this path and pattern:\n  Name: wiki (qmd://wiki/)\n  Pattern: **/*.md\n";
        assert!(is_path_conflict(stderr));
        assert_eq!(
            parse_path_conflict_collection(stderr).as_deref(),
            Some("wiki")
        );
        assert!(!is_same_name_exists_error(stderr));
    }

    #[test]
    fn normalize_qmd_file_path_strips_collection_uri() {
        assert_eq!(
            normalize_qmd_file_path("qmd://wiki/concepts/foo.md"),
            "concepts/foo.md"
        );
        assert_eq!(
            normalize_qmd_file_path("concepts/foo.md"),
            "concepts/foo.md"
        );
    }

    #[test]
    fn parses_qmd_collection_uri_paths() {
        let json = r#"[
          {
            "file": "qmd://wiki/concepts/autonomous-llm-agents.md",
            "title": "Agents",
            "score": 0.88,
            "snippet": "autonomous agents"
          }
        ]"#;
        let results = parse_results(json).unwrap();
        assert_eq!(results.len(), 1);
        assert_eq!(results[0].path, "concepts/autonomous-llm-agents.md");
    }
}
