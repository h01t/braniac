"use client";
import React, { useEffect, useState } from 'react';

export default function FileTree({ vaultId }: { vaultId: string }) {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/vaults/${vaultId}/files`)
      .then(res => res.json())
      .then(d => {
        if (d.files) {
          // Sort so things like 'concepts/a.md' are grouped nicely
          setFiles(d.files.sort((a: any, b: any) => a.path.localeCompare(b.path)));
        }
      })
      .catch(err => console.error("Could not fetch file tree", err));
  }, [vaultId]);

  // Group by directory
  const tree: Record<string, string[]> = {};
  files.forEach(f => {
    const parts = f.path.split('/');
    const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : '/';
    if (!tree[dir]) tree[dir] = [];
    tree[dir].push(f.name);
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
      {Object.entries(tree).map(([dir, fnames]) => (
        <div key={dir} style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent)', marginBottom: '4px' }}>
            {dir === '/' ? 'root' : dir}
          </div>
          <div style={{ paddingLeft: '8px', borderLeft: '1px solid var(--border)' }}>
            {fnames.map(name => (
              <div key={name} style={{ padding: '2px 0' }}>📄 {name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
