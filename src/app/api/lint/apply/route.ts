/**
 * POST /api/lint/apply
 * 
 * @description Applies proposed lint fixes to vault files.
 * @param vaultId - Vault identifier
 * @param proposals - Array of fix proposals from /api/lint endpoint
 * @returns { applied: number, errors: string[] } - Count of applied fixes and any errors
 * 
 * Supported actions:
 * - update: Update file content
 * - create: Create new file
 * - delete: Remove file (stub)
 * 
 * @example
 * ```bash
 * curl -X POST http://localhost:3000/api/lint/apply \
 *   -H "Content-Type: application/json" \
 *   -d '{"vaultId":"default","proposals":[{"path":"concepts/foo.md","action":"update","reason":"fix typos","after":"..."}]}'
 * ```
 */
import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/lib/errors';
import { updateQmdIndexInBackground } from '@/lib/qmd';
import { writeMarkdownAndCommit, deleteFileAndCommit } from '@/lib/vaultManager';

export const maxDuration = 120;

interface Proposal {
  path: string;
  action: 'update' | 'create' | 'delete';
  reason: string;
  after: string;
}

export async function POST(request: Request) {
  try {
    const { vaultId, proposals } = await request.json() as {
      vaultId: string;
      proposals: Proposal[];
    };

    if (!vaultId || !Array.isArray(proposals) || proposals.length === 0) {
      return NextResponse.json({ error: 'vaultId and proposals are required' }, { status: 400 });
    }

    const errors: string[] = [];
    let applied = 0;

    for (const p of proposals) {
      try {
        if (p.action === 'delete') {
          await deleteFileAndCommit(
            vaultId,
            p.path,
            `Lint: delete stub ${p.path} — ${p.reason}`,
          );
        } else {
          await writeMarkdownAndCommit(
            vaultId,
            p.path,
            p.after,
            `Lint: ${p.action} ${p.path} — ${p.reason}`,
          );
        }
        applied++;
      } catch (error: unknown) {
        errors.push(`${p.path}: ${getErrorMessage(error)}`);
      }
    }

    updateQmdIndexInBackground();

    return NextResponse.json({ applied, errors });
  } catch (error: unknown) {
    console.error('Lint Apply Error:', error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
