# Kimi K2

**Summary**: The trillion-parameter mixture-of-experts transformer base model upon which Kimi K2.5 is built, pre-trained on 15 trillion high-quality text tokens.
**Source Context**: 2602.02276v1.pdf

---

## Description
[[entities/kimi-k2.md]] is the foundational model for [[entities/kimi-k2-5.md]]. It is a trillion-parameter Mixture-of-Experts (MoE) transformer model pre-trained on 15 trillion high-quality text tokens. Kimi K2 employs the token-efficient MuonClip optimizer with QK-Clip for training stability. The model comprises 1.04 trillion total parameters with 32 billion activated parameters per forward pass.

## Evolution to K2.5
Kimi K2.5 is built upon Kimi K2 through large-scale [[concepts/joint-optimization-text-vision.md]], extending its capabilities to multimodal [[concepts/agentic-intelligence.md]].

## Related pages
- [[entities/kimi-k2-5.md]]