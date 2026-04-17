# Long-term Memory in LLM Agents

**Summary**: A component that stores knowledge for sustained retention, enabling agents to recall past experiences and synthesize information from previous interactions using techniques like RAG, SQL databases, and model fine-tuning.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf, pages 28-29 (Table 4).

---

## Description
Long-term memory in [[concepts/autonomous-llm-agent.md|LLM agents]] is designed for persistent knowledge retention, allowing agents to learn from and utilize historical data across multiple interactions. This is distinct from [[concepts/short-term-memory-llm-agents.md|short-term memory]], which is confined to the immediate context window.

## Key Techniques & Approaches
Several methods are used to implement long-term memory:
*   **Embodied Memory (Fine-tuning)**: Experiences are ingrained directly into the model's parameters through continuous learning processes like fine-tuning, making knowledge implicit within the model itself [Fundamentals of Building Autonomous LLM Agents.pdf].
*   **Retrieval-Augmented Generation (RAG)**: This technique enhances an LLM by retrieving relevant documents from an external knowledge base (often using [[concepts/vector-embeddings.md|vector embeddings]]) and augmenting the prompt context, which reduces [[concepts/hallucination-llm.md|hallucinations]] and improves accuracy [31].
*   **SQL Database Integration**: Structured data, such as employee or order details, is stored in SQL databases. LLM agents can access this via [[concepts/text-to-sql.md|text-to-SQL]] query generation [Fundamentals of Building Autonomous LLM Agents.pdf, 72].

## Advantages and Limitations
*   **Advantages**: Enables persistent knowledge, supports personalization, and grounds responses in verifiable sources (via [[concepts/rag.md|RAG]]) to improve reliability.
*   **Challenges/Limitations**: Fine-tuning for embodied memory is computationally expensive. RAG requires efficient indexing and retrieval systems, and text-to-SQL generation can struggle with complex queries or database dependencies [Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/short-term-memory-llm-agents.md]]
- [[concepts/rag.md]]
- [[concepts/text-to-sql.md]]
- [[concepts/embodied-memory.md]]