# Mixture of Denoisers (MoD)

**Summary**: A training objective for language models that employs multiple distinct denoising tasks, such as regular span masking, sequential token corruption, and extreme random masking, to improve model versatility and fine-tuning performance.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Definition and Purpose
[[concepts/mixture-of-denoisers.md]] (MoD) is a pre-training objective that combines several different denoising tasks within a single model. The goal is to create a more flexible foundation model that can adapt to various downstream tasks by explicitly training it to handle different types of corruption patterns. This is exemplified by the UL2 model, which uses a specific denoiser token to indicate which task is being performed during training (Source: Comprehensive Overview of LLMs.pdf).

## Common Denoiser Types
The UL2 implementation describes three primary denoisers:
1.  **R-Denoiser (Regular)**: Applies regular span masking, similar to models like T5.
2.  **S-Denoiser (Sequential)**: Corrupts consecutive tokens of a large sequence.
3.  **X-Denoiser (Extreme)**: Corrupts a large number of tokens randomly within the sequence.
Training with this mixture helps the model learn to fill in gaps, continue sequences, and reconstruct heavily corrupted text, improving its performance on diverse benchmarks compared to models trained with a single objective (Source: Comprehensive Overview of LLMs.pdf).

## Advantages
*   **Improved Fine-Tuning**: By binding downstream tasks to specific upstream denoising modes, MoD can lead to better fine-tuning results.
*   **Task Versatility**: The model becomes proficient at different generation and understanding tasks, from infilling (X/S denoisers) to standard masked language modeling (R denoiser).
*   **Performance Gains**: UL2, trained with MoD, was reported to outperform the T5 model on many benchmarks (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/mask-infilling.md]]
- [[entities/ul2.md]]