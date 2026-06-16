import { useCallback, useEffect, useRef, useState } from "react";
import { InspectorPanel } from "./InspectorPanel";
import type {
  GraphNode,
  HistoryEntry,
  KnowledgeDocument,
  SearchMatchContext,
} from "../types";

const WIDTH_KEY = "braniac.inspectorWidth";
const COLLAPSED_KEY = "braniac.inspectorCollapsed";
const MIN_WIDTH = 240;
const MAX_WIDTH = 560;
const DEFAULT_WIDTH = 320;
const COLLAPSED_WIDTH = 36;

function loadWidth(): number {
  try {
    const raw = localStorage.getItem(WIDTH_KEY);
    const n = raw ? Number(raw) : DEFAULT_WIDTH;
    return Number.isFinite(n) ? Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, n)) : DEFAULT_WIDTH;
  } catch {
    return DEFAULT_WIDTH;
  }
}

function loadCollapsed(): boolean {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

interface ResizableInspectorProps {
  document: KnowledgeDocument | null;
  node: GraphNode | null;
  history: HistoryEntry[];
  searchMatch?: SearchMatchContext | null;
  onNavigateToPath?: (path: string) => void;
  onWidthChange: (width: number) => void;
  onCollapsedChange: (collapsed: boolean) => void;
  width: number;
  collapsed: boolean;
}

export function ResizableInspector({
  document,
  node,
  history,
  searchMatch,
  onNavigateToPath,
  onWidthChange,
  onCollapsedChange,
  width,
  collapsed,
}: ResizableInspectorProps) {
  const dragging = useRef(false);

  const onResizeStart = useCallback(
    (e: React.PointerEvent) => {
      if (collapsed) return;
      e.preventDefault();
      dragging.current = true;
      const startX = e.clientX;
      const startWidth = width;

      let latest = startWidth;
      const onMove = (ev: PointerEvent) => {
        if (!dragging.current) return;
        latest = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + (startX - ev.clientX)));
        onWidthChange(latest);
      };
      const onUp = () => {
        dragging.current = false;
        try {
          localStorage.setItem(WIDTH_KEY, String(latest));
        } catch {
          /* ignore */
        }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [collapsed, onWidthChange, width],
  );

  useEffect(() => {
    if (!dragging.current) {
      try {
      localStorage.setItem(WIDTH_KEY, String(width));
    } catch {
      /* ignore */
    }
    }
  }, [width]);

  const toggleCollapsed = () => {
    const next = !collapsed;
    onCollapsedChange(next);
    try {
      localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  if (collapsed) {
    return (
      <aside className="panel inspector-panel inspector-collapsed">
        <button
          type="button"
          className="inspector-expand-strip"
          aria-label="Expand inspector"
          onClick={toggleCollapsed}
        >
          «
        </button>
      </aside>
    );
  }

  return (
    <aside className="panel inspector-panel">
      <div
        className="inspector-resize-handle"
        onPointerDown={onResizeStart}
        aria-hidden="true"
      />
      <div className="panel-header inspector-header">
        <span>Inspector</span>
        <button
          type="button"
          className="icon-btn"
          aria-label="Collapse inspector"
          onClick={toggleCollapsed}
        >
          »
        </button>
      </div>
      <InspectorPanel
        document={document}
        node={node}
        history={history}
        searchMatch={searchMatch}
        onNavigateToPath={onNavigateToPath}
        embedded
      />
    </aside>
  );
}

export function useInspectorLayout() {
  const [width, setWidth] = useState(loadWidth);
  const [collapsed, setCollapsed] = useState(loadCollapsed);
  const effectiveWidth = collapsed ? COLLAPSED_WIDTH : width;
  return { width, collapsed, effectiveWidth, setWidth, setCollapsed };
}
