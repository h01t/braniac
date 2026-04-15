# Mask Infilling

**Summary**: A pre-training objective for language models where random spans of tokens within a sequence are masked (or corrupted) and the model is trained to predict the missing content, enabling bidirectional context understanding.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Definition and Mechanism
[[concepts/mask-infilling.md]] is a self-supervised training task where parts of an input text sequence are replaced with a special mask token or removed entirely. The model must then predict the original content of these masked spans. Unlike standard autoregressive left-to-right prediction, this task requires the model to use context from both the left and right of the mask, making the model's representations **bidirectional**. This objective is central to models like GLM and GLM-130B (Source: Comprehensive Overview of LLMs.pdf).

## Comparison with Other Objectives
*   **vs. Autoregressive (e.g., GPT)**: Autoregressive models are unidirectional, only conditioning on past tokens. Mask infilling allows conditioning on the entire surrounding context.
*   **vs. Standard Masked Language Modeling (e.g., BERT)**: While similar, mask infilling often involves predicting longer, contiguous spans of text rather than individual tokens, which may require more complex reasoning and generation capability.

## Applications and Models
The [[concepts/mask-infilling.md]] objective is particularly powerful for tasks that involve text generation, editing, and completion. The GLM-130B model uses an auto-regressive formulation of this objective, training the model to generate the missing tokens sequentially within the masked span, which contributes to its strong performance on a variety of language understanding and generation tasks (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[entities/glm-130b.md]]
- [[concepts/bidirectional-attention.md]]