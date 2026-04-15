# GPT-3 Model

**Summary**: GPT-3 is a landmark autoregressive LLM that demonstrated remarkable few-shot and zero-shot learning capabilities, significantly advancing the field by showing that massive scale enables task generalization without task-specific fine-tuning.
**Source Context**: Comprehensive Overview of LLams.pdf

---

## Breakthrough Capabilities
GPT-3 (Generative Pre-trained Transformer 3), developed by OpenAI, was pivotal in showcasing that large-scale [[concepts/pretraining.md]] alone could enable strong performance on downstream tasks without the need for [[concepts/fine-tuning.md]]. It excelled at **in-context learning**, where providing a task description and a few examples in the prompt (few-shot) allowed it to perform the task accurately (Source: Comprehensive Overview of LLMs.pdf).

## Architecture and Scale
GPT-3 is a **causal decoder**-only model [[concepts/llm-architecture.md]] with 175 billion parameters. Its success was largely attributed to its unprecedented scale at the time of release, which contributed to the observed **emergent abilities** in LLMs (Source: Comprehensive Overview of LLMs.pdf).

## Limitations and Impact
While powerful, pre-trained GPT-3 had limitations: it could fail to follow user intent and often performed worse in zero-shot settings compared to few-shot. This highlighted the need for subsequent techniques like instruction [[concepts/fine-tuning.md]] and [[concepts/alignment.md]] to improve controllability and zero-shot performance, which were adopted in later models like InstructGPT and ChatGPT (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/pretraining.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/alignment.md]]
- [[concepts/llm-architecture.md]]