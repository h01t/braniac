/**
 * POST /api/lint
 * 
 * @description Analyzes markdown vault for structural health issues and proposes fixes.
 * @param vaultId - Vault identifier
 * @returns { report: string, proposals: Array<{path, action, reason, before, after, diff}>, fromCache: boolean, skippedCount: number, cacheCommitHash: string, currentCommitHash: string }
 * 
 * Analysis includes:
 * 1. Contradictions between pages
 * 2. Orphan pages (no inbound [[links]])
 * 3. Missing concept pages
 * 4. Claims missing citations
 * 5. Non-standard page format violations
 * 6. Near-empty stubs
 * 
 * @example
 * ```bash
 * curl -X POST http://localhost:3000/api/lint \
 *   -H "Content-Type: application/json" \
 *   -d '{"vaultId":"default"}'
 * ```
 */
import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getLintModel } from '@/lib/models';
import {
  listFiles, readMarkdown,
  readLintCache, writeLintCache,
  getChangedFilesSince, getCurrentCommitHash,
  generateUnifiedDiff,
} from '@/lib/vaultManager';
import { parseLintOutput } from '@/lib/parser';
import { withVaultLock } from '@/lib/lock';

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const { vaultId } = await request.json();
    if (!vaultId) {
      return NextResponse.json({ error: 'vaultId is required' }, { status: 400 });
    }

    return withVaultLock(vaultId, async () => {
      const lintModel = await getLintModel();
      const files = await listFiles(vaultId);
      if (!files || files.length === 0) {
        return NextResponse.json({
          report: 'The vault is empty. Nothing to lint.',
          proposals: [], fromCache: false, skippedCount: 0,
        });
      }

      const cache = await readLintCache(vaultId);
      const currentHash = await getCurrentCommitHash(vaultId);
      let changedPaths: Set<string> | null = null;
      let fromCache = false;
      let skippedCount = 0;

      if (cache?.commitHash && cache.commitHash !== currentHash) {
        const changed = await getChangedFilesSince(vaultId, cache.commitHash);
        changedPaths = new Set(changed);
        fromCache = true;
      }

      const vaultData: string[] = [];
      const skippedHealthy: string[] = [];

      for (const f of files) {
        if (f.type !== 'file' || !f.name.endsWith('.md')) continue;
        if (changedPaths !== null && !changedPaths.has(f.path)) {
          const cached = cache?.fileStatuses?.[f.path];
          if (cached?.healthy) {
            skippedHealthy.push(f.path);
            skippedCount++;
            continue;
          }
        }
        const content = await readMarkdown(vaultId, f.path);
        vaultData.push(`<file path="${f.path}">\n${content}\n</file>`);
      }

      if (vaultData.length === 0) {
        return NextResponse.json({
          report: `All ${skippedCount} files unchanged and healthy. Nothing to lint.`,
          proposals: [], fromCache: true,
          skippedCount, cacheCommitHash: cache?.commitHash, currentCommitHash: currentHash,
        });
      }

      const cacheNote = fromCache && skippedCount > 0
        ? `> Checkpoint active: ${skippedCount} previously-healthy files skipped.\n\n`
        : '';

      const systemPrompt = `You are the Knowledge Vault Linter for an LLM-Wiki. Analyze the structural health of the provided markdown vault files.

Evaluate and identify:
1. Contradictions between pages.
2. Orphan pages (no inbound [[links]] from any other page).
3. Concepts mentioned in text but lacking their own dedicated page.
4. Claims missing citations or that may be outdated.
5. Pages missing the standard format: '# Title', '**Summary**', '**Source Context**', '---', '## Related pages'.
6. Near-empty stubs with little substantive content.

OUTPUT FORMAT — two parts, nothing else:

PART 1 — <report>...</report> with markdown analysis.
PART 2 — <fix> blocks for proposed fixes:
<fix path="concepts/foo.md" action="update" reason="One-line justification">
[complete new file content]
</fix>
<fix path="concepts/stub.md" action="delete" reason="One-line justification" />

Rules:
- No conversational text outside <report> and <fix> blocks.
- Only propose fixes with high confidence. Do not hallucinate paths.`;

      const { text: resultText } = await generateText({
        model: lintModel,
        system: systemPrompt,
        prompt: `${cacheNote}Vault files to analyze:\n\n${vaultData.join('\n')}`,
      });

      const { report, fixes } = parseLintOutput(resultText);

      const proposals = await Promise.all(fixes.map(async (fix) => {
        const before = fix.action !== 'create' ? (await readMarkdown(vaultId, fix.path) ?? '') : '';
        const diff = await generateUnifiedDiff(before, fix.content);
        return {
          path: fix.path,
          action: fix.action,
          reason: fix.reason,
          before,
          after: fix.content,
          diff,
        };
      }));

      const newCache = cache ?? { version: 1, timestamp: '', commitHash: '', fileStatuses: {} };
      const now = new Date().toISOString();
      for (const p of skippedHealthy) {
        if (!newCache.fileStatuses[p]) {
          newCache.fileStatuses[p] = { healthy: true, issues: [], lastChecked: now };
        }
      }
      for (const f of files) {
        if (skippedHealthy.includes(f.path) || !f.name.endsWith('.md')) continue;
        const fileProposals = proposals.filter((p: { path: string }) => p.path === f.path);
        newCache.fileStatuses[f.path] = {
          healthy: fileProposals.length === 0,
          issues: fileProposals.map((p: { reason: string }) => p.reason),
          lastChecked: now,
        };
      }
      newCache.timestamp = now;
      newCache.commitHash = currentHash;
      await writeLintCache(vaultId, newCache);

      return NextResponse.json({
        report, proposals, fromCache, skippedCount,
        cacheCommitHash: cache?.commitHash, currentCommitHash: currentHash,
      });
    });
  } catch (err: unknown) {
    console.error('Lint Error:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
