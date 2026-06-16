import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
  type LinkObject,
  type NodeObject,
} from "react-force-graph-2d";
import {
  clusterCssVar,
  clusterLabel,
  computeDegreeMap,
  linkEndpointId,
  nodeRadius,
} from "../lib/graphPaint";
import { useReducedMotion } from "../lib/motion";
import type { GraphNode, GraphSnapshot, ThemePreference } from "../types";
import { EyeIcon, EyeOffIcon, FitIcon, ResetIcon } from "./icons";

interface GraphCanvasProps {
  snapshot: GraphSnapshot | null;
  selectedId?: string | null;
  focusIds?: string[];
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
  clusters: Record<string, string>;
};

const FALLBACK_COLORS: GraphPaintColors = {
  missing: "rgba(245, 158, 11, 0.92)",
  selected: "#818CF8",
  hover: "#A5B4FC",
  default: "#4B5568",
  ring: "rgba(255, 255, 255, 0.85)",
  label: "rgba(248, 250, 252, 0.92)",
  link: "rgba(129, 140, 248, 0.22)",
  clusters: {},
};

function readGraphColors(el: HTMLElement | null): GraphPaintColors {
  const target = el ?? document.documentElement;
  const styles = getComputedStyle(target);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  const clusters: Record<string, string> = {};
  for (const cluster of ["concepts", "entities", "events", "papers", "sources"]) {
    clusters[cluster] = read(clusterCssVar(cluster), read("--graph-node-default", FALLBACK_COLORS.default));
  }

  return {
    missing: read("--graph-node-missing", FALLBACK_COLORS.missing),
    selected: read("--graph-node-selected", FALLBACK_COLORS.selected),
    hover: read("--graph-node-hover", FALLBACK_COLORS.hover),
    default: read("--graph-node-default", FALLBACK_COLORS.default),
    ring: read("--graph-node-ring", FALLBACK_COLORS.ring),
    label: read("--graph-node-label", FALLBACK_COLORS.label),
    link: read("--graph-link-color", FALLBACK_COLORS.link),
    clusters,
  };
}

function clusterFill(colors: GraphPaintColors, cluster: string | null | undefined): string {
  if (!cluster) return colors.default;
  return colors.clusters[cluster] ?? colors.default;
}

