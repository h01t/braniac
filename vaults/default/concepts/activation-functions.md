# Activation Functions

**Summary**: Activation functions introduce non-linearity into neural networks, enabling them to learn complex patterns. Different activation functions are used in the feed-forward layers of Large Language Models.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Common Activation Functions in LLMs
*   **ReLU (Rectified Linear Unit)**: Defined as `ReLU(x) = max(0, x)`. It's simple and computationally efficient but can suffer from the "dying ReLU" problem where neurons output zero (Source: Comprehensive Overview of LLMs.pdf, Section 2.4, referencing [70]).
*   **GELU (Gaussian Error Linear Unit)**: A smooth approximation of ReLU that is commonly used in transformers like BERT and GPT. It is motivated by properties of dropout and zoneout (Source: Comprehensive Overview of LLMs.pdf, referencing [71, 72, 73]).
*   **GLU Variants (Gated Linear Units)**: These functions use a gating mechanism. The base GLU is defined as `GLU(x) = (xW + b) ⊗ σ(xV + c)`, where `⊗` is element-wise multiplication and `σ` is the sigmoid function. Variants include:
    *   **ReGLU**: Uses ReLU for the gating half.
    *   **GEGLU**: Uses GELU for the gating half.
    *   **SwiGLU**: Uses the Swish activation for the gating half (Source: Comprehensive Overview of LLMs.pdf, Section 2.4, referencing [74, 75]).

## Impact on Model Performance
The choice of activation function can influence the training stability, convergence speed, and final performance of [[concepts/large-language-models.md]]. GLU variants have been shown to offer benefits in some model architectures.

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/transformer-architecture.md]]