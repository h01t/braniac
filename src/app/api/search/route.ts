import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const QMD_TIMEOUT_MS = 10000;
const QMD_PATH = 'export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin && npx qmd';

interface QmdResult {
  [key: string]: string | number | boolean | null;
}

function extractJSONArray(text: string): QmdResult[] | null {
  const start = text.indexOf('[');
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') depth--;
    if (depth === 0) {
      try {
        return JSON.parse(text.substring(start, i + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

async function runQmdQuery(query: string): Promise<QmdResult[]> {
  const safeQ = query.replace(/"/g, '\\"');
  const cmd = `${QMD_PATH} query "${safeQ}" --json`;

  const { stdout } = await execAsync(cmd, { timeout: QMD_TIMEOUT_MS });
  const results = extractJSONArray(stdout);
  if (!results) throw new Error(`No JSON array found in qmd output`);
  return results;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  if (!q) return NextResponse.json({ results: [] });

  try {
    const results = await runQmdQuery(q);
    return NextResponse.json({ results });
  } catch {
    try {
      const results = await runQmdQuery(q);
      return NextResponse.json({ results });
    } catch (retryErr: unknown) {
      const message = retryErr instanceof Error ? retryErr.message : String(retryErr);
      console.error('QMD Search Error (after retry):', message);
      return NextResponse.json({ error: message, results: [] }, { status: 500 });
    }
  }
}
