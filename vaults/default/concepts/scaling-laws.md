# Scaling Laws

**Summary**: Empirical relationships that describe how the performance (loss) of neural language models improves predictably as key factors like model size, dataset size, and compute are increased.
**Source Context**: Derived from sources including Kaplan et al. (2020) and Hoffmann et al. (2022).

---

## Description
Scaling laws are power-law relationships discovered through experimentation that quantify the improvement in a language model's loss (and thus its capability) as resources are scaled up. The primary variables are:
-   **Model Parameters (N)**: The number of non-embedding parameters in the model.
-   **Dataset Size (D)**: The number of tokens in the training dataset.
-   **Compute (C)**: The total floating-point operations used for training.

The key finding is that performance improves smoothly and predictably with each factor, enabling forward planning for model development [[sources/kaplan-et-al-scaling-laws-2020.md]].

## The Compute-Optimal Frontier
Later work, such as by Hoffmann et al. (2022), built upon these laws to define a "compute-optimal" scaling strategy [[concepts/compute-optimal-training.md]]. This research suggests that for a given compute budget (C), there is an optimal combination of model size (N) and number of training tokens (D) to minimize final loss. This challenged earlier trends of primarily scaling up model parameters [Source: [96]].