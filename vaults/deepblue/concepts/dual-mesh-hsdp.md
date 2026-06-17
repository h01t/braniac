# Dual Mesh HSDP (Hierarchical Sharded Data Parallelism)

**Summary**: A parallelism strategy used in Composer 2.5 that separates HSDP layouts for non‑expert and expert weights in MoE models, allowing independent parallelism dimensions to overlap efficiently.

**Source Context**: https://cursor.com/blog/composer-2-5

---

HSDP forms multiple FSDP replicas and all‑reduces gradients across corresponding shards. Non‑expert weights are small, so their FSDP groups stay narrow (node/rack). Expert weights hold most parameters and most Muon compute, so they use a wider expert sharding mesh.

Keeping layouts separate lets CP=2 and EP=8 run on 8 GPUs instead of requiring 16 in a single mesh. Avoids wide communication for small non‑expert state while spreading expert optimizer work.

## Related pages

- [[concepts/composer-2-5.md]]
- [[concepts/sharded-muon-optimizer.md]]
- [[entities/cursor.md]]
- [[sources/blog-post-composer-2-5.md]]