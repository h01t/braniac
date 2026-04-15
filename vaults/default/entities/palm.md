# PaLM

**Summary**: A 540-billion parameter causal decoder model featuring architectural optimizations for training efficiency, such as parallel layers and multi-query attention.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

**Architecture & Optimizations**: PaLM (Pathways Language Model) is a massive causal decoder model designed with several efficiency improvements over a standard Transformer:
*   **Parallel Layers**: The attention and feed-forward network (FFN) layers are placed in parallel rather than sequentially, speeding up training by ~15%.
*   **SwiGLU Activation**: Used instead of standard ReLU/GELU in the FFN.
*   **RoPE Embeddings**: Rotary Positional Embeddings.
*   **Multi-Query Attention**: Uses a single key and value head shared across all query heads during decoding, reducing memory overhead and cost.
*   **Shared Input-Output Embeddings**.

**Training Observations**: The training of the 540B parameter model experienced "loss spikes." The mitigation strategy was to restart training from a checkpoint ~100 steps before the spike and skip 200-500 batches of data around the spike. The model was also found to memorize approximately 2.4% of its training data.

**Variants**:
*   **PaLM-2**: A smaller, more compute-efficient multilingual successor trained on higher-quality data for more iterations. It uses techniques like appending special tokens to data to reduce toxicity and memorization.
*   **U-PaLM**: An upgraded version of PaLM trained for an additional 0.1% of compute using the UL2R (UL2 Restore) objective, which converts the model to a non-causal decoder during this extra training phase. It showed significant gains on reasoning and other tasks.

## Related pages
- [[concepts/decoder-only-architectures.md]]
- [[concepts/scaling-laws.md]]
- [[entities/palm-2.md]]
- [[entities/gpt-3.md]]