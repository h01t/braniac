# Distillation of Reasoning Capability

**Summary**: A technique to transfer the enhanced reasoning abilities of a large model to smaller, more efficient models via supervised fine-tuning on the larger model's curated outputs.
**Source Context**: DeepSeek_R1.pdf

---

## Method
To equip smaller open-source models with reasoning capabilities similar to [[entities/deepseek-r1.md]], the researchers directly fine-tuned models like Qwen and Llama on the **~800k sample SFT dataset** curated during the DeepSeek-R1 training process (Source: DeepSeek_R1.pdf). This process involves only supervised fine-tuning (SFT), not an RL stage (Source: DeepSeek_R1.pdf).

## Models and Goal
Base models used include Qwen2.5-Math-1.5B/7B/14B/32B and Llama-3.1-8B/3.3-70B-Instruct (Source: DeepSeek_R1.pdf). The primary goal was to demonstrate the effectiveness of this straightforward distillation approach, leaving the exploration of adding an RL stage to the community (Source: DeepSeek_R1.pdf).

## Results
The distillation method was found to **significantly enhance the reasoning abilities** of the smaller models, as evaluated on benchmarks like AIME 2024 and MATH-500 (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1.md]]