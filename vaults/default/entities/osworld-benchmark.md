# OSWorld Benchmark

**Summary**: A benchmark for evaluating autonomous software agents that perform tasks across real operating system environments (e.g., web, desktop GUI).
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Purpose and Context
OSWorld is cited as a key benchmark used to assess the capabilities and limitations of multimodal autonomous agents. It provides a testbed for agents to execute tasks in realistic software environments, which helps reveal performance gaps and specific failure modes [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Cited Performance Data
As reported in the source (citing the OSWorld website as of June 2025):
- **Human Performance**: Humans achieve a task completion rate of more than 72.36% on OSWorld tasks.
- **Leading Model Performance**: The best-performing autonomous agents at the time reached approximately 42.9% completion.
This data indicates a substantial performance gap between current agents and human capabilities, which motivates research into improved agent architectures [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Role in Identifying Challenges
The benchmark is used to highlight key limitations in current agent systems, which inform the paper's problem statement and research questions. These include:
- Difficulties in GUI grounding and operational knowledge.
- Repetitive actions and inability to break out of loops.
- Lack of robustness to unexpected UI changes (window noise).
- Limitations in exploration and adaptability for certain agent designs [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related Research Questions
The benchmark is directly relevant to **RQ6 (Evaluation and generalization)**, which asks which benchmarks are appropriate for assessing agent systems and to what extent agents generalize across tasks and interfaces [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[sources/fundamentals-of-building-autonomous-llm-agents.md]]
- [[concepts/llm-agent.md]]