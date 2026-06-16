import { open } from "@tauri-apps/plugin-dialog";
import { api } from "../api";
import type { PaletteResult, SearchResult } from "../types";

export type { PaletteResult };

export interface PaletteContext {
  vaultId: string;
  onLog: (line: string) => void;
  onTab: (tab: string) => void;
  onVaultSwitch: (id: string) => Promise<void>;
  onOpenPath: (path: string) => Promise<void>;
  onSearchResults: (query: string, results: SearchResult[]) => void;
  onIndexStatus: (status: Awaited<ReturnType<typeof api.indexStatus>>) => void;
  onRefreshVault: () => Promise<void>;
}

export function isCliCommand(query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  const cliPrefixes = [
    "link:",
    "pdf:",
    "ingest:",
    "vault:",
    "open:",
    "search:",
    "index ",
    "lint",
    "mint",
    "job ",
    "graph",
    "editor",
    "settings",
    "plugins",
    "help",
    "?",
  ];
  return cliPrefixes.some((p) => q.startsWith(p) || q === p.replace(/ $/, ""));
}

export async function executePaletteCommand(
  line: string,
  ctx: PaletteContext,
): Promise<PaletteResult> {
  const result = await api.paletteExecute(line, ctx.vaultId);
  await applyPaletteResult(result, ctx);
  return result;
}

export async function applyPaletteResult(
  result: PaletteResult,
  ctx: PaletteContext,
): Promise<void> {
  if (result.error) {
    ctx.onLog(`Error: ${result.error}`);
    return;
  }
  if (result.message) {
    ctx.onLog(result.message);
  }
  if (result.indexStatus) {
    ctx.onIndexStatus(result.indexStatus);
  }
  if (result.uiAction === "pickPdf") {
    const selected = await open({
      multiple: false,
      filters: [{ name: "PDF", extensions: ["pdf"] }],
      title: "Select PDF to ingest",
    });
    if (typeof selected === "string") {
      const pdfResult = await api.paletteExecute(`pdf: ${selected}`, ctx.vaultId);
      await applyPaletteResult(pdfResult, ctx);
    }
    return;
  }
  if (result.uiAction === "vault" && result.uiValue) {
    await ctx.onVaultSwitch(result.uiValue);
  }
  if (result.uiAction === "open" && result.uiValue) {
    await ctx.onOpenPath(result.uiValue);
  }
  if (result.uiAction === "tab" && result.uiValue) {
    ctx.onTab(result.uiValue);
  }
  if (result.uiAction === "search" && result.searchResults) {
    ctx.onSearchResults(result.uiValue ?? "", result.searchResults);
  }
  if (result.jobId) {
    ctx.onLog(`Job ${result.jobId}`);
  }
  if (result.ok && (result.jobId || result.uiAction === "vault")) {
    await ctx.onRefreshVault();
  }
}

export const PALETTE_HELP = `Commands:
link: <url> | pdf: [path] | ingest: <text>
index rebuild | index status
lint | lint apply | mint
vault: <id> | open: <path> | search: <query>
graph | editor | settings | job cancel | help`;
