# Decompose, Plan, and Merge (DPPM)

**Summary**: A reasoning system approach where a complex task is decomposed, subplans are created in parallel, and then merged into a final coherent plan, often integrated with a reflection mechanism.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

The Decompose, Plan, and Merge (DPPM) method is a structured reasoning system for autonomous LLM agents. It begins by **decomposing** a main task into logical subtasks. These subtasks are then **planned** in parallel, which helps reduce cascading errors that can occur in purely sequential planning. Finally, the individual subplans are **merged** into a unified, executable global plan.

This planning process is typically coupled with a [[concepts/reflection-system.md]]. After executing a group of steps, the agent receives environmental feedback. The reflection mechanism assesses this feedback to determine the next action:
1.  **Successful execution**: The agent proceeds with the next group of steps.
2.  **Minor error**: The actions are close but not perfect; the steps are adjusted and retried.
3.  **Execution failure**: The plan cannot be completed as-is. The agent reflects on whether the issue is with a specific subplan (which is then regenerated) or if the entire plan needs to be reconsidered from scratch.

According to the source, DPPM is one of several **task decomposition** techniques. While it simplifies complex problem-solving and reduces error propagation through parallel planning, it can struggle with unexpected environmental changes during execution.

## Related pages
- [[concepts/reflection-system.md]]
- [[concepts/multi-agent-systems.md]]
- [[concepts/expert-agents.md]]