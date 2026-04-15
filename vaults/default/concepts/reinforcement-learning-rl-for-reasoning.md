# Reinforcement Learning (RL) for Reasoning

**Summary**: The use of large-scale reinforcement learning techniques to directly optimize large language models for complex reasoning tasks.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1 Development
**Reinforcement Learning (RL)** is the core methodology explored in the DeepSeek-R1 paper for enhancing the innate reasoning abilities of language models. The research applied RL on a large scale, training models for **over 10,000 steps** on datasets comprising math, code, and STEM subjects (Source: DeepSeek_R1.pdf).

The paper investigates two RL paradigms:
1.  **Pure RL (DeepSeek-R1-Zero)**: Training a base model using RL from the start, without relying on any pre-existing "cold-start" demonstration data.
2.  **RL with Cold-Start (DeepSeek-R1)**: Leveraging high-quality reasoning data to initialize the model before applying iterative RL fine-tuning, which yielded a more powerful final model (Source: DeepSeek_R1.pdf).

## Performance and Limitations
The research found that while large-scale RL is powerful for advancing large models, it has limitations when applied to smaller models from scratch.
*   A 32B base model (Qwen-32B-Base) trained with large-scale RL (DeepSeek-R1-Zero-Qwen-32B) achieved performance only on par with [[entities/qwq-32b-preview.md]], another instruction-tuned model (Source: DeepSeek_R1.pdf, Table 6).
*   This RL-trained model was **significantly outperformed by a distilled model** of the same size ([[entities/deepseek-r1-distill-qwen-32b.md]]), which learned from the outputs of the larger RL-optimized teacher (Source: DeepSeek_R1.pdf).
*   The conclusion was that for smaller models, [[concepts/knowledge-distillation.md]] from a powerful RL-trained model is more economical and effective than attempting large-scale RL training on the small model itself (Source: DeepSeek_R1.pdf).

## Future Direction
The paper posits that **advancing beyond the current boundaries of intelligence may still require more powerful base models and larger-scale reinforcement learning**, suggesting RL remains crucial for pushing the state-of-the-art, even if distillation is better for creating efficient smaller models (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]