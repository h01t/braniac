# Short-Term Memory

**Summary**: The component of an LLM agent's memory that acts as a temporary workspace, holding immediate contextual information within the model's finite context window.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

Short-term memory in LLM agents is analogous to the active context maintained within the model's context window. It serves as a workspace for the immediate task at hand, holding recent conversational history, observations, and intermediate reasoning steps.

**Management Techniques:**
Due to the inherent limitation of the **[[concepts/context-window.md]]**, specific techniques are employed to manage short-term memory effectively:
*   **Context Window Management**: Actively maintaining the most relevant recent information within the token limit.
*   **Chunking and Summarization**: Breaking down large inputs into manageable pieces or condensing older information into summaries to free up space for new data.

These techniques facilitate immediate contextual awareness and help prevent critical information from being lost in long interaction sequences. The primary challenge is the hard token limit, which forces trade-offs between retaining older context and processing new input.

## Related pages
- [[concepts/memory-system.md]]
- [[concepts/context-window.md]]
- [[concepts/memory-management-expert.md]]