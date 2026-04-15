# Attention Mechanism

**Summary**: Attention is a core component of transformers that allows the model to dynamically weigh the importance of different parts of the input sequence when generating an output, with variants like self-attention, sparse attention, and flash attention designed for efficiency.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Core Concept
The attention mechanism enables models to focus on relevant parts of the input. It works by calculating a set of **query (Q)**, **key (K)**, and **value (V)** vectors for the input tokens. An attention score is computed from the similarity between queries and keys, which is then used to create a weighted sum of the value vectors (Source: Comprehensive Overview of LLMs.pdf).

## Types of Attention in LLMs
*   **Self-Attention**: The queries, keys, and values are all derived from the same sequence within a single transformer block (encoder or decoder). This allows tokens to attend to all other tokens in the sequence.
*   **Cross-Attention**: Used in encoder-decoder [[concepts/llm-architecture.md]]. Here, the queries come from the decoder, while the keys and values come from the encoder's output, allowing the decoder to attend to the encoded input.
*   **Sparse Attention**: Standard self-attention has quadratic complexity (O(n²)) with sequence length. Sparse attention approximates full attention by calculating it only within defined windows or patterns, significantly speeding up computation for long sequences.
*   **Flash Attention**: An optimized algorithm that minimizes memory reads/writes between a GPU's high-bandwidth memory (HBM) and its faster on-chip SRAM. It uses input tiling to achieve faster computation and reduced memory footprint for the attention operation (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/llm-architecture.md]]
- [[concepts/efficient-llms.md]]