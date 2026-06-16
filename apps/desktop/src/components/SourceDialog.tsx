import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { ingestFromPdf, ingestFromText, ingestFromUrl, startIngest } from "../lib/ingest";
import { BusyButton } from "./BusyButton";

interface SourceDialogProps {
  open: boolean;
  vaultId: string;
  busy: boolean;
  onClose: () => void;
  onLog: (line: string) => void;
  onComplete: () => Promise<void>;
}

export function SourceDialog({
  open: isOpen,
  vaultId,
  busy,
  onClose,
  onLog,
  onComplete,
}: SourceDialogProps) {
  const [text, setText] = useState("");
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  if (!isOpen) return null;

  const canCompile = !busy && vaultId && (text.trim().length > 0 || pdfPath);

  const handleCompile = async () => {
    if (!vaultId || !canCompile) return;
    try {
      let request;
      if (pdfPath) {
        request = ingestFromPdf(vaultId, pdfPath);
      } else if (/^https?:\/\//i.test(text.trim())) {
        request = ingestFromUrl(vaultId, text.trim());
      } else {
        request = ingestFromText(vaultId, text.trim());
      }
      await startIngest(request, onLog);
      setText("");
      setPdfPath(null);
      await onComplete();
      onClose();
    } catch (error) {
      onLog(`Ingest failed: ${String(error)}`);
    }
  };

  const pickPdf = async () => {
    const selected = await open({
      multiple: false,
      filters: [{ name: "PDF", extensions: ["pdf"] }],
      title: "Select PDF to compile",
    });
    if (typeof selected === "string") {
      setPdfPath(selected);
    }
  };

  return (
    <div
      className="command-palette-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="New source"
    >
      <div className="command-palette source-dialog">
        <h3>New Source</h3>
        <p className="source-dialog-hint">
          Paste a URL, enter raw text, or attach a PDF. The knowledge compiler will extract and
          write markdown into your vault.
        </p>
        <textarea
          autoFocus
          placeholder="https://example.com/article or raw text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          aria-label="Source URL or text"
          disabled={busy}
        />
        <div className="source-dialog-row">
          <button type="button" onClick={() => void pickPdf()} disabled={busy}>
            Choose PDF…
          </button>
          {pdfPath && (
            <span className="source-dialog-pdf">
              {pdfPath.split("/").pop()}
              <button type="button" className="linkish" onClick={() => setPdfPath(null)} disabled={busy}>
                ×
              </button>
            </span>
          )}
        </div>
        <div className="source-dialog-actions">
          <button type="button" className="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <BusyButton busy={busy} busyLabel="Compiling…" disabled={!canCompile} onClick={() => void handleCompile()}>
            Compile
          </BusyButton>
        </div>
      </div>
    </div>
  );
}
