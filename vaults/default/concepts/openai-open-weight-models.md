# OpenAI Open-Weight Models

**Summary**: OpenAI's suite of publicly downloadable AI models, released in 2025 under the Apache 2.0 license, marking a strategic return to open-weight releases for local deployment and fine-tuning.
**Source Context**: https://grokipedia.com/page/OpenAI

---

## Overview
In August 2025, OpenAI released its first major open-weight language models since GPT-2, known as the **gpt-oss series** [Source]. This move marked a strategic shift to counter competitors like [[entities/meta.md]] and [[entities/mistral-ai.md]] in the open-weight ecosystem [Source]. These models have publicly downloadable weights under a permissive Apache 2.0 license and are designed to be run on local hardware, from laptops to data centers. **They are not available via the OpenAI API or ChatGPT** [Source].

## Key Models and Features
The gpt-oss series emphasizes reasoning, tool use, and customizability. Key features include full chain-of-thought reasoning, tool use (e.g., web search, code execution), and adjustable reasoning effort (low/medium/high) [Source]. They are fully fine-tunable with open-source tools [Source].

| Model | Parameters | Best For | Key Strengths & Notes |
|-------|------------|----------|------------------------|
| **gpt-oss-120b** | 120B | Advanced local reasoning & agentic tasks | Strong benchmark performance, close to proprietary o3/o4-mini; requires high-end hardware [Source]. |
| **gpt-oss-20b** | 20B | Efficient local / laptop deployment | Optimized for consumer hardware; excellent reasoning for its size [Source]. |
| **gpt-oss-safeguard-120b** | ~117B (5.1B active) | Safety & policy enforcement | Custom safety policies; production-grade trust & safety [Source]. |
| **gpt-oss-safeguard-20b** | ~21B (3.6B active) | Low-latency safety tasks | Lightweight safety reasoning [Source]. |

## Strategic Context
This release represents a selective open-weight strategy. OpenAI continues to prioritize proprietary frontier models (like the GPT-5.4 family) for cutting-edge performance, safety control, and monetization, while the open-weight models serve developer flexibility, on-premise use, and broader accessibility [Source].

## Related pages
- [[concepts/gpt-series-evolution.md]]
- [[concepts/proprietary-ai-models.md]]