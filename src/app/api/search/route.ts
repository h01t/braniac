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
    
    // qmd injects loading spinners and "Expanding query..." into stdout. Isolate the JSON array:
    const startIndex = stdout.indexOf('[');
    const endIndex = stdout.lastIndexOf(']');
    
    if (startIndex !== -1 && endIndex !== -1) {
      const jsonStr = stdout.substring(startIndex, endIndex + 1);
      const parsed = JSON.parse(jsonStr);
      return NextResponse.json({ results: parsed });
    } else {
      console.warn('Could not parse JSON from qmd output:', stdout);
      return NextResponse.json({ results: [] });
    }
  } catch (err: any) {
    if (err.stdout) {
      const s = err.stdout.indexOf('[');
      const e = err.stdout.lastIndexOf(']');
      if (s !== -1 && e !== -1) {
         try {
            const parsed = JSON.parse(err.stdout.substring(s, e + 1));
            return NextResponse.json({ results: parsed });
         } catch(e2) {}
      }
    }
    console.error("QMD Search Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
