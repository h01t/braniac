# Model Distillation
Model distillation is a technique where a smaller "student" model is trained to mimic the behavior of a larger, more powerful "teacher" model. This process is used to transfer capabilities, such as complex reasoning, into more computationally efficient models.

**Key Findings from DeepSeek-R1:**
*   Distilling outputs from the powerful [[entities/DeepSeek-R1.md]] into smaller, dense models (e.g., 1.5B, 7B, 14B, 32B parameters) yielded excellent performance.
*   The distilled model **DeepSeek-R1-7B** (DeepSeek-R1-Distill-Qwen-7B) outperformed non-reasoning models like GPT-4o-0513 across multiple benchmarks.
*   Distillation proved to be a more economical and effective path to strong performance compared to applying large-scale [[concepts/reinforcement-learning-rl.md]] from scratch on a base model.

**Related Models:** [[entities/DeepSeek-R1-Distill-Qwen-7B.md]], [[entities/DeepSeek-R1-Distill-Qwen-32B.md]], [[entities/DeepSeek-R1-Zero-Qwen-32B.md]]
**Contrasted with:** [[concepts/reinforcement-learning-rl.md]]