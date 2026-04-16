'use client';
import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ── Types ────────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'scanning' | 'review' | 'applying' | 'done';

interface Proposal {
  path: string;
  action: 'update' | 'create' | 'delete';
  reason: string;
  before: string;
  after: string;
  diff: string;
  approved: boolean;
}

interface LintResult {
  report: string;
  proposals: Proposal[];
  fromCache: boolean;
  skippedCount: number;
  cacheCommitHash?: string;
  currentCommitHash?: string;
}

// ── Icons ────────────────────────────────────────────────────────────────────

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const Spinner = ({ size = 22 }: { size?: number }) => (
  <div style={{
    width: `${size}px`, height: `${size}px`,
    border: `${size > 16 ? 2.5 : 2}px solid var(--border)`,
    borderTopColor: 'var(--accent)',
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite',
    flexShrink: 0,
  }} />
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ transition: 'transform 0.15s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ── Diff renderer (same style as EvalOps) ────────────────────────────────────

function DiffLine({ line, i }: { line: string; i: number }) {
  if (line.startsWith('@@')) {
    return (
      <div key={i} style={{ background: 'var(--diff-hunk)', color: 'var(--diff-hunk-text)', padding: '2px 10px', margin: '3px 0', fontSize: '11.5px', fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>
        {line}
      </div>
    );
  }
  if (line.startsWith('+') && !line.startsWith('+++')) {
    return <div key={i} style={{ background: 'var(--diff-add)', color: 'var(--diff-add-text)', padding: '1px 10px', display: 'flex', gap: '8px' }}>
      <span style={{ opacity: 0.6, userSelect: 'none', minWidth: '12px' }}>+</span><span>{line.slice(1)}</span>
    </div>;
  }
  if (line.startsWith('-') && !line.startsWith('---')) {
    return <div key={i} style={{ background: 'var(--diff-sub)', color: 'var(--diff-sub-text)', padding: '1px 10px', display: 'flex', gap: '8px' }}>
      <span style={{ opacity: 0.6, userSelect: 'none', minWidth: '12px' }}>−</span><span>{line.slice(1)}</span>
    </div>;
  }
  if (line.startsWith('diff ') || line.startsWith('index ') || line.startsWith('+++') || line.startsWith('---')) {
    return <div key={i} style={{ padding: '1px 10px', color: 'var(--text-dim)', fontSize: '11px' }}>{line}</div>;
  }
  return <div key={i} style={{ padding: '1px 10px', color: '#c9d1d9' }}>{line}</div>;
}

// ── Action badge ─────────────────────────────────────────────────────────────

const ACTION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  update: { bg: 'rgba(129,140,248,0.1)', text: '#818cf8', border: 'rgba(129,140,248,0.3)' },
  create: { bg: 'var(--diff-add)',        text: 'var(--diff-add-text)', border: 'rgba(74,222,128,0.3)' },
  delete: { bg: 'var(--diff-sub)',        text: 'var(--diff-sub-text)', border: 'rgba(248,113,113,0.3)' },
};

function ActionBadge({ action }: { action: string }) {
  const c = ACTION_COLORS[action] ?? ACTION_COLORS.update;
  return (
    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '2px 6px', borderRadius: '4px', background: c.bg, color: c.text, border: `1px solid ${c.border}`, flexShrink: 0 }}>
      {action}
    </span>
  );
}

// ── Proposal card ────────────────────────────────────────────────────────────

