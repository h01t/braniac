# Self-Evolution

**Summary**: The process by which a model improves its own capabilities through iterative learning mechanisms like reinforcement learning, without explicit external supervision.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1
The paper emphasizes the concept of self-evolution in the context of [[concepts/reinforcement-learning.md]]. Specifically, [[entities/deepseek-r1-zero.md]] is designed to explore whether LLMs can develop reasoning capabilities "without any supervised data, focusing on their self-evolution through a pure RL process."

## Mechanism
During RL training, the model generates responses, receives rewards based on accuracy and format, and updates its policy accordingly. Over time, this leads to the emergence of sophisticated reasoning behaviors like self-verification, reflection, and long [[concepts/chain-of-thought.md]] generation. The paper describes this as a natural emergence through RL.

## Evidence
The paper shows that DeepSeek-R1-Zero's performance on AIME 2024 steadily increases from 15.6% to 71.0% over RL steps (Figure 2). This improvement, along with the development of novel reasoning strategies, exemplifies self-evolution.

## Implications
Self-evolution via RL presents an alternative to supervised fine-tuning for capability development. It suggests that models can discover effective problem-solving strategies autonomously when guided by appropriate reward signals.

## Related Concepts
Self-evolution is closely tied to [[concepts/reinforcement-learning.md]] and [[concepts/chain-of-thought.md]], as the model iteratively refines its reasoning process.

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[concepts/reinforcement-learning.md]]
- [[sources/deepseek-r1-paper.md]]