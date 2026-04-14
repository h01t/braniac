# DeepSeek-R1
A reasoning model trained using the [[concepts/reinforcement_learning_cold_start.md]] methodology to address the readability issues of [[entities/DeepSeek-R1-Zero.md]]. It is based on the DeepSeek-V3 architecture (a Mixture of Experts model with 671B total parameters, 37B activated).

**Training Pipeline:**
1.  **Cold Start** with readable CoT data.
2.  **Reasoning-oriented RL**.
3.  **Rejection Sampling & SFT** on ~800k curated samples.
4.  **RL for all Scenarios** for alignment.

**Performance:** Excels in STEM, reasoning, coding (e.g., Codeforces, LiveCodeBench), and math benchmarks (e.g., [[entities/AIME_2024.md]], MATH-500), performing on par with models like OpenAI-o1. It also shows strong results in instruction following (IF-Eval) and open-ended generation (AlpacaEval2.0).

**Source:** [[sources/DeepSeek_R1_Paper.md]]