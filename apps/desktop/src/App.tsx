import { useCallback, useEffect, useMemo, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { api } from "./api";
import { CommandPalette, type CommandItem } from "./components/CommandPalette";
import { EmptyVaultPanel } from "./components/EmptyVaultPanel";
import { GraphCanvas } from "./components/GraphCanvas";
import { IngestBar } from "./components/IngestBar";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { MintLintModal, type MintLintPhase } from "./components/MintLintModal";
import { ResizableInspector, useInspectorLayout } from "./components/ResizableInspector";
import { SourceDialog } from "./components/SourceDialog";
import { StatusBar } from "./components/StatusBar";
import { VaultFileTree } from "./components/VaultFileTree";
import { VaultOverflowMenu } from "./components/VaultOverflowMenu";
import { BrandGlyphIcon, SearchIcon, SparklesIcon } from "./components/icons";
import { useJobActivity } from "./hooks/useJobActivity";
import { executePaletteCommand, type PaletteContext } from "./lib/paletteCli";
import { SearchActivity } from "./components/SearchActivity";
import { searchResultNavigationEffects } from "./lib/searchNavigation";
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
  ApplyLintResult,
  AppSettings,
  GraphNode,
  GraphSnapshot,
  HistoryEntry,
  IndexStatus,
  JobEvent,
  KnowledgeDocument,
  LintResult,
  SearchMatchContext,
  SearchResult,
  ThemePreference,
  VaultManifest,
  VaultFileEntry,
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
  const [vaults, setVaults] = useState<VaultManifest[]>([]);
  const [vaultId, setVaultId] = useState<string>("");
  const [vaultsRoot, setVaultsRoot] = useState<string>("");
  const [files, setFiles] = useState<VaultFileEntry[]>([]);
  const [activePath, setActivePath] = useState<string>("");
  const [document, setDocument] = useState<KnowledgeDocument | null>(null);
  const [editorValue, setEditorValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchMatch, setSearchMatch] = useState<SearchMatchContext | null>(null);
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchStepLabel, setSearchStepLabel] = useState("Querying index…");
  const [lintBusy, setLintBusy] = useState(false);
  const [mintLintOpen, setMintLintOpen] = useState(false);
  const [mintLintPhase, setMintLintPhase] = useState<MintLintPhase>("idle");
  const [mintLintApplyProgress, setMintLintApplyProgress] = useState({ done: 0, total: 0 });
  const [mintLintApplyResult, setMintLintApplyResult] = useState<ApplyLintResult | null>(null);
  const [indexStatus, setIndexStatus] = useState<IndexStatus | null>(null);
  const [graph, setGraph] = useState<GraphSnapshot | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [lintResult, setLintResult] = useState<LintResult | null>(null);
  const [lintJobId, setLintJobId] = useState<string | null>(null);
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

  const openPalette = useCallback((cliMode = false) => {
    setPaletteCliMode(cliMode);
    setPaletteSession((s) => s + 1);
    setPaletteOpen(true);
  }, []);
  const [sourceDialogOpen, setSourceDialogOpen] = useState(false);
  const [ingestBusy, setIngestBusy] = useState(false);
  const [indexRebuildBusy, setIndexRebuildBusy] = useState(false);
  const [pluginPath, setPluginPath] = useState("");
  const [initDone, setInitDone] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(loadSidebarCollapsed);
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

  const clearSearchResults = useCallback(() => {
    setSearchText("");
    setSearchResults([]);
    setSearchBusy(false);
  }, []);

  const clearSearch = useCallback(() => {
    clearSearchResults();
    setSearchMatch(null);
  }, [clearSearchResults]);

  const loadVaultsRoot = useCallback(async () => {
    try {
      const root = await api.vaultsRootGet();
      setVaultsRoot(root);
      return root;
    } catch {
      return "";
    }
  }, []);

  const refreshVault = useCallback(async (id: string) => {
    await api.vaultOpen(id);
    const listed = await api.vaultList();
    setVaults(listed);
    const manifest = listed.find((v) => v.id === id);
    if (!manifest) return;
    setFiles(await api.vaultFiles(id));
    const status = await api.indexStatus(id);
    setIndexStatus(status);
    const hist = await api.historyLog(id);
    setHistory(hist);
    const snap = await api.graphSnapshot(id);
    setGraph(snap);
  }, []);

  const loadVaultList = useCallback(async () => {
    const listed = await api.vaultList();
    setVaults(listed);
    return listed;
  }, []);

  const selectFirstVault = useCallback(
    async (listed: VaultManifest[]) => {
      if (listed.length === 0) {
        setVaultId("");
        setFiles([]);
        setActivePath("");
        setDocument(null);
        setEditorValue("");
        return;
      }
      const first = listed[0].id;
      setVaultId(first);
      await refreshVault(first);
    },
    [refreshVault],
  );

  const runBootstrap = useCallback(async () => {
    const result = await api.appBootstrap();
    setVaultsRoot(result.vaultsRoot);
    log(result.message);
    if (result.imported.length > 0) {
      log(`Imported: ${result.imported.join(", ")}`);
    }
    const listed = await loadVaultList();
    await selectFirstVault(listed);
    const s = await api.settingsGet();
    setSettings(s);
    applyThemePreference(resolveThemePreference(s));
    return result;
  }, [log, loadVaultList, selectFirstVault]);

  useEffect(() => {
    void (async () => {
      try {
        await loadVaultsRoot();
        const s = await api.settingsGet();
        setSettings(s);
        applyThemePreference(resolveThemePreference(s));
        let listed = await loadVaultList();
        if (listed.length === 0) {
          await runBootstrap();
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
          setIngestBusy(false);
          break;
        case "failed":
          log(`Job failed: ${event.error}`);
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
        default:
          break;
      }
    }).then((fn) => {
      unlisten = fn;
    });
    return () => unlisten?.();
  }, [log, handleJobEvent]);

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

  const openDocument = useCallback(
    async (path: string) => {
      if (!vaultId) return;
      setSearchMatch(null);
      const doc = await api.documentRead(vaultId, path);
      setActivePath(path);
      setDocument(doc);
      setEditorValue(doc.content);
      changeCenterTab("editor");
      const node = graph?.nodes.find((n) => n.id === path) ?? null;
      setSelectedNode(node);
    },
    [vaultId, graph, changeCenterTab],
  );

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
    [vaultId, graph, log],
  );

  const openSearchResult = useCallback(
    async (result: SearchResult) => {
      if (!vaultId) return;
      try {
        const doc = await api.documentRead(vaultId, result.path);
        setActivePath(result.path);
        setDocument(doc);
        setEditorValue(doc.content);
        const node = graph?.nodes.find((n) => n.id === result.path) ?? null;
        setSelectedNode(node);
        setSearchMatch({
          query: searchText.trim(),
          score: result.score,
          snippet: result.snippet,
        });
        const nav = searchResultNavigationEffects();
        if (nav.expandInspector) {
          inspectorLayout.setCollapsed(false);
        }
        changeCenterTab(nav.centerTab);
        log(`Focused ${result.path} on graph`);
      } catch (error) {
        log(`Could not open ${result.path}: ${String(error)}`);
      }
    },
    [vaultId, graph, changeCenterTab, searchText, inspectorLayout, log],
  );

  const saveDocument = useCallback(async () => {
    if (!vaultId || !activePath) return;
    await api.documentWrite(vaultId, activePath, editorValue, `Update ${activePath}`);
    log(`Saved ${activePath}`);
    await refreshVault(vaultId);
    const doc = await api.documentRead(vaultId, activePath);
    setDocument(doc);
    setEditorValue(doc.content);
  }, [vaultId, activePath, editorValue, log, refreshVault]);

  const chooseVaultsFolder = useCallback(async () => {
    const folder = await pickFolder(
      "Select folder containing vaults (e.g. this repo's vaults/ directory)",
    );
    if (!folder) return;
    const updated = await api.settingsUpdate({ ...settings, vaultsRoot: folder });
    setSettings(updated);
    await runBootstrap();
    log(`Vaults root set to ${folder}`);
  }, [settings, runBootstrap, log]);

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
    [log, loadVaultList, refreshVault, openDocument],
  );

  const runSearch = useCallback(
    async (query?: string) => {
      const q = (query ?? searchText).trim();
      if (!vaultId || !q || searchBusy) return;
      setSearchBusy(true);
      setSearchStepLabel("Querying index…");
      const stepTimer = window.setTimeout(() => setSearchStepLabel("Ranking results…"), 200);
      try {
        const results = await api.searchQuery(vaultId, {
          text: q,
          limit: 5,
          fuzzy: null,
          field: null,
        });
        setSearchResults(results);
        setSearchText(q);
        log(`Search returned ${results.length} results`);
      } catch (error) {
        log(`Search failed: ${String(error)}`);
        setSearchResults([]);
      } finally {
        window.clearTimeout(stepTimer);
        setSearchBusy(false);
      }
    },
    [vaultId, searchText, log, searchBusy],
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
  }, [vaultId, log, indexRebuildBusy]);

  const closeMintLintModal = useCallback(() => {
    setMintLintOpen(false);
    setMintLintPhase("idle");
    setMintLintApplyProgress({ done: 0, total: 0 });
    setMintLintApplyResult(null);
    setLintJobId(null);
  }, []);

  const startMintLint = useCallback(async () => {
    if (!vaultId || lintBusy) return;
    setMintLintOpen(true);
    setMintLintPhase("scanning");
    setMintLintApplyResult(null);
    setLintBusy(true);
    resetJobActivity();
    log("Running lint...");
    try {
      const jobId = await api.jobStartLint(vaultId);
      setLintJobId(jobId);
      const result = await api.jobLintResult(jobId);
      setLintResult(result);
      setMintLintPhase("review");
      if (result) {
        log(`${result.fixes.length} proposed fixes`);
      }
    } catch (error) {
      setLintResult({
        report: `Lint failed: ${String(error)}`,
        fixes: [],
      });
      setMintLintPhase("review");
      log(`Lint failed: ${String(error)}`);
    } finally {
      setLintBusy(false);
    }
  }, [vaultId, log, lintBusy, resetJobActivity]);

  const applyApprovedLintFixes = useCallback(
    async (fixIds: string[]) => {
      if (!vaultId || !lintJobId || fixIds.length === 0) return;
      setMintLintPhase("applying");
      setMintLintApplyProgress({ done: 0, total: fixIds.length });
      setLintBusy(true);
      try {
        const result = await api.jobLintApplySelected(vaultId, lintJobId, fixIds);
        setMintLintApplyProgress({ done: result.applied, total: fixIds.length });
        setMintLintApplyResult(result);
        setMintLintPhase("done");
        log(`Applied ${result.applied} lint fixes`);
        if (result.errors.length > 0) {
          log(result.errors.join("; "));
        }
        await refreshVault(vaultId);
        setLintResult(null);
        setLintJobId(null);
      } catch (error) {
        setMintLintApplyResult({ applied: 0, errors: [String(error)] });
        setMintLintPhase("done");
        log(`Apply fixes failed: ${String(error)}`);
      } finally {
        setLintBusy(false);
      }
    },
    [vaultId, lintJobId, log, refreshVault],
  );

  const openMintLintReview = useCallback(() => {
    if (lintResult) {
      setMintLintOpen(true);
      setMintLintPhase("review");
      return;
    }
    log("No lint results — run Mint & Lint first.");
  }, [lintResult, log]);

  const paletteContext = useMemo<PaletteContext>(
    () => ({
      vaultId,
      onLog: log,
      onTab: (tab) => changeCenterTab(tab as CenterTab),
      onVaultSwitch: async (id) => {
        setVaultId(id);
        await refreshVault(id);
      },
      onOpenPath: openDocument,
      onSearchResults: (query, results) => {
        setSearchBusy(true);
        setSearchText(query);
        setSearchResults(results);
        setSearchBusy(false);
      },
      onIndexStatus: setIndexStatus,
      onRefreshVault: async () => {
        if (vaultId) await refreshVault(vaultId);
      },
    }),
    [vaultId, log, refreshVault, openDocument, changeCenterTab],
  );

  const handlePaletteCli = useCallback(
    async (line: string) => {
      const isLintRun =
        line.startsWith("lint") && !line.includes("apply") && line !== "mint";
      const isLintApply = line === "mint" || line.includes("lint apply");
      if (isLintRun) {
        await startMintLint();
        return;
      }
      if (isLintApply) {
        openMintLintReview();
        return;
      }
      setIngestBusy(true);
      try {
        await executePaletteCommand(line, paletteContext);
      } finally {
        setIngestBusy(false);
      }
    },
    [paletteContext, startMintLint, openMintLintReview],
  );

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

  const commands = useMemo<CommandItem[]>(
    () => [
      {
        id: "new-source",
        label: "New Source",
        run: () => setSourceDialogOpen(true),
      },
      {
        id: "palette-search",
        label: "Focus Search",
        shortcut: "/",
        run: () => {
          const input = window.document.querySelector<HTMLInputElement>(
            '[aria-label="Search vault"]',
          );
          input?.focus();
        },
      },
      {
        id: "save",
        label: "Save Document",
        shortcut: "Cmd+S",
        run: () => void saveDocument(),
      },
      {
        id: "rebuild-index",
        label: "Rebuild Index",
        run: () => void rebuildIndex(),
      },
      {
        id: "lint",
        label: "Mint & Lint Vault",
        run: () => void startMintLint(),
      },
      {
        id: "open-graph",
        label: "Open Graph View",
        run: () => changeCenterTab("graph"),
      },
      {
        id: "open-settings",
        label: "Open Settings",
        run: () => changeCenterTab("settings"),
      },
      {
        id: "theme-dark",
        label: "Theme: Dark",
        run: () => void persistTheme("dark"),
      },
      {
        id: "theme-light",
        label: "Theme: Light",
        run: () => void persistTheme("light"),
      },
      {
        id: "theme-system",
        label: "Theme: System",
        run: () => void persistTheme("system"),
      },
      {
        id: "toggle-status-bar",
        label: "Toggle Status Bar",
        shortcut: "Cmd+J",
        run: () => toggleStatusBar(),
      },
    ],
    [saveDocument, rebuildIndex, startMintLint, toggleStatusBar, changeCenterTab, persistTheme],
  );

  const hasVaults = vaults.length > 0;
  const searchPhase = resolveSearchPhase(searchText, searchResults, searchBusy);

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
                  if (!next.trim()) clearSearchResults();
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
                    themePreference={resolveThemePreference(settings)}
                    onSelect={(id) => {
                      const node = graph?.nodes.find((n) => n.id === id) ?? null;
                      setSelectedNode(node);
                      void openDocument(id);
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
    </div>
  );
}
