# OSWorld: A Realistic Benchmark for Generalist Agents in Operating Systems

**Summary**: OSWorld is a benchmark that evaluates the ability of generalist AI agents to perform complex, multi-step tasks within a simulated computer operating system environment (e.g., file management, software configuration, troubleshooting).
**Source Context**: arXiv preprint (2024), https://arxiv.org/pdf/2404.07972. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
The benchmark features a virtual machine or emulated OS environment where agents are given high-level natural language instructions (e.g., "Install Apache and host a webpage") and must execute the correct sequence of OS-level actions (CLI commands, GUI interactions) to complete the task. It measures an agent's proficiency in a fundamental, tool-rich digital domain.

## Key Insights
Mastery of an OS requires a blend of [[concepts/planning.md]], [[concepts/tool-use.md]] (CLI as tools), and procedural knowledge. OSWorld pushes agents beyond narrow web or API tasks into a more general, foundational computing domain, testing their adaptability and operational knowledge.

## Technical Approach
Agents likely interact with the environment through a defined API that mirrors OS actions. The benchmark includes a diverse task suite with automatic, programmatic verification of success (e.g., checking if a file was created, a service is running).

## Related pages
- [[concepts/benchmarking.md]]
- [[concepts/generalist-agents.md]]
- [[concepts/tool-use.md]]
- [[concepts/environments.md]]