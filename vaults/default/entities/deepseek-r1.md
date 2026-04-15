# DeepSeek-R1

**Summary**: A family of large language models developed by DeepSeek, optimized for complex reasoning through a combination of cold-start data and iterative reinforcement learning fine-tuning.
**Source Context**: DeepSeek_R1.pdf

---

## Model Overview
**DeepSeek-R1** represents the more powerful model series introduced in the paper, compared to the [[entities/deepseek-r1-zero.md]] family. It is not a single model but a series of models built using a specific methodology.

## Development Methodology
The key to DeepSeek-R1's performance is its two-stage training approach:
1.  **Cold-Start Initialization**: The model is first initialized using high-quality, human- or model-generated reasoning data. This provides a strong starting point.
2.  **Iterative Reinforcement Learning Fine-Tuning**: The initialized model then undergoes large-scale [[concepts/reinforcement-learning-rl-for-reasoning.md]] to further refine and enhance its reasoning capabilities (Source: DeepSeek_R1.pdf).

This combination proved more effective than pure RL from scratch.

## Performance
According to the paper, **DeepSeek-R1 achieves performance comparable to OpenAI-o1-1217** on a range of reasoning tasks (Source: DeepSeek_R1.pdf).

## Role as a Teacher Model
A significant use of DeepSeek-R1 was as a **teacher model** for [[concepts/knowledge-distillation.md]]. The team used it to generate 800,000 training samples, which were then used to create a family of highly capable smaller models, the **DeepSeek-R1-Distill** series (e.g., [[entities/deepseek-r1-distill-qwen-7b.md]], [[entities/deepseek-r1-distill-qwen-32b.md]]) (Source: DeepSeek_R1.pdf).

## Limitations
As noted in the paper, DeepSeek-R1 has limitations compared to its base model (DeepSeek-V3) in areas like function calling, multi-turn dialogue, and complex role-playing. It is also sensitive to prompts and optimized primarily for Chinese and English (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[concepts/reinforcement-learning-rl-for-reasoning.md]]
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1-distill-qwen-7b.md]]