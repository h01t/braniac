# Retrieval-Augmented Generation (RAG)

**Summary**: A technique that combines a language model with a retrieval system to fetch relevant documents from a knowledge base before generating an answer.

## How It Works
1. Encode the user query.
2. Retrieve top-k relevant chunks from a vector database.
3. Concatenate chunks with the prompt.
4. Generate an answer conditioned on the retrieved context.

## Related Concepts
- [[concepts/developer-platform.md]]
- [[concepts/agent-frameworks.md]]