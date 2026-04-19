# Joint Optimization of Text and Vision

**Summary**: A core training paradigm in Kimi K2.5 where text and vision modalities are co-optimized throughout the model's training pipeline, leading to bidirectional enhancement of capabilities and superior cross-modal alignment.
**Source Context**: 2602.02276v1.pdf

---

## Concept
The [[concepts/joint-optimization-text-vision.md]] is a foundational principle in the development of Kimi K2.5. The key insight is that jointly optimizing text and vision enhances both modalities and avoids conflicts, rather than treating visual capability as a post-hoc add-on to a text model. This is achieved through a coordinated series of techniques applied during pre-training and post-training phases.

## Methodology
The joint optimization strategy consists of three main components:
1.  **[[concepts/native-multimodal-pretraining.md]]**: Contrary to conventional wisdom, Kimi K2.5 adopts an early fusion strategy with a lower, constant vision-to-text token ratio throughout training. Experiments showed this yields better results than aggressive vision-heavy training concentrated at later stages, given a fixed total token budget.
2.  **[[concepts/zero-vision-sft.md]]**: During post-training, visual and agentic capabilities are activated using only text-only supervised fine-tuning (SFT) data. This approach leverages the strong vision-text alignment established during joint pre-training, enabling capabilities to generalize naturally across modalities without requiring scarce, high-quality vision SFT data.
3.  **[[concepts/joint-multimodal-rl.md]]**: Reinforcement learning is applied jointly on both text and vision tasks, organized by ability domains (e.g., knowledge, reasoning) rather than by input modality. A critical finding is that visual RL improves textual performance on benchmarks like MMLU-Pro and GPQA-Diamond, demonstrating bidirectional enhancement.

## Significance
This paradigm ensures capability improvements acquired through either textual or visual inputs inherently generalize to enhance related abilities across the alternate modality. It represents a shift from modality-specific expert divisions to a unified architecture for [[concepts/agentic-intelligence.md]].

## Related pages
- [[concepts/native-multimodal-pretraining.md]]
- [[concepts/zero-vision-sft.md]]
- [[concepts/joint-multimodal-rl.md]]
- [[entities/kimi-k2-5.md]]