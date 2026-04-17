'use client';

import { useEffect, useState } from 'react';

interface ModelOption {
  id: string;
  name: string;
}

interface Settings {
  ingestProvider: 'deepseek' | 'openai';
  ingestModel: string;
  lintProvider: 'deepseek' | 'openai';
  lintModel: string;
}

type ProviderKey = 'deepseek' | 'openai';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [availableModels, setAvailableModels] = useState<Record<ProviderKey, ModelOption[]>>({ deepseek: [], openai: [] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data.settings);
        setAvailableModels(data.availableModels);
      });
  }, []);

  if (!settings) return <div style={{ padding: 32, color: 'var(--text-muted)' }}>Loading settings...</div>;

  const updateField = (field: keyof Settings, value: string) => {
    setSaved(false);
    const next = { ...settings, [field]: value };
    if (field === 'ingestProvider') {
      const models = availableModels[value as ProviderKey];
      if (models.length > 0) next.ingestModel = models[0].id;
    }
    if (field === 'lintProvider') {
      const models = availableModels[value as ProviderKey];
      if (models.length > 0) next.lintModel = models[0].id;
    }
    setSettings(next);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>Settings</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>Configure AI model routing for ingestion and linting tasks.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ModelSection
          title="Ingestion Model"
          description="Used for knowledge extraction from URLs, PDFs, and text. Requires strong reasoning."
          provider={settings.ingestProvider}
          model={settings.ingestModel}
          models={availableModels[settings.ingestProvider]}
          onProviderChange={v => updateField('ingestProvider', v)}
          onModelChange={v => updateField('ingestModel', v)}
        />

        <ModelSection
          title="Linting Model"
          description="Used for vault health analysis and fix proposals. Faster and cheaper is better."
          provider={settings.lintProvider}
          model={settings.lintModel}
          models={availableModels[settings.lintProvider]}
          onProviderChange={v => updateField('lintProvider', v)}
          onModelChange={v => updateField('lintModel', v)}
        />
      </div>

      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {saved && <span style={{ fontSize: 13, color: 'var(--accent)' }}>Settings saved</span>}
      </div>
    </div>
  );
}

function ModelSection({
  title, description, provider, model, models,
  onProviderChange, onModelChange,
}: {
  title: string;
  description: string;
  provider: string;
  model: string;
  models: ModelOption[];
  onProviderChange: (v: string) => void;
  onModelChange: (v: string) => void;
}) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
      <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)', marginBottom: 4 }}>{title}</h2>
      <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>{description}</p>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Provider</label>
          <select
            value={provider}
            onChange={e => onProviderChange(e.target.value)}
            style={{
              width: '100%', padding: '8px 10px', fontSize: 13,
              background: 'var(--bg-hover)', color: 'var(--text-main)',
              border: '1px solid var(--border)', borderRadius: 4,
              outline: 'none',
            }}
          >
            <option value="deepseek">DeepSeek</option>
            <option value="openai">OpenAI</option>
          </select>
        </div>

        <div style={{ flex: 1.5 }}>
          <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Model</label>
          <select
            value={model}
            onChange={e => onModelChange(e.target.value)}
            style={{
              width: '100%', padding: '8px 10px', fontSize: 13,
              background: 'var(--bg-hover)', color: 'var(--text-main)',
              border: '1px solid var(--border)', borderRadius: 4,
              outline: 'none',
            }}
          >
            {models.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
