# Vision-Language Models (VLMs)

**Summary**: A class of models trained to understand and generate content by aligning representations from visual (image/video) and linguistic (text) modalities, enabling tasks like image captioning, visual question answering, and visual grounding for agents.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (citing architecture from [67] and foundational models like CLIP [45]).

---

## Core Function and Training
Vision-Language Models are typically trained on large datasets of image-text pairs using objectives like contrastive learning (e.g., CLIP) or generative modeling. This training aligns visual and textual features into a shared embedding space, allowing the model to associate concepts across modalities.

## Role in Agent Perception
VLMs are a foundational technology for the [[concepts/perception-system.md]] of [[concepts/autonomous-llm-agents.md]] that operate in graphical environments. They enable agents to interpret screenshots, identify UI elements, and understand visual context in relation to natural language instructions. This capability is critical for benchmarks like [[sources/osworld-benchmark.md]] and [[sources/webarena-zhou-et-al-2024.md]].

## Relation to Multimodal LLMs (MLLMs)
While VLMs focus on cross-modal alignment, [[concepts/multimodal-llms.md]] (MLLMs) often build upon VLM components but integrate them with a large language model backbone for more advanced reasoning and generation. VLMs can be seen as a key perceptual subsystem within a larger MLLM or agent architecture.

## Examples and Applications
*   **CLIP (Radford et al., 2021)**: Provides robust visual representations aligned with text, widely used as a component in larger systems.
*   **Agent Use**: Agents like **ScreenAgent** [41] and **OSCar** use VLMs/MLLMs to perceive GUI states and plan actions.

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/perception-system.md]]
- [[sources/clip-radford-et-al-2021.md]]
- [[sources/screenagent-niu-et-al-2024.md]]