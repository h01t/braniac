# Multimodal Data Curation

**Summary**: The process of collecting, filtering, and organizing diverse visual and textual data for training multimodal AI models, emphasizing quality, diversity, and task-specific augmentation.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

Multimodal data curation for the Kimi K2.5 model encompasses seven primary categories of vision data: caption, interleaving, OCR, knowledge, perception, video, and agent data. The text corpus includes Web Text, Code, Mathematics, and Knowledge domains. Each domain undergoes rigorous correctness and quality validation, with targeted data experiments to ensure high diversity and effectiveness.

Specific enhancements include upweighting code-centric data to improve repository-level comprehension and agentic coding subtasks. The vision corpus incorporates specialized multimodal problem-solving data for STEM reasoning, image-code paired data to bridge visual layouts and code, and agentic data like GUI screenshots and action trajectories. All data undergoes rigorous filtering, deduplication, and quality control. This curation supports [[concepts/early-fusion-multimodal-pre-training.md]] by providing the raw material for unified representation learning.

## Related pages
- [[concepts/early-fusion-multimodal-pre-training.md]]
- [[entities/kimi-k2-5-model.md]]