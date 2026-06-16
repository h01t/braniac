interface EmptyVaultPanelProps {
  vaultsRoot: string;
  onCreateVault: () => void;
  onImportVaults: () => void;
  onChooseVaultsFolder: () => void;
  onOpenSettings: () => void;
}

export function EmptyVaultPanel({
  vaultsRoot,
  onCreateVault,
  onImportVaults,
  onChooseVaultsFolder,
  onOpenSettings,
}: EmptyVaultPanelProps) {
  return (
    <div className="empty-vault-panel">
      <h2>No vaults yet</h2>
      <p>
        Braniac stores knowledge as Markdown vaults. Choose a folder that already contains vaults
        (like this repo&apos;s <code>vaults/</code> directory), import copies, or create a new
        vault to get started.
      </p>
      <p className="empty-vault-root">
        Current vaults root: <code>{vaultsRoot || "(unknown)"}</code>
      </p>
      <div className="empty-vault-actions">
        <button type="button" onClick={onChooseVaultsFolder}>
          Open vaults folder…
        </button>
        <button type="button" onClick={onImportVaults}>
          Import vaults into app storage
        </button>
        <button type="button" onClick={onCreateVault}>
          Create new vault
        </button>
        <button type="button" className="secondary" onClick={onOpenSettings}>
          Settings
        </button>
      </div>
    </div>
  );
}
