# MM-LLMs: Recent Advances in Multimodal Large Language Models

**Summary**: This survey paper provides a comprehensive overview of the recent progress, methodologies, and challenges in Multimodal Large Language Models, which process and generate content across vision, language, audio, and other modalities.
**Source Context**: arXiv preprint arXiv:2401.13601 (2024), https://arxiv.org/abs/2401.13601. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
The paper systematically reviews the architecture designs, training techniques (e.g., multimodal alignment, instruction tuning), key capabilities (like visual question answering, and generation), and evaluation benchmarks for MM-LLMs. It highlights the trend of using powerful LLMs as central processors to understand and reason over multimodal inputs.

## Key Insights
A major theme is the shift from earlier specialized multimodal models to the current paradigm of "LLM-as-a-unified-brain" with modality-specific encoders/adapters. The survey also discusses challenges in [[concepts/knowledge-groundedness.md]], hallucination, and efficient training.

## Technical Approach
The paper categorizes approaches by how they integrate modalities (e.g., early fusion vs. late fusion), alignment strategies (contrastive learning, cross-attention), and how they leverage pre-trained LLMs and vision models.

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/large-language-model.md]]
- [[concepts/vision-language-model.md]]
- [[concepts/survey.md]]