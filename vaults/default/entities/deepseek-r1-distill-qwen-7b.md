# DeepSeek-R1-Distill-Qwen-7B

**Summary**: A 7-billion parameter language model created by distilling the reasoning capabilities of the larger DeepSeek-R1 model into a Qwen-based architecture.
**Source Context**: DeepSeek_R1.pdf

---

## Model Overview
**DeepSeek-R1-Distill-Qwen-7B** is one of several smaller, dense models created through the [[concepts/knowledge-distillation.md]] process described in the DeepSeek-R1 paper. It is part of the "DeepSeek-R1-Distill" family. The paper also refers to it as **DeepSeek-R1-7B** for abbreviation (Source: DeepSeek_R1.pdf).

## Creation Process
The model was created by:
1.  Using the large [[entities/deepseek-r1.md]] model as a **teacher** to generate 800,000 training samples (question & reasoning answer pairs).
2.  Performing supervised fine-tuning (SFT) on a **Qwen-7B** base model using these distilled samples (Source: DeepSeek_R1.pdf).

## Performance and Significance
The performance of this distilled 7B model was a key finding in the paper:
*   It demonstrated that **simple distillation of DeepSeek-R1's outputs enables the efficient 7B model to outperform non-reasoning models like GPT-4o-0513 across the board** on reasoning benchmarks (Source: DeepSeek_R1.pdf).
*   This result highlights the dramatic effectiveness and efficiency of the distillation approach for transferring advanced reasoning capabilities to much smaller, more deployable models.

The paper notes that applying RL to these distilled models could yield further gains, but presents only the SFT-distillation results (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1.md]]
- [[entities/deepseek-r1-distill-qwen-32b.md]]