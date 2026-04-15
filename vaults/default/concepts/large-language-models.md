# Large Language Models (LLMs)

**Summary**: Large Language Models are cutting-edge AI systems that process and generate text, demonstrating remarkable capabilities in natural language tasks and beyond due to their scale, which enables emergent abilities like reasoning and in-context learning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition and Significance
Large Language Models (LLMs) are artificial intelligence systems characterized by their massive number of parameters (often tens to hundreds of billions) and training on extensive text corpora (many GBs to TBs) [[concepts/pretraining.md]] (Source: Comprehensive Overview of LLMs.pdf). They have revolutionized natural language processing (NLP) by approximating human-level performance on diverse tasks such as translation, summarization, and conversational interaction.

## Historical Evolution
The progress in NLP evolved from statistical methods to neural language modeling, then to Pre-trained Language Models (PLMs), and finally to LLMs [[concepts/pretraining.md]]. While traditional language modeling trained task-specific models, PLMs learned generic representations via self-supervised learning on large text corpora. The discovery that scaling up PLMs (in parameters and data) led to significant performance gains drove the transition to the modern LLM era (Source: Comprehensive Overview of LLMs.pdf). Early landmark LLMs include T5 [[entities/t5-model.md]] and GPT-3 [[entities/gpt-3-model.md]].

## Key Abilities and Transitions
Pre-trained LLMs initially showed strong zero-shot task transfer without fine-tuning, as demonstrated by GPT-3 [[entities/gpt-3-model.md]]. However, they often performed poorly at following user intent. This led to advancements in [[concepts/fine-tuning.md]] with instructional data and [[concepts/alignment.md]] with human preferences, which significantly improved their generalization to unseen tasks and reduced misaligned behavior (Source: Comprehensive Overview of LLMs.pdf).

A critical feature of LLMs is their **emergent abilities**, such as reasoning, planning, and in-context learning. These abilities are not explicitly trained but appear to emerge from the model's gigantic scale (Source: Comprehensive Overview of LLMs.pdf).

## Associated Challenges and Research Areas
The powerful capabilities of LLMs come with high computational costs, including slow training/inference and extensive hardware requirements. This has spurred research into [[concepts/efficient-llms.md]] methods, including efficient [[concepts/llm-architecture.md]], [[concepts/parameter-efficient-tuning.md]], pruning, and quantization. The field also actively researches [[concepts/multimodal-llms.md]], [[concepts/augmented-llms.md]], and LLM-powered agents (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/pretraining.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/alignment.md]]
- [[concepts/llm-architecture.md]]
- [[concepts/efficient-llms.md]]