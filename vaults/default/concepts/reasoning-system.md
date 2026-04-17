# Reasoning System in LLM Agents

**Summary**: The reasoning system in LLM agents leverages perceptual input to make decisions and execute tasks, using strategies like task decomposition and multi-plan generation and selection.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

The reasoning system is the component that processes the agent's perception of the environment to plan and execute actions. Key tactics include:

- **Task Decomposition**: Breaking down complex tasks into subtasks. This includes methods like Decomposition First and Interleaved Decomposition, as well as techniques like DPPM, RePrompting, and ReWOO.
- **Multi-Plan Generation and Selection**: Generating multiple candidate plans and selecting the optimal one using methods like CoT-SC, ToT, GoT, and LLM-MCTS.

The reasoning system is crucial for translating perception into action and is closely tied to the [[concepts/perception-challenges.md]] that affect the quality of perceptual input.

## Related pages
- [[concepts/task-decomposition.md]]
- [[concepts/multi-plan-generation-and-selection.md]]
- [[concepts/perception-challenges.md]]