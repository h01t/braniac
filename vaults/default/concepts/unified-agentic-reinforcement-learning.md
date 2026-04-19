# Unified Agentic Reinforcement Learning

**Summary**: A reinforcement learning framework with a standardized Gym-like interface for training AI agents, featuring modular components and support for complex multi-agent paradigms.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

The unified agentic reinforcement learning (RL) environment is designed to streamline the implementation of diverse agent tasks. It features a standardized Gym-like interface and compositional modularity with pluggable components such as a Toolset module, Judge module, and modules for prompt diversification and instruction-following enhancement. These components can be dynamically composed with core agent loops for flexibility.

At execution, each agent task is treated as an independent asynchronous coroutine that can recursively trigger sub-task rollouts, enabling complex multi-agent paradigms like Parallel-Agent RL and Agent-as-Judge. The framework includes a Rollout Manager that orchestrates up to 100,000 concurrent tasks. It also co-designs an inference engine following a Token-in-Token-out paradigm and includes monitoring and debugging tools. This environment is used to train the [[entities/kimi-k2-5-model.md]] for agentic capabilities.

## Related pages
- [[entities/agent-swarm-configuration.md]]
- [[entities/kimi-k2-5-model.md]]