# Active Retrieval

**Summary**: An advanced retrieval-augmented generation strategy where the language model actively decides when and what to retrieve, often in an iterative manner, based on its own confidence or the evolving context of its generation.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Active retrieval moves beyond a single, static retrieval step at the beginning of the generation process. Instead, the retrieval mechanism is interleaved with generation, allowing the model to dynamically gather information as needed.

## Key Methods
*   **Iterative Retrieval**: Some complex tasks require multiple retrieval steps. The output from an initial generation can be fed back to the retriever to fetch more documents for subsequent steps.
*   **Forward-Looking Active Retrieval (FLARE)**: This method has the LLM generate a preliminary response. If it identifies tokens with low generation confidence, it triggers a retrieval for documents relevant to that part of the response to correct or complete it.
*   **RepoCoder**: Applies a recursive retrieval strategy specifically for code completion, fetching relevant code snippets iteratively to improve the final output (Source: Comprehensive Overview of LLMs.pdf).

Active retrieval is a component within the broader [[concepts/retrieval-augmented-generation.md]] framework, enabling more accurate and context-aware generation for knowledge-intensive or multi-step tasks.

## Related pages
- [[concepts/retrieval-augmented-generation.md]]