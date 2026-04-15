# WebGPT

**Summary**: A model fine-tuned to interact with a web-browsing environment, retrieve information, and generate answers with citations, improving factual accuracy and verifiability.
**Source Context**: Comprehensive Overview of LLMs.pdf, Table 2.

---

**WebGPT** explores aligning LLMs to use external tools (specifically a web browser) to provide accurate, sourced information.

## Key Findings & Contributions
*   **Human-in-the-Loop Retrieval**: Human labelers played a crucial role in training the model to judge the usefulness of retrieved documents, creating a feedback signal for effective information filtering.
*   **Imitation & Reinforcement Learning**: The model was trained via imitation learning (to use the browser) and reinforcement learning (to produce preferred answers), showing that interacting with a text-based environment can improve end-to-end retrieval and synthesis.
*   **Answers with References**: Generating answers with citations (references) was found to make it significantly easier for human labelers to judge the **factual accuracy** of the model's outputs, a key insight for developing trustworthy AI.

## Related pages
- [[concepts/retrieval-augmented-language-modeling.md]]
- [[concepts/alignment.md]]
- [[entities/sparrow.md]]