# QueryPlanner

**Summary**: A component that decomposes a complex query into a DAG of sub-questions with assigned agent types, dependencies, and verification criteria.
**Source Context**: gfNe1g-2603.11445v1.pdf (Section 3.2, Planning and Execution).

---

The `QueryPlanner` uses an LLM (Claude Sonnet 4.5) to analyze a complex query and produce a structured plan. Each sub-question includes:
- `id`: Unique identifier (e.g., `sq_001`)
- `question`: Specific, answerable text
- `agent_type`: From the [[concepts/agent-taxonomy.md]]
- `dependencies`: IDs of sub-questions that must complete first
- `priority`: 1–10 score
- `context_from_deps`: Whether to include dependency results in the prompt
- `verification_criteria`: Criteria for determining completeness

Planning rules (from appendix):
- **RAG First**: Always search internal knowledge base first or in parallel.
- **Maximize Parallelism**: Execute independent questions simultaneously.
- **Minimize Dependencies**: Only when results feed into other questions.
- **Be Specific**: Clear, answerable scope.

The output is a JSON array with `sub_questions` and an `explanation`.

The `QueryPlanner` is the first stage of the [[concepts/vmao.md]] loop.

## Related pages
- [[concepts/vmao.md]]
- [[concepts/dag-query-decomposition.md]]
- [[entities/dag-executor.md]]
- [[concepts/agent-taxonomy.md]]
- [[sources/gfNe1g-2603.11445v1.md]]