# Mixtral8x22b

**Summary**: A mixture-of-experts (MoE) language model with 8 distinct experts, where each token is routed to 2 experts at each layer and their outputs are combined additively.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Architecture
Mixtral8x22b is a [[concepts/mixture-of-experts.md]] (MoE) model. The "8x22b" nomenclature suggests it has 8 experts, with each expert likely having a size of 22 billion parameters (though the total parameter count is not explicitly stated in this excerpt). At each transformer layer, for every input token, a routing mechanism selects **2 out of the 8 experts** to process that token. The outputs from these two activated experts are then summed together to produce the layer's output for that token.

This design follows the standard MoE pattern of achieving high model capacity (many parameters) with sparse activation (only a subset used per token), leading to efficient inference.

## Related pages
- [[concepts/mixture-of-experts.md]]
- [[concepts/sparse-activation.md]]