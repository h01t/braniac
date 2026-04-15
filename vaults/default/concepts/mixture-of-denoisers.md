# Mixture of Denoisers (MoD)

**Summary**: A pre-training objective that combines multiple denoising tasks (e.g., span masking, sequential corruption, extreme random masking) to improve a model's versatility and downstream fine-tuning performance.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition
Mixture of Denoisers (MoD) is a training paradigm where a language model is trained on a mixture of different denoising or corruption tasks. Instead of a single objective like standard masked language modeling, the model learns to handle various types of input corruption, which is believed to improve its generalization and adaptability.

## Implementation in UL2
The [[entities/ul2.md]] model implements MoD using three specific denoisers:
1.  **R-Denoiser (Regular)**: Applies standard span masking.
2.  **S-Denoiser (Sequential)**: Corrupts long, consecutive token sequences.
3.  **X-Denoiser (Extreme)**: Randomly corrupts a large number of tokens.

A mode token (R, S, or X) is prepended to the input during pre-training to signal the task. This allows the model to develop specialized capabilities for each denoising mode, which can be leveraged during fine-tuning for specific downstream tasks.

## Benefits and Findings
*   **Improved Fine-tuning**: The explicit mode switching helps the model map downstream tasks to an appropriate upstream training mode, improving fine-tuning performance [[entities/ul2.md]].
*   **Enhanced Abilities**: Related work on [[entities/u-palm.md]] found that training with a mixture of denoisers improved infilling ability and the diversity of open-ended text generation.
*   **Benchmark Performance**: The MoD approach enabled UL2 to outperform the [[entities/t5.md]] model on many benchmarks.

## Related pages
- [[entities/ul2.md]]
- [[entities/u-palm.md]]
- [[concepts/pre-training-objective.md]]