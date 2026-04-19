# Exponential Linear Unit (ELU)

**Summary**: An activation function that smooths the transition for negative inputs using an exponential curve, aiming to push mean activations closer to zero and improve learning dynamics.
**Source Context**: Clevert, D., Unterthiner, T., & Hochreiter, S. (2015). Fast and accurate deep network learning by exponential linear units (elus). *arXiv preprint arXiv:1511.07289*.

---

## Overview
The Exponential Linear Unit (ELU) is defined as:
`ELU(x) = x if x > 0 else α * (exp(x) - 1)`
where `α` is a hyperparameter, typically set to 1.0. It was proposed to address some limitations of the ReLU function, specifically the "dying ReLU" problem and the non-zero-centered output.

## Key Properties
*   **Smoothness**: The function is smooth for negative values, which can lead to faster convergence as the gradient is more informative.
*   **Negative Saturation**: For large negative inputs, the function saturates to `-α`, which adds noise robustness.
*   **Closer to Zero Mean**: The negative values help push the mean activation of units closer to zero, which is argued to speed up learning by bringing the natural gradient closer to the unit gradient.

## Advantages over ReLU
*   Mitigates the dying ReLU problem by allowing negative outputs with a non-zero gradient.
*   Produces activations with a mean closer to zero, potentially improving batch normalization performance and learning speed.

## Disadvantages
*   **Computational Cost**: The use of the exponential function `exp(x)` makes it computationally more expensive than ReLU for negative inputs.
*   **Hyperparameter**: Requires choosing the `α` parameter, though it is typically not tuned extensively.

## Related pages
- [[concepts/activation-function.md]]
- [[Rectified Linear Unit (ReLU)]]
- [[papers/gaussian-error-linear-units.md]]