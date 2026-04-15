# BLOOM

**Summary**: A 176B parameter, open-access multilingual LLM developed by BigScience, using an additional layer normalization for stability and preferring ALiBi positional encoding.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

BLOOM is a 176B parameter decoder-only LLM. For [[concepts/training-instability.md]], it utilizes an additional layer normalization before the embedding layer to stabilize training, though this can negatively impact zero-shot generalization [Source: Comprehensive Overview of LLMs.pdf].

Regarding [[concepts/positional-encoding-in-llms.md]], BLOOM finds that the ALiBi encoding outperforms learned and rotary positional encodings [Source: Comprehensive Overview of LLMs.pdf]. For training, it uses 3D parallelism combined with the ZeRO optimizer to shard optimizer states [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/layer-normalization-in-llms.md]]
- [[concepts/positional-encoding-in-llms.md]]
- [[concepts/training-parallelism.md]]