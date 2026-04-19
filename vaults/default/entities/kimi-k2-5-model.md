# Kimi K2.5 Model

**Summary**: A large multimodal AI model trained with early fusion pre-training on curated text and vision data, evaluated across a wide range of benchmarks and capable of agentic tasks.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

The Kimi K2.5 model is a multimodal AI system trained using [[concepts/early-fusion-multimodal-pre-training.md]] on a corpus of curated text and vision data as described in [[concepts/multimodal-data-curation.md]]. It is trained on [[entities/nvidia-h800-gpu.md]] clusters with a flexible parallelism strategy. The model supports a 256k token context length and is evaluated under standardized [[concepts/evaluation-protocols-for-multimodal-models.md]].

Key capabilities include advanced reasoning on text benchmarks, image and video understanding, coding and software engineering tasks, agentic performance with tools, computer-use interactions, and agent swarm coordination. The model employs a unified agentic reinforcement learning framework [[concepts/unified-agentic-reinforcement-learning.md]] for training. Evaluation shows competitive performance against leading baseline models across diverse domains.

## Related pages
- [[concepts/early-fusion-multimodal-pre-training.md]]
- [[concepts/multimodal-data-curation.md]]
- [[concepts/unified-agentic-reinforcement-learning.md]]
- [[concepts/evaluation-protocols-for-multimodal-models.md]]