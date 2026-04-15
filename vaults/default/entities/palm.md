# PaLM

**Summary**: The Pathways Language Model, a 540-billion parameter decoder model from Google notable for its use of parallel and multi-query attention, and the SwiGLU activation function.
**Source Context**: Comprehensive Overview of LLMs.pdf (Tables 4, 5, 6)

---

PaLM (Pathways Language Model) is a large-scale [[concepts/large-language-models.md]] that demonstrated excellent performance on reasoning and coding tasks. It uses a decoder-only architecture with several efficiency-oriented innovations.

## Architecture Details (Table 5)
*   **Type**: Causal Decoder
*   **Training Objective**: Next Token Prediction
*   **Attention**: Parallel + Multi-query. This design improves training and inference speed.
*   **Positional Embedding**: [[concepts/rotary-positional-embeddings-rope.md]] (RoPE)
*   **Activation**: SwiGLU
*   **Normalization**: LayerNorm
*   **Vocabulary**: 256k tokens using SentencePiece.
*   **Layers/Heads/HS**: 118 layers, 48 heads, 18,432 hidden size.
*   **Bias**: Does not use bias in most layers (denoted by '-' in source).

## Optimization & Training (Table 6)
*   **Batch Size**: 2048
*   **Sequence Length**: 2048
*   **Learning Rate**: 0.01 with inverse square root decay (no warmup).
*   **Optimizer**: AdaFactor
*   **Precision**: Uses mixed precision training (BF16).
*   **Dropout**: No dropout used (denoted by '-').

## Model Family
PaLM is the foundation for a family of models, including the instruction-tuned [[entities/flan-upalm.md]], its larger context variant [[entities/upalm.md]], and the successor [[entities/palm2.md]].

## Related pages
- [[concepts/multi-query-attention.md]]
- [[concepts/swiglu-activation.md]]
- [[entities/google-ai.md]]