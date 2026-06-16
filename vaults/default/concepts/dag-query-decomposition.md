# DAG Query Decomposition

**Summary**: A method to break a complex query into a directed acyclic graph (DAG) of sub-questions, enabling dependency-aware parallel execution.
**Source Context**: gfNe1g-2603.11445v1.pdf (VMAO Framework Architecture).

---

The `QueryPlanner` ([[entities/query-planner.md]]) takes a complex query and produces a DAG where each node is a sub-question with fields: `id`, `question`, `agent type`, `dependencies`, `priority`, `context_from_deps`, and `verification_criteria`. The planner follows rules:
- **RAG First**: Always search internal knowledge base first or in parallel.
- **Maximize Parallelism**: Execute independent questions simultaneously.
- **Minimize Dependencies**: Only when results feed into other questions.
- **Be Specific**: Clear, answerable scope for each question.

The `DAGExecutor` ([[entities/dag-executor.md]]) then orchestrates execution by identifying "ready" questions (all dependencies completed) and running them in batches (default k=3). Figure 2a in the paper illustrates how independent sub-questions execute concurrently (Wave 1) and dependent ones in subsequent waves.

This decomposition is part of the [[concepts/vmao.md]] framework. It contrasts with single-agent approaches like [[Chain-of-Thought]] or [[Tree-of-Thoughts]] which do not distribute sub-tasks across specialized agents.

## Related pages
- [[concepts/vmao.md]]
- [[entities/query-planner.md]]
- [[entities/dag-executor.md]]
- [[concepts/agent-taxonomy.md]]
- [[concepts/verification-driven-replanning.md]]
- [[sources/gfNe1g-2603.11445v1.md]]