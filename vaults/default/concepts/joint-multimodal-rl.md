# Joint Multimodal Reinforcement Learning

**Summary**: The reinforcement learning phase in Kimi K2.5 where the model is refined on tasks spanning both text and vision, organized by ability domains, leading to cross-modal capability transfer and performance gains.
**Source Context**: 2602.02276v1.pdf

---

## Overview
[[concepts/joint-multimodal-rl.md]] is the final stage in the [[concepts/joint-optimization-text-vision.md]] pipeline for Kimi K2.5. It builds upon capabilities activated by [[concepts/zero-vision-sft.md]] and involves applying outcome-based reinforcement learning across both text and vision domains.

## Key Components
1.  **Outcome-Based Visual RL**: After zero-vision SFT, the model undergoes RL on tasks that explicitly require visual comprehension, categorized into visual grounding/counting, chart/document understanding, and vision-critical STEM problems. This improves basic visual capabilities and complex agentic behaviors.
2.  **Cross-Modal Transfer**: A critical finding is that visual RL produces measurable improvements in textual tasks. Evaluations showed gains on MMLU-Pro (+1.7%), GPQA-Diamond (+2.1%), and LongBench v2 (+2.2%) after visual RL. Analysis suggests visual RL enhances calibration in areas requiring structured information extraction, similar to visually grounded reasoning.
3.  **Unified RL Paradigm**: Departing from modality-specific experts, RL domains in K2.5 are organized by abilities (knowledge, reasoning, coding, agentic, etc.). Both pure-text and multimodal queries are used. The [[entities/generative-reward-model.md]] optimizes across these heterogeneous traces without modality barriers, ensuring capability improvements generalize across modalities.

## Significance
This paradigm demonstrates that robust visual capabilities can emerge from zero-vision activation paired with vision RL, which further enhances general text abilities. It maximizes cross-modal capability transfer, a hallmark of superior multimodal alignment.

## Related pages
- [[concepts/joint-optimization-text-vision.md]]
- [[concepts/zero-vision-sft.md]]
- [[entities/generative-reward-model.md]]
- [[entities/kimi-k2-5.md]]