# Transformer Architecture

**Summary**: A deep learning model architecture introduced in 2017 that relies on a self-attention mechanism, forming the foundation for most state-of-the-art large language models.
**Source Context**: https://grokipedia.com/page/OpenAI (implied as the "T" in GPT: Generative Pre-trained *Transformer*)

---

The Transformer architecture, introduced in the paper "Attention Is All You Need," revolutionized natural language processing (NLP). It replaced earlier recurrent and convolutional networks for sequence modeling tasks.

## Key Mechanism and Impact
The core innovation is the **self-attention mechanism**, which allows the model to weigh the importance of different words in a sentence when processing each word, regardless of their distance from each other. This enables superior handling of long-range dependencies in text. The architecture is highly parallelizable, making it efficient to train on massive datasets using modern hardware.

The Transformer is the fundamental building block for OpenAI's [[concepts/gpt-models.md]] series and countless other LLMs. Its versatility has also led to adaptations for other modalities, such as in [[concepts/dall-e.md]] for image generation.

## Related pages
- [[concepts/gpt-models.md]]
- [[concepts/dall-e.md]]