# JAX

**Summary**: JAX is a high-performance numerical computing library for Python that provides automatic differentiation and just-in-time (JIT) compilation, enabling scalable machine learning research.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Core Capabilities
JAX is not specifically an LLM library but a foundational tool used to build and train them, including [[concepts/large-language-models.md]]. Its key features are:
*   **Automatic Differentiation**: Can differentiate native Python and NumPy functions, which is essential for gradient-based learning.
*   **Just-in-Time Compilation (via XLA)**: Compiles numerical programs to run efficiently on accelerators (GPUs/TPUs), leading to significant speed-ups.
*   **Functional Programming Paradigm**: Encourages a pure functional style, which can lead to more predictable and composable code for complex models (Source: Comprehensive Overview of LLMs.pdf, Section 2.7, referencing [83]).

## Use in LLM Research
JAX's efficiency and scalability have made it a popular backend for several machine learning frameworks used in LLM research, such as Google's Flax and EleutherAI's projects. It is listed among the commonly used libraries for LLM training (Source: Comprehensive Overview of LLMs.pdf, Section 2.7).

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/distributed-training.md]]