# Perception System

**Summary**: The component of an LLM agent responsible for capturing and processing data from the environment (e.g., images, text) and converting it into meaningful representations for the LLM.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Role and Function
The perception system acts as an agent's "eyes and ears," initiating the interaction cycle with the world. Its primary function is to transform raw environmental stimuli—such as images, sounds, or text—into a meaningful representation that the LLM's [[concepts/reasoning-system.md]] can understand and utilize for planning and decision-making [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Architectural Approaches
The source outlines four main approaches to designing a perception system, with the choice dependent on environmental complexity and required information.

### Text-Based Perception
In the simplest form, the environment provides direct textual observations to the LLM's prompt. The perception system requires minimal intervention here. This approach has low computational overhead but is limited to purely text-driven environments like chats or simulations [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

### Multimodal Perception
For agents operating in real-world or graphical user interface (GUI) environments, processing visual information is crucial. This is achieved through **Multimodal Large Language Models (MM-LLMs)**, which augment powerful LLMs to support multimodal inputs. The general MM-LLM architecture includes:
- A **Modality Encoder** to extract features from images/videos.
- An **Input Projector** to align visual features with the LLM's text space.
- The **LLM Backbone** as the core reasoning engine.
- Optional **Output Projector** and **Modality Generator** for multimodal generation tasks [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

### Information Tree / Structured Data Perception
Agents can also perceive environments described via structured data representations, such as the Document Object Model (DOM) for web pages or accessibility trees for software GUIs. This provides a more precise, programmatic understanding of the interface state compared to raw pixels [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

### Tool-Based Perception
Specialized external tools or models can be used to pre-process environmental data. For example, an Optical Character Recognition (OCR) tool might extract text from a screenshot before passing it to the LLM [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Enhancing Visual Perception
MM-LLMs can be enhanced using visual encoders to improve fundamental perception like object identification and counting, and to reduce hallucination. Techniques include:
- **Segmentation and Depth Maps**: Models like VCoder use adapters to process control inputs like segmentation maps (for object details) and depth maps (for spatial relationships), projecting this information into the LLM's embedding space [[sources/fundamentals-of-building-autonomous-llm-agents.md]].
- **Set-of-Mark (SoM)**: Annotating images with explicit markers (e.g., bounding boxes) to guide the MM-LLM's attention to specific regions, thereby improving task-specific performance and understanding [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/llm-agent.md]]
- [[concepts/multimodal-perception.md]]
- [[concepts/visual-encoder-vcoder.md]]
- [[concepts/reasoning-system.md]]