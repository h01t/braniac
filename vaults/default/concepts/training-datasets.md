# Training Datasets

**Summary**: The large-scale, often web-scraped text corpora used to pre-train large language models, where dataset quality, size, and diversity are paramount for model performance.
**Source Context**: Comprehensive Overview of LLMs.pdf (Section 5.1, Table 8)

---

The performance of [[concepts/large-language-models.md]] is heavily dependent on the data they are trained on. Preparing high-quality, large-scale datasets is a major research and engineering challenge.

## Common Pre-training Datasets
As summarized in Table 8, notable datasets include:
*   **C4**: An 806GB cleaned, English text corpus from Common Crawl.
*   **mC4**: A massive multilingual extension of C4, spanning over 100 languages and 38.49TB.
*   **The PILE**: An 825GB diverse corpus assembled from sources like PubMed, arXiv, GitHub, and books to support domain-specific reasoning.

## Data Curation
Raw web data undergoes extensive filtering and deduplication. Techniques include heuristic filtering, quality filtering (QF), and perplexity filtering (PF) to remove low-quality text. The goal is to create a "minimal filtering" or "high-quality" corpus.

## Domain-Specific Data
Specialized models are trained on domain-specific data. For example, [[entities/bloomberggpt.md]] is trained on finance data, and [[entities/starcoder.md]] is trained on code from GitHub.

## Related pages
- [[concepts/data-filtering.md]]
- [[concepts/multilingual-training.md]]
- [[entities/common-crawl.md]]