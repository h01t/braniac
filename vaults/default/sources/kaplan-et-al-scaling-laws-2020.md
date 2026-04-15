# Kaplan et al. Scaling Laws for Neural Language Models (2020)

**Summary**: A seminal paper that empirically derives scaling laws predicting how the loss of a language model decreases as a function of model size, dataset size, and compute budget.
**Source Context**: arXiv:2001.08361 (2020).

---

## Key Findings
The paper presents a systematic study of how the performance of autoregressive transformer language models scales with three key variables: the number of model parameters (N), the size of the training dataset (D), and the amount of compute used for training (C) [[concepts/scaling-laws.md]].

The authors found that performance follows a power-law relationship with each of these factors, as long as the model is not under-trained or over-trained. Critically, they showed that for optimal performance, the model size and dataset size should be scaled in tandem. The paper introduced the concept of a "compute-optimal" frontier, suggesting that simply scaling models without sufficient data is inefficient [Source: [95]].

## Impact
These scaling laws have become foundational for planning the development of subsequent large language models (LLMs), guiding decisions on how to allocate compute resources between model parameters and training tokens [[concepts/compute-optimal-training.md]].