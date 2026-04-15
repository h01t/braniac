# PaLM

**Summary**: A causal decoder with parallel attention and feed-forward layers, trained with improvements for efficiency and performance.
**Source Context**: Comprehensive Overview of LLMs.pdf, Batch 2 of 15.

---

PaLM is a large LLM with several innovations:

- **Architecture**: Uses parallel attention and feed-forward layers, SwiGLU activation, RoPE embeddings, and multi-query attention to reduce computation costs during decoding [Source: Comprehensive Overview of LLMs.pdf].

- **Training**: Experienced loss spiking during training, addressed by restarting from earlier checkpoints and skipping batches around spikes [Source: Comprehensive Overview of LLMs.pdf].

- **Memorization**: At the 540B scale, it memorized about 2.4% of training data, with lower rates for smaller models [Source: Comprehensive Overview of LLMs.pdf].

PaLM has variants like [[entities/palm-2.md]] and [[entities/u-palm.md]], and its design reflects [[concepts/scaling-laws.md]].

## Related pages
- [[concepts/scaling-laws.md]]
- [[entities/palm-2.md]]