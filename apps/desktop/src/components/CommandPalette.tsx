import { useEffect, useMemo, useState } from "react";
import { isCliCommand, PALETTE_HELP } from "../lib/paletteCli";

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  sessionId?: number;
  cliMode?: boolean;
  commands: CommandItem[];
  onClose: () => void;
  onExecuteCli?: (line: string) => Promise<void>;
}

function CommandPalettePanel({
  cliMode = false,
  commands,
  onClose,
  onExecuteCli,
}: Omit<CommandPaletteProps, "open" | "sessionId">) {
  const [query, setQuery] = useState("");
  const [focusIndex, setFocusIndex] = useState(0);

  const cliActive = isCliCommand(query) || query.trim() === "help" || query.trim() === "?";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || cliActive) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query, cliActive]);

  const preview = useMemo(() => {
    const q = query.trim();
    if (q === "help" || q === "?") return PALETTE_HELP;
    if (cliActive) return `CLI: ${q}`;
    return null;
  }, [query, cliActive]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (cliActive && onExecuteCli) {
          void onExecuteCli(query.trim()).then(() => onClose());
          return;
        }
        if (filtered[focusIndex]) {
          filtered[focusIndex].run();
          onClose();
        }
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filtered, focusIndex, onClose, cliActive, onExecuteCli, query]);

  return (
    <div
      className="command-palette-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="command-palette">
        <input
          autoFocus
          placeholder={
            cliMode
              ? "link: URL, pdf:, index rebuild, lint, help…"
              : "Type a command, link: URL, pdf:, or index rebuild…"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setFocusIndex(0);
          }}
          aria-label="Command search"
        />
        {preview && <pre className="palette-preview">{preview}</pre>}
        {!cliActive && (
          <ul>
            {filtered.map((command, index) => (
              <li key={command.id}>
                <button
                  type="button"
                  className={index === focusIndex ? "focused" : undefined}
                  onClick={() => {
                    command.run();
                    onClose();
                  }}
                >
                  {command.label}
                  {command.shortcut ? ` (${command.shortcut})` : ""}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function CommandPalette({
  open,
  sessionId = 0,
  cliMode = false,
  commands,
  onClose,
  onExecuteCli,
}: CommandPaletteProps) {
  if (!open) {
    return null;
  }

  return (
    <CommandPalettePanel
      key={sessionId}
      cliMode={cliMode}
      commands={commands}
      onClose={onClose}
      onExecuteCli={onExecuteCli}
    />
  );
}
