# Agent Swarm

**Summary**: Agent Swarm is a multi-agent framework that dynamically orchestrates multiple specialized sub-agents to work in parallel on complex tasks, improving performance and reducing execution time through proactive context management.
**Source Context**: 2602.02276v1.pdf (Kimi K2.5 Technical Report).

---

## Framework Overview
Agent Swarm is a core capability of [[entities/kimi-k2-5.md]] designed for complex, long-horizon agentic tasks. Instead of a single agent performing all steps sequentially, an **Orchestrator** (powered by [[concepts/parl.md]]) dynamically instantiates and schedules multiple heterogeneous sub-agents to work on decomposed subtasks in parallel.

## Key Mechanisms
*   **Dynamic Subagent Creation**: The Orchestrator learns to create specialized sub-agents on-the-fly based on the task's requirements, leading to a heterogeneous swarm tailored for each query.
*   **Proactive Context Management**: Unlike reactive methods that truncate context when it overflows, Agent Swarm uses "context sharding." Each sub-agent operates with a bounded, independent local context. Only task-relevant outputs (not full interaction traces) are selectively routed back to the Orchestrator, preventing context pollution and enabling effective scaling.

## Performance Benefits
When deployed on [[entities/kimi-k2-5.md]], Agent Swarm provides significant improvements:
*   **Higher Accuracy**: On the BrowseComp benchmark, it increased the score from 60.6% (single agent) to 78.4%.
*   **Faster Execution**: On WideSearch, it reduced wall-clock time by 3x to 4.5x compared to a single agent, as parallel execution prevents linear time growth with task difficulty.
*   **Superior to Context Truncation**: It outperforms techniques like "Discard-all" context management by preserving structural information and reasoning integrity.

## Evaluation
The framework is rigorously tested on benchmarks like BrowseComp, WideSearch, and an in-house Swarm Bench, where it consistently surpasses single-agent configurations and proprietary model baselines.

## Related pages
- [[entities/kimi-k2-5.md]]
- [[concepts/parl.md]]