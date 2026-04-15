# mT5 (Multilingual T5)

**Summary**: mT5 is a massively multilingual variant of the T5 model, pre-trained on a dataset spanning over 100 languages, designed to handle a wide variety of NLP tasks across multiple languages.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Relationship to T5
mT5 directly extends the [[entities/t5.md]] framework to a multilingual setting. It uses the same [[concepts/transformer-architectures.md|encoder-decoder architecture]] and "text-to-text" training paradigm but is trained on the mC4 dataset, which contains text in 101 languages (Source: Comprehensive Overview of LLMs.pdf, referencing [11]).

## Purpose
The goal of mT5 is to create a single model capable of performing well on tasks in many languages, promoting cross-lingual transfer and reducing the need for separate models per language.

## Historical Context
Alongside T5, mT5 is mentioned as an early example of a large-scale pre-trained language model that utilized transfer learning via fine-tuning. These models paved the way for later [[concepts/large-language-models.md]] that demonstrated strong zero-shot capabilities (Source: Comprehensive Overview of LLMs.pdf, Introduction).

## Related pages
- [[entities/t5.md]]
- [[concepts/large-language-models.md]]
- [[concepts/transformer-architectures.md]]