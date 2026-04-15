# Activation Functions in LLMs

**Summary**: Activation functions introduce non-linearity into neural networks, and LLMs commonly use variants like GeLU and Gated Linear Units (GLU) to enable complex pattern learning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Common Activation Functions
Activation functions are crucial for the curve-fitting abilities of neural networks. Several types are used in LLMs:
*   **ReLU (Rectified Linear Unit)**: Defined as `ReLU(x) = max(0, x)`. It's simple and computationally efficient.
*   **GeLU (Gaussian Error Linear Unit)**: A smooth approximation of ReLU that is commonly used in transformer models like BERT and GPT. It is described as a combination of ReLU, dropout, and zoneout.
*   **GLU Variants (Gated Linear Units)**: A family of activation functions that use a gating mechanism. The basic GLU is defined as: `GLU(x) = (xW + b) ⊗ σ(xV + c)`, where `⊗` is element-wise multiplication and `σ` is the sigmoid function. Popular variants in LLMs include:
    *   **ReGLU**: Uses a ReLU gate.
    *   **GEGLU**: Uses a GeLU gate.
    *   **SwiGLU**: Uses a Swish gate (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/llm-architecture.md]]