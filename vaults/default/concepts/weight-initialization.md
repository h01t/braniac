# Weight Initialization in LLMs

**Summary**: The process of setting initial model parameters, which plays a significant role in convergence and training stability for large language models.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Proper weight initialization is crucial for model convergence and training stability. [[entities/gpt-neox.md]] initializes feed-forward layers before residuals with a specific factor (`2 / sqrt(d)`) and other layers with a small initialization scheme to prevent activations from growing exponentially with depth [Source: Comprehensive Overview of LLMs.pdf].

MT-NLG found that higher variance in weight initialization leads to unstable training, validating the use of small initialization schemes [Source: Comprehensive Overview of LLMs.pdf]. For models using random initialization, a longer warmup period can help negate the effects of bad initialization [Source: Comprehensive Overview of LLums.pdf]. This is closely tied to managing [[concepts/training-instability.md]].

## Related pages
- [[concepts/training-instability.md]]
- [[concepts/learning-rate-strategies.md]]
- [[entities/gpt-neox.md]]