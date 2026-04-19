# NaViT Packing Strategy

**Summary**: A strategy incorporated into the MoonViT-3D vision encoder that enables efficient processing of variable-resolution image inputs by packing multiple images of different sizes into a single sequence.
**Source Context**: 2602.02276v1.pdf

---

## Context and Usage
The [[entities/navit-packing-strategy.md]] is referenced as a component used within the [[entities/moonvit-3d.md]] vision encoder of [[entities/kimi-k2-5.md]]. This strategy is key to the encoder's ability to handle native-resolution, variable-size image inputs effectively during [[concepts/native-multimodal-pretraining.md]] and inference.

## Related pages
- [[entities/moonvit-3d.md]]
- [[entities/kimi-k2-5.md]]