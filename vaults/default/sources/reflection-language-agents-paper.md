# Reflection: Language Agents with Verbal Reinforcement Learning

**Summary**: A paper presenting a reflection framework where LLM agents improve performance through linguistic feedback, using components like Actor, Evaluator, and Self-Reflection Model.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (cited as [49])

---

## Overview
This paper introduces a reflection system for language agents that operates iteratively, allowing agents to learn from past mistakes by generating and storing verbal feedback for future iterations (Source: Section 4.3).

## Core Components
1. **Actor**: LLM generating text and actions based on state observations and memory (Source: Section 4.3).
2. **Evaluator**: Assesses the Actor's outputs, computing a reward score via exact match grading, heuristics, or another LLM (Source: Section 4.3).
3. **Self-Reflection Model**: LLM producing nuanced verbal self-reflections given sparse reward signals and trajectories (Source: Section 4.3).

## Key Contribution
The framework enables [[concepts/reflection.md]] without traditional weight updates, using linguistic feedback to enhance agent performance in [[concepts/reasoning-system.md]].

## Relation to Other Work
Contrasts with anticipatory reflection from [[sources/devils-advocate-paper.md]], which focuses on proactive failure consideration.

## Related pages
- [[concepts/reflection.md]]
- [[concepts/reasoning-system.md]]