import { useCallback, useEffect, useMemo, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { api } from "./api";
import { CommandPalette } from "./components/CommandPalette";
import { EmptyVaultPanel } from "./components/EmptyVaultPanel";
import { GraphCanvas } from "./components/GraphCanvas";
import { IngestBar } from "./components/IngestBar";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { MintLintModal } from "./components/MintLintModal";
import { ResizableInspector, useInspectorLayout } from "./components/ResizableInspector";
import { SourceDialog } from "./components/SourceDialog";
import { StatusBar } from "./components/StatusBar";
import { ToastStack, type Toast } from "./components/ToastStack";
import { VaultFileTree } from "./components/VaultFileTree";
import { VaultOverflowMenu } from "./components/VaultOverflowMenu";
import { BrandGlyphIcon, SearchIcon, SparklesIcon } from "./components/icons";
import { useJobActivity } from "./hooks/useJobActivity";
import { useMintLint } from "./hooks/useMintLint";
import { usePaletteCommands } from "./hooks/usePaletteCommands";
import { useSearch } from "./hooks/useSearch";
import { useVaultState } from "./hooks/useVaultState";
import { SearchActivity } from "./components/SearchActivity";
import { normalizeWikilinkTarget } from "./lib/wikilinks";
import { resolveSearchPhase } from "./lib/searchUi";
import { formatSearchScore } from "./lib/searchSnippet";
import {
  defaultStatusBarModeForTab,
  hasUserSetStatusBarMode,
  loadStatusBarMode,
  saveStatusBarMode,
  type StatusBarMode,
} from "./lib/statusBar";
import { applyThemePreference, themePreferenceLabel } from "./lib/theme";
import type {
  AppSettings,
  GraphNode,
  JobEvent,
  ThemePreference,
} from "./types";

type CenterTab = "editor" | "graph" | "settings" | "plugins";

const defaultSettings: AppSettings = {
  ingestProvider: "deepseek",
  ingestModel: "deepseek-v4-pro",
  lintProvider: "deepseek",
  lintModel: "deepseek-v4-flash",
  theme: "dark",
};

function resolveThemePreference(settings: AppSettings): ThemePreference {
  return settings.theme ?? "dark";
}

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);
const modKey = isMac ? "⌘" : "Ctrl+";

const SIDEBAR_COLLAPSED_KEY = "braniac.sidebarCollapsed";

function loadSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

async function pickFolder(title: string): Promise<string | null> {
  const selected = await open({ directory: true, multiple: false, title });
  return typeof selected === "string" ? selected : null;
}

