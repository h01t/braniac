use std::sync::Arc;

use braniac_core::ai::{build_ingest_adapter, build_lint_adapter};
use braniac_core::migrate::import_legacy_vaults;
use braniac_core::palette::{
    help_text, ingest_request_from_link, ingest_request_from_pdf, ingest_request_from_text,
    parse_palette_command, palette_err, palette_ok, search_query_from, PaletteCommandKind,
};
use braniac_core::AppState;
use braniac_types::*;
use tauri::{AppHandle, Emitter, State};
use uuid::Uuid;

type SharedState = Arc<AppState>;

fn emit_job_event(app: &AppHandle, event: &JobEvent) {
    let _ = app.emit("job-event", event);
}

async fn run_ingest_with_events(
    app: AppHandle,
    state: &SharedState,
    request: IngestRequest,
) -> Result<Uuid, String> {
    let settings = state.settings_snapshot().map_err(|e| e.to_string())?;
    let adapter = build_ingest_adapter(&settings.ingest_provider, &settings.ingest_model)
        .map_err(|e| e.to_string())?;
    let vault_id = request.vault_id.clone();
    let job_id = state
        .jobs
        .run_ingest(
            &state.vaults,
            adapter.as_ref(),
            request,
            |event| emit_job_event(&app, &event),
        )
        .await
        .map_err(|e| e.to_string())?;

    let state = state.clone();
    let _ = tokio::task::spawn_blocking(move || state.index.rebuild_with_vaults(&state.vaults, &vault_id))
        .await;
    Ok(job_id)
}

