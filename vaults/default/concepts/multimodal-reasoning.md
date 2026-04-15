# Multimodal Reasoning

**Summary**: The capability of AI systems to perform logical inference and problem-solving using information from multiple modalities such as text, images, and audio.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Approaches and Models
Multimodal reasoning often combines perception (understanding the content of an image or audio clip) with cognition (answering questions or making decisions). Models like MM-React prompt ChatGPT to generate structured reasoning traces and decide on actions using multimodal tools (Source: [290]). IdealGPT iteratively decomposes vision and language reasoning problems via large language models (Source: [296]).

A specific technique is [[concepts/multimodal-chain-of-thought|multimodal chain-of-thought reasoning]], which explicitly generates intermediate reasoning steps across modalities (Source: [287]).

## Benchmarks
Evaluation of such reasoning occurs on datasets that require understanding of physical commonsense (e.g., PIQA), complex reading comprehension (e.g., DROP, ARC), or commonsense knowledge (e.g., CommonsenseQA) (Sources: [340], [342], [358], [365]).

## Related pages
- [[concepts/chain-of-thought.md]]
- [[concepts/multimodal-language-modeling.md]]