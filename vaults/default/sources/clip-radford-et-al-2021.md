# Learning Transferable Visual Models from Natural Language Supervision (CLIP) (Radford et al., 2021)

**Summary**: A vision model trained to connect images and text by learning from a vast dataset of image-text pairs, enabling zero-shot image classification and powerful visual representation learning.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 45: Radford et al., 2021. Learning transferable visual models from natural language supervision. arXiv:2103.00020).

---

## Training and Capabilities
CLIP (Contrastive Language-Image Pre-training) is trained to predict which text caption (from a set of 32,768) is paired with a given image. This simple objective, scaled to hundreds of millions of pairs, results in a model that learns a joint embedding space where similar concepts in images and text are close. It can perform zero-shot classification by comparing an image to a set of text prompts (e.g., "a photo of a dog").

## Foundational Role for Multimodal AI
CLIP is a foundational model for the field of [[concepts/multimodal-llms.md]]. Its visual encoder and the concept of aligning vision and language through contrastive learning have been incorporated into nearly all subsequent large multimodal models (LMMs). It provides the "visual understanding" backbone for many systems that require image comprehension, including [[concepts/autonomous-llm-agents.md]] that interact with screens or physical environments.

## Impact on Agent Perception
For screen-understanding agents like **ScreenAgent** or **OSCar**, CLIP-based representations are crucial for recognizing UI elements, icons, and general visual content in relation to natural language instructions. It enables agents to ground their language-based plans in visual perception, a key step towards generalist embodied AI.

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/autonomous-llm-agents.md]]
- [[sources/screenagent-niu-et-al-2024.md]]