import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatSearchScore, formatSearchSnippet } from "../lib/searchSnippet";
import type {
  GraphNode,
  HistoryEntry,
  KnowledgeDocument,
  LintResult,
  SearchMatchContext,
} from "../types";
import type { JobActivityState } from "../hooks/useJobActivity";
import { LintChangesPanel } from "./LintChangesPanel";

interface InspectorPanelProps {
  document: KnowledgeDocument | null;
  node: GraphNode | null;
  history: HistoryEntry[];
  searchMatch?: SearchMatchContext | null;
  lintResult?: LintResult | null;
  vaultId?: string;
  lintBusy?: boolean;
  lintActivity?: JobActivityState;
  showLintActivity?: boolean;
  onLintApply?: () => Promise<void>;
  embedded?: boolean;
}

export function InspectorPanel({
  document,
  node,
  history,
  searchMatch,
  lintResult,
  vaultId = "",
  lintBusy = false,
  lintActivity,
  showLintActivity = false,
  onLintApply,
  embedded = false,
}: InspectorPanelProps) {
  const body = (
    <div className="panel-body">
      {searchMatch && (
        <div className="inspector-block inspector-search-match">
          <h4>Search match</h4>
          <div className="search-match-meta">
            <span className="search-match-query">&ldquo;{searchMatch.query}&rdquo;</span>
            <span className="search-match-score">{formatSearchScore(searchMatch.score)}</span>
          </div>
          <pre className="search-match-snippet">{formatSearchSnippet(searchMatch.snippet)}</pre>
        </div>
      )}
      {node && (
        <div className="inspector-block">
          <h4>Node</h4>
          <div>{node.label}</div>
          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{node.id}</div>
          {node.missing && <div className="stale-warning">Missing page</div>}
        </div>
      )}
      {document && (
        <div className="inspector-block">
          <h4>Document</h4>
          <div className="markdown-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{document.content}</ReactMarkdown>
          </div>
        </div>
      )}
      <div className="inspector-block">
        <h4>History</h4>
        {history.slice(0, 8).map((entry) => (
          <div key={entry.hash} className="history-item" style={{ fontSize: 12 }}>
            <div>{entry.message}</div>
            <div style={{ color: "var(--text-muted)" }}>{entry.hash.slice(0, 8)}</div>
          </div>
        ))}
      </div>
      {vaultId && onLintApply && lintActivity && (
        <LintChangesPanel
          vaultId={vaultId}
          lintResult={lintResult ?? null}
          lintBusy={lintBusy}
          activity={lintActivity}
          showActivity={showLintActivity}
          onApply={onLintApply}
        />
      )}
    </div>
  );

  if (embedded) return body;

  return (
    <aside className="panel">
      <div className="panel-header">Inspector</div>
      {body}
    </aside>
  );
}
