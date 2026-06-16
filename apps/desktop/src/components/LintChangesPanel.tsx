import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import type { JobActivityState } from "../hooks/useJobActivity";
import type { LintFix, LintResult } from "../types";
import { lineDiff, linesAsDiff, type DiffLine } from "../lib/lineDiff";
import { BusyButton } from "./BusyButton";
import { JobActivityFeed } from "./JobActivityFeed";

interface LintChangesPanelProps {
  vaultId: string;
  lintResult: LintResult | null;
  lintBusy: boolean;
  activity: JobActivityState;
  showActivity: boolean;
  onApply: () => Promise<void>;
}

type FixWithBefore = LintFix & { before: string };

function actionLabel(action: string): string {
  return action.charAt(0).toUpperCase() + action.slice(1);
}

function diffForFix(fix: FixWithBefore): DiffLine[] {
  const action = fix.action.toLowerCase();
  if (action === "create") {
    const content = fix.content ?? "";
    return content ? linesAsDiff(content.split("\n"), "add") : [];
  }
  if (action === "delete") {
    return fix.before ? linesAsDiff(fix.before.split("\n"), "remove") : [];
  }
  if (action === "update") {
    return lineDiff(fix.before, fix.content ?? "");
  }
  return [];
}

function DiffView({ lines }: { lines: DiffLine[] }) {
  if (lines.length === 0) {
    return <p className="lint-diff-empty">No line-level preview available.</p>;
  }
  return (
    <pre className="lint-diff">
      {lines.map((line, i) => (
        <div key={`${line.type}-${i}`} className={`diff-line diff-line--${line.type}`}>
          <span className="diff-line-prefix">{line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}</span>
          <span className="diff-line-text">{line.text || " "}</span>
        </div>
      ))}
    </pre>
  );
}

export function LintChangesPanel({
  vaultId,
  lintResult,
  lintBusy,
  activity,
  showActivity,
  onApply,
}: LintChangesPanelProps) {
  const [fixesWithBefore, setFixesWithBefore] = useState<FixWithBefore[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!lintResult || !vaultId) return;
    let cancelled = false;
    void (async () => {
      setLoading(true);
      const enriched: FixWithBefore[] = [];
      for (const fix of lintResult.fixes) {
        let before = "";
        if (fix.action === "update" || fix.action === "delete") {
          try {
            const doc = await api.documentRead(vaultId, fix.path);
            before = doc.content;
          } catch {
            before = "";
          }
        }
        enriched.push({ ...fix, before });
      }
      if (!cancelled) {
        setFixesWithBefore(enriched);
        setExpanded(Object.fromEntries(enriched.map((f) => [f.path, true])));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lintResult, vaultId]);

  const fixCount = lintResult?.fixes.length ?? 0;
  const canApply = fixCount > 0 && !lintBusy && !loading;

  const header = useMemo(() => {
    if (lintBusy || showActivity) return "Linting vault…";
    if (!lintResult) return "Recommended changes";
    if (fixCount === 0) return "Recommended changes";
    return `Recommended changes (${fixCount} file${fixCount === 1 ? "" : "s"})`;
  }, [lintBusy, showActivity, lintResult, fixCount]);

  if (!lintResult && !lintBusy && !showActivity) {
    return null;
  }

  return (
    <div className="inspector-block lint-changes-panel">
      <h4>{header}</h4>

      {(lintBusy || showActivity) && (
        <JobActivityFeed activity={activity} busy={lintBusy} compact />
      )}

      {loading && !lintBusy && <p className="activity-working">Loading previews…</p>}

      {!lintBusy && lintResult && fixCount === 0 && (
        <p className="lint-no-fixes">No fixes recommended.</p>
      )}

      {!lintBusy && fixesWithBefore.length > 0 && (
        <ul className="lint-fix-list">
          {fixesWithBefore.map((fix) => {
            const lines = diffForFix(fix);
            const isOpen = expanded[fix.path] ?? true;
            return (
              <li key={`${fix.path}-${fix.action}`} className="lint-fix-card">
                <button
                  type="button"
                  className="lint-fix-header"
                  onClick={() => setExpanded((prev) => ({ ...prev, [fix.path]: !isOpen }))}
                  aria-expanded={isOpen}
                >
                  <span className="lint-fix-path">{fix.path}</span>
                  <span className={`lint-fix-badge lint-fix-badge--${fix.action}`}>
                    {actionLabel(fix.action)}
                  </span>
                </button>
                {isOpen && (
                  <div className="lint-fix-body">
                    <p className="lint-fix-reason">{fix.reason}</p>
                    <DiffView lines={lines} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {lintResult && lintResult.report.trim() && (
        <details className="lint-full-report">
          <summary>Full report</summary>
          <pre>{lintResult.report}</pre>
        </details>
      )}

      {lintResult && fixCount > 0 && (
        <div className="lint-apply-row">
          <BusyButton busy={lintBusy} busyLabel="Applying…" disabled={!canApply} onClick={() => void onApply()}>
            Apply fixes
          </BusyButton>
        </div>
      )}
    </div>
  );
}
