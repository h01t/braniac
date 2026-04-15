# DeepSeek-R1

**Summary**: A family of language models developed by DeepSeek, with strong reasoning abilities achieved through reinforcement learning and distillation.
**Source Context**: DeepSeek_R1.pdf (Title, Abstract, Throughout).

---

## Model Description
[[entities/deepseek-r1.md]] is the primary model series discussed in the paper. It represents the outcome of research into enhancing [[concepts/reasoning-ability.md]] through [[concepts/reinforcement-learning.md]].

## Key Variants
The paper discusses several key variants:
*   **DeepSeek-R1**: The flagship model, which leverages cold-start (demonstration) data alongside iterative RL fine-tuning. It achieves performance comparable to OpenAI's o1-1217 model on a range of tasks.
*   **DeepSeek-R1-Zero**: A variant trained with a pure RL approach, without any cold-start data.
*   **DeepSeek-R1-Distill-***: A series of smaller models (e.g., [[entities/deepseek-r1-distill-qwen-7b.md]], [[entities/deepseek-r1-distill-qwen-32b.md]]) created by distilling knowledge from the larger DeepSeek-R1 teacher model.

## Role in Research
DeepSeek-R1 served two critical roles:
1.  As the end product of the RL research.
2.  As the powerful "teacher" model for the successful [[concepts/knowledge-distillation.md]] experiments, demonstrating that its reasoning capability could be effectively transferred.

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1-zero.md]]