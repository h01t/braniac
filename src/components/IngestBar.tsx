'use client';
import React, { useState, useRef, useEffect } from 'react';

const LightningIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const PaperclipIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const Spinner = () => (
  <div style={{
    width: '14px', height: '14px',
    border: '2px solid rgba(0,0,0,0.2)',
    borderTopColor: 'rgba(0,0,0,0.8)',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
    flexShrink: 0,
  }} />
);

export default function IngestBar() {
  const vaultId = useVaultId();
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [streamData, setStreamData] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const streamRef = useRef<HTMLPreElement>(null);

  // Auto-scroll stream log to bottom
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [streamData]);

  const handleCompile = async () => {
    if (!text && !file) return;
    setLoading(true);
    setStreamData('');

    try {
      const formData = new FormData();
      formData.append('vaultId', vaultId);
      if (file) formData.append('file', file);
      if (text) formData.append('text', text);

      const res = await fetch('/api/ingest', { method: 'POST', body: formData });

      if (!res.ok) {
        const err = await res.json();
        alert('Compiler Error: ' + err.error);
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let finalStr = '';
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        finalStr += decoder.decode(value, { stream: true });
        setStreamData(finalStr);
      }

      setText('');
      setFile(null);
      setLoading(false); // Stream completed — clear compiling state
      // Signal graph + file tree to refresh live — no full page reload
      setTimeout(() => window.dispatchEvent(new CustomEvent('vault-updated')), 1500);
    } catch {
      alert('Error compiling.');
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const canSubmit = !loading && (!!text || !!file);

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        position: 'absolute', bottom: '24px',
        left: '50%', transform: 'translateX(-50%)',
        width: 'min(700px, calc(100vw - 40px))',
        backgroundColor: 'var(--bg-panel)',
        padding: '14px',
        borderRadius: 'var(--radius-lg)',
        border: dragOver
          ? '1.5px solid var(--accent)'
          : '1px solid var(--border)',
        boxShadow: dragOver
          ? '0 0 0 4px var(--accent-glow), 0 16px 40px rgba(0,0,0,0.6)'
          : '0 8px 32px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: '10px',
        zIndex: 10,
        transition: 'border 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Drag overlay */}
      {dragOver && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 'var(--radius-lg)',
          background: 'var(--accent-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 5, pointerEvents: 'none',
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '15px', letterSpacing: '0.5px' }}>
            Drop to ingest
          </span>
        </div>
      )}

      {/* Streaming log */}
      {loading ? (
        <div style={{
          background: '#010409',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 12px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-surface)',
          }}>
            <Spinner />
            <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '12.5px' }}>
              DeepSeek is compiling knowledge...
            </span>
          </div>
          <pre
            ref={streamRef}
            style={{
              fontSize: '11.5px', whiteSpace: 'pre-wrap', margin: 0,
              color: 'var(--text-muted)', lineHeight: 1.55,
              padding: '10px 12px',
              maxHeight: '140px', overflowY: 'auto',
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
            }}
          >
            {streamData}
            <span style={{ animation: 'blink-cursor 1s step-end infinite', color: 'var(--accent)' }}>█</span>
          </pre>
        </div>
      ) : (
        <>
          {/* File chip */}
          {file && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
              borderRadius: '99px', padding: '3px 10px 3px 8px',
              color: 'var(--accent)', fontSize: '12px', alignSelf: 'flex-start',
            }}>
              <PaperclipIcon />
              <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file.name}
              </span>
              <button
                data-ghost="true"
                onClick={() => setFile(null)}
                style={{ padding: '0 0 0 2px', minWidth: 0, height: 'auto', color: 'var(--accent)', fontSize: '12px', border: 'none', background: 'transparent' }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste raw text, URLs (http://...), or Drag & Drop a PDF here..."
            style={{ width: '100%', height: '76px', resize: 'none', fontSize: '13px' }}
          />
        </>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: '11px', color: 'var(--text-dim)',
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          background: 'var(--bg-surface)', padding: '2px 8px',
          borderRadius: '99px', border: '1px solid var(--border)',
        }}>
          DeepSeek Reasoner · URL & PDF
        </span>

        <button
          onClick={handleCompile}
          disabled={!canSubmit}
          data-primary="true"
          style={{ padding: '7px 16px' }}
        >
          {loading ? <><Spinner /> Compiling...</> : <><LightningIcon /> Compile Knowledge</>}
        </button>
      </div>
    </div>
  );
}
