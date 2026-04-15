# Multimodal Large Language Models

**Summary**: Models that integrate large language models with visual (and sometimes audio) encoders to understand and generate content across multiple modalities like images and video.
**Source Context**: Comprehensive Overview of LLMs.pdf (citations 269-275)

---

[[concepts/multimodal-models.md]] extend the capabilities of [[concepts/large-language-models.md]] beyond text to process and reason about visual and auditory information.

**Vision-Language Models (VLMs)**: Foundational work includes Flamingo (Alayrac et al., 2022), a visual language model for few-shot learning [[sources/alayrac-et-al-flamingo-2022.md]]. BLIP-2 (Li et al., 2023) bootstraps vision-language pre-training by combining frozen image encoders and large language models [[sources/li-et-al-blip-2-2023.md]]. Liu et al. (2023) introduce visual instruction tuning for creating powerful VLMs like LLaVA [[sources/liu-et-al-visual-instruction-tuning-2023.md]].

**Video Understanding Models**: Extending to video, models like VideoChat (Li et al., 2023), Video-ChatGPT (Maaz et al., 2023), and Video-LLaMA (Zhang et al., 2023) aim for detailed video understanding via large vision and language models [[sources/li-et-al-videochat-2023.md]][[sources/maaz-et-al-video-chatgpt-2023.md]][[sources/zhang-et-al-video-llama-2023.md]]. These models combine visual features with temporal understanding.

**Training Paradigms**: A key challenge is efficiently aligning visual representations with LLMs. Many approaches keep the LLM frozen and train a lightweight adapter network, as seen in BLIP-2.

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/vision-encoders.md]]
- [[sources/alayrac-et-al-flamingo-2022.md]]
- [[sources/li-et-al-blip-2-2023.md]]