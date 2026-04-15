# LLaMA-2-Chat

**Summary**: The aligned, conversational version of Meta's LLaMA 2 model, refined using Reinforcement Learning from Human Feedback (RLHF) with advancements in safety and helpfulness.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.2.3 and Table 2.

---

**LLaMA-2-Chat** is a product of extensive alignment research building upon the base LLaMA 2 pre-trained model.

## Alignment Approach
LLaMA-2-Chat's alignment process advanced the standard RLHF pipeline:
1.  **Supervised Fine-Tuning (SFT)**: Initial fine-tuning on high-quality chat demonstrations.
2.  **Reward Modeling**: Training separate reward models for **helpfulness** and **safety**.
3.  **Iterative Refinement**: Using a combination of **Rejection Sampling** and **Proximal Policy Optimization (PPO)**. The initial versions were refined with rejection sampling, and later iterations used PPO on top of the rejection-sampled outputs.

## Key Findings & Insights
*   **Safety Learning**: The model learns to write safe responses through fine-tuning on safe demonstrations. The additional RLHF step further improves safety and makes the model **less prone to jailbreak attacks**.
*   **Multi-Reward Design**: Dividing the reward signal into helpfulness and safety components allowed for more nuanced alignment.

## Related pages
- [[concepts/alignment.md]]
- [[concepts/reinforcement-learning-from-human-feedback.md]]
- [[entities/llama.md]]