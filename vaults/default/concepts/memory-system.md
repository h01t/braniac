# Memory System

**Summary**: The component of an LLM agent responsible for managing information across different time scales, encompassing long-term knowledge retention and short-term contextual awareness.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

The memory system provides the foundational ability for an LLM agent to retain and utilize past information, which is critical for learning, consistency, and informed decision-making. It is typically managed by a dedicated [[concepts/memory-management-expert.md]].

**Core Components:**
*   **[[concepts/long-term-memory.md]]**: Stores knowledge for sustained retention and recall. Implementations include [[concepts/retrieval-augmented-generation-rag.md]], SQL databases, and embodied memory (via fine-tuning).
*   **[[concepts/short-term-memory.md]]**: Acts as a temporary workspace, holding immediate contextual information within the LLM's limited context window.

**Data Storage Types:**
The system stores various types of information to support agent functionality:
*   **Experiences**: Records of successful and failed task trajectories (observation-action pairs).
*   **Procedures**: Reusable task workflows induced from past experiences (e.g., Agent Workflow Memory).
*   **Knowledge**: External facts, such as articles or company rules.
*   **User Information**: Personal details and preferences supplied by the user.

**Key Limitations:**
The system faces challenges like the finite **[[concepts/context-window.md]]**, which necessitates truncation or summarization of long texts, and **memory duplication**, which requires techniques to condense or aggregate similar records.

## Related pages
- [[concepts/long-term-memory.md]]
- [[concepts/short-term-memory.md]]
- [[concepts/data-storage-types.md]]