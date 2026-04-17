# Task Decomposition

**Summary**: Task Decomposition is a reasoning strategy that breaks down complex tasks into smaller, manageable subtasks, simplifying the planning process for LLM agents.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

Task Decomposition involves two main steps: the "decompose" step, where the complex task is broken into subtasks, and the "subplan" step, where a plan is formulated for each subtask [26]. This approach is akin to the "divide and conquer" paradigm.

There are two broad categories of task decomposition methods:

1. **Decomposition First**: The entire task is decomposed into sub-goals first, then plans are made for each sub-goal sequentially. Examples include HuggingGPT [48] and Plan-and-Solve [55]. A variant is DPPM (Decompose, Plan in Parallel, and Merge), which generates subplans in parallel and then merges them [36].
2. **Interleaved Decomposition**: The decomposition and subtask planning are interleaved, revealing subtasks based on the current state. Examples include Chain-of-Thought (CoT) [60] and ReAct [66].

Other advanced techniques include RePrompting [35] and ReWOO [63], which further refine the decomposition and planning process.

Task Decomposition is a key component of the reasoning system in LLM agents and is often combined with [[concepts/multi-plan-generation-and-selection.md]].

## Related pages
- [[concepts/multi-plan-generation-and-selection.md]]