# Parameter-Efficient Fine-Tuning

**Summary**: A set of techniques that adapt large pre-trained language models to downstream tasks by training only a small subset of parameters, dramatically reducing computational cost compared to full model fine-tuning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Parameter-Efficient Fine-Tuning (PEFT) is crucial for making the adaptation of billion-parameter LLMs feasible. Instead of updating all weights, these methods introduce a limited number of trainable parameters, often achieving performance comparable to full fine-tuning, especially in low- and medium-resource scenarios.

## Primary PEFT Paradigms
*   **Adapter Tuning**: Inserts small, bottleneck neural network modules (adapter layers) into the transformer architecture. The original model weights are frozen, and only the adapters are trained. Low-Rank Adaptation (LoRA) [[entities/lora.md]] is a popular variant that learns low-rank matrix updates.
*   **Prompt Tuning**: Learns continuous, vector-valued "soft prompts" that are prepended to the input embeddings. Only these prompt vectors are optimized, while the base model remains entirely frozen. This differs from discrete prompt engineering.
*   **Prefix Tuning**: Similar to prompt tuning but prepends trainable vectors to the hidden states at every layer of the transformer, not just the input.
*   **Bias Tuning**: A simple method where only the bias terms within the model are fine-tuned, leaving all other parameters frozen (Source: Comprehensive Overview of LLMs.pdf).

## Comparative Performance
PEFT generally performs better than full fine-tuning in low-resource settings, matches it in medium-resource settings, and may underperform in high-resource settings. The choice of method involves a trade-off between parameter efficiency, performance, and inference latency (as some methods, like adapters, add computational overhead unless merged like LoRA) (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/efficient-llms.md]]
- [[entities/lora.md]]