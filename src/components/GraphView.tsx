"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function GraphView({ vaultId }: { vaultId: string }) {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const fgRef = useRef<any>(null);

  useEffect(() => {
    fetch(`/api/vaults/${vaultId}/graph`)
      .then(res => res.json())
      .then(setData);
  }, [vaultId]);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node);
    fetch(`/api/vaults/${vaultId}/content?filename=${node.id}`)
      .then(res => res.json())
      .then(d => setMarkdownContent(d.content || 'Content missing or node is uncreated.'));
      
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(3, 2000);
    }
  }, [vaultId]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeLabel="name"
        nodeAutoColorBy="id"
        onNodeClick={handleNodeClick}
        backgroundColor="#0A0A0A"
        linkColor={() => 'rgba(0,239,209,0.3)'}
        nodeRelSize={6}
      />
      {selectedNode && (
        <div style={{ 
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '450px', 
          backgroundColor: 'var(--bg-panel)', borderLeft: '1px solid var(--border)', 
          padding: '24px', overflowY: 'auto',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.5)'
        }}>
          <button onClick={() => setSelectedNode(null)} style={{float:'right'}}>✕</button>
          <h2 style={{color: 'var(--accent)', marginTop: 0, paddingRight: '40px'}}>{selectedNode.name}</h2>
          <hr style={{borderColor: 'var(--border)', margin: '16px 0'}} />
          <div style={{fontSize: '0.95rem', lineHeight: 1.6}}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({node, ...props}) => <a style={{color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline'}} {...props} />,
                code: ({node, inline, ...props}: any) => (
                  <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '4px' }} {...props} />
                ),
                pre: ({node, ...props}) => (
                  <pre style={{ background: '#010409', padding: '12px', borderRadius: '6px', overflowX: 'auto' }} {...props} />
                )
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
