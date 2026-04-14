import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const execFileAsync = promisify(execFile);
const GRAPPER_BIN = '/Users/grmim/Dev/grapper/target/release/grapper';

export async function extractTextFromUrl(url: string) {
  try {
    const { stdout } = await execFileAsync(GRAPPER_BIN, ['--stdout', url]);
    return stdout;
  } catch (err) {
    console.error("URL extraction error (grapper)", err);
    return null;
  }
}

export async function extractTextFromPdf(buffer: Buffer) {
  try {
     const uniqueId = Date.now().toString() + Math.random().toString().slice(2);
     const tmpFilePath = path.join(os.tmpdir(), `ai-knowledge-${uniqueId}.pdf`);
     await fs.writeFile(tmpFilePath, buffer);
     
     // Delegate to Grapper High-Performance Rust engine
     const { stdout } = await execFileAsync(GRAPPER_BIN, ['--stdout', tmpFilePath]);
     
     // Ensure we clean up the tmp PDF
     await fs.unlink(tmpFilePath).catch(() => {});
     
     return stdout;
  } catch (err) {
     console.error("PDF Extraction error (grapper)", err);
     return null;
  }
}
