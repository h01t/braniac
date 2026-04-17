# Memory System

**Summary**: A system enabling LLM agents to manage information across time scales, with long-term memory for sustained knowledge retention and short-term memory for contextual awareness.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Overview
The memory system supports [[concepts/reasoning-system.md]] and [[concepts/multi-agent-systems.md]] by storing past experiences and information, crucial for agent adaptation and learning (Source: Section 5).

## Long-Term Memory
Retains knowledge over extended periods, implemented via:
1. **Embodied Memory**: Experiences ingrained directly into model parameters through fine-tuning, adjusting weights to encode new facts (Source: Section 5.1).
2. **RAG (Retrieval-Augmented Generation)**: Enhances LLMs by retrieving relevant documents from external knowledge bases, reducing hallucinations and improving accuracy (Source: Section 5.1).
3. **SQL Database**: Stores structured knowledge (e.g., employee data), with text-to-SQL techniques enabling reliable database interaction via transformer models (Source: Section 5.1).

## Role in Multi-Agent Systems
The Memory Management Expert in [[concepts/multi-agent-systems.md]] handles memory to ensure efficient information retrieval and context maintenance (Source: Section 4.5).

## Advantages
- Allows agents to retain knowledge beyond pre-trained data (Source: Section 5.1).
- Supports sustained interaction and adaptation over time (Source: Section 5.1).

## Related pages
- [[concepts/reasoning-system.md]]
- [[concepts/multi-agent-systems.md]]
- [[concepts/rag.md]]