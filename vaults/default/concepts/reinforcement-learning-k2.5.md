# Reinforcement Learning (Kimi K2.5)

**Summary**: The policy optimization, reward modeling, and token-efficient training algorithms used to align Kimi K2.5 for complex agentic and multimodal tasks.
**Source Context**: 2602.02276v1.pdf

---

## Overview
Reinforcement Learning (RL) is a critical component of the [[concepts/post-training-k2.5.md]] process for [[entities/kimi-k2.5.md]]. It facilitates joint optimization across text and vision modalities and enables parallel-agent (PARL) capabilities. The RL framework is built upon a Unified Agentic Reinforcement Learning Environment (Section 4.4.2) [2602.02276v1.pdf].

## Policy Optimization
The model is optimized using a policy gradient objective with a novel token-level clipping mechanism (Equation 1) [2602.02276v1.pdf].
*   **Objective**: `L_RL(θ)` maximizes expected reward while controlling policy change.
*   **Clipping Mechanism**: Gradients are computed normally for tokens where the log-ratio of new to old policy probabilities falls within an interval `[a, b]`. Gradients for tokens outside this range are zeroed out.
*   **Purpose**: This explicitly bounds off-policy drift, stabilizing training for long-horizon, multi-step tool-use reasoning. It differs from standard PPO by relying strictly on the log-ratio, regardless of advantage sign.
*   **Optimizer**: The MuonClip optimizer is used to minimize this objective.

## Reward Functions
A combination of reward signals is used:
1.  **Rule-based Outcome Reward**: For tasks with verifiable solutions (e.g., reasoning, agentic tasks).
2.  **Budget-control Reward**: Optimizes token efficiency.
3.  **Task-Specific Visual Rewards**: For visual tasks like grounding, segmentation, OCR, and counting, using metrics like soft IoU, edit distance, and absolute difference.
4.  **Generative Reward Models (GRMs)**: Provide fine-grained evaluations for general-purpose tasks. See [[concepts/generative-reward-models.md]].

## Token-Efficient Reinforcement Learning
To manage the trade-off between computation (token count) and reasoning quality, the [[concepts/toggle-training-heuristic.md]] is proposed. It alternates between a budget-limited phase and a standard scaling phase, encouraging the model to be both efficient and capable of leveraging extra compute when available.

## Related pages
- [[concepts/post-training-k2.5.md]]
- [[concepts/generative-reward-models.md]]
- [[concepts/toggle-training-heuristic.md]]
- [[sources/2602-02276v1-technical-report.md]]