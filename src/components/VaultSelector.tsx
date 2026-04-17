'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'compiler-active-vault';

export default function VaultSelector() {
  const [vaults, setVaults] = useState<string[]>([]);
  const [active, setActive] = useState('default');
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const loadVaults = useCallback(async () => {
    try {
      const res = await fetch('/api/vaults');
      const data = await res.json();
      setVaults(data.vaults || []);
    } catch (err) {
      console.error('Failed to load vaults', err);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'default';
    setActive(saved);
    loadVaults();
  }, [loadVaults]);

  const switchVault = (id: string) => {
    setActive(id);
    localStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new CustomEvent('vault-changed', { detail: { vaultId: id } }));
    window.dispatchEvent(new CustomEvent('vault-updated'));
  };

  const createVault = async () => {
    const name = newName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    if (!name) return;
    setError('');
    try {
      const res = await fetch('/api/vaults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vaultId: name }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create vault');
        return;
      }
      setNewName('');
      setCreating(false);
      await loadVaults();
      switchVault(name);
    } catch (err) {
      setError('Failed to create vault');
    }
  };

  return (
    <div style={{ padding: '8px 8px 4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
          textTransform: 'uppercase', color: 'var(--text-dim)',
          flex: 1,
        }}>
          Vault
        </span>
        <button
          onClick={() => { setCreating(!creating); setNewName(''); setError(''); }}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: '0 4px',
            display: 'flex', alignItems: 'center',
          }}
          title="Create new vault"
        >
          +
        </button>
      </div>

      {creating && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') createVault(); if (e.key === 'Escape') { setCreating(false); setNewName(''); } }}
            placeholder="vault-name"
            autoFocus
            style={{
              flex: 1, padding: '5px 8px', fontSize: 12,
              background: 'var(--bg-hover)', color: 'var(--text-main)',
              border: '1px solid var(--border)', borderRadius: 4, outline: 'none',
            }}
          />
          <button
            onClick={createVault}
            className="btn-primary"
            style={{ fontSize: 11, padding: '4px 10px' }}
          >
            Create
          </button>
        </div>
      )}

      {error && (
        <div style={{ fontSize: 11, color: '#f87171', marginBottom: 6 }}>{error}</div>
      )}

      <select
        value={active}
        onChange={e => switchVault(e.target.value)}
        style={{
          width: '100%', padding: '6px 8px', fontSize: 12,
          background: 'var(--bg-hover)', color: 'var(--text-main)',
          border: '1px solid var(--border)', borderRadius: 4, outline: 'none',
          cursor: 'pointer',
        }}
      >
        {vaults.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
}
