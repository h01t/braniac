import { api } from "../api";
import type { IngestRequest } from "../types";

export async function startIngest(
  request: IngestRequest,
  onLog?: (line: string) => void,
): Promise<string> {
  onLog?.("Starting ingest...");
  const jobId = await api.jobStartIngest(request);
  onLog?.(`Ingest job ${jobId} finished`);
  return jobId;
}

export function ingestFromUrl(vaultId: string, url: string): IngestRequest {
  return { vaultId, sourceUrl: url.trim(), text: null, filePath: null };
}

export function ingestFromPdf(vaultId: string, filePath: string): IngestRequest {
  return { vaultId, sourceUrl: null, text: null, filePath };
}

export function ingestFromText(vaultId: string, text: string): IngestRequest {
  return { vaultId, sourceUrl: null, text, filePath: null };
}

export function buildIngestRequest(
  vaultId: string,
  text: string,
  pdfPath: string | null,
): IngestRequest {
  if (pdfPath) {
    return ingestFromPdf(vaultId, pdfPath);
  }
  const trimmed = text.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return ingestFromUrl(vaultId, trimmed);
  }
  return ingestFromText(vaultId, trimmed);
}
