# Action Expert

**Summary**: A specialized agent within a multi-agent system responsible for translating abstract plans into concrete, executable interactions with the external environment.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

The Action Expert operates as the "execution arm" of a **[[concepts/multi-agent-systems.md]]**. It receives high-level plans or subplans from a **[[concepts/planning-expert.md]]** and generates the specific low-level commands needed to interact with tools, APIs, or user interfaces.

**Core Functions:**
*   **Command Generation**: Creating the necessary API calls, command-line instructions, or interaction scripts to perform a planned action.
*   **Environmental Interaction**: In benchmarks like OSWorld, the Action Expert is responsible for generating precise mouse movements (move and click) and keyboard inputs to operate software.
*   **Tool Consultation**: If a plan requires the use of external tools, the Action Expert may consult a dedicated Tool Expert to determine which tool to use and how to use it correctly.

The Action Expert's effectiveness is crucial for bridging the gap between an agent's internal reasoning and real-world impact. After execution, feedback from the environment is passed to the **[[concepts/reflection-system.md]]** and **[[concepts/error-handling-expert.md]]** for evaluation.

## Related pages
- [[concepts/multi-agent-systems.md]]
- [[concepts/planning-expert.md]]
- [[concepts/error-handling-expert.md]]