export default function App() {
  const [centerTab, setCenterTab] = useState<CenterTab>("editor");
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [statusLine, setStatusLine] = useState("");
  const [statusBarMode, setStatusBarMode] = useState<StatusBarMode>(
    () => loadStatusBarMode() ?? defaultStatusBarModeForTab("editor"),
  );
  const { state: jobActivity, reset: resetJobActivity, handleEvent: handleJobEvent } =
    useJobActivity();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteCliMode, setPaletteCliMode] = useState(false);
  const [paletteSession, setPaletteSession] = useState(0);
  const [sourceDialogOpen, setSourceDialogOpen] = useState(false);
  const [ingestBusy, setIngestBusy] = useState(false);
  const [indexRebuildBusy, setIndexRebuildBusy] = useState(false);
  const [pluginPath, setPluginPath] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(loadSidebarCollapsed);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const inspectorLayout = useInspectorLayout();

  const persistSidebarCollapsed = useCallback((collapsed: boolean) => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? "1" : "0");
    } catch {
      /* ignore storage errors in test / private mode */
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      persistSidebarCollapsed(next);
      return next;
    });
  }, [persistSidebarCollapsed]);

  const log = useCallback((line: string) => {
    setStatusLine(line);
    setConsoleLines((prev) => [...prev.slice(-100), line]);
  }, []);

  const pushToast = useCallback((message: string, variant: Toast["variant"]) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setStatusBarModePersisted = useCallback((mode: StatusBarMode) => {
    setStatusBarMode(mode);
    saveStatusBarMode(mode);
  }, []);

  const toggleStatusBar = useCallback(() => {
    setStatusBarMode((prev) => {
      const next: StatusBarMode =
        prev === "collapsed" ? "compact" : prev === "compact" ? "expanded" : "collapsed";
      saveStatusBarMode(next);
      return next;
    });
  }, []);

  const changeCenterTab = useCallback((tab: CenterTab) => {
    setCenterTab(tab);
    if (!hasUserSetStatusBarMode()) {
      setStatusBarMode(defaultStatusBarModeForTab(tab));
    }
  }, []);

  const openPalette = useCallback((cliMode = false) => {
    setPaletteCliMode(cliMode);
    setPaletteSession((s) => s + 1);
    setPaletteOpen(true);
  }, []);

  const {
    vaults,
    vaultId,
    setVaultId,
    vaultsRoot,
    files,
    activePath,
    setActivePath,
    document,
    setDocument,
    editorValue,
    setEditorValue,
    indexStatus,
    setIndexStatus,
    graph,
    history,
    initDone,
    setInitDone,
    loadVaultsRoot,
    refreshVault,
    loadVaultList,
    selectFirstVault,
    runBootstrap,
    openDocument,
    saveDocument,
  } = useVaultState({
    onLog: log,
    changeCenterTab,
    setSelectedNode,
    clearSearchMatch: () => {},
  });

  const {
    searchText,
    setSearchText,
    searchResults,
    setSearchResults,
    searchMatch,
    setSearchMatch,
    searchBusy,
    setSearchBusy,
    searchStepLabel,
    clearSearch,
    runSearch,
    openSearchResult,
  } = useSearch({
    vaultId,
    graph,
    onLog: log,
    changeCenterTab,
    setSelectedNode,
    openDocument,
    inspectorLayout,
  });

  const {
    lintBusy,
    mintLintOpen,
    mintLintPhase,
    mintLintApplyProgress,
    mintLintApplyResult,
    lintResult,
    closeMintLintModal,
    startMintLint,
    applyApprovedLintFixes,
    openMintLintReview,
  } = useMintLint({
    vaultId,
    onLog: log,
    pushToast,
    refreshVault,
    resetJobActivity,
  });

  const runBootstrapWithSettings = useCallback(async () => {
    const result = await runBootstrap();
    const s = await api.settingsGet();
    setSettings(s);
    applyThemePreference(resolveThemePreference(s));
    return result;
  }, [runBootstrap]);

  useEffect(() => {
    void (async () => {
      try {
        await loadVaultsRoot();
        const s = await api.settingsGet();
        setSettings(s);
        applyThemePreference(resolveThemePreference(s));
        let listed = await loadVaultList();
        if (listed.length === 0) {
          await runBootstrapWithSettings();
          listed = await loadVaultList();
        }
        if (listed.length > 0 && !vaultId) {
          await selectFirstVault(listed);
        }
      } catch (error) {
        log(`Init error: ${String(error)}`);
      } finally {
        setInitDone(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  useEffect(() => {
    let unlisten: (() => void) | undefined;
    void api.listenJobEvents((event: JobEvent) => {
      handleJobEvent(event);
      switch (event.type) {
        case "progress":
          log(event.message);
          break;
        case "completed":
          log(`Job ${event.jobId} completed`);
          pushToast("Compile completed", "success");
          setIngestBusy(false);
          break;
        case "failed":
          log(`Job failed: ${event.error}`);
          pushToast(`Job failed: ${event.error}`, "error");
          setIngestBusy(false);
          break;
        case "cancelled":
          log(`Job ${event.jobId} cancelled`);
          setIngestBusy(false);
          break;
        case "started":
          setIngestBusy(true);
          log(`Job ${event.jobId} started`);
          break;
        case "patchReady":
          log(`Patches ready: ${event.patches.length} files`);
          break;
        case "warning":
          log(event.message);
          pushToast(event.message, "error");
          break;
        default:
          break;
      }
    }).then((fn) => {
      unlisten = fn;
    });
    return () => unlisten?.();
  }, [log, handleJobEvent, pushToast]);

  useEffect(() => {
    if (!statusLine) return;
    const timer = window.setTimeout(() => {
      setStatusLine((current) => (current === statusLine ? "" : current));
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [statusLine]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && key === "p") {
        event.preventDefault();
        openPalette(true);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        openPalette(false);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && key === "b") {
        event.preventDefault();
        toggleSidebar();
        return;
      }
      if ((event.metaKey || event.ctrlKey) && key === "j") {
        event.preventDefault();
        toggleStatusBar();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPalette, toggleSidebar, toggleStatusBar]);

  const navigateToLinkedPage = useCallback(
    async (path: string) => {
      if (!vaultId) return;
      const normalized = normalizeWikilinkTarget(path);
      setSearchMatch(null);
      const node = graph?.nodes.find((n) => n.id === normalized) ?? null;
      setSelectedNode(node);
      setActivePath(normalized);
      try {
        const doc = await api.documentRead(vaultId, normalized);
        setDocument(doc);
        setEditorValue(doc.content);
        log(`Opened ${normalized}`);
      } catch (error) {
        setDocument(null);
        setEditorValue("");
        log(`Could not open ${normalized}: ${String(error)}`);
      }
    },
    [vaultId, graph, log, setActivePath, setDocument, setEditorValue, setSearchMatch],
  );

  const chooseVaultsFolder = useCallback(async () => {
    const folder = await pickFolder(
      "Select folder containing vaults (e.g. this repo's vaults/ directory)",
    );
    if (!folder) return;
    const updated = await api.settingsUpdate({ ...settings, vaultsRoot: folder });
    setSettings(updated);
    await runBootstrapWithSettings();
    log(`Vaults root set to ${folder}`);
  }, [settings, runBootstrapWithSettings, log]);

  const importVaults = useCallback(async () => {
    const folder = await pickFolder("Select folder to import vaults from");
    if (!folder) return;
    const imported = await api.vaultMigrate(folder);
    log(`Imported vaults: ${imported.join(", ") || "(none)"}`);
    const listed = await loadVaultList();
    await selectFirstVault(listed);
    if (vaultId) {
      await refreshVault(vaultId);
    }
  }, [log, loadVaultList, selectFirstVault, vaultId, refreshVault]);

  const createVault = useCallback(
    async (name?: string) => {
      const id =
        name?.trim().toLowerCase().replace(/\s+/g, "-") ||
        `vault-${Date.now().toString(36)}`;
      if (!id) return;
      await api.vaultCreate(id);
      log(`Created vault ${id}`);
      await loadVaultList();
      setVaultId(id);
      await refreshVault(id);
      const vaultFiles = await api.vaultFiles(id);
      if (vaultFiles.length === 0) {
        await api.documentWrite(
          id,
          "concepts/welcome.md",
          "# Welcome\n\nYour new vault is ready.\n",
          "Create welcome note",
        );
        await refreshVault(id);
      }
      await openDocument("concepts/welcome.md");
    },
    [log, loadVaultList, refreshVault, openDocument, setVaultId],
  );

  const rebuildIndex = useCallback(async () => {
    if (!vaultId || indexRebuildBusy) return;
    setIndexRebuildBusy(true);
    log("Rebuilding index...");
    try {
      const status = await api.indexRebuild(vaultId);
      setIndexStatus(status);
      log(`Index rebuild complete (${status.indexedCount}/${status.documentCount})`);
    } catch (error) {
      log(`Index rebuild failed: ${String(error)}`);
    } finally {
      setIndexRebuildBusy(false);
    }
  }, [vaultId, log, indexRebuildBusy, setIndexStatus]);

  const saveSettings = async () => {
    applyThemePreference(resolveThemePreference(settings));
    const updated = await api.settingsUpdate(settings);
    setSettings(updated);
    applyThemePreference(resolveThemePreference(updated));
    await loadVaultsRoot();
    const listed = await loadVaultList();
    await selectFirstVault(listed);
    log("Settings saved");
  };

  const persistTheme = useCallback(
    async (theme: ThemePreference) => {
      applyThemePreference(theme);
      const next = { ...settings, theme };
      setSettings(next);
      const updated = await api.settingsUpdate(next);
      setSettings(updated);
      log(`Theme set to ${themePreferenceLabel(theme)}`);
    },
    [settings, log],
  );

  const { handlePaletteCli, commands } = usePaletteCommands({
    vaultId,
    onLog: log,
    changeCenterTab,
    setVaultId,
    refreshVault,
    openDocument,
    setIndexStatus,
    setSearchBusy,
    setSearchText,
    setSearchResults,
    saveDocument,
    rebuildIndex,
    startMintLint,
    openMintLintReview,
    toggleStatusBar,
    persistTheme,
    setSourceDialogOpen,
    setIngestBusy,
  });

  const createMissingPage = useCallback(
    async (nodeId: string) => {
      if (!vaultId) return;
      const baseName = nodeId.split("/").pop()?.replace(/\.md$/i, "") ?? "untitled";
      const title = baseName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      const content = `# ${title}\n\n**Summary**: \n\n`;
      try {
        await api.documentWrite(vaultId, nodeId, content, `Create ${nodeId}`);
        log(`Created ${nodeId}`);
        pushToast(`Created ${nodeId}`, "success");
        await refreshVault(vaultId);
        changeCenterTab("editor");
        await openDocument(nodeId);
      } catch (error) {
        log(`Create failed: ${String(error)}`);
        pushToast(`Could not create page: ${String(error)}`, "error");
      }
    },
    [vaultId, log, pushToast, refreshVault, changeCenterTab, openDocument],
  );

  const hasVaults = vaults.length > 0;
  const searchPhase = resolveSearchPhase(searchText, searchResults, searchBusy);
  const graphFocusIds = useMemo(
    () => (centerTab === "graph" && selectedNode?.id ? [selectedNode.id] : []),
    [centerTab, selectedNode?.id],
  );

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-bar-left">
          <div className="brand">
            <BrandGlyphIcon className="brand-glyph" />
            <span className="brand-wordmark">Braniac</span>
          </div>
          <div className="vault-select">
            <select
              aria-label="Vault selector"
              value={vaultId}
              onChange={(e) => {
                const id = e.target.value;
                clearSearch();
                setVaultId(id);
                void refreshVault(id);
              }}
              disabled={!hasVaults}
            >
              {vaults.length === 0 ? (
                <option value="">No vaults</option>
              ) : (
                vaults.map((vault) => (
                  <option key={vault.id} value={vault.id}>
                    {vault.name} ({vault.documentCount})
                  </option>
                ))
              )}
            </select>
          </div>
          {indexStatus && (
            <span
              className={`status-pill index-pill ${indexStatus.stale ? "index-pill--stale" : "index-pill--fresh"}`}
            >
              Index {indexStatus.indexedCount}/{indexStatus.documentCount}
              {indexStatus.stale ? " · stale" : ""}
            </span>
          )}
        </div>
        <div className="top-bar-divider" aria-hidden="true" />
        <div className="top-bar-tabs" role="tablist" aria-label="Main views">
          {(["editor", "graph", "settings", "plugins"] as CenterTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={centerTab === tab}
              className={`tab ${centerTab === tab ? "active" : ""}`}
              onClick={() => changeCenterTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div
        className="workspace"
        style={{
          gridTemplateColumns: `${sidebarCollapsed ? 0 : 260}px 1fr ${inspectorLayout.effectiveWidth}px`,
        }}
      >
        <aside className={`panel sidebar-panel ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
          <div className="panel-header sidebar-header">
            <span>Vault</span>
            <div className="sidebar-header-actions">
              <VaultOverflowMenu
                hasVaults={hasVaults}
                onOpenFolder={() => void chooseVaultsFolder()}
                onImport={() => void importVaults()}
                onNewVault={() => void createVault()}
                onNewSource={() => setSourceDialogOpen(true)}
              />
              <button
                type="button"
                className="icon-btn"
                aria-label="Hide sidebar"
                onClick={toggleSidebar}
              >
                ‹
              </button>
            </div>
          </div>
          <div className="toolbar-row">
            <div className="search-field">
              <span className="search-field-icon" aria-hidden="true">
                <SearchIcon size={14} />
              </span>
              <input
                aria-label="Search vault"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => {
                  const next = e.target.value;
                  setSearchText(next);
                  if (!next.trim()) clearSearch();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    void runSearch();
                    return;
                  }
                  if (e.key === "Escape") clearSearch();
                }}
                disabled={!hasVaults || searchBusy}
              />
              <button
                type="button"
                className="search-field-btn"
                aria-label="Search"
                onClick={() => void runSearch()}
                disabled={!hasVaults || searchBusy}
                aria-busy={searchBusy || undefined}
              >
                {searchBusy ? (
                  <span className="activity-step-icon activity-step-icon--spin search-field-spinner" aria-hidden="true" />
                ) : (
                  <SearchIcon size={14} />
                )}
              </button>
            </div>
          </div>
          <div className="toolbar-row mint-lint-trigger-row">
            <button
              type="button"
              className="mint-lint-trigger"
              disabled={!hasVaults || lintBusy}
              onClick={() => void startMintLint()}
            >
              <SparklesIcon size={14} />
              Mint &amp; Lint Vault
            </button>
          </div>
          <div className="panel-body file-list">
            {!hasVaults && initDone ? (
              <p style={{ padding: 12, color: "var(--text-muted)", fontSize: 13 }}>
                No files yet. Use Vault ⋯ to add vaults.
              </p>
            ) : searchPhase === "searching" ? (
              <SearchActivity label="Searching vault…" stepLabel={searchStepLabel} />
            ) : searchPhase === "results" ? (
              <>
                <div className="search-results-header">
                  <span>Search results</span>
                  <button type="button" className="linkish" onClick={clearSearch}>
                    Clear
                  </button>
                </div>
                {searchResults.map((result) => (
                  <button
                    key={result.path}
                    type="button"
                    className={`search-result${activePath === result.path ? " active" : ""}`}
                    onClick={() => void openSearchResult(result)}
                  >
                    <div className="search-result-title">
                      <span>{result.title ?? result.path}</span>
                      <span className="search-result-score">{formatSearchScore(result.score)}</span>
                    </div>
                    <div className="search-result-snippet">{result.snippet || result.path}</div>
                  </button>
                ))}
              </>
            ) : searchPhase === "empty" ? (
              <div className="search-empty">
                <p>No results for &ldquo;{searchText.trim()}&rdquo;</p>
                <button type="button" className="linkish" onClick={clearSearch}>
                  Clear
                </button>
              </div>
            ) : (
              <VaultFileTree
                files={files}
                activePath={activePath}
                onOpen={(path) => void openDocument(path)}
              />
            )}
          </div>
        </aside>

        <main className="center-pane">
          {sidebarCollapsed && (
            <button
              type="button"
              className="sidebar-reopen-handle"
              aria-label="Show sidebar"
              onClick={toggleSidebar}
            >
              ›
            </button>
          )}

          {!hasVaults && initDone && centerTab === "editor" ? (
            <EmptyVaultPanel
              vaultsRoot={vaultsRoot}
              onCreateVault={() => void createVault()}
              onImportVaults={() => void importVaults()}
              onChooseVaultsFolder={() => void chooseVaultsFolder()}
              onOpenSettings={() => changeCenterTab("settings")}
            />
          ) : centerTab === "editor" ? (
            <MarkdownEditor
              value={editorValue}
              onChange={setEditorValue}
              onSave={() => void saveDocument()}
              readOnly={!activePath}
            />
          ) : null}

          {centerTab === "graph" && (
            <div className="graph-area">
              {hasVaults ? (
                <>
                  <GraphCanvas
                    snapshot={graph}
                    selectedId={selectedNode?.id}
                    focusIds={graphFocusIds}
                    themePreference={resolveThemePreference(settings)}
                    onSelect={(id) => {
                      void navigateToLinkedPage(id);
                    }}
                  />
                  <IngestBar
                    vaultId={vaultId}
                    busy={ingestBusy}
                    activity={jobActivity}
                    onLog={log}
                    onBusyChange={setIngestBusy}
                    onActivityReset={resetJobActivity}
                    onComplete={async () => {
                      if (vaultId) await refreshVault(vaultId);
                    }}
                  />
                </>
              ) : (
                <EmptyVaultPanel
                  vaultsRoot={vaultsRoot}
                  onCreateVault={() => void createVault()}
                  onImportVaults={() => void importVaults()}
                  onChooseVaultsFolder={() => void chooseVaultsFolder()}
                  onOpenSettings={() => changeCenterTab("settings")}
                />
              )}
            </div>
          )}

          {centerTab === "settings" && (
            <div className="panel-body settings-form">
              <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                Vaults root: <code>{vaultsRoot}</code>
              </p>
              <h3 className="settings-section">Appearance</h3>
              <label>
                Theme
                <select
                  value={resolveThemePreference(settings)}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      theme: e.target.value as ThemePreference,
                    }))
                  }
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </label>
              <h3 className="settings-section">AI — Ingest</h3>
              <label>
                Ingest provider
                <select
                  value={settings.ingestProvider}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      ingestProvider: e.target.value as AppSettings["ingestProvider"],
                    }))
                  }
                >
                  <option value="deepseek">DeepSeek</option>
                  <option value="openai">OpenAI</option>
                </select>
              </label>
              <label>
                Ingest model
                <input
                  value={settings.ingestModel}
                  onChange={(e) => setSettings((s) => ({ ...s, ingestModel: e.target.value }))}
                />
              </label>
              <h3 className="settings-section">AI — Lint</h3>
              <label>
                Lint provider
                <select
                  value={settings.lintProvider}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      lintProvider: e.target.value as AppSettings["lintProvider"],
                    }))
                  }
                >
                  <option value="deepseek">DeepSeek</option>
                  <option value="openai">OpenAI</option>
                </select>
              </label>
              <label>
                Lint model
                <input
                  value={settings.lintModel}
                  onChange={(e) => setSettings((s) => ({ ...s, lintModel: e.target.value }))}
                />
              </label>
              <label>
                Vaults root (absolute path)
                <input
                  value={settings.vaultsRoot ?? ""}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, vaultsRoot: e.target.value || null }))
                  }
                />
              </label>
              <button type="button" onClick={() => void saveSettings()}>
                Save Settings
              </button>
              <button type="button" onClick={() => void chooseVaultsFolder()}>
                Browse vaults folder…
              </button>
              <button
                type="button"
                onClick={() => void rebuildIndex()}
                disabled={!hasVaults || indexRebuildBusy}
              >
                {indexRebuildBusy ? "Rebuilding index…" : "Rebuild Index"}
              </button>
              <button type="button" onClick={() => void importVaults()}>
                Import vaults from folder…
              </button>
              <button type="button" onClick={() => void runBootstrap()}>
                Re-run bootstrap
              </button>
            </div>
          )}

          {centerTab === "plugins" && (
            <div className="panel-body">
              <div className="plugin-card">
                <div>Install plugin from local folder</div>
                <input
                  value={pluginPath}
                  onChange={(e) => setPluginPath(e.target.value)}
                  placeholder="/path/to/plugin"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!pluginPath) return;
                    void api.pluginInstall(pluginPath).then((manifest) => {
                      log(`Installed plugin ${manifest.name}`);
                    });
                  }}
                >
                  Install
                </button>
              </div>
            </div>
          )}
        </main>

        <ResizableInspector
          document={document}
          node={selectedNode}
          history={history}
          searchMatch={searchMatch}
          onNavigateToPath={(path) => void navigateToLinkedPage(path)}
          onCreateMissingPage={(nodeId) => void createMissingPage(nodeId)}
          width={inspectorLayout.width}
          collapsed={inspectorLayout.collapsed}
          onWidthChange={inspectorLayout.setWidth}
          onCollapsedChange={inspectorLayout.setCollapsed}
        />
      </div>

      <StatusBar
        mode={statusBarMode}
        statusLine={statusLine}
        consoleLines={consoleLines}
        busy={ingestBusy || indexRebuildBusy || lintBusy || searchBusy || jobActivity.phase === "running"}
        idleHint={`Ready · ${modKey}K palette · ${modKey}J status bar`}
        onModeChange={setStatusBarModePersisted}
      />

      <MintLintModal
        open={mintLintOpen}
        vaultId={vaultId}
        phase={mintLintPhase}
        result={lintResult}
        applyProgress={mintLintApplyProgress}
        applyResult={mintLintApplyResult}
        onClose={closeMintLintModal}
        onApplyApproved={applyApprovedLintFixes}
      />

      <SourceDialog
        open={sourceDialogOpen}
        vaultId={vaultId}
        busy={ingestBusy}
        onClose={() => setSourceDialogOpen(false)}
        onLog={log}
        onComplete={async () => {
          if (vaultId) await refreshVault(vaultId);
        }}
      />

      <CommandPalette
        open={paletteOpen}
        sessionId={paletteSession}
        cliMode={paletteCliMode}
        commands={commands}
        onClose={() => {
          setPaletteOpen(false);
          setPaletteCliMode(false);
        }}
        onExecuteCli={handlePaletteCli}
      />

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
