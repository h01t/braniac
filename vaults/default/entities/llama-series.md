# LLaMA Series

**Summary**: A highly influential family of decoder-only large language models from Meta, ranging from 7B to 70B parameters, renowned for parameter efficiency and strong performance, later fine-tuned for instruction-following and safety.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Overview
The LLaMA (Large Language Model Meta AI) series is among the most famous open-source LLM families. The models are **decoder-only** and vary in size (7B, 13B, 33B, 65B/70B parameters). They are celebrated for achieving strong performance with relatively fewer parameters compared to some contemporaries, making them more accessible for research and deployment (Source: Comprehensive Overview of LLMs.pdf).

## Key Variants and Innovations
*   **LLaMA-1**: Introduced optimizations like **efficient [[concepts/causal-attention.md]]** (avoiding computation on masked positions) and reducing activation recomputation during the backward pass to speed up training.
*   **LLaMA-2**: Focused on creating a safer and more capable dialogue model, **LLaMA-2-Chat**, via [[concepts/fine-tuning.md]]. The base pre-trained model had 40% more training data, a longer context window, and used [[concepts/grouped-query-attention.md]] (GQA) for efficiency.
*   **LLaMA-3 / 3.1**: Trained on a dataset seven times larger than LLaMA-2 with double the context length, leading to performance improvements over previous variants and other models (Source: Comprehensive Overview of LLMs.pdf).

## Findings
The source notes that a constant performance improvement is observed when scaling the LLaMA models, and that smaller models can achieve good performance with more training data and compute time (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/decoder-only-architecture.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/grouped-query-attention.md]]