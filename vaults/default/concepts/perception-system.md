# Perception System

**Summary**: The component of an LLM agent that captures and processes environmental data, converting it into meaningful representations for the LLM.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Role

The perception system acts as the "eyes and ears" of an agent, responsible for transforming raw sensory data (e.g., images, text, structured data) into a format that the LLM can understand and use for reasoning.

## Approaches

The paper outlines four main approaches to perception:

1. **Text-Based Perception**: The environment provides textual descriptions directly to the LLM. This is low-cost but limited to text-only environments.
2. **Multimodal Perception**: Uses [[concepts/multimodal-perception.md]] to process both textual and visual information, often through [[concepts/vision-language-models.md]] or [[concepts/multimodal-large-language-models.md]].
3. **Information Tree/Structured Data**: Uses structured representations like DOM trees or accessibility trees for GUI tasks.
4. **Tool-Based**: Leverages external tools to preprocess sensory data.

## Multimodal Perception

For agents operating in graphical user interfaces (GUIs) or real-world environments, multimodal perception is crucial. The paper describes the architecture of [[concepts/multimodal-large-language-models.md]] and enhancements such as [[entities/vcoder.md]].

## Challenges

Multimodal perception still faces challenges in precise spatial understanding, object counting, and hallucination.

## Related pages
- [[concepts/multimodal-perception.md]]
- [[concepts/vision-language-models.md]]
- [[concepts/multimodal-large-language-models.md]]
- [[sources/fundamentals-of-building-autonomous-llm-agents.md]]