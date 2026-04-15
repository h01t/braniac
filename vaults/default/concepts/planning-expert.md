# Planning Expert

**Summary**: A specialized agent within a multi-agent system focused on strategic thinking, task decomposition, and the generation of executable plans.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

The Planning Expert is a core component of a **[[concepts/multi-agent-systems.md]]**. Its primary role is to break down complex, high-level objectives into a series of manageable subtasks and to formulate a coherent strategy for achieving them.

**Key Responsibilities:**
*   **Task Decomposition**: Employing techniques like **[[concepts/decompose-plan-merge-dppm.md]]** to divide main tasks into logical sub-goals.
*   **Strategic Planning**: Generating the sequence or structure of steps required to complete the task.
*   **Coordination and Constraint Management**: The source notes that the Planning Expert often collaborates with a Constraint Satisfaction Expert to ensure plans do not violate predefined rules. It is also responsible for avoiding infinite loops or repeated failed attempts.

In the described multi-agent workflow, the Planning Expert initiates the process. Once it creates a plan, it hands off specific actions to an **[[concepts/action-expert.md]]** for execution. It may later receive feedback from the **[[concepts/reflection-system.md]]** and adjust plans accordingly.

## Related pages
- [[concepts/multi-agent-systems.md]]
- [[concepts/decompose-plan-merge-dppm.md]]
- [[concepts/reflection-system.md]]