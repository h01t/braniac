# Tool Use and Language Model Agents

**Summary**: Systems and frameworks that enable large language models to use external tools (APIs, calculators, code executors) and act as autonomous or semi-autonomous agents to complete complex tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf (citations 215-247)

---

[[concepts/tool-use-agents.md]] represent a shift from LLMs as text generators to LLMs as cores of reasoning systems that can interact with the external world.

**Tool Use and API Integration**: Models can be taught to call tools. Patil et al. (2023) introduce Gorilla, an LLM connected with massive APIs [[sources/patil-et-al-gorilla-2023.md]]. ToolLLM (Qin et al., 2023) facilitates mastering over 16,000 real-world APIs [[sources/qin-et-al-toolllm-2023.md]]. Hsieh et al. (2023) show that tool documentation enables zero-shot tool usage [[sources/hsieh-et-al-tool-documentation-zero-shot-2023.md]].

**Multi-Agent and Planning Frameworks**: LLMs can coordinate in multi-agent systems. Hong et al. (2023) present MetaGPT, a meta programming framework for multi-agent collaboration [[sources/hong-et-al-metagpt-2023.md]]. Surveys by Xi et al. (2023) and Wang et al. (2023) detail the rise and potential of LLM-based agents [[sources/xi-et-al-survey-llm-agents-2023.md]][[sources/wang-et-al-survey-llm-autonomous-agents-2023.md]].

**Reasoning and Planning as Core Abilities**: Agents use LLMs for planning. Huang et al. (2022) treat language models as zero-shot planners for embodied agents [[sources/huang-et-al-lms-as-zero-shot-planners-2022.md]]. Hao et al. (2023) frame reasoning with an LLM as planning with a world model [[sources/hao-et-al-reasoning-as-planning-2023.md]]. Reflexion (Shinn et al., 2023) agents use verbal reinforcement learning [[sources/shinn-et-al-reflexion-2023.md]].

**Embodied Agents and Robotics**: A major application is robotics. Singh et al. (2023) use LLMs for situated robot task planning with ProgPrompt [[sources/singh-et-al-progprompt-2023.md]]. Brohan et al. (2023) ground language in robotic affordances ("Do As I Can") [[sources/brohan-et-al-do-as-i-can-2023.md]]. Ding et al. (2023) apply LLMs to task and motion planning for object rearrangement [[sources/ding-et-al-task-motion-planning-2023.md]].

## Related pages
- [[concepts/reasoning-planning.md]]
- [[concepts/embodied-ai.md]]
- [[sources/patil-et-al-gorilla-2023.md]]
- [[sources/hong-et-al-metagpt-2023.md]]