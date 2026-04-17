# Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2021)

**Summary**: A seminal paper introducing the RAG model architecture, which combines a pre-trained retriever (DPR) and a pre-trained generator (BART) for open-domain question answering and other knowledge-heavy tasks.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 31: Lewis et al., 2021. Retrieval augmented generation for knowledge-intensive nlp tasks. arXiv:2005.11401).

---

## The RAG Model Formulation
The RAG model operates in two modes: **RAG-Sequence** (uses the same retrieved document to generate the entire answer) and **RAG-Token** (can use different documents for each token generation). It is trained end-to-end, where the retriever learns to fetch documents that help the generator produce the correct output. This differs from later "RAG-as-pattern" approaches that use frozen retrievers and generators.

## Foundational Impact
This paper formally defined and popularized the term "Retrieval-Augmented Generation." It demonstrated that augmenting a generator with a non-parametric memory (a retrieval corpus) significantly improves factual accuracy and reduces [[concepts/hallucination-in-llms.md]] compared to parametric-only models. It established RAG as a leading paradigm for building knowledgeable language models.

## Evolution and Usage in Agents
While the original RAG model is a specific architecture, its core idea has become a ubiquitous **pattern** (often referred to as [[concepts/retrieval-augmented-generation.md]]) in building [[concepts/autonomous-llm-agents.md]]. Modern agents use the RAG pattern to access knowledge bases, documentation, or past experiences, making it a critical component for grounding agent decisions in external, verifiable information.

## Related pages
- [[concepts/retrieval-augmented-generation.md]]
- [[concepts/hallucination-in-llms.md]]
- [[concepts/autonomous-llm-agents.md]]