# Efficient LLMs

**Summary**: A collection of techniques aimed at reducing the computational cost, memory footprint, and inference latency of Large Language Models to make deployment more practical, often via parameter-efficient fine-tuning, quantization, or pruning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Deploying LLMs with hundreds of billions of parameters is prohibitively expensive. Research into efficient LLMs focuses on compressing models and reducing training costs while preserving performance.

## Parameter-Efficient Fine-Tuning (PEFT)
Instead of fully fine-tuning all model parameters, PEFT methods train a small subset, achieving good performance at lower cost. PEFT often outperforms full fine-tuning in low-resource scenarios.
*   **Adapter Tuning**: Adds small, trainable adapter layers within transformer blocks. Variants include sequential/parallel injection and mixtures of adapters (AdaMix). Low-Rank Adaptation (LoRA) [[entities/lora.md]] learns low-rank matrix updates that are fused with the frozen base model for inference.
*   **Prompt Tuning**: Learns continuous, trainable "soft" prompt vectors that are concatenated with input embeddings, avoiding the instability of manual prompts. P-Tuning uses a prompt encoder.
*   **Prefix Tuning**: Learns task-specific prefix vectors prepended to the hidden states in each transformer layer.
*   **Bias Tuning**: Fine-tunes only the bias terms in the model, which can be effective with small-to-medium training data (Source: Comprehensive Overview of LLMs.pdf).

## Quantization
Quantization reduces the numerical precision of model weights and activations, shrinking memory usage and speeding up inference.
*   **Post-Training Quantization (PTQ)**: Applied with minimal retraining. Methods like LLM.int8(), SmoothQuant, and OPTQ (which uses the Optimal Brain Compression algorithm) handle challenges like activation outliers specific to large models.
*   **Quantization-Aware Training (QAT)**: The model is fine-tuned after quantization to recover performance. QLoRA fine-tunes a 4-bit quantized model using LoRA, while LLM-QAT uses knowledge distillation with generated data (Source: Comprehensive Overview of LLMs.pdf).

## Pruning
Pruning removes less important weights to compress model size.
*   **Unstructured Pruning**: Removes individual weights. Wanda prunes based on weight magnitude scaled by input norm. Outlier Weighted Layerwise Sparsity (OWL) applies variable pruning ratios per layer based on outlier counts.
*   **Structured Pruning**: Removes groups of parameters (e.g., rows, columns). LLM-Pruner uses a 3-stage strategy to identify and remove dependent groups of neurons, followed by fine-tuning (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/parameter-efficient-fine-tuning.md]]
- [[entities/lora.md]]