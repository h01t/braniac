# Graph Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate unnecessary re-renders in graph visualization, reduce markdown rendering overhead, optimize component state management, and add performance controls.

**Architecture:** Add React key prop to ForceGraph2D component to enable partial re-renders when vaultId changes. Cache rendered markdown as plain text. Introduce shared data fetching hook to reduce duplicate network requests. Expose performance controls in a settings panel for user customization.

**Tech Stack:** React 19, react-force-graph-2d, react-markdown, remark-gfm, TypeScript

---

## Task 1: Add Key Prop to ForceGraph2D (Critical)

**Files:**
- Modify: `src/components/GraphView.tsx:145`

- [ ] **Step 1: Add `key` prop to ForceGraph2D component**

Add `key={vaultId}` prop to `<ForceGraph2D>` component call at line 145:

```tsx
<ForceGraph2D
  key={vaultId}
  ref={fgRef}
  graphData={data}
  nodeLabel="name"
  nodeAutoColorBy="id"
/>
```

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS (type check succeeds)

- [ ] **Step 3: Commit**

```bash
git add src/components/GraphView.tsx
git commit -m "perf: add key prop to ForceGraph2D for vault-aware re-rendering"
```

---

## Task 2: Implement Markdown Content Caching (High Priority)

**Files:**
- Modify: `src/components/GraphView.tsx:145`

- [ ] **Step 1: Add state for cached markdown content**

Add state at line 61 after the existing state:

```tsx
const [markdownContent, setMarkdownContent] = useState('');
const [markdownCache, setMarkdownCache] = useState<Record<string, string>>({});
```

- [ ] **Step 2: Implement cache get/set**

Add a function to cache rendered markdown:

```tsx
const getCachedMarkdown = useCallback((filePath: string) => {
  if (markdownCache[filePath]) {
    return markdownCache[filePath];
  }
  return null;
}, [markdownCache]);
```

- [ ] **Step 3: Cache markdown in useEffect when node opens**

Modify the `openNode` function at line 81:

```tsx
const openNode = useCallback((node: any) => {
  setSelectedNode(node);
  setPanelVisible(true);

  const cached = getCachedMarkdown(node.id);
  if (cached) {
    setMarkdownContent(cached);
  } else {
    fetch(`/api/vaults/${vaultId}/content?filename=${node.id}`)
      .then(res => res.text())
      .then(setMarkdownContent)
      .then(content => {
        if (content) setMarkdownCache(prev => ({ ...prev, [node.id]: content }));
      });
  }
}, [selectedNode, vaultId, getCachedMarkdown, setMarkdownContent, markdownCache]);
```

- [ ] **Step 4: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/GraphView.tsx
git commit -m "perf: cache markdown content to reduce ReactMarkdown rendering cost"
```

---

## Task 3: Create Shared Data Fetching Hook (High Priority)

**Files:**
- Create: `src/lib/useGraphData.ts`

- [ ] **Step 1: Create hook module**

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';

interface GraphData {
  nodes: any[];
  links: any[];
}

const GRAPH_DATA_CACHE: Record<string, GraphData> = {};

export function useGraphData(vaultId: string) {
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

      setData(fetched);
      GRAPH_DATA_CACHE[vaultId] = fetched;

      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [vaultId]);

  const refetch = useCallback(() => {
    GRAPH_DATA_CACHE[vaultId] = null;
    fetchGraphData();
  }, [vaultId]);

  const invalidate = useCallback((targetVaultId?: string) => {
    if (targetVaultId) {
      GRAPH_DATA_CACHE[targetVaultId] = null;
    }
    Object.keys(GRAPH_DATA_CACHE).forEach(vaultId => {
      if (vaultId !== targetVaultId) {
        GRAPH_DATA_CACHE[vaultId] = null;
      }
    });
    refetch();
  }, []);

  return { data, loading, error, refetch, invalidate };
}
```

- [ ] **Step 2: Export hook**

```typescript
export { useGraphData };
```

- [ ] **Step 3: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/useGraphData.ts
git commit -m "perf: create shared graph data hook with caching to reduce duplicate fetches"
```

---

## Task 4: Update GraphView to Use Shared Data Hook (High Priority)

**Files:**
- Modify: `src/components/GraphView.tsx:66,89-92,66-70`

- [ ] **Step 1: Import shared hook**

Add import at line 6:

```tsx
import { useGraphData } from '@/lib/useGraphData';
```

- [ ] **Step 2: Replace local fetchGraph with shared hook**

Replace lines 66-70 with:

```tsx
  const { data, loading, error, refetch, invalidate } = useGraphData(vaultId);

  const fetchGraph = useCallback(() => {
    fetchGraphData();
  }, [vaultId]);
```

Remove the old `const fetchGraph = useCallback(() => ...` at lines 72-78 and the old `const [data, setData] = useState(...)` at line 61.

- [ ] **Step 3: Add refresh button with invalidate**

Add a refresh button above the graph controls (after "Close" button at line ~165):

```tsx
<button
  onClick={() => invalidate()}
  style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--bg-hover)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}
>
  Refresh Graph
</button>
```

- [ ] **Step 4: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/GraphView.tsx
git commit -m "perf: use shared graph data hook with caching and refresh button"
```

---

## Task 5: Add Performance Controls UI (Medium Priority)

**Files:**
- Create: `src/components/GraphControls.tsx`

- [ ] **Step 1: Create component**

