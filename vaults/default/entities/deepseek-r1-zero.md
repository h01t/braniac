# DeepSeek-R1-Zero

**Summary**: A reasoning model trained solely via reinforcement learning from a base model, without an initial supervised fine-tuning stage, demonstrating autonomous self-evolution of reasoning capabilities.
**Source Context**: DeepSeek_R1.pdf

---

## Training Approach
DeepSeek-R1-Zero is created by applying large-scale [[concepts/reasoning-oriented-reinforcement-learning.md]] directly to the [[entities/deepseek-v3-base.md]]. This zero-shot RL approach allows researchers to observe the model's intrinsic development without the influence of a supervised fine-tuning stage (Source: DeepSeek_R1.pdf).

## Key Characteristics and Phenomena
The model naturally learns to solve increasingly complex tasks by generating longer reasoning chains ("thinking time"). During training, sophisticated behaviors like **reflection** and exploration of alternative approaches emerge spontaneously (Source: DeepSeek_R1.pdf).

A notable observed phenomenon is the [[concepts/aha-moment-ai-reasoning.md]], where an intermediate version of the model learns to pause and reevaluate its problem-solving strategy (Source: DeepSeek_R1.pdf).

## Drawbacks
Despite strong reasoning capabilities, DeepSeek-R1-Zero suffers from issues like poor readability and language mixing in its outputs, which motivated the development of the more user-friendly [[entities/deepseek-r1.md]] (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/self-evolution-rl.md]]
- [[entities/deepseek-v3-base.md]]
- [[entities/deepseek-r1.md]]