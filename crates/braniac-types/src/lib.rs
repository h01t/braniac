//! Shared types between Rust core and TypeScript frontend.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct VaultManifest {
    pub id: String,
    pub name: String,
    pub root_path: String,
    pub document_count: u64,
    pub last_opened_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct KnowledgeDocument {
    pub path: String,
    pub title: Option<String>,
    pub content: String,
    pub modified_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct DocumentPatch {
    pub path: String,
    pub old_content: Option<String>,
    pub new_content: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct SearchQuery {
    pub text: String,
    pub limit: Option<u32>,
    pub fuzzy: Option<bool>,
    pub field: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct SearchResult {
    pub path: String,
    pub title: Option<String>,
    pub score: f64,
    pub snippet: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct GraphNode {
    pub id: String,
    pub label: String,
    pub val: f64,
    pub x: Option<f64>,
    pub y: Option<f64>,
    pub cluster: Option<String>,
    pub missing: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct GraphEdge {
    pub source: String,
    pub target: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct GraphSnapshot {
    pub nodes: Vec<GraphNode>,
    pub edges: Vec<GraphEdge>,
    pub frame: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct LayoutOptions {
    pub iterations: u32,
    pub gravity: f64,
    pub scaling_ratio: f64,
    pub seed: u64,
}

impl Default for LayoutOptions {
    fn default() -> Self {
        Self {
            iterations: 50,
            gravity: 1.0,
            scaling_ratio: 2.0,
            seed: 42,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum JobEvent {
    Started { job_id: Uuid },
    Progress { job_id: Uuid, message: String, percent: Option<u8> },
    Chunk { job_id: Uuid, content: String },
    PatchReady { job_id: Uuid, patches: Vec<DocumentPatch> },
    Completed { job_id: Uuid },
    Warning { job_id: Uuid, message: String },
    Failed { job_id: Uuid, error: String },
    Cancelled { job_id: Uuid },
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct IngestRequest {
    pub vault_id: String,
    pub source_url: Option<String>,
    pub text: Option<String>,
    pub file_path: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "camelCase", rename_all_fields = "camelCase")]
pub enum PluginPermission {
    VaultRead,
    VaultWrite,
    SearchQuery,
    IndexRead,
    GraphRead,
    IngestRun,
    AiRequest,
    UiPanel,
    CommandsRegister,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct PluginManifest {
    pub id: String,
    pub name: String,
    pub version: String,
    pub entry: String,
    pub permissions: Vec<PluginPermission>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum AiProvider {
    Deepseek,
    Openai,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, Default)]
#[serde(rename_all = "camelCase")]
pub enum ThemePreference {
    Light,
    #[default]
    Dark,
    System,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct AppSettings {
    pub ingest_provider: AiProvider,
    pub ingest_model: String,
    pub lint_provider: AiProvider,
    pub lint_model: String,
    pub vaults_root: Option<String>,
    #[serde(default)]
    pub theme: ThemePreference,
}

impl Default for AppSettings {
    fn default() -> Self {
        Self {
            ingest_provider: AiProvider::Deepseek,
            ingest_model: "deepseek-v4-pro".to_string(),
            lint_provider: AiProvider::Deepseek,
            lint_model: "deepseek-v4-flash".to_string(),
            vaults_root: None,
            theme: ThemePreference::Dark,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct HistoryEntry {
    pub hash: String,
    pub message: String,
    pub date: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct IndexStatus {
    pub vault_id: String,
    pub document_count: u64,
    pub indexed_count: u64,
    pub stale: bool,
    #[serde(default)]
    pub changed_count: u64,
    #[serde(default)]
    pub missing_count: u64,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub stale_reason: Option<String>,
    pub last_rebuild_at: Option<DateTime<Utc>>,
    pub embedding_model: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct LintFix {
    pub id: String,
    pub path: String,
    pub action: String,
    pub reason: String,
    pub content: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct LintResult {
    pub report: String,
    pub fixes: Vec<LintFix>,
    #[serde(default)]
    pub from_cache: bool,
    #[serde(default)]
    pub skipped_count: usize,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cache_commit_hash: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub current_commit_hash: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct ApplyLintResult {
    pub applied: usize,
    pub errors: Vec<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub index_warning: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct PaletteResult {
    pub ok: bool,
    pub message: String,
    pub job_id: Option<Uuid>,
    pub error: Option<String>,
    pub ui_action: Option<String>,
    pub ui_value: Option<String>,
    pub search_results: Option<Vec<SearchResult>>,
    pub index_status: Option<IndexStatus>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct BootstrapResult {
    pub vault_ids: Vec<String>,
    pub imported: Vec<String>,
    pub created_welcome_vault: bool,
    pub vaults_root: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct VaultFileEntry {
    pub name: String,
    pub path: String,
    #[serde(rename = "type")]
    pub entry_type: String,
}

#[cfg(test)]
mod tests {
    use super::{AppSettings, ThemePreference};

    #[test]
    fn shared_types_serialize_with_camel_case() {
        let settings = AppSettings::default();
        let json = serde_json::to_string(&settings).unwrap();
        assert!(json.contains("ingestProvider"));
        assert!(json.contains("ingestModel"));
        assert!(json.contains("theme"));
        assert_eq!(settings.theme, ThemePreference::Dark);
    }
}
