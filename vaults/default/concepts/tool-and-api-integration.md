# Tool and API Integration

**Summary**: A fundamental execution method where LLM agents use predefined functions and structured calls to perform specific tasks.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

**Tool and API Integration** is the most fundamental mechanism within an LLM agent's [[concepts/execution-system.md|execution system]] for carrying out actions. It allows agents to extend their capabilities beyond text generation to performing concrete operations.

## Method of Operation
Agents are provided with a set of predefined functions or tools that correspond to specific actions, such as file operations, database queries, web requests, or system commands. The agent generates structured outputs (typically in JSON format) that specify **which tool to use and what parameters to provide** [Fundamentals of Building Autonomous LLM Agents.pdf, citation 61].

## Capabilities and Examples
With this method, agents can carry out a wide variety of specific tasks. Examples include sending emails, generating files, performing computations, or retrieving data from other software systems [Fundamentals of Building Autonomous LLM Agents.pdf, citation 61]. This turns the LLM into a controller for a suite of external utilities.

## Related pages
- [[concepts/execution-system.md]]
- [[concepts/multimodal-action-spaces.md]]