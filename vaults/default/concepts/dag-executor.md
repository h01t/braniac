# DAG Executor

**Summary**: The component in the VMAO framework that orchestrates the execution of sub-questions in a dependency-aware manner, running ready questions in parallel.

## Function
Maintains a queue of sub-questions; when dependencies of a question are all satisfied, it becomes ready and is dispatched to an agent.

## Related Concepts
- [[concepts/dag-query-decomposition.md]]
- [[concepts/vmao.md]]