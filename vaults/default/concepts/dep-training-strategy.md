# DEP Training Strategy

**Summary**: The Decoupled Parallel (DEP) training strategy is a three-phase method for efficiently training multimodal models by separating and parallelizing the vision encoder and language backbone computations.
**Source Context**: 2602.02276v1.pdf (Kimi K2.5 Technical Report).

---

## Strategy Overview
The DEP (Decoupled Parallel) strategy is designed to train multimodal models like [[entities/kimi-k2-5.md]] efficiently by balancing computational load between the vision encoder and the main transformer backbone. It enables the use of efficient parallelization techniques validated in pure text training.

## The Three Phases
1.  **Vision Encoder Forward**: The vision encoder processes input images, and its output features are cached. Intermediate activations from this phase are discarded to save memory.
2.  **Main Backbone Forward & Backward**: Using the cached visual features, the main transformer backbone executes its forward and backward passes. Gradients are computed for the backbone parameters and are also accumulated at the output of the vision encoder.
3.  **Vision Recomputation & Backward**: The vision encoder forward pass is re-computed (recomputed from the input), followed by a backward pass to calculate gradients for the vision encoder parameters, using the gradients accumulated from the previous phase.

## Benefits
This strategy achieves two primary goals:
*   **Load Balancing**: It decouples the optimization of the vision encoder and the main backbone, allowing their training to be balanced.
*   **Training Efficiency**: For [[entities/kimi-k2-5.md]], this method achieved a multimodal training efficiency of 90% relative to text-only training. It seamlessly inherits parallel strategies from its predecessor (K2).

## Related pages
- [[entities/kimi-k2-5.md]]