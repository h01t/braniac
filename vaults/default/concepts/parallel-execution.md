# Parallel Execution

**Summary**: The concurrent processing of multiple sub-tasks or agent operations to reduce overall inference latency and improve system throughput.
**Source Context**: 2602.02276v1.pdf

---

## Role in Agent Systems
**[[concepts/parallel-execution.md]]** is a key capability enabled by the **[[concepts/agent-swarm.md]]** architecture described for **[[entities/kimi-k2-5.md]]** (Source: 2602.02276v1.pdf). It allows heterogeneous sub-tasks within an agentic workload to be executed concurrently.

## Mechanism and Benefit
By keeping subagent contexts tightly bounded and managing coordination at a higher orchestrator level, the swarm architecture facilitates parallel execution (Source: 2602.02276v1.pdf). The reported benefit is a reduction in inference latency while improving performance on complex agentic workloads (Source: 2602.02276v1.pdf).

## Related pages
- [[concepts/agent-swarm.md]]
- [[concepts/inference-latency.md]]