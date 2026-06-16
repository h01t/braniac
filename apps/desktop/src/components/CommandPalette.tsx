import { useEffect, useMemo, useState, type ReactNode } from "react";
import { isCliCommand, PALETTE_HELP } from "../lib/paletteCli";

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  group?: string;
  icon?: ReactNode;
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

type CommandSection = {
  group?: string;
  items: CommandItem[];
};

function buildSections(commands: CommandItem[]): CommandSection[] {
  const ungrouped: CommandItem[] = [];
  const groups = new Map<string, CommandItem[]>();
  for (const cmd of commands) {
    if (cmd.group) {
      const list = groups.get(cmd.group) ?? [];
      list.push(cmd);
      groups.set(cmd.group, list);
    } else {
      ungrouped.push(cmd);
    }
  }
  const sections: CommandSection[] = [];
  if (ungrouped.length > 0) sections.push({ items: ungrouped });
  for (const [group, items] of groups) {
    sections.push({ group, items });
  }
  return sections;
}

function filterSections(sections: CommandSection[], query: string): CommandSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return sections;
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          (section.group?.toLowerCase().includes(q) ?? false),
      ),
    }))
    .filter((section) => section.items.length > 0);
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

  const sections = useMemo(() => {
    const built = buildSections(commands);
    if (cliActive) return built;
    return filterSections(built, query);
  }, [commands, query, cliActive]);

  const itemsWithIndex = useMemo(() => {
    let index = 0;
    return sections.flatMap((section) =>
      section.items.map((command) => ({
        section,
        command,
        index: index++,
      })),
    );
  }, [sections]);

  const filtered = useMemo(
    () => itemsWithIndex.map((row) => row.command),
    [itemsWithIndex],
  );

  const preview = useMemo(() => {
    const q = query.trim();
    if (q === "help" || q === "?") return PALETTE_HELP;
    if (cliActive) return `CLI: ${q}`;
    return null;
  }, [query, cliActive]);

  useEffect(() => {
    setFocusIndex(0);
  }, [query]);

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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
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
          <ul className="command-palette-list">
            {sections.map((section) => (
              <li key={section.group ?? "__ungrouped"} className="command-palette-section">
                {section.group && (
                  <div className="palette-group-heading">{section.group}</div>
                )}
                <ul>
                  {section.items.map((command) => {
                    const row = itemsWithIndex.find((r) => r.command.id === command.id);
                    const index = row?.index ?? 0;
                    return (
                      <li key={command.id}>
                        <button
                          type="button"
                          className={index === focusIndex ? "focused" : undefined}
                          onClick={() => {
                            command.run();
                            onClose();
                          }}
                        >
                          {command.icon && (
                            <span className="palette-item-icon">{command.icon}</span>
                          )}
                          <span className="palette-item-label">{command.label}</span>
                          {command.shortcut && (
                            <span className="palette-item-shortcut">{command.shortcut}</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
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
