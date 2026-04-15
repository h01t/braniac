# Pre-training for MLLMs

**Summary**: A construction stream for multimodal LLMs that aims to support different modalities using unified, end-to-end models, often by aligning frozen pre-trained encoders.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

This stream of [[concepts/multimodal-llms.md]] development focuses on building unified, end-to-end models. A common technique involves using frozen, pre-trained models for individual modalities and learning alignment between them [Source: Comprehensive Overview of LLMs.pdf].

Key examples include:
*   **Flamingo**: Applies gated cross-attention to fuse features from a frozen visual encoder and a frozen LLM [Source: Comprehensive Overview of LLMs.pdf].
*   **BLIP-2**: Proposes a two-stage strategy to pre-train a Querying Transformer (Q-Former) for vision-language alignment, bootstrapping from a frozen visual encoder and later a frozen LLM [Source: Comprehensive Overview of LLMs.pdf].
*   **MiniGPT-4**: Uses pre-trained and frozen components (ViT, Q-Former, and Vicuna LLM), training only a linear projection layer for modality alignment [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/multimodal-llms.md]]
- [[entities/flamingo.md]]
- [[entities/blip-2.md]]
- [[entities/minigpt-4.md]]