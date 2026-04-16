# GPT Series Evolution

**Summary**: The chronological development of OpenAI's Generative Pre-trained Transformer models, from GPT-1 to GPT-5.4, highlighting increasing scale, multimodality, reasoning capabilities, and a strategic shift from open-source to proprietary and selective open-weight releases.
**Source Context**: https://grokipedia.com/page/OpenAI

---

## Evolution and Capabilities
The GPT series, started in 2018, consists of large language models pre-trained on massive text data and fine-tuned for specific tasks. This approach enables emergent abilities like [[concepts/zero-shot-learning.md]] and [[concepts/few-shot-learning.md]] [Source]. Post-GPT-3, detailed parameter counts and training details became less transparent, but benchmarks show continuous gains in areas like perplexity and factual accuracy [Source]. The evolution is driven by greater compute (e.g., GPT-3's ~3.14 × 10^23 FLOPs) and architectural improvements [Source].

## Model Timeline and Key Innovations
| Model | Release Date | Key Capabilities and Innovations |
|-------|--------------|----------------------------------|
| GPT-1 | June 11, 2018 | Introduced generative pre-training; demonstrated transfer learning for NLP tasks [Source]. |
| GPT-2 | February 14, 2019 | Scaled architecture; initial release withheld due to misuse risks; showed improved sample efficiency [Source]. |
| GPT-3 | June 11, 2020 | Pioneered in-context learning with few-shot prompting; trained on 45TB of text [Source]. |
| GPT-3.5 | November 30, 2022 | Instruction-tuned variant optimized for dialogue; integrated Reinforcement Learning from Human Feedback (RLHF); powered initial ChatGPT [Source]. |
| GPT-4 | March 14, 2023 | Multimodal (text + image inputs); surpassed human-level performance on professional exams; incorporated safety mitigations [Source]. |
| GPT-4o | May 13, 2024 | "Omni" model for native audio, vision, and text processing in real-time; 128K token context [Source]. |
| o1 | September 12, 2024 | Reasoning-focused model using internal chain-of-thought; excels at complex math and science problems [Source]. |
| GPT-4.5 | February 27, 2025 | Enhanced unsupervised pre-training for improved pattern recognition and world modeling [Source]. |
| GPT-5 | August 7, 2025 | Flagship model unifying the GPT and o-series; superior coding and multi-step reasoning; made default for free ChatGPT users [Source]. |
| GPT-5.1 | November 12, 2025 | Featured smarter conversational abilities and advanced reasoning via "Instant" and "Thinking" variants [Source]. |
| GPT-5.2 | December 11, 2025 | Base model with stronger broad knowledge and reasoning; Pro variant demonstrated potential in fundamental science by conjecturing a formula in quantum chromodynamics (verified Feb 2026) [Source]. |
| GPT-5.3-Codex | February 5, 2026 | Advanced agentic coding model combining frontier coding with general reasoning for complex, long-horizon software lifecycle tasks [Source]. |
| GPT-5.4 Family | By March 2026 | Flagship proprietary line for advanced reasoning, coding, and agentic workflows, with variants like Pro, Mini, and Nano [Source]. |

## Release Strategy and Openness
OpenAI's release pattern is often reactive, spurred by competition. The company has accelerated releases in response to competitors like Google Gemini and Anthropic Claude, sometimes following internal "code red" memos [Source]. The strategy shifted from open-sourcing early models (GPT-1, partial GPT-2) to proprietary APIs after GPT-3, citing safety worries over misuse and commercial needs [Source]. In 2025, OpenAI re-entered the open ecosystem by releasing the **gpt-oss series** (e.g., gpt-oss-120b) under an Apache 2.0 license, providing downloadable weights for local deployment and fine-tuning, countering competitors like [[entities/meta.md]] and [[entities/mistral-ai.md]] [Source].

## Model Categories (March 2026)
As of March 2026, OpenAI models fall into three main categories:
1.  **Proprietary (Closed-source)**: The flagship models (e.g., GPT-5.4 family, [[concepts/dall-e.md|DALL·E 3]], [[concepts/sora.md|Sora]]), accessible only via API or ChatGPT. Weights are not public [Source].
2.  **Open-Weight**: The gpt-oss series and safeguard variants. Weights are publicly downloadable (Apache 2.0) for local deployment but are not served by the OpenAI API [Source].
3.  **Historically Open-Source**: Older fully released models like GPT-2 (2019) [Source].

## Related pages
- [[concepts/openai-open-weight-models.md]]
- [[concepts/reinforcement-learning-from-human-feedback.md]]
- [[concepts/hallucination-ai.md]]