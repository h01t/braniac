# Vision Transformer

**Summary**: A transformer-based architecture for image recognition that dispenses with convolutional neural networks by treating an image as a sequence of patches.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Architecture
Introduced in "An Image is Worth 16x16 Words", the Vision Transformer (ViT) splits an input image into fixed-size patches, linearly embeds each patch, adds positional embeddings, and feeds the resulting sequence into a standard transformer encoder. For classification, a special [CLS] token is used (Source: [278]).

## Impact
ViT demonstrated that pure transformers, when trained on sufficiently large datasets, can achieve state-of-the-art performance on image classification tasks, rivaling and surpassing traditional convolutional networks. This work paved the way for unified architectures in [[concepts/multimodal-language-modeling.md]].

## Related pages
- [[concepts/transformer-architecture.md]]
- [[concepts/vision-language-modeling.md]]