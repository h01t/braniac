# Context Window Extension

**Summary**: Techniques to increase the sequence length that a Large Language Model can process, enabling it to understand longer documents and execute more complex reasoning.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.3.

---

LLMs are typically trained with fixed, limited context windows due to the quadratic computational cost of standard attention. Extending this window is crucial for handling long documents and complex tasks but is challenging because models often fail to generalize to unseen sequence lengths.

## Key Challenge
Models using popular positional embeddings like **RoPE** cannot perform zero-shot length extrapolation effectively. Simply fine-tuning on longer sequences is slow and computationally expensive.

## Extension Techniques

### Position Interpolation
Instead of extrapolating beyond trained lengths, **Position Interpolation** scales down the position indices of a longer sequence to fit within the original pre-trained window. Only brief fine-tuning (~1000 steps) is needed for the model to adapt to the larger window without losing performance on the original length. Variants include:
*   **NTK-aware interpolation (YaRN)**
*   **Power scaling (Giraffe)**

### Efficient Attention Mechanisms
Replacing standard dense attention with more efficient variants reduces the cost of processing long sequences.
*   **LongT5** uses **Transient Global attention (TGlobal)**, applying full attention only to a subset of "global" tokens.
*   **LongNet** employs **dilated attention** to theoretically handle sequences up to 1 billion tokens.
*   **LongLoRA** uses **shifted sparse attention** during fine-tuning for efficiency but reverts to full attention at inference.

### Extrapolation without Training
Some methods attempt to use pre-trained models on longer sequences without any fine-tuning:
*   **LM-Infinite** applies a `\infty`-shaped attention mask within the original context window bounds.
*   **Parallel Context Windows (PCW)** chunks a long input into segments that fit the pre-trained length, applying the same positional encodings to each chunk independently.

## Related pages
- [[concepts/attention-mechanism.md]]
- [[concepts/positional-encoding.md]]
- [[entities/longt5.md]]