# DeepSeek LLM
DeepSeek LLM is an open-source large language model project developed by [[entities/deepseek_ai.md]], with a long-term perspective on scaling.

**Key Specifications:**
- Model sizes: 7B and 67B parameters.
- Pre-trained on a dataset of 2 trillion tokens, primarily in Chinese and English.
- Architecture follows LLaMA but with adjustments like multi-step learning rate scheduler.

**Performance:**
- Base model: Outperforms LLaMA-2 70B in benchmarks, especially in code, math, and reasoning.
- Chat model: After [[concepts/alignment.md]] (SFT and DPO), surpasses GPT-3.5 in open-ended evaluations.

**Development Guided by:**
- Insights from [[concepts/scaling_laws.md]].
- Detailed pre-training as described in [[concepts/pre_training.md]].

For source information, see [[sources/deepseek_llm_paper.md]].