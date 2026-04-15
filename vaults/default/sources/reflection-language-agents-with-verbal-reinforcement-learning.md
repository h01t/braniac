# Reflection: Language Agents with Verbal Reinforcement Learning

**Summary**: A research paper that introduces a framework for improving language agent performance through iterative linguistic self-feedback, using components like an Actor, Evaluator, and Self-Reflection model.
**Source Context**: Cited as [49] in Fundamentals of Building Autonomous LLM Agents.pdf.

---

This paper is a key reference in the discussion of [[concepts/reflection|reflection]] for LLM agents. The source document summarizes its core contribution as a framework where agents learn from past mistakes by generating, storing, and using verbal feedback in subsequent iterations, avoiding traditional weight updates.

## Framework Components
As summarized in the source:
*   **Actor**: An LLM that generates text and actions based on current state and memory.
*   **Evaluator**: Assesses the quality of the Actor's generated trajectory (sequence of actions/observations) and computes a reward score. Evaluation can be based on exact matches, heuristics, or another LLM.
*   **Self-Reflection Model**: An LLM responsible for generating nuanced, specific verbal feedback given a sparse reward signal (e.g., success/fail) and the current trajectory [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

This framework enables agents to perform self-evaluation, error detection, and correction, which are hallmark characteristics of reflective reasoning.

## Related pages
- [[concepts/reflection.md]]
- [[sources/devils-advocate-anticipatory-reflection-for-llm-agents.md]]