# Migration from Next.js Web Prototype to Braniac Desktop

The previous Next.js App Router prototype has been replaced by a Tauri 2 desktop application.

## What moved

| Old (Next.js) | New (Desktop) |
|---|---|
| `src/app/api/*` routes | Tauri commands in `apps/desktop/src-tauri/src/commands.rs` |
| `src/lib/vaultManager.ts` | `crates/braniac-core/src/vault.rs` |
| `src/lib/qmd.ts` | `crates/braniac-core/src/index.rs` (Tantivy + hybrid embeddings) |
| Graph API + `react-force-graph-2d` | Rust layout + canvas graph in `apps/desktop/src/components/GraphCanvas.tsx` |
| `settings.json` at repo root | Per-user app data dir via `settings_get` / `settings_update` |

## Vault content

Existing markdown vaults under `vaults/` are unchanged. Import them into the desktop app data directory:

1. Open **Settings** in the desktop app.
2. Set **Vaults root** to an absolute path, or use the default app data vault directory.
3. Run migration from the repo root vaults folder (dev):

```bash
# from desktop devtools or a future UI action
# Tauri command: vault_migrate { sourceRoot: "/absolute/path/to/ai-knowledge-compiler/vaults" }
```

## Historical references

- Screenshots in `img/` are from the web prototype.
- `docs/Architecture_and_Workflow.md` describes the original architecture; see `README.md` for the desktop stack.
