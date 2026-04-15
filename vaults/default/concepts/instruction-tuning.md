# Instruction Tuning

**Summary**: A technique to fine-tune pre-trained Large Language Models (LLMs) on task-specific instructions and examples, significantly improving their ability to follow instructions and generalize to unseen tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.2.

---

Instruction tuning involves supervised fine-tuning of a pre-trained LLM on datasets composed of (instruction, input, output) triplets. This process adapts the model's general knowledge to perform specific tasks based on natural language directives.

## Key Findings and Insights
A study of instruction-tuned models reveals several critical insights:
*   **Multi-task prompting** enables zero-shot generalization and can outperform baselines, with even a single prompt per task being sufficient to improve performance (Source: Findings from model **T0**).
*   **Instruction tuning leads to stronger generalization** on unseen tasks. Increasing the number of *tasks* improves generalization, whereas merely increasing the number of *instances per task* does not provide the same benefit (Source: Findings from model **Tk-INSTRUCT**).
*   **Instruction tuning is compute-efficient** for improving a model's usability, which is otherwise challenging for raw pre-trained models (Source: Findings from model **Flan**).
*   Performance improves with more tasks and diverse prompt setups (e.g., zero-shot, few-shot, chain-of-thought) (Source: Findings from models **OPT-IML** and **Flan**).

## Types of Instruction-Tuning Datasets
Performance depends on factors like dataset quality, instruction diversity, and prompting templates.

### Manually Created Datasets
Early approaches used hand-crafted datasets. Models like **T0**, **mT0**, and **Tk-INSTRUCT** converted existing datasets into prompt formats, showing improved zero-shot generalization.

### LLM-Generated Datasets
To overcome the scale and diversity limitations of manual creation, methods like **Self-Instruct** prompt existing LLMs (e.g., **GPT-3**) to generate instruction-tuning datasets automatically. This approach can outperform training on large manually created datasets. Variants include:
*   **Evol-Instruct**: Iteratively prompts an LLM to rewrite instructions into more complex versions, used to train models like **WizardLM** and **WizardCoder**.
*   **Dynosaur**: Uses dataset metadata to prompt LLMs for generating multi-task instruction datasets.

## Related Techniques
*   **Chain-of-Thought (CoT) Tuning**: Fine-tuning with CoT data improves a model's reasoning abilities and zero-shot reasoning performance (Source: Findings from model **Flan**).
*   **Continued Pre-Training**: To avoid [[concepts/catastrophic-forgetting.md]], some methods concatenate fine-tuning data with randomly selected pre-training samples in each iteration.
*   **Sample Efficiency**: Research indicates that models can achieve strong, sometimes state-of-the-art, performance with a fraction of the total downstream data. Careful data selection (e.g., coresets) or using a small set of very high-quality demonstrations (as in **LIMA**) can be highly effective.

## Related pages
- [[concepts/alignment.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/chain-of-thought.md]]
- [[entities/t0.md]]
- [[entities/flan.md]]