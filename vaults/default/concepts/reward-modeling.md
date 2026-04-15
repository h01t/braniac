# Reward Modeling

**Summary**: The design of reward signals to guide reinforcement learning, which in DeepSeek-R1 uses rule-based accuracy and format rewards instead of neural reward models.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1
Reward modeling provides the optimization signal for [[concepts/reinforcement-learning.md]] in training DeepSeek-R1 models. The paper deliberately uses simple, rule-based rewards to avoid the complexities and potential reward hacking associated with neural reward models.

## Reward Components
As described in the paper, the reward system for [[entities/deepseek-r1-zero.md]] consists of:
1. **Accuracy Rewards**: For tasks with deterministic outcomes (e.g., math problems, coding challenges), correctness is verified via rule-based methods (e.g., checking final answer format, compiling code against test cases). This provides a clear signal for correct solutions.
2. **Format Rewards**: Enforce structural constraints, such as requiring the model to enclose its reasoning within `<think>` and `</think>` tags and the answer within `<answer>` tags. This ensures output consistency.

## Design Rationale
The paper states that neural reward models were not used because they may suffer from reward hacking during large-scale RL and require additional training resources. Rule-based rewards are seen as more stable and straightforward for the RL pipeline.

## Impact on Training
These rewards guide the model to develop effective [[concepts/chain-of-thought.md]] reasoning and correct answer formatting. The steady performance improvements observed (e.g., on AIME) attest to the effectiveness of this reward design.

## Related Concepts
Reward modeling is a key element of RL, interacting with the [[entities/grpo.md]] algorithm and influencing [[concepts/self-evolution.md]].

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[entities/deepseek-r1-zero.md]]
- [[sources/deepseek-r1-paper.md]]