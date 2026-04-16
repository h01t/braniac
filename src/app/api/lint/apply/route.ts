import { NextResponse } from 'next/server';
import { writeMarkdownAndCommit, deleteFileAndCommit } from '@/lib/vaultManager';
import { exec } from 'child_process';

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
      } catch (e: any) {
        errors.push(`${p.path}: ${e.message}`);
      }
    }

    // Re-index qmd in background after changes
    exec(
      'export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin && npx qmd update',
      { cwd: process.cwd() },
      (err) => {
        if (err) console.error('qmd update after lint apply failed', err);
      },
    );

    return NextResponse.json({ applied, errors });
  } catch (err: any) {
    console.error('Lint Apply Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
