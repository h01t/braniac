# Reinforcement Learning from Human Feedback (RLHF)

**Summary**: A multi-stage fine-tuning process used for alignment-tuning, where a reward model trained on human preferences guides the optimization of an LLM via reinforcement learning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

RLHF is a prominent method for **alignment-tuning**, making LLMs more helpful, honest, and harmless (HHH). It involves training a secondary model to approximate human preferences, which then provides a training signal for the main LLM.

The process typically involves three key steps, often performed iteratively:
1.  **Supervised Fine-Tuning (SFT)**: A pre-trained model is first fine-tuned on a high-quality dataset of human demonstrations (prompts and desired responses).
2.  **Reward Modeling (RM)**: A separate "reward model" is trained to score LLM-generated responses. It is trained as a classifier on human-annotated data where humans rank multiple model outputs for the same prompt based on the HHH criteria. The reward model learns to predict human preference scores.
3.  **Reinforcement Learning (RL)**: The SFT model is further optimized using a reinforcement learning algorithm (like Proximal Policy Optimization - PPO). The trained reward model provides the reward signal, incentivizing the LLM to generate responses that score highly according to human preferences. The process repeats until convergence.

## Related pages
- [[concepts/alignment-tuning.md]]
- [[concepts/fine-tuning.md]]