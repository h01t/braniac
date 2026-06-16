import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
  type LinkObject,
  type NodeObject,
} from "react-force-graph-2d";
import type { GraphNode, GraphSnapshot, ThemePreference } from "../types";

interface GraphCanvasProps {
  snapshot: GraphSnapshot | null;
  selectedId?: string | null;
  onSelect?: (nodeId: string) => void;
  themePreference?: ThemePreference;
}

type GraphNodeObj = NodeObject & {
  id: string;
  label: string;
  missing: boolean;
  cluster?: string | null;
};

type GraphLinkObj = LinkObject & { source: string; target: string };

type GraphPaintColors = {
  missing: string;
  selected: string;
  hover: string;
  default: string;
  ring: string;
  label: string;
  link: string;
};

const FALLBACK_COLORS: GraphPaintColors = {
  missing: "rgba(245, 158, 11, 0.92)",
  selected: "#818CF8",
  hover: "#A5B4FC",
  default: "#4B5568",
  ring: "rgba(255, 255, 255, 0.85)",
  label: "rgba(248, 250, 252, 0.92)",
  link: "rgba(129, 140, 248, 0.18)",
};

function readGraphColors(el: HTMLElement | null): GraphPaintColors {
  const target = el ?? document.documentElement;
  const styles = getComputedStyle(target);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    missing: read("--graph-node-missing", FALLBACK_COLORS.missing),
    selected: read("--graph-node-selected", FALLBACK_COLORS.selected),
    hover: read("--graph-node-hover", FALLBACK_COLORS.hover),
    default: read("--graph-node-default", FALLBACK_COLORS.default),
    ring: read("--graph-node-ring", FALLBACK_COLORS.ring),
    label: read("--graph-node-label", FALLBACK_COLORS.label),
    link: read("--graph-link-color", FALLBACK_COLORS.link),
  };
}

export function GraphCanvas({
  snapshot,
  selectedId,
  onSelect,
  themePreference = "dark",
}: GraphCanvasProps) {
  const fgRef = useRef<ForceGraphMethods<GraphNodeObj, GraphLinkObj> | undefined>(
    undefined,
  );
  const [hoverNode, setHoverNode] = useState<GraphNodeObj | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState<GraphPaintColors>(FALLBACK_COLORS);

  useLayoutEffect(() => {
    setColors(readGraphColors(containerRef.current));
  }, [themePreference]);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setColors(readGraphColors(containerRef.current));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const graphData = useMemo(() => {
    if (!snapshot) {
      return { nodes: [] as GraphNodeObj[], links: [] as GraphLinkObj[] };
    }
    const nodes: GraphNodeObj[] = snapshot.nodes.map((n: GraphNode) => ({
      id: n.id,
      label: n.label,
      missing: n.missing,
      cluster: n.cluster,
      val: n.val,
      x: n.x != null ? n.x * dimensions.width : undefined,
      y: n.y != null ? n.y * dimensions.height : undefined,
    }));
    const links: GraphLinkObj[] = snapshot.edges.map((e) => ({
      source: e.source,
      target: e.target,
    }));
    return { nodes, links };
  }, [snapshot, dimensions.width, dimensions.height]);

  const FOCUS_ZOOM = 2.5;
  const FOCUS_DURATION_MS = 400;

  useEffect(() => {
    if (!selectedId) return;
    const node = graphData.nodes.find((n) => n.id === selectedId);
    if (node?.x == null || node?.y == null) return;
    const fg = fgRef.current;
    if (!fg) return;
    fg.centerAt(node.x, node.y, FOCUS_DURATION_MS);
    fg.zoom(FOCUS_ZOOM, FOCUS_DURATION_MS);
  }, [selectedId, graphData]);

  const paintNode = useCallback(
    (node: GraphNodeObj, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const label = node.label;
      const fontSize = 11 / globalScale;
      const radius = node.missing ? 4 : 5.5;
      const isSelected = node.id === selectedId;
      const isHover = node.id === hoverNode?.id;
      const x = node.x ?? 0;
      const y = node.y ?? 0;

      const fill = node.missing
        ? colors.missing
        : isSelected
          ? colors.selected
          : isHover
            ? colors.hover
            : colors.default;

      ctx.beginPath();
      ctx.fillStyle = fill;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();

      if (isSelected || isHover) {
        ctx.beginPath();
        ctx.strokeStyle = colors.ring;
        ctx.lineWidth = 1.25 / globalScale;
        ctx.arc(x, y, radius + 2 / globalScale, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.font = `500 ${fontSize}px var(--font-sans, sans-serif)`;
        ctx.fillStyle = colors.label;
        ctx.fillText(label, x + 9 / globalScale, y + 3 / globalScale);
      }
    },
    [colors, hoverNode?.id, selectedId],
  );

  if (!snapshot || snapshot.nodes.length === 0) {
    return (
      <div ref={containerRef} className="graph-canvas-empty">
        <p>No graph nodes yet. Compile a source to grow the knowledge graph.</p>
      </div>
    );
  }

  const isLargeGraph = snapshot.nodes.length > 1500;
  const allPositioned = snapshot.nodes.every((n) => n.x != null && n.y != null);

  return (
    <div ref={containerRef} className="graph-canvas-wrap">
      <div className="graph-canvas-overlay" aria-hidden="true">
        <div className="graph-legend">
          <span className="graph-legend-item">
            <span className="graph-legend-dot graph-legend-dot--concept" />
            Concept
          </span>
          <span className="graph-legend-item">
            <span className="graph-legend-dot graph-legend-dot--missing" />
            Missing
          </span>
        </div>
        <div className="graph-stats-chip">
          {graphData.nodes.length} nodes · {graphData.links.length} links
        </div>
      </div>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeId="id"
        nodeVal="val"
        nodeCanvasObject={paintNode}
        nodePointerAreaPaint={(node, color, ctx) => {
          const n = node as GraphNodeObj;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, 10, 0, 2 * Math.PI);
          ctx.fill();
        }}
        linkColor={() => colors.link}
        linkWidth={1}
        linkDirectionalParticles={isLargeGraph ? 0 : 1}
        linkDirectionalParticleWidth={2}
        cooldownTicks={isLargeGraph ? 30 : 120}
        d3AlphaDecay={isLargeGraph ? 0.05 : 0.02}
        warmupTicks={allPositioned ? 0 : undefined}
        onNodeClick={(node) => onSelect?.((node as GraphNodeObj).id)}
        onNodeHover={(node) => setHoverNode((node as GraphNodeObj | null) ?? null)}
        backgroundColor="transparent"
      />
    </div>
  );
}
