# Retrieval-Augmented Generation (RAG)

**Summary**: A technique that enhances Large Language Models by fetching and incorporating relevant external documents or data during the generation process to improve accuracy and reduce hallucinations.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Retrieval-Augmented Generation (RAG) integrates information retrieval directly into the language model's generation process. Instead of relying solely on its internal parametric memory, an LLM uses a retriever to fetch pertinent context from an external knowledge source (e.g., a database or the web) and conditions its output on this retrieved information. This paradigm is crucial for providing up-to-date, factual, and verifiable responses, especially for knowledge-intensive tasks.

## Active and Iterative Retrieval
Basic RAG performs a single retrieval step, but more complex tasks may require multiple iterations. For example, Forward-looking Active Retrieval (FLARE) [[concepts/active-retrieval.md]] generates a preliminary response and then retrieves documents to correct parts of the output containing low-confidence tokens. RepoCoder uses recursive retrieval for code completion tasks (Source: Comprehensive Overview of LLMs.pdf).

## Training with Retrieval Augmentation
Training models within a RAG pipeline can yield significant performance gains. Key approaches include:
*   **Training the LLM**: Models like the Retrieval-Enhanced Transformer (RETRO) [[entities/retro.md]] demonstrate that pre-training smaller LLMs with a RAG pipeline can outperform much larger models trained without it. A study on RETRO showed that models only fine-tuned with RAG do not achieve the same benefits as those pre-trained with it.
*   **Training the Retriever**: Since output quality heavily depends on the retrieved in-context examples, methods train the retriever (while keeping the LLM frozen) to fetch accurate few-shot samples. Techniques involve training with contrastive learning using ranked samples or using supervised signals from the LLM's outputs (e.g., REPLUG).
*   **Joint Training**: Training both the retriever and the LLM together allows error propagation to update both components, often using objectives like masked language modeling (MLM) or document chunk prediction (Source: Comprehensive Overview of LLMs.pdf).

## Architecture and Scale
A common challenge is the growing sequence length when concatenating many retrieved documents. The Fusion-in-Decoder approach encodes contexts separately and fuses them in the decoder via cross-attention, allowing the augmentation of more samples without a drastic increase in computation (Source: Comprehensive Overview of LLMs.pdf).

## Web-Augmented Retrieval
Instead of relying on a static local knowledge base, some systems perform live retrieval from the internet. This web-augmented approach provides access to a vast, constantly updated pool of information to answer queries (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/tool-augmented-llms.md]]
- [[concepts/parameter-efficient-fine-tuning.md]]
- [[entities/retro.md]]