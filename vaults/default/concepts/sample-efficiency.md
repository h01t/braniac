# Sample Efficiency

**Summary**: The study of how to achieve high model performance with minimal amounts of task-specific training data, challenging the assumption that more data always leads to better results.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.2.5.

---

Research into sample efficiency in fine-tuning and alignment reveals that carefully selected or constructed small datasets can be remarkably effective, reducing computational costs and data annotation burdens.

## Key Findings
*   **Less Data Can Suffice**: Studies find that models trained on a fraction (e.g., 25%) of the total downstream data can achieve state-of-the-art performance.
*   **Quality over Quantity**: Selecting a high-quality "coreset" (e.g., 0.5% of data) can sometimes improve performance compared to training on the entire dataset.
*   **The LIMA Effect**: The **LIMA** model demonstrated that a mere **1,000** meticulously curated demonstration examples are enough for fine-tuning to achieve performance comparable to much larger models like GPT-4.
*   **Efficient Alignment**: Models trained on unfiltered data, while initially more toxic, may require fewer samples for subsequent safety alignment.

## Related pages
- [[concepts/instruction-tuning.md]]
- [[concepts/alignment.md]]
- [[entities/lima.md]]