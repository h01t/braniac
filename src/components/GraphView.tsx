'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { KnowledgeGraphData, KnowledgeNode } from '@/lib/types';
import { useVaultId } from '@/lib/useVaultId';

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CategoryBadge = ({ id }: { id: string }) => {
  const cat = id?.includes('concepts/') ? 'concept'
            : id?.includes('sources/')  ? 'source'
            : 'node';
  const colors: Record<string, string> = {
    concept: 'var(--accent)',
    source:  '#818cf8',
    node:    'var(--text-muted)',
  };
  return (
    <span style={{
      fontSize: '10px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase',
      padding: '2px 7px', borderRadius: '99px',
      border: `1px solid ${colors[cat]}`,
      color: colors[cat], flexShrink: 0,
    }}>
      {cat}
    </span>
  );
};

const EmptyState = () => (
  <div style={{
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    pointerEvents: 'none', gap: '14px',
  }}>
    <div style={{
      width: '10px', height: '10px', borderRadius: '50%',
      background: 'var(--accent)',
      boxShadow: '0 0 20px 6px var(--accent-glow)',
      animation: 'pulse-glow 2.5s ease-in-out infinite',
    }} />
    <div style={{ textAlign: 'center', color: 'var(--text-dim)', lineHeight: 1.7 }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
        No knowledge compiled yet
      </div>
      <div style={{ fontSize: '12.5px' }}>
        Drop a URL or PDF below to begin
      </div>
    </div>
  </div>
);

export default function GraphView() {
  const vaultId = useVaultId();

  return <GraphViewPanel key={vaultId} vaultId={vaultId} />;
}

function GraphViewPanel({ vaultId }: { vaultId: string }) {
  const [data, setData] = useState<KnowledgeGraphData>({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [markdownCache, setMarkdownCache] = useState<Record<string, string>>({});
  const [panelVisible, setPanelVisible] = useState(false);
  const fgRef = useRef<ForceGraphMethods<KnowledgeNode, { source: string; target: string }> | undefined>(undefined);

  const getCachedMarkdown = useCallback((filePath: string) => {
    if (markdownCache[filePath]) {
      return markdownCache[filePath];
    }
    return null;
  }, [markdownCache]);

  const fetchGraph = useCallback(() => {
    fetch(`/api/vaults/${vaultId}/graph`)
      .then(res => res.json())
      .then((nextData: KnowledgeGraphData) => setData(nextData));
  }, [vaultId]);

  useEffect(() => { fetchGraph(); }, [fetchGraph]);

  // Live refresh when a new ingest completes
  useEffect(() => {
    const handler = () => fetchGraph();
    window.addEventListener('vault-updated', handler);
    return () => window.removeEventListener('vault-updated', handler);
  }, [fetchGraph]);

  const openNode = useCallback((node: KnowledgeNode) => {
    setSelectedNode(node);
    setPanelVisible(false);

    const cached = getCachedMarkdown(node.id);
    if (cached) {
      setMarkdownContent(cached);
      requestAnimationFrame(() => setPanelVisible(true));
    } else {
      fetch(`/api/vaults/${vaultId}/content?filename=${node.id}`)
        .then(res => res.json())
        .then(d => {
          const raw = d.content || '*Content missing or node is uncreated.*';
          // Convert [[wikilinks]] → markdown links with wikilink: scheme for click-through
          const processed = raw.replace(/\[\[([^\]]+)\]\]/g, (_: string, target: string) => {
            const id = target.endsWith('.md') ? target : `${target}.md`;
            const label = id.split('/').pop()?.replace('.md', '') ?? id;
            return `[${label}](wikilink:${id})`;
          });
          setMarkdownContent(processed);
          setMarkdownCache(prev => ({ ...prev, [node.id]: processed }));
          requestAnimationFrame(() => setPanelVisible(true));
        });
    }
    if (fgRef.current) {
      fgRef.current.centerAt(node.x ?? 0, node.y ?? 0, 800);
      fgRef.current.zoom(2.8, 1000);
    }
  }, [vaultId, getCachedMarkdown]);

  const closePanel = useCallback(() => {
    setPanelVisible(false);
    setTimeout(() => setSelectedNode(null), 200);
  }, []);

  // Listen for open-node events from SearchBar
  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      const node = data.nodes.find((candidate) => candidate.id === id);
      if (node) {
        openNode(node);
      } else {
        // Fallback: node not in graph (e.g. root-level file) — open panel directly
        const name = (id as string).split('/').pop()?.replace('.md', '') ?? id;
        openNode({ id, name, val: 1, x: 0, y: 0 });
      }
    };
    window.addEventListener('open-node', handler);
    return () => window.removeEventListener('open-node', handler);
  }, [data.nodes, openNode]);

  // Escape key closes panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closePanel]);

  const markdownComponents: Components = {
    h1: props => <h1 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border)', color: 'var(--text-main)' }} {...props} />,
    h2: props => <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--accent)', marginTop: '20px', marginBottom: '8px' }} {...props} />,
    h3: props => <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '16px', marginBottom: '6px' }} {...props} />,
    p: props => <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '12px' }} {...props} />,
    a: ({ href, children, ...props }) => {
      const isWikilink = href?.startsWith('wikilink:');
      const isRelativeInternal = href
        && !href.startsWith('http')
        && !href.startsWith('#')
        && !href.startsWith('mailto:')
        && !href.startsWith('wikilink:');

      if (isWikilink || isRelativeInternal) {
        const nodeId = isWikilink ? href?.slice('wikilink:'.length) ?? '' : href ?? '';
        return (
          <a
            href="#"
            onClick={event => {
              event.preventDefault();
              window.dispatchEvent(new CustomEvent('open-node', { detail: { id: nodeId } }));
            }}
            title={`Open: ${nodeId}`}
            style={{
              color: 'var(--accent)',
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              textDecorationColor: 'var(--accent)',
              cursor: 'pointer',
            }}
          >
            {children}
          </a>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'underline', textDecorationColor: 'var(--accent-border)' }}
          {...props}
        >
          {children}
        </a>
      );
    },
    strong: props => <strong style={{ color: 'var(--text-main)', fontWeight: 600 }} {...props} />,
    hr: props => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} {...props} />,
    code: props => (
      <code
        style={{
          background: 'rgba(255,255,255,0.06)',
          padding: '2px 5px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
          color: 'var(--accent)',
        }}
        {...props}
      />
    ),
    pre: props => (
      <pre
        style={{
          background: '#010409',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          overflowX: 'auto',
          marginBottom: '12px',
          border: '1px solid var(--border)',
        }}
        {...props}
      />
    ),
    li: props => <li style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '4px' }} {...props} />,
    blockquote: props => <blockquote style={{ borderLeft: '3px solid var(--accent-border)', paddingLeft: '12px', marginLeft: 0, color: 'var(--text-dim)', fontStyle: 'italic' }} {...props} />,
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {data.nodes.length === 0 && <EmptyState />}

      <ForceGraph2D
        key={vaultId}
        ref={fgRef}
        graphData={data}
        nodeLabel="name"
        nodeAutoColorBy="id"
        onNodeClick={openNode}
        backgroundColor="#09090b"
        linkColor={() => 'rgba(0,239,209,0.2)'}
        linkWidth={1.2}
        nodeRelSize={5}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx: CanvasRenderingContext2D) => {
          const graphNode = node as KnowledgeNode;
          if (graphNode === selectedNode) {
            ctx.beginPath();
            ctx.arc(graphNode.x ?? 0, graphNode.y ?? 0, 8, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0,239,209,0.7)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }}
      />

      {/* Node detail panel */}
      {selectedNode && (
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '480px',
          backgroundColor: 'var(--bg-panel)',
          borderLeft: '1px solid var(--border)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column',
          transform: panelVisible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 20,
        }}>
          {/* Sticky header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            background: 'var(--bg-surface)',
            flexShrink: 0,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <CategoryBadge id={selectedNode.id} />
              </div>
              <h2 style={{
                color: 'var(--accent)', margin: 0,
                fontSize: '15px', fontWeight: 700, lineHeight: 1.3,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {selectedNode.name}
              </h2>
            </div>
            <button
              data-ghost="true"
              onClick={closePanel}
              style={{ flexShrink: 0, padding: '6px', marginTop: '-2px' }}
              title="Close (Esc)"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Markdown content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              urlTransform={(url) => url}
              components={markdownComponents}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
