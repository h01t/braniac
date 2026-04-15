# Transformer Architectures for LLMs

**Summary**: Transformer architectures for LLMs refer to different high-level configurations of encoder and decoder blocks, primarily distinguished by how attention is applied, which influences the model's capabilities.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Common Architectural Variants
Most [[concepts/large-language-models.md]] are based on the [[concepts/transformer-architecture.md]], but they employ different arrangements:
*   **Encoder-Decoder**: The original Transformer architecture. It uses a stack of encoder blocks (with bidirectional self-attention) to process the input and a stack of decoder blocks (with causal self-attention and cross-attention to the encoder) to generate the output. Models like [[entities/t5.md]] use this (Source: Comprehensive Overview of LLMs.pdf, Section 2.9).
*   **Causal Decoder (Decoder-Only)**: Uses only the decoder stack from the Transformer. Attention is strictly causal (masked), meaning a token can only attend to previous tokens in the sequence. This architecture is used for autoregressive language modeling and is common in models like the GPT series (Source: Comprehensive Overview of LLMs.pdf, Section 2.9).
*   **Prefix Decoder (Non-Causal Decoder)**: Similar to the causal decoder but allows bidirectional attention over a "prefix" portion of the input sequence (the context) while maintaining causal attention for the generated tokens. This can be more efficient for tasks like text continuation (Source: Comprehensive Overview of LLMs.pdf, Section 2.9).
*   **Mixture-of-Experts (MoE)**: A sparse architecture variant where the standard feed-forward network in a transformer block is replaced by multiple independent "expert" networks. A router network decides which few experts to activate for each input token. This allows for increasing model parameter count without a proportional increase in computational cost (Source: Comprehensive Overview of LLMs.pdf, Section 2.9, referencing [90, 91, 92]).

## Architectural Choice Implications
The choice of architecture determines whether a model is best suited for tasks like text generation (causal decoder), translation (encoder-decoder), or fill-in-the-middle (prefix decoder). MoE architectures aim for greater [[concepts/model-efficiency.md]].

## Related pages
- [[concepts/transformer-architecture.md]]
- [[concepts/large-language-models.md]]
- [[concepts/mixture-of-experts.md]]
- [[concepts/attention-mechanisms.md]]