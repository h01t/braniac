# DeepSeek-R1
A large language model developed by DeepSeek, focused on enhanced reasoning capabilities.

**Development Approach:**
*   Built using a combination of **cold-start data** and iterative **[[concepts/reinforcement-learning-rl.md]]** fine-tuning.
*   Serves as a powerful "teacher" model for **[[concepts/model-distillation.md]]** into smaller, dense models.
*   Achieved performance comparable to [[entities/OpenAI-o1-1217.md]] on a range of tasks.

**Key Attributes:**
*   **Performance:** Strong results on [[concepts/reasoning-benchmarks.md|reasoning benchmarks]] like AIME, MATH, and GPQA.
*   **Distillation Source:** Used to generate 800K training samples for distilling reasoning capability into smaller models (1.5B to 70B parameters).
*   **Limitations:** See [[concepts/future-work-deepseek-r1.md]] for details on areas like general capability, language mixing, and software engineering.

**Related Models:** [[entities/DeepSeek-R1-Zero.md]], [[entities/DeepSeek-R1-Distill-Qwen-7B.md]], [[entities/DeepSeek-V3.md]]