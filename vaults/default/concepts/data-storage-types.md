# Data Storage Types

**Summary**: The categories of information stored within an LLM agent's memory system, including experiences, procedures, knowledge, and user information, each serving a distinct functional purpose.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

The effectiveness of an agent's [[concepts/memory-system.md]] depends on what kind of data it stores. The source defines several key types:

**Primary Storage Categories:**
*   **Experiences**: Structured records of task executions. This includes the natural language instruction, a trajectory of observation-action pairs, and the outcome (success or failure). Storing failed experiences explicitly allows the agent to learn from mistakes.
*   **Procedures**: Reusable task workflows or routines induced from past experiences. Systems like Agent Workflow Memory (AWM) identify common patterns and provide these generalized steps to guide future similar tasks, improving efficiency.
*   **Knowledge**: External factual information received by the agent, such as data from articles, company-specific documents, or internal rules. This supports document-based discovery and context-specific responses.
*   **User Information**: Personal details supplied by the user, including preferences, background, and past activities. Mechanisms like MemoryBank synthesize this information to adapt to a user's personality over time, enabling personalized interactions.

Storing these diverse data types allows the agent to accumulate experiences, evolve, and behave more effectively. However, it requires robust storage systems and raises considerations around privacy, especially for user information.

## Related pages
- [[concepts/memory-system.md]]
- [[concepts/long-term-memory.md]]