# Braniac: AI Knowledge Compiler

Braniac is a local-first research prototype that converts raw sources into a Git-backed markdown knowledge graph. It combines model-assisted ingestion, semantic search, graph exploration, and a human-reviewed "Mint & Lint" workflow for keeping the vault coherent over time.

![Braniac landing view](./img/landing_page.png)

## Academic Project Note

This repository is being prepared as part of a master's application portfolio. It is intended to demonstrate system design, implementation quality, documentation discipline, and honest technical framing. The project is demo-ready, but it is not presented as a production-ready knowledge platform.

The standalone note is available in [ACADEMIC_PROJECT_NOTE.md](./ACADEMIC_PROJECT_NOTE.md), and the committee-facing overview is in [docs/project-overview.md](./docs/project-overview.md).

## What The Project Does

- Ingests raw text, URLs, and PDFs into structured markdown pages.
- Organizes extracted knowledge into Git-backed vaults with categories like `concepts/`, `entities/`, `sources/`, and `events/`.
- Builds a graph view from wiki-style `[[links]]` so relationships remain explorable.
- Uses `qmd` for local semantic retrieval across the vault.
- Surfaces lint proposals for missing structure, weak pages, and graph-health issues before changes are applied.
- Exposes an EvalOps-style commit and diff view for reviewing vault history.

![Knowledge graph detail view](./img/node-overview.png)

## Architecture Snapshot

| Layer | Role | Main Tools |
|---|---|---|
| UI | Graph exploration, ingest, settings, history review | Next.js App Router, React 19 |
| Ingestion | Extraction, chunking, model-driven page generation | `grapper`, Vercel AI SDK |
| Storage | Markdown vaults with version history | file system, `simple-git` |
| Retrieval | Local semantic lookup and snippet search | `qmd` |
| Governance | Human-reviewed structural cleanup | custom lint/apply routes |

Additional technical details live in [docs/Architecture_and_Workflow.md](./docs/Architecture_and_Workflow.md).

## Demo Surfaces

- Main graph workspace for node navigation and markdown inspection
- Ingest panel for URLs, text, and PDFs
- EvalOps page for commit history and diffs
- Settings page for switching ingest and lint providers/models
- Sidebar tools for vault switching, search, file browsing, and lint review

![Mint and Lint workflow](./img/lint_and_mint.png)

## Getting Started

### Prerequisites

- Node.js `>=20.9.0`
- A local `grapper` binary available on `PATH` or configured through `GRAPPER_PATH`
- A DeepSeek API key for the default configuration
- An OpenAI API key only if you want to switch models in the Settings page

### Installation

```bash
git clone https://github.com/h01t/braniac.git
cd braniac
npm install
cp .env.example .env.local
```

Configure `.env.local` as needed:

```env
DEEPSEEK_API_KEY=your_deepseek_key_here
# OPENAI_API_KEY=your_openai_key_here
# GRAPPER_PATH=/usr/local/bin/grapper
# QMD_BIN=/usr/local/bin/qmd
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Verification

```bash
npm run lint
npm run build
```

## Repository Layout

```text
src/app/                    Next.js App Router pages and API routes
src/components/             Client UI for graph, ingest, linting, search, and shell
src/lib/                    Vault, extraction, parser, qmd, and utility logic
docs/                       Architecture notes and submission-ready project overview
img/                        Screenshots used in the docs
vaults/                     Example Git-backed knowledge vaults
```

## Notes On Scope

- The project is optimized for single-user, local-first experimentation.
- Generated knowledge should still be reviewed; the lint flow is intentionally human-in-the-loop.
- Example vault content is included for demonstration and may reference third-party material that remains subject to its original terms.
- The repository prioritizes clarity and reproducibility over packaging this as a publishable npm library.

## License

The source code and original documentation in this repository are released under the [MIT License](./LICENSE).
