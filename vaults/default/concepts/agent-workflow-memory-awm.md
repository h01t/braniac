# Agent Workflow Memory (AWM)

**Summary**: A memory method that induces commonly reused routines (workflows) from an agent's past experiences and selectively provides these workflows to guide the agent's actions in future similar tasks.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf, pages 26, 29.

---

## Description
Agent Workflow Memory (AWM) is a technique for managing [[concepts/memory-data-types-llm-agents.md|procedural memory]] within an [[concepts/autonomous-llm-agent.md|LLM agent]]. It operates by analyzing stored task [[concepts/experience-learning-llm.md|experiences]] to identify and abstract reusable sequences of actions—workflows.

## Function and Process
1.  **Induction**: From a collection of training examples (stored experiences), AWM induces generalized routines or workflows. An experience includes a natural language instruction and a trajectory of observation-action pairs [59].
2.  **Storage & Retrieval**: These induced workflows are stored in the agent's [[concepts/long-term-memory-llm-agents.md|long-term memory]].
3.  **Guidance**: When the agent faces a new task, AWM can retrieve and provide relevant workflows to the LLM as part of its context, guiding it to follow a proven sequence of steps.

## Purpose and Advantage
The primary purpose is to improve agent efficiency and reliability by allowing it to reuse successful procedures rather than reasoning from scratch each time. This is a form of learning from experience that enhances the agent's [[concepts/planning-llm-agents.md|planning]] capabilities. It is cited as a key technique under "Procedures" in memory component tables [Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/memory-data-types-llm-agents.md]]
- [[concepts/experience-learning-llm.md]]
- [[concepts/planning-llm-agents.md]]