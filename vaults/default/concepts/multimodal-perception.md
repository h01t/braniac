# Multimodal Perception

**Summary**: The capability of an LLM agent to process and integrate information from multiple sources, primarily text and visual inputs (images, videos), which is crucial for operating in real-world or GUI environments.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Definition and Importance
Multimodal perception allows an agent to understand and reason about the world through more than just text. For agents functioning in graphical user interfaces (GUIs) or real-world settings, this capability is essential, as critical information is often conveyed visually [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Key Technology: MM-LLMs
This capability is largely enabled by **Multimodal Large Language Models (MM-LLMs)**. Unlike earlier Vision-Language Models (VLMs) that primarily align visual and linguistic representations, MM-LLMs leverage a powerful, off-the-shelf LLM as their central reasoning engine. This allows them to perform complex reasoning, planning, and generation across multimodal tasks [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Architecture of MM-LLMs
The general architecture for understanding and generation tasks typically involves a structured pipeline:
1.  **Modality Encoder (ME)**: Encodes inputs from various modalities (e.g., images, video) into feature embeddings. For vision, encoders like Vision Transformers (ViT) are commonly used.
2.  **Input Projector**: A critical bridge that aligns the encoded non-textual features (like visual embeddings) with the text feature space of the LLM backbone, making them comprehensible to the LLM.
3.  **LLM Backbone**: The core LLM processes the aligned multimodal representations to perform reasoning and generate responses.
4.  **Output Projector & Modality Generator**: For generation tasks, these components map the LLM's output into features for another modality (e.g., generating an image via a diffusion model) [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Challenges and Enhancements
Despite advances, MM-LLMs can still struggle with precise spatial relationships, accurate object counting, and hallucination. A practical method to enhance their visual perception is to employ external **visual encoders**. These specialized models extract detailed information from images, such as segmentation maps or depth data, which is then fed to the MM-LLM to improve interpretation. Techniques like [[concepts/set-of-mark-som.md]] also provide a structured way to guide the model's attention [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/perception-system.md]]
- [[concepts/visual-encoder-vcoder.md]]
- [[concepts/set-of-mark-som.md]]