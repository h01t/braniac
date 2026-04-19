# MoonViT-3D

**Summary**: A unified three-dimensional vision encoder that natively processes images and videos at their original resolutions within a shared embedding space, using a "patch n' pack" strategy.
**Source Context**: 2602.02276v1.pdf

---

## Overview
MoonViT-3D is the vision encoder component of the [[entities/kimi-k2.5.md]] multimodal architecture. It is designed to provide native-resolution understanding of both static images and dynamic videos within a single, unified model.

## Key Design Principles
### Native Resolution & Patch Packing
Following the design from MoonViT in Kimi-VL, MoonViT-3D processes images at their original resolutions without complex sub-image splitting [2602.02276v1.pdf]. It adopts the "patch n' pack" strategy from NaViT, where images are divided into patches, flattened, and concatenated into 1D sequences. This allows efficient training on images of varying resolutions.

### Unified Spatiotemporal Processing
MoonViT-3D generalizes this philosophy to the temporal dimension for video. Up to four consecutive frames are treated as a spatiotemporal volume: 2D patches from these frames are jointly flattened and packed into a single 1D sequence [2602.02276v1.pdf]. This allows the identical attention mechanism to operate seamlessly across both space (image) and time (video).

### Knowledge Transfer
The architecture uses fully shared parameters and a consistent embedding space for images and videos. This maximizes knowledge generalization from static image pretraining to dynamic video understanding without requiring specialized video modules [2602.02276v1.pdf].

### Temporal Compression
Prior to the MLP projector, lightweight temporal pooling aggregates patches within each temporal chunk, achieving a 4x temporal compression. This significantly extends the feasible video length for processing [2602.02276v1.pdf].

## Training
MoonViT-3D is initialized from SigLIP-SO-400M and undergoes continual pre-training in the first stage of the [[concepts/pre-training-pipeline-k2.5.md]] (ViT Training Stage) on image-text and video-text pairs using a caption generation loss [2602.02276v1.pdf].

## Related pages
- [[entities/kimi-k2.5.md]]
- [[concepts/multimodal-architecture-k2.5.md]]
- [[sources/2602-02276v1-technical-report.md]]