function ProposalCard({
  proposal, index, onToggle,
}: {
  proposal: Proposal;
  index: number;
  onToggle: (i: number) => void;
}) {
  const [diffOpen, setDiffOpen] = useState(false);
  const hasDiff = proposal.diff && proposal.diff.trim().length > 0;

  return (
    <div style={{
      border: `1px solid ${proposal.approved ? 'var(--accent-border)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-md)',
      background: proposal.approved ? 'var(--accent-dim)' : 'var(--bg-surface)',
      marginBottom: '8px',
      overflow: 'hidden',
      transition: 'border-color 0.15s, background 0.15s',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px' }}>
        {/* Approve toggle */}
        <button
          onClick={() => onToggle(index)}
          style={{
            width: '20px', height: '20px', borderRadius: '5px', flexShrink: 0, padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: proposal.approved ? 'var(--accent)' : 'var(--bg-hover)',
            border: `1.5px solid ${proposal.approved ? 'var(--accent)' : 'var(--border)'}`,
            color: proposal.approved ? '#09090b' : 'transparent',
            transition: 'var(--transition)',
            marginTop: '1px',
          }}
        >
          <CheckIcon />
        </button>

        {/* File info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <ActionBadge action={proposal.action} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', fontFamily: "'SF Mono','Fira Code','Consolas',monospace", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {proposal.path}
            </span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {proposal.reason}
          </div>
        </div>
      </div>

      {/* Diff toggle */}
      {hasDiff && (
        <>
          <button
            data-ghost="true"
            onClick={() => setDiffOpen(prev => !prev)}
            style={{ width: '100%', justifyContent: 'flex-start', gap: '6px', padding: '6px 12px', borderRadius: 0, borderTop: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-dim)' }}
          >
            <ChevronIcon open={diffOpen} />
            {diffOpen ? 'Hide diff' : 'Show diff'}
          </button>

          {diffOpen && (
            <div style={{ background: '#010409', borderTop: '1px solid var(--border)' }}>
              <pre style={{ margin: 0, padding: 0, fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '11.5px', lineHeight: 1.5, overflowX: 'auto', maxHeight: '240px', overflowY: 'auto' }}>
                {proposal.diff.split('\n').map((line, i) => <DiffLine key={i} line={line} i={i} />)}
              </pre>
            </div>
          )}
        </>
      )}

      {/* Delete: show old content snippet */}
      {proposal.action === 'delete' && !hasDiff && proposal.before && (
        <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--diff-sub-text)', background: 'var(--diff-sub)', fontFamily: "'SF Mono','Fira Code','Consolas',monospace", whiteSpace: 'pre-wrap', maxHeight: '80px', overflow: 'hidden' }}>
          {proposal.before.slice(0, 300)}{proposal.before.length > 300 ? '...' : ''}
        </div>
      )}
    </div>
  );
}

// ── Markdown renderer (shared styles) ────────────────────────────────────────

const mdComponents: any = {
  h1: ({ node, ...p }: any) => <h1 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '16px', marginTop: 0 }} {...p} />,
  h2: ({ node, ...p }: any) => {
    const text = String((p.children as any)?.[0] ?? '');
    const border = text.includes('⚠') || text.includes('Error') ? 'var(--diff-sub-text)'
                 : text.includes('✅') || text.includes('Pass') ? 'var(--diff-add-text)'
                 : 'var(--accent)';
    return <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginTop: '28px', marginBottom: '10px', paddingLeft: '12px', borderLeft: `3px solid ${border}` }} {...p} />;
  },
  p:  ({ node, ...p }: any) => <p  style={{ color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.65 }} {...p} />,
  li: ({ node, ...p }: any) => <li style={{ color: 'var(--text-muted)', marginBottom: '4px'  }} {...p} />,
  strong: ({ node, ...p }: any) => <strong style={{ color: 'var(--text-main)' }} {...p} />,
  code: ({ node, inline, ...p }: any) => (
    <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 5px', borderRadius: '4px', fontSize: '12px', color: 'var(--accent)', fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }} {...p} />
  ),
  hr: ({ node, ...p }: any) => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} {...p} />,
};

// ── Main component ───────────────────────────────────────────────────────────

export default function Linter({ vaultId }: { vaultId: string }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<LintResult | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [applyProgress, setApplyProgress] = useState({ done: 0, total: 0 });
  const [applyErrors, setApplyErrors] = useState<string[]>([]);

  const isOpen = phase !== 'idle';

  const runLint = async () => {
    setPhase('scanning');
    setResult(null);
    setProposals([]);
    try {
      const res  = await fetch('/api/lint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vaultId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const withApproval = (data.proposals ?? []).map((p: any) => ({ ...p, approved: false }));
      setResult(data);
      setProposals(withApproval);
      setPhase('review');
    } catch (e: any) {
      setResult({ report: `⚠️ Linter failed: ${e.message}`, proposals: [], fromCache: false, skippedCount: 0 });
      setProposals([]);
      setPhase('review');
    }
  };

  const toggleProposal = (index: number) => {
    setProposals(prev => prev.map((p, i) => i === index ? { ...p, approved: !p.approved } : p));
  };

  const setAllApproved = (approved: boolean) => {
    setProposals(prev => prev.map(p => ({ ...p, approved })));
  };

  const approvedCount = proposals.filter(p => p.approved).length;

  const applyChanges = async () => {
    const toApply = proposals.filter(p => p.approved);
    setApplyProgress({ done: 0, total: toApply.length });
    setApplyErrors([]);
    setPhase('applying');

    try {
      const res = await fetch('/api/lint/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vaultId, proposals: toApply }),
      });
      const data = await res.json();
      setApplyProgress({ done: data.applied ?? 0, total: toApply.length });
      setApplyErrors(data.errors ?? []);
      // Signal graph + file tree to refresh
      window.dispatchEvent(new CustomEvent('vault-updated'));
    } catch (e: any) {
      setApplyErrors([e.message]);
    }
    setPhase('done');
  };

  const closeModal = useCallback(() => {
    setPhase('idle');
    setResult(null);
    setProposals([]);
    setApplyErrors([]);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeModal]);

  // ── Review modal width: expand to 2 columns when there are proposals ──────
  const modalWidth = proposals.length > 0 ? '1100px' : '820px';

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={runLint}
        style={{
          width: '100%', justifyContent: 'center',
          background: 'transparent', border: '1px solid var(--accent-border)',
          color: 'var(--accent)', padding: '8px 14px',
          borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '12.5px',
          boxShadow: '0 0 10px var(--accent-glow)', transition: 'var(--transition)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-dim)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-border)'; }}
      >
        <SparkleIcon /> Mint &amp; Lint Vault
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            animation: 'fade-in 0.18s ease',
            padding: '24px',
          }}
        >
          <div style={{
            width: modalWidth, maxWidth: 'calc(100vw - 48px)',
            height: '84vh', maxHeight: '820px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
            animation: 'modal-in 0.2s cubic-bezier(0.4,0,0.2,1)',
            overflow: 'hidden',
            transition: 'width 0.2s ease',
          }}>
            {/* ── Modal header ─────────────────────────────────────────── */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--bg-surface)', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent)' }}><SparkleIcon /></span>
                <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '14px', fontWeight: 700 }}>
                  Mint &amp; Lint Report
                </h3>
                <span style={{ fontSize: '10px', color: 'var(--text-dim)', background: 'var(--bg-hover)', padding: '2px 8px', borderRadius: '99px', border: '1px solid var(--border)', fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>
                  vault: {vaultId}
                </span>
                {result?.fromCache && (
                  <span style={{ fontSize: '10px', color: 'var(--diff-add-text)', background: 'var(--diff-add)', padding: '2px 8px', borderRadius: '99px', border: '1px solid rgba(74,222,128,0.2)', fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>
                    checkpoint {result.cacheCommitHash?.slice(0, 7)} → {result.currentCommitHash?.slice(0, 7)} · {result.skippedCount} skipped
                  </span>
                )}
                {!result?.fromCache && result && (
                  <span style={{ fontSize: '10px', color: 'var(--text-dim)', background: 'var(--bg-hover)', padding: '2px 8px', borderRadius: '99px', border: '1px solid var(--border)' }}>
                    full scan
                  </span>
                )}
              </div>
              <button data-ghost="true" onClick={closeModal} title="Close (Esc)" style={{ padding: '6px' }}>
                <CloseIcon />
              </button>
            </div>

            {/* ── Modal body ───────────────────────────────────────────── */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

              {/* SCANNING */}
              {phase === 'scanning' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>
                  <Spinner />
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '6px' }}>Scanning Knowledge Graph...</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', animation: 'pulse-glow 2s ease-in-out infinite' }}>
                      DeepSeek Reasoning Engine is evaluating nodes
                    </div>
                  </div>
                </div>
              )}

              {/* REVIEW */}
              {phase === 'review' && result && (
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                  {/* Left: analysis report */}
                  <div style={{ flex: proposals.length > 0 ? '0 0 55%' : '1', overflowY: 'auto', padding: '24px', borderRight: proposals.length > 0 ? '1px solid var(--border)' : 'none', fontSize: '13.5px', lineHeight: '1.65' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                      {result.report}
                    </ReactMarkdown>
                  </div>

                  {/* Right: proposals */}
                  {proposals.length > 0 && (
                    <div style={{ flex: '0 0 45%', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '12px', padding: '0 4px' }}>
                        Proposed changes ({proposals.length})
                      </div>
                      {proposals.map((p, i) => (
                        <ProposalCard key={i} proposal={p} index={i} onToggle={toggleProposal} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* APPLYING */}
              {phase === 'applying' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>
                  <Spinner />
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '6px' }}>Applying changes...</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                      {applyProgress.done} / {applyProgress.total} files
                    </div>
                  </div>
                </div>
              )}

              {/* DONE */}
              {phase === 'done' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px' }}>
                  <div style={{ fontSize: '36px' }}>✅</div>
                  <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-main)' }}>
                    {applyProgress.done} change{applyProgress.done !== 1 ? 's' : ''} applied
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    Vault committed. Graph will refresh automatically.
                  </div>
                  {applyErrors.length > 0 && (
                    <div style={{ background: 'var(--diff-sub)', border: '1px solid var(--diff-sub-text)', borderRadius: 'var(--radius-md)', padding: '12px 16px', maxWidth: '400px', width: '100%' }}>
                      <div style={{ fontWeight: 700, color: 'var(--diff-sub-text)', marginBottom: '6px', fontSize: '12px' }}>Errors ({applyErrors.length})</div>
                      {applyErrors.map((e, i) => (
                        <div key={i} style={{ fontSize: '11.5px', color: 'var(--diff-sub-text)', fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>{e}</div>
                      ))}
                    </div>
                  )}
                  <button onClick={closeModal} style={{ marginTop: '8px' }}>Close</button>
                </div>
              )}
            </div>

            {/* ── Footer (review phase only) ────────────────────────────── */}
            {phase === 'review' && proposals.length > 0 && (
              <div style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--border)',
                background: 'var(--bg-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexShrink: 0, gap: '12px',
              }}>
                {/* Left: stats */}
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}>
                  <span style={{ color: approvedCount > 0 ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {approvedCount}
                  </span>
                  {' '}/ {proposals.length} approved
                </span>

                {/* Right: actions */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button data-ghost="true" onClick={() => setAllApproved(false)} style={{ fontSize: '12px' }}>
                    Reject All
                  </button>
                  <button data-ghost="true" onClick={() => setAllApproved(true)} style={{ fontSize: '12px' }}>
                    Approve All
                  </button>
                  <button
                    data-primary="true"
                    onClick={applyChanges}
                    disabled={approvedCount === 0}
                    style={{ fontSize: '12.5px', padding: '7px 16px' }}
                  >
                    <SparkleIcon />
                    Apply {approvedCount > 0 ? approvedCount : ''} Change{approvedCount !== 1 ? 's' : ''}
                  </button>
                </div>
              </div>
            )}

            {/* Footer for review with no proposals */}
            {phase === 'review' && proposals.length === 0 && (
              <div style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--border)',
                background: 'var(--bg-surface)',
                display: 'flex', justifyContent: 'flex-end',
                flexShrink: 0,
              }}>
                <button onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
