# Reinforcement Learning (RL)
Reinforcement Learning is a machine learning training method where an agent learns to make decisions by taking actions in an environment to maximize cumulative reward. In the context of LLMs, RL is used to fine-tune models based on feedback, often to improve reasoning or alignment.

**Application in DeepSeek-R1:**
*   **DeepSeek-R1-Zero**: Represents a "pure RL" approach trained without relying on cold-start (pre-existing) demonstration data.
*   **DeepSeek-R1**: Leveraged cold-start data alongside iterative RL fine-tuning for enhanced performance.
*   Applying RL to models that were first **[[concepts/model-distillation.md|distilled]]** yielded significant further gains.
*   An experiment training Qwen-32B-Base with large-scale RL on math, code, and STEM data (producing DeepSeek-R1-Zero-Qwen-32B) resulted in performance on par with QwQ-32B-Preview, but was **significantly outperformed** by the distilled counterpart (DeepSeek-R1-Distill-Qwen-32B).

**Challenges and Limitations:**
*   Requires enormous computational power.
*   May not surpass the performance achievable through distillation from a more powerful teacher model.
*   Advancing the "boundaries of intelligence" may still require powerful base models and large-scale RL.

**Related Entities:** [[entities/DeepSeek-R1-Zero.md]], [[entities/DeepSeek-R1.md]], [[entities/DeepSeek-R1-Zero-Qwen-32B.md]]