# AI Knowledge Compiler

An intelligent, local-first platform designed to convert unstructured data—ranging from web pages to PDFs—into a structured, markdown-based knowledge vault. The system features interactive graph visualization and advanced hybrid semantic search. 

![Landing Page Header](./img/landing_page.png)

## 🎓 Overview

The **AI Knowledge Compiler** automates the transition from raw information to an interconnected knowledge graph. By leveraging large language model reasoning, it extracts atomic concepts, maintains structural health through automated constraint checks, and offers a highly fidelity search experience over localized data.

This project demonstrates production-grade integration of automated ingestion, semantic graph structuring, and interactive visualization as part of an academic portfolio.

**Author:** Ognjen Jovanovic  
**Documentation:** [Architecture & Workflow](./docs/Architecture_and_Workflow.md)

---

## ✨ Key Features

### 🧠 Intelligent Ingestion
Automatically extract and categorize knowledge from robust web pages and PDF files using the `grapper` engine. Implements a section-aware chunking strategy that respects markdown heading boundaries while maintaining contextual overlap.

### 🏗️ Structured Vaults
Assets are categorized systematically into `concepts/`, `entities/`, and `sources/` within localized, Git-backed vaults. The application supports multi-vault operations, allowing for isolated knowledge corpora management.

### 📈 Graph Visualization
Provides an interactive 2D force-directed layout for knowledge navigation. Nodes serve as dynamic entry points, grouped by classification (concepts, entities, sources) for intuitive semantic exploration.

![Knowledge Node Exploration](./img/node-overview.png)

### 🔍 Hybrid Semantic Search
Integrates `qmd` as a high-performance vector and BM25 local search engine. The query pipeline is fortified with retry-logic and contextually balanced JSON abstraction.

### 🛠️ "Mint & Lint" Mechanism
An automated structural governance workflow. The system systematically analyzes local data boundaries to detect orphan concepts, contradictions, and syntax errors, proposing high-confidence diffs for user review before committing changes via async mutex-backed Git automation.

![Mint & Lint System](./img/lint_and_mint.png)

### 📜 Version Control Integration
Every state transition within the graph is transparent and fully version-controlled, providing an audit trail via the EvalOps interface for historic diff verification.

---

## 🛠️ Architecture Summary

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 15+](https://nextjs.org/) (App Router, v16.2.3) |
| **Client UI** | [React 19](https://react.dev/), [react-force-graph-2d](https://github.com/vasturiano/react-force-graph-2d) |
| **Search Engine** | [qmd](https://github.com/tobilu/qmd) (Local-first Hybrid Search) |
| **AI Intelligence** | Vercel AI SDK, [DeepSeek Reasoner / Chat](https://github.com/deepseek-ai) |
| **Data Ingestion** | `grapper` CLI integration, `remark-gfm`, `react-markdown` |
| **Governance** | `simple-git`, `zod` |

*For a detailed look at the pipeline between components like `qmd` and `grapper`, please see the [Architecture Documentation](./docs/Architecture_and_Workflow.md).*

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- [qmd CLI](https://github.com/tobilu/qmd) (`npm install -g @tobilu/qmd`)
- A locally available `grapper` binary

### Installation

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd ai-knowledge-compiler
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment (`.env.local`):**
   ```env
   OPENAI_API_KEY=your_openai_key_here
   DEEPSEEK_API_KEY=your_deepseek_key_here
   GRAPPER_PATH=/path/to/grapper/binary
   ```
   *(Note: `GRAPPER_PATH` overrides the default binary location if needed)*

4. **Run the Application:**
   ```bash
   npm run dev
   ```
   Access the client application at [http://localhost:3000](http://localhost:3000).

---

## 🤝 Contributing

Contributions are welcome. Given the academic nature of this repository baseline, specific feature expansions may be reviewed with a focus on graph integrity and semantic search fidelity.

---
*Built for the exploration and preservation of structured knowledge by Ognjen Jovanovic.*