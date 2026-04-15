# GPT-3

**Summary**: GPT-3 is a 175-billion parameter autoregressive language model that demonstrated remarkable few-shot and zero-shot learning capabilities, significantly advancing the paradigm of prompt-based task generalization.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Architecture and Scale
GPT-3 is a [[concepts/transformer-architectures.md|causal decoder]] model, part of the Generative Pre-trained Transformer series. With 175 billion parameters, it was, at its release, one of the largest [[concepts/large-language-models.md]] ever created (Source: Comprehensive Overview of LLMs.pdf, referencing [6]).

## Key Contribution: In-Context Learning
GPT-3's most influential finding was that scaling up language models enabled strong performance on downstream tasks without requiring gradient-based [[concepts/fine-tuning.md]]. Instead, tasks could be described and/or exemplified within a natural language prompt (few-shot learning), and the model would generate the appropriate completion. This demonstrated impressive [[concepts/in-context-learning.md]] and zero-shot transfer abilities (Source: Comprehensive Overview of LLMs.pdf, Introduction).

## Impact and Limitations
GPT-3 showcased the emergent abilities of large-scale models but also highlighted limitations: pre-trained models could fail to follow user intent and sometimes performed worse in zero-shot settings than in few-shot. This spurred research into [[concepts/instruction-tuning.md]] and [[concepts/alignment.md]] to improve usability and safety (Source: Comprehensive Overview of LLMs.pdf, Introduction).

## Historical Significance
The paper positions GPT-3 as a turning point, moving beyond the transfer learning paradigm of models like [[entities/t5.md]] and [[entities/mt5.md]] toward models that generalize from prompts alone (Source: Comprehensive Overview of LLMs.pdf, Introduction).

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/in-context-learning.md]]
- [[concepts/transformer-architectures.md]]