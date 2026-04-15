# Instruction Tuning

**Summary**: A fine-tuning technique where a pre-trained language model is trained on datasets composed of (instruction, response) pairs to improve its ability to understand and follow natural language commands.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Definition and Goal
[[concepts/instruction-tuning.md]] involves supervised fine-tuning on a collection of tasks described via instructions. The model learns to map a wide variety of human-readable prompts to appropriate responses. The primary goal is to enhance the model's **zero-shot** and **few-shot** generalization capabilities—enabling it to perform new, unseen tasks simply by following the instructions provided in the prompt, without requiring task-specific examples (Source: Comprehensive Overview of LLMs.pdf).

## Role in Model Development
Instruction tuning is a critical step in transforming a base pre-trained LLM into a helpful AI assistant. It bridges the gap between the model's broad knowledge acquired during pre-training and the practical need to follow user intent.
*   **LLaMA-2-Chat**: The source notes that LLaMA-2 was fine-tuned using safety and helpfulness datasets to create the dialogue-focused LLaMA-2-Chat model.
*   **GLM-130B**: Interestingly, GLM-130B incorporated a small amount (5%) of multi-task instruction data **during its pre-training phase**, which was found to improve overall model performance (Source: Comprehensive Overview of LLMs.pdf).

## Distinction from Pre-training
While pre-training teaches the model language patterns and world knowledge (via objectives like next-token prediction or [[concepts/mask-infilling.md]]), instruction tuning explicitly teaches it how to use that knowledge to solve problems presented as instructions. It is a form of [[concepts/fine-tuning.md]].

## Related pages
- [[concepts/fine-tuning.md]]
- [[concepts/zero-shot-learning.md]]
- [[entities/llama-2-chat.md]]