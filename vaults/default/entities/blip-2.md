# BLIP-2

**Summary**: A vision-language model that pre-trains a Querying Transformer (Q-Former) in two stages to align frozen visual and language models.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

BLIP-2 is a [[concepts/pre-training-for-mllms.md]] model. It proposes a two-stage strategy:
1.  Vision-language representation learning is bootstrapped from a frozen visual encoder.
2.  Vision-to-language generative learning is bootstrapped from a frozen LLM, enabling zero-shot image-to-text generation.
The core component is the pre-trained Querying Transformer (Q-Former) that handles the alignment [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/pre-training-for-mllms.md]]