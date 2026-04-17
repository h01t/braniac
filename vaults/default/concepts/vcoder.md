# VCoder

**Summary**: VCoder is a versatile vision encoder for Multimodal Large Language Models that enhances visual perception by processing control inputs like segmentation maps and depth maps.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (citing [28]: "VCoder: Versatile Vision Encoders for Multimodal Large Language Models" by Jain et al., 2023)

---

VCoder is introduced as an adapter to a base MM-LLM that enables the model to process control inputs such as segmentation maps and depth maps. Segmentation maps provide fine-grained object and background information, while depth maps provide spatial relationship details. The information from these inputs is projected into the LLM's embedding space via additional vision encoders [45].

According to the source, VCoder significantly improves MM-LLM performance on object-level perception tasks, leading to improved counting accuracy and reduced hallucination [28]. It represents a faster and more cost-effective way to enhance perception compared to improving each individual component of an MM-LLM.

VCoder is one of the methods to enhance visual perception in MM-LLMs, alongside techniques like [[concepts/set-of-mark-operation.md]].

## Related pages
- [[concepts/multimodal-large-language-models.md]]
- [[concepts/set-of-mark-operation.md]]
- [[sources/vcoder-jain-et-al-2023.md]]