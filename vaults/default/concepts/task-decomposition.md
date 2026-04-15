# Task Decomposition

**Summary**: A key reasoning strategy where a complex problem is broken down into smaller, more manageable subtasks to simplify planning and execution for LLM agents.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

Task decomposition is a fundamental tactic in an [[concepts/reasoning-system|LLM agent's reasoning system]]. It involves dividing a complex task into a set of subtasks (the "decompose" step) and then formulating a plan for each subtask (the "subplan" step). This "divide and conquer" approach helps navigate intricate real-world scenarios [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Methodologies
Current methodologies fall into two broad categories:
1.  **Decomposition-First**: The entire task is decomposed into sub-goals upfront, and planning proceeds sequentially for each. Examples include **HuggingGPT** and **Plan-and-Solve**.
    *   A modified version is **DPPM (Decompose, Plan in Parallel, and Merge)**, which generates subplans for each subtask concurrently using individual LLM agents and then merges them into a coherent global plan. This aims to avoid cascading errors from sequential dependency [Source: Fundamentals of Building Autonomous LLM Agents.pdf].
2.  **Interleaved Decomposition**: Decomposition and subtask planning are interleaved, revealing only one or two subtasks at a time based on the current state. Examples include **Chain-of-Thought (CoT)** and **ReAct**. This allows for dynamic adjustment based on environmental feedback, enhancing fault tolerance, though it can sometimes lead to deviation from original goals in long trajectories [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Advanced Strategies
Further advancements include:
*   **RePrompting**: Checks if each step of a plan meets prerequisites before execution. If a step fails, a precondition error prompts the LLM to regenerate the plan [Source: Fundamentals of Building Autonomous LLM Agents.pdf].
*   **ReWOO**: A modular paradigm that decouples reasoning from external observations. Agents first generate comprehensive plans and obtain observations independently, then combine them for final results [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/reasoning-system.md]]
- [[concepts/multi-plan-generation-and-selection.md]]
- [[concepts/reflection.md]]
- [[entities/dppm.md]]