# Parallel Agent Reinforcement Learning

**Summary**: The reinforcement learning paradigm used to train the orchestrator in the Agent Swarm framework, featuring a decoupled architecture and a composite reward function designed to learn effective parallel task decomposition and scheduling.
**Source Context**: 2602.02276v1.pdf

---

## Overview
[[concepts/parallel-agent-rl.md]] (PARL) is the training methodology for the [[concepts/agent-swarm.md]] framework in Kimi K2.5. It departs from traditional agentic RL by equipping the model with interfaces for sub-agent creation and task delegation, enabling the learning of parallel orchestration strategies.

## Reward Design
Training a reliable parallel orchestrator is challenging due to delayed, sparse feedback. The PARL reward is a composite:
`r_PARL(x, y) = λ1 * r_parallel + λ2 * r_finish + r_perf(x, y)`
*   **Instantiation Reward (r_parallel)**: Mitigates "serial collapse," where the orchestrator defaults to single-agent execution, by incentivizing subagent creation.
*   **Sub-agent Finish Rate Reward (r_finish)**: Prevents "spurious parallelism" (reward-hacking by spawning many subagents without meaningful decomposition) by rewarding completed subtasks.
*   **Task-Level Outcome Reward (r_perf)**: Evaluates the overall success and quality of the solution.
The hyperparameters λ1 and λ2 are annealed to zero over training to ensure the final policy optimizes for the primary objective.

## Critical Steps Constraint
To measure computational cost in a parallel setting, PARL uses the concept of "critical steps," analogous to the critical path in a computation graph. The total critical steps for an episode sum the steps of the main agent plus the longest-running subagent in each parallel group across stages. This metric explicitly incentivizes the orchestrator to allocate work to minimize end-to-end latency.

## Training Progression
During training, the orchestrator learns when and how to parallelize through environmental feedback. The level of parallelism and cumulative reward increase smoothly as training progresses, indicating adaptive optimization of the parallelization strategy.

## Related pages
- [[concepts/agent-swarm.md]]
- [[entities/kimi-k2-5.md]]