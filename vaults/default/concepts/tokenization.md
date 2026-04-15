# Tokenization

**Summary**: Tokenization is a fundamental pre-processing step in LLM training that breaks down text into smaller, non-decomposable units called tokens, which can be characters, subwords, or words.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Role in LLM Training
Tokenization is an essential first step in preparing text data for [[concepts/large-language-models.md]]. It converts raw text into a sequence of discrete symbols that the model can process. The choice of tokenization scheme directly impacts the model's vocabulary size, sequence length, and ability to handle rare words or multilingual text (Source: Comprehensive Overview of LLMs.pdf, Section 2.1).

## Common Tokenization Schemes
Popular tokenization methods used in LLMs include:
*   **Byte Pair Encoding (BPE)**: A subword tokenization algorithm that iteratively merges the most frequent pair of bytes or characters to create a vocabulary of subword units (Source: Comprehensive Overview of LLMs.pdf, referencing [61]).
*   **WordPiece**: A similar subword tokenization method used in models like BERT, which relies on a likelihood-based merging criterion rather than frequency (Source: Comprehensive Overview of LLMs.pdf, referencing [62]).
*   **UnigramLM**: A subword segmentation algorithm that uses a unigram language model to probabilistically determine the best segmentation (Source: Comprehensive Overview of LLMs.pdf, referencing [60]).

## Impact and Considerations
The tokenization process influences model efficiency and performance. For example, subword tokenization helps balance vocabulary size and the ability to represent out-of-vocabulary words. Detailed surveys on tokenization are available (Source: Comprehensive Overview of LLMs.pdf, referencing [63]).

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/data-preprocessing.md]]