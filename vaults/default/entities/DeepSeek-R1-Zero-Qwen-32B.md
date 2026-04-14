# DeepSeek-R1-Zero-Qwen-32B
A 32-billion parameter model created by applying large-scale **[[concepts/reinforcement-learning-rl.md]]** directly to the Qwen-32B-Base model, without distillation.

**Training:**
*   Trained on math, code, and STEM data for over 10,000 steps.
*   Represents an attempt to achieve reasoning capabilities through RL alone.

**Performance:**
*   Achieved performance on par with [[entities/QwQ-32B-Preview.md]].
*   Was **significantly outperformed** by its distilled counterpart, **[[entities/DeepSeek-R1-Distill-Qwen-32B.md]]**, across all benchmarks.
*   This result underscored the conclusion that distillation from a more powerful model is a more economical and effective strategy than large-scale RL from scratch for smaller base models.

**Related Concepts:** [[concepts/reinforcement-learning-rl.md]]