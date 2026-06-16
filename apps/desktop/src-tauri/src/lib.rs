mod commands;

use std::path::PathBuf;
use std::sync::Arc;

use braniac_core::AppState;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            commands::app_bootstrap,
            commands::vaults_root_get,
            commands::settings_get,
            commands::settings_update,
            commands::vault_list,
            commands::vault_create,
            commands::vault_files,
            commands::vault_migrate,
            commands::vault_open,
            commands::document_read,
            commands::document_write,
            commands::search_query,
            commands::index_status,
            commands::index_rebuild,
            commands::graph_snapshot,
            commands::graph_layout_start,
            commands::job_start_ingest,
            commands::job_start_lint,
            commands::job_lint_result,
            commands::job_lint_apply,
            commands::job_cancel,
            commands::palette_execute,
            commands::history_log,
            commands::history_diff,
            commands::plugin_install,
            commands::plugin_enable,
        ])
        .setup(|app| {
            let data_dir = app_data_dir(app);
            let state = AppState::new(data_dir).expect("failed to initialize app state");

            let mut seeds = Vec::new();
            if let Ok(resource) = app.path().resource_dir() {
                seeds.push(resource.join("vaults"));
            }
            if let Ok(cwd) = std::env::current_dir() {
                seeds.push(cwd.join("vaults"));
            }

            if let Err(error) = state.bootstrap(&seeds) {
                eprintln!("bootstrap warning: {error}");
            }

            app.manage(Arc::new(state));
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Braniac");
}

fn app_data_dir(app: &tauri::App) -> PathBuf {
    app.path()
        .app_data_dir()
        .unwrap_or_else(|_| std::env::temp_dir().join("braniac"))
}
