# Alayrac et al., Flamingo (2022)

**Summary**: Introduces Flamingo, a family of few-shot learning models that seamlessly blend powerful pretrained vision encoders and large language models to handle a variety of visual and language tasks with minimal task-specific adaptation.
**Source Context**: Alayrac, J.-B., Donahue, J., Luc, P., et al. *Flamingo: a visual language model for few-shot learning*, NeurIPS 2022. From Comprehensive Overview of LLMs.pdf (citation 269)

---

Flamingo is a pioneering [[concepts/multimodal-models.md]] that sets a strong benchmark for few-shot learning on vision-language tasks. Its key architectural innovation is the Perceiver Resampler, which bridges a frozen vision encoder (like a CNN or ViT) with a frozen large language model. This allows the model to process a variable number of visual input tokens and condition the language model on them effectively.

Flamingo demonstrated that large-scale pretraining on interleaved image-text data could produce models with remarkable emergent abilities, influencing subsequent work like BLIP-2 and LLaVA.

## Related pages
- [[concepts/multimodal-models.md]]
- [[concepts/few-shot-learning.md]]
- [[entities/alayrac-jb.md]]