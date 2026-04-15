# UL2

**Summary**: An encoder-decoder language model trained with a Mixture of Denoisers (MoD) objective, which outperformed the T5 model on many benchmarks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Architecture and Training
UL2 is an encoder-decoder architecture model. Its key innovation is the **Mixture of Denoisers (MoD)** pre-training objective, which uses different denoising tasks to improve model versatility [[concepts/mixture-of-denoisers.md]]. The denoisers include:
*   **R-Denoiser**: Regular span masking.
*   **S-Denoiser**: Corrupts consecutive tokens of a large sequence.
*   **X-Denoiser**: Corrupts a large number of tokens randomly.

During pre-training, a special token (R, S, or X) is prefixed to the input to indicate which denoising setup is being used. This explicit mode switching helps the model bind downstream tasks to specific upstream training modes, improving fine-tuning performance.

## Performance
Training with this MoD objective allowed UL2 to outperform the [[entities/t5.md]] model on many benchmarks. The approach of training with a mixture of denoisers was also found to improve infilling ability and open-ended text generation diversity in related models like [[entities/u-palm.md]].

## Related pages
- [[concepts/mixture-of-denoisers.md]]
- [[entities/t5.md]]
- [[concepts/fine-tuning.md]]