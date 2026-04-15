# GLM-130B

**Summary**: A 130-billion parameter bilingual (English and Chinese) bidirectional autoregressive model trained primarily with masked infilling and a small amount of multi-task instruction data.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Architecture and Training Objective
GLM-130B is a large language model with 130 billion parameters. It is trained using an **autoregressive masked infilling** pre-training objective, similar to its predecessor GLM. This objective makes the model **bidirectional** (able to consider context from both left and right), in contrast to unidirectional models like [[entities/gpt-3.md]].

## Key Training Innovations
The training of GLM-130B introduced two key elements:
1.  **Multi-Task Instruction Pre-training Data**: A small proportion (5%) of the total training data consisted of multi-task instruction data. This was combined with the primary self-supervised masked infilling objective.
2.  **Embedding Layer Gradient Shrink**: A technique applied to stabilize the training process of such a large model.

## Performance Insight
An insight from the model's development was that including a small amount of multi-task instruction data during pre-training improves the overall model performance.

## Related pages
- [[concepts/autoregressive-masked-infilling.md]]
- [[concepts/bidirectional-context.md]]
- [[entities/gpt-3.md]]