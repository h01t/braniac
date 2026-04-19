# Generative Reward Models (GRMs)

**Summary**: Fine-grained evaluators used in reinforcement learning to provide nuanced preference signals for open-ended agentic and multimodal tasks, aligned with criteria like helpfulness and instruction following.
**Source Context**: 2602.02276v1.pdf

---

## Concept
Generative Reward Models (GRMs) are a component of the [[concepts/reinforcement-learning-k2.5.md]] framework for [[entities/kimi-k2.5.md]]. They extend the self-critique rubric reward concept from Kimi K2 to systematically evaluate a broad range of agentic behaviors and multimodal trajectories (Section 4.4.2) [2602.02276v1.pdf].

## Function
GRMs act not as binary adjudicators, but as fine-grained evaluators. They are applied on top of verified reward signals in diverse environments, including:
*   Chat assistants
*   Coding agents
*   Search agents
*   Artifact-generating agents

## Evaluation Criteria
GRMs provide reward signals aligned with Kimi's internal value criteria critical to user experience, such as:
*   Helpfulness
*   Response readiness
*   Contextual relevance
*   Appropriate level of detail
*   Aesthetic quality of generated artifacts
*   Strict instruction following

This design captures nuanced preference gradients difficult to encode with purely rule-based or task-specific verifiers.

## Mitigating Reward Hacking
To prevent overfitting to a single signal, multiple alternative GRM rubrics tailored to different task contexts are employed [2602.02276v1.pdf].

## Related pages
- [[concepts/reinforcement-learning-k2.5.md]]
- [[entities/kimi-k2.5.md]]
- [[sources/2602-02276v1-technical-report.md]]