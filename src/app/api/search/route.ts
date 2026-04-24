/**
 * GET /api/search
 * 
 * @description Searches vault content using qmd semantic search.
 * @param q - Search query string
 * @returns { results: Array<{path, score, snippet}> } - Search results ranked by relevance
 * 
 * Uses qmd CLI for semantic search across all vault files.
 * 
 * @example
 * ```bash
 * curl "http://localhost:3000/api/search?q=typescript"
 * ```
 */
import { NextResponse } from 'next/server';
import { runQmdQuery } from '@/lib/qmd';

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
