# Pre-Training Objectives

**Summary**: Pre-training objectives are the self-supervised learning tasks used to train the initial, general-purpose parameters of a Large Language Model on a large text corpus.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Common Objectives
*   **Full Language Modeling (Autoregressive)**: The model is trained to predict the next token in a sequence given all previous tokens. This is the standard objective for causal decoder models like GPT. It maximizes the likelihood of the training data (Source: Comprehensive Overview of LLMs.pdf, Section 2.10).
*   **Masked Language Modeling (MLM)**: Random tokens in the input sequence are masked (replaced with a special token), and the model is trained to predict the original tokens. This is used in encoder models like BERT (Source: Comprehensive Overview of LLMs.pdf, referencing [93] - implied by context on language model training objectives).
*   **Denoising Objectives**: The model is given a corrupted version of the text (e.g., with spans of text masked or removed) and must reconstruct the original. This is used in encoder-decoder models like T5 (Source: Comprehensive Overview of LLMs.pdf, referencing [93] - implied).

## Purpose
The pre-training objective is crucial for teaching the model fundamental language understanding and generation capabilities. The knowledge acquired during this phase forms the basis for later [[concepts/fine-tuning.md]] on specific tasks. The survey paper indicates that more details on pre-training objectives can be found in the referenced work [93] (Source: Comprehensive Overview of LLMs.pdf, Section 2.10).

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/fine-tuning.md]]