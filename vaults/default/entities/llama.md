# LLaMA

**Summary**: A family of efficient, high-performing large language models developed by Meta, ranging from 7B to 65B parameters, which became a popular base for open-weight instruction-tuned models.
**Source Context**: Comprehensive Overview ofLLMs.pdf (Tables 4, 5, 6)

---

The LLaMA (Large Language Model Meta AI) models are decoder-only transformers designed to demonstrate that state-of-the-art performance can be achieved with smaller model sizes but trained on more tokens. The architecture choices have been highly influential.

## Model Variants and Details
The source covers multiple versions:
*   **LLaMA (65B)**: The original model (arXiv'23).
*   **LLaMA-2 (70B)**: An improved version with grouped-query attention and a longer 4k context length.
*   **LLaMA-3.1 (405B)**: A much larger model with a 128k vocabulary and trained on 15T tokens.

## Architecture (Table 5 - LLaMA 65B)
*   **Type**: Causal Decoder
*   **Attention**: Standard (LLaMA-2 uses Grouped-query)
*   **Positional Embedding**: [[concepts/rotary-positional-embeddings-rope.md]] (RoPE)
*   **Activation**: SwiGLU
*   **Normalization**: Pre-RMSNorm
*   **Layers/Heads/HS**: 80 layers, 64 heads, 8,192 hidden size.

## Optimization (Table 6 - LLaMA 65B)
*   **Batch Size**: 4M tokens
*   **Sequence Length**: 2048
*   **Learning Rate**: 1.5e-4 with cosine decay to 10%.
*   **Precision**: Uses mixed precision training.

## Instruction-Tuned Variants
The LLaMA models were widely used as bases for [[concepts/instruction-tuning.md]], leading to models like [[entities/alpaca.md]], [[entities/vicuna.md]], and [[entities/lima.md]].

## Related pages
- [[concepts/rotary-positional-embeddings-rope.md]]
- [[concepts/grouped-query-attention.md]]
- [[entities/meta-ai.md]]