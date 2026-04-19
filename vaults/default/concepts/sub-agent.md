# Sub Agent

**Summary**: A specialized agent created by a main orchestrator to perform a specific, delegated task, often in parallel with other agents.
**Source Context**: 2602.02276v1.pdf, Chunk 6.

---

## Role and Creation
A **Sub Agent** is an autonomous unit created within a [[concepts/multi-agent-visual-analysis.md]] architecture. It is instantiated using the `create_subagent` tool, which requires a unique name and a clear, specific system prompt defining its role.

## Functionality
Once created, tasks are delegated to a Sub Agent via the `assign_task` tool. Sub Agents possess significant autonomy and can themselves utilize other available tools, such as:
- Search engines
- Browser automation tools
- Potentially, creating further nested sub-agents (though this is not explicitly stated in the source).

## Use Case Example
In the long-form video analysis example, the Main Agent creates multiple Sub Agents. Each is assigned a specific video segment to process independently, performing operations like frame extraction and event analysis. This parallel processing is key to handling large-scale data.

## Related pages
- [[concepts/multi-agent-visual-analysis.md]]
- [[concepts/tool-augmented-reasoning.md]]