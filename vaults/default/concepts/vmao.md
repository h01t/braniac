# VMAO (Verification-driven Multi-Agent Orchestration)

**Summary**: A framework for orchestrating multiple specialized AI agents to solve complex queries through DAG-based decomposition, parallel execution, and verification-driven replanning.
**Source Context**: gfNe1g-2603.11445v1.pdf

---

## Architecture
VMAO uses a [[concepts/query-planner.md]] to break queries into a DAG, a [[concepts/dag-executor.md]] to manage execution, and [[concepts/agent-taxonomy.md]] to assign specialized agents. Results are verified and replanned if needed via [[concepts/verification-driven-replanning.md]].

## Related pages
- [[concepts/dag-query-decomposition.md]]
- [[concepts/agent-taxonomy.md]]
- [[concepts/dag-executor.md]]
- [[concepts/query-planner.md]]