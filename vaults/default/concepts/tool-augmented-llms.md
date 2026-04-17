# Tool-Augmented LLMs

**Summary**: Large language models that are enhanced with the ability to call external tools, APIs, or functions to overcome inherent limitations, such as lack of real-time data or computational skills.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (References).

---

## Purpose and Motivation
Tool augmentation allows LLMs to move beyond text generation to performing actionable tasks. This enables models to access current information, execute code, query databases, or control software, forming the foundation for [[concepts/autonomous-llm-agents.md]]. The goal is to create more capable and grounded systems that can interact with the digital and physical world.

## Key Techniques and Frameworks
Early approaches like **Toolformer** (Schick et al., 2023) demonstrated that LLMs can learn to use tools from annotated examples. Frameworks like **Gorilla** (Patil et al., 2023) focus on robust API calling, while **HuggingGPT** (Shen et al., 2023) orchestrates multiple AI models from a hub. The **ReAct** (Reason + Act) paradigm (Yao et al., 2023) synergizes reasoning and tool-calling in an interleaved manner. Benchmark datasets like **API-Bank** (Li et al., 2023) are used to evaluate these capabilities.

## Integration with Agent Architectures
Tool use is a core capability for autonomous agents. It is closely tied to [[concepts/llm-planning.md]], as the agent must decide which tool to use and when. Effective tool-augmented LLMs often employ **retrieval-augmented generation (RAG)** to find relevant documentation or examples before tool invocation. This area also intersects with research on **vision-language models (VLMs)** that can act as computer control agents (e.g., ScreenAgent).

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/llm-planning.md]]
- [[sources/toolformer-schick-et-al-2023.md]]
- [[sources/gorilla-patil-et-al-2023.md]]
- [[sources/react-yao-et-al-2023.md]]