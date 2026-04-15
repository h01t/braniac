# FIFO Overwriting

**Summary**: A memory eviction policy that removes the oldest data first, posing a risk of losing valuable historical information.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

**FIFO (First-In-First-Out) Overwriting** is a standard technique for managing finite memory capacity within an [[concepts/llm-agent-architecture.md|LLM agent's]] memory system. When the memory is full, the oldest stored data is overwritten by new incoming data.

## Mechanism and Risk
This approach provides a simple rule for eviction but carries a significant risk: it may inadvertently discard valuable older data that remains relevant or important for the agent's long-term tasks and coherence [Fundamentals of Building Autonomous LLM Agents.pdf]. The age of data is not necessarily correlated with its utility.

## Design Implication
The potential for data loss under FIFO policies means that designing a robust [[concepts/memory-management-issues.md|memory management system]] requires careful consideration. Engineers must balance the simplicity of FIFO against the need to preserve potentially critical historical knowledge, possibly necessitating more sophisticated eviction algorithms [Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/memory-management-issues.md]]
- [[concepts/memory-duplication-consolidation.md]]