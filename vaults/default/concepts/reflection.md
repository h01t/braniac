# Reflection

**Summary**: A reasoning mechanism where an LLM agent critically evaluates its own past actions, reasoning, and outcomes to learn from mistakes and improve future performance without human intervention.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

Reflection is a capability within an [[concepts/reasoning-system|LLM agent's reasoning system]] that enables self-improvement and adaptation in dynamic environments. It involves examining completed or ongoing tasks to identify errors, analyze reasoning, and generate corrective insights [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Key Characteristics
*   **Self-Evaluation**: The agent examines its actions, plans, and results, often comparing actual versus expected outcomes.
*   **Error Detection and Analysis**: It pinpoints where things went wrong, whether due to prompt misunderstandings, incorrect tool usage, logical errors, or environmental changes. Papers like [49] and [38] exemplify this [Source: Fundamentals of Building Autonomous LLM Agents.pdf].
*   **Correction and Improvement**: Based on analysis, the agent modifies its strategy, corrects reasoning, learns better tool use, updates its memory, or generates revised plans [Source: Fundamentals of Building Autonomous LLM Agents.pdf].
*   **Goal-Driven Reflection**: Agents can reflect on efficiency or completeness to optimize their path to a goal, even without explicit errors.

## Implementation Framework
As described in "Reflection: Language Agents with Verbal Reinforcement Learning" [49], a reflection system uses linguistic feedback instead of weight updates. Its core components are:
*   **Actor**: An LLM that generates actions based on state and memory.
*   **Evaluator**: Assesses the quality of the Actor's outputs, computing a reward score based on heuristics or another LLM.
*   **Self-Reflection Model**: An LLM that generates specific verbal feedback given a reward signal and the action trajectory [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Anticipatory Reflection
The paper "DEVIL'S ADVOCATE: Anticipatory Reflection for LLM Agents" [53] introduces a proactive variant. Here, the agent reflects on potential failures and considers remedies *before* executing an action, acting as its own "devil's advocate" to challenge proposed steps and enhance consistency [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/reasoning-system.md]]
- [[concepts/task-decomposition.md]]
- [[sources/reflection-language-agents-with-verbal-reinforcement-learning.md]]
- [[sources/devils-advocate-anticipatory-reflection-for-llm-agents.md]]