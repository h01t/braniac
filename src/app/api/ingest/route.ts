import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { deepseekReasoning } from '@/lib/deepseek';
import { writeMarkdownAndCommit } from '@/lib/vaultManager';
import { extractTextFromUrl, extractTextFromPdf } from '@/lib/extractor';

export const maxDuration = 300; 

function chunkTextByWords(text: string, maxWords: number = 3000) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(' '));
  }
  return chunks;
}

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
    } else if (textOrUrl && (textOrUrl.startsWith('http://') || textOrUrl.startsWith('https://'))) {
      const pageText = await extractTextFromUrl(textOrUrl.trim());
      if (pageText) {
         extractedText = pageText;
         sourceUrl = textOrUrl.trim();
      }
    }

    if (!extractedText.trim()) {
      return NextResponse.json({ error: 'No text could be extracted.' }, { status: 400 });
    }

    const batches = chunkTextByWords(extractedText, 3000);

    const systemPrompt = `You are a strict AI Knowledge Compiler. Your goal is to ingest the raw text and extract concepts, entities, and sources to build an interconnected Markdown wiki.
    
Categorize files into folders by prefixing the filename. Use folders like 'concepts/', 'entities/', 'sources/', or 'logs/'.

You must output your response ONLY using the following XML-like file formatting. You can generate multiple files.
<file path="category/filename.md">
# Title
Your markdown content here... Make sure to link to other concepts using [[concepts/filename.md]] syntax.
</file>

Do not write any introductory or trailing conversational text outside the file blocks.`;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const sendChunk = (str: string) => controller.enqueue(encoder.encode(str));
        
        const allDerivedPaths: string[] = [];

        for (let i = 0; i < batches.length; i++) {
          if (batches.length > 1) {
            sendChunk(`\n--- Processing Batch ${i+1}/${batches.length} ---\n\n`);
          }

          const result = streamText({
            model: deepseekReasoning,
            system: systemPrompt,
            prompt: `Source: ${sourceUrl}\nBatch ${i+1} of ${batches.length}:\n\n${batches[i]}`
          });

          let batchFullText = "";
          for await (const chunk of result.textStream) {
             sendChunk(chunk);
             batchFullText += chunk;
          }

          // Force flush of XML blocks mapped out by AI
          const regex = /<file path="([^"]+)">([\s\S]*?)<\/file>/g;
          let match;
          while ((match = regex.exec(batchFullText)) !== null) {
            const filepath = match[1];
            const content = match[2].trim();
            if (!allDerivedPaths.includes(filepath)) allDerivedPaths.push(filepath);
            await writeMarkdownAndCommit(vaultId, filepath, content, `Compiled: ${filepath} from batch ${i+1} (${sourceUrl})`);
          }
        }

        // Final consolidation report if multiple batches were used
        if (batches.length > 1) {
          sendChunk(`\n\n--- Generating Final Consolidation Report ---\n\n`);
          
          const synthPrompt = `You have just extracted knowledge across ${batches.length} sequential batches from the source "${sourceUrl}".
          The following files were generated into the knowledge vault: ${allDerivedPaths.join(', ')}.
          
          Write a comprehensive meta-report summarizing the core overall thesis and findings from the entire document execution.
          Output this report EXACTLY using the <file path="logs/consolidation_report.md"> markup format.`;

          const synth = streamText({
             model: deepseekReasoning,
             system: "You are the final Knowledge Consolidation Engine.",
             prompt: synthPrompt
          });

          let synthFullText = "";
          for await (const chunk of synth.textStream) {
             sendChunk(chunk);
             synthFullText += chunk;
          }

          const regex = /<file path="([^"]+)">([\s\S]*?)<\/file>/g;
          let match;
          if ((match = regex.exec(synthFullText)) !== null) {
              await writeMarkdownAndCommit(vaultId, match[1], match[2].trim(), `Generated Consolidation Report for ${sourceUrl}`);
          }
        }
        
        // Asynchronous qmd background refresh to update vector embeddings.
        if (allDerivedPaths.length > 0) {
           const { exec } = require('child_process');
           exec('export PATH=$PATH:/opt/homebrew/bin:/usr/local/bin && npx qmd embed', { cwd: process.cwd() }, (err: any) => {
              if (err) console.error("qmd background embed failed", err);
              else console.log("qmd background embed finished successfully");
           });
        }

        sendChunk(`\n\n[Ingestion Complete]`);
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });
  } catch (err: any) {
    console.error("Ingestion Error", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
