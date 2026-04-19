# Agent Swarm

**Summary**: A multi-agent architectural strategy for scaling effective context length by enabling parallel execution of heterogeneous sub-tasks while preserving task-level coherence and modularity.
**Source Context**: 2602.02276v1.pdf

---

## Core Concept
Agent Swarm is presented as a proactive system for managing long-context agentic workloads (Source: 2602.02276v1.pdf). It scales effective context length along an additional architectural dimension by employing a swarm of concurrent, specialized sub-agents.

## Key Mechanisms
The system preserves **[[concepts/modularity.md]]** and **[[concepts/information-locality.md]]** by keeping subagent contexts tightly bounded. High-level coordination and essential intermediate results are selectively persisted at an orchestrator level, which maintains task-level coherence (Source: 2602.02276v1.pdf). This approach is described as an "active, structured context manager."

## Performance and Benefits
According to the source, Agent Swarm outperforms a baseline "Discard-all" context truncation strategy on the **[[entities/browsecomp-benchmark.md]]** benchmark in both efficiency and accuracy (Source: 2602.02276v1.pdf). It enables **[[concepts/parallel-execution.md]]** and reduces inference latency for complex agentic workloads while achieving higher accuracy with fewer critical steps than uniform context truncation (Source: 2602.02276v1.pdf).

## Related pages
- [[concepts/multi-agent-systems.md]]
- [[concepts/context-management.md]]
- [[entities/kimi-k2-5.md]]
- [[entities/browsecomp-benchmark.md]]