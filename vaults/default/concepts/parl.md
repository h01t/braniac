# PARL

**Summary**: PARL is the learned orchestrator component within the Agent Swarm framework that dynamically creates and schedules heterogeneous sub-agents based on task requirements.
**Source Context**: 2602.02276v1.pdf (Kimi K2.5 Technical Report).

---

## Role in Agent Swarm
PARL is the central "brain" of the [[concepts/agent-swarm.md]] framework used by [[entities/kimi-k2-5.md]]. Unlike static task decomposition, PARL learns adaptive policies to intelligently manage a swarm of agents.

## Core Functionality
*   **Dynamic Instantiation**: PARL reasons about the required number, timing, and specialization of sub-agents needed for a given query, creating them dynamically rather than relying on a pre-defined set.
*   **Adaptive Scheduling**: It schedules these self-hosted sub-agents based on the evolving task structure and problem state, leading to an organically formed heterogeneous agent group optimized for the specific problem.

## Design Philosophy
This approach enables **proactive context management**. By decomposing long-horizon tasks into parallel, semantically isolated subtasks executed by sub-agents with bounded local contexts, PARL facilitates "context sharding." This allows the system to scale its effective context length architecturally while preserving reasoning integrity, as opposed to reactive context truncation methods.

## Related pages
- [[concepts/agent-swarm.md]]
- [[entities/kimi-k2-5.md]]