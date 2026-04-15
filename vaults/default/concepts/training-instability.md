# Training Instability in LLMs

**Summary**: The occurrence of loss divergence or spikes during LLM training, mitigated by techniques like restarting from checkpoints, gradient norm management, and removing biases from certain layers.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Loss divergence or spiking is a common issue in LLM training, often occurring in the presence of gradient clipping [Source: Comprehensive Overview of LLMs.pdf]. Mitigation strategies include:
*   Restarting training from an earlier checkpoint [Source: Comprehensive Overview of LLMs.pdf].
*   Skipping 200-500 data batches at the point of divergence or re-shuffling batches [Source: Comprehensive Overview of LLMs.pdf].
*   Shrinking the embedding layer gradient, as its norm can be significantly larger than other layers, further stabilizing training [Source: Comprehensive Overview of LLMs.pdf].
*   For larger models, not using biases in dense and layer normalization layers can improve stability [Source: Comprehensive Overview of LLMs.pdf].

These issues are also related to choices in [[concepts/mixed-precision-training.md]].

## Related pages
- [[concepts/mixed-precision-training.md]]
- [[concepts/weight-initialization.md]]