# Set-of-Mark (SoM)

**Summary**: A technique to enhance multimodal perception by annotating images with explicit markers (e.g., bounding boxes, labels) to guide an MM-LLM's attention to specific regions during reasoning.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Purpose and Function
The Set-of-Mark (SoM) operation provides a structured approach to improve an MM-LLM's ability to handle complex visual tasks. It addresses limitations in visual understanding by making key regions or objects within an image explicitly identifiable to the model [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Process
The process involves pre-processing an input image by adding explicit visual markers. These markers could be:
- Bounding boxes drawn around objects.
- Numeric or alphabetic labels placed on regions of interest.
- Other forms of visual annotation that highlight specific areas.
These annotated images are then fed into the MM-LLM. The marks serve as a guide, helping the model focus its reasoning on the relevant parts of the visual input, thereby improving task-specific performance and reducing ambiguity [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Context and Trade-offs
SoM is presented as a method to enhance [[concepts/multimodal-perception.md]]. However, the source also notes a potential drawback: for agents equipped with modules like SoM, it has been observed that they can sometimes constrain the agent's action space, potentially hindering exploration and adaptability to diverse tasks [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/perception-system.md]]
- [[concepts/multimodal-perception.md]]