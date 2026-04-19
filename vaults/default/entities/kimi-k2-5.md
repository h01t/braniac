# Kimi K2.5

**Summary**: Kimi K2.5 is an open-source multimodal agentic model developed by the Kimi Team, designed to advance general agentic intelligence through joint optimization of text and vision and a novel parallel agent orchestration framework called Agent Swarm.
**Source Context**: 2602.02276v1.pdf

---

## Overview
Kimi K2.5 is a state-of-the-art multimodal [[concepts/agentic-intelligence.md]] model built upon the [[entities/kimi-k2.md]] base. It emphasizes the [[concepts/joint-optimization-text-vision.md]] to enhance both linguistic and visual capabilities. A key innovation is the introduction of [[concepts/agent-swarm.md]], a self-directed parallel agent orchestration framework that dynamically decomposes complex tasks for concurrent execution, significantly reducing latency.

## Core Innovations
The model integrates several key techniques:
1.  **Native Multimodal Foundation**: It is built via large-scale joint pre-training on approximately 15 trillion mixed visual and text tokens, adopting an early fusion strategy with a constant, moderate vision-to-text ratio throughout training. This approach contrasts with conventional late-stage vision injection methods.
2.  **Training Pipeline**: The training methodology includes [[concepts/native-multimodal-pretraining.md]], [[concepts/zero-vision-sft.md]], and [[concepts/joint-multimodal-rl.md]]. A notable finding is that visual reinforcement learning improves performance on textual benchmarks, indicating strong cross-modal alignment.
3.  **Architecture**: For vision processing, Kimi K2.5 employs the [[entities/moonvit-3d.md]] encoder, which incorporates the [[entities/navit-packing-strategy.md]] for variable-resolution image inputs and includes a lightweight 3D compression mechanism for video understanding.

## Performance and Release
Extensive evaluations show Kimi K2.5 achieves state-of-the-art results across domains like coding, vision, reasoning, and agentic tasks. Agent Swarm reduces inference latency by up to 4.5x over single-agent baselines in wide-search scenarios while improving accuracy. The post-trained model checkpoint has been released open-source to facilitate research and applications in agentic intelligence.

## Related pages
- [[concepts/joint-optimization-text-vision.md]]
- [[concepts/agent-swarm.md]]
- [[concepts/agentic-intelligence.md]]
- [[entities/kimi-k2.md]]