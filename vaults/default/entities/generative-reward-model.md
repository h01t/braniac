# Generative Reward Model

**Summary**: The reward model used during the joint multimodal reinforcement learning phase of Kimi K2.5, which optimizes across heterogeneous text and vision reasoning traces without modality barriers to maximize cross-modal capability transfer.
**Source Context**: 2602.02276v1.pdf

---

## Role in Training
The [[entities/generative-reward-model.md]] (GRM) is a component within the [[concepts/joint-multimodal-rl.md]] paradigm of [[entities/kimi-k2-5.md]]. During post-training, domain experts (organized by ability) and the GRM jointly learn from both pure-text and multimodal queries.

## Function
The GRM optimizes across these heterogeneous reasoning traces without imposing modality-specific barriers. This ensures that capability improvements acquired through either textual or visual inputs inherently generalize to enhance related abilities across the alternate modality, a key mechanism for achieving the bidirectional enhancement observed in [[concepts/joint-optimization-text-vision.md]].

## Related pages
- [[concepts/joint-multimodal-rl.md]]
- [[entities/kimi-k2-5.md]]