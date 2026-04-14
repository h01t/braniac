import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  
  if (!q) return NextResponse.json({ results: [] });

  try {
    const safeQ = q.replace(/"/g, '\\"');
    const { stdout } = await execAsync(`export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin && npx qmd query "${safeQ}" --json`);
    const parsed = JSON.parse(stdout);
    return NextResponse.json({ results: parsed });
  } catch (err: any) {
    if (err.stdout) {
      try {
        const parsed = JSON.parse(err.stdout);
        return NextResponse.json({ results: parsed });
      } catch(e) {}
    }
    console.error("QMD Search Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
