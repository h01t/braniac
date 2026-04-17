# Multimodal Large Language Models (MM-LLMs)

**Summary**: Advanced models that augment powerful LLMs to support multimodal inputs and outputs, enabling complex reasoning across modalities.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Architecture

MM-LLMs typically consist of:

1. **Modality Encoder (ME)**: Encodes inputs from various modalities (e.g., images) into embeddings.
2. **Input Projector**: Aligns non-textual embeddings with the LLM's text feature space.
3. **LLM Backbone**: The core reasoning engine that processes aligned multimodal representations.
4. **Output Projector and Modality Generator**: For generating outputs in non-text modalities.

## Advantages

MM-LLMs leverage the inherent reasoning capabilities of LLMs, allowing them to perform tasks that require understanding and generation across modalities.

## Enhancements

To improve visual perception, external visual encoders like [[entities/vcoder.md]] can be integrated.

## Related pages
- [[concepts/multimodal-perception.md]]
- [[concepts/vision-language-models.md]]
- [[entities/vcoder.md]]
- [[sources/fundamentals-of-building-autonomous-llm-agents.md]]