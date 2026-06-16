import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
  type LinkObject,
  type NodeObject,
} from "react-force-graph-2d";
import type { GraphNode, GraphSnapshot } from "../types";

interface GraphCanvasProps {
  snapshot: GraphSnapshot | null;
  selectedId?: string | null;
  onSelect?: (nodeId: string) => void;
}

type GraphNodeObj = NodeObject & {
  id: string;
  label: string;
  missing: boolean;
  cluster?: string | null;
};

type GraphLinkObj = LinkObject & { source: string; target: string };

export function GraphCanvas({ snapshot, selectedId, onSelect }: GraphCanvasProps) {
  const fgRef = useRef<ForceGraphMethods<GraphNodeObj, GraphLinkObj> | undefined>(
    undefined,
  );
  const [hoverNode, setHoverNode] = useState<GraphNodeObj | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

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
      const fontSize = 12 / globalScale;
      const radius = node.missing ? 4 : 6;
      const isSelected = node.id === selectedId;
      const isHover = node.id === hoverNode?.id;

      ctx.beginPath();
      ctx.fillStyle = node.missing
        ? "rgba(240, 193, 74, 0.95)"
        : isSelected
          ? "#5b9dff"
          : isHover
            ? "#a8c4ff"
            : "#8ea6d8";
      ctx.arc(node.x ?? 0, node.y ?? 0, radius, 0, 2 * Math.PI);
      ctx.fill();
      if (isSelected || isHover) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5 / globalScale;
        ctx.stroke();
      }

      if (isHover || isSelected) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fillText(label, (node.x ?? 0) + 8, (node.y ?? 0) + 4);
      }
    },
    [hoverNode?.id, selectedId],
  );

  if (!snapshot || snapshot.nodes.length === 0) {
    return (
      <div ref={containerRef} className="graph-canvas-empty">
        <p>No graph nodes yet. Compile a source to grow the knowledge graph.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="graph-canvas-wrap">
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
        linkColor={() => "rgba(154, 167, 189, 0.35)"}
        linkWidth={1}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={2}
        cooldownTicks={120}
        d3AlphaDecay={0.02}
        onNodeClick={(node) => onSelect?.((node as GraphNodeObj).id)}
        onNodeHover={(node) => setHoverNode((node as GraphNodeObj | null) ?? null)}
        backgroundColor="transparent"
      />
    </div>
  );
}
