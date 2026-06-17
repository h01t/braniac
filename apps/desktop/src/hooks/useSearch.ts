import { useCallback, useState } from "react";
import { api } from "../api";
import { searchResultNavigationEffects } from "../lib/searchNavigation";
import type { GraphSnapshot, SearchMatchContext, SearchResult } from "../types";

type CenterTab = "editor" | "graph" | "settings" | "plugins";

type UseSearchOptions = {
  vaultId: string;
  graph: GraphSnapshot | null;
  onLog: (line: string) => void;
  changeCenterTab: (tab: CenterTab) => void;
  setSelectedNode: (node: GraphSnapshot["nodes"][number] | null) => void;
  openDocument: (path: string) => Promise<void>;
  inspectorLayout: { setCollapsed: (collapsed: boolean) => void };
};

export function useSearch({
  vaultId,
  graph,
  onLog,
  changeCenterTab,
  setSelectedNode,
  openDocument,
  inspectorLayout,
}: UseSearchOptions) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchMatch, setSearchMatch] = useState<SearchMatchContext | null>(null);
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchStepLabel, setSearchStepLabel] = useState("Querying index…");

  const clearSearchResults = useCallback(() => {
    setSearchText("");
    setSearchResults([]);
    setSearchBusy(false);
  }, []);

  const clearSearch = useCallback(() => {
    clearSearchResults();
    setSearchMatch(null);
  }, [clearSearchResults]);

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
        onLog(`Search returned ${results.length} results`);
      } catch (error) {
        onLog(`Search failed: ${String(error)}`);
        setSearchResults([]);
      } finally {
        window.clearTimeout(stepTimer);
        setSearchBusy(false);
      }
    },
    [vaultId, searchText, onLog, searchBusy],
  );

  const openSearchResult = useCallback(
    async (result: SearchResult) => {
      if (!vaultId) return;
      try {
        await openDocument(result.path);
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
        onLog(`Focused ${result.path} on graph`);
      } catch (error) {
        onLog(`Could not open ${result.path}: ${String(error)}`);
      }
    },
    [vaultId, graph, changeCenterTab, searchText, inspectorLayout, onLog, openDocument, setSelectedNode],
  );

  return {
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
    clearSearchResults,
    runSearch,
    openSearchResult,
  };
}
