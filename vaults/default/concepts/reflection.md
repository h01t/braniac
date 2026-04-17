# Reflection

**Summary**: A mechanism allowing LLM agents to evaluate their past actions, detect errors, and generate improvements for future performance, enhancing adaptability and learning.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Definition
Reflection enables agents in a [[concepts/reasoning-system.md]] to critically assess completed tasks, plans, and outcomes, using insights to self-correct without human intervention (Source: Section 4.3).

## Key Characteristics
1. **Self-Evaluation**: The agent examines its task execution, comparing actual and expected outcomes (Source: Section 4.3).
2. **Error Detection and Analysis**: Identifies where things went wrong, such as misunderstandings, incorrect tool usage, or logical inconsistencies (Source: Section 4.3). Papers like [[sources/reflection-language-agents-paper.md]] exemplify this.
3. **Correction and Improvement**: Generates actionable insights to modify planning, reasoning, or tool usage, updating memory or generating revised plans (Source: Section 4.3).
4. **Goal-Driven Reflection**: Aims to optimize efficiency or completeness even without explicit errors (Source: Section 4.3).

## Implementation Components
A reflection system, as described in [[sources/reflection-language-agents-paper.md]], includes (Source: Section 4.3):
- **Actor**: LLM generating actions based on state and memory.
- **Evaluator**: Assesses the Actor's outputs, computing a reward score via exact match, heuristics, or another LLM.
- **Self-Reflection Model**: LLM generating verbal self-reflections given sparse reward signals and trajectories.

## Anticipatory Reflection
Introduced in [[sources/devils-advocate-paper.md]], this involves proactive reflection on potential failures before execution, acting as a "devil's advocate" to challenge proposed steps and improve consistency (Source: Section 4.3).

## Advantages and Challenges
**Advantages**:
- Enables learning from mistakes autonomously (Source: Table 3).
- Enhances adaptability and efficiency (Source: Table 3).
- Anticipatory reflection improves consistency by mitigating challenges early (Source: Section 4.3).

**Challenges**:
- Requires robust feedback mechanisms (Source: Table 3).
- Limited by the agent's self-evaluation accuracy (Source: Table 3).

## Related pages
- [[concepts/reasoning-system.md]]
- [[sources/reflection-language-agents-paper.md]]
- [[sources/devils-advocate-paper.md]]
- [[concepts/multi-agent-systems.md]]