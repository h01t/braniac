# Scaling Laws

**Summary**: Empirical relationships that describe how the performance of a language model changes as key factors like model size, dataset size, and compute budget are scaled.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition
Scaling laws are predictive equations derived from experimental data that model the performance of neural language models as a function of variables such as the number of model parameters (N), the size of the training dataset (D), and the amount of compute used for training (C). They help guide efficient allocation of resources when training larger models.

## Key Findings from Different Models
The document highlights several important scaling insights from various models:
*   **Chinchilla's Law**: Found that model size and the number of training tokens should be scaled proportionally; for each doubling of model size, the number of training tokens should also be doubled for optimal performance.
*   **DeepSeek's Formulation**: Conducted a detailed study to derive optimal equations for model size \(M\), data \(D\), batch size \(B\), and learning rate \(η\) given a compute budget \(C\). For example, \( B_{opt} \propto C^{0.3271} \) and \( η_{opt} \propto C^{-0.1250} \).
*   **Jurassic-1 Insight**: Found that model performance is highly related to network size, and that for runtime performance, increasing parallel operations (width) is more effective than increasing sequential operations (depth).
*   **PaLM Observation**: Noted that performance had not saturated even at the 540B scale, suggesting larger models would likely perform better.

## Related pages
- [[entities/deepseek.md]]
- [[entities/chinchilla.md]]
- [[entities/palm.md]]