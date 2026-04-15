# LoRA (Low-Rank Adaptation)

**Summary**: A widely-used parameter-efficient fine-tuning method that approximates weight updates with low-rank matrices, allowing efficient adaptation of large models with minimal overhead.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Low-Rank Adaptation (LoRA) is a prominent [[concepts/parameter-efficient-fine-tuning.md]] technique. It operates on the hypothesis that weight updates during adaptation have a low "intrinsic rank." Instead of fine-tuning the full weight matrices (e.g., `W` in attention layers), LoRA freezes the original weights and injects trainable rank decomposition matrices.

## Key Features
*   **Efficiency**: Only the low-rank matrices are trained, drastically reducing the number of trainable parameters (often <1% of the original model).
*   **No Inference Latency**: After training, the learned low-rank matrices can be merged back into the original weights, resulting in zero additional inference overhead compared to the base model. This is an advantage over adapter layers that remain separate.
*   **Versatility**: LoRA has been successfully combined with quantization methods, such as in QLoRA, which fine-tunes a 4-bit quantized model using LoRA's low-rank updates (Source: Comprehensive Overview of LLMs.pdf).

LoRA has become a standard tool for cost-effective adaptation of large language models.

## Related pages
- [[concepts/parameter-efficient-fine-tuning.md]]
- [[concepts/efficient-llms.md]]