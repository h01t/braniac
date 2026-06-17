import { useCallback, useState } from "react";
import { api } from "../api";
import type { ApplyLintResult, LintResult } from "../types";
import type { MintLintPhase } from "../components/MintLintModal";
import type { Toast } from "../components/ToastStack";

type UseMintLintOptions = {
  vaultId: string;
  onLog: (line: string) => void;
  pushToast: (message: string, variant: Toast["variant"]) => void;
  refreshVault: (id: string) => Promise<void>;
  resetJobActivity: () => void;
};

export function useMintLint({
  vaultId,
  onLog,
  pushToast,
  refreshVault,
  resetJobActivity,
}: UseMintLintOptions) {
  const [lintBusy, setLintBusy] = useState(false);
  const [mintLintOpen, setMintLintOpen] = useState(false);
  const [mintLintPhase, setMintLintPhase] = useState<MintLintPhase>("idle");
  const [mintLintApplyProgress, setMintLintApplyProgress] = useState({ done: 0, total: 0 });
  const [mintLintApplyResult, setMintLintApplyResult] = useState<ApplyLintResult | null>(null);
  const [lintResult, setLintResult] = useState<LintResult | null>(null);
  const [lintJobId, setLintJobId] = useState<string | null>(null);

  const closeMintLintModal = useCallback(() => {
    setMintLintOpen(false);
    setMintLintPhase("idle");
    setMintLintApplyProgress({ done: 0, total: 0 });
    setMintLintApplyResult(null);
    setLintJobId(null);
  }, []);

  const startMintLint = useCallback(async () => {
    if (!vaultId || lintBusy) return;
    setMintLintOpen(true);
    setMintLintPhase("scanning");
    setMintLintApplyResult(null);
    setLintBusy(true);
    resetJobActivity();
    onLog("Running lint...");
    try {
      const jobId = await api.jobStartLint(vaultId);
      setLintJobId(jobId);
      const result = await api.jobLintResult(jobId);
      setLintResult(result);
      setMintLintPhase("review");
      if (result) {
        onLog(`${result.fixes.length} proposed fixes`);
      }
    } catch (error) {
      setLintResult({
        report: `Lint failed: ${String(error)}`,
        fixes: [],
      });
      setMintLintPhase("review");
      onLog(`Lint failed: ${String(error)}`);
    } finally {
      setLintBusy(false);
    }
  }, [vaultId, onLog, lintBusy, resetJobActivity]);

  const applyApprovedLintFixes = useCallback(
    async (fixIds: string[]) => {
      if (!vaultId || !lintJobId || fixIds.length === 0) return;
      setMintLintPhase("applying");
      setMintLintApplyProgress({ done: 0, total: fixIds.length });
      setLintBusy(true);
      try {
        const result = await api.jobLintApplySelected(vaultId, lintJobId, fixIds);
        setMintLintApplyProgress({ done: result.applied, total: fixIds.length });
        setMintLintApplyResult(result);
        setMintLintPhase("done");
        onLog(`Applied ${result.applied} lint fixes`);
        pushToast(`Applied ${result.applied} lint fixes`, "success");
        if (result.errors.length > 0) {
          onLog(result.errors.join("; "));
          pushToast(result.errors[0] ?? "Some fixes failed", "error");
        } else if (result.indexWarning) {
          onLog(result.indexWarning);
          pushToast(result.indexWarning, "error");
        }
        await refreshVault(vaultId);
        setLintResult(null);
        setLintJobId(null);
      } catch (error) {
        setMintLintApplyResult({ applied: 0, errors: [String(error)], indexWarning: null });
        setMintLintPhase("done");
        onLog(`Apply fixes failed: ${String(error)}`);
        pushToast(`Apply fixes failed: ${String(error)}`, "error");
      } finally {
        setLintBusy(false);
      }
    },
    [vaultId, lintJobId, onLog, refreshVault, pushToast],
  );

  const openMintLintReview = useCallback(() => {
    if (lintResult) {
      setMintLintOpen(true);
      setMintLintPhase("review");
      return;
    }
    onLog("No lint results — run Mint & Lint first.");
  }, [lintResult, onLog]);

  return {
    lintBusy,
    setLintBusy,
    mintLintOpen,
    setMintLintOpen,
    mintLintPhase,
    mintLintApplyProgress,
    mintLintApplyResult,
    lintResult,
    setLintResult,
    lintJobId,
    closeMintLintModal,
    startMintLint,
    applyApprovedLintFixes,
    openMintLintReview,
  };
}
