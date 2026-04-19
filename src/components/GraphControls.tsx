'use client';

import { useState } from 'react';

export interface GraphControlsProps {
  onSimulationQualityChange: (level: 'low' | 'medium' | 'high') => void;
  onAutoFitChange: (enabled: boolean) => void;
}

export default function GraphControls({ onSimulationQualityChange, onAutoFitChange }: GraphControlsProps) {
  const [simulationQuality, setSimulationQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [autoFit, setAutoFit] = useState(true);

  return (
    <div style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8 }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
          Simulation Quality
        </label>
        <select
          value={simulationQuality}
          onChange={(e) => {
            setSimulationQuality(e.target.value as 'low' | 'medium' | 'high');
            onSimulationQualityChange(e.target.value as 'low' | 'medium' | 'high');
          }}
          style={{ width: '100%', padding: '6px', fontSize: '12px', background: 'var(--bg-hover)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: 4 }}
        >
          <option value="low">Low (30fps)</option>
          <option value="medium">Medium (60fps)</option>
          <option value="high">High (30fps)</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
          Auto-Fit Nodes
        </label>
        <div style={{ display: 'flex', gap: 6 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', color: 'var(--text-main)' }}>
            <input
              type="checkbox"
              checked={autoFit}
              onChange={(e) => {
                setAutoFit(e.target.checked);
                onAutoFitChange(e.target.checked);
              }}
            />
            <span>Enable</span>
          </label>
          <button
            onClick={() => { setAutoFit(!autoFit); onAutoFitChange(!autoFit); }}
            style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--accent)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}
          >
            Toggle
          </button>
        </div>
      </div>
    </div>
  );
}
