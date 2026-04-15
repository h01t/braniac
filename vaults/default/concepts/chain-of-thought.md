# Chain-of-Thought (CoT) Reasoning

**Summary**: A prompting technique that encourages language models to generate a step-by-step reasoning process before delivering a final answer, significantly improving performance on complex reasoning tasks.
**Source Context**: Wei et al., "Chain-of-thought prompting elicits reasoning in large language models" (2022).

---

## Technique
Standard prompting asks a model for a direct answer. Chain-of-Thought prompting includes examples in the prompt where the reasoning steps are shown (e.g., "Show your work"). When the model is then given a new problem, it is more likely to generate intermediate reasoning tokens, mimicking a logical thought process. This "reasoning via prompting" unlocks capabilities in arithmetic, commonsense, and symbolic reasoning that are poor with standard prompting [Source: [103]].

## Extensions and Improvements
*   **Self-Consistency**: Improves CoT by sampling multiple reasoning paths and taking the majority answer, acting as a form of ensemble [Source: [104]].
*   **Tree of Thoughts (ToT)**: Generalizes CoT by exploring a tree of potential reasoning steps, allowing for planning and lookahead [Source: [105]].
*   **Fine-tuning for CoT**: Models can be specifically fine-tuned on chain-of-thought data to instill stronger reasoning abilities, as seen in the "CoT Collection" [Source: [101]].