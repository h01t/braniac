# Native Multimodal Pre-Training

**Summary**: The pre-training strategy for Kimi K2.5 that integrates vision and text tokens from an early stage with a constant, moderate ratio, enabling the model to develop balanced multimodal representations through extended co-optimization.
**Source Context**: 2602.02276v1.pdf

---

## Strategy
[[concepts/native-multimodal-pretraining.md]] is a key component of the [[concepts/joint-optimization-text-vision.md]] paradigm in Kimi K2.5. It involves training the model from an early stage on a mixture of visual and text tokens, as opposed to first training a text-only model and later injecting vision tokens at high ratios.

## Design and Findings
A key design question was the optimal vision-text joint-training strategy given a fixed token budget. Conventional approaches suggest introducing vision tokens predominantly in later training stages at high ratios (e.g., 50%) to accelerate multimodal capability acquisition. However, ablation studies for Kimi K2.5 revealed a different story:
*   **Impact of Ratio**: The vision ratio was found to have minimal impact on final multimodal performance.
*   **Timing**: Early fusion with a lower vision ratio (e.g., 10% vision, 90% text) yielded better results than mid or late fusion with higher ratios, when keeping the total vision-text token budget fixed.

This motivated the native multimodal strategy: adopting a moderate vision ratio integrated early in the training process. This allows the model to naturally develop balanced multimodal representations while benefiting from extended co-optimization of both modalities over 15 trillion tokens.

## Architectural Support
This pre-training is supported by the [[entities/moonvit-3d.md]] vision encoder, which uses the [[entities/navit-packing-strategy.md]] to handle variable-resolution images and incorporates a lightweight 3D compression mechanism for processing videos within the same context window.

## Related pages
- [[concepts/joint-optimization-text-vision.md]]
- [[entities/kimi-k2-5.md]]
- [[entities/moonvit-3d.md]]