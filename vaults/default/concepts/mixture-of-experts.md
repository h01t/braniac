# Mixture of Experts (MoE)

**Summary**: Mixture of Experts (MoE) is a neural network architecture design where the model consists of many specialized sub-networks ("experts"), and a gating network dynamically routes each input to only a few relevant experts, enabling massive parameter counts with manageable computational cost per inference.
**Source Context**: https://intuitionlabs.ai/articles/chinese-open-source-llms-2025

---

## How It Works
In an MoE-based [[concepts/large-language-model.md]], the model is divided into a set of expert networks, each potentially specializing in different types of data or tasks. For each input token or sequence, a lightweight router network selects a small, fixed number of experts (e.g., 2 out of 64) to process that input. This allows the total model to have a very high parameter count (e.g., hundreds of billions) while the computational cost per forward pass is proportional to only the active experts.

## Advantages
The primary advantage is **efficiency at scale**. It allows for the training of models with trillions of parameters without a proportional increase in inference latency or compute cost. This facilitates the creation of more powerful and capable models.

## Prominence in Chinese LLMs
MoE architecture is prominently featured in the advanced models within the [[concepts/chinese-open-source-llm-landscape-2025.md]]. Key examples include:
*   **[[entities/deepseek.md]] V3**: Estimated at ~250B total parameters with only 37B active per query [^18].
*   **[[entities/zhipu-ai.md]] GLM-4.5**: A 355B parameter MoE model described as one of China's most advanced open-source MoE models in 2025 [^5][^6].

## References
[^5]: Reuters - China's AI startup Zhipu releases open-source model GLM-4.5 (2025-07-28)
[^6]: SCMP - Alibaba, Zhipu roll out new AI models amid heated open-source race
[^18]: Reuters - China's DeepSeek releases AI model upgrade, intensifies rivalry with OpenAI (2025-03-25)

## Related pages
- [[concepts/large-language-model.md]]
- [[concepts/chinese-open-source-llm-landscape-2025.md]]
- [[entities/deepseek.md]]
- [[entities/zhipu-ai.md]]