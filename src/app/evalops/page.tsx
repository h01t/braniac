"use client";
import React, { useEffect, useState } from 'react';

export default function EvalOps() {
  const [history, setHistory] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null);
  const [diff, setDiff] = useState('');

  useEffect(() => {
    fetch('/api/vaults/default/history')
      .then(res => res.json())
      .then(d => setHistory(d.history || []));
  }, []);

  const loadDiff = (hash: string) => {
    setSelectedCommit(hash);
    fetch(`/api/vaults/default/diff?hash=${hash}`)
      .then(res => res.json())
      .then(d => setDiff(d.diff));
  }

  const renderDiffLine = (line: string, i: number) => {
    if (line.startsWith('+') && !line.startsWith('+++')) {
      return <div key={i} style={{ backgroundColor: 'var(--diff-add)', color: 'var(--diff-add-text)', padding: '2px 8px', margin: '1px 0' }}>{line}</div>;
    }
    if (line.startsWith('-') && !line.startsWith('---')) {
      return <div key={i} style={{ backgroundColor: 'var(--diff-sub)', color: 'var(--diff-sub-text)', padding: '2px 8px', margin: '1px 0' }}>{line}</div>;
    }
    return <div key={i} style={{ padding: '2px 8px', color: '#c9d1d9' }}>{line}</div>;
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
       <div style={{ width: '300px', borderRight: '1px solid var(--border)', overflowY: 'auto' }}>
          <div style={{ padding: '16px', fontWeight: 'bold', borderBottom: '1px solid var(--border)' }}>Knowledge History</div>
          {history.map((c: any) => (
             <div 
               key={c.hash} 
               onClick={() => loadDiff(c.hash)}
               style={{ 
                 padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border)',
                 backgroundColor: selectedCommit === c.hash ? 'var(--bg-hover)' : 'transparent',
                 transition: 'background-color 0.2s'
               }}>
               <div style={{ fontWeight: '500', marginBottom: '4px' }}>{c.message}</div>
               <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.date}</div>
             </div>
          ))}
       </div>
       <div style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: '#010409' }}>
         {!selectedCommit ? (
             <div style={{ color: 'var(--text-muted)' }}>Select a commit to view the knowledge differences.</div>
         ) : (
             <div style={{ border: '1px solid #30363d', borderRadius: '6px', overflow: 'hidden' }}>
               <div style={{ padding: '10px 16px', backgroundColor: '#161b22', borderBottom: '1px solid #30363d', color: '#c9d1d9', fontSize: '14px', fontFamily: 'monospace' }}>
                 Commit: {selectedCommit}
               </div>
               <pre style={{ margin: 0, padding: '16px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.4', overflowX: 'auto' }}>
                  {diff.split('\n').map(renderDiffLine)}
               </pre>
             </div>
         )}
       </div>
    </div>
  );
}
