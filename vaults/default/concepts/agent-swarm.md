# Agent Swarm

**Summary**: A self-directed parallel agent orchestration framework introduced in Kimi K2.5 that dynamically decomposes complex tasks into heterogeneous sub-problems for concurrent execution by specialized frozen subagents, significantly reducing latency.
**Source Context**: 2602.02276v1.pdf

---

## Concept
[[concepts/agent-swarm.md]] is a framework designed to overcome the latency and scalability limits of sequential agent execution in [[concepts/agentic-intelligence.md]]. It transforms task complexity from linear to parallel processing by enabling a trainable orchestrator to dynamically create specialized frozen subagents and decompose tasks.

## Architecture and Learning
The framework is trained using [[concepts/parallel-agent-rl.md]]. It adopts a decoupled architecture:
*   **Trainable Orchestrator**: Makes high-level decisions on task decomposition, subagent instantiation, and parallel scheduling.
*   **Frozen Subagents**: Instantiated from fixed intermediate policy checkpoints; their outputs are treated as environmental observations. This avoids the challenges of credit assignment ambiguity and training instability inherent in end-to-end co-optimization.

## Performance
In wide-search scenarios, Agent Swarm reduces inference latency by up to 4.5x compared to single-agent baselines while improving item-level F1 from 72.8% to 79.0%. The framework explicitly optimizes for minimizing "critical steps" (analogous to the critical path in a computation graph), incentivizing effective parallelization that reduces end-to-end latency rather than merely maximizing concurrency.

## Related pages
- [[concepts/parallel-agent-rl.md]]
- [[concepts/agentic-intelligence.md]]
- [[entities/kimi-k2-5.md]]