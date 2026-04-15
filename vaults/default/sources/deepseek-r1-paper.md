# DeepSeek-R1 Paper

**Summary**: The research paper detailing the development, methodology, and evaluation of the DeepSeek-R1 and DeepSeek-R1-Zero reasoning models.
**Source Context**: DeepSeek_R1.pdf

---

## Content Overview
This document is the primary source for information on the [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]] models. It describes the [[concepts/self-evolution.md]] process, the [[concepts/cold-start-rl.md]] methodology, the multi-stage [[concepts/reinforcement-learning-reasoning.md]] pipeline, and the [[concepts/distillation-reasoning.md]] technique (Source: DeepSeek_R1.pdf).

## Key Figures and Tables
- **Figure 3**: Illustrates the increase in average response length (thinking time) of DeepSeek-R1-Zero during RL training (Source: DeepSeek_R1.pdf).
- **Table 3**: Documents the "aha moment" of an intermediate DeepSeek-R1-Zero model, showcasing [[concepts/reflection-reasoning.md]] (Source: DeepSeek_R1.pdf).
- **Table 4**: Provides a comprehensive benchmark comparison between DeepSeek-R1, DeepSeek-V3, Claude-3.5-Sonnet, GPT-4o, and OpenAI's o1 models across mathematics, coding, knowledge, and language tasks (Source: DeepSeek_R1.pdf).

## Experimental Benchmarks
The paper evaluates models on a wide array of benchmarks including MMLU, MMLU-Pro, GPQA Diamond, AIME 2024, Codeforces, LiveCodeBench, AlpacaEval 2.0, and ArenaHard, among others (Source: DeepSeek_R1.pdf). The evaluation setup uses pass@k sampling with temperature to mitigate repetition issues from greedy decoding (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]
- [[concepts/reinforcement-learning-reasoning.md]]