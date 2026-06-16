import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import type {
  ApplyLintResult,
  AppSettings,
  BootstrapResult,
  GraphSnapshot,
  HistoryEntry,
  IndexStatus,
  IngestRequest,
  JobEvent,
  KnowledgeDocument,
  LintResult,
  PaletteResult,
  LayoutOptions,
  PluginManifest,
  PluginPermission,
  SearchQuery,
  SearchResult,
  VaultFileEntry,
  VaultManifest,
} from "./types";

export const api = {
  appBootstrap: () => invoke<BootstrapResult>("app_bootstrap"),
  vaultsRootGet: () => invoke<string>("vaults_root_get"),
  settingsGet: () => invoke<AppSettings>("settings_get"),
  settingsUpdate: (settings: AppSettings) =>
    invoke<AppSettings>("settings_update", { settings }),
  vaultList: () => invoke<VaultManifest[]>("vault_list"),
  vaultCreate: (vaultId: string) =>
    invoke<VaultManifest>("vault_create", { vaultId }),
  vaultOpen: (vaultId: string) =>
    invoke<VaultManifest>("vault_open", { vaultId }),
  vaultFiles: (vaultId: string) =>
    invoke<VaultFileEntry[]>("vault_files", { vaultId }),
  vaultMigrate: (sourceRoot: string) =>
    invoke<string[]>("vault_migrate", { sourceRoot }),
  documentRead: (vaultId: string, path: string) =>
    invoke<KnowledgeDocument>("document_read", { vaultId, path }),
  documentWrite: (
    vaultId: string,
    path: string,
    content: string,
    message: string,
  ) => invoke<void>("document_write", { vaultId, path, content, message }),
  searchQuery: (vaultId: string, query: SearchQuery) =>
    invoke<SearchResult[]>("search_query", { vaultId, query }),
  indexStatus: (vaultId: string) =>
    invoke<IndexStatus>("index_status", { vaultId }),
  indexRebuild: (vaultId: string) =>
    invoke<IndexStatus>("index_rebuild", { vaultId }),
  graphSnapshot: (vaultId: string) =>
    invoke<GraphSnapshot>("graph_snapshot", { vaultId }),
  graphLayoutStart: (vaultId: string, options?: LayoutOptions) =>
    invoke<GraphSnapshot>("graph_layout_start", { vaultId, options }),
  jobStartIngest: (request: IngestRequest) =>
    invoke<string>("job_start_ingest", { request }),
  jobStartLint: (vaultId: string) =>
    invoke<string>("job_start_lint", { vaultId }),
  jobLintResult: (jobId: string) =>
    invoke<LintResult | null>("job_lint_result", { jobId }),
  jobLintApply: (vaultId: string) => invoke<number>("job_lint_apply", { vaultId }),
  jobLintApplySelected: (vaultId: string, jobId: string, fixIds: string[]) =>
    invoke<ApplyLintResult>("job_lint_apply_selected", { vaultId, jobId, fixIds }),
  jobCancel: (jobId: string) => invoke<void>("job_cancel", { jobId }),
  paletteExecute: (command: string, vaultId: string) =>
    invoke<PaletteResult>("palette_execute", { command, vaultId }),
  listenJobEvents: (handler: (event: JobEvent) => void) =>
    listen<JobEvent>("job-event", (e) => handler(e.payload)),
  historyLog: (vaultId: string) =>
    invoke<HistoryEntry[]>("history_log", { vaultId }),
  historyDiff: (vaultId: string, fromHash: string, toHash: string) =>
    invoke<string>("history_diff", { vaultId, fromHash, toHash }),
  pluginInstall: (sourcePath: string) =>
    invoke<PluginManifest>("plugin_install", { sourcePath }),
  pluginEnable: (pluginId: string, permissions: PluginPermission[]) =>
    invoke<PluginManifest>("plugin_enable", { pluginId, permissions }),
};
