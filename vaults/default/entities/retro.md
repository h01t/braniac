# RETRO (Retrieval-Enhanced Transformer)

**Summary**: A model architecture that pre-trains a language model with integrated retrieval capabilities, demonstrating that smaller models augmented with a retrieval pipeline can outperform much larger non-retrieval models.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

The Retrieval-Enhanced Transformer (RETRO) is a landmark model in [[concepts/retrieval-augmented-generation.md]]. It is pre-trained on a massive text corpus (a 2-trillion token subset of MassiveText) paired with a dense vector database of neighbor chunks.

## Architecture and Training
During pre-training, RETRO divides the input sequence into chunks and retrieves the most relevant neighbor chunks from the database for each. These retrieved chunks are encoded and processed alongside the input using cross-attention mechanisms. A key finding is that pre-training with the RAG pipeline is essential; models fine-tuned with RAG after standard pre-training do not achieve the same level of performance gain (Source: Comprehensive Overview of LLMs.pdf).

RETRO's success highlights the potential of retrieval augmentation as a core component of model architecture, not just an add-on during inference.

## Related pages
- [[concepts/retrieval-augmented-generation.md]]