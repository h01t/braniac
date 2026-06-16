import { formatSearchScore, formatSearchSnippet } from "../lib/searchSnippet";
import { WikilinkMarkdown } from "./WikilinkMarkdown";
import type {
  GraphNode,
  HistoryEntry,
  KnowledgeDocument,
  SearchMatchContext,
} from "../types";

interface InspectorPanelProps {
  document: KnowledgeDocument | null;
  node: GraphNode | null;
  history: HistoryEntry[];
  searchMatch?: SearchMatchContext | null;
  onNavigateToPath?: (path: string) => void;
  onCreateMissingPage?: (nodeId: string) => void;
  embedded?: boolean;
}

type HistoryTag = "link" | "orphan" | "section" | "edit";

function deriveHistoryTag(message: string): HistoryTag {
  const lower = message.toLowerCase();
  if (lower.includes("orphan")) return "orphan";
  if (lower.includes("link") || lower.includes("wikilink")) return "link";
  if (lower.includes("section")) return "section";
  return "edit";
}

export function InspectorPanel({
  document,
  node,
  history,
  searchMatch,
  onNavigateToPath,
  onCreateMissingPage,
  embedded = false,
}: InspectorPanelProps) {
  const showEmpty = !document && !node && !searchMatch;

  const body = (
    <div className="panel-body">
      {showEmpty && (
        <div className="inspector-empty">
          <p>Select a node or document to inspect.</p>
        </div>
      )}
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
          {node.missing && (
            <div className="inspector-missing-row">
              <span className="stale-warning">Missing page</span>
              {onCreateMissingPage && (
                <button
                  type="button"
                  className="inspector-create-page-btn"
                  onClick={() => onCreateMissingPage(node.id)}
                >
                  Create page
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {document && (
        <div className="inspector-block">
          <h4>Document</h4>
          <div className="markdown-preview">
            <WikilinkMarkdown
              content={document.content}
              onNavigate={onNavigateToPath}
            />
          </div>
        </div>
      )}
      <div className="inspector-block">
        <h4>History</h4>
        {history.length === 0 ? (
          <p className="inspector-history-empty">No history entries yet.</p>
        ) : (
          history.slice(0, 8).map((entry) => {
            const tag = deriveHistoryTag(entry.message);
            return (
              <div key={entry.hash} className="history-item">
                <span className={`history-tag history-tag--${tag}`}>{tag}</span>
                <div className="history-message">{entry.message}</div>
                <div className="history-hash">{entry.hash.slice(0, 8)}</div>
              </div>
            );
          })
        )}
      </div>
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
