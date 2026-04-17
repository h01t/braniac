# Multimodal Large Language Models (MM-LLMs)

**Summary**: Multimodal Large Language Models are LLMs that can process and understand multiple types of data, such as text, images, and audio, enabling them to perform tasks that require multimodal understanding.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

MM-LLMs extend traditional LLMs by incorporating multimodal processing capabilities. They typically consist of architectural components that allow them to handle inputs like text, images, and audio. However, they often require enhancement in visual perception to address limitations in tasks like object identification and counting, and to reduce hallucination.

One approach to enhancing perception in MM-LLMs is the use of visual encoders, such as [[concepts/vcoder.md]], which extract relevant information from images and project it into the LLM's embedding space. Another technique is the [[concepts/set-of-mark-operation.md]], which uses explicit markers on images to guide the model's attention.

MM-LLMs are used in various perception tasks, and their capabilities are summarized in Table 1 of the source document, which compares different perception approaches.

## Related pages
- [[concepts/vcoder.md]]
- [[concepts/set-of-mark-operation.md]]
- [[concepts/tool-augmented-perception.md]]