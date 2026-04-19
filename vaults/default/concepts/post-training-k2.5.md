# Post-Training (Kimi K2.5)

**Summary**: The phases of supervised fine-tuning and reinforcement learning applied to the pre-trained Kimi K2.5 model to align it for interactive reasoning, tool use, and agentic behavior.
**Source Context**: 2602.02276v1.pdf

---

## Overview
Following [[concepts/pre-training-pipeline-k2.5.md]], the [[entities/kimi-k2.5.md]] model undergoes post-training to specialize its capabilities for complex, real-world applications. This involves two main phases: Supervised Fine-Tuning (SFT) and Reinforcement Learning (RL), as described in Section 4.4 of the report [2602.02276v1.pdf].

## Supervised Fine-Tuning (SFT)
*   **Pipeline**: Follows the SFT pipeline established by Kimi K2.
*   **Data Generation**: High-quality candidate responses are synthesized from K2, K2 Thinking, and proprietary in-house expert models.
*   **Strategy**: Employs specialized pipelines for specific domains, integrating human annotation, advanced prompt engineering, and multi-stage verification.
*   **Outcome**: Produces a large-scale instruction-tuning dataset with diverse prompts and intricate reasoning trajectories, training the model to prioritize interactive reasoning and precise tool-calling.

## Reinforcement Learning (RL)
RL is a crucial phase for joint optimization across text and vision and to enable parallel-agent (PARL) capabilities. A Unified Agentic Reinforcement Learning Environment is developed for this purpose. The RL approach involves:
*   **Policy Optimization**: Uses a token-level clipping mechanism to mitigate off-policy divergence, essential for stabilizing long-horizon, multi-step tool-use reasoning. See [[concepts/reinforcement-learning-k2.5.md]] for details.
*   **Reward Functions**: Combines rule-based outcome rewards, budget-control rewards for token efficiency, and [[concepts/generative-reward-models.md]] for fine-grained evaluation aligned with internal values.
*   **Token-Efficient RL**: Employs the [[concepts/toggle-training-heuristic.md]] to reconcile reasoning quality with computational efficiency, alternating between budget-constrained and scaling-optimized phases.

## Purpose
This post-training regimen equips Kimi K2.5 with the advanced reasoning, tool-use, and [[concepts/parallel-agent-capability-induction.md]] capabilities necessary for autonomous agentic execution.

## Related pages
- [[entities/kimi-k2.5.md]]
- [[concepts/reinforcement-learning-k2.5.md]]
- [[concepts/supervised-fine-tuning.md]]
- [[sources/2602-02276v1-technical-report.md]]