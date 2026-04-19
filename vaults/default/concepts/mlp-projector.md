# MLP Projector

**Summary**: A simple Multi-Layer Perceptron (MLP) network that maps visual feature embeddings from a vision encoder into the semantic embedding space of a large language model (LLM) for multimodal fusion.
**Source Context**: 2602.02276v1.pdf

---

## Overview
In multimodal architectures like that of [[entities/kimi-k2-5.md]], the MLP Projector is a crucial component that acts as a "bridge" between the vision encoder and the language model. Visual features (e.g., from [[concepts/moonvit-3d.md]]) and text embeddings typically exist in different, incompatible vector spaces. The projector aligns them.

## Function
The projector takes the high-dimensional output features from the vision encoder and applies one or more linear layers (often with non-linear activation functions like GELU) to transform them. The goal is to project these visual features into the same dimensionality and semantic distribution as the text token embeddings used by the language model backbone (e.g., [[entities/kimi-k2-base-model.md]]).

## Design Rationale
Using an MLP for this projection is a common and effective design choice. It is:
*   **Simple and Parameter-Efficient**: Adds relatively few new parameters compared to the massive vision encoder and LLM.
*   **Flexible**: Can be trained to learn an effective mapping from the visual to linguistic space.
*   **Standardized**: A well-established component in many vision-language models (VLMs).

## Related pages
- [[concepts/multimodal-architecture-k2.5.md]]
- [[concepts/moonvit-3d.md]]
- [[entities/kimi-k2-base-model.md]]