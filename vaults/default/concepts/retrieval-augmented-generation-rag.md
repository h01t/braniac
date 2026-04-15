# Retrieval-Augmented Generation (RAG)

**Summary**: A technique that enhances LLM responses by first retrieving relevant documents from an external knowledge base and then using that information to generate more accurate and grounded answers.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

Retrieval-Augmented Generation (RAG) is a key technique for implementing **[[concepts/long-term-memory.md]]** in LLM agents. It operates in two main phases to overcome the limitations of an LLM's static, pre-trained knowledge.

**How RAG Works:**
1.  **Retrieval**: Given a user query, a retriever component (often using vector embeddings) searches an external knowledge base—which could contain company files, personal documents, or updated information—to find the most relevant documents or passages.
2.  **Augmentation**: The retrieved text is added to the LLM's input context alongside the original query. The LLM is then prompted to generate a response based on this augmented information.

This process grounds the LLM's responses in specific, verifiable sources, which significantly reduces the likelihood of "hallucinations" (generating plausible but incorrect information). RAG is therefore crucial for applications requiring precision and access to up-to-date or proprietary data. Its effectiveness depends on having an efficient and well-indexed retrieval system.

## Related pages
- [[concepts/long-term-memory.md]]
- [[concepts/memory-system.md]]