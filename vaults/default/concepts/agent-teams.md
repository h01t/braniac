# Agent Teams

**Summary**: A multi-agent collaboration paradigm where different AI agents assume distinct roles, interact with each other (including adversarial reasoning), and coordinate within a defined protocol to complete complex tasks.
**Source Context**: https://www.minimax.io/news/minimax-m27-en

---

## Definition
Agent Teams involve deploying multiple instances of an AI model, each assigned a specific role (e.g., product manager, engineer, critic), to simulate a collaborative organizational structure. This paradigm imposes advanced requirements on the underlying model, such as maintaining role boundaries, engaging in adversarial reasoning, adhering to interaction protocols, and demonstrating behavioral differentiation (Source).

## Native Model Capability
The source emphasizes that effective Agent Teams "cannot be achieved through prompting alone and must be internalized as native capabilities of the model." The model must be able to "stably anchor its role identity, proactively challenge teammates' logical and ethical blind spots, and make autonomous decisions within complex state machines" (Source).

## Application in Development
MiniMax uses an internal Agent Teams setup for product prototype development. This setup contains "a minimal organization for building product prototypes," where different agent roles collaborate (Source). This demonstrates the application of Agent Teams within a [[concepts/ai-native-organization.md|AI-native organization]] workflow.

## Relation to Other Concepts
Agent Teams are a sophisticated application of AI models within a broader [[concepts/agent-harness.md|Agent Harness]]. They are particularly relevant for complex tasks in domains like [[concepts/professional-software-engineering.md|professional software engineering]], where different specializations are required.

## Related pages
- [[entities/minimax-m27.md]]
- [[concepts/agent-harness.md]]
- [[concepts/professional-software-engineering.md]]