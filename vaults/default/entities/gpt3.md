# GPT-3

**Summary**: A 175-billion parameter causal decoder language model developed by OpenAI, known for its strong few-shot and zero-shot learning capabilities.
**Source Context**: Comprehensive Overview of LLMs.pdf (Tables 5 & 6)

---

GPT-3 (Generative Pre-trained Transformer 3) is a foundational [[concepts/large-language-models.md]] that demonstrated the power of scale in language modeling. It uses a decoder-only [[concepts/transformer-architecture.md]].

## Architecture Details (Table 5)
*   **Type**: Causal Decoder
*   **Training Objective**: Next Token Prediction
*   **Attention**: Dense + Sparse
*   **Positional Embedding**: Learned
*   **Activation**: GeLU
*   **Layers/Heads/HS**: 96 layers, 96 heads, 12,288 hidden size.
*   **Bias**: Uses bias (denoted by 'X' in the source table).

## Optimization & Training (Table 6)
*   **Sequence Length**: Not specified in the provided table excerpt.
*   **Batch Size**: 32K
*   **Learning Rate**: 6e-5 with cosine decay.
*   **Optimizer**: Adam
*   **Precision**: Uses mixed precision (implied).
*   **Weight Decay/Gradient Clip/Dropout**: Likely used standard values of 0.1, 1.0, and 0.1 respectively.

## Legacy and Impact
GPT-3's success paved the way for subsequent large-scale models and popularized the few-shot prompting paradigm. It is the base for instruction-tuned models like [[entities/webgpt.md]].

## Related pages
- [[concepts/causal-language-modeling.md]]
- [[concepts/few-shot-learning.md]]
- [[entities/openai.md]]