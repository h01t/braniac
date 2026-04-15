# Audio Captioning

**Summary**: The task of generating descriptive natural language text for audio content, often using weakly supervised or multi-modal learning approaches.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition and Purpose
Audio captioning involves automatically creating textual descriptions for sounds, similar to image captioning for visual content. This is a key task in audio-language multimodal research, enabling applications in accessibility, content indexing, and human-computer interaction.

## Datasets and Methods
The WavCaps dataset is a prominent resource for this field. It is a large-scale, weakly-labelled audio captioning dataset created with ChatGPT assistance to filter and process web audio-text pairs, facilitating training for audio-language models (Source: [276]).

Models tackling this task often integrate audio encoders with large language models. The broader field of [[concepts/multimodal-language-modeling.md]] includes architectures like Macaw-LLM, which are designed to handle audio alongside other modalities (Source: [277]).

## Related pages
- [[concepts/multimodal-language-modeling.md]]
- [[entities/wavcaps-dataset.md]]