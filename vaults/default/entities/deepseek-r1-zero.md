# DeepSeek-R1-Zero

**Summary**: A variant of the DeepSeek-R1 model trained using a pure reinforcement learning approach without relying on any cold-start or demonstration data.
**Source Context**: DeepSeek_R1.pdf (Section 3, 5).

---

## Training Methodology
[[entities/deepseek-r1-zero.md]] is highlighted as representing a "pure RL approach" within the DeepSeek-R1 project. It was trained using large-scale [[concepts/reinforcement-learning.md]] exclusively, without the initial supervised fine-tuning on demonstration data that its counterpart ([[entities/deepseek-r1.md]]) used.

## Performance Context
The paper notes that DeepSeek-R1-Zero achieves strong performance across various tasks. However, the more detailed comparisons in Section 4.1 involve a specific instantiation, [[entities/deepseek-r1-zero-qwen-32b.md]], which was created by applying this RL methodology to a Qwen-32B-Base model. This model's performance was found to be inferior to a distilled model of the same size, highlighting a key finding about the efficiency of different training approaches.

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[entities/deepseek-r1.md]]
- [[entities/deepseek-r1-zero-qwen-32b.md]]