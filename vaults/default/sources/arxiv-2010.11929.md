# An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale

**Summary**: Introduces the Vision Transformer (ViT), which applies a standard transformer architecture directly to sequences of image patches for classification, achieving state-of-the-art results when pre-trained on large datasets.
**Source Context**: arXiv preprint arXiv:2010.11929 (2020).

---

## Core Innovation
The [[concepts/vision-transformer.md]] (ViT) departs from the convolutional neural network (CNN) dominance in computer vision. It splits an image into a grid of fixed-size patches, linearly projects each patch into an embedding, and adds positional embeddings. This sequence is then processed by a standard transformer encoder. A classification token is prepended to the sequence, whose final state is used for prediction.

## Key Findings
The paper shows that while ViTs underperform CNNs when trained on mid-sized datasets like ImageNet, they excel and set new records when pre-trained on very large datasets (e.g., JFT-300M). This demonstrates the superior scaling properties of the transformer architecture.

## Legacy
ViT established transformers as a viable and powerful alternative to CNNs for core vision tasks, fundamentally influencing the design of subsequent [[concepts/vision-language-modeling.md]] and multimodal architectures.

## Related pages
- [[concepts/vision-transformer.md]]
- [[concepts/transformer-architecture.md]]