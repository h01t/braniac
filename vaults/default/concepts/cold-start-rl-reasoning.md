# Cold Start in RL for Reasoning Models

**Summary**: A training methodology that initializes reinforcement learning with a small amount of high-quality, human-friendly chain-of-thought data to improve readability and accelerate convergence.
**Source Context**: DeepSeek_R1.pdf

---

## Purpose and Design
The cold-start phase was developed for [[entities/deepseek-r1.md]] to address issues like poor readability and language mixing observed in [[entities/deepseek-r1-zero.md]]. It involves fine-tuning the base model on thousands of curated reasoning examples before starting RL training (Source: DeepSeek_R1.pdf).

The cold-start data is designed for readability, using a specific output format: `|special_token|<reasoning_process>|special_token|<summary>`. This format includes a clear reasoning chain (CoT) and a final summary, making the output more user-friendly (Source: DeepSeek_R1.pdf).

## Advantages
Key advantages over the zero-shot approach include better readability and the potential for improved performance by incorporating human priors into the data pattern. This sets a stronger foundation for the subsequent [[concepts/reasoning-oriented-reinforcement-learning.md]] phase (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1.md]]
- [[entities/deepseek-r1-zero.md]]
- [[concepts/reasoning-oriented-reinforcement-learning.md]]