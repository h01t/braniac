# Execution System

**Summary**: The component of an LLM agent that translates internal decisions into concrete actions that impact the environment.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Role

The execution system is responsible for carrying out the agent's plans by interacting with the environment. This can involve using tools, calling APIs, or generating code to perform actions like mouse movements in a software environment.

## Approaches

The paper mentions:

- **Tool-based frameworks**: The agent uses predefined tools to execute actions.
- **Code generation**: The agent writes code that is then executed to perform tasks.

## Integration

The execution system works in tandem with the [[concepts/perception-system.md]] and [[concepts/reasoning-system.md]] to form a closed-loop autonomous agent.

## Related pages
- [[concepts/perception-system.md]]
- [[concepts/reasoning-system.md]]
- [[sources/fundamentals-of-building-autonomous-llm-agents.md]]