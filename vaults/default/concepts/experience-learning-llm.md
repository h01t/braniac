# Experience Learning in LLM Agents

**Summary**: The process by which LLM agents learn from records of past task executions (both successful and failed), storing them as structured experiences to inform and improve future performance.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf, pages 26-27.

---

## Description
Learning from experience is a cornerstone for developing robust [[concepts/autonomous-llm-agent.md|autonomous LLM agents]]. Agents store detailed records of their interactions, which become a core data type within the [[concepts/memory-data-types-llm-agents.md|agent's memory]].

## What Constitutes an Experience
A stored experience typically includes:
*   **Instruction**: The natural language task description (e.g., "Who ordered order 0130?").
*   **Trajectory**: A sequence of steps, where each step contains:
    *   **Observation**: The agent's perception of the environment state at that step (e.g., "The current page shows order 0130").
    *   **Action**: The action performed (e.g., `click("126")` or `stop()`) [59].
This structured data is saved in storage systems like databases or JSON files.

## Value of Failed Experiences
Research indicates that explicitly logging and tagging **failed experiences** is particularly valuable. By recognizing what led to a failure, LLMs can learn to avoid repeating similar mistakes, contributing to more robust development [1, 22]. This relates to techniques like "invalid action filtering."

## Application and Evolution
Stored experiences are not just for recall. They can be processed to induce generalized [[concepts/agent-workflow-memory-awm.md|workflows (procedures)]] or summarized for more efficient retrieval. This enables a form of continuous learning, where the agent accumulates knowledge and refines its behavior over time [59].

## Related pages
- [[concepts/memory-data-types-llm-agents.md]]
- [[concepts/agent-workflow-memory-awm.md]]
- [[concepts/memory-module-llm-agent.md]]