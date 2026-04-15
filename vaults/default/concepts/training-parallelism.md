# Training Parallelism for LLMs

**Summary**: Distributed training techniques like 3D parallelism (data, pipeline, tensor) are standard for LLMs, with some models employing even more advanced schemes like 5D parallelism.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Training LLMs requires sophisticated distributed training strategies. **3D parallelism**, combining data, pipeline, and tensor parallelism, is the most utilized approach [Source: Comprehensive Overview of LLMs.pdf].

Models like [[entities/bloom.md]] also use the ZeRO optimizer to shard optimizer states [Source: Comprehensive Overview of LLMs.pdf]. Some models, such as PanGu-α and PanGu-Σ, apply **5D parallelism**, which additionally includes optimizer parallelism and rematerialization [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[entities/bloom.md]]
- [[entities/pangu-.md]]