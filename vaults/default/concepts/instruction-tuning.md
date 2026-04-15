# Instruction Tuning

**Summary**: A fine-tuning technique where language models are trained on tasks formatted as natural language instructions to improve their ability to follow prompts and generalize to unseen tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Purpose and Method
Instruction tuning aims to align pre-trained language models with user intent. By training on diverse datasets of (instruction, output) pairs, models learn to understand and execute a wide variety of commands. This is a key step in creating helpful and harmless AI assistants (Source: [306]).

## Applications in Multimodal Models
This technique is extended to multimodal settings. InstructBLIP applies instruction tuning to vision-language models to create general-purpose models (Source: [279]). MultiInstruct is a framework for improving multi-modal zero-shot learning via instruction tuning (Source: [280]). The M3IT dataset provides a large-scale resource for multi-modal multilingual instruction tuning (Source: [282]).

## Efficient Methods
Efficiency is a major concern. LLaMA-Adapter introduces a parameter-efficient method for fine-tuning LLMs using zero-initialized attention (Source: [285]). Other work explores "cheap and quick" vision-language instruction tuning to reduce computational costs (Source: [284]).

## Related pages
- [[concepts/multimodal-language-modeling.md]]
- [[concepts/fine-tuning.md]]
- [[entities/m3it-dataset.md]]