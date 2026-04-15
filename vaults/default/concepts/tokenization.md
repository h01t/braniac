# Tokenization

**Summary**: Tokenization is a fundamental pre-processing step in LLM training that parses raw text into discrete, non-decomposing units called tokens, which can be characters, subwords, or words.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Role in LLM Training
Tokenization is an essential first step in the [[concepts/pretraining.md]] pipeline for Large Language Models. It converts unstructured text into a sequence of tokens that the model can process numerically. The choice of tokenization scheme directly impacts the model's vocabulary size, sequence length, and ability to handle rare words or multiple languages (Source: Comprehensive Overview of LLMs.pdf).

## Common Tokenization Schemes
Several schemes are commonly used in modern LLMs:
*   **Byte Pair Encoding (BPE)**: A subword tokenization algorithm that iteratively merges the most frequent pairs of characters or character sequences.
*   **WordPiece**: A similar subword algorithm used in models like BERT, which merges tokens based on likelihood.
*   **UnigramLM**: A subword segmentation method that uses a unigram language model to probabilistically segment text.
*   Other methods include character-level and word-level tokenization (Source: Comprehensive Overview of LLMs.pdf).

## Further Reading
The source notes that a detailed survey on tokenization is available for interested readers (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/pretraining.md]]
- [[concepts/llm-training-pipeline.md]]