# Kimi K2.5

**Summary**: Kimi K2.5 is a multimodal AI model developed by Moonshot AI, excelling in text reasoning, coding, agentic execution, and visual understanding, and employing an innovative Agent Swarm framework for complex tasks.
**Source Context**: 2602.02276v1.pdf (Kimi K2.5 Technical Report).

---

## Model Overview
Kimi K2.5 is a state-of-the-art multimodal model designed for general agentic intelligence. It integrates strong language, vision, and agentic capabilities into a unified system [[concepts/agent-swarm.md]]. The model is trained using a specialized [[concepts/dep-training-strategy.md]] to efficiently combine visual and textual data.

## Key Capabilities
The model demonstrates leading performance across a comprehensive suite of benchmarks [[concepts/evaluation-benchmarks.md]]:
*   **Reasoning & General Knowledge**: Achieves high scores on rigorous STEM and knowledge tests like AIME 2025 (96.1%) and GPQA-Diamond (87.6%).
*   **Coding & Software Engineering**: Excels on realistic coding tasks, scoring 76.8% on SWE-Bench Verified and 85.0% on LiveCodeBench (v6).
*   **Agentic Execution**: Sets new state-of-the-art on complex search and browsing tasks like BrowseComp (60.6%, rising to 78.4% with Agent Swarm).
*   **Multimodal Understanding**: Shows strong visual reasoning (e.g., 78.5% on MMMU-Pro) and video comprehension (e.g., 86.6% on VideoMMMU), aided by the [[concepts/moonvit-3d.md]] vision encoder.
*   **Computer Use**: Competes effectively on real-world GUI interaction benchmarks like OSWorld-Verified (63.3%) and WebArena (58.9%).

## Architecture and Training
The model's architecture is optimized for multimodal training. Its efficiency stems from the [[concepts/dep-training-strategy.md]], which decouples the vision encoder and main transformer backbone training phases, achieving 90% of the efficiency of text-only training. For video tasks, it utilizes [[concepts/moonvit-3d.md]] for temporal understanding.

## Agentic Framework
A defining feature is its [[concepts/agent-swarm.md]] framework, which uses an orchestrator ([[concepts/parl.md]]) to dynamically create and manage multiple sub-agents for parallel task execution, improving both performance and inference speed on complex, long-horizon tasks.

## Related pages
- [[concepts/dep-training-strategy.md]]
- [[concepts/agent-swarm.md]]
- [[concepts/evaluation-benchmarks.md]]
- [[concepts/moonvit-3d.md]]