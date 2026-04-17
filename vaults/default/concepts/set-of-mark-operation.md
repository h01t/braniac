# Set-of-Mark (SoM) Operation

**Summary**: Set-of-Mark is a technique to enhance MM-LLM perception by annotating images with explicit markers (e.g., bounding boxes or labels) to guide the model's attention to specific regions or objects.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (citing [64])

---

The Set-of-Mark operation involves annotating images with markers such as bounding boxes or labels that highlight key regions or objects. This structured approach helps the MM-LLM to focus on specific areas during reasoning, thereby improving its understanding of the image and task-specific performance [64].

Experimental evidence shows that MM-LLMs adapted with SoM significantly outperform baseline models on object-level perception tasks [28, 64]. SoM is often used in conjunction with visual encoders like [[concepts/vcoder.md]] to enhance perception.

SoM is particularly useful in complex visual tasks and is part of the broader set of techniques for enhancing multimodal perception in LLM agents.

## Related pages
- [[concepts/multimodal-large-language-models.md]]
- [[concepts/vcoder.md]]
- [[sources/set-of-mark-paper-64.md]]