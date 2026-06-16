# Decoupled Encoder Process (DEP)

**Summary**: A training infrastructure innovation that decouples the forward and backward passes of the vision encoder from the main transformer backbone, enabling efficient and load-balanced multimodal training.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

## Overview
DEP addresses load imbalance and memory fluctuations caused by variable-sized visual inputs in standard Pipeline Parallelism (PP) setups.

## The Problem
In typical multimodal PP, the vision encoder and text embedding are co-located in the first pipeline stage. Variable visual input size causes drastic fluctuations in computational load and memory usage.

## DEP Solution
DEP decomposes each training step into three phases:
1. Balanced Vision Forward
2. Backbone Training
3. Vision Recomputation & Backward

## Benefits
- Load balancing
- Strategy decoupling
- High training efficiency

## Related pages
- [[concepts/dep-training-strategy.md]]
- [[concepts/training-infrastructure.md]]