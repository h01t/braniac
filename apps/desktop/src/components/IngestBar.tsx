import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { ingestFromPdf, ingestFromText, ingestFromUrl, startIngest } from "../lib/ingest";
import type { JobActivityState } from "../hooks/useJobActivity";
import { BusyButton } from "./BusyButton";
import { JobActivityFeed } from "./JobActivityFeed";

interface IngestBarProps {
  vaultId: string;
  busy: boolean;
  activity: JobActivityState;
  onLog: (line: string) => void;
  onComplete: () => Promise<void>;
  onBusyChange: (busy: boolean) => void;
  onActivityReset: () => void;
}

export function IngestBar({
  vaultId,
  busy,
  activity,
  onLog,
  onComplete,
  onBusyChange,
  onActivityReset,
}: IngestBarProps) {
  const [text, setText] = useState("");
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [activityPinned, setActivityPinned] = useState(false);
  const [activityCollapsed, setActivityCollapsed] = useState(false);

  const hasActivity =
    busy || activity.phase !== "idle" || activity.steps.length > 0 || activity.streamChunks.length > 0;
  const autoExpand = busy || activity.phase === "running";
  const activityOpen =
    autoExpand || ((hasActivity || activityPinned) && !activityCollapsed);

  const pickPdf = async () => {
    const selected = await open({
      multiple: false,
      filters: [{ name: "PDF", extensions: ["pdf"] }],
      title: "Select PDF to compile",
    });
    if (typeof selected === "string") setPdfPath(selected);
  };

  const canSubmit = !busy && vaultId && (!!text.trim() || !!pdfPath);

  const handleCompile = async () => {
    if (!canSubmit) return;
    onActivityReset();
    setActivityPinned(true);
    setActivityCollapsed(false);
    onBusyChange(true);
    try {
      if (pdfPath) {
        await startIngest(ingestFromPdf(vaultId, pdfPath), onLog);
      } else if (/^https?:\/\//i.test(text.trim())) {
        await startIngest(ingestFromUrl(vaultId, text.trim()), onLog);
      } else {
        await startIngest(ingestFromText(vaultId, text.trim()), onLog);
      }
      setText("");
      setPdfPath(null);
      await onComplete();
    } catch (error) {
      onLog(`Compile error: ${String(error)}`);
    } finally {
      onBusyChange(false);
    }
  };

  return (
    <div
      className={`ingest-bar ${dragOver ? "drag-over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        void (async () => {
          const dropped = e.dataTransfer.files?.[0];
          if (!dropped) return;
          const path = (dropped as File & { path?: string }).path;
          if (path) {
            setPdfPath(path);
            return;
          }
          const selected = await open({
            multiple: false,
            filters: [{ name: "PDF", extensions: ["pdf"] }],
            title: "Select PDF to compile",
          });
          if (typeof selected === "string") setPdfPath(selected);
        })();
      }}
    >
      <textarea
        placeholder="Drop a URL or PDF here to compile knowledge…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            void handleCompile();
          }
        }}
        rows={2}
        aria-label="Ingest source"
        disabled={busy}
      />
      <div className="ingest-bar-footer">
        <div className="ingest-bar-meta">
          {pdfPath ? (
            <span>
              PDF: {pdfPath.split("/").pop()}{" "}
              <button type="button" className="linkish" onClick={() => setPdfPath(null)} disabled={busy}>
                clear
              </button>
            </span>
          ) : (
            <button type="button" className="linkish" onClick={() => void pickPdf()} disabled={busy}>
              Attach PDF
            </button>
          )}
        </div>
        <BusyButton busy={busy} busyLabel="Compiling…" onClick={() => void handleCompile()} disabled={!canSubmit}>
          Compile
        </BusyButton>
      </div>
      {(hasActivity || activityPinned) && (
        <div className="ingest-activity">
          <button
            type="button"
            className={`ingest-activity-toggle${activityOpen ? " ingest-activity-toggle--open" : ""}`}
            onClick={() => {
              if (activityOpen) {
                setActivityCollapsed(true);
                setActivityPinned(false);
              } else {
                setActivityCollapsed(false);
                setActivityPinned(true);
              }
            }}
            aria-expanded={activityOpen}
          >
            <span>Activity</span>
            <span className="ingest-activity-chevron" aria-hidden="true" />
          </button>
          {activityOpen && <JobActivityFeed activity={activity} busy={busy} />}
        </div>
      )}
    </div>
  );
}
