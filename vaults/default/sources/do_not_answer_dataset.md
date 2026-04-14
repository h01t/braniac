# Do-Not-Answer Dataset
A dataset introduced by Wang et al., 2023, containing 939 risk-categorized prompts designed to evaluate the safety mechanisms of language models.

**Usage:** It is used as a complementary benchmark to assess a model's capability to safely handle sensitive queries. A higher "Do-Not-Answer" score indicates greater model safety by measuring appropriate refusals or safe responses to risky prompts.

**Notable Result:** The **[[entities/deepseek_67b_chat.md]]** model achieved a score of 97.8 on this dataset, which was higher than both ChatGPT and GPT-4 as reported in the **[[sources/deepseek_llm_paper.md|DeepSeek LLM paper]]**.

**Citation:** Wang et al., 2023.