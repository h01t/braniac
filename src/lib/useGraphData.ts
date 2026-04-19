'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface GraphData {
  nodes: any[];
  links: any[];
}

interface UseGraphDataReturn {
  data: GraphData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  invalidate: (targetVaultId?: string) => void;
}

const GRAPH_DATA_CACHE: Record<string, GraphData | null> = {};

export function useGraphData(vaultId: string): UseGraphDataReturn {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mounted = useRef(false);

  const fetchGraphData = useCallback(async () => {
    if (mounted.current) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/vaults/${vaultId}/graph`);
      const fetched = await res.json();

      GRAPH_DATA_CACHE[vaultId] = fetched;
      setData(fetched);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [vaultId]);

  const invalidate = useCallback((targetVaultId?: string) => {
    GRAPH_DATA_CACHE[targetVaultId || vaultId] = null;
    fetchGraphData();
  }, [vaultId]);

  const refetch = useCallback(() => {
    GRAPH_DATA_CACHE[vaultId] = null;
    fetchGraphData();
  }, [vaultId]);

  useEffect(() => {
    mounted.current = true;

    const cleanup = () => {
      mounted.current = false;
    };

    const handler = () => {
      if (GRAPH_DATA_CACHE[vaultId]) {
        fetchGraphData();
      }
    };

    window.addEventListener('vault-updated', handler);
    return () => window.removeEventListener('vault-updated', handler);
  }, [vaultId, invalidate, refetch]);

  useEffect(() => {
    fetchGraphData();
  }, [vaultId]);

  return { data, loading, error, refetch, invalidate };
}
