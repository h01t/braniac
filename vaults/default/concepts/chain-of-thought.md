# Chain-of-Thought Reasoning

**Summary**: A prompting technique that encourages language models to generate a step-by-step reasoning process before arriving at a final answer, improving performance on complex tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Core Concept
Chain-of-thought (CoT) prompting decomposes a problem into intermediate reasoning steps, mimicking human problem-solving. This approach has been shown to significantly boost the performance of large language models on arithmetic, commonsense, and symbolic reasoning tasks.

## Multimodal Extension
The principle has been extended to multimodal models. Multimodal chain-of-thought reasoning involves applying CoT prompting to tasks involving visual or auditory data, where the model reasons over both textual and non-textual inputs (Source: [287]). Specific work includes Chain of Thought Prompt Tuning in Vision Language Models, which adapts CoT methods for vision-language tasks (Source: [288]).

## Related pages
- [[concepts/multimodal-reasoning.md]]
- [[concepts/prompting.md]]