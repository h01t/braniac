# Parallel-Agent Capability Induction

**Summary**: A methodology to train an AI model's orchestrator to decompose and schedule tasks across multiple parallel agents by using a suite of synthetic prompts that stress the limits of sequential execution.
**Source Context**: 2602.02276v1.pdf

---

## Concept
Parallel-Agent Capability Induction is a training methodology designed to incentivize an AI model's central orchestrator to leverage parallelization. Instead of explicitly instructing the model to use multiple agents, the task distribution is shaped so that parallel decomposition and scheduling are naturally favored for efficiency.

## Method
As described in the [[sources/2602-02276v1-technical-report.md]], a suite of synthetic prompts is constructed to stress-test sequential agentic execution [2602.02276v1.pdf]. These prompts emphasize:
*   **Wide Search**: Requiring simultaneous exploration of many independent information sources.
*   **Deep Search**: Requiring multiple reasoning branches with delayed aggregation.
*   **Real-World Workloads**: Such as long-context document analysis and large-scale file downloading.

The goal is to encourage the orchestrator to allocate subtasks in parallel, enabling completion within fewer critical steps (reasoning-steps and tool-calls) than would be feasible for a single sequential agent. The prompts do not explicitly instruct the model to parallelize.

## Purpose
This approach is central to enabling efficient [[concepts/agent-swarm-parl.md]] (Parallel-agent) behavior in models like [[entities/kimi-k2.5.md]], allowing them to tackle complex, multi-faceted problems more effectively by managing a swarm of parallel agents.

## Related pages
- [[entities/kimi-k2.5.md]]
- [[sources/2602-02276v1-technical-report.md]]