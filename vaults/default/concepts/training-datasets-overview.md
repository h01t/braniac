# Training Datasets for Large Language Models

**Summary**: Overview of key datasets used for pre-training, instruction-tuning, and alignment of large language models, including their size, source, languages, and purpose.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Introduction
Training large language models (LLMs) requires massive, diverse datasets. These datasets are typically categorized by their purpose in the model development pipeline: pre-training on raw text, instruction-tuning for task following, and alignment for safety and helpfulness.

## Pre-training Datasets
These datasets consist of vast amounts of raw text used for initial model training via next-token prediction.
*   **ROOTs**: A 1.61TB corpus compiled from 498 Hugging Face datasets, covering 46 natural and 13 programming languages [[sources/roots-dataset.md]].
*   **MassiveText**: A 10.5TB dataset comprising MassiveWeb, Books, News, Wikipedia, GitHub, and C4, with 99% of its content in English [[sources/massivetext-dataset.md]].
*   **Wikipedia**: A corpus built from a dump of Wikipedia articles [[sources/wikipedia-corpus.md]].
*   **RedPajama**: A 5TB open-source replica of the LLaMA dataset, sourced from CommonCrawl, C4, Wikipedia, GitHub, Books, and StackExchange [[sources/redpajama-dataset.md]].
*   **PushShift.io Reddit**: A 21.1GB dataset of Reddit submissions and comments from 2005-2019 [[sources/pushshift-reddit.md]].
*   **BigPython**: A 5.5TB dataset of code from GitHub [[sources/bigpython-dataset.md]].

## Instruction-Tuning Datasets
These datasets contain task instructions and examples to teach models to follow directions.
*   **Pool of Prompt (P3)**: 12M examples across 62 tasks from PromptSource, created from 177 datasets for summarization, QA, and classification [[sources/p3-dataset.md]].
*   **xP3**: An 81M example extension of P3 to 46 languages [[sources/xp3-dataset.md]].
*   **Super-NaturalInstructions (SNI)**: 12.4M examples across 1616 tasks, extending P3 with additional multilingual datasets [[sources/super-naturalinstructions.md]].
*   **Flan**: 15M examples across 1836 tasks, built from Muffin, T0-SF, and NIV2, covering 60 languages [[sources/flan-dataset.md]].
*   **OPT-IML**: 18.1M instructions across 1667 tasks [[sources/opt-iml-dataset.md]].
*   **Self-Instruct**: 82k samples generated from 175 seed tasks using GPT-3 [[sources/self-instruct.md]].
*   **Alpaca**: 52k instructions generated using the Self-Instruct method from text-davinci-003 [[sources/alpaca-dataset.md]].
*   **Vicuna**: 125k conversations from ShareGPT using public APIs [[sources/vicuna-dataset.md]].
*   **LLaMA-GPT-4**: 52k instructions, recreating the Alpaca dataset with GPT-4 in English and Chinese [[sources/llama-gpt4-dataset.md]].
*   **Unnatural Instructions**: 68k instructions generated from 15 seed tasks from SNI [[sources/unnatural-instructions.md]].
*   **LIMA**: A carefully curated set of 1k samples to test fine-tuning performance with minimal data [[sources/lima-dataset.md]].

## Alignment Datasets
These datasets are used for Reinforcement Learning from Human Feedback (RLHF) to align model behavior with human values.
*   **Anthropic-HH-RLHF**: 142k human preference comparisons for helpfulness and harmlessness [[sources/anthropic-hh-rlhf.md]].
*   **Anthropic-HH-RLHF-2**: A 39k example subset of the above [[sources/anthropic-hh-rlhf-2.md]].

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/evaluation-datasets-overview.md]]
- [[concepts/instruction-tuning.md]]
- [[concepts/reinforcement-learning-from-human-feedback.md]]