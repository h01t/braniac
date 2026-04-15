# DUALVCR

**Summary**: An approach for visual perception that captures both visual features from a screenshot and the descriptions of associated HTML elements to obtain a robust representation of a GUI.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

DUALVCR is a method within the domain of [[concepts/structured-data-perception|structured data perception]] for LLM agents, with a specific focus on web-based graphical user interfaces (GUIs).

## Methodology
Unlike purely visual or purely code-based methods, DUALVCR employs a dual-stream approach:
1.  It captures the visual features of a screenshot (the pixel data).
2.  It simultaneously captures the descriptions of the associated HTML elements underlying the interface [Source: Fundamentals of Building Autonomous LLM Agents.pdf].

By combining these two sources of information, it aims to create a "robust representation of the visual screenshot." This hybrid method allows the agent to benefit from both the literal visual layout and the precise semantic structure provided by the HTML, potentially improving accuracy in tasks like element identification and interaction.

## Related pages
- [[concepts/structured-data-perception.md]]
- [[entities/oscar.md]]