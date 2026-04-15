# Expert Agents

**Summary**: Specialized components within a multi-agent system, each built to excel at a specific task or reasoning capability through defined roles, targeted knowledge, and clear boundaries.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

An "expert" in a [[concepts/multi-agent-systems.md]] is a specialized LLM-based component designed to handle a distinct aspect of an agent's operation. Building an effective expert involves a deliberate design process.

**How to Build an Expert:**
1.  **Define Role and Scope**: Precisely specify the expert's specialization (e.g., planning, error handling), its expected inputs and outputs, and its limitations—knowing when to defer to another expert.
2.  **Equip with Knowledge**: Enhance the expert's capability through:
    *   **Targeted Prompting**: Using detailed prompts and techniques like Chain-of-Thought to steer its reasoning.
    *   **Fine-tuning**: Training a base LLM on domain-specific data for highly specialized tasks.
    *   **External Knowledge Bases**: Integrating with tools or databases for up-to-date information.
    *   **Memory Integration**: Providing access to the agent's [[concepts/memory-system.md]] for relevant past experiences.

**Example of Collaboration:**
The source describes a workflow where a Planning Expert decomposes a task and collaborates with a Constraint Satisfaction Expert. An Execution Expert then generates actions, consulting a Tool or Coding Expert if needed. After execution, a Reflection Expert and an [[concepts/error-handling-expert.md]] diagnose feedback, potentially using information retrieved by a Memory Management Expert to improve the next planning cycle.

## Related pages
- [[concepts/multi-agent-systems.md]]
- [[concepts/memory-system.md]]
- [[concepts/planning-expert.md]]