# Large Language Models

**Summary**: A class of deep learning models with a very high number of parameters, designed to understand and generate human language and code. They are trained on massive text datasets and can be specialized for various tasks through instruction tuning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Large Language Models (LLMs) are deep learning architectures, primarily based on the [[concepts/transformer-architecture.md]], that contain billions or even trillions of parameters. Their primary training objective is often next-token prediction or span corruption, enabling them to model complex language patterns. Performance scales with the quality, size, and diversity of the training data, making dataset creation a key area of research.

These models are evaluated on a broad spectrum of tasks, typically divided into [[concepts/natural-language-understanding-nlu.md]] and [[concepts/natural-language-generation-nlg.md]].

## Key Architectural Components
Common architectural choices include the use of different [[concepts/positional-embeddings.md]] like RoPE or ALiBi, various [[concepts/activation-functions.md]] like GeLU or SwiGLU, and specialized [[concepts/attention-mechanisms.md]] such as multi-query or grouped-query attention. The models can be causal decoders (like [[entities/gpt3.md]]), encoder-decoders (like [[entities/t5.md]]), or use a [[concepts/mixture-of-experts-moe.md]] design (like [[entities/glam.md]]).

## Training and Optimization
Training LLMs requires significant computational resources, using hardware like TPUs and A100/H100 GPUs. Optimization settings are critical and include specific learning rate schedules (e.g., cosine decay), the use of [[concepts/mixed-precision-training.md]], and techniques like gradient clipping.

## Related pages
- [[concepts/instruction-tuning.md]]
- [[concepts/pre-training.md]]
- [[concepts/llm-architecture.md]]
- [[concepts/optimization-settings.md]]