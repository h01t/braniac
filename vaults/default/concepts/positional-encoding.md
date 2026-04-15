# Positional Encoding

**Summary**: Positional encoding is a technique used in transformer-based models to inject information about the order of tokens in a sequence, compensating for the model's inherent lack of sequential awareness.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Need for Positional Information
The [[concepts/transformer-architecture.md]] processes input tokens in parallel, and its [[concepts/attention-mechanisms.md]] mechanism is permutation-invariant. Without positional information, the model would treat a sequence as a bag of tokens. Positional encodings are added to token embeddings to provide the model with a sense of token order (Source: Comprehensive Overview of LLMs.pdf, Section 2.2).

## Types of Positional Encodings
*   **Absolute Positional Encodings**: The original Transformer model used fixed, sinusoidal functions or learned embeddings for each absolute position in the sequence (Source: Comprehensive Overview of LLMs.pdf, referencing [64]).
*   **Relative Positional Encodings**: These encodings represent the relative distance between tokens. Two widely used variants in LLMs are:
    *   **RoPE (Rotary Positional Embedding)**: Applies a rotation matrix to query and key vectors based on their absolute positions, implicitly encoding relative position information in the attention score (Source: Comprehensive Overview of LLMs.pdf, referencing [66]).
    *   **ALiBi (Attention with Linear Biases)**: Adds a static, non-learned bias to attention scores that penalizes attention between distant tokens (Source: Comprehensive Overview of LLMs.pdf, referencing [65]).

## Application in LLMs
Positional encodings are a critical component in the architecture of [[concepts/large-language-models.md]]. The choice between absolute and relative encodings can affect the model's ability to generalize to sequences longer than those seen during training.

## Related pages
- [[concepts/transformer-architecture.md]]
- [[concepts/attention-mechanisms.md]]
- [[concepts/large-language-models.md]]