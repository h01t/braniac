# Self-Evolution in Reinforcement Learning

**Summary**: The autonomous improvement of a model's reasoning capabilities through reinforcement learning initiated directly from a base model, without a supervised fine-tuning stage.
**Source Context**: DeepSeek_R1.pdf

---

## Process and Observation
The self-evolution process, as demonstrated by [[entities/deepseek-r1-zero.md]], provides a clear view of how a model's reasoning improves over time by using RL from a base model. This approach removes the influence of an initial supervised fine-tuning stage, allowing researchers to monitor intrinsic development (Source: DeepSeek_R1.pdf).

A key observation is the consistent increase in the model's "thinking time"—the length of its reasoning chain—during training. This is not externally adjusted but emerges naturally as the model learns to solve more complex tasks by generating hundreds to thousands of reasoning tokens (Source: DeepSeek_R1.pdf).

## Emergent Behaviors
Sophisticated problem-solving behaviors emerge spontaneously as test-time computation increases. These include **reflection** (reevaluating previous steps) and exploring alternative approaches. These behaviors are not programmed but result from the model's interaction with the RL environment, significantly enhancing its reasoning capabilities (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[concepts/aha-moment-ai-reasoning.md]]
- [[concepts/reasoning-oriented-reinforcement-learning.md]]