# Li et al., BLIP-2 (2023)

**Summary**: Presents BLIP-2, a generic and efficient pre-training strategy that bootstraps vision-language pre-training from off-the-shelf frozen image encoders and frozen large language models, using a lightweight Querying Transformer to bridge the modality gap.
**Source Context**: Li, J., Li, D., Savarese, S., Hoi, S. *BLIP-2: Bootstrapping language-image pre-training with frozen image encoders and large language models*, arXiv:2301.12597 (2023). From Comprehensive Overview of LLMs.pdf (citation 270)

---

BLIP-2 provides a cost-effective recipe for building state-of-the-art [[concepts/multimodal-models.md]]. Instead of end-to-end training of massive vision-language models from scratch, it keeps both the vision encoder (e.g., CLIP ViT) and the LLM (e.g., FlanT5, OPT) frozen. It pre-trains a relatively small Transformer-based "Q-Former" that learns to extract visual features most relevant to the LLM.

This approach dramatically reduces training costs and enables the rapid combination of any advanced vision encoder with any LLM, accelerating progress in multimodal AI.

## Related pages
- [[concepts/multimodal-models.md]]
- [[concepts/vision-encoders.md]]
- [[entities/li-j.md]]