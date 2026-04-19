# MoonViT-3D

**Summary**: The native-resolution vision encoder used in Kimi K2.5, incorporating the NaViT packing strategy for variable-resolution image inputs and featuring a lightweight 3D compression mechanism for video understanding.
**Source Context**: 2602.02276v1.pdf

---

## Description
[[entities/moonvit-3d.md]] is the vision encoder architecture employed by [[entities/kimi-k2-5.md]]. It is designed to support the model's [[concepts/native-multimodal-pretraining.md]] and multimodal capabilities.

## Key Features
*   **Native-Resolution & Variable Inputs**: It incorporates the [[entities/navit-packing-strategy.md]], enabling it to process variable-resolution image inputs efficiently.
*   **Video Understanding**: For video, a lightweight 3D ViT compression mechanism is introduced. Consecutive frames are grouped in fours, processed through the shared MoonViT encoder, and temporally averaged at the patch level. This design allows Kimi K2.5 to process videos up to 4x longer within the same context window while maintaining complete weight sharing between image and video encoders.

## Related pages
- [[entities/kimi-k2-5.md]]
- [[entities/navit-packing-strategy.md]]