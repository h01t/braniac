# DPPM (Decompose, Plan in Parallel, and Merge)

**Summary**: A modified Decomposition-First planning strategy for LLM agents that decomposes a task, generates subplans for subtasks concurrently using multiple agents, and then merges them into a global plan.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

DPPM is a specific methodology for [[concepts/task-decomposition|task decomposition]] and planning within an [[concepts/reasoning-system|LLM agent's reasoning system]]. It is presented as a modified version of the standard Decomposition-First approach, designed to address several limitations of sequential planning.

## The Three-Step Process
1.  **Decompose**: The complex task is broken down into subtasks.
2.  **Plan in Parallel**: Subplans for each subtask are generated *concurrently* using individual LLM agents. This parallel planning allows each agent to focus solely on its assigned subtask, promoting independent work and avoiding the "cascading errors" that can occur when subplans are sequentially dependent on one another [Source: Fundamentals of Building Autonomous LLM Agents.pdf].
3.  **Merge**: The independently generated local subplans are merged into a coherent global plan.

## Addressed Limitations
DPPM is designed to tackle problems like handling heavy constraints, carrying errors from previous planning steps, forgetting the main goal, and maintaining cohesion between subtasks. A noted limitation is that it "can struggle to adapt well to unexpected environmental problems," but this can be mitigated by incorporating [[concepts/reflection|reflection]] after each execution step [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/task-decomposition.md]]
- [[concepts/reasoning-system.md]]