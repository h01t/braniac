import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { getIngestModel } from '@/lib/models';
import { writeMarkdownAndCommit, getCurrentCommitHash } from '@/lib/vaultManager';
import { extractTextFromUrl, extractTextFromPdf } from '@/lib/extractor';
import { chunkText } from '@/lib/chunker';
import { parseAIOutput } from '@/lib/parser';
import { exec } from 'child_process';

export const maxDuration = 300;

const ROLLBACK_EVENT = 'vault-rollback';

const SYSTEM_PROMPT = `You are a strict AI Knowledge Compiler. Your goal is to ingest the raw text and extract concepts, entities, and sources to build an interconnected Markdown wiki.

Categorize files into folders by prefixing the filename. Use folders like 'concepts/', 'entities/', 'sources/'.

Every wiki page you output MUST follow this exact Markdown structure:
# [Page Title]

**Summary**: One to two sentences describing this page.
**Source Context**: URL or Document Name.

---

[Main content goes here with clear headings and short paragraphs. Every factual claim should explicitly reference its source. If facts disagree, note the contradiction explicitly.]

[Link to related concepts aggressively using [[concepts/name.md]] syntax throughout the text.]

## Related pages
- [[concepts/related-concept-1.md]]

You must output your response ONLY using the following XML-like file formatting. You can generate multiple files.
<file path="category/filename.md">
[content]
</file>

Do not write any introductory or trailing conversational text outside the file blocks. Keep filenames lowercase with hyphens.`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const vaultId = formData.get('vaultId') as string;
    const textOrUrl = formData.get('text') as string;
    const file = formData.get('file') as File | null;

    if (!vaultId) {
      return NextResponse.json({ error: 'vaultId is required' }, { status: 400 });
    }

    let extractedText = textOrUrl || '';
    let sourceUrl = 'Manual Input';

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdfText = await extractTextFromPdf(buffer);
      if (pdfText) {
        extractedText += `\n[Extracted from PDF: ${file.name}]\n` + pdfText;
        sourceUrl = file.name;
      }
    } else if (textOrUrl && /^https?:\/\//i.test(textOrUrl)) {
      const pageText = await extractTextFromUrl(textOrUrl.trim());
      if (pageText) {
        extractedText = pageText;
        sourceUrl = textOrUrl.trim();
      }
    }

    if (!extractedText.trim()) {
      return NextResponse.json({ error: 'No text could be extracted.' }, { status: 400 });
    }

    const preIngestHash = await getCurrentCommitHash(vaultId);
    const chunks = chunkText(extractedText, 3000, 200);

    const stream = new ReadableStream({
      async start(controller) {
        const ingestModel = await getIngestModel();
        const encoder = new TextEncoder();
        const send = (s: string) => controller.enqueue(encoder.encode(s));
        const allPaths: string[] = [];
        let batchError: string | null = null;

        for (let i = 0; i < chunks.length; i++) {
          if (chunks.length > 1) {
            send(`\n--- Processing Chunk ${i + 1}/${chunks.length} (${chunks[i].wordCount} words) ---\n\n`);
          }

          try {
            const result = streamText({
              model: ingestModel,
              system: SYSTEM_PROMPT,
              prompt: `Source: ${sourceUrl}\nChunk ${i + 1} of ${chunks.length}:\n\n${chunks[i].text}`,
            });

            let fullText = '';
            for await (const part of result.textStream) {
              send(part);
              fullText += part;
            }

            const parsed = parseAIOutput(fullText);
            if (parsed.length === 0) {
              send(`\n⚠️ No valid file blocks found in chunk ${i + 1}. Output may have been malformed.\n`);
              continue;
            }

            for (const f of parsed) {
              if (!allPaths.includes(f.path)) allPaths.push(f.path);
              await writeMarkdownAndCommit(vaultId, f.path, f.content, `Compiled: ${f.path} from chunk ${i + 1} (${sourceUrl})`);
            }

            send(`\n✅ Parsed ${parsed.length} file(s) from chunk ${i + 1}\n`);
          } catch (err: unknown) {
            batchError = `Chunk ${i + 1} failed: ${err instanceof Error ? err.message : String(err)}`;
            send(`\n❌ ${batchError}\n`);
            break;
          }
        }

        if (chunks.length > 1 && allPaths.length > 0 && !batchError) {
          send(`\n\n--- Generating Consolidation Report ---\n\n`);

          try {
            const synthPrompt = `You have just extracted knowledge across ${chunks.length} sequential chunks from "${sourceUrl}".
Files generated: ${allPaths.join(', ')}.

Generate three structural files:
1. <file path="index.md">: Table of contents with one-line descriptions.
2. <file path="glossary.md">: Key terms and acronyms.
3. <file path="log.md">: Date, source, and changes introduced.

Output EXACTLY using <file path="filename.md"> markup. No conversational text.`;

            const synth = streamText({
              model: ingestModel,
              system: 'You are the final Knowledge Consolidation Engine.',
              prompt: synthPrompt,
            });

            let synthText = '';
            for await (const part of synth.textStream) {
              send(part);
              synthText += part;
            }

            const synthFiles = parseAIOutput(synthText);
            for (const f of synthFiles) {
              await writeMarkdownAndCommit(vaultId, f.path, f.content, `Consolidation: ${f.path} for ${sourceUrl}`);
            }
          } catch (err: unknown) {
            send(`\n⚠️ Consolidation failed: ${err instanceof Error ? err.message : String(err)}\n`);
          }
        }

        if (batchError && preIngestHash) {
          send(`\n🔄 Rolling back vault to pre-ingest state (${preIngestHash.slice(0, 8)})...\n`);

          send(`\n💡 Rollback initiated...\n`);

          try {
            const { simpleGit } = await import('simple-git');
            const pathMod = await import('path');
            const vaultPath = pathMod.join(process.cwd(), 'vaults', vaultId);
            const git = simpleGit(vaultPath);
            const log = await git.log({ maxCount: 1 });
            const currentHash = log.latest?.hash ?? '';
            if (currentHash === preIngestHash) {
              send(`✅ No changes to roll back — vault already at pre-ingest state.\n`);
            } else {
              await git.reset(['--hard', preIngestHash]);
              send(`✅ Rollback complete.\n`);
            }
          } catch (rollbackErr: unknown) {
            send(`❌ Rollback failed: ${rollbackErr instanceof Error ? rollbackErr.message : String(rollbackErr)}\n`);
          }
        }

        if (allPaths.length > 0 && !batchError) {
          exec('export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin && npx qmd update', { cwd: process.cwd() }, (err: any) => {
            if (err) {
              console.error('qmd background update failed', err);
              window.dispatchEvent(new CustomEvent(ROLLBACK_EVENT, { detail: { vaultId, success: false, message: err.message || 'Rollback failed' }}));
            } else {
              console.log('qmd background update finished');
              window.dispatchEvent(new CustomEvent(ROLLBACK_EVENT, { detail: { vaultId, success: true, message: 'Rollback complete' }}));
            }
          });
        }

        send(batchError ? `\n\n[Ingestion Failed — Rolled Back]` : `\n\n[Ingestion Complete: ${allPaths.length} files]`);
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err: unknown) {
    console.error('Ingestion Error', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
