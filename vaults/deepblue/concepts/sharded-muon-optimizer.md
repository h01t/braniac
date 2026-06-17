# Sharded Muon Optimizer

**Summary**: An optimizer used for continued pretraining of Composer 2.5, applying Muon with distributed orthogonalization at the model’s natural granularity (per attention head, per MoE expert). Handles sharded parameters via asynchronous all‑to‑all transfers.

**Source Context**: https://cursor.com/blog/composer-2-5

---

After momentum update, Newton‑Schulz iteration is run on complete matrices reassembled from shards. For same‑shaped tensors, all‑to‑all gathers them, orthogonalizes, then all‑to‑all scatters back. Transfers are asynchronous, overlapping network and compute. On a 1T model, optimizer step time is 0.2 seconds.

## Related pages

- [[concepts/composer-2-5.md]]
- [[concepts/dual-mesh-hsdp.md]]
- [[entities/cursor.md]]
- [[sources/blog-post-composer-2-5.md]]