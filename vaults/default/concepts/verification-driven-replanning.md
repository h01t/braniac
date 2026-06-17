# Verification-Driven Replanning

**Summary**: A technique in multi-agent systems where the execution results of sub-questions are verified against criteria, and if verification fails, a replan is triggered.

## Use in VMAO
After execution, each sub-question's output is checked against verification criteria. Failed verifications cause replanning for that sub-tree.

## Related Concepts
- [[concepts/dag-query-decomposition.md]]
- [[concepts/vmao.md]]