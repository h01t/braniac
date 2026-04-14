# Distillation of Reasoning Capabilities
**Source:** [[sources/DeepSeek_R1.md]]

Distillation in the context of DeepSeek-R1 refers to transferring the reasoning patterns discovered by a large model (like **[[entities/DeepSeek_R1.md]]**) to smaller, dense models (e.g., based on **[[entities/Qwen.md]]** or **[[entities/Llama.md]]** architectures).

## Process
1. **Generate Reasoning Data:** Use DeepSeek-R1 to produce reasoning traces (CoT) for a variety of problems.
2. **Fine-Tune Smaller Models:** Use this data to supervise the training of smaller base models.
3. **Result:** The distilled models inherit enhanced reasoning capabilities without needing to undergo the expensive RL process themselves.

## Key Findings from DeepSeek-R1
- Distillation from DeepSeek-R1 outperforms applying RL directly on smaller models.
- Distilled models achieve state-of-the-art performance for their size on reasoning benchmarks.
- **Examples:** 
  - DeepSeek-R1-Distill-Qwen-7B achieves 55.5% on AIME 2024, surpassing QwQ-32B-Preview.
  - DeepSeek-R1-Distill-Qwen-32B scores 72.6% on AIME 2024, comparable to o1-mini.

## Benefits
- **Efficiency:** Smaller models become powerful reasoners with less compute.
- **Accessibility:** Enables deployment of reasoning capabilities in resource-constrained environments.
- **Open Source:** The paper releases multiple distilled checkpoints (1.5B to 70B) for community use.