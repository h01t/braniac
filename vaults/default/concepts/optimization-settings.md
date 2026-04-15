# Optimization Settings

**Summary**: The hyperparameters and techniques used during the training of large language models, including batch size, learning rate schedule, optimizer choice, and precision.
**Source Context**: Comprehensive Overview of LLMs.pdf (Tables 6 & 7)

---

Training [[concepts/large-language-models.md]] requires careful selection of optimization settings to ensure stable convergence and efficient use of computational resources. These settings differ between the pre-training phase (Table 6) and the [[concepts/instruction-tuning.md]] phase (Table 7).

## Common Pre-training Settings (Table 6)
*   **Batch Size**: Varies significantly, from 512 to several million tokens.
*   **Learning Rate (LR)**: Typically in the range of 1e-5 to 1e-4. A warmup period is almost universally used.
*   **LR Decay**: Cosine decay (often to 10% of the peak) is very common. Inverse square root and linear decay are also used.
*   **Optimizer**: [[concepts/adam-optimizer.md]] and [[concepts/adamw-optimizer.md]] are standard. AdaFactor is used in some models like T5.
*   **Precision**: [[concepts/mixed-precision-training.md]] (using FP16/BF16) is standard to reduce memory usage and speed up training.
*   **Regularization**: Weight decay (often 0.1), gradient clipping (often 1.0), and dropout (often 0.1) are frequently applied.

## Instruction Tuning Settings (Table 7)
Settings for instruction tuning generally use smaller batch sizes and learning rates (e.g., 1e-5 to 1e-3). Weight decay is typically not used in this phase. The number of training steps is orders of magnitude smaller than pre-training.

## Related pages
- [[concepts/mixed-precision-training.md]]
- [[concepts/learning-rate-schedule.md]]
- [[concepts/gradient-clipping.md]]