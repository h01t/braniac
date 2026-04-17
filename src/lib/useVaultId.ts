'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'compiler-active-vault';

export function useVaultId(): string {
  const [vaultId, setVaultId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || 'default';
    }
    return 'default';
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.vaultId) {
        setVaultId(detail.vaultId);
        localStorage.setItem(STORAGE_KEY, detail.vaultId);
      }
    };
    window.addEventListener('vault-changed', handler);
    return () => window.removeEventListener('vault-changed', handler);
  }, []);

  return vaultId;
}
