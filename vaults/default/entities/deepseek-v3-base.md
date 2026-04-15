# DeepSeek-V3-Base

**Summary**: The base large language model developed by DeepSeek-AI, used as the foundation for training the DeepSeek-R1 reasoning models.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1 Development

DeepSeek-V3-Base serves as the starting point for both [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]]. It is a pre-trained model upon which reinforcement learning and fine-tuning are applied.

## Initial Performance

Before any post-training, the base model achieves a pass@1 score of 15.6% on the AIME 2024 reasoning benchmark. This baseline demonstrates the significant improvement brought by the subsequent RL training.

## Usage in Training Pipelines

- For DeepSeek-R1-Zero, RL is applied directly to this base model without any intermediate fine-tuning.
- For DeepSeek-R1, the base model is first fine-tuned with cold-start data before RL.

The paper implies that DeepSeek-V3-Base is a capable and scalable model, suitable for large-scale RL experiments.

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]