# LLaMA

**Summary**: A famous and parameter-efficient series of decoder-only language models from Meta, with versions ranging from 7B to 70B parameters, known for their strong performance and widespread use in instruction tuning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Model Series Overview
The LLaMA (Large Language Model Meta AI) series is a collection of decoder-only, transformer-based language models. The series is renowned in the community for its parameter efficiency and strong performance, especially after instruction tuning. Key versions include:
*   **LLaMA-1**: The original model, implementing optimizations like efficient causal attention.
*   **LLaMA-2**: Focused on safety and dialogue, with more training data, a larger context length, and grouped-query attention.
*   **LLaMA-3 / 3.1**: Trained on a dataset seven times larger than LLaMA-2, with double the context length, outperforming previous variants.

## Key Innovations and Findings
*   **LLaMA-1 Optimizations**: Implemented efficient causal attention by not storing/computing masked attention weights and key/query scores. It also reduced the number of activations recomputed during the backward pass.
*   **Scaling Observation**: A constant performance improvement was observed when scaling the model size. It was also found that smaller models could achieve good performance with more training data and compute time.
*   **LLaMA-2 Enhancements**: The pre-trained model used 40% more data than LLaMA-1, featured a larger context length, and employed grouped-query attention (GQA). The work was particularly focused on fine-tuning a safer and better **LLaMA-2-Chat** model for dialogue.
*   **LLaMA-3 Scale**: Trained on a massively larger dataset (7x LLaMA-2) with an even larger context window, leading to superior performance.

## Related pages
- [[concepts/decoder-only-architecture.md]]
- [[concepts/grouped-query-attention.md]]
- [[concepts/instruction-tuning.md]]