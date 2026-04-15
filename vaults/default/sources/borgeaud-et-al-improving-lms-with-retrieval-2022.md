# Borgeaud et al., Improving Language Models with Retrieval (2022)

**Summary**: Presents a method for improving language models by retrieving information from a massive text corpus (trillions of tokens) during pre-training, enhancing the model's knowledge and factual accuracy.
**Source Context**: Borgeaud, S., Mensch, A., Hoffmann, J., et al. *Improving language models by retrieving from trillions of tokens*, ICML 2022. From Comprehensive Overview of LLMs.pdf (citation 193)

---

This work integrates [[concepts/retrieval-augmented-generation-rag.md]] directly into the pre-training process of a large language model. The model, a precursor to models like RETRO, is trained to condition its predictions on relevant text snippets retrieved from a fixed database, blending parametric memory (weights) with non-parametric memory (the corpus).

This approach aims to create models that are more factual and have a larger effective knowledge capacity, addressing issues of static knowledge cutoffs and [[concepts/hallucination.md]] in standard LLMs.

## Related pages
- [[concepts/retrieval-augmented-generation-rag.md]]
- [[concepts/knowledge-grounding.md]]
- [[entities/borgeaud-s.md]]