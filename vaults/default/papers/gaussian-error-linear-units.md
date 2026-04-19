# Gaussian Error Linear Units (GELUs)

**Summary**: The 2016 research paper by Dan Hendrycks and Kevin Gimpel that introduced the Gaussian Error Linear Unit (GELU) activation function.
**Source Context**: Hendrycks, D., & Gimpel, K. (2016). Gaussian Error Linear Units (GELUs). *arXiv preprint arXiv:1606.08415*.

---

## Overview
This paper proposes the GELU activation function as a smooth, probabilistic alternative to the Rectified Linear Unit (ReLU). The authors motivate GELU by combining properties of dropout, zoneout, and ReLUs, modeling the input with a stochastic gating mechanism based on the Gaussian cumulative distribution function.

## Key Contributions
*   Formal definition of the GELU activation: `GELU(x) = x * P(X ≤ x)`, where `X ~ N(0, 1)`.
*   Presentation of a high-accuracy approximation using the hyperbolic tangent.
*   Empirical demonstration that GELU outperforms ReLU and ELU on several computer vision, natural language processing, and automatic speech recognition tasks.

## Impact
The GELU activation was later adopted as the default in seminal transformer-based models like [[BERT]] and [[GPT]], becoming a standard component in modern deep learning architectures.

## Related pages
- [[concepts/gelu.md]]
- [[concepts/activation-function.md]]
- [[ReLU]]
- [[ELU]]