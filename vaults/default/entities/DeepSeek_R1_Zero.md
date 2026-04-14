# DeepSeek-R1-Zero
**Source:** [[sources/DeepSeek_R1.md]]

DeepSeek-R1-Zero is the first-generation reasoning model from DeepSeek-AI, trained purely via large-scale **[[concepts/Reinforcement_Learning_Reasoning.md]]** without any **[[concepts/Cold_Start.md|supervised fine-tuning (SFT)]]**. It is based on **[[entities/DeepSeek_V3_Base.md]]**.

## Key Characteristics
- **Training:** Uses **[[concepts/Group_Relative_Policy_Optimization.md|GRPO]]** with rule-based rewards (accuracy and format).
- **Template:** Follows a simple template where reasoning is enclosed in `<think>` tags and the answer in `<answer>` tags.
- **Emergent Behaviors:** Naturally develops powerful reasoning behaviors like self-verification, reflection, and long **[[concepts/Chain_of_Thought.md|CoT]]** generation.

## Performance
- **AIME 2024:** 71.0% Pass@1 (up from 15.6% base), 86.7% with majority voting (cons@64).
- **Comparisons:** Matches OpenAI-o1-0912 on several reasoning benchmarks (see Table 2 in paper).
- **Challenges:** Exhibits poor readability and language mixing, which motivated the development of **[[entities/DeepSeek_R1.md]]**.

## Significance
- First open research to validate that reasoning capabilities can be incentivized purely through RL.
- Provides insights into the self-evolution process of LLMs under RL.