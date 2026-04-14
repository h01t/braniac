"use client";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ vaultId })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReport(data.report);
    } catch(e: any) {
      setReport(`⚠️ Linter failed: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={runLint} 
        style={{ 
          marginTop: 'auto', 
          backgroundColor: 'transparent', 
          borderColor: 'var(--accent)', 
          color: 'var(--accent)',
          width: '100%'
        }}>
        ✨ Mint & Lint Vault
      </button>

      {open && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            width: '800px', height: '80%', backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border)', borderRadius: '12px',
            display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, color: 'var(--accent)' }}>Knowledge Linter Report</h3>
              <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', padding: 0 }}>✕</button>
            </div>
            
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                   <div>Scanning Knowledge Graph...</div>
                   <div style={{ fontSize: '0.8rem', marginTop: '8px' }}>DeepSeek Reasoning Engine is evaluating nodes...</div>
                </div>
              ) : (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 style={{borderBottom: '1px solid var(--border)', paddingBottom: '4px'}} {...props} />,
                    h2: ({node, ...props}) => <h2 style={{color: 'var(--accent)', marginTop: '24px'}} {...props} />,
                    code: ({node, inline, ...props}: any) => (
                      <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '4px' }} {...props} />
                    )
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
