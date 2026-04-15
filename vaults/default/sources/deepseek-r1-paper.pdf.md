# DeepSeek-R1 Research Paper

**Summary**: The official research paper detailing the development, methodology, and evaluation of the DeepSeek-R1 series of reasoning-optimized large language models.
**Source Context**: DeepSeek_R1.pdf

---

## Overview
This paper shares the journey of enhancing model reasoning abilities through reinforcement learning (RL). It presents two main model families: **DeepSeek-R1-Zero**, trained with a pure RL approach without cold-start data, and the more powerful **DeepSeek-R1**, which leverages cold-start data alongside iterative RL fine-tuning (Source: DeepSeek_R1.pdf).

A core finding is that **DeepSeek-R1 achieves performance comparable to OpenAI-o1-1217** on a range of tasks (Source: DeepSeek_R1.pdf).

## Key Methodologies and Findings
The research explores several key techniques:
*   **Large-Scale Reinforcement Learning**: The primary method for boosting reasoning capabilities, applied over thousands of steps on datasets focused on math, code, and STEM.
*   [[concepts/knowledge-distillation.md]]: Using [[entities/deepseek-r1.md]] as a teacher model to generate 800K training samples for distilling reasoning capabilities into smaller, dense models. This proved highly effective and economical.
*   **Comparison of Techniques**: The paper directly compares the [[concepts/knowledge-distillation.md]] approach against training a smaller base model with large-scale RL from scratch (DeepSeek-R1-Zero-Qwen-32B). Distillation significantly outperformed the pure RL approach on the smaller model (Source: DeepSeek_R1.pdf, Table 6).
*   **Unsuccessful Attempts**: The team documented explorations with [[concepts/process-reward-model-prm.md]] and [[concepts/monte-carlo-tree-search-mcts.md]], noting practical limitations like reward hacking and scaling challenges that hindered their success in this project.

## Evaluation
The models were evaluated on a suite of reasoning-related benchmarks including [[benchmarks/aime-2024.md]], [[benchmarks/math-500.md]], [[benchmarks/gpqa-diamond.md]], and [[benchmarks/livecodebench.md]] (Source: DeepSeek_R1.pdf, Table 5).

## Limitations and Future Work
The paper notes several limitations of DeepSeek-R1:
*   Its general capabilities (e.g., function calling, multi-turn dialogue) lag behind its base model, DeepSeek-V3.
*   It is optimized for Chinese and English, which can cause language mixing issues with other languages.
*   The model is sensitive to prompts, with few-shot prompting degrading performance.
*   Large-scale RL was not extensively applied to software engineering tasks due to long evaluation times, limiting improvements in that domain.

Future work directions include extending chain-of-thought reasoning to general tasks, improving multilingual support, optimizing prompting, and enhancing performance on software engineering benchmarks (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/reinforcement-learning-rl-for-reasoning.md]]
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1.md]]