# Training Objectives

**Summary**: Different self-supervised learning tasks used to train Large Language Models (LLMs), including causal, prefix, masked, and unified language modeling.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

LLMs are trained using various self-supervised objectives on large text corpora. The choice of objective influences the model's capabilities and the architectural constraints (e.g., causal vs. non-causal attention).

**Causal Language Modeling (CLM)**: Also known as autoregressive or standard language modeling. The model is trained to predict the next token in a sequence given all previous tokens. This is a unidirectional objective used primarily in [[concepts/decoder-only-architectures.md]].

**Prefix Language Modeling**: A non-causal training objective. A random prefix of the input sequence is chosen, and the model is trained to predict only the remaining target tokens that follow this prefix. This allows the model to use bidirectional context within the chosen prefix.

**Masked Language Modeling (MLM)**: Tokens or spans of consecutive tokens are randomly masked within the input sequence. The model is trained to predict these masked tokens using the context from both the left and right (bidirectional attention). A variant noted in the source uses unidirectional attention (left-to-right or right-to-left) for the masked tokens.

**Unified Language Modeling**: This approach combines causal, non-causal, and masked language training objectives into a single framework. As per the source, within the masked objective component, attention is constrained to be unidirectional.

## Related pages
- [[concepts/decoder-only-architectures.md]]
- [[concepts/encoder-decoder-architectures.md]]
- [[concepts/pre-training.md]]