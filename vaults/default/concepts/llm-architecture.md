# LLM Architecture

**Summary**: The structural design of large language models, encompassing components like attention mechanisms, positional embeddings, activation functions, and layer configurations.
**Source Context**: Comprehensive Overview of LLMs.pdf (Table 5)

---

The architecture of [[concepts/large-language-models.md]] is predominantly based on the [[concepts/transformer-architecture.md]]. Key variations among models are detailed in Table 5 of the source.

## Core Components
*   **Model Type**: Models are categorized as Causal Decoders (e.g., [[entities/gpt3.md]]), Encoder-Decoders (e.g., [[entities/t5.md]]), or Non-Causal Decoders.
*   **Training Objective**: The most common is next-token prediction. Others include span corruption (used by T5) and Fill-in-the-Middle (FIM).
*   **Attention Mechanism**: Variations include standard, parallel, multi-query, and grouped-query attention, which affect computational efficiency.
*   **Positional Embedding (PE)**: Critical for understanding token order. Common types are Learned embeddings, [[concepts/rotary-positional-embeddings-rope.md]], [[concepts/alibi-attention.md]], and Relative embeddings.
*   **Activation Functions**: GeLU, SwiGLU, and ReLU are commonly used, with SwiGLU being prominent in newer models like [[entities/llama.md]] and [[entities/palm.md]].
*   **Normalization**: Often applied before (Pre-) or after (Post-) the attention/FFN layers, with LayerNorm and RMSNorm being typical choices.

## Configuration Parameters
Architecture is defined by the number of layers (`nL`), attention heads (`nH`), and hidden state size (`HS`). These parameters scale with the total model parameter count.

## Related pages
- [[concepts/attention-mechanisms.md]]
- [[concepts/positional-embeddings.md]]
- [[concepts/mixture-of-experts-moe.md]]