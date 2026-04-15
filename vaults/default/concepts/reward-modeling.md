# Reward Modeling for Reinforcement Learning

**Summary**: The design of reward functions that provide training signals in reinforcement learning, guiding models towards desired behaviors like correctness and proper output format.
**Source Context**: DeepSeek_R1.pdf

---

## Components of Reward Modeling

In the training of DeepSeek-R1 models, the reward model consists of two primary types:

1. **Accuracy Rewards**: These are rule-based rewards that verify the correctness of the model's final answer. For mathematical problems, the answer is checked against a deterministic result. For coding problems, compilers and test cases provide feedback.
2. **Format Rewards**: These enforce a specific output structure. The model is rewarded for placing its reasoning process within `<think>` tags and the final answer within `<answer>` tags.

## Design Choices and Rationale

The authors intentionally avoided using neural reward models due to concerns about reward hacking and the additional training complexity. Instead, they relied on simple, rule-based rewards which proved effective for large-scale RL training.

## Role in Training Dynamics

These rewards are the sole source of training signal for the RL process. They incentivize the model to not only produce correct answers but also to adhere to a structured reasoning format, which facilitates the emergence of complex reasoning behaviors.

## Impact on Model Behavior

The reward design is crucial for the self-evolution observed in [[entities/deepseek-r1-zero.md]], where the model naturally developed long chain-of-thought and self-verification without any supervised data.

## Related pages
- [[concepts/reinforcement-learning-reasoning.md]]
- [[entities/deepseek-r1-zero.md]]