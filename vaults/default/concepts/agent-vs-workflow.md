# Agent vs. Workflow

**Summary**: A distinction between two paradigms for enhancing LLMs: workflows are fixed, sequential systems for predictable tasks, while agents are adaptive, autonomous systems that generate plans and react to feedback for unpredictable environments.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Definition of a Workflow
A workflow is a structured system that enhances an LLM by enabling tool use, environmental interaction, or access to memory. However, it operates by following a **pre-established plan** created by its designer. The task is broken down into specific, sequential steps that the LLM executes in a fixed order. Workflows excel in controlled, predictable environments with well-defined, repetitive tasks [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Definition of an Agent
An [[concepts/llm-agent.md]] is designed to act autonomously based on feedback from its environment. Rather than following a pre-set script, its internal [[concepts/reasoning-system.md]] **generates its own strategies** tailored to the specific task and context. It uses techniques like Chain-of-Thought or iterative refinement to break down problems and can dynamically re-plan when faced with errors or unexpected events [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Key Differentiator: Adaptability
The core difference is **adaptability**.
- A **workflow** is rigid. If an error occurs or the environment changes unexpectedly, the LLM often cannot adjust, as it lacks the capability to deviate from the predefined sequence.
- An **agent** is versatile. It can interpret feedback, evaluate its actions, and change its course. This makes it suitable for dynamic, unpredictable environments where the path to a solution is not known in advance [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Conceptual Clarification
The source emphasizes that simply augmenting an LLM with modules, tools, or predefined steps does not make it an agent; that would make it a workflow. The transition to an agent requires the incorporation of autonomous reasoning and closed-loop interaction with the environment [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/llm-agent.md]]
- [[concepts/reasoning-system.md]]