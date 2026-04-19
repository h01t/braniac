# Parametric ReLU (PReLU)

**Summary**: A generalization of the Leaky ReLU where the slope of the function for negative inputs is a learnable parameter, allowing the activation function to adapt during training.
**Source Context**: He, K., Zhang, X., Ren, S., & Sun, J. (2015). Delving deep into rectifiers: Surpassing human-level performance on imagenet classification. In *Proceedings of the IEEE international conference on computer vision (ICCV)*.

---

## Overview
The Parametric ReLU (PReLU) is defined as:
`PReLU(x) = x if x > 0 else a * x`
where `a` is a learnable parameter (or a vector of parameters, one per channel). It extends the Leaky ReLU by making the negative slope part of the model's optimization.

## Key Properties
*   **Adaptive**: The slope parameter `a` is updated via backpropagation, allowing the network to learn the most appropriate activation shape for negative inputs.
*   **Minimal Overhead**: Adds only a small number of additional parameters to the model (one per channel or one shared).
*   **Default Initialization**: The parameter `a` is typically initialized to a small value (e.g., 0.25).

## Advantages over Leaky ReLU
*   Can potentially achieve better performance by learning the optimal negative slope for the task, rather than relying on a fixed heuristic.
*   Maintains computational efficiency during inference.

## Disadvantages
*   **Risk of Overfitting**: Introduces additional parameters, which could lead to overfitting on small datasets if not regularized.
*   **Increased Complexity**: Adds a small amount of optimization complexity compared to fixed-activation functions.

## Related pages
- [[concepts/activation-function.md]]
- [[Rectified Linear Unit (ReLU)]]
- [[Leaky ReLU]]