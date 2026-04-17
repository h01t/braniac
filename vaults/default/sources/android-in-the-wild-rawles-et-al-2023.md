# Android in the Wild: A Large-Scale Dataset for Android Device Control (Rawles et al., 2023)

**Summary**: A dataset and benchmark for developing and evaluating agents that can control Android smartphones by perceiving screen states and generating touch gestures.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 46: Rawles et al., 2023. Android in the wild: A large-scale dataset for android device control. arXiv:2307.10088).

---

## Dataset Composition
The dataset likely contains sequences of screen captures (pixels) from real Android devices, along with the corresponding ground-truth user actions (taps, swipes, text input) and the high-level tasks being performed. This provides a rich, realistic resource for training and testing agents that learn to map visual perception to actions in a mobile GUI environment.

## Role in Embodied Agent Research
"Android in the Wild" is part of the ecosystem of **embodied AI benchmarks** that also includes [[sources/webarena-zhou-et-al-2024.md]] (web) and [[sources/osworld-benchmark.md]] (desktop OS). It focuses on the specific and ubiquitous domain of mobile device control. Success here requires agents with strong [[concepts/multimodal-llms.md]] capabilities to understand diverse mobile app interfaces and robust action policies to navigate them.

## Connection to Autonomous Agents
This benchmark pushes the development of [[concepts/autonomous-llm-agents.md]] that can operate in the physical-digital hybrid space of smartphones. It presents challenges like dealing with varied screen layouts, understanding dynamic content (notifications, loading screens), and performing precise gestures—all necessary for building truly useful personal digital assistants.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/multimodal-llms.md]]
- [[sources/osworld-benchmark.md]]
- [[sources/webarena-zhou-et-al-2024.md]]