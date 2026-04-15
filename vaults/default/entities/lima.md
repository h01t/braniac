# LIMA

**Summary**: A model that demonstrated the "Less Is More for Alignment" principle, achieving strong performance by fine-tuning on only 1,000 carefully curated demonstration examples.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.2.5 and Table 2.

---

**LIMA** (Less Is More for Alignment) challenged the prevailing notion that large-scale fine-tuning data is necessary for good performance.

## Key Insight
The core finding from LIMA is that a **small set of extremely high-quality, diverse demonstrations** can be sufficient for a fine-tuned model to generalize effectively. It achieved performance competitive with state-of-the-art models like GPT-4 using only 1,000 samples, highlighting the paramount importance of **data quality over quantity** in supervised fine-tuning for alignment.

## Implications
This work has significant implications for reducing the cost and complexity of model alignment, suggesting that focused effort on curating a superb small dataset can be more effective than amassing a large, noisy one.

## Related pages
- [[concepts/sample-efficiency.md]]
- [[concepts/alignment.md]]
- [[concepts/instruction-tuning.md]]