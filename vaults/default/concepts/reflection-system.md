# Reflection System

**Summary**: A mechanism that allows an LLM agent to evaluate its executed actions, identify errors, and improve future performance through self-evaluation and corrective planning.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

A reflection system is a critical component for enabling autonomous LLM agents to learn and adapt from experience without constant human intervention. It processes feedback from the environment after action execution to diagnose outcomes and guide subsequent behavior.

The reflection process, as outlined in the source, involves several key functions:
*   **Self-Evaluation**: The agent compares the actual outcome of its actions against the expected result.
*   **Error Detection and Analysis**: It identifies the root cause of discrepancies, such as incorrect tool usage or logical flaws in a plan.
*   **Correction and Improvement**: Based on the analysis, the agent adjusts its current plan or strategy.
*   **Anticipatory Reflection (Devil's Advocate)**: In some advanced systems, the agent proactively considers potential points of failure *before* execution to improve plan robustness.

In a [[concepts/multi-agent-systems.md]] architecture, reflection is often handled by a dedicated **Reflection Expert**. This expert collaborates with other specialists, such as an [[concepts/error-handling-expert.md]], to diagnose issues and propose recovery strategies. The system's effectiveness depends on robust feedback mechanisms and can be limited by the agent's ability to accurately self-evaluate.

## Related pages
- [[concepts/decompose-plan-merge-dppm.md]]
- [[concepts/multi-agent-systems.md]]
- [[concepts/error-handling-expert.md]]