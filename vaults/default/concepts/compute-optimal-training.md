# Compute-Optimal Training

**Summary**: A model scaling strategy that, for a fixed compute budget, identifies the optimal balance between model size and the number of training tokens to achieve the best performance.
**Source Context**: Hoffmann et al., "Training compute-optimal large language models" (2022).

---

## Principle
The concept builds upon [[concepts/scaling-laws.md]]. It posits that simply increasing the number of model parameters is inefficient if the model is not trained on a sufficiently large dataset. Conversely, a small model trained on a massive dataset will hit a performance ceiling.

For any given compute budget (measured in FLOPs), there exists an optimal combination of model size (N_opt) and number of training tokens (D_opt) that minimizes the final loss. The paper by Hoffmann et al. suggested that many prior large models were significantly "undertrained," meaning they had more parameters than was optimal for their compute budget and would have benefited from more training data instead [Source: [96]].

## Impact on Model Development
This finding influenced the design of subsequent LLMs, encouraging a shift towards training larger models on more tokens rather than purely maximizing parameter count. It provides a data-driven framework for allocating training resources efficiently.