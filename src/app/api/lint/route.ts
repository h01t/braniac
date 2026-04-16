import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { deepseekReasoning } from '@/lib/deepseek';
import {
  listFiles, readMarkdown,
  readLintCache, writeLintCache,
  getChangedFilesSince, getCurrentCommitHash,
  generateUnifiedDiff,
} from '@/lib/vaultManager';

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const { vaultId } = await request.json();

    if (!vaultId) {
      return NextResponse.json({ error: 'vaultId is required' }, { status: 400 });
    }

    const files = await listFiles(vaultId);
    if (!files || files.length === 0) {
      return NextResponse.json({
        report: 'The vault is entirely empty. Nothing to lint.',
        proposals: [], fromCache: false, skippedCount: 0,
      });
    }

    // ── Checkpoint cache: only re-analyze changed files ──────────────────────
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

    // ── Build vault data — skip unchanged healthy files ───────────────────────
    const vaultData: string[] = [];
    const skippedHealthy: string[] = [];

    for (const f of files) {
      if (f.type !== 'file' || !f.name.endsWith('.md')) continue;
      // Skip files unchanged since last checkpoint that were healthy
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
        report: `✅ All ${skippedCount} files were unchanged since the last checkpoint and previously marked healthy. Nothing new to lint.`,
        proposals: [], fromCache: true,
        skippedCount, cacheCommitHash: cache?.commitHash, currentCommitHash: currentHash,
      });
    }

    const cacheNote = fromCache && skippedCount > 0
      ? `> **Checkpoint active**: ${skippedCount} previously-healthy unchanged files were skipped. Only changed or previously-flagged files are included below.\n\n`
      : '';

    const systemPrompt = `You are the Knowledge Vault Linter for an LLM-Wiki. Analyze the structural health of the provided markdown vault files.

Evaluate and identify:
1. Contradictions between pages.
2. Orphan pages (no inbound [[links]] from any other page).
3. Concepts mentioned in text but lacking their own dedicated page.
4. Claims missing citations or that may be outdated.
5. Pages missing the standard format: '# Title', '**Summary**', '**Source Context**', '---', '## Related pages'.
6. Near-empty stubs with little to no substantive content (candidates for deletion).

YOUR OUTPUT MUST FOLLOW THIS EXACT FORMAT — two parts, nothing else:

PART 1 — Wrap a comprehensive markdown analysis report in <report>...</report> tags.
Use clear headings (## Section), bullet points, and flag severity with ⚠️ or ✅.

PART 2 — For each file you propose to fix, output a <fix> block immediately after the closing </report> tag.

For updates or new file creation:
<fix path="concepts/foo.md" action="update" reason="One-line justification">
[complete new file content here — must be a valid, fully-formed markdown file]
</fix>

For deletions (self-closing):
<fix path="concepts/stub.md" action="delete" reason="One-line justification" />

Rules:
- Output NO conversational text outside the <report> and <fix> blocks.
- Every <fix> must target a real path that exists in the vault data provided.
- Only propose fixes with high confidence. Do not hallucinate paths.`;

    const { text: resultText } = await generateText({
      model: deepseekReasoning,
      system: systemPrompt,
      prompt: `${cacheNote}Vault files to analyze:\n\n${vaultData.join('\n')}`,
    });

    // ── Parse report ──────────────────────────────────────────────────────────
    const reportMatch = resultText.match(/<report>([\s\S]*?)<\/report>/i);
    const report = reportMatch ? reportMatch[1].trim() : resultText;

    // ── Parse fix proposals ───────────────────────────────────────────────────
    // Matches both self-closing deletes and content-bearing update/create blocks
    const proposals: any[] = [];
    const fixRegex = /<fix\s+path="([^"]+)"\s+action="(update|create|delete)"\s+reason="([^"]*)"(?:\s*\/>|>([\s\S]*?)<\/fix>)/gi;
    let match;
    while ((match = fixRegex.exec(resultText)) !== null) {
      const [, filePath, action, reason, rawContent] = match;
      const before = action !== 'create' ? (await readMarkdown(vaultId, filePath) ?? '') : '';
      const after  = action === 'delete'  ? '' : (rawContent?.trim() ?? '');
      const diff   = await generateUnifiedDiff(before, after);
      proposals.push({ path: filePath, action, reason, before, after, diff });
    }

    // ── Update lint cache ─────────────────────────────────────────────────────
    const newCache = cache ?? { version: 1, timestamp: '', commitHash: '', fileStatuses: {} };
    const now = new Date().toISOString();

    // Carry forward skipped statuses
    for (const p of skippedHealthy) {
      if (!newCache.fileStatuses[p]) {
        newCache.fileStatuses[p] = { healthy: true, issues: [], lastChecked: now };
      }
    }
    // Mark analyzed files
    for (const f of files) {
      if (skippedHealthy.includes(f.path)) continue;
      if (!f.name.endsWith('.md')) continue;
      const fileProposals = proposals.filter(p => p.path === f.path);
      newCache.fileStatuses[f.path] = {
        healthy: fileProposals.length === 0,
        issues: fileProposals.map((p: any) => p.reason),
        lastChecked: now,
      };
    }
    newCache.timestamp = now;
    newCache.commitHash = currentHash;
    await writeLintCache(vaultId, newCache);

    return NextResponse.json({
      report,
      proposals,
      fromCache,
      skippedCount,
      cacheCommitHash: cache?.commitHash,
      currentCommitHash: currentHash,
    });

  } catch (err: any) {
    console.error('Lint Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
