# Positional Encoding

**Summary**: Positional encoding is a mechanism that injects information about the order of tokens into transformer-based models, which otherwise process sequences in parallel without inherent notion of position.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Need for Positional Information
The [[concepts/attention-mechanism.md]] module in a transformer processes all tokens in a sequence simultaneously and independently. Because of this parallel design, the model has no inherent ability to understand the sequential order of tokens. Positional encodings solve this by adding a positional embedding vector to each token's input embedding (Source: Comprehensive Overview of LLMs.pdf).

## Types of Positional Encodings
There are several variants used in LLMs:
*   **Absolute Positional Encoding**: The original method from the transformer paper, where a unique static or learned vector is added for each position.
*   **Relative Positional Encoding**: Encodes the relative distance between tokens. Two prominent examples are:
    *   **ALiBi (Attention with Linear Biases)**: Applies a scalar bias that is subtracted from the attention score; this bias increases linearly with the distance between the query and key tokens, favoring attention to closer tokens.
    *   **RoPE (Rotary Positional Embedding)**: Applies a rotation to the query and key vectors at an angle proportional to their absolute positions. This results in an attention score that decays with the relative distance between tokens (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/attention-mechanism.md]]
- [[concepts/llm-architecture.md]]