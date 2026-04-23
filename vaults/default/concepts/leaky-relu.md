# Leaky ReLU

**Summary**: A variant of the Rectified Linear Unit (ReLU) activation function that introduces a small, non-zero gradient for negative inputs to mitigate the "dying ReLU" problem.
**Source Context**: Maas, A. L., Hannun, A. Y., & Ng, A. Y. (2013). Rectifier nonlinearities improve neural network acoustic models. In *Proceedings of the 30th international conference on machine learning (ICML-13)*.

---

## Overview
The Leaky ReLU is defined as:
`LeakyReLU(x) = x if x > 0 else α * x`
where `α` is a small, fixed constant (e.g., 0.01). It was proposed to prevent neurons from "dying" (i.e., outputting zero for all inputs) by ensuring a small gradient flows even when the unit is not active.

## Key Properties
*   **Mitigates Dying ReLU**: The non-zero slope for `x < 0` ensures gradients can continue to propagate, keeping neurons active during training.
*   **Computational Efficiency**: Remains computationally cheap, similar to ReLU, requiring only a simple multiplication for negative inputs.
*   **Non-Saturating**: Does not saturate for negative inputs, helping to alleviate vanishing gradients.

## Advantages over ReLU
*   Reduces the risk of the dying ReLU problem.
*   Maintains the computational efficiency of the original ReLU.

## Disadvantages
*   **Hyperparameter**: Introduces the need to choose or tune the `α` (leak) parameter, though it is often set to a small constant like 0.01.
*   **Empirical Performance**: Does not consistently outperform ReLU across all tasks; benefits are often dataset and architecture dependent.

## Related pages
- *[Page for 'activation-function' not found]*
- *[Page for 'Rectified Linear Unit (ReLU)' not found]*
- *[Page for 'Parametric ReLU (PReLU)' not found]*