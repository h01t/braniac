# T5 Model

**Summary**: T5 (Text-To-Text Transfer Transformer) is an influential early large language model that framed all NLP tasks as a text-to-text problem, utilizing an encoder-decoder architecture.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Overview and Significance
T5, developed by Google Research, is highlighted as an early significant work in the progression towards modern LLMs. It was presented as part of the trend where increasing the scale of Pre-trained Language Models (PLMs) led to major performance gains [[concepts/pretraining.md]] (Source: Comprehensive Overview of LLMs.pdf).

## Architecture and Approach
T5 employs a standard **encoder-decoder** [[concepts/llm-architecture.md]]. Its key innovation was the "Text-To-Text" framework, where every task—be it translation, classification, or summarization—is formatted as taking text as input and generating text as output. This unified approach simplified the process of transferring the model to diverse downstream tasks (Source: Comprehensive Overview of LLMs.pdf). The model's multilingual variant, mT5, is also mentioned.

## Historical Context
The text places T5 in the lineage of LLM development, noting that early works like T5 employed transfer learning, which was later surpassed by the zero-shot transfer capabilities demonstrated by models like GPT-3 [[entities/gpt-3-model.md]] (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/llm-architecture.md]]
- [[concepts/pretraining.md]]
- [[entities/gpt-3-model.md]]