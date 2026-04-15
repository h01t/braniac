# Retrieval Augmented Language Modeling

**Summary**: A methodology that enhances LLMs by retrieving relevant information from external knowledge sources (e.g., document databases, the web) to provide grounded, accurate, and up-to-date responses.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.4.1.

---

Retrieval-Augmented Language Models (RALMs) address key LLM limitations: static knowledge cutoffs, propensity for hallucination, and lack of provenance for facts. By integrating a retrieval component, smaller models can achieve performance competitive with much larger models.

## Architecture
A typical RALM has two core components:
1.  **Retriever**: Identifies and fetches relevant text passages or documents from an external corpus in response to a query. Common retrievers include sparse methods (BM25) or dense, neural retrievers (based on models like BERT).
2.  **Language Model**: Generates a final answer conditioned on both the original user query *and* the retrieved context.

## Benefits and Findings
*   **Improved Accuracy & Reduced Hallucination**: Providing source material allows the model to ground its responses in evidence.
*   **Access to Current Information**: The external corpus can be updated independently of the model, providing access to new information.
*   **Efficiency**: A smaller 7B-11B parameter model augmented with retrieval can compete with much larger (e.g., 540B) standalone models.
*   **Aid for Human Evaluation**: As noted in **WebGPT**, generating answers with references makes it easier for human labelers to judge factual accuracy.

## Zero-Shot Retrieval Augmentation
A simple but effective approach keeps the base LLM completely unchanged. A separate retriever (like BM25 or a frozen BERT) fetches context, which is then prepended to the user's query as plain text for the LLM to process. This demonstrates that retrieval benefits can be applied without modifying the model's weights.

## Related pages
- [[concepts/hallucination.md]]
- [[concepts/in-context-learning.md]]
- [[entities/webgpt.md]]