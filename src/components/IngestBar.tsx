"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function IngestBar({ vaultId }: { vaultId: string }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [streamData, setStreamData] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleCompiler = async () => {
    if (!text && !file) return;
    setLoading(true);
    setStreamData('');
    
    try {
      const formData = new FormData();
      formData.append('vaultId', vaultId);
      if (file) formData.append('file', file);
      if (text) formData.append('text', text);

      const res = await fetch('/api/ingest', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Compiler Error: " + err.error);
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      
      let finalStr = '';
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        finalStr += chunk;
        setStreamData(finalStr);
      }
      
      setText('');
      setFile(null);
      // Wait a moment so user can see "finish", then reload to update graph
      setTimeout(() => {
         window.location.reload();
      }, 1500);

    } catch(e) {
      alert("Error compiling.");
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', backgroundColor: 'var(--bg-panel)', padding: '16px',
        borderRadius: '12px', border: dragOver ? '2px solid var(--accent)' : '1px solid var(--border)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10
      }}>
      
      {loading ? (
        <div style={{ padding: '12px', background: '#010409', border: '1px solid var(--border)', borderRadius: '6px', height: '150px', overflowY: 'auto' }}>
          <div style={{ color: 'var(--accent)', marginBottom: '8px', fontWeight: 'bold' }}>⚡ DeepSeek is compiling knowledge...</div>
          <pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap', margin: 0, color: 'var(--text-muted)' }}>
             {streamData}
          </pre>
        </div>
      ) : (
        <>
          {file && (
             <div style={{ fontSize: '0.85rem', color: 'var(--accent)', display: 'flex', justifyContent: 'space-between' }}>
               <span>📎 Attached: {file.name}</span>
               <button onClick={() => setFile(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', padding: 0 }}>Remove</button>
             </div>
          )}
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Paste raw text, URLs (http://...), or Drag & Drop a PDF here..." 
            style={{ width: '100%', height: '80px', resize: 'none' }}
          />
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DeepSeek Reasoner • URL & PDF Supported</span>
        <button onClick={handleCompiler} disabled={loading || (!text && !file)} data-primary="true">
          {loading ? 'Compiling Actions...' : 'Compile Knowledge'}
        </button>
      </div>
    </div>
  );
}
