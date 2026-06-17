# Agent Taxonomy (Tiers and Tools)

**Summary**: Agents in VMAO are organized into three functional tiers — Data Gathering, Analysis, and Output — each with assigned tools accessed via MCP servers.
**Source Context**: gfNe1g-2603.11445v1.pdf (Table 3).

---

The taxonomy defines a hierarchy reflecting the natural information flow in research tasks:

| Tier | Agents | Key Capabilities | Tools (example count) |
|------|--------|------------------|-----------------------|
| 1: Data Gathering | RAG, Web Search, Financial, Competitor | Semantic/keyword retrieval, web search, financial data, competitor benchmarks | 13 + 4 + 7 + 11 = 35 |
| 2: Analysis | Analysis, Reasoning, Raw Data | Survey analytics, cross-domain reasoning, Python execution (pandas, matplotlib) | 20 + 24 + 1 = 45 |
| 3: Output | Document, Visualization | Report generation, tables, source citations, chart generation | 4 + 6 = 10 |

A total of 42 unique tools across eight MCP (Model Context Protocol) servers. Each server runs independently, enabling horizontal scaling and fault isolation. Agents automatically select appropriate tools based on sub-question requirements.

This taxonomy is used by the [[entities/query-planner.md]] to assign sub-questions to the correct agent type, and it supports the [[concepts/vmao.md]] framework's DAG execution.

## Related pages
- [[concepts/vmao.md]]
- [[concepts/dag-query-decomposition.md]]
- [[entities/query-planner.md]]
- [[entities/mcp-servers.md]] (if needed)
- [[sources/gfNe1g-2603.11445v1.md]]