import { useCallback, useMemo } from "react";
import type { CommandItem } from "../components/CommandPalette";
import { MonitorIcon, MoonIcon, SunIcon } from "../components/icons";
import { executePaletteCommand, type PaletteContext } from "../lib/paletteCli";
import type { IndexStatus, SearchResult, ThemePreference } from "../types";

type CenterTab = "editor" | "graph" | "settings" | "plugins";

type UsePaletteCommandsOptions = {
  vaultId: string;
  onLog: (line: string) => void;
  changeCenterTab: (tab: CenterTab) => void;
  setVaultId: (id: string) => void;
  refreshVault: (id: string) => Promise<void>;
  openDocument: (path: string) => Promise<void>;
  setIndexStatus: (status: IndexStatus | null) => void;
  setSearchBusy: (busy: boolean) => void;
  setSearchText: (text: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  saveDocument: () => Promise<void>;
  rebuildIndex: () => Promise<void>;
  startMintLint: () => Promise<void>;
  openMintLintReview: () => void;
  toggleStatusBar: () => void;
  persistTheme: (theme: ThemePreference) => Promise<void>;
  setSourceDialogOpen: (open: boolean) => void;
  setIngestBusy: (busy: boolean) => void;
};

export function usePaletteCommands({
  vaultId,
  onLog,
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
}: UsePaletteCommandsOptions) {
  const paletteContext = useMemo<PaletteContext>(
    () => ({
      vaultId,
      onLog,
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
    [
      vaultId,
      onLog,
      refreshVault,
      openDocument,
      changeCenterTab,
      setVaultId,
      setIndexStatus,
      setSearchBusy,
      setSearchText,
      setSearchResults,
    ],
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
    [paletteContext, startMintLint, openMintLintReview, setIngestBusy],
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
        label: "Dark",
        group: "Theme",
        icon: <MoonIcon size={14} />,
        run: () => void persistTheme("dark"),
      },
      {
        id: "theme-light",
        label: "Light",
        group: "Theme",
        icon: <SunIcon size={14} />,
        run: () => void persistTheme("light"),
      },
      {
        id: "theme-system",
        label: "System",
        group: "Theme",
        icon: <MonitorIcon size={14} />,
        run: () => void persistTheme("system"),
      },
      {
        id: "toggle-status-bar",
        label: "Toggle Status Bar",
        shortcut: "Cmd+J",
        run: () => toggleStatusBar(),
      },
    ],
    [
      saveDocument,
      rebuildIndex,
      startMintLint,
      toggleStatusBar,
      changeCenterTab,
      persistTheme,
      setSourceDialogOpen,
    ],
  );

  return { paletteContext, handlePaletteCli, commands };
}
