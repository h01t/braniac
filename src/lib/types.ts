export interface VaultFileEntry {
  name: string;
  path: string;
  type: 'file';
}

export interface KnowledgeNode {
  id: string;
  name: string;
  val: number;
  x?: number;
  y?: number;
}

export interface KnowledgeLink {
  source: string;
  target: string;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
}

export interface SearchResultItem {
  file: string;
  title?: string;
  score: number;
  snippet: string;
}

export interface HistoryEntry {
  hash: string;
  message: string;
  date: string;
}
