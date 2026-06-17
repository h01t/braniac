# Configurable Stop Conditions

**Summary**: Five configurable conditions that determine when the Plan-Execute-Verify-Replan loop should terminate, balancing quality and cost.
**Source Context**: gfNe1g-2603.11445v1.pdf (VMAO Framework, Table 2).

---

The stop conditions are evaluated after each verification phase:

| Condition | Threshold | Rationale |
|-----------|-----------|-----------|
| Ready for Synthesis | 80% complete | Sufficient sub-questions answered |
| High Confidence | 75% conf, 50% complete | High reliability despite partial coverage |
| Diminishing Returns | < 5% improvement | Further iteration yields minimal gain |
| Token Budget | 1M tokens | Hard cost limit |
| Max Iterations | 3 iterations | Hard iteration limit |

These parameters are configurable (Table 5 in the paper). In experiments, over 75% of queries terminated via resource-based conditions (diminishing returns, max iterations, or token budget), reflecting conservative thresholds favoring thoroughness over speed.

The stop conditions are part of the [[concepts/vmao.md]] framework and work in concert with [[concepts/verification-driven-replanning.md]].

## Related pages
- [[concepts/vmao.md]]
- [[concepts/verification-driven-replanning.md]]
- [[sources/gfNe1g-2603.11445v1.md]]