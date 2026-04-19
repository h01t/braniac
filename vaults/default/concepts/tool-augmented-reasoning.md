# Tool-Augmented Reasoning

**Summary**: A methodology where an AI system uses external tools (e.g., search, code execution, browser automation) to gather information, perform computations, and interact with environments to complete tasks.
**Source Context**: 2602.02276v1.pdf, Chunk 6.

---

## Core Idea
**Tool-Augmented Reasoning** enhances an AI model's capabilities by allowing it to leverage specialized external tools rather than relying solely on its internal parameters and training data. This is a key feature of the system described.

## Available Tools
The system has access to a suite of tools to complete tasks more efficiently:
1.  **Search Tool**: A search engine to retrieve information, supporting multiple parallel queries.
2.  **Browser Tools**: Capabilities to visit web links (pages, PDFs), get content, and perform interactions like clicking, inputting, and scrolling.
3.  **Sub Agent Tools**:
    - `create_subagent`: Creates a new [[concepts/sub-agent.md]] with a unique name and specific prompt.
    - `assign_task`: Delegates tasks to created sub-agents. These sub-agents can also use search and browser tools.
4.  **Other Tools**: Includes code execution environments (IPython, Shell).

## Application in Visual Tasks
As demonstrated in visual reasoning examples (Figure 12), tool use is central. The model employs tools to execute code for computer vision tasks (segmentation, pathfinding algorithms) and perform quantitative calculations, embodying the [[concepts/visual-reasoning.md]] process.

## Related pages
- [[concepts/sub-agent.md]]
- [[concepts/visual-reasoning.md]]