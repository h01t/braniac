# S3 Compatible Object Storage

**Summary**: Cloud-based object storage used to house multimodal training datasets for Kimi K2.5, enabling efficient data loading and management.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

S3 compatible object storage from cloud providers is used to store the vision-language model (VLM) datasets for training Kimi K2.5. The data loading infrastructure retains visual data in its native format and provides flexibility for dynamic data shuffling, blending, tokenization, loss masking, and sequence packing. It also supports stochastic augmentation of both visual and textual modalities while preserving spatial coordinates.

The system guarantees deterministic training through careful management of random seeds and worker states, enabling seamless resumption of interrupted training. It achieves scalability via tiered caching mechanisms and regulates request frequency to object storage. A unified platform oversees data registration, visualization, statistical analysis, cross-cloud synchronization, and lifecycle governance. This storage solution is integral to the [[concepts/multimodal-data-curation.md]] process for [[entities/kimi-k2-5-model.md]].

## Related pages
- [[concepts/multimodal-data-curation.md]]
- [[entities/kimi-k2-5-model.md]]