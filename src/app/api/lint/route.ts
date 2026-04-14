import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { deepseekReasoning } from '@/lib/deepseek';
import { listFiles, readMarkdown } from '@/lib/vaultManager';

export const maxDuration = 300; 

export async function POST(request: Request) {
  try {
    const { vaultId } = await request.json();
    
    if (!vaultId) {
      return NextResponse.json({ error: 'vaultId is required' }, { status: 400 });
    }

    const files = await listFiles(vaultId);
    if (!files || files.length === 0) {
       return NextResponse.json({ report: 'The vault is entirely empty. Nothing to lint.' });
    }

    const vaultData = [];
    for (const f of files) {
      if (f.type === 'file' && f.name.endsWith('.md') && f.name !== 'index.md') {
        const content = await readMarkdown(vaultId, f.path);
        // Truncate lightly if massive, but deepseek handles 64k tokens well
        vaultData.push(`<file path="${f.path}">\n${content}\n</file>`);
      }
    }

    const systemPrompt = `You are the Knowledge Vault Linter for an LLM-Wiki. Your job is to analyze the structural health of the entire git-backed markdown vault.
  
You must evaluate the files and graph connections to:
1. Check for contradictions between pages or claims.
2. Find orphan pages (pages with absolutely no inbound links from other pages).
3. Identify concepts mentioned in pages that lack their own dedicated page.
4. Flag claims that may be outdated or missing citations.
5. Check that all pages follow the standard format: '# Title', '**Summary**', '**Source Context**', '---', and '## Related pages'.

You must output a comprehensive markdown report listing your findings. Report your findings as a numbered list with suggested fixes. Do not output anything other than the markdown report.`;

    const { text: resultText } = await generateText({
      model: deepseekReasoning,
      system: systemPrompt,
      prompt: `Vault Data:\n\n${vaultData.join('\n')}`
    });

    return NextResponse.json({ report: resultText });

  } catch (err: any) {
    console.error("Lint Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