async fn run_lint_with_events(
    app: AppHandle,
    state: &SharedState,
    vault_id: &str,
) -> Result<Uuid, String> {
    let settings = state.settings_snapshot().map_err(|e| e.to_string())?;
    let adapter = build_lint_adapter(&settings.lint_provider, &settings.lint_model)
        .map_err(|e| e.to_string())?;
    state
        .jobs
        .run_lint(
            &state.vaults,
            adapter.as_ref(),
            vault_id,
            |event| emit_job_event(&app, &event),
        )
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn app_bootstrap(state: State<'_, SharedState>) -> Result<BootstrapResult, String> {
    state.bootstrap(&[]).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn vaults_root_get(state: State<'_, SharedState>) -> Result<String, String> {
    state
        .vaults_root_path()
        .map(|p| p.to_string_lossy().to_string())
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn settings_get(state: State<'_, SharedState>) -> Result<AppSettings, String> {
    state.settings_snapshot().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn settings_update(
    state: State<'_, SharedState>,
    settings: AppSettings,
) -> Result<AppSettings, String> {
    state.settings.write(&settings).map_err(|e| e.to_string())?;
    state.reload_vaults_root().map_err(|e| e.to_string())?;
    Ok(settings)
}

#[tauri::command]
pub fn vault_list(state: State<'_, SharedState>) -> Result<Vec<VaultManifest>, String> {
    state
        .vaults
        .lock()
        .list_vaults()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn vault_create(
    state: State<'_, SharedState>,
    vault_id: String,
) -> Result<VaultManifest, String> {
    state
        .vaults
        .lock()
        .open_vault(&vault_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn vault_files(
    state: State<'_, SharedState>,
    vault_id: String,
) -> Result<Vec<VaultFileEntry>, String> {
    state
        .vaults
        .lock()
        .list_files(&vault_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn vault_migrate(
    state: State<'_, SharedState>,
    source_root: String,
) -> Result<Vec<String>, String> {
    import_legacy_vaults(
        std::path::Path::new(&source_root),
        &state.vaults.lock(),
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn vault_open(state: State<'_, SharedState>, vault_id: String) -> Result<VaultManifest, String> {
    state
        .vaults
        .lock()
        .open_vault(&vault_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn document_read(
    state: State<'_, SharedState>,
    vault_id: String,
    path: String,
) -> Result<KnowledgeDocument, String> {
    state
        .vaults
        .lock()
        .read_document(&vault_id, &path)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn document_write(
    state: State<'_, SharedState>,
    vault_id: String,
    path: String,
    content: String,
    message: String,
) -> Result<(), String> {
    state
        .vaults
        .lock()
        .write_document(&vault_id, &path, &content, &message)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn search_query(
    state: State<'_, SharedState>,
    vault_id: String,
    query: SearchQuery,
) -> Result<Vec<SearchResult>, String> {
    state
        .index
        .search_with_vaults(&state.vaults, &vault_id, &query)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn index_status(state: State<'_, SharedState>, vault_id: String) -> Result<IndexStatus, String> {
    let vault = state.vaults.lock();
    state
        .index
        .status_for_vault(&vault, &vault_id)
        .map_err(|e| e.to_string())
}

async fn run_index_rebuild(state: &SharedState, vault_id: &str) -> Result<IndexStatus, String> {
    let state = state.clone();
    let vault_id = vault_id.to_string();
    tokio::task::spawn_blocking(move || {
        state
            .index
            .rebuild_with_vaults(&state.vaults, &vault_id)
    })
    .await
    .map_err(|e| format!("index rebuild task failed: {e}"))?
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn index_rebuild(
    state: State<'_, SharedState>,
    vault_id: String,
) -> Result<IndexStatus, String> {
    run_index_rebuild(&state, &vault_id).await
}

#[tauri::command]
pub fn graph_snapshot(
    state: State<'_, SharedState>,
    vault_id: String,
) -> Result<GraphSnapshot, String> {
    state
        .graph
        .snapshot_with_vaults(&state.vaults, &vault_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn graph_layout_start(
    state: State<'_, SharedState>,
    vault_id: String,
    options: Option<LayoutOptions>,
) -> Result<GraphSnapshot, String> {
    let snapshot = state
        .graph
        .snapshot_with_vaults(&state.vaults, &vault_id)
        .map_err(|e| e.to_string())?;
    let opts = options.unwrap_or_default();
    state
        .graph
        .layout(&snapshot, &opts)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn job_start_ingest(
    app: AppHandle,
    state: State<'_, SharedState>,
    request: IngestRequest,
) -> Result<Uuid, String> {
    run_ingest_with_events(app, &state, request).await
}

#[tauri::command]
pub async fn job_start_lint(
    app: AppHandle,
    state: State<'_, SharedState>,
    vault_id: String,
) -> Result<Uuid, String> {
    run_lint_with_events(app, &state, &vault_id).await
}

#[tauri::command]
pub fn job_lint_result(
    state: State<'_, SharedState>,
    job_id: Uuid,
) -> Result<Option<LintResult>, String> {
    Ok(state.jobs.get_lint_result(job_id))
}

#[tauri::command]
pub fn job_lint_apply(_state: State<'_, SharedState>, _vault_id: String) -> Result<usize, String> {
    Err(braniac_core::BraniacError::ReviewRequired(
        "blind lint apply is disabled; review fixes in Mint & Lint and apply by fix id".into(),
    )
    .to_string())
}

#[tauri::command]
pub fn job_lint_apply_selected(
    state: State<'_, SharedState>,
    vault_id: String,
    job_id: Uuid,
    fix_ids: Vec<String>,
) -> Result<ApplyLintResult, String> {
    let lint = state
        .jobs
        .get_lint_result(job_id)
        .ok_or_else(|| format!("no lint result for job {job_id}"))?;
    let result = {
        let vault = state.vaults.lock();
        state
            .jobs
            .apply_lint_fixes_by_ids(&vault, &vault_id, &lint, &fix_ids)
    };
    if result.applied > 0 {
        let _ = state.index.rebuild_with_vaults(&state.vaults, &vault_id);
    }
    state.jobs.clear_job_state(job_id);
    Ok(result)
}

#[tauri::command]
pub fn job_cancel(state: State<'_, SharedState>, job_id: Uuid) -> Result<(), String> {
    state.jobs.cancel(job_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn palette_execute(
    app: AppHandle,
    state: State<'_, SharedState>,
    command: String,
    vault_id: String,
) -> Result<PaletteResult, String> {
    let parsed = parse_palette_command(&command);
    match parsed.kind {
        PaletteCommandKind::Help => Ok(PaletteResult {
            ok: true,
            message: help_text().to_string(),
            job_id: None,
            error: None,
            ui_action: None,
            ui_value: None,
            search_results: None,
            index_status: None,
        }),
        PaletteCommandKind::IngestLink { url } => {
            let request = ingest_request_from_link(&vault_id, &url).map_err(|e| e.to_string())?;
            let job_id = run_ingest_with_events(app, &state, request).await?;
            Ok(PaletteResult {
                ok: true,
                message: format!("Ingest started for {url}"),
                job_id: Some(job_id),
                error: None,
                ui_action: None,
                ui_value: None,
                search_results: None,
                index_status: None,
            })
        }
        PaletteCommandKind::IngestPdf { path } => {
            let Some(path) = path else {
                return Ok(PaletteResult {
                    ok: true,
                    message: "Open file picker for pdf:".into(),
                    job_id: None,
                    error: None,
                    ui_action: Some("pickPdf".into()),
                    ui_value: None,
                    search_results: None,
                    index_status: None,
                });
            };
            let request =
                ingest_request_from_pdf(&vault_id, &path).map_err(|e| e.to_string())?;
            let job_id = run_ingest_with_events(app, &state, request).await?;
            Ok(PaletteResult {
                ok: true,
                message: format!("Ingest started for {path}"),
                job_id: Some(job_id),
                error: None,
                ui_action: None,
                ui_value: None,
                search_results: None,
                index_status: None,
            })
        }
        PaletteCommandKind::IngestText { text } => {
            let request = ingest_request_from_text(&vault_id, &text).map_err(|e| e.to_string())?;
            let job_id = run_ingest_with_events(app, &state, request).await?;
            Ok(PaletteResult {
                ok: true,
                message: "Ingest started".into(),
                job_id: Some(job_id),
                error: None,
                ui_action: None,
                ui_value: None,
                search_results: None,
                index_status: None,
            })
        }
        PaletteCommandKind::IndexRebuild => {
            let status = run_index_rebuild(&state, &vault_id).await?;
            Ok(PaletteResult {
                ok: true,
                message: format!(
                    "Index rebuilt {}/{}",
                    status.indexed_count, status.document_count
                ),
                job_id: None,
                error: None,
                ui_action: None,
                ui_value: None,
                search_results: None,
                index_status: Some(status),
            })
        }
        PaletteCommandKind::IndexStatus => {
            let status = index_status(state, vault_id)?;
            Ok(PaletteResult {
                ok: true,
                message: format!(
                    "Index {}/{} stale={}",
                    status.indexed_count, status.document_count, status.stale
                ),
                job_id: None,
                error: None,
                ui_action: None,
                ui_value: None,
                search_results: None,
                index_status: Some(status),
            })
        }
        PaletteCommandKind::Lint => {
            let job_id = run_lint_with_events(app, &state, &vault_id).await?;
            Ok(PaletteResult {
                ok: true,
                message: "Lint job completed".into(),
                job_id: Some(job_id),
                error: None,
                ui_action: None,
                ui_value: None,
                search_results: None,
                index_status: None,
            })
        }
        PaletteCommandKind::LintApply => Ok(palette_err(
            "lint apply requires review in Mint & Lint; blind apply is disabled",
        )),
        PaletteCommandKind::Vault { id } => {
            vault_open(state, id.clone())?;
            Ok(PaletteResult {
                ok: true,
                message: format!("Switched to vault {id}"),
                job_id: None,
                error: None,
                ui_action: Some("vault".into()),
                ui_value: Some(id),
                search_results: None,
                index_status: None,
            })
        }
        PaletteCommandKind::Open { path } => Ok(PaletteResult {
            ok: true,
            message: format!("Open {path}"),
            job_id: None,
            error: None,
            ui_action: Some("open".into()),
            ui_value: Some(path),
            search_results: None,
            index_status: None,
        }),
        PaletteCommandKind::Search { query } => {
            let results = search_query(state, vault_id, search_query_from(&query))?;
            Ok(PaletteResult {
                ok: true,
                message: format!("{} search results", results.len()),
                job_id: None,
                error: None,
                ui_action: Some("search".into()),
                ui_value: Some(query),
                search_results: Some(results),
                index_status: None,
            })
        }
        PaletteCommandKind::Tab { name } => Ok(PaletteResult {
            ok: true,
            message: format!("Switch to {name}"),
            job_id: None,
            error: None,
            ui_action: Some("tab".into()),
            ui_value: Some(name),
            search_results: None,
            index_status: None,
        }),
        PaletteCommandKind::JobCancel => {
            if let Some(job_id) = state.jobs.active_job_id() {
                job_cancel(state, job_id)?;
                Ok(palette_ok("Job cancelled"))
            } else {
                Ok(palette_err("No active job"))
            }
        }
        PaletteCommandKind::Unknown { raw } => Ok(palette_err(format!("Unknown command: {raw}"))),
    }
}

#[tauri::command]
pub fn history_log(
    state: State<'_, SharedState>,
    vault_id: String,
) -> Result<Vec<HistoryEntry>, String> {
    state
        .vaults
        .lock()
        .history_log(&vault_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn history_diff(
    state: State<'_, SharedState>,
    vault_id: String,
    from_hash: String,
    to_hash: String,
) -> Result<String, String> {
    state
        .vaults
        .lock()
        .history_diff(&vault_id, &from_hash, &to_hash)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn plugin_install(
    state: State<'_, SharedState>,
    source_path: String,
) -> Result<PluginManifest, String> {
    state
        .plugins
        .lock()
        .install(std::path::Path::new(&source_path))
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn plugin_enable(
    state: State<'_, SharedState>,
    plugin_id: String,
    permissions: Vec<PluginPermission>,
) -> Result<PluginManifest, String> {
    state
        .plugins
        .lock()
        .enable(&plugin_id, permissions)
        .map_err(|e| e.to_string())
}
