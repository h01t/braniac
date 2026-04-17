# AI Knowledge Compiler v2.0

An intelligent, local-first platform for converting unstructured data into a structured markdown-based knowledge vault with interactive graph visualization and hybrid semantic search.

## 🚀 Overview

The **AI Knowledge Compiler** automates the transition from raw information (URLs, PDFs, documents) to an interconnected Wiki. It uses advanced LLM reasoning to extract concepts, maintain structural health, and provide a high-fidelity search experience.

## ✨ Key Features

### 🧠 Intelligent Ingestion
Automatically extract and categorize knowledge from web pages and PDF files. Uses a section-aware chunking strategy that respects markdown heading boundaries with context overlap.

### 🏗️ Structured Vaults
Organizes knowledge into `concepts/`, `entities/`, and `sources/` within localized, Git-backed vaults. Supports multi-vault management with runtime switching.

### 📈 Graph Visualization
Interactive 2D force-directed graph to explore relationships and navigate between knowledge nodes. Color-coded by category (concepts, entities, sources) with smooth force-directed layout.

### 🔍 Hybrid Semantic Search
Powered by `qmd`, providing lightning-fast BM25, vector, and LLM-reranked search results. Includes depth-balanced JSON parsing and retry logic.

### 🛠️ Mint & Lint Workflow
Automated structural analysis to identify orphans, contradictions, and formatting issues with one-click fix proposals. Includes incremental checkpoint caching for efficient re-linting.

### 📜 Git-Backed Version Control
Every change is version-controlled, providing a full history and audit trail for your knowledge base. Includes EvalOps page for browsing commit history and diffs.

## 🛠️ Tech Stack

| Framework | [Next.js 15+](https://nextjs.org/) (App Router, v16.2.3) |
| UI Components | [React 19](https://react.dev/) |
| Visualization | [react-force-graph-2d](https://github.com/vasturiano/react-force-graph-2d) |
| Search Engine | [qmd](https://github.com/tobilu/qmd) (Local-first Hybrid Search) |
| AI Intelligence | [AI SDK](https://sdk.vercel.ai/) (Vercel AI SDK) |
| Models | [DeepSeek Reasoner](https://github.com/deepseek-ai), [DeepSeek Chat](https://github.com/deepseek-ai) |
| Markdown | [remark-gfm](https://github.com/remarkjs/remark-gfm), [react-markdown](https://github.com/remarkjs/react-markdown) |
| Git Operations | [simple-git](https://github.com/steveukueen/simple-git) |
| Validation | [Zod](https://zod.dev/) |

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn
- [qmd CLI](https://github.com/tobilu/qmd) installed globally (`npm install -g @tobilu/qmd`)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ai-knowledge-compiler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_key_here
   DEEPSEEK_API_KEY=your_deepseek_key_here
   GRAPPER_PATH=/path/to/grapper/binary
   ```
   - **Note:** `GRAPPER_PATH` is only needed if your grapper binary is not in the default location

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/
│   ├── api/                      # Next.js API routes
│   │   ├── ingest/route.ts        # Knowledge ingestion (streaming AI, section-aware chunking, rollback)
│   │   ├── lint/route.ts          # Vault linting (deepseek-chat, structured output, incremental caching)
│   │   ├── lint/apply/route.ts     # Apply lint proposals
│   │   ├── search/route.ts       # qmd semantic search with timeout & retry
│   │   ├── settings/route.ts      # Model routing & vault management API
│   │   └── vaults/
│   │       ├── route.ts           # Vault CRUD (list, create, init)
│   │       └── [vaultId]/
│   │           ├── content/route.ts # Read/write markdown files
│   │           ├── diff/route.ts    # Git diff viewing
│   │           ├── files/route.ts   # File listing
│   │           ├── graph/route.ts    # Graph data generation
│   │           └── history/route.ts # Git commit history
│   ├── evalops/                 # EvalOps page (commit history & diffs)
│   ├── settings/               # Settings page (model routing UI)
│   └── page.tsx              # Home page (GraphView + IngestBar)
├── components/
│   ├── FileTree.tsx              # Collapsible sidebar file tree
│   ├── GraphView.tsx             # Interactive force-directed graph
│   ├── IngestBar.tsx             # Floating ingestion input with streaming output
│   ├── Linter.tsx               # Mint & Lint workflow UI
│   └── SearchBar.tsx           # Semantic search with results dropdown
└── lib/
    ├── models.ts                 # AI model provider abstraction (runtime switching)
    ├── extractor.ts              # URL/PDF text extraction via grapper
    ├── vaultManager.ts           # Vault filesystem & git operations with async mutex
    ├── chunker.ts               # Section-aware text chunking
    ├── parser.ts                # Robust AI output parser with 3 fallback strategies
    ├── config.ts                 # Settings persistence with API
    ├── lock.ts                   # Async mutex for vault operations
    └── useVaultId.ts            # Shared vault state hook (localStorage + events)
└── public/                       # Static assets (icons, fonts)
└── .env.example               # Environment variable templates
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

### v2.0 Enhancements (Current Branch)

#### Core Reliability ✨
- **Configurable Grapper**: Binary path now configurable via `GRAPPER_PATH` environment variable
- **Model Routing**: Runtime model switching via settings UI. Supports DeepSeek Reasoner for ingestion and DeepSeek Chat for linting
- **Section-Aware Chunking**: Splits text at markdown heading boundaries with configurable overlap
- **Robust AI Output Parser**: 3 fallback strategies for handling malformed LLM XML output
- **Error Recovery**: Ingestion captures pre-ingest commit hash and rolls back on failure
- **Async Mutex**: Prevents concurrent vault operations from corrupting git state
- **qmd Integration Hardening**: Timeout, retry, and depth-balanced JSON parsing for search

#### Model Routing & Settings 🎛
- **Runtime Model Switching**: Change models without server restart via settings UI
- **Settings Module**: JSON-based persistence, with `GET/POST /api/settings` endpoint
- **Settings UI**: Dedicated settings page at `/settings` with provider and model dropdowns
- **Multi-Vault Support**: Vault selector in sidebar, inline vault creation dialog
- **Shared Vault State**: `useVaultId` hook provides current vault ID to all components via localStorage + custom events

## 📊 Usage

### Creating a New Vault

1. Enter a vault name in the Settings sidebar
2. Click the "+" button
3. The system creates `vaults/<vault-name>/` with git initialization
4. Select the new vault from the dropdown to switch

### Switching Between Vaults

Use the vault selector in the sidebar to switch between existing vaults. All components (graph, file tree, ingestion, linting) automatically use the selected vault.

### Ingesting Knowledge

1. Paste a URL, upload a PDF, or enter raw text into the Ingest Bar
2. The system extracts content, chunks it intelligently, and streams the AI compilation process in real-time
3. Multi-chunk sources are processed with a consolidation pass

### Linting & Fixing

1. Click the "✨ Mint & Lint Vault" button in the sidebar
2. The system analyzes all markdown files for:
   - Contradictions between pages
   - Orphan pages (no inbound links)
   - Missing pages (mentioned but not created)
   - Formatting issues
   - Stub pages (near-empty with no value)
3. Review proposals in the modal
4. Approve individual fixes or apply all at once
5. Changes are auto-committed with descriptive messages

### Semantic Search

1. Use the search bar in the sidebar
2. Results are ranked by relevance (BM25 + vector scores)
3. Click a result to open the corresponding markdown file in the graph

### Version History

1. Visit `/evalops` to browse full git commit history
2. Click any commit to view the diff
3. All changes are tracked with automatic commits

---

*Built with ❤️ for knowledge explorers.*