export type AiProvider = "deepseek" | "openai";

export type ThemePreference = "light" | "dark" | "system";

export interface AppSettings {
  ingestProvider: AiProvider;
  ingestModel: string;
  lintProvider: AiProvider;
  lintModel: string;
  vaultsRoot?: string | null;
  theme?: ThemePreference;
}

export interface BootstrapResult {
  vaultIds: string[];
  imported: string[];
  createdWelcomeVault: boolean;
  vaultsRoot: string;
  message: string;
}

export interface VaultFileEntry {
  name: string;
  path: string;
  type: string;
}

export interface VaultManifest {
  id: string;
  name: string;
  rootPath: string;
  documentCount: number;
  lastOpenedAt?: string | null;
}

export interface KnowledgeDocument {
  path: string;
  title?: string | null;
  content: string;
  modifiedAt?: string | null;
}

export interface DocumentPatch {
  path: string;
  oldContent?: string | null;
  newContent: string;
  message: string;
}

export interface SearchQuery {
  text: string;
  limit?: number | null;
  fuzzy?: boolean | null;
  field?: string | null;
}

export interface SearchResult {
  path: string;
  title?: string | null;
  score: number;
  snippet: string;
}

export interface SearchMatchContext {
  query: string;
  score: number;
  snippet: string;
}

export interface GraphNode {
  id: string;
  label: string;
  val: number;
  x?: number | null;
  y?: number | null;
  cluster?: string | null;
  missing: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface GraphSnapshot {
  nodes: GraphNode[];
  edges: GraphEdge[];
  frame: number;
}

export interface LayoutOptions {
  iterations: number;
  gravity: number;
  scalingRatio: number;
  seed: number;
}

export interface HistoryEntry {
  hash: string;
  message: string;
  date: string;
}

export interface IndexStatus {
  vaultId: string;
  documentCount: number;
  indexedCount: number;
  stale: boolean;
  changedCount?: number;
  missingCount?: number;
  staleReason?: string | null;
  lastRebuildAt?: string | null;
  embeddingModel?: string | null;
}

export interface IngestRequest {
  vaultId: string;
  sourceUrl?: string | null;
  text?: string | null;
  filePath?: string | null;
}

export type PluginPermission =
  | "vaultRead"
  | "vaultWrite"
  | "searchQuery"
  | "indexRead"
  | "graphRead"
  | "ingestRun"
  | "aiRequest"
  | "uiPanel"
  | "commandsRegister";

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  entry: string;
  permissions: PluginPermission[];
}

export interface LintFix {
  id: string;
  path: string;
  action: string;
  reason: string;
  content?: string | null;
}

export interface LintResult {
  report: string;
  fixes: LintFix[];
  fromCache?: boolean;
  skippedCount?: number;
  cacheCommitHash?: string | null;
  currentCommitHash?: string | null;
}

export interface ApplyLintResult {
  applied: number;
  errors: string[];
  indexWarning?: string | null;
}

export interface PaletteResult {
  ok: boolean;
  message: string;
  jobId?: string | null;
  error?: string | null;
  uiAction?: string | null;
  uiValue?: string | null;
  searchResults?: SearchResult[] | null;
  indexStatus?: IndexStatus | null;
}

export type JobEvent =
  | { type: "started"; jobId: string }
  | { type: "progress"; jobId: string; message: string; percent?: number | null }
  | { type: "chunk"; jobId: string; content: string }
  | { type: "patchReady"; jobId: string; patches: DocumentPatch[] }
  | { type: "completed"; jobId: string }
  | { type: "warning"; jobId: string; message: string }
  | { type: "failed"; jobId: string; error: string }
  | { type: "cancelled"; jobId: string };
