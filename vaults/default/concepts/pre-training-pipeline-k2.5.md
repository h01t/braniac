# Pre-training Pipeline (Kimi K2.5)

**Summary**: The three-stage training process for Kimi K2.5, involving standalone vision encoder training, joint language-vision pre-training, and long-context activation with high-quality data.
**Source Context**: 2602.02276v1.pdf

---

## Overview
The pre-training of [[entities/kimi-k2.5.md]] builds upon the [[entities/kimi-k2-base-model.md]] checkpoint and processes approximately 15 trillion tokens across three distinct stages, as outlined in Section 4.3 and Table 3 of the report [2602.02276v1.pdf].

## Stages
### 1. ViT Training Stage
*   **Goal**: Establish a robust native-resolution visual encoder.
*   **Process**: The [[concepts/moonvit-3d.md]] encoder is continual pre-trained from SigLIP on image-text and video-text pairs. Text targets include alt texts, synthetic captions, grounding bboxes, and OCR texts.
*   **Loss**: Uses only a cross-entropy caption generation loss (`L_caption`), without contrastive loss.
*   **Two-Stage Alignment**:
    *   First, update MoonViT-3D to align with the Moonlight-16B-A3B model via caption loss (~1T tokens).
    *   Second, a very short stage updates only the MLP projector to bridge the ViT with the language model.

### 2. Joint Pre-training Stage
*   **Goal**: Simultaneously enhance language and multimodal capabilities.
*   **Process**: Continues from a near-end Kimi K2 checkpoint over an additional 15T vision-text tokens at a 4K sequence length.
*   **Data Recipe**: Extends Kimi K2's pre-training distribution by introducing unique tokens, adjusting data proportions (increased weight on coding), and controlling maximum epochs per data source.

### 3. Joint Long-context Mid-training Stage
*   **Goal**: Refine capabilities and extend context windows.
*   **Process**: Performs long-context activation with integrated higher-quality data.
*   **Method**: Sequentially extends context length via YaRN interpolation, leading to significant improvements in long-context text understanding and long video comprehension.
*   **Scale**: Processes 500B to 200B tokens, with sequence lengths extending from 32,768 to 262,144.

## Outcome
This pipeline results in a model with strong foundational capabilities in both language and vision, capable of handling very long context windows.

## Related pages
- [[entities/kimi-k2.5.md]]
- [[concepts/moonvit-3d.md]]
- [[concepts/post-training-k2.5.md]]
- [[sources/2602-02276v1-technical-report.md]]