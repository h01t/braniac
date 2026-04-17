# Toolformer: Language Models Can Teach Themselves to Use Tools (Schick et al., 2023)

**Summary**: A language model that is trained to decide when and how to call external tools (like a search engine or calculator) in a self-supervised manner, using only a few demonstrations per tool.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 47: Schick et al., 2023. Toolformer: Language models can teach themselves to use tools. arXiv:2302.04761).

---

## Self-Supervised Tool Learning
Toolformer's key innovation is its learning process. Given a handful of examples of API calls, the model annotates a large corpus by sampling potential API calls, executing them, and determining if the results are helpful for predicting future tokens. It then fine-tunes itself on these successful examples, learning to incorporate tool use seamlessly into its text generation. This avoids the need for extensive human annotation.

## Significance for Agent Capabilities
Toolformer demonstrated that tool usage could be a learned, integral skill for LLMs, paving the way for more adaptive [[concepts/tool-augmented-llms.md]]. It showed that models could learn to use a diverse set of tools (calculators, Q&A systems, translators, search) in a flexible, context-aware manner. This capability is fundamental for building [[concepts/autonomous-llm-agents.md]] that can extend their knowledge and abilities beyond their training data.

## Legacy and Comparison
Toolformer established a paradigm for tool learning that influenced later models. It differs from approaches like **Gorilla**, which focuses heavily on robust API calling, or **HuggingGPT**, which is an orchestration framework. Toolformer's strength is in its generality and self-supervised learning approach, making it a model-centric solution to tool augmentation.

## Related pages
- [[concepts/tool-augmented-llms.md]]
- [[concepts/autonomous-llm-agents.md]]
- [[sources/gorilla-patil-et-al-2023.md]]
- [[sources/hugginggpt-shen-et-al-2023.md]]