"use client";
import React, { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
        setResults([]);
        return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: '24px', position: 'relative' }}>
      <form onSubmit={performSearch} style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Semantic Search..."
          style={{
            flex: 1, padding: '8px 12px', borderRadius: '4px',
            border: '1px solid var(--border)', background: 'var(--bg-card)',
            color: 'var(--text-main)', fontSize: '0.9rem'
          }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>
          {loading ? '...' : 'Search'}
        </button>
      </form>
      
      {results.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '4px', marginTop: '4px', zIndex: 100,
          maxHeight: '400px', overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {results.map((r, i) => (
             <div key={i} style={{ padding: '12px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => alert('Found in: ' + r.file)}>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '4px' }}>
                   {r.file?.split('/').pop()} <span style={{fontSize:'0.75rem', color: 'var(--text-muted)'}}>(Score: {Math.round(r.score * 100)}%)</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                   {r.snippet}...
                </div>
             </div>
          ))}
          <button style={{width:'100%', padding:'8px', background:'transparent', border:'none', color:'var(--text-muted)'}} onClick={() => setResults([])}>Close</button>
        </div>
      )}
    </div>
  );
}
