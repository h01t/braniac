# Decoupled Encoder Process (DEP)

**Summary**: A training infrastructure innovation that decouples the forward and backward passes of the vision encoder from the main transformer backbone, enabling efficient and load-balanced multimodal training.
**Source Context**: 2602.02276v1.pdf

---

## Overview
The Decoupled Encoder Process (DEP) is a training infrastructure technique developed for efficiently training multimodal models like [[entities/kimi-k2.5.md]]. It addresses the load imbalance and memory fluctuations caused by variable-sized visual inputs (e.g., different image counts and resolutions) in standard Pipeline Parallelism (PP) setups (Section 4.5) [2602.02276v1.pdf].

## The Problem
In a typical multimodal PP setup, the vision encoder and text embedding are co-located in the first pipeline stage (Stage-0). The variability of visual input size causes drastic fluctuations in this stage's computational load and memory usage, forcing suboptimal manual configuration adjustments and preventing the reuse of optimized text-only parallel strategies.

## DEP Solution
Leveraging the visual encoder's unique position in the computation graph, DEP decomposes each training step into three distinct phases:

1.  **Balanced Vision Forward**:
    *   The vision encoder (replicated on all GPUs) forward pass is executed for all visual data in the global batch.
    *   Workload is evenly distributed across GPUs based on load metrics (e.g., patch counts).
    *   Intermediate activations are discarded, retaining only final output activations to minimize peak memory. Results are gathered to PP Stage-0.

2.  **Backbone Training**:
    *   The forward and backward passes for the main transformer backbone are performed.
    *   This phase can fully leverage any efficient parallel strategy validated in pure text training (inherited from Kimi K2).
    *   Gradients accumulate at the visual encoder output.

3.  **Vision Recomputation & Backward**:
    *   The vision encoder forward pass is recomputed (discarded activations from phase 1 are regenerated).
    *   A backward pass computes gradients for the vision encoder parameters.

## Benefits
*   **Load Balancing**: Eliminates imbalance caused by PP and variable visual token counts.
*   **Strategy Decoupling**: Allows the vision encoder and main backbone to be optimized with different parallel strategies.
*   **Efficiency**: Kimi K2.5 achieves a multimodal training efficiency of 90% relative to text-only training by seamlessly inheriting Kimi K2's parallel strategy.

## Related pages
- [[entities/kimi-k2.5.md]]
- [[concepts/training-infrastructure.md]]
- [[sources/2602-02276v1-technical-report.md]]