# Training Objectives in LLMs

**Summary**: Different self-supervised training objectives used for pre-training Large Language Models, including causal, non-causal, and masked approaches.
**Source Context**: Comprehensive Overview of LLMs.pdf, Batch 2 of 15.

---

Training objectives define how LLMs learn from data during pre-training. Key objectives include:

- **Causal Language Modeling**: The model predicts future tokens given previous tokens, as illustrated in Figure 5 of the source [Source: Comprehensive Overview of LLMs.pdf].

- **Prefix Language Modeling**: A non-causal objective where a prefix is chosen randomly, and only the remaining target tokens are used to calculate the loss, shown in Figure 5 [Source: Comprehensive Overview of LLMs.pdf].

- **Masked Language Modeling**: Tokens or spans are masked randomly, and the model predicts them using past and future context, with an example in Figure 5 [Source: Comprehensive Overview of LLMs.pdf].

- **Unified Language Modeling**: Combines causal, non-causal, and masked objectives, with unidirectional attention in masked cases [Source: Comprehensive Overview of LLMs.pdf].

These objectives are foundational for [[concepts/adaptation-stages.md]] like pre-training and influence model performance.

## Related pages
- [[concepts/adaptation-stages.md]]
- [[concepts/scaling-laws.md]]