# Set-of-Mark (SoM)

**Summary**: A visual perception technique that enhances multimodal LLMs by annotating images with targeted marks, such as bounding boxes, to improve object-level understanding and reduce hallucination.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

Set-of-Mark (SoM) is a method used to augment [[concepts/multimodal-perception|multimodal perception]] in LLM agents. It involves overlaying an image with specific marks—typically bounding boxes, but potentially other annotations—around objects or regions of interest.

## Function and Impact
When integrated with a visual encoder (like **VCoder**), SoM provides structured visual prompts to a multimodal LLM. According to the source, "MM-LLMs adapted with VCoder and SoM significantly outperform baseline models on object-level perception tasks, demonstrating improved counting accuracy and reduced hallucination" [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

In a practical application, such as GUI automation, a visual encoder using SoM would draw a box on every interactive element on a screen (e.g., buttons, checkboxes), store the coordinates, and output both the marked image and a structured list describing each detected element [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

## Related pages
- [[concepts/multimodal-perception.md]]
- [[entities/vcoder.md]]