# Retrieval-Augmented Generation (RAG)

**Summary**: A technique that combines the generative power of large language models with an external knowledge retrieval system to produce more accurate, factual, and contextually relevant outputs.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (References).

---

## Core Mechanism
RAG works by first retrieving relevant documents or data snippets from a knowledge source (like a vector database or search engine) based on a user query. The retrieved context is then fed into the LLM alongside the original query to generate a final answer. This helps mitigate issues like [[concepts/hallucination-in-llms.md]] and keeps information up-to-date without retraining the model.

## Applications and Evolution
Initially highlighted for knowledge-intensive NLP tasks (Lewis et al., 2021), RAG has become a cornerstone for building reliable [[concepts/autonomous-llm-agents.md]]. It is used to provide agents with access to proprietary data, API documentation, or past experiences stored in memory. Advanced systems use RAG for **document-based knowledge discovery** (Gidey et al., 2022) and as part of **agent workflow memory** systems. Surveys (Gao et al., 2024) detail its progress and integration patterns.

## Integration with Agent Architectures
In an agent, the RAG component often serves as the **memory** or **knowledge access** module. It can retrieve past plans, successful actions, or relevant facts to inform current reasoning and [[concepts/llm-planning.md]]. Techniques like **Rewoo** (Xu et al., 2023) decouple the reasoning process from observation retrieval to improve efficiency. RAG is thus a key enabling technology for creating knowledgeable and context-aware agents.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/hallucination-in-llms.md]]
- [[sources/rag-survey-gao-et-al-2024.md]]
- [[sources/rag-lewis-et-al-2021.md]]
- [[sources/document-knowledge-discovery-gidey-et-al-2022.md]]