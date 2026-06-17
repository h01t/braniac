# Agent guidance (Braniac desktop)

Braniac is a **Tauri 2 + React + Rust** desktop knowledge IDE. The active application lives under `apps/desktop/` with core logic in `crates/braniac-core/`.

## Before changing code

1. Run Rust checks from the repo root: `cargo test --workspace`, `cargo clippy --workspace --all-targets -- -D warnings`
2. Run frontend checks: `npm ci`, `npm run desktop:check`, `npm run desktop:test`
3. Tauri commands are defined in `apps/desktop/src-tauri/src/commands.rs` and call into `braniac-core`
4. Vault content under `vaults/` is user data — avoid unrelated churn in audit/fix PRs

## Architecture snapshot

- **UI:** React 19 + Vite (`apps/desktop/src/`)
- **Shell:** Tauri 2 (`apps/desktop/src-tauri/`)
- **Core:** Rust workspace (`crates/braniac-core`, `crates/braniac-types`)
- **Storage:** Git-backed markdown vaults, SQLite metadata, `qmd` semantic index
- **Jobs:** Ingest and lint orchestration in `crates/braniac-core/src/jobs.rs`

## Historical note

The project migrated from a Next.js web app. See [docs/migration-from-nextjs.md](docs/migration-from-nextjs.md) for the old architecture — do not follow Next.js API-route paths in active development.
