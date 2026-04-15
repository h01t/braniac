# MiniGPT-4

**Summary**: A multimodal LLM that aligns vision and language by training only a linear projection layer, keeping a ViT, Q-Former, and Vicuna LLM frozen.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

MiniGPT-4 is an example of a [[concepts/pre-training-for-mllms.md]] model. It deploys pre-trained and frozen components: a Vision Transformer (ViT), the Q-Former from BLIP-2, and the Vicuna LLM. It only trains the linear projection layer responsible for aligning the vision and language modalities [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/pre-training-for-mllms.md]]
- [[entities/blip-2.md]]