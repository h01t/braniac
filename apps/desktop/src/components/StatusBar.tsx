import type { StatusBarMode } from "../lib/statusBar";

interface StatusBarProps {
  mode: StatusBarMode;
  statusLine: string;
  consoleLines: string[];
  busy: boolean;
  idleHint: string;
  onModeChange: (mode: StatusBarMode) => void;
}

function IdleHint({ hint }: { hint: string }) {
  const parts = hint.split(/(⌘K|⌘J|Ctrl\+K|Ctrl\+J)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part === "⌘K" || part === "⌘J" || part === "Ctrl+K" || part === "Ctrl+J") {
          return (
            <kbd key={`${part}-${i}`} className="kbd">
              {part}
            </kbd>
          );
        }
        return <span key={`${part}-${i}`}>{part}</span>;
      })}
    </>
  );
}

export function StatusBar({
  mode,
  statusLine,
  consoleLines,
  busy,
  idleHint,
  onModeChange,
}: StatusBarProps) {
  if (mode === "collapsed") {
    return (
      <footer className="status-bar status-bar--collapsed" aria-label="Status bar">
        <button
          type="button"
          className="status-bar-handle"
          onClick={() => onModeChange("compact")}
          aria-label="Show status bar"
          title="Show status bar"
        >
          ▲
        </button>
      </footer>
    );
  }

  if (mode === "expanded") {
    return (
      <footer className="status-bar status-bar--expanded" aria-label="Status bar">
        <div className="status-bar-toolbar">
          <span className="status-bar-label">Console</span>
          <button
            type="button"
            className="status-bar-toggle"
            onClick={() => onModeChange("compact")}
            aria-label="Collapse to compact"
          >
            ▾
          </button>
          <button
            type="button"
            className="status-bar-toggle"
            onClick={() => onModeChange("collapsed")}
            aria-label="Hide status bar"
          >
            ✕
          </button>
        </div>
        <div className="status-bar-log">
          {consoleLines.length === 0 ? (
            <div className="status-bar-idle">
              <IdleHint hint={idleHint} />
            </div>
          ) : (
            consoleLines.map((line, index) => (
              <div key={`${line}-${index}`}>{line}</div>
            ))
          )}
        </div>
      </footer>
    );
  }

  return (
    <footer className="status-bar status-bar--compact" aria-label="Status bar">
      {busy && <span className="status-bar-spinner" aria-hidden="true" />}
      <span className={`status-bar-message ${statusLine ? "" : "status-bar-message--idle"}`}>
        {statusLine || <IdleHint hint={idleHint} />}
      </span>
      <div className="status-bar-actions">
        <button
          type="button"
          className="status-bar-toggle"
          onClick={() => onModeChange("expanded")}
          aria-label="Expand console"
          title="Expand console"
        >
          ▴
        </button>
        <button
          type="button"
          className="status-bar-toggle"
          onClick={() => onModeChange("collapsed")}
          aria-label="Hide status bar"
          title="Hide status bar"
        >
          ✕
        </button>
      </div>
    </footer>
  );
}
