# Context Window

**Summary**: A fundamental constraint of Large Language Models (LLMs) referring to the maximum number of tokens (text units) the model can process in a single input sequence.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

The context window is a hardware and architecture-defined limit on the amount of textual information an LLM can consider at any one time. This constraint directly impacts an agent's **[[concepts/short-term-memory.md]]** and its ability to process long conversations or documents.

**Primary Impact and Mitigations:**
Because LLMs cannot integrate information beyond this window, common workarounds include:
*   **Truncation**: Simply cutting off text that exceeds the limit.
*   **Summarization**: Condensing earlier parts of a long text into a shorter summary that fits within the window, though this risks omitting critical details.

**Related Challenge: Memory Duplication**
When storing information in memory, similar or duplicate records can accumulate. The source notes techniques to address this, such as condensing multiple successful action sequences for the same sub-goal into a unified plan or aggregating duplicate information by counting occurrences rather than storing redundant copies.

## Related pages
- [[concepts/short-term-memory.md]]
- [[concepts/memory-system.md]]