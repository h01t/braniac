# Kimi K2 Base Model

**Summary**: The trillion-parameter mixture-of-experts language model that serves as the foundational text backbone for the Kimi K2.5 multimodal system.
**Source Context**: 2602.02276v1.pdf

---

## Overview
Kimi K2 is a trillion-parameter mixture-of-experts (MoE) transformer model pre-trained on 15 trillion high-quality text tokens [2602.02276v1.pdf]. It serves as the direct predecessor and core language component of [[entities/kimi-k2.5.md]].

## Architecture
*   **Total Parameters**: 1.04 trillion.
*   **Activated Parameters**: 32 billion per token.
*   **Expert Structure**: Utilizes 384 experts with 8 activated per token, resulting in a sparsity of 48.
*   **Optimizer**: Trained using the token-efficient MuonClip optimizer with QK-Clip for stability.

## Role in Kimi K2.5
The Kimi K2 model checkpoint is the starting point for the [[concepts/pre-training-pipeline-k2.5.md]] of Kimi K2.5. Its parameters form the language backbone, which is then jointly trained with the [[concepts/moonvit-3d.md]] vision encoder and an MLP projector to create the final multimodal model.

For detailed descriptions of MuonClip, architecture design, and training infrastructure, the report references the separate Kimi K2 technical report [53].

## Related pages
- [[entities/kimi-k2.5.md]]
- [[concepts/multimodal-architecture-k2.5.md]]
- [[sources/2602-02276v1-technical-report.md]]