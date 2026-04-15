# Knowledge Distillation

**Summary**: A technique where a larger, more powerful "teacher" model is used to train a smaller "student" model, effectively transferring capabilities.
**Source Context**: DeepSeek_R1.pdf

---

## Definition and Application in DeepSeek-R1
In the context of the DeepSeek-R1 research, **knowledge distillation** refers to using the outputs of the large, reasoning-optimized [[entities/deepseek-r1.md]] model to generate training data for smaller, dense models. This process is also called "SFT-distillation" (Supervised Fine-Tuning distillation) in the paper.

The researchers generated **800,000 training samples** using DeepSeek-R1 as the teacher (Source: DeepSeek_R1.pdf).

## Effectiveness and Findings
The paper presents a major conclusion: **distillation was far more effective and economical than training small models from scratch using large-scale reinforcement learning**.

*   A distilled 7B model (DeepSeek-R1-Distill-Qwen-7B) was able to "outperform non-reasoning models like GPT-4o-0513 across the board" (Source: DeepSeek_R1.pdf).
*   A distilled 32B model significantly outperformed a 32B base model (QwQ-32B-Preview) trained with over 10,000 steps of large-scale RL (DeepSeek-R1-Zero-Qwen-32B) on all evaluated [[concepts/benchmarking.md]] (Source: DeepSeek_R1.pdf, Table 6).
*   The results demonstrate that distilling from a more powerful model yields excellent results, whereas achieving similar performance through RL alone on a small model requires enormous compute and may not even reach distillation's performance (Source: DeepSeek_R1.pdf).

## Comparison with Reinforcement Learning
The study conducted a controlled experiment, concluding:
1.  Distilling powerful models into smaller ones is excellent.
2.  Advancing the boundaries of intelligence may still require more powerful base models and larger-scale RL, but for creating capable smaller models, distillation is superior (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1-distill-qwen-7b.md]]
- [[entities/deepseek-r1-distill-qwen-32b.md]]
- [[concepts/reinforcement-learning-rl-for-reasoning.md]]
- [[concepts/benchmarking.md]]