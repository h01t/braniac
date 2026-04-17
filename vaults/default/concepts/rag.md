# RAG (Retrieval-Augmented Generation)

**Summary**: A technique enhancing LLMs by retrieving relevant information from external knowledge bases to generate accurate, context-aware responses, reducing hallucinations.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Definition
RAG is a long-term memory implementation within [[concepts/memory-system.md]], providing LLMs with access to updated, precise information not in their training data (Source: Section 5.1).

## Process
1. **Retrieval**: A retriever component queries an external knowledge base (often vector-indexed) to locate relevant documents (Source: Section 5.1).
2. **Augmentation**: Retrieved information is added to the LLM context alongside the original query (Source: Section 5.1).
3. **Generation**: The LLM produces responses based on the augmented input, improving accuracy for specific use cases (Source: Section 5.1).

## Advantages
- Reduces likelihood of hallucinations by grounding responses in external data (Source: Section 5.1).
- Enables precise responses based on company files or personal documents (Source: Section 5.1).

## Integration
Part of memory systems that support [[concepts/reasoning-system.md]] and [[concepts/multi-agent-systems.md]].

## Related pages
- [[concepts/memory-system.md]]
- [[concepts/reasoning-system.md]]