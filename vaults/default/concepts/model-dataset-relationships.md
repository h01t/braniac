# Model and Training Dataset Relationships

**Summary**: A mapping of well-known large language models to the primary datasets used for their pre-training and instruction-tuning.
**Source Context**: Comprehensive Overview of LLMs.pdf (Table 10 & 11).

---

## Introduction
Different large language models are trained on distinct mixtures of datasets, which influences their capabilities and specialization. This page summarizes key model-dataset pairings.

## Pre-trained Models and Their Datasets
*   **T5**: Trained on [[sources/c4-dataset.md]].
*   **GPT-3**: Trained on Common Crawl, WebText, Books Corpora, and Wikipedia.
*   **BLOOM**: Trained on the [[sources/roots-dataset.md]] corpus.
*   **LLaMA / LLaMA-2**: Trained on CommonCrawl, [[sources/c4-dataset.md]], GitHub, Wikipedia, Books, arXiv, StackExchange.
*   **PaLM / PaLM-2**: Trained on webpages, books, Wikipedia, news, source code, and social media conversations.
*   **Chinchilla**: Trained on subsets of [[sources/massivetext-dataset.md]] (MassiveWeb, Books, C4, News, GitHub, Wikipedia).
*   **Galactica**: Trained on a large corpus of scientific text from arXiv, PMC, Semantic Scholar, Wikipedia, StackExchange, and code repositories.

## Instruction-Tuned / Fine-tuned Models and Their Datasets
*   **T0**: Fine-tuned on the [[sources/p3-dataset.md]] (Pool of Prompts).
*   **Flan**: Fine-tuned on a mixture of datasets including Mu  n, T0-SF, and NIV2 (see [[sources/flan-dataset.md]]).
*   **OPT-IML**: Fine-tuned on a collection including [[sources/p3-dataset.md]], [[sources/flan-dataset.md]], and [[sources/super-naturalinstructions.md]].
*   **WizardCoder**: Fine-tuned on Code Alpaca data.

## Related pages
- [[concepts/training-datasets-overview.md]]
- [[concepts/instruction-tuning.md]]
- [[entities/gpt-3-model.md]]
- [[entities/t5-model.md]]
- [[entities/llama-model.md]]