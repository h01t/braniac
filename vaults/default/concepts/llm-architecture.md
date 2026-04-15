# LLM Architecture

**Summary**: LLM architectures are primarily based on the transformer, with key variants including encoder-decoder, causal decoder, prefix decoder, and the efficient Mixture-of-Experts design.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Transformer-Based Architectures
Most LLMs are built on the transformer [[concepts/attention-mechanism.md]] architecture. The main variants differ in how attention is applied and how blocks are connected:
*   **Encoder-Decoder**: The classic transformer architecture. The **encoder** processes the full input sequence with bidirectional [[concepts/attention-mechanism.md]]. The **decoder** generates the output autoregressively (one token at a time) and uses cross-attention to attend to the encoder's output. Models like T5 [[entities/t5-model.md]] use this.
*   **Causal Decoder (Decoder-Only)**: Uses only the decoder stack. [[concepts/attention-mechanism.md]] is restricted (causal/masked) so a token can only attend to previous tokens in the sequence. This is standard for autoregressive language models like the GPT series [[entities/gpt-3-model.md]].
*   **Prefix Decoder (Non-Causal Decoder)**: Similar to a causal decoder, but the attention masking is not strictly causal for a portion of the input (the "prefix"), allowing bidirectional attention within that prefix while maintaining causality for the generated tokens.
*   **Mixture-of-Experts (MoE)**: A sparse architecture variant. A router network directs each token to a small subset of independent feed-forward neural networks (the "experts"). This allows for increasing model parameter count (size) without a proportional increase in computational cost, as only a fraction of experts are active per token (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/attention-mechanism.md]]
- [[concepts/efficient-llms.md]]
- [[entities/t5-model.md]]
- [[entities/gpt-3-model.md]]