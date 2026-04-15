# Visual Encoder (VCoder)

**Summary**: A versatile vision encoder architecture used to enhance the perceptual capabilities of Multimodal Large Language Models (MM-LLMs) by processing control inputs like segmentation and depth maps.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (citing Jain et al., 2023).

---

## Purpose and Rationale
Traditional MM-LLMs can have limitations in fundamental visual perception, such as accurately identifying or counting objects, and may hallucinate non-existent entities. Improving every component of an MM-LLM is computationally expensive. VCoder offers a faster, more cost-effective enhancement method by acting as an adapter that provides the MM-LLM with richer, pre-processed visual information [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Function and Architecture
VCoder functions as an adapter to a base MM-LLM. It enables the model to process "control inputs" that provide fine-grained visual information:
- **Segmentation Maps**: Offer detailed information about object boundaries and backgrounds.
- **Depth Maps**: Provide spatial relationship and distance details.
VCoder uses additional vision encoders to process these inputs and project the extracted information into the LLM's embedding space via an input projector. This enriched data then supplements the standard visual features, giving the LLM backbone a more precise understanding of the scene [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Integration with MM-LLMs
The VCoder adapter is integrated into the standard [[concepts/multimodal-perception.md|MM-LLM architecture]]. It sits alongside the primary modality encoder and input projector, specializing in interpreting structured visual control signals. This approach represents a practical trade-off, significantly improving perceptual performance without the need for a full model retraining [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/perception-system.md]]
- [[concepts/multimodal-perception.md]]