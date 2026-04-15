# Attention Mechanisms

**Summary**: Attention mechanisms are core components of transformers that allow models to dynamically weigh the importance of different parts of the input sequence when generating an output.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Self-Attention
The fundamental attention mechanism in the [[concepts/transformer-architecture.md]] is self-attention. For a given sequence, it computes Query (Q), Key (K), and Value (V) vectors. The attention score is computed as the scaled dot-product of Q and K, which is then used to create a weighted sum of V. This allows each token to attend to all other tokens in the sequence (Source: Comprehensive Overview of LLMs.pdf, Section 2.3, referencing [64]).

## Variants and Optimizations
*   **Cross-Attention**: Used in encoder-decoder architectures (like the original Transformer). The decoder uses its own queries to attend to the key-value pairs produced by the encoder (Source: Comprehensive Overview of LLMs.pdf, Section 2.3).
*   **Sparse Attention**: Aims to reduce the quadratic computational complexity (O(n²)) of standard self-attention for long sequences. It restricts the attention pattern, for example, to a sliding window, to speed up computation (Source: Comprehensive Overview of LLMs.pdf, referencing [67]).
*   **Flash Attention**: An optimization algorithm that minimizes memory reads/writes between GPU memory hierarchies (HBM and SRAM) using tiling techniques, dramatically speeding up attention computation and reducing memory usage (Source: Comprehensive Overview of LLMs.pdf, referencing [68]).

## Role in LLMs
Attention mechanisms are the primary workhorse of [[concepts/large-language-models.md]], enabling them to capture long-range dependencies and contextual relationships within text. The efficiency of attention computation is a major focus for scaling LLMs.

## Related pages
- [[concepts/transformer-architecture.md]]
- [[concepts/large-language-models.md]]