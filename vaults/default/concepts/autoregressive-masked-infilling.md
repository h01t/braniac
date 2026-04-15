# Autoregressive Masked Infilling

**Summary**: A pre-training objective that combines masked language modeling (filling in missing spans) with an autoregressive generation order, enabling models to be bidirectional.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition
Autoregressive masked infilling is a hybrid pre-training objective. It tasks a model with predicting missing spans of text within a sequence (like masked language modeling), but the predictions for the masked tokens are generated in an autoregressive, left-to-right order within the masked span. This allows the model to use context from both sides of the mask (bidirectional) while generating coherent text.

## Usage in Models
This objective is a core feature of the [[entities/glm.md]] model family. [[entities/glm-130b.md]] was trained using this objective, which gives it a bidirectional nature compared to purely unidirectional autoregressive models like [[entities/gpt-3.md]].

## Advantages
*   **Bidirectional Context**: The model can condition on both past and future tokens when generating or predicting, leading to a richer understanding of context.
*   **Coherent Generation**: The autoregressive generation within the mask helps produce fluent and coherent text for the infilled section.

## Related pages
- [[entities/glm-130b.md]]
- [[concepts/bidirectional-context.md]]
- [[concepts/masked-language-modeling.md]]