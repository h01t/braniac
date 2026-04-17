# Multimodal Large Language Models (MLLMs)

**Summary**: Large language models that are capable of processing and understanding multiple types of input data, such as images, video, and audio, in addition to text.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (References).

---

## Capabilities and Evolution
Multimodal LLMs integrate visual (and sometimes auditory) perception with linguistic reasoning. This allows them to describe images, answer questions about visual content, and even perform tasks based on screen perceptions, which is vital for agents that interact with graphical user interfaces (GUIs). Key models and techniques include **GPT-4V** with Set-of-Mark prompting (Yang et al., 2023), **VCoder** for versatile vision encoding (Jain et al., 2023), and **CLIP** for learning visual concepts from natural language (Radford et al., 2021).

## Role in Autonomous Agents
For [[concepts/autonomous-llm-agents.md]], multimodal perception is essential for operating in real-world digital environments. Agents like **ScreenAgent** (Niu et al., 2024) and **OSCar** (Wang & Liu, 2024) use MLLMs to understand screen content and generate actions. This capability turns an LLM into a generalist computer control agent. Surveys (Zhang et al., 2024; Song et al., 2025) track the rapid progress in this area, highlighting models specialized for applications like robotics and web navigation.

## Technical Challenges and Surveys
Major challenges include aligning representations across modalities, managing long-context visual data, and reducing **hallucination** in multimodal outputs. Research also focuses on efficient training methods and evaluating the grounding ability of these models. The field is closely watched as it significantly expands the potential deployment scenarios for AI agents.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/hallucination-in-llms.md]]
- [[sources/clip-radford-et-al-2021.md]]
- [[sources/screenagent-niu-et-al-2024.md]]
- [[sources/mm-llms-survey-zhang-et-al-2024.md]]