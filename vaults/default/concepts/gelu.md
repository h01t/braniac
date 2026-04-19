# GELU

**Summary**: The Gaussian Error Linear Unit (GELU) is a smooth, non-linear activation function commonly used in modern neural networks, particularly in transformer architectures.
**Source Context**: General machine learning knowledge.

---

## Overview
The GELU activation function multiplies its input by the cumulative distribution function of the Gaussian distribution. This creates a smooth, probabilistic "gating" mechanism, where inputs are weighted by their magnitude. It is often approximated for efficient computation.

## Function
The GELU function is defined as `GELU(x) = x * Φ(x)`, where `Φ(x)` is the cumulative distribution function of the standard Gaussian distribution. A common approximation is `0.5 * x * (1 + tanh[sqrt(2/π) * (x + 0.044715 * x^3)])`.

## Design Rationale
GELU was proposed as an alternative to ReLU and has become the default activation in models like BERT and GPT. It is favored because:
*   It is **smooth and differentiable everywhere**, which can benefit optimization.
*   Its **non-linearity is probabilistic**, potentially allowing the network to model more nuanced interactions.
*   It often provides **slightly better performance** than ReLU in deep networks.

## Related pages
- [[concepts/mlp-projector.md]]
- [[concepts/activation-function.md]]