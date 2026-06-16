# DAGExecutor

**Summary**: Orchestrates parallel execution of sub-questions respecting dependencies, with automatic context propagation and safety mechanisms.
**Source Context**: gfNe1g-2603.11445v1.pdf (Algorithm 1, Section 3.2).

---

The `DAGExecutor` implements Algorithm 1 from the paper. It iterates over a DAG produced by the [[entities/query-planner.md]]:

1. Identify all sub-questions whose dependencies have completed (ready set).
2. Select top-k (default k=3) by priority.
3. Execute them in parallel via specialized agents.
4. If a sub-question has `context_from_deps` enabled, enrich its result with dependency outputs.
5. Store results and mark sub-question as completed.

Safety mechanisms include:
- Configurable timeout (default 600s) per agent execution.
- Tool call limiter: max 10 consecutive same-tool calls, 50 total per agent.
- Phase-level token tracking for budget enforcement.

When a primary model (Claude Sonnet 4.5) is unavailable, the system falls back to Claude Haiku 4.5 with graceful degradation.

The executor is part of the [[concepts/vmao.md]] framework and feeds into the [[entities/result-verifier.md]].

## Related pages
- [[concepts/vmao.md]]
- [[concepts/dag-query-decomposition.md]]
- [[entities/query-planner.md]]
- [[entities/result-verifier.md]]
- [[sources/gfNe1g-2603.11445v1.md]]