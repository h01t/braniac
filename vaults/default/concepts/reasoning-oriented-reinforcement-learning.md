# Reasoning-Oriented Reinforcement Learning

**Summary**: A reinforcement learning phase focused on enhancing a model's capabilities in reasoning-intensive tasks like mathematics, coding, and logic.
**Source Context**: DeepSeek_R1.pdf

---

## Training Process
This phase is applied after the [[concepts/cold-start-rl-reasoning.md]] fine-tuning in the [[entities/deepseek-r1.md]] pipeline. It uses the same large-scale RL process as [[entities/deepseek-r1-zero.md]] but starts from a model already primed with readable reasoning data (Source: DeepSeek_R1.pdf).

## Reward Design
The reward function combines accuracy on reasoning tasks with a **language consistency reward**. The language reward is the proportion of target language words in the chain of thought, intended to mitigate language mixing. While ablation studies showed this alignment slightly degrades pure performance, it improves human readability (Source: DeepSeek_R1.pdf).

The final reward is the sum of the accuracy reward and the language consistency reward, guiding the model to produce correct and readable reasoning (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1.md]]
- [[concepts/cold-start-rl-reasoning.md]]
- [[concepts/rejection-sampling-sft-reasoning.md]]