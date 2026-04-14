# Reinforcement Learning for Reasoning
**Source:** [[sources/DeepSeek_R1.md]]

Reinforcement Learning (RL) is used to enhance the reasoning capabilities of Large Language Models (LLMs) without relying on large supervised datasets. In the context of DeepSeek-R1, RL incentivizes the model to develop complex reasoning behaviors such as **[[concepts/Chain_of_Thought.md|Chain-of-Thought (CoT)]]** reasoning, self-verification, and reflection.

## Key Insights from DeepSeek-R1
- **Pure RL Training:** **[[entities/DeepSeek_R1_Zero.md]]** demonstrates that reasoning capabilities can emerge through large-scale RL alone, without any **[[concepts/Cold_Start.md|supervised fine-tuning (SFT)]]**.
- **Algorithm:** The paper uses **[[concepts/Group_Relative_Policy_Optimization.md|Group Relative Policy Optimization (GRPO)]]**, which eliminates the need for a critic model by estimating baselines from group scores.
- **Reward Design:** Uses rule-based rewards for accuracy (e.g., checking final answers) and format (e.g., ensuring reasoning is within `<think>` tags). This avoids issues with neural reward models (e.g., reward hacking).
- **Self-Evolution:** The model naturally evolves reasoning strategies during RL, leading to significant performance gains on benchmarks like AIME 2024.

## Applications
- Improving performance on mathematical, coding, and scientific reasoning tasks.
- Enabling models to generate longer, more coherent reasoning traces.
- Paving the way for future RL-based post-training methods in LLMs.