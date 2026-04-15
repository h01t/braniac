# Pre-training

**Summary**: Pre-training is the initial, self-supervised phase of LLM development where the model learns general language representations by predicting parts of the input text on a massive corpus, forming the foundation for later fine-tuning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Objective and Purpose
Pre-training aims to learn a generic, transferable representation of language by training on a large, diverse corpus of text in a **self-supervised** manner. This foundational knowledge allows the model to be effectively adapted (via [[concepts/fine-tuning.md]]) to a wide variety of downstream NLP tasks (Source: Comprehensive Overview of LLMs.pdf). The performance of Pre-trained Language Models (PLMs) generally improves with scale (more parameters and data), which led directly to the development of modern LLMs.

## Common Pre-training Objectives
The primary objective discussed is **Full Language Modeling** (autoregressive language modeling), where the model is trained to predict the next token in a sequence given all previous tokens. This is the core objective for causal decoder models like GPT [[entities/gpt-3-model.md]]. Other objectives (like masked language modeling used in BERT) exist but are not detailed in the provided text excerpt (Source: Comprehensive Overview of LLams.pdf).

## Training Infrastructure
Training LLMs requires sophisticated distributed training strategies due to their size:
*   **Data Parallelism**: Replicates the model across devices and splits the batch.
*   **Tensor/Model Parallelism**: Shards individual model layers or operations across devices.
*   **Pipeline Parallelism**: Distributes different layers of the model across devices.
*   **3D Parallelism**: Combines data, tensor, and pipeline parallelism.
*   **Optimizer Parallelism (e.g., ZeRO)**: Partitions optimizer states, gradients, and parameters across devices to reduce memory usage (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/fine-tuning.md]]
- [[concepts/llm-training-pipeline.md]]
- [[entities/gpt-3-model.md]]