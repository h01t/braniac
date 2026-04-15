# Data Preprocessing for LLMs

**Summary**: Data preprocessing involves cleaning and preparing the massive text corpora used to train Large Language Models, including filtering for quality, deduplication, and privacy reduction.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Key Preprocessing Steps
Before training a [[concepts/large-language-models.md]], raw web-scraped and curated text data undergoes several cleaning steps:
*   **Quality Filtering**: Removing low-quality text to improve the final model's capabilities. Methods include:
    *   **Classifier-based**: Training a model to predict text quality.
    *   **Heuristics-based**: Applying rules based on language, perplexity, statistics, or keyword presence (Source: Comprehensive Overview of LLMs.pdf, Section 2.8).
*   **Data Deduplication**: Removing duplicate content at the sentence, document, or dataset level. This prevents the model from overfitting to repeated data and reduces unintended memorization (Source: Comprehensive Overview of LLMs.pdf, Section 2.8).
*   **Privacy Reduction**: Employing heuristic methods to filter out or mask personally identifiable information (PII) like names, addresses, and phone numbers from the training data to mitigate privacy risks (Source: Comprehensive Overview of LLMs.pdf, Section 2.8).

## Importance
The adage "garbage in, garbage out" is especially pertinent for LLMs. High-quality, diverse, and clean training data is a critical factor in the performance and safety of the resulting model. Preprocessing also impacts [[concepts/tokenization.md]], which is a subsequent step.

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/tokenization.md]]