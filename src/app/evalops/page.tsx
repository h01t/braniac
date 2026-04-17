'use client';
import React, { useEffect, useState } from 'react';

const GitBranchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
);

const DiffStat = ({ diff }: { diff: string }) => {
  const lines = diff.split('\n');
  const added = lines.filter(l => l.startsWith('+') && !l.startsWith('+++')).length;
  const removed = lines.filter(l => l.startsWith('-') && !l.startsWith('---')).length;
  if (!added && !removed) return null;
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {added > 0 && (
        <span style={{
          fontSize: '11px', fontWeight: 700, padding: '1px 7px', borderRadius: '99px',
          background: 'var(--diff-add)', color: 'var(--diff-add-text)',
          border: '1px solid rgba(74,222,128,0.2)',
        }}>+{added}</span>
      )}
      {removed > 0 && (
        <span style={{
          fontSize: '11px', fontWeight: 700, padding: '1px 7px', borderRadius: '99px',
          background: 'var(--diff-sub)', color: 'var(--diff-sub-text)',
          border: '1px solid rgba(248,113,113,0.2)',
        }}>−{removed}</span>
      )}
    </div>
  );
};

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays}d ago`;
  } catch {
    return dateStr;
  }
}

export default function EvalOps() {
  const vaultId = useVaultId();
  const [history, setHistory] = useState<any[]>([]);
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [diff, setDiff] = useState('');

  useEffect(() => {
    fetch(`/api/vaults/${vaultId}/history`)
      .then(res => res.json())
      .then(d => setHistory(d.history || []));
  }, [vaultId]);

  const loadDiff = (hash: string, message: string) => {
    setSelectedCommit(hash);
    setSelectedMessage(message);
    setDiff('');
    fetch(`/api/vaults/default/diff?hash=${hash}`)
      .then(res => res.json())
      .then(d => setDiff(d.diff || ''));
  };

  const renderDiffLine = (line: string, i: number) => {
    // Hunk header
    if (line.startsWith('@@')) {
      return (
        <div key={i} style={{
          backgroundColor: 'var(--diff-hunk)', color: 'var(--diff-hunk-text)',
          padding: '2px 10px', margin: '4px 0',
          fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
          fontSize: '11.5px', display: 'flex',
        }}>
          <span style={{ marginRight: '8px', opacity: 0.5 }}>··</span>
          {line}
        </div>
      );
    }
    if (line.startsWith('+') && !line.startsWith('+++')) {
      return (
        <div key={i} style={{
          backgroundColor: 'var(--diff-add)', color: 'var(--diff-add-text)',
          padding: '1px 10px', display: 'flex', gap: '8px',
        }}>
          <span style={{ opacity: 0.6, userSelect: 'none', minWidth: '12px' }}>+</span>
          <span>{line.slice(1)}</span>
        </div>
      );
    }
    if (line.startsWith('-') && !line.startsWith('---')) {
      return (
        <div key={i} style={{
          backgroundColor: 'var(--diff-sub)', color: 'var(--diff-sub-text)',
          padding: '1px 10px', display: 'flex', gap: '8px',
        }}>
          <span style={{ opacity: 0.6, userSelect: 'none', minWidth: '12px' }}>−</span>
          <span>{line.slice(1)}</span>
        </div>
      );
    }
    // File headers
    if (line.startsWith('diff ') || line.startsWith('index ') || line.startsWith('+++') || line.startsWith('---')) {
      return (
        <div key={i} style={{ padding: '1px 10px', color: 'var(--text-dim)', fontSize: '11.5px' }}>{line}</div>
      );
    }
    return (
      <div key={i} style={{ padding: '1px 10px', color: '#c9d1d9' }}>{line}</div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Commit list */}
      <div style={{
        width: '300px', borderRight: '1px solid var(--border)',
        overflowY: 'auto', flexShrink: 0, background: 'var(--bg-panel)',
      }}>
        <div style={{
          padding: '14px 16px', fontWeight: 700, fontSize: '12px',
          letterSpacing: '0.5px', borderBottom: '1px solid var(--border)',
          color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--bg-surface)',
        }}>
          <GitBranchIcon />
          Knowledge History
        </div>

        {history.length === 0 && (
          <div style={{ padding: '24px 16px', color: 'var(--text-dim)', fontSize: '12.5px', textAlign: 'center' }}>
            No commits yet
          </div>
        )}

        {history.map((c: any) => {
          const isActive = selectedCommit === c.hash;
          return (
            <div
              key={c.hash}
              onClick={() => loadDiff(c.hash, c.message)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--border-subtle)',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                backgroundColor: isActive ? 'var(--accent-dim)' : 'transparent',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-hover)'; }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                  background: isActive ? 'var(--accent)' : 'var(--text-dim)',
                  boxShadow: isActive ? '0 0 6px var(--accent)' : 'none',
                  transition: 'var(--transition)',
                }} />
                <span style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
                  fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
                  color: isActive ? 'var(--accent)' : 'var(--text-dim)',
                  background: 'var(--bg-surface)', padding: '1px 5px',
                  borderRadius: '4px', border: '1px solid var(--border)',
                }}>
                  {c.hash?.slice(0, 7)}
                </span>
              </div>
              <div style={{
                fontWeight: 500, fontSize: '12.5px', color: 'var(--text-main)',
                marginBottom: '4px', lineHeight: 1.35,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {c.message}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                {formatDate(c.date)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Diff panel */}
      <div style={{
        flex: 1, overflowY: 'auto', background: '#010409', minWidth: 0,
      }}>
        {!selectedCommit ? (
          <div style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '12px', color: 'var(--text-dim)',
          }}>
            <GitBranchIcon />
            <div style={{ fontSize: '13px' }}>Select a commit to inspect knowledge changes</div>
          </div>
        ) : (
          <div>
            {/* Diff header */}
            <div style={{
              position: 'sticky', top: 0, zIndex: 5,
              padding: '10px 16px',
              background: '#161b22', borderBottom: '1px solid #30363d',
              display: 'flex', alignItems: 'center', gap: '12px',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
                fontSize: '12px', color: '#c9d1d9',
                background: '#0d1117', padding: '2px 8px',
                borderRadius: '5px', border: '1px solid #30363d',
              }}>
                {selectedCommit.slice(0, 7)}
              </span>
              <span style={{ fontSize: '12.5px', color: '#8b949e', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedMessage}
              </span>
              {diff && <DiffStat diff={diff} />}
            </div>

            {/* Diff body */}
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', margin: '16px' }}>
              <pre style={{
                margin: 0, padding: 0,
                fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
                fontSize: '12.5px', lineHeight: '1.5',
                overflowX: 'auto',
                background: '#010409',
              }}>
                {diff
                  ? diff.split('\n').map(renderDiffLine)
                  : <div style={{ padding: '24px', color: 'var(--text-dim)', fontSize: '12.5px' }}>Loading diff...</div>
                }
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
