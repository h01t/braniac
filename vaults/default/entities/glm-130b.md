# GLM-130B

**Summary**: A 130-billion parameter bilingual (English and Chinese) large language model trained with an auto-regressive mask infilling objective, making it bidirectional, and enhanced with a small amount of multi-task instruction data.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Architecture and Training Objective
GLM-130B is trained using an **auto-regressive [[concepts/mask-infilling.md]]** pre-training objective, similar to its predecessor GLM. This approach differs from purely left-to-right models like GPT-3, as it allows the model to use context from both sides of a masked span, granting it **bidirectional** capabilities. A key innovation in its training is the inclusion of a **small amount of multi-task instruction pre-training data** (approximately 5% of the total data) alongside the primary self-supervised mask infilling task (Source: Comprehensive Overview of LLMs.pdf).

## Technical Details
To stabilize the training of such a large model, GLM-130B employs **embedding layer gradient shrink**, a technique to control gradient magnitudes. The inclusion of instruction data during pre-training was found to improve the model's overall performance (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/mask-infilling.md]]
- [[concepts/bidirectional-attention.md]]
- [[concepts/instruction-tuning.md]]