export function GraphCanvas({
  snapshot,
  selectedId,
  focusIds = [],
  onSelect,
  themePreference = "dark",
}: GraphCanvasProps) {
  const fgRef = useRef<ForceGraphMethods<GraphNodeObj, GraphLinkObj> | undefined>(
    undefined,
  );
  const [hoverNode, setHoverNode] = useState<GraphNodeObj | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hideMissing, setHideMissing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState<GraphPaintColors>(FALLBACK_COLORS);
  const reducedMotion = useReducedMotion();

  const focusSet = useMemo(() => new Set(focusIds), [focusIds]);

  const allPositioned = useMemo(
    () => snapshot?.nodes.every((n) => n.x != null && n.y != null) ?? false,
    [snapshot],
  );

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
    const nodes: GraphNodeObj[] = snapshot.nodes
      .filter((n) => !hideMissing || !n.missing)
      .map((n: GraphNode) => {
        const x = n.x != null ? n.x * dimensions.width : undefined;
        const y = n.y != null ? n.y * dimensions.height : undefined;
        return {
          id: n.id,
          label: n.label,
          missing: n.missing,
          cluster: n.cluster,
          val: n.val,
          x,
          y,
          ...(allPositioned && x != null && y != null ? { fx: x, fy: y } : {}),
        };
      });
    const nodeIds = new Set(nodes.map((n) => n.id));
    const links: GraphLinkObj[] = snapshot.edges
      .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map((e) => ({
        source: e.source,
        target: e.target,
      }));
    return { nodes, links };
  }, [snapshot, dimensions.width, dimensions.height, hideMissing, allPositioned]);

  const degreeMap = useMemo(() => computeDegreeMap(graphData.links), [graphData.links]);

  const presentClusters = useMemo(() => {
    const set = new Set<string>();
    for (const node of graphData.nodes) {
      if (!node.missing && node.cluster) set.add(node.cluster);
    }
    return Array.from(set).sort();
  }, [graphData.nodes]);

  const clusterCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const node of graphData.nodes) {
      if (!node.missing && node.cluster) {
        counts.set(node.cluster, (counts.get(node.cluster) ?? 0) + 1);
      }
    }
    return counts;
  }, [graphData.nodes]);

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

  // Force canvas repaint when selection/hover/focus change while simulation is idle.
  useEffect(() => {
    fgRef.current?.d3ReheatSimulation();
  }, [selectedId, hoverNode?.id, focusIds]);

  const paintNode = useCallback(
    (node: GraphNodeObj, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const label = node.label;
      const fontSize = 11 / globalScale;
      const degree = degreeMap.get(node.id) ?? 0;
      const radius = nodeRadius(degree, node.missing);
      const isSelected = node.id === selectedId;
      const isHover = node.id === hoverNode?.id;
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const dimmed = focusSet.size > 0 && !focusSet.has(node.id);

      const fill = node.missing
        ? colors.missing
        : isSelected
          ? colors.selected
          : isHover
            ? colors.hover
            : clusterFill(colors, node.cluster);

      ctx.save();
      ctx.globalAlpha = dimmed ? 0.22 : 1;
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
      ctx.restore();
    },
    [colors, degreeMap, focusSet, hoverNode?.id, selectedId],
  );

  const linkColor = useCallback(
    (link: GraphLinkObj) => {
      if (focusSet.size === 0) return colors.link;
      const s = linkEndpointId(link.source);
      const t = linkEndpointId(link.target);
      if (focusSet.has(s) || focusSet.has(t)) return colors.link;
      return colors.link.replace(/[\d.]+\)$/, "0.08)");
    },
    [colors.link, focusSet],
  );

  const zoomToFit = useCallback(() => {
    fgRef.current?.zoomToFit(400, 40);
  }, []);

  const resetView = useCallback(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.centerAt(0, 0, 300);
    fg.zoom(1, 300);
  }, []);

  if (!snapshot || snapshot.nodes.length === 0) {
    return (
      <div ref={containerRef} className="graph-canvas-empty">
        <p>No graph nodes yet. Compile a source to grow the knowledge graph.</p>
      </div>
    );
  }

  const isLargeGraph = snapshot.nodes.length > 1500;
  const missingCount = graphData.nodes.filter((n) => n.missing).length;

  return (
    <div ref={containerRef} className="graph-canvas-wrap">
      <div className="graph-canvas-overlay" aria-hidden="true">
        <div className="graph-legend">
          {presentClusters.map((cluster) => (
            <span key={cluster} className="graph-legend-item">
              <span
                className="graph-legend-dot"
                style={{ background: colors.clusters[cluster] ?? colors.default }}
              />
              {clusterLabel(cluster)}
              {clusterCounts.get(cluster) != null && (
                <span className="graph-legend-count">({clusterCounts.get(cluster)})</span>
              )}
            </span>
          ))}
          {missingCount > 0 && (
            <span className="graph-legend-item">
              <span className="graph-legend-dot graph-legend-dot--missing" />
              Missing
            </span>
          )}
        </div>
        <div className="graph-stats-chip">
          {graphData.nodes.length} nodes · {graphData.links.length} links
        </div>
      </div>
      <div className="graph-controls">
        <button type="button" className="graph-control-btn" title="Zoom to fit" onClick={zoomToFit}>
          <FitIcon size={14} />
        </button>
        <button type="button" className="graph-control-btn" title="Reset view" onClick={resetView}>
          <ResetIcon size={14} />
        </button>
        <button
          type="button"
          className={`graph-control-btn${hideMissing ? " graph-control-btn--active" : ""}`}
          title={hideMissing ? "Show missing nodes" : "Hide missing nodes"}
          onClick={() => setHideMissing((v) => !v)}
        >
          {hideMissing ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
        </button>
      </div>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeId="id"
        nodeVal="val"
        nodeCanvasObject={paintNode}
        nodeCanvasObjectMode={() => "replace"}
        nodePointerAreaPaint={(node, color, ctx) => {
          const n = node as GraphNodeObj;
          const degree = degreeMap.get(n.id) ?? 0;
          const r = nodeRadius(degree, n.missing) + 4;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(n.x ?? 0, n.y ?? 0, r, 0, 2 * Math.PI);
          ctx.fill();
        }}
        linkColor={linkColor}
        linkWidth={1}
        linkDirectionalParticles={
          reducedMotion || isLargeGraph ? 0 : 1
        }
        linkDirectionalParticleWidth={2}
        cooldownTicks={isLargeGraph ? 30 : 120}
        d3AlphaDecay={isLargeGraph ? 0.05 : 0.02}
        warmupTicks={allPositioned ? 0 : undefined}
        onNodeClick={(node) => {
          onSelect?.((node as GraphNodeObj).id);
        }}
        onNodeHover={(node) => setHoverNode((node as GraphNodeObj | null) ?? null)}
        backgroundColor="transparent"
      />
    </div>
  );
}
