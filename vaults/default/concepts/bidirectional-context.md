# Bidirectional Context

**Summary**: The ability of a language model to consider and use information from tokens on both the left and right (past and future) when processing or generating text at a given position.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition
In language modeling, **bidirectional context** refers to a model's capacity to attend to and incorporate information from all tokens in a sequence—both those that come before (left context) and after (right context)—relative to a target position. This contrasts with **unidirectional** (or causal) models, like standard GPT-style models, which can only use past (left) context.

## How It Is Achieved
Bidirectional context is typically enabled by training objectives that do not enforce a strict causal mask across the entire sequence. Examples include:
*   **Masked Language Modeling (MLM)**: Used by BERT, where random tokens are masked and predicted using the full surrounding context.
*   **Autoregressive Masked Infilling**: Used by [[entities/glm-130b.md]], where masked spans are predicted autoregressively but the model can see the entire unmasked context.

## Advantages and Trade-offs
*   **Advantage**: Provides a richer, more complete understanding of sentence structure and meaning, which is often beneficial for tasks like text infilling, classification, and understanding.
*   **Trade-off**: It is not natively suited for open-ended, sequential text generation in the way unidirectional models are, though techniques like permuted language modeling or infilling objectives can bridge this gap.

## Example Model
[[entities/glm-130b.md]] is described as bidirectional due to its autoregressive masked infilling training, in contrast to the unidirectional [[entities/gpt-3.md]].

## Related pages
- [[concepts/autoregressive-masked-infilling.md]]
- [[entities/glm-130b.md]]
- [[concepts/unidirectional-context.md]]