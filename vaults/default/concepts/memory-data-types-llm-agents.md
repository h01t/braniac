# Memory Data Types for LLM Agents

**Summary**: Defines the categories of information stored in an LLM agent's memory system, including experiences, procedures, knowledge, and user information, each serving distinct functional purposes.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf, pages 26-27, 29 (Table 5).

---

## Categories of Stored Data
The [[concepts/memory-module-llm-agent.md|memory module]] within an [[concepts/autonomous-llm-agent.md|autonomous LLM agent]] is designed to store diverse types of information to support better decision-making and consistent behavior.

*   **Experiences**: Records of both successful and failed task executions. Research indicates that explicitly logging failed experiences helps LLMs learn to avoid similar mistakes [1, 22]. An experience typically includes the task's natural language instruction and a trajectory of observation-action pairs, saved in a structured format like JSON for later retrieval and learning [59].
*   **Procedures (Workflows)**: Reusable task workflows derived from past experiences. Systems like [[concepts/agent-workflow-memory-awm.md|Agent Workflow Memory (AWM)]] induce common routines from training examples and provide them to guide future actions, improving efficiency [59].
*   **Knowledge**: External factual information, such as data from articles, company-specific rules, or details about machinery [11]. This often feeds into [[concepts/rag.md|Retrieval-Augmented Generation (RAG)]] systems.
*   **User Information**: Personal details supplied by the user, including preferences, past activities, and background. Mechanisms like [[entities/memorybank.md|MemoryBank]] aim to synthesize this information to comprehend and adapt to a user's personality over time [69].

## Utility and Challenges
Storing these diverse data types enables personalized interactions, continuous learning, and task efficiency. However, it requires robust storage systems, raises privacy concerns (especially for user information), and risks performance degradation from outdated or irrelevant knowledge [Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/memory-module-llm-agent.md]]
- [[concepts/agent-workflow-memory-awm.md]]
- [[concepts/experience-learning-llm.md]]
- [[entities/memorybank.md]]