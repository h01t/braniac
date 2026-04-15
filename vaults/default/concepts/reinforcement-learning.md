# Reinforcement Learning

**Summary**: A training paradigm where a model learns by interacting with an environment and receiving rewards, used in DeepSeek-R1 to enhance reasoning abilities through iterative fine-tuning.
**Source Context**: DeepSeek_R1.pdf (Throughout, especially Section 3, 4.1).

---

## Application in Model Development
The DeepSeek-R1 project utilized large-scale [[concepts/reinforcement-learning.md]] as a core methodology. Two key variants were developed:
*   **DeepSeek-R1-Zero**: A pure RL approach trained without any cold-start (pre-existing) demonstration data.
*   **DeepSeek-R1**: A more powerful model that leveraged cold-start data alongside iterative RL fine-tuning.

## Comparison with Distillation
A key finding was the relative efficiency of RL. While RL was essential for creating the top-tier teacher model ([[entities/deepseek-r1.md]]), applying the same large-scale RL process directly to a smaller base model ([[entities/deepseek-r1-zero-qwen-32b.md]]) yielded performance inferior to simply distilling knowledge from the larger model. This positioned RL as a powerful but computationally intensive method, potentially more suited for advancing the frontier with large base models rather than efficiently creating competent smaller models (Source: DeepSeek_R1.pdf, Section 4.1).

## Related pages
- [[concepts/distillation-vs-reinforcement-learning.md]]
- [[entities/deepseek-r1-zero.md]]