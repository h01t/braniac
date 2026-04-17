# Short-term Memory in LLM Agents

**Summary**: Acts as a temporary workspace within the LLM's context window, holding immediate contextual information for ongoing tasks, managed through techniques like chunking and summarization.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf, pages 26, 28 (Table 4).

---

## Description
Short-term memory in [[concepts/autonomous-llm-agent.md|LLM agents]] is analogous to the information maintained within the model's [[concepts/context-window.md|context window]], serving as a temporary workspace for the current task or conversation [54]. Its effectiveness is fundamentally limited by the fixed size of this window.

## Key Techniques & Approaches
To manage information within the limited context window, agents employ:
*   **Context Window Management**: Actively maintaining the most recent conversational turns or input data.
*   **Chunking and Summarization**: Large inputs are broken into manageable pieces, and essential information is condensed to fit within the context window, preventing information loss in long sequences [Fundamentals of Building Autonomous LLM Agents.pdf, 57].

## Advantages and Limitations
*   **Advantages**: Facilitates immediate contextual awareness and is essential for coherent, multi-turn interactions.
*   **Challenges/Limitations**: It is strictly limited by the context window size, leading to the truncation of older data. Summarization techniques may omit critical details if not carefully designed [Fundamentals of Building Autonomous LLM Agents.pdf].

## Relationship to Long-term Memory
While short-term memory handles the immediate task, [[concepts/long-term-memory-llm-agents.md|long-term memory]] systems store information for sustained retention and future recall. The design of [[concepts/memory-module-llm-agent.md|memory modules]] must consider what data bridges from short-term to long-term storage.

## Related pages
- [[concepts/long-term-memory-llm-agents.md]]
- [[concepts/context-window.md]]
- [[concepts/memory-module-llm-agent.md]]