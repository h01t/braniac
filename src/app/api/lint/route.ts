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

    const systemPrompt = `You are a rigorous QA Linter for a Markdown-based Knowledge Vault.
Analyze all the provided files as a cohesive graph database.

Enforce these strict linting rules:
1. **Contradictions**: Find claims in one file that contradict facts in another file.
2. **Orphans**: Find files that nobody links to and don't link to anything.
3. **Ghosts**: Find any [[links]] pointing to files that do not exist in the provided dataset.
4. **Staleness**: Flag things that seem outdated or missing a timestamp/verifiability.

Output a beautifully structured Markdown report using standard headers, lists, and bold text. Break down the findings by Rule category. Summarize the overall health of the Knowledge Base.`;

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
