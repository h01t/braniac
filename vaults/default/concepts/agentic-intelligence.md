# Agentic Intelligence

**Summary**: The capability of AI models to autonomously decompose complex problems into multi-step plans and execute long sequences of interleaved reasoning and actions, often involving tool use. Kimi K2.5 is designed to advance this field.
**Source Context**: 2602.02276v1.pdf

---

## Definition and Context
[[concepts/agentic-intelligence.md]] represents an evolution beyond standard Large Language Models (LLMs), where models exhibit the ability to act autonomously to achieve goals. This involves problem decomposition, planning, tool calling, and sequential execution of actions. Recent advances from models like GPT-5.2, Claude Opus 4.5, Gemini 3 Pro, and Kimi K2-Thinking demonstrate substantial progress in these capabilities.

## Challenges and Kimi K2.5's Approach
A primary challenge for existing agentic systems is their reliance on sequential execution, which leads to linear scaling of inference time and unacceptable latency for complex, heterogeneous tasks. [[entities/kimi-k2-5.md]] addresses this by introducing the [[concepts/agent-swarm.md]] framework, which enables parallel agent orchestration. Furthermore, Kimi K2.5 integrates [[concepts/joint-optimization-text-vision.md]] to create a unified architecture for general-purpose agentic intelligence that works across vision and language.

## Related pages
- [[entities/kimi-k2-5.md]]
- [[concepts/agent-swarm.md]]