# LLM-Powered Agents

**Summary**: Autonomous AI entities that use Large Language Models as their central "brain" for planning, decision-making, and executing actions in dynamic environments to achieve complex goals.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

LLM-powered agents represent a shift from narrow, rule-based AI systems to flexible, reasoning-based autonomous entities. The LLM acts as the cognitive controller, generating plans, reasoning about tasks, incorporating memory, and adapting based on environmental feedback. These agents require minimal to no fine-tuning and are applied in domains like web browsing, coding, tool use, robotics, and conversation.

## Core Capabilities and Modules
Key modules and strategies enhance agent performance:
*   **Planning and Reasoning**: Agents use prompting techniques like Chain-of-Thoughts [[concepts/chain-of-thought.md]], Tree-of-Thoughts, and Self-Consistency to elicit logical thinking from the LLM. Methods like Reasoning via Planning (RAP) use a world model to reason about future outcomes.
*   **Feedback**: To handle real-world failures, agents often operate in a closed-loop. The action's result is fed back to the LLM to re-assess and update the plan. LLMs can also function as reward functions to train reinforcement learning policies.
*   **Memory**: Beyond the prompt's internal context, agents use external memory systems. Reflexion uses episodic memory of past responses as feedback. Retroformer uses short-term (recent responses) and long-term (summarized failures) memory.
*   **Multi-Agent Systems**: Multiple LLMs can be assigned unique roles (simulating domain experts) to collaborate on complex tasks.
*   **Physical Embodiment**: Grounding LLMs in the physical world is challenging. SayCan combines an LLM's high-level planning with a learned "affordance function" that evaluates executable actions. PaLM-E is a multimodal LLM trained directly on sensor inputs (Source: Comprehensive Overview of LLMs.pdf).

## Application Domains
*   **Manipulation**: LLMs enhance robot dexterity in tasks like object recognition and grasping by analyzing visual and spatial information.
*   **Navigation**: LLMs help robots navigate complex environments (e.g., warehouses, homes) by generating feasible paths and adapting to dynamic details (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/tool-augmented-llms.md]]
- [[concepts/chain-of-thought.md]]