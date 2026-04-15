# WavCaps: A ChatGPT-Assisted Weakly-Labelled Audio Captioning Dataset

**Summary**: Presents the WavCaps dataset, a large-scale resource for audio-language research created by using ChatGPT to filter and process web-sourced audio-text pairs.
**Source Context**: arXiv preprint arXiv:2303.17395 (2023).

---

## Key Contributions
This paper introduces the [[entities/wavcaps-dataset.md]], addressing the scarcity of large-scale, high-quality audio captioning data. The core innovation is the use of ChatGPT as a tool in the dataset curation pipeline to clean and reformat noisy audio metadata and captions scraped from the web, resulting in a "weakly-labelled" dataset suitable for training.

## Methodology
The authors collect a vast number of (audio, text) pairs from public sources. They then design prompts for ChatGPT to perform tasks like caption correction, sound event tagging, and text filtering. This semi-automated process enhances data quality and scale without exhaustive manual annotation.

## Significance for Multimodal Research
WavCaps enables the training and evaluation of models for [[concepts/audio-captioning.md]] and contributes to the broader advancement of [[concepts/multimodal-language-modeling.md]] by providing a crucial audio-language component.

## Related pages
- [[entities/wavcaps-dataset.md]]
- [[concepts/audio-captioning.md]]