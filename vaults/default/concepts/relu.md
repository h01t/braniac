# Rectified Linear Unit (ReLU)

**Summary**: A piecewise linear activation function that outputs the input directly if it is positive, otherwise it outputs zero.
**Source Context**: Nair, V., & Hinton, G. E. (2010). Rectified linear units improve restricted boltzmann machines. In *Proceedings of the 27th international conference on machine learning (ICML-10)*.

---

## Overview
The Rectified Linear Unit (ReLU) is defined as `f(x) = max(0, x)`. It became the default activation function for many types of neural networks due to its simplicity, efficient computation, and mitigation of the vanishing gradient problem compared to sigmoidal functions.

## Key Properties
*   **Sparsity**: Introduces sparsity in activations as negative inputs are zeroed out.
*   **Vanishing Gradient**: The gradient for positive inputs is constant (1), which helps alleviate the vanishing gradient problem during backpropagation.
*   **Computational Efficiency**: Involves simple thresholding, making it faster than functions requiring exponentials (e.g., sigmoid, tanh).

## Limitations
*   **Dying ReLU Problem**: Neurons can become inactive (output zero for all inputs) if gradients consistently push weights into a regime where inputs are negative, stopping learning.
*   **Not Zero-Centered**: Its output is always non-negative, which can lead to optimization issues.

## Variants
Common variants were developed to address ReLU's limitations:
*   **Leaky ReLU**: Allows a small, non-zero gradient for negative inputs.
*   **Parametric ReLU (PReLU)**: Makes the slope for negative inputs a learnable parameter.
*   **Exponential Linear Unit (ELU)**: Smooths the function for negative inputs.

## Related pages
- [[concepts/activation-function.md]]
- [[Leaky ReLU]]
- [[Parametric ReLU (PReLU)]]
- [[Exponential Linear Unit (ELU)]]
- [[papers/gaussian-error-linear-units.md]]