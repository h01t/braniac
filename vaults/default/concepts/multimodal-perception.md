# Multimodal Perception

**Summary**: The ability of an agent to process and integrate information from multiple modalities, such as text and images.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Importance

For agents operating in real-world or GUI environments, multimodal perception is crucial because the environment provides visual and textual cues.

## Implementation

Multimodal perception in LLM agents is typically achieved through:

- [[concepts/vision-language-models.md]] (VLMs): Models trained to align visual and linguistic representations.
- [[concepts/multimodal-large-language-models.md]] (MM-LLMs): Augment powerful LLMs with multimodal inputs and outputs.

## Architecture

MM-LLMs often consist of modality encoders, input projectors, an LLM backbone, and output projectors. The paper references the architecture from [67].

## Enhancements

To address limitations in visual perception, external visual encoders like [[entities/vcoder.md]] can be used to provide additional information such as segmentation and depth maps.

## Related pages
- [[concepts/vision-language-models.md]]
- [[concepts/multimodal-large-language-models.md]]
- [[entities/vcoder.md]]
- [[sources/fundamentals-of-building-autonomous-llm-agents.md]]