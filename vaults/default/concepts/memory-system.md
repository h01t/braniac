# Memory System

**Summary**: The component of an LLM agent that retains knowledge not embedded in the model's weights, including past experiences and external data.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Purpose

The memory system stores information that the LLM can use to enhance response accuracy and maintain context over long interactions.

## Types

The paper distinguishes between:

- **Short-term memory**: Manages the immediate context within the LLM's token limit.
- **Long-term memory**: Uses external storage mechanisms, such as [[concepts/retrieval-augmented-generation.md]] (RAG) or databases.

## Research Question

RQ4 in the paper investigates how memory mechanisms influence accuracy, robustness to context length limits, and adaptation in long-horizon tasks.

## Related pages
- [[concepts/retrieval-augmented-generation.md]]
- [[sources/fundamentals-of-building-autonomous-llm-agents.md]]