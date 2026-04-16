# OpenAI Developer Platform

**Summary**: A suite of APIs, SDKs, and frameworks that allows developers to integrate OpenAI's AI models into third-party applications and build agentic systems.
**Source Context**: https://grokipedia.com/page/OpenAI

---

## Core APIs

The platform offers REST APIs for integrating AI models, primarily processed on OpenAI servers via Microsoft Azure infrastructure [163]. Key endpoints include:
*   **Chat Completions API**: For generating responses from models like [[entities/models/gpt-4o.md]].
*   **Embeddings API**: For creating text vector representations, useful in [[concepts/retrieval-augmented-generation.md]] (RAG) systems.
*   **Images API**: For generating and editing images with [[entities/models/dall-e.md]].
*   **Audio API**: For transcription using [[entities/models/whisper.md]] and text-to-speech.
*   **Realtime API**: Enables low-latency, pay-as-you-go multimodal interactions, including voice [192].

## Authentication and Data Privacy

Authentication uses project-scoped API keys managed at `https://platform.openai.com`. Full secret values cannot be retrieved after creation [163, 194, 195].

API data is used to train models only with explicit user opt-in. Enterprise accounts can use zero-data-retention endpoints. Consumer users can export personal data (e.g., ChatGPT history) via the Privacy Portal or in-app settings [196, 197].

## SDKs and Frameworks

OpenAI provides official SDKs for [[entities/technology/python.md]], Node.js/TypeScript, Java, and .NET/C# to simplify API integration [199, 200, 201].

For building agents, the **Assistants API** (launched November 2023, deprecated August 2026) allowed creation of chat-based assistants with tools like code interpreters and [[concepts/retrieval-augmented-generation.md]] [202, 203]. Its successor, the **Responses API** (released March 2025), combines chat and agent workflows, natively supporting tools for web search, file search, and computer use [204, 205].

Additional tools include the open-source **Agents SDK** for multi-agent systems and **AgentKit**, a toolkit for building and optimizing agents, announced at DevDay in October 2025 [206, 207].

## Enterprise Adoption

The developer platform serves over one million paying customers. In October 2025, OpenAI highlighted approximately 30 companies, including Duolingo, Salesforce, and Shopify, that had each processed over 1 trillion tokens through its API, recognizing them with a "Tokens of Appreciation" milestone program [198, Source Context].

## Related pages
- [[concepts/api-pricing-tokens.md]]
- [[concepts/agent-frameworks.md]]
- [[concepts/retrieval-augmented-generation.md]]