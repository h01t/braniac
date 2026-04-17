# OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments

**Summary**: A benchmark for evaluating generalist agents on tasks that require interacting with a real operating system desktop (Windows, macOS, Linux) via screenshots and keyboard/mouse actions.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 71: Zhu et al., 2024. OSWorld: A realistic benchmark for generalist agents in operating systems. arXiv:2404.07972; Ref 43: OSWorld Team, 2024. https://os-world.github.io/).

---

## Scope and Challenge
OSWorld provides a virtual machine environment where an agent, given a natural language instruction (e.g., "Book a flight to Paris next Monday"), must perform the task by observing screen pixels (via [[concepts/multimodal-llms.md]]) and issuing precise keyboard and mouse actions. It covers a wide range of applications: web browsers, file explorers, email clients, and creative software. This tests an agent's ability to function as a true digital generalist assistant.

## Role in Agent Development
As a benchmark, OSWorld pushes the boundaries of what [[concepts/autonomous-llm-agents.md]] can do. It integrates challenges from computer vision (GUI understanding), [[concepts/llm-planning.md]] (long-horizon task decomposition), and precise action generation. Success in OSWorld implies an agent can be useful for automating complex, real-world computer workflows. It complements other embodied benchmarks like [[sources/webarena-zhou-et-al-2024.md]].

## Implementations and Agents
The benchmark has spurred the development of agents like **OSCar** (Operating System Control via State-Aware Reasoning and Re-planning, Wang & Liu, 2024) and **ScreenAgent** (Niu et al., 2024), which are specifically designed to tackle OSWorld-style tasks by combining vision-language models with robust action parsers and planners.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/multimodal-llms.md]]
- [[sources/webarena-zhou-et-al-2024.md]]
- [[sources/screenagent-niu-et-al-2024.md]]