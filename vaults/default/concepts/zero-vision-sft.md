# Zero-Vision SFT

**Summary**: A supervised fine-tuning stage in Kimi K2.5 that uses only text-only data to activate the model's visual reasoning and tool-use capabilities, made possible by strong vision-text alignment from prior joint pre-training.
**Source Context**: 2602.02276v1.pdf

---

## Concept
[[concepts/zero-vision-sft.md]] (Zero-Vision Supervised Fine-Tuning) is a novel post-training technique used in the [[concepts/joint-optimization-text-vision.md]] pipeline of Kimi K2.5. It addresses the cold-start problem for multimodal reinforcement learning by activating visual and agentic capabilities without using any vision-labeled SFT data.

## Methodology
After [[concepts/native-multimodal-pretraining.md]], a pretrained Vision-Language Model (VLM) does not naturally perform vision-based tool-calling. Conventional approaches use manually annotated visual chain-of-thought data, which is limited in diversity.
*   **Process**: Zero-vision SFT uses only high-quality, abundant text SFT data. Within this text data, all image manipulations are proxied through programmatic operations in IPython, serving as a generalization of traditional vision tool-use.
*   **Capabilities Activated**: This method enables diverse reasoning behaviors, including pixel-level operations (e.g., object size estimation via binarization and counting) and generalizes to visually grounded tasks like object localization, counting, and OCR.

## Rationale and Performance
The phenomenon is likely due to the strong vision-text alignment established during joint pretraining. Compared to zero-vision SFT, preliminary experiments showed that using text-vision SFT data yielded worse performance on visual, agentic tasks, possibly due to a lack of high-quality vision data. Zero-vision SFT provides a sufficient starting point for subsequent [[concepts/joint-multimodal-rl.md]], as demonstrated by improving vision RL training curves.

## Related pages
- [[concepts/joint-optimization-text-vision.md]]
- [[concepts/joint-multimodal-rl.md]]
- [[entities/kimi-k2-5.md]]