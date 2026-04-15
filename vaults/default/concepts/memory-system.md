# Memory System

**Summary**: The component of an LLM agent responsible for retaining knowledge that is not embedded in the model's weights, including past experiences, documents, and structured data, to enhance response accuracy and task performance.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Purpose and Function
The memory system allows an [[concepts/llm-agent.md]] to overcome the static knowledge and context window limitations of its base LLM. It stores information across interactions, enabling the agent to learn from past experiences, reference relevant external knowledge, and maintain context over long-horizon tasks [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Types of Memory
The source discusses memory in terms of its temporal scope and mechanism:
- **Short-Term Memory**: Often managed via context window techniques, this holds recent observations, actions, and thoughts relevant to the current task step. Effective context management is crucial for maintaining coherence in ongoing dialogues or multi-step plans.
- **Long-Term Memory**: Retains knowledge across different sessions or tasks. This can include:
    - **Retrieval-Augmented Generation (RAG)**: A technique where the agent retrieves relevant information from an external knowledge base (like documents or databases) and injects it into the prompt to ground its responses in factual data.
    - **Structured Data Stores**: Such as relational databases or vector databases that store past interactions, task results, or learned procedures [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Impact and Research
The paper's **RQ4** investigates how long-term and short-term memory mechanisms influence accuracy, robustness to context length limits, and adaptation in long-horizon tasks. Effective memory systems are key for agents to avoid repeating mistakes, leverage previously learned solutions, and adapt to user preferences over time [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Integration with Other Systems
The memory system interacts closely with the [[concepts/reasoning-system.md]] (providing historical context for planning) and the [[concepts/perception-system.md]] (storing perceived information for future use). It is a foundational element for building practical and useful autonomous applications [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/llm-agent.md]]
- [[concepts/reasoning-system.md]]