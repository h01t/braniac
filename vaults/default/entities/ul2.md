# UL2

**Summary**: An encoder-decoder large language model trained with a Mixture of Denoisers (MoD) objective, which improves fine-tuning performance on downstream tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Architecture and Training
UL2 is based on an **encoder-decoder** architecture. Its defining characteristic is the **Mixture of Denoisers (MoD)** pre-training objective. This objective combines three distinct denoising tasks:
1.  **R-Denoiser**: Regular span masking.
2.  **S-Denoiser**: Corrupts consecutive tokens of a large sequence.
3.  **X-Denoiser**: Corrupts a large number of tokens randomly.
During pre-training, a special token indicates which denoising setup is being used (R, S, or X). This mode-switching training allows downstream tasks to be bound to one of these upstream training modes (Source: Comprehensive Overview of LLMs.pdf).

## Performance
Training with the [[concepts/mixture-of-denoisers.md]] style reportedly allows UL2 to outperform the T5 model on many benchmarks. Furthermore, the source notes that for UL2, [[concepts/chain-of-thought-prompting.md]] outperforms standard prompting (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/mixture-of-denoisers.md]]
- [[concepts/encoder-decoder-architecture.md]]