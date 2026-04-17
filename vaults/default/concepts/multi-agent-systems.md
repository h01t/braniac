# Multi-Agent Systems

**Summary**: Architectures where a single LLM agent comprises specialized experts (e.g., planning, reflection, error handling) to distribute reasoning tasks, enhancing scalability, modularity, and robustness.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Overview
Multi-agent systems extend the [[concepts/reasoning-system.md]] by distributing processes across modular experts, each focusing on distinct aspects like planning, reflection, or action execution (Source: Section 4.5).

## Expert Types
Key experts include (Source: Section 4.5):
1. **Planning Expert**: Handles task decomposition and strategic planning, aligning with the actor component in reflection systems (Source: Section 4.5, Table 3).
2. **Reflection Expert**: Evaluates plans and performance, corresponding to the evaluator in reflection systems (Source: Section 4.5, Table 3).
3. **Error Handling Expert**: Diagnoses failures and suggests recovery strategies (e.g., proposing to scroll if an item isn't found) (Source: Section 4.5).
4. **Memory Management Expert**: Manages the agent's memory for efficient information retrieval and context maintenance (Source: Section 4.5).
5. **Action Expert**: Translates plans into concrete interactions (e.g., generating mouse movements in OSWorld) (Source: Section 4.5).
6. **Other Experts**: Coding, Information Retrieval, HCI, Constraint Satisfaction, and Security experts, depending on use cases (Source: Section 4.5).

## Building an Expert
Involves (Source: Section 4.6):
- **Define Role and Scope**: Clear specialization, input/output specifications, and boundaries (Source: Section 4.6).
- **Equip with Knowledge**: Via targeted prompting (e.g., Chain-of-Thought), fine-tuning, external knowledge bases, or memory integration (Source: Section 4.6).

## Example Workflow
1. Planning expert decomposes tasks and collaborates with constraint satisfaction expert (Source: Section 4.6).
2. Execution expert generates actions, consulting tool or coding experts if needed (Source: Section 4.6).
3. Reflection and error handling experts process environmental feedback to diagnose issues (Source: Section 4.6).
4. Memory expert retrieves past experiences to inform next steps (Source: Section 4.6).

## Advantages and Challenges
**Advantages**:
- Enhances modularity and robustness through specialization (Source: Table 3).
- Improves scalability via division of labor (Source: Table 3).

**Challenges**:
- Requires careful coordination between experts (Source: Table 3).
- Increased system design complexity and potential security risks (Source: Table 3).

## Related pages
- [[concepts/reasoning-system.md]]
- [[concepts/reflection.md]]
- [[concepts/task-decomposition.md]]
- [[concepts/memory-system.md]]