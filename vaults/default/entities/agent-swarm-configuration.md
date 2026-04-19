# Agent Swarm Configuration

**Summary**: A multi-agent system configuration where an orchestrator agent creates and manages sub-agents to collaboratively solve complex tasks.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

Agent swarm configuration in Kimi K2.5 involves an orchestrator agent equipped with tools for creating sub-agents (create_subagent) and assigning tasks to them (assign_task). The orchestrator uses a core toolset of web search, code interpreter, and web browsing, plus the specialized sub-agent tools. Each sub-agent can be instantiated with a custom system prompt and identifier for reuse.

Step limits are imposed on the orchestrator and sub-agents during evaluation. For example, in BrowseComp, the orchestrator has a maximum of 15 steps, and each sub-agent has up to 100 steps. The system prompt for the orchestrator emphasizes efficiency and planning. This configuration is part of the [[concepts/unified-agentic-reinforcement-learning.md]] framework and is evaluated in benchmarks like BrowseComp and WideSearch for [[entities/kimi-k2-5-model.md]].

## Related pages
- [[concepts/unified-agentic-reinforcement-learning.md]]
- [[entities/kimi-k2-5-model.md]]