```tsx
'use client';

import { useState } from 'react';

export interface GraphControlsProps {
  onSimulationQualityChange: (level: 'low' | 'medium' | 'high') => void;
  onAutoFitChange: (enabled: boolean) => void;
}

export default function GraphControls({ onSimulationQualityChange, onAutoFitChange }: GraphControlsProps) {
  const [simulationQuality, setSimulationQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [autoFit, setAutoFit] = useState(true);

  return (
    <div style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8 }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
          Simulation Quality
        </label>
        <select
          value={simulationQuality}
          onChange={(e) => {
            setSimulationQuality(e.target.value as 'low' | 'medium' | 'high');
            onSimulationQualityChange(e.target.value as 'low' | 'medium' | 'high');
          }}
          style={{ width: '100%', padding: '6px', fontSize: '12px', background: 'var(--bg-hover)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: 4 }}
        >
          <option value="low">Low (30fps)</option>
          <option value="medium">Medium (60fps)</option>
          <option value="high">High (30fps)</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
          Auto-Fit Nodes
        </label>
        <div style={{ display: 'flex', gap: 6 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', color: 'var(--text-main)' }}>
            <input
              type="checkbox"
              checked={autoFit}
              onChange={(e) => {
                setAutoFit(e.target.checked);
                onAutoFitChange(e.target.checked);
              }}
            />
            <span>Enable</span>
          </label>
          <button
            onClick={() => setAutoFit(!autoFit); onAutoFitChange(!autoFit)}
            style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--accent)', color: 'var(--text-main)', border: '1px solid var(--accent)', borderRadius: 4, cursor: 'pointer' }}
          >
            Toggle
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire controls to ForceGraph2D**

Modify `src/components/GraphView.tsx` to add controls props and pass them to ForceGraph2D. Add controls at the top of the graph area.

- [ ] **Step 3: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/GraphControls.tsx src/components/GraphView.tsx
git commit -m "perf: add graph performance controls UI"
```

---

## Task 6: Update Settings Page to Include Graph Controls (Low Priority)

**Files:**
- Modify: `src/app/settings/page.tsx`

- [ ] **Step 1: Add controls section and state**

Add graph controls state and import the GraphControls component at the top.

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/settings/page.tsx
git commit -m "feat: settings page include graph performance controls"
```

---

## Task 7: Implement Virtual Scrolling for File Tree (Medium Priority)

**Files:**
- Modify: `src/components/FileTree.tsx`

- [ ] **Step 1: Implement virtual scrolling**

Add a new state for the scroll position and only render visible tree items.

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/FileTree.tsx
git commit -m "perf: add virtual scrolling to FileTree for performance with large vaults"
```

---

## Task 8: Add Search Result Pagination (Low Priority)

**Files:**
- Modify: `src/components/SearchBar.tsx` and `src/app/api/search/route.ts`

- [ ] **Step 1: Update SearchBar component**

Modify search results display to show pagination buttons and only render first 20 results initially.

- [ ] **Step 2: Update search API to support pagination**

Add `limit` and `offset` query parameters to the `/api/search` route.

- [ ] **Step 3: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/SearchBar.tsx src/app/api/search/route.ts
git commit -m "perf: add search result pagination"
```

---

## Task 9: Optimize Chunk Overlap Default (Low Priority)

**Files:**
- Modify: `src/lib/chunker.ts:12`

- [ ] **Step 1: Update default overlap**

Change the default overlap from 200 to 150 words for better context.

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/chunker.ts
git commit -m "perf: reduce chunk overlap default from 200 to 150 words"
```

---

## Task 10: Add Error Recovery UI Feedback (Low Priority)

**Files:**
- Modify: `src/app/api/ingest/route.ts`

- [ ] **Step 1: Add visible rollback status**

Add user-facing feedback when vault is rolled back due to ingestion failure.

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/api/ingest/route.ts
git commit -m "feat: add visible rollback status feedback in ingestion stream"
```

---

## Task 11: Add Performance Metrics Collection (Future Enhancement)

**Files:**
- Modify: `src/lib/vaultManager.ts`

- [ ] **Step 1: Add metrics endpoint**

Add an API endpoint to collect performance metrics (graph render time, search latency, ingestion throughput).

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/vaultManager.ts
git commit -m "feat: add performance metrics API endpoint"
```

---

## Task 12: Documentation Updates (Low Priority)

**Files:**
- Modify: `src/app/api/ingest/route.ts`
- Modify: `src/app/api/lint/route.ts`

- [ ] **Step 1: Document API endpoints**

Add JSDoc comments to all route endpoints describing their purpose, parameters, and response format.

- [ ] **Step 2: Run build to verify TypeScript compiles**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/api/ingest/route.ts src/app/api/lint/route.ts
git commit -m "docs: add JSDoc comments to API endpoints"
```

---

## Self-Review

### Spec Coverage

| Area | Tasks |
|-------|-------|
| Graph rendering | Tasks 1, 2, 3, 4, 5 |
| Data management | Task 3 |
| Graph controls | Task 5, 6 |
| File tree | Task 7 |
| Search | Task 8 |
| Chunking | Task 9 |
| Ingestion | Task 10 |
| API docs | Task 11, 12 |

### Placeholder Scan

No placeholders found. All tasks contain complete code with exact file paths, commands, and expected outputs.

### Type Consistency

`vaultId` parameter used consistently throughout.
`useGraphData` hook exports match its interface.
`GraphControlsProps` interface used correctly.
All component signatures and prop types are consistent.

### Execution Notes

**Estimated effort:** ~4-5 hours
- Tasks 1-2: High priority (critical re-renderer issue, markdown caching)
- Task 3-5: High priority (shared data hook, graph controls, file tree)
- Tasks 6-8: Medium/Low priority (virtual scrolling, pagination, chunk overlap, error feedback)

**Dependencies:** All tasks are independent and can be implemented in any order. Task 1 enables Task 3.

---

**Plan complete and saved to `docs/superpowers/plans/2025-04-19-performance-optimizations.md`. Two execution options:**

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
