# Multimodal Architecture (Kimi K2.5)

**Summary**: The three-component design of Kimi K2.5, integrating the MoonViT-3D vision encoder, an MLP projector, and the Kimi K2 MoE language model for unified text and vision processing.
**Source Context**: 2602.02276v1.pdf

---

## Overview
The multimodal architecture of [[entities/kimi-k2.5.md]] consists of three interconnected components, following design principles established in earlier models like Kimi-VL (Section 4.2) [2602.02276v1.pdf].

## Components
1.  **MoonViT-3D Vision Encoder**: A three-dimensional native-resolution encoder that processes images and videos in a unified way. See [[concepts/moonvit-3d.md]] for details.
2.  **MLP Projector**: A neural network layer that projects the visual feature embeddings from MoonViT-3D into the same semantic space as the language model's text embeddings.
3.  **Kimi K2 MoE Language Model**: The core text understanding and generation backbone. See [[entities/kimi-k2-base-model.md]].

## Workflow
Visual inputs (images or videos) are first encoded by MoonViT-3D. The resulting features are projected by the MLP projector and then interleaved with text token embeddings. This combined sequence is fed into the Kimi K2 language model, which attends to both textual and visual information simultaneously to generate responses.

## Innovation
A key innovation is the unified design of MoonViT-3D, which allows a single parameter space to handle both modalities (image and video), promoting strong knowledge transfer and eliminating the need for separate, specialized architectures [2602.02276v1.pdf].

## Related pages
- [[entities/kimi-k2.5.md]]
- [[concepts/moonvit-3d.md]]
- [[entities/kimi-k2-base-model.md]]
- [[sources/2602-02276v1-technical-report.md]]