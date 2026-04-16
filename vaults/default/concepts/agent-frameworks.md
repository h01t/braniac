# Agent Frameworks

**Summary**: Tools and APIs provided by OpenAI for building autonomous or semi-autonomous AI agents capable of executing multi-step tasks and using tools.
**Source Context**: https://grokipedia.com/page/OpenAI

---

## Evolution of OpenAI's Agent Tools

OpenAI has developed several frameworks for creating AI agents. The **Assistants API** (launched November 2023, deprecated August 2026) allowed developers to build customizable chat assistants with persistent threads and tools like code interpreters and file search for [[concepts/retrieval-augmented-generation.md]] [202, 203].

Its successor, the **Responses API** (released March 2025), combines chat completions and agent workflows into a single endpoint. It natively supports tools for web search, file search, and "computer use" capabilities [204, 205].

## Advanced Toolkits and Platforms

At DevDay in October 2025, OpenAI launched **AgentKit**, a developer toolkit for constructing, deploying, and optimizing AI agents. It incorporates real-time voice capabilities via the `gpt-realtime` model [215, 216, 217].

On February 5, 2026, OpenAI launched **Frontier**, an enterprise platform for building, deploying, and managing teams of AI agents with shared business context and built-in governance [222].

## Product Integration and Criticism

Agent capabilities have been integrated into products like the [[entities/products/chatgpt-atlas.md]] browser. However, these early agent systems have faced criticism for inconsistency. Former OpenAI researcher [[entities/people/andrej-karpathy.md]] questioned their reliability, labeling early iterations as inconsistent rather than transformative [218].

## Related pages
- [[concepts/developer-platform.md]]
- [[entities/products/chatgpt-atlas.md]]