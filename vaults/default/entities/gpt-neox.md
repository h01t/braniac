# GPT-NeoX

**Summary**: A 20B parameter open-source LLM from EleutherAI that uses parallel attention and specific weight initialization strategies.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

GPT-NeoX-20B is a decoder-only LLM. It uses the [[concepts/parallel-attention.md]] architecture [Source: Comprehensive Overview of LLums.pdf]. For [[concepts/weight-initialization.md]], it initializes feed-forward layers before residuals with `2 / sqrt(d)` and other layers with a small initialization scheme to prevent activation explosion [Source: Comprehensive Overview of LLMs.pdf]. It also interpolates learning rates based on model size to avoid hyperparameter tuning [Source: Comprehensive Overview of LLums.pdf].

## Related pages
- [[concepts/parallel-attention.md]]
- [[concepts/weight-initialization.md]]
- [[concepts/learning-rate-strategies.md]]