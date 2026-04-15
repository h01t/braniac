# Chinchilla

**Summary**: A 70-billion parameter language model from DeepMind that empirically determined the optimal scaling law for training compute, advocating for more training tokens relative to model size.
**Source Context**: Comprehensive Overview of LLMs.pdf (Tables 4, 5, 6)

---

Chinchilla is a landmark model that challenged the trend of simply increasing model parameters. Its associated research proposed that for a given compute budget, optimal performance is achieved by training a smaller model on more data. It matched or outperformed much larger models like [[entities/gopher.md]].

## Architecture Details (Table 5)
*   **Type**: Causal Decoder
*   **Training Objective**: Next Token Prediction
*   **Attention**: Standard
*   **Positional Embedding**: Relative
*   **Activation**: GeLU
*   **Normalization**: Pre-RMSNorm
*   **Layers/Heads/HS**: 80 layers, 64 heads, 8,192 hidden size.

## Optimization & Training (Table 6)
*   **Batch Size**: 1.5M
*   **Sequence Length**: 2048
*   **Learning Rate**: 1e-4 with cosine decay to 10%.
*   **Optimizer**: Adam
*   **Precision**: Uses mixed precision training (BF16).

## Scaling Laws
The "Chinchilla scaling laws" became a standard reference for subsequent model training, influencing projects like [[entities/llama.md]] which also emphasized training on more tokens. It was trained on 1.4 trillion tokens.

## Related pages
- [[concepts/scaling-laws.md]]
- [[concepts/compute-optimal-training.md]]
- [[entities/deepmind.md]]