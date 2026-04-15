# Mixtral 8x22B

**Summary**: A mixture-of-experts (MoE) language model with a total of 22B parameters, where each token is routed to 2 out of 8 distinct experts at each layer, combining their outputs additively.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Architecture
Mixtral 8x22B is a [[concepts/mixture-of-experts.md]] model. The "8x22B" nomenclature indicates it has **8 experts**, with a total of **22 billion parameters**. At each layer of the transformer, for every input token, a routing network selects **2 out of the 8 experts** to process that token. The outputs from these two activated experts are then combined (typically additively) to produce the final output for that token at that layer (Source: Comprehensive Overview of LLMs.pdf).

## Efficiency Principle
This design follows the core MoE principle: it maintains a large total parameter count (for knowledge capacity) while only using a fraction of those parameters (the 2 active experts per token) during computation. This makes inference more efficient than a dense 22B parameter model that would use all parameters for every token.

## Related pages
- [[concepts/mixture-of-experts.md]]