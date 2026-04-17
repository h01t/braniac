# AI Knowledge Compiler

An intelligent, local-first platform for converting unstructured data into a structured markdown-based knowledge vault with interactive graph visualization and hybrid semantic search.

## 🚀 Overview

The **AI Knowledge Compiler** automates the transition from raw information (URLs, PDFs, documents) to an interconnected Wiki. It uses advanced LLM reasoning to extract concepts, maintain structural health, and provide a high-fidelity search experience.

### Key Features

- **🧠 Intelligent Ingestion**: Automatically extract and categorize knowledge from web pages and PDF files.
- **🏗️ Structured Vaults**: Organizes knowledge into `concepts/`, `entities/`, and `sources/` within localized, Git-backed vaults.
- **📈 Graph Visualization**: Interactive 2D force-directed graph to explore relationships and navigate between knowledge nodes.
- **🔍 Hybrid Semantic Search**: Powered by `qmd`, providing lightning-fast BM25, vector, and LLM-reranked search results.
- **🛠️ Mint & Lint Workflow**: Automated structural analysis to identify orphans, contradictions, and formatting issues with one-click fix proposals.
- **📜 Git-Backed**: Every change is version-controlled, providing a full history and audit trail for your knowledge base.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI Components**: React 19, Lucide Icons, Simple CSS
- **Visualization**: [react-force-graph-2d](https://github.com/vasturiano/react-force-graph)
- **Search Engine**: [qmd](https://github.com/tobilu/qmd) (Local-first Hybrid Search)
- **AI Intelligence**: [AI SDK](https://sdk.vercel.ai/) (OpenAI, DeepSeek)
- **Markdown Processing**: [remark-gfm](https://github.com/remarkjs/remark-gfm), [react-markdown](https://github.com/remarkjs/react-markdown)

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
   OPENAI_API_KEY=your_key_here
   DEEPSEEK_API_KEY=your_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `src/app`: Next.js application routes and API endpoints.
- `src/components`: UI components including the Graph and Ingestion bar.
- `src/lib`: Core logic for vault management, ingestion, and search.
- `vaults/`: Root directory for all knowledge vaults (auto-initialized on first run).
- `public/`: Static assets and icons.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

---

*Built with ❤️ for knowledge explorers.*
