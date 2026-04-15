# Long-Term Memory

**Summary**: The facet of an agent's memory system dedicated to the sustained retention and recall of knowledge, enabling learning from past interactions and access to external information.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

Long-term memory allows LLM agents to store relevant information beyond a single session or context window, facilitating evolution and adaptation over time. The source outlines several implementation methods:

**Key Techniques:**
*   **Embodied Memory**: Refers to knowledge ingrained directly into the LLM's model parameters through continuous learning processes like fine-tuning. The model's weights are adjusted based on new experiences.
*   **[[concepts/retrieval-augmented-generation-rag.md]] (RAG)**: A two-phase technique where a retriever first fetches relevant documents from an external knowledge base (using vector embeddings), and the LLM then generates a response augmented with this retrieved information. This grounds responses in verifiable sources and reduces hallucinations.
*   **SQL Database**: Stores structured knowledge (e.g., employee data, orders). LLMs can interact with these databases using text-to-SQL techniques to convert natural language queries into executable SQL.

These methods enable persistent knowledge retention and enhance response accuracy. However, they come with challenges: fine-tuning is computationally expensive, RAG requires efficient retrieval systems, and text-to-SQL can struggle with complex query dependencies.

## Related pages
- [[concepts/memory-system.md]]
- [[concepts/retrieval-augmented-generation-rag.md]]
- [[concepts/data-storage-types.md]]