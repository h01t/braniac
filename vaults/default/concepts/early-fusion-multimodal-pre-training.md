# Early Fusion Multimodal Pre-training

**Summary**: A training strategy that combines vision and text modalities from the start of pre-training, using moderate vision ratios and early fusion to avoid representation collapse and improve gradient landscapes.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

Early fusion multimodal pre-training involves integrating visual and textual data from the beginning of the training process, as opposed to late-stage domain migration. The report states that this approach prevents the representation collapse observed in late fusion and facilitates smoother gradient landscapes for both modalities [[concepts/multimodal-data-curation.md]]. This is achieved by using moderate vision ratios combined with early fusion, which yields superior convergence properties and more robust bi-modal competence under fixed token budgets.

The report emphasizes that early exposure to both modalities is crucial for developing unified multimodal representations. This method is a core component of the native multimodal pre-training proposal in the Kimi K2.5 model [[entities/kimi-k2-5.md]].

## Related pages
- [[concepts/multimodal-data-curation.md]]
- [[entities/kimi-k2-5.md]]