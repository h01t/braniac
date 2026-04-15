# mT5

**Summary**: A multilingual variant of the T5 model, pre-trained on text from 101 languages in the mC4 corpus.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

**Architecture & Data**: mT5 (multilingual T5) extends the [[entities/t5.md]] architecture to support many languages. It is trained on the mC4 dataset, which is derived from Common Crawl and covers 101 languages. To accommodate this linguistic diversity, mT5 uses a very large vocabulary of 250,000 tokens.

**Training Strategy**: To prevent the model from overfitting to high-resource languages or underfitting low-resource ones, mT5 employs a tailored data sampling procedure. This procedure ensures examples are drawn from all languages according to a balanced strategy.

**Fine-Tuning Insight**: The paper suggests that when fine-tuning for a task where English data is available, including a small amount of pre-training data from *all* languages can help the model generate correct outputs in non-English languages as well.

## Related pages
- [[entities/t5.md]]
- [[concepts/multilingual-models.md]]