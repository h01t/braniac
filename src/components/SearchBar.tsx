'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';

const SearchIcon = ({ loading }: { loading: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{
      position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
      color: loading ? 'var(--accent)' : 'var(--text-dim)',
      animation: loading ? 'pulse-glow 1s ease-in-out infinite' : 'none',
      pointerEvents: 'none', transition: 'color 0.2s',
    }}
  >
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const ScoreBadge = ({ score }: { score: number }) => {
  const pct = Math.round(score * 100);
  const color = pct >= 70 ? 'var(--accent)' : pct >= 40 ? '#f59e0b' : 'var(--text-muted)';
  return (
    <span style={{
      fontSize: '10px', fontWeight: 700, padding: '1px 5px',
      borderRadius: '99px', border: `1px solid ${color}`,
      color, marginLeft: '6px', flexShrink: 0,
    }}>
      {pct}%
    </span>
  );
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click-outside dismiss
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const performSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      const r = data.results || [];
      setResults(r);
      setOpen(r.length > 0);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // qmd returns file as "qmd://wiki/concepts/foo.md" — strip prefix to match graph node IDs
  const normalizeNodeId = (file: string): string => {
    return file.replace(/^qmd:\/\/[^/]+\//, '');
  };

  const handleResultClick = useCallback((rawFile: string) => {
    const nodeId = normalizeNodeId(rawFile);
    window.dispatchEvent(new CustomEvent('open-node', { detail: { id: nodeId } }));
    setOpen(false);
    setQuery('');
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', padding: '10px 0 4px' }}>
      <form onSubmit={performSearch}>
        <div style={{ position: 'relative' }}>
          <SearchIcon loading={loading} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Semantic search..."
            style={{ paddingLeft: '32px', paddingRight: '8px', fontSize: '13px' }}
          />
        </div>
      </form>

      {open && results.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          zIndex: 200,
          maxHeight: '360px', overflowY: 'auto',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          animation: 'slide-down 0.14s ease',
        }}>
          {results.map((r, i) => {
            // Prefer r.title (from qmd), else fall back to filename
            const displayName = r.title ?? (normalizeNodeId(r.file ?? '').split('/').pop() ?? r.file);
            return (
              <div
                key={i}
                onClick={() => handleResultClick(r.file)}
                style={{
                  padding: '10px 12px',
                  borderBottom: i < results.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {displayName}
                  </span>
                  <ScoreBadge score={r.score ?? 0} />
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {r.snippet}
                </div>
              </div>
            );
          })}

          <button
            data-ghost="true"
            onClick={() => { setOpen(false); setResults([]); }}
            style={{ width: '100%', justifyContent: 'center', borderRadius: 0, borderTop: '1px solid var(--border-subtle)', fontSize: '11px', padding: '8px' }}
          >
            Clear results
          </button>
        </div>
      )}
    </div>
  );
}
