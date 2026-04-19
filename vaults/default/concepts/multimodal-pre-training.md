# Multimodal Pre-training

**Summary**: The joint optimization of text and vision modalities during model training to achieve cross-modal alignment and robust reasoning capabilities.
**Source Context**: 2602.02276v1.pdf

---

## Approach in Kimi K2.5
The **[[entities/kimi-k2-5.md]]** model employs joint optimization of text and vision across both pre-training and reinforcement learning stages (Source: 2602.02276v1.pdf). The goal is to unify language and vision to achieve strong cross-modal alignment and visual-text reasoning.

## Fusion Strategies
The technical report discusses different vision-to-text token ratio configurations (e.g., 10:90, 20:80, 50:50) under a fixed token budget (Source: 2602.02276v1.pdf). It analyzes **[[concepts/early-fusion.md]]**, mid-fusion, and late-fusion strategies.

## Findings on Fusion
**Early fusion** with lower vision ratios (e.g., 10:90) tended to yield better results and more stable learning curves (Source: 2602.02276v1.pdf). The report notes that late introduction of vision data can cause a "dip-and-recover" pattern in text performance due to a modality domain shift, whereas early fusion prevents this representation collapse (Source: 2602.02276v1.pdf).

## Proposed Methodology
The findings reinforce a proposal for "native multimodal pre-training," where moderate vision ratios combined with early fusion yield superior convergence and more robust bi-modal competence (Source: 2602.02276v1.pdf).

## Related pages
- [[entities/kimi-k2-5.md]]
- [[concepts/cross-modal-alignment.md]]
- [[concepts/vision-text-reasoning.md]]