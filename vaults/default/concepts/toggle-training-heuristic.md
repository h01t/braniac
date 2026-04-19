# Toggle Training Heuristic

**Summary**: A token-efficient reinforcement learning algorithm that alternates between budget-constrained and computation-scaling phases to train models that are both efficient and capable of leveraging extra inference-time compute.
**Source Context**: 2602.02276v1.pdf

---

## Overview
The Toggle heuristic is a training algorithm introduced as part of the [[concepts/reinforcement-learning-k2.5.md]] for [[entities/kimi-k2.5.md]]. It is designed to reconcile reasoning capabilities with computational efficiency, specifically addressing the length-overfitting phenomenon where models trained under rigid budget constraints fail to generalize to higher compute scales (Section 4.4.2) [2602.02276v1.pdf].

## Algorithm
Toggle alternates between two optimization phases every `m` training iterations:
*   **Phase 0 (Budget Limited Phase)**: The model is trained to solve problems within a task-dependent token budget. This constraint is conditionally applied only when the model's mean accuracy for a given problem exceeds a threshold `l`. This prevents premature sacrifice of quality for efficiency.
*   **Phase 1 (Standard Scaling Phase)**: The model generates responses up to the maximum token limit, encouraging it to leverage additional computation for better inference-time scaling.

The problem-dependent budget is estimated once at the start of training using the r-th percentile of token lengths among correct responses (Equation 2) [2602.02276v1.pdf].

## Purpose and Outcome
Toggle functions as a stochastic alternating optimization for a bi-objective problem (efficiency vs. capability). When evaluated on K2 Thinking, it resulted in:
*   A consistent 25-30% reduction in output tokens across benchmarks.
*   Negligible impact on performance.
*   Reduction of redundant Chain-of-Thought patterns.
*   Strong domain generalization (e.g., training on math/programming still reduced tokens on GPQA and MMLU-Pro).

## Related pages
- [[concepts/reinforcement-learning-k2.5.md]]
- [[entities/kimi-k2.5.md]]
- [[sources/2602-02276v1-technical-report.md]]