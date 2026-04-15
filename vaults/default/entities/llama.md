# Llama

**Summary**: A series of open-source large language models from Meta, used alongside Qwen as base models for distilling reasoning capabilities from DeepSeek-R1.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1 Distillation

Llama models (likely referring to Llama 3) are another architecture used for [[concepts/distillation-reasoning.md]]. The paper states that distilled models are created based on both the Qwen and Llama series, indicating a broad effort to empower popular open-source model families with reasoning capabilities.

## Performance and Impact

While specific benchmark numbers for Llama-based distilled models are not detailed in the provided text, the paper notes that the distilled 32B and 70B models (which could be based on either Qwen or Llama) "set a new record on the reasoning benchmarks among dense models." This implies that the Llama-based distilled models also achieve state-of-the-art performance.

## Open-Source Release

The authors open-source distilled checkpoints based on Llama series (1.5B, 8B, 14B, 32B, 70B), making advanced reasoning accessible to users of this popular model family.

## Related pages
- [[concepts/distillation-reasoning.md]]
- [[entities/qwen.md]]