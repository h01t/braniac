import * as cheerio from 'cheerio';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const execFileAsync = promisify(execFile);

export async function extractTextFromUrl(url: string) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('script, style, noscript, svg, nav, footer, iframe, header, aside').remove();
    
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    return text;
  } catch (err) {
    console.error("URL extraction error", err);
    return null;
  }
}

export async function extractTextFromPdf(buffer: Buffer) {
  try {
     const uniqueId = Date.now().toString() + Math.random().toString().slice(2);
     const tmpFilePath = path.join(os.tmpdir(), `ai-knowledge-${uniqueId}.pdf`);
     await fs.writeFile(tmpFilePath, buffer);
     
     // Delegate to Poppler pdftotext for reliable C++ extraction
     const { stdout } = await execFileAsync('/opt/homebrew/bin/pdftotext', ['-layout', '-q', tmpFilePath, '-']);
     
     // Ensure we clean up the tmp PDF
     await fs.unlink(tmpFilePath).catch(() => {});
     
     return stdout;
  } catch (err) {
     console.error("PDF Extraction error (pdftotext)", err);
     return null;
  }
}
