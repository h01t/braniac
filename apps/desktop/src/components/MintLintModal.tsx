import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "../api";
import type { ApplyLintResult, LintFix, LintResult } from "../types";
import {
  actionLabel,
  diffForFix,
  LintDiffView,
  type FixWithBefore,
} from "./LintDiffView";

export type MintLintPhase = "idle" | "scanning" | "review" | "applying" | "done";

export type Proposal = FixWithBefore & { approved: boolean };

interface MintLintModalProps {
  open: boolean;
  vaultId: string;
  phase: MintLintPhase;
  result: LintResult | null;
  applyProgress: { done: number; total: number };
  applyResult: ApplyLintResult | null;
  onClose: () => void;
  onApplyApproved: (fixes: LintFix[]) => Promise<void>;
}

function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={`mint-lint-chevron${open ? " mint-lint-chevron--open" : ""}`}
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Spinner() {
  return <span className="activity-step-icon activity-step-icon--spin mint-lint-spinner" aria-hidden="true" />;
}

function ProposalCard({
  proposal,
  index,
  onToggle,
}: {
  proposal: Proposal;
  index: number;
  onToggle: (index: number) => void;
}) {
  const [diffOpen, setDiffOpen] = useState(false);
  const lines = diffForFix(proposal);
  const hasDiff = lines.length > 0;

  return (
    <div className={`mint-lint-proposal${proposal.approved ? " mint-lint-proposal--approved" : ""}`}>
      <div className="mint-lint-proposal-header">
        <button
          type="button"
          className={`mint-lint-approve${proposal.approved ? " mint-lint-approve--on" : ""}`}
          aria-label={proposal.approved ? "Unapprove change" : "Approve change"}
          aria-pressed={proposal.approved}
          onClick={() => onToggle(index)}
        >
          <CheckIcon />
        </button>
        <div className="mint-lint-proposal-meta">
          <div className="mint-lint-proposal-title">
            <span className={`lint-fix-badge lint-fix-badge--${proposal.action}`}>
              {actionLabel(proposal.action)}
            </span>
            <span className="lint-fix-path">{proposal.path}</span>
          </div>
          <p className="lint-fix-reason">{proposal.reason}</p>
        </div>
      </div>
      {hasDiff && (
        <>
          <button
            type="button"
            className="mint-lint-diff-toggle"
            onClick={() => setDiffOpen((prev) => !prev)}
          >
            <ChevronIcon open={diffOpen} />
            {diffOpen ? "Hide diff" : "Show diff"}
          </button>
          {diffOpen && (
            <div className="mint-lint-diff-body">
              <LintDiffView lines={lines} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function MintLintModal({
  open,
  vaultId,
  phase,
  result,
  applyProgress,
  applyResult,
  onClose,
  onApplyApproved,
}: MintLintModalProps) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);

  useEffect(() => {
    if (!open || !result || !vaultId) {
      return;
    }
    let cancelled = false;
    void (async () => {
      setLoadingPreviews(true);
      const enriched: Proposal[] = [];
      for (const fix of result.fixes) {
        let before = "";
        if (fix.action === "update" || fix.action === "delete") {
          try {
            const doc = await api.documentRead(vaultId, fix.path);
            before = doc.content;
          } catch {
            before = "";
          }
        }
        enriched.push({ ...fix, before, approved: false });
      }
      if (!cancelled) {
        setProposals(enriched);
        setLoadingPreviews(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, result, vaultId]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase !== "applying") {
        onClose();
      }
    },
    [onClose, phase],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  const approvedCount = proposals.filter((p) => p.approved).length;
  const hasProposals = proposals.length > 0;
  const modalWide = hasProposals;

  const toggleProposal = (index: number) => {
    setProposals((prev) =>
      prev.map((p, i) => (i === index ? { ...p, approved: !p.approved } : p)),
    );
  };

  const setAllApproved = (approved: boolean) => {
    setProposals((prev) => prev.map((p) => ({ ...p, approved })));
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && phase !== "applying") {
      onClose();
    }
  };

  return (
    <div
      className="mint-lint-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Mint and Lint Report"
      onClick={handleBackdropClick}
    >
      <div className={`mint-lint-modal${modalWide ? " mint-lint-modal--wide" : ""}`}>
        <header className="mint-lint-header">
          <div className="mint-lint-header-left">
            <span className="mint-lint-sparkle">
              <SparkleIcon />
            </span>
            <h3 className="mint-lint-title">Mint &amp; Lint Report</h3>
            <span className="mint-lint-chip">vault: {vaultId}</span>
            {result?.fromCache && (
              <span className="mint-lint-chip mint-lint-chip--cache">
                {result.cacheCommitHash?.slice(0, 7) ?? "?"} →{" "}
                {result.currentCommitHash?.slice(0, 7) ?? "?"} · {result.skippedCount ?? 0}{" "}
                skipped
              </span>
            )}
            {result && !result.fromCache && phase === "review" && (
              <span className="mint-lint-chip">full scan</span>
            )}
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close"
            disabled={phase === "applying"}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="mint-lint-body">
          {phase === "scanning" && (
            <div className="mint-lint-center">
              <Spinner />
              <div className="mint-lint-center-text">
                <strong>Scanning Knowledge Graph…</strong>
                <span>Evaluating vault structural health</span>
              </div>
            </div>
          )}

          {phase === "review" && result && (
            <div className={`mint-lint-review${hasProposals ? " mint-lint-review--split" : ""}`}>
              <div className="mint-lint-report markdown-preview">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.report}</ReactMarkdown>
              </div>
              {hasProposals && (
                <div className="mint-lint-proposals">
                  <div className="mint-lint-proposals-heading">
                    Proposed changes ({proposals.length})
                  </div>
                  {loadingPreviews && (
                    <p className="activity-working">Loading previews…</p>
                  )}
                  {proposals.map((p, i) => (
                    <ProposalCard key={`${p.path}-${p.action}`} proposal={p} index={i} onToggle={toggleProposal} />
                  ))}
                </div>
              )}
            </div>
          )}

          {phase === "applying" && (
            <div className="mint-lint-center">
              <Spinner />
              <div className="mint-lint-center-text">
                <strong>Applying changes…</strong>
                <span>
                  {applyProgress.done} / {applyProgress.total} files
                </span>
              </div>
            </div>
          )}

          {phase === "done" && applyResult && (
            <div className="mint-lint-center mint-lint-done">
              <div className="mint-lint-done-icon" aria-hidden="true">
                ✓
              </div>
              <strong>
                {applyResult.applied} change{applyResult.applied !== 1 ? "s" : ""} applied
              </strong>
              <span>Vault updated. Graph will refresh automatically.</span>
              {applyResult.errors.length > 0 && (
                <div className="mint-lint-errors">
                  <strong>Errors ({applyResult.errors.length})</strong>
                  {applyResult.errors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </div>
              )}
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>

        {phase === "review" && hasProposals && (
          <footer className="mint-lint-footer">
            <span className="mint-lint-approval-count">
              <span className={approvedCount > 0 ? "mint-lint-approval-active" : ""}>
                {approvedCount}
              </span>{" "}
              / {proposals.length} approved
            </span>
            <div className="mint-lint-footer-actions">
              <button type="button" className="secondary" onClick={() => setAllApproved(false)}>
                Reject All
              </button>
              <button type="button" className="secondary" onClick={() => setAllApproved(true)}>
                Approve All
              </button>
              <button
                type="button"
                className="mint-lint-apply-btn"
                disabled={approvedCount === 0}
                onClick={() =>
                  void onApplyApproved(
                    proposals
                      .filter((p) => p.approved)
                      .map(({ path, action, reason, content }) => ({
                        path,
                        action,
                        reason,
                        content,
                      })),
                  )
                }
              >
                <SparkleIcon />
                Apply {approvedCount > 0 ? approvedCount : ""} Change
                {approvedCount !== 1 ? "s" : ""}
              </button>
            </div>
          </footer>
        )}

        {phase === "review" && !hasProposals && (
          <footer className="mint-lint-footer mint-lint-footer--end">
            <button type="button" onClick={onClose}>
              Close
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
