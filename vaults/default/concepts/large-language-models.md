# Large Language Models

**Summary**: Large Language Models (LLMs) are cutting-edge artificial intelligence systems with billions of parameters, trained on massive text corpora, capable of processing and generating human-like text and generalizing to a wide variety of tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Definition and Core Characteristics
LLMs are a class of [[concepts/pre-trained-language-models.md]] characterized by their enormous scale, typically defined as having 10 billion parameters or more (Source: Comprehensive Overview of LLMs.pdf). They are trained on vast datasets (many GBs to TBs) in a self-supervised manner, enabling them to learn generic linguistic representations. This scale facilitates emergent capabilities like [[concepts/in-context-learning.md]] and [[concepts/reasoning.md]] that are not explicitly programmed (Source: Comprehensive Overview of LLMs.pdf).

## Evolution from PLMs
LLMs evolved from smaller Pre-trained Language Models (PLMs) by significantly increasing model parameters and training data. This scaling led to substantial performance gains and the transition to models that can perform well on downstream tasks without task-specific fine-tuning, as demonstrated by [[entities/gpt-3.md]] (Source: Comprehensive Overview of LLMs.pdf).

## Key Abilities and Applications
LLMs exhibit remarkable abilities in natural language processing and beyond, including translation, summarization, conversational interaction, and tool manipulation. They can follow instructions when fine-tuned with instruction data and aligned with human preferences, improving their zero-shot performance and reducing misaligned behavior (Source: Comprehensive Overview of LLMs.pdf). Their application domains extend to [[concepts/multimodal-llms.md]], robotics, and autonomous agents.

## Architectural Foundations
Most LLMs are built on the [[concepts/transformer-architecture.md]], utilizing [[concepts/attention-mechanisms.md]] mechanisms like self-attention. Common architectural variants include [[concepts/causal-decoder.md]], [[concepts/prefix-decoder.md]], and [[concepts/mixture-of-experts.md]] (Source: Comprehensive Overview of LLMs.pdf, Section 2.9).

## Challenges
The capabilities of LLMs come with significant challenges, including massive computational requirements for training and inference, high costs, and the need for techniques like [[concepts/parameter-efficient-tuning.md]], [[concepts/model-pruning.md]], and [[concepts/quantization.md]] to improve efficiency (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/transformer-architecture.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/emergent-abilities.md]]
- [[concepts/attention-mechanisms.md]]