# Catastrophic Forgetting

**Summary**: A phenomenon in machine learning where a model rapidly loses previously learned information when trained on new tasks or data, a significant challenge in continual learning.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Definition
[[concepts/catastrophic-forgetting.md]], also known as catastrophic interference, occurs when an artificial neural network that is sequentially trained on multiple tasks loses performance on earlier tasks after learning new ones. The model's parameters are overwritten to optimize for the new task, effectively "forgetting" how to perform the old ones. This is a central problem in the field of continual or lifelong learning (Source: Comprehensive Overview of LLMs.pdf).

## Relevance to Large Language Models
In the context of LLMs, catastrophic forgetting is a concern during:
*   **Fine-tuning**: When a base pre-trained model is adapted for a specific downstream task, there is a risk it will lose its general capabilities.
*   **Continual Pre-training**: When a model is updated with new data over time.
*   **Multi-Task Learning**: When training on a mixture of objectives sequentially.

## Mitigation Strategies in LLMs
The source highlights architectural and training strategies designed to mitigate forgetting:
*   **Sparse Architectures**: The **PanGu-Σ** model's [[concepts/random-routed-experts.md]] (RRE) architecture is noted for reducing catastrophic forgetting effects, which is essential for continual learning. The sparsity allows different parts of the network to specialize.
*   **Combined Training Stages**: The **Xuan Yuan 2.0** model combined its pre-training and fine-tuning stages to avoid catastrophic forgetting.
*   **Parameter-Efficient Fine-Tuning (PEFT)**: Methods like adapters or prompt tuning, which update only a small subset of parameters, inherently protect the majority of the pre-trained knowledge (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/random-routed-experts.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/continual-learning.md]]