# VCoder

**Summary**: A visual encoder component, often used in conjunction with the Set-of-Mark technique, to process and annotate images for improved object-level perception by multimodal LLMs.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

VCoder is referenced as a key component in enhancing [[concepts/multimodal-perception|multimodal perception]]. It works alongside the [[entities/set-of-mark|Set-of-Mark (SoM)]] technique. The source indicates that MM-LLMs adapted with both VCoder and SoM show significant performance improvements on object-level tasks [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

While the exact architectural details are not specified in the provided text, its role is clear: in a pipeline, a VCoder likely performs the operation of applying marks (like bounding boxes) to an image and generating the accompanying structured data (element descriptions, coordinates) that is then fed to a multimodal LLM for interpretation [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/multimodal-perception.md]]
- [[entities/set-of-mark.md]]