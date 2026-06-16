import { useEffect, useRef, useState } from "react";

interface VaultOverflowMenuProps {
  hasVaults: boolean;
  onOpenFolder: () => void;
  onImport: () => void;
  onNewVault: () => void;
  onNewSource: () => void;
}

export function VaultOverflowMenu({
  hasVaults,
  onOpenFolder,
  onImport,
  onNewVault,
  onNewSource,
}: VaultOverflowMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <div className="vault-overflow" ref={rootRef}>
      <button
        type="button"
        className="vault-overflow-trigger"
        aria-label="Vault actions"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        ⋯
      </button>
      {open && (
        <div className="vault-overflow-menu" role="menu">
          <button type="button" role="menuitem" onClick={() => run(onOpenFolder)}>
            Open folder…
          </button>
          <button type="button" role="menuitem" onClick={() => run(onImport)}>
            Import
          </button>
          <button type="button" role="menuitem" onClick={() => run(onNewVault)}>
            New vault
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={!hasVaults}
            onClick={() => run(onNewSource)}
          >
            New source
          </button>
        </div>
      )}
    </div>
  );
}
