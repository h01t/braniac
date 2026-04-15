'use client';
import React, { useEffect, useState, useCallback } from 'react';

const FileIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.6 }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const FolderIcon = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--accent)', opacity: 0.8 }}>
    {open
      ? <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></>
      : <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    }
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, opacity: 0.5, transition: 'transform 0.15s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const ShimmerRow = () => (
  <div style={{
    height: '22px', borderRadius: '4px', marginBottom: '4px',
    background: 'linear-gradient(90deg, var(--bg-surface) 25%, var(--bg-hover) 50%, var(--bg-surface) 75%)',
    backgroundSize: '400px 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
  }} />
);

export default function FileTree({ vaultId }: { vaultId: string }) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const fetchFiles = useCallback(() => {
    setLoading(true);
    fetch(`/api/vaults/${vaultId}/files`)
      .then(res => res.json())
      .then(d => {
        if (d.files) {
          setFiles(d.files.sort((a: any, b: any) => a.path.localeCompare(b.path)));
        }
      })
      .catch(err => console.error('Could not fetch file tree', err))
      .finally(() => setLoading(false));
  }, [vaultId]);

  // Initial load
  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  // Live refresh after ingestion
  useEffect(() => {
    const handler = () => fetchFiles();
    window.addEventListener('vault-updated', handler);
    return () => window.removeEventListener('vault-updated', handler);
  }, [fetchFiles]);

  const tree: Record<string, string[]> = {};
  files.forEach(f => {
    const parts = f.path.split('/');
    const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : 'root';
    if (!tree[dir]) tree[dir] = [];
    tree[dir].push(f.name);
  });

  const toggleDir = (dir: string) =>
    setCollapsed(prev => ({ ...prev, [dir]: !prev[dir] }));

  if (loading) {
    return (
      <div style={{ padding: '8px 0' }}>
        <ShimmerRow />
        <ShimmerRow />
        <ShimmerRow />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div style={{ color: 'var(--text-dim)', fontSize: '12px', padding: '8px 4px', fontStyle: 'italic' }}>
        No files yet
      </div>
    );
  }

  const openNode = (nodeId: string) => {
    window.dispatchEvent(new CustomEvent('open-node', { detail: { id: nodeId } }));
  };

  return (
    <div style={{ flex: 1, fontSize: '12.5px', color: 'var(--text-muted)', paddingBottom: '8px' }}>
      {Object.entries(tree).map(([dir, fnames]) => {
        const isOpen = collapsed[dir] !== true;
        return (
          <div key={dir} style={{ marginBottom: '2px' }}>
            {/* Folder header */}
            <div
              onClick={() => toggleDir(dir)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 8px', borderRadius: 'var(--radius-sm)',
                cursor: 'pointer', userSelect: 'none',
                transition: 'var(--transition)',
                color: 'var(--accent)',
                fontWeight: 600, fontSize: '11px',
                letterSpacing: '0.5px', textTransform: 'uppercase',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <ChevronIcon open={isOpen} />
              <FolderIcon open={isOpen} />
              {dir}
            </div>

            {/* Files */}
            {isOpen && (
              <div style={{ paddingLeft: '12px', borderLeft: '1px solid var(--border-subtle)', marginLeft: '14px' }}>
                {fnames.map(name => (
                  <div
                    key={name}
                    title={name}
                    onClick={() => openNode(dir === 'root' ? name : `${dir}/${name}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '4px 8px', borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer', transition: 'var(--transition)',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--bg-hover)';
                      e.currentTarget.style.color = 'var(--text-main)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '';
                    }}
                  >
                    <FileIcon />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
