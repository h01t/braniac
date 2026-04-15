# BLOOM

**Summary**: A 176-billion parameter, open-source, causal decoder-only language model trained on the ROOTS corpus, notable for its architectural tweaks like ALiBi positional embeddings.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

**Architecture & Purpose**: BLOOM (BigScience Large Open-science Open-access Multilingual Language Model) was created as an open-source initiative to replicate and study large-scale language models. It is a causal decoder-only model.

**Key Architectural Features**:
*   **ALiBi (Attention with Linear Biases)**: Used instead of traditional positional embeddings. ALiBi allows the model to extrapolate to sequence lengths longer than those seen during training.
*   **Embedding Layer Normalization**: An additional normalization layer is applied after the initial token embedding layer, a modification suggested by the `bitsandbytes` library to stabilize training.
*   These changes were found to improve training stability and downstream task performance.

**Training Data**: It was trained on the ROOTS corpus, a large-scale multilingual dataset. The model was designed to be transparent and accessible to the research community.

## Related pages
- [[concepts/decoder-only-architectures.md]]
- [[concepts/positional-embeddings.md]]