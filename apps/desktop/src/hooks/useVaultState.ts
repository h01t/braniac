import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api";
import type {
  GraphNode,
  GraphSnapshot,
  HistoryEntry,
  IndexStatus,
  KnowledgeDocument,
  VaultFileEntry,
  VaultManifest,
} from "../types";

type CenterTab = "editor" | "graph" | "settings" | "plugins";

type UseVaultStateOptions = {
  onLog: (line: string) => void;
  changeCenterTab: (tab: CenterTab) => void;
  setSelectedNode: (node: GraphNode | null) => void;
  clearSearchMatch: () => void;
};

export function useVaultState({
  onLog,
  changeCenterTab,
  setSelectedNode,
  clearSearchMatch,
}: UseVaultStateOptions) {
  const [vaults, setVaults] = useState<VaultManifest[]>([]);
  const [vaultId, setVaultId] = useState("");
  const [vaultsRoot, setVaultsRoot] = useState("");
  const [files, setFiles] = useState<VaultFileEntry[]>([]);
  const [activePath, setActivePath] = useState("");
  const [document, setDocument] = useState<KnowledgeDocument | null>(null);
  const [editorValue, setEditorValue] = useState("");
  const [indexStatus, setIndexStatus] = useState<IndexStatus | null>(null);
  const [graphSnapshot, setGraphSnapshot] = useState<GraphSnapshot | null>(null);
  const graphRef = useRef(graphSnapshot);
  useEffect(() => {
    graphRef.current = graphSnapshot;
  }, [graphSnapshot]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [initDone, setInitDone] = useState(false);

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
    setGraphSnapshot(snap);
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
    onLog(result.message);
    if (result.imported.length > 0) {
      onLog(`Imported: ${result.imported.join(", ")}`);
    }
    const listed = await loadVaultList();
    await selectFirstVault(listed);
    return result;
  }, [onLog, loadVaultList, selectFirstVault]);

  const openDocument = useCallback(
    async (path: string) => {
      if (!vaultId) return;
      clearSearchMatch();
      const doc = await api.documentRead(vaultId, path);
      setActivePath(path);
      setDocument(doc);
      setEditorValue(doc.content);
      changeCenterTab("editor");
      const node = graphRef.current?.nodes.find((n) => n.id === path) ?? null;
      setSelectedNode(node);
    },
    [vaultId, changeCenterTab, setSelectedNode, clearSearchMatch],
  );

  const saveDocument = useCallback(async () => {
    if (!vaultId || !activePath) return;
    await api.documentWrite(vaultId, activePath, editorValue, `Update ${activePath}`);
    onLog(`Saved ${activePath}`);
    await refreshVault(vaultId);
    const doc = await api.documentRead(vaultId, activePath);
    setDocument(doc);
    setEditorValue(doc.content);
  }, [vaultId, activePath, editorValue, onLog, refreshVault]);

  return {
    vaults,
    setVaults,
    vaultId,
    setVaultId,
    vaultsRoot,
    setVaultsRoot,
    files,
    activePath,
    setActivePath,
    document,
    setDocument,
    editorValue,
    setEditorValue,
    indexStatus,
    setIndexStatus,
    graph: graphSnapshot,
    setGraph: setGraphSnapshot,
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
  };
}
