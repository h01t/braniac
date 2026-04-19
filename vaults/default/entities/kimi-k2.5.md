# Kimi K2.5

**Summary**: A trillion-parameter multimodal mixture-of-experts language model developed by Kimi, featuring native-resolution vision understanding, extended context, and enhanced parallel-agent capabilities.
**Source Context**: 2602.02276v1.pdf

---

## Overview
Kimi K2.5 is a large multimodal language model and the successor to [[entities/kimi-k2-base-model.md]]. It is built upon the same trillion-parameter mixture-of-experts (MoE) transformer architecture but extends it with significant advancements in multimodal understanding, context length, and agentic reasoning.

## Key Features
### Architecture
Kimi K2.5 utilizes a multimodal architecture consisting of three core components (Section 4.2) [2602.02276v1.pdf]:
1.  **MoonViT-3D**: A three-dimensional native-resolution vision encoder for unified image and video processing. See [[concepts/moonvit-3d.md]].
2.  **MLP Projector**: Bridges the vision encoder and the language model.
3.  **Kimi K2 MoE Language Model**: The core text backbone with 1.04T total parameters and 32B activated parameters.

### Training
The model undergoes an extensive [[concepts/pre-training-pipeline-k2.5.md]] (Section 4.3) and [[concepts/post-training-k2.5.md]] (Section 4.4), including supervised fine-tuning and a sophisticated reinforcement learning phase optimized for token efficiency and agentic behavior [2602.02276v1.pdf].

### Agentic Capabilities
A key focus is [[concepts/parallel-agent-capability-induction.md]], training the model's orchestrator to efficiently manage parallel agents for complex tasks involving wide or deep search [2602.02276v1.pdf].

## Performance
Kimi K2.5 is evaluated on a comprehensive suite of [[concepts/evaluation-benchmarks-k2.5.md]] covering reasoning, coding, multimodal tasks, and autonomous agent execution (Section 5) [2602.02276v1.pdf].

## Related pages
- [[entities/kimi-k2-base-model.md]]
- [[concepts/multimodal-architecture-k2.5.md]]
- [[concepts/parallel-agent-capability-induction.md]]
- [[sources/2602-02276v1-technical-report.md]]