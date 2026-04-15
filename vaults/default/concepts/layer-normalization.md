# Layer Normalization

**Summary**: Layer normalization is a technique used to stabilize and accelerate the training of deep neural networks by normalizing the activations across the features for each individual data sample.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Role in Transformers and LLMs
Layer normalization is an integral component of the [[concepts/transformer-architecture.md]] and, by extension, [[concepts/large-language-models.md]]. It is applied to the outputs of the attention and feed-forward layers within each transformer block to maintain stable gradients and faster convergence (Source: Comprehensive Overview of LLMs.pdf, Section 2.5, referencing [64, 76]).

## Variants
*   **RMSNorm (Root Mean Square Layer Normalization)**: A simplification that normalizes using the root mean square statistic, removing the mean-centering operation, which can be more computationally efficient (Source: Comprehensive Overview of LLMs.pdf, referencing [77]).
*   **Pre-Layer Normalization (Pre-Norm)**: A common configuration in LLMs where the normalization layer is applied *before* the multi-head attention and feed-forward sub-layers, rather than after. This has been shown to provide greater training stability for very deep models (Source: Comprehensive Overview of LLMs.pdf, Section 2.5, referencing [78]).
*   **DeepNorm**: A variant designed to fix issues with exploding gradients in very deep pre-norm transformers by combining pre-norm with a special initialization and residual connection scaling (Source: Comprehensive Overview of LLMs.pdf, referencing [79]).

## Importance for Training Stability
Proper normalization is critical for training deep networks like LLMs. The choice of normalization scheme and its placement (pre-norm vs. post-norm) is a key architectural decision.

## Related pages
- [[concepts/transformer-architecture.md]]
- [[concepts/large-language-models.md]]