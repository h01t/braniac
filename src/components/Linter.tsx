'use client';
import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const Spinner = () => (
  <div style={{
    width: '22px', height: '22px',
    border: '2.5px solid var(--border)',
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

export default function Linter({ vaultId }: { vaultId: string }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');
  const [open, setOpen] = useState(false);

  const runLint = async () => {
    setLoading(true);
    setOpen(true);
    setReport('');
    try {
      const res = await fetch('/api/lint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vaultId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReport(data.report);
    } catch (e: any) {
      setReport(`⚠️ Linter failed: ${e.message}`);
    }
    setLoading(false);
  };

  const closeModal = useCallback(() => setOpen(false), []);

  // Escape key + backdrop click close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, closeModal]);

  return (
    <>
      <button
        onClick={runLint}
        style={{
          width: '100%',
          justifyContent: 'center',
          background: 'transparent',
          border: '1px solid var(--accent-border)',
          color: 'var(--accent)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-md)',
          fontWeight: 600, fontSize: '12.5px',
          boxShadow: '0 0 10px var(--accent-glow)',
          transition: 'var(--transition)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-dim)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-border)';
        }}
      >
        <SparkleIcon /> Mint & Lint Vault
      </button>

      {open && (
        <div
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            animation: 'fade-in 0.18s ease',
          }}
        >
          <div style={{
            width: '820px', maxWidth: 'calc(100vw - 48px)',
            height: '78vh', maxHeight: '700px',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
            animation: 'modal-in 0.2s cubic-bezier(0.4,0,0.2,1)',
            overflow: 'hidden',
          }}>
            {/* Modal header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--bg-surface)', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent)' }}><SparkleIcon /></span>
                <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '14px', fontWeight: 700 }}>
                  Knowledge Linter Report
                </h3>
                <span style={{
                  fontSize: '10px', color: 'var(--text-dim)', background: 'var(--bg-hover)',
                  padding: '2px 8px', borderRadius: '99px', border: '1px solid var(--border)',
                  fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
                }}>
                  vault: {vaultId}
                </span>
              </div>
              <button
                data-ghost="true"
                onClick={closeModal}
                title="Close (Esc)"
                style={{ padding: '6px' }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Modal body */}
            <div style={{
              flex: 1, padding: '24px', overflowY: 'auto',
              fontSize: '13.5px', lineHeight: '1.65',
            }}>
              {loading ? (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', height: '100%', gap: '18px',
                }}>
                  <Spinner />
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '6px' }}>Scanning Knowledge Graph...</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', animation: 'pulse-glow 2s ease-in-out infinite' }}>
                      DeepSeek Reasoning Engine is evaluating nodes
                    </div>
                  </div>
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '16px' }} {...props} />
                    ),
                    h2: ({ node, ...props }) => {
                      const text = String((props.children as any)?.[0] ?? '');
                      const borderColor = text.includes('⚠') || text.includes('Error') ? 'var(--diff-sub-text)'
                                       : text.includes('✅') || text.includes('Pass') ? 'var(--diff-add-text)'
                                       : 'var(--accent)';
                      return (
                        <h2 style={{
                          fontSize: '14px', fontWeight: 700, color: 'var(--text-main)',
                          marginTop: '28px', marginBottom: '10px',
                          paddingLeft: '12px', borderLeft: `3px solid ${borderColor}`,
                        }} {...props} />
                      );
                    },
                    p: ({ node, ...props }) => <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }} {...props} />,
                    li: ({ node, ...props }) => <li style={{ color: 'var(--text-muted)', marginBottom: '4px' }} {...props} />,
                    strong: ({ node, ...props }) => <strong style={{ color: 'var(--text-main)' }} {...props} />,
                    code: ({ node, inline, ...props }: any) => (
                      <code style={{
                        background: 'rgba(255,255,255,0.06)', padding: '2px 5px',
                        borderRadius: '4px', fontSize: '12px', color: 'var(--accent)',
                        fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
                      }} {...props} />
                    ),
                    hr: ({ node, ...props }) => (
                      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} {...props} />
                    ),
                  }}
                >
                  {report}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
