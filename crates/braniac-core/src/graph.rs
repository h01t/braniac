use std::collections::{HashMap, HashSet};
use std::path::PathBuf;

use braniac_types::{GraphEdge, GraphNode, GraphSnapshot, LayoutOptions};

use crate::error::Result;
use crate::vault::VaultResolver;

pub struct GraphEngine {
    #[allow(dead_code)]
    data_dir: PathBuf,
}

impl GraphEngine {
    pub fn new(data_dir: PathBuf) -> Self {
        Self { data_dir }
    }

    pub fn snapshot(&self, vault: &VaultResolver, vault_id: &str) -> Result<GraphSnapshot> {
        let files = vault.list_files(vault_id)?;
        let mut nodes_map: HashMap<String, GraphNode> = HashMap::new();
        let mut edges: Vec<GraphEdge> = Vec::new();

        for file in &files {
            let doc = vault.read_document(vault_id, &file.path)?;
            let label = doc
                .title
                .clone()
                .unwrap_or_else(|| file.name.trim_end_matches(".md").to_string());
            nodes_map.entry(file.path.clone()).or_insert(GraphNode {
                id: file.path.clone(),
                label,
                val: 1.0,
                x: None,
                y: None,
                cluster: cluster_for_path(&file.path),
                missing: false,
            });

            for link in VaultResolver::parse_wikilinks(&doc.content) {
                let target = normalize_link(&link);
                if !nodes_map.contains_key(&target) {
                    nodes_map.insert(
                        target.clone(),
                        GraphNode {
                            id: target.clone(),
                            label: PathBuf::from(&target)
                                .file_stem()
                                .map(|s| s.to_string_lossy().to_string())
                                .unwrap_or(target.clone()),
                            val: 0.5,
                            x: None,
                            y: None,
                            cluster: cluster_for_path(&target),
                            missing: true,
                        },
                    );
                }
                edges.push(GraphEdge {
                    source: file.path.clone(),
                    target,
                });
            }
        }

        let nodes: Vec<GraphNode> = nodes_map.into_values().collect();
        Ok(GraphSnapshot {
            nodes,
            edges,
            frame: 0,
        })
    }

    pub fn layout(
        &self,
        snapshot: &GraphSnapshot,
        options: &LayoutOptions,
    ) -> Result<GraphSnapshot> {
        let n = snapshot.nodes.len();
        if n == 0 {
            return Ok(snapshot.clone());
        }

        let id_to_index: HashMap<String, usize> = snapshot
            .nodes
            .iter()
            .enumerate()
            .map(|(i, node)| (node.id.clone(), i))
            .collect();

        let edges_pairs: Vec<(usize, usize)> = snapshot
            .edges
            .iter()
            .filter_map(|e| {
                let s = id_to_index.get(&e.source)?;
                let t = id_to_index.get(&e.target)?;
                Some((*s, *t))
            })
            .collect();

        let mut positions = seeded_positions(n, options.seed);
        force_atlas2_layout(
            &mut positions,
            &edges_pairs,
            options.iterations as usize,
            options.gravity,
            options.scaling_ratio,
        );

        let mut nodes = snapshot.nodes.clone();
        for (node, (x, y)) in nodes.iter_mut().zip(positions.iter()) {
            node.x = Some(*x as f64);
            node.y = Some(*y as f64);
        }

        Ok(GraphSnapshot {
            nodes,
            edges: snapshot.edges.clone(),
            frame: snapshot.frame + 1,
        })
    }

    pub fn filter_snapshot(
        &self,
        snapshot: &GraphSnapshot,
        cluster: Option<&str>,
        query: Option<&str>,
    ) -> GraphSnapshot {
        let allowed: HashSet<String> = snapshot
            .nodes
            .iter()
            .filter(|n| {
                let cluster_ok = cluster.map(|c| n.cluster.as_deref() == Some(c)).unwrap_or(true);
                let query_ok = query
                    .map(|q| {
                        n.label.to_lowercase().contains(&q.to_lowercase())
                            || n.id.to_lowercase().contains(&q.to_lowercase())
                    })
                    .unwrap_or(true);
                cluster_ok && query_ok
            })
            .map(|n| n.id.clone())
            .collect();

        let nodes: Vec<GraphNode> = snapshot
            .nodes
            .iter()
            .filter(|n| allowed.contains(&n.id))
            .cloned()
            .collect();
        let edges: Vec<GraphEdge> = snapshot
            .edges
            .iter()
            .filter(|e| allowed.contains(&e.source) && allowed.contains(&e.target))
            .cloned()
            .collect();

        GraphSnapshot {
            nodes,
            edges,
            frame: snapshot.frame,
        }
    }
}

/// Deterministic ForceAtlas2-style layout (repulsion + attraction), stable Rust.
fn force_atlas2_layout(
    positions: &mut [(f32, f32)],
    edges: &[(usize, usize)],
    iterations: usize,
    gravity: f64,
    scaling_ratio: f64,
) {
    let n = positions.len();
    if n == 0 {
        return;
    }
    let k = (scaling_ratio / (n as f64 + 1.0)).sqrt() as f32;

    for _ in 0..iterations {
        let mut disp = vec![(0f32, 0f32); n];

        for i in 0..n {
            for j in (i + 1)..n {
                let dx = positions[i].0 - positions[j].0;
                let dy = positions[i].1 - positions[j].1;
                let dist = (dx * dx + dy * dy).sqrt().max(0.01);
                let repulse = (k * k) / dist;
                let fx = (dx / dist) * repulse;
                let fy = (dy / dist) * repulse;
                disp[i].0 += fx;
                disp[i].1 += fy;
                disp[j].0 -= fx;
                disp[j].1 -= fy;
            }
        }

        for &(s, t) in edges {
            let dx = positions[t].0 - positions[s].0;
            let dy = positions[t].1 - positions[s].1;
            let dist = (dx * dx + dy * dy).sqrt().max(0.01);
            let attract = dist * dist / k;
            let fx = (dx / dist) * attract;
            let fy = (dy / dist) * attract;
            disp[s].0 += fx;
            disp[s].1 += fy;
            disp[t].0 -= fx;
            disp[t].1 -= fy;
        }

        let g = gravity as f32 * 0.01;
        for i in 0..n {
            disp[i].0 -= positions[i].0 * g;
            disp[i].1 -= positions[i].1 * g;
            positions[i].0 += disp[i].0.clamp(-1.0, 1.0) * 0.1;
            positions[i].1 += disp[i].1.clamp(-1.0, 1.0) * 0.1;
        }
    }
}

fn cluster_for_path(path: &str) -> Option<String> {
    path.split('/').next().map(|s| s.to_string())
}

fn normalize_link(link: &str) -> String {
    let trimmed = link.trim();
    if trimmed.ends_with(".md") {
        trimmed.to_string()
    } else {
        format!("{trimmed}.md")
    }
}

fn seeded_positions(n: usize, seed: u64) -> Vec<(f32, f32)> {
    let mut state = seed;
    (0..n)
        .map(|_| {
            state = state.wrapping_mul(6364136223846793005).wrapping_add(1);
            let x = ((state >> 32) as f32 / u32::MAX as f32) * 2.0 - 1.0;
            state = state.wrapping_mul(6364136223846793005).wrapping_add(1);
            let y = ((state >> 32) as f32 / u32::MAX as f32) * 2.0 - 1.0;
            (x, y)
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::vault::VaultResolver;
    use tempfile::tempdir;

    #[test]
    fn layout_is_deterministic() {
        let snapshot = GraphSnapshot {
            nodes: vec![
                GraphNode {
                    id: "a.md".into(),
                    label: "A".into(),
                    val: 1.0,
                    x: None,
                    y: None,
                    cluster: None,
                    missing: false,
                },
                GraphNode {
                    id: "b.md".into(),
                    label: "B".into(),
                    val: 1.0,
                    x: None,
                    y: None,
                    cluster: None,
                    missing: false,
                },
            ],
            edges: vec![GraphEdge {
                source: "a.md".into(),
                target: "b.md".into(),
            }],
            frame: 0,
        };
        let engine = GraphEngine::new(std::env::temp_dir());
        let opts = LayoutOptions::default();
        let l1 = engine.layout(&snapshot, &opts).unwrap();
        let l2 = engine.layout(&snapshot, &opts).unwrap();
        assert_eq!(l1.nodes[0].x, l2.nodes[0].x);
        assert_eq!(l1.nodes[0].y, l2.nodes[0].y);
    }

    #[test]
    fn wikilink_graph_includes_missing_nodes() {
        let dir = tempdir().unwrap();
        let resolver = VaultResolver::new(dir.path().to_path_buf());
        resolver.open_vault("g").unwrap();
        resolver
            .write_document(
                "g",
                "concepts/root.md",
                "# Root\n\nSee [[entities/missing]]",
                "init",
            )
            .unwrap();
        let engine = GraphEngine::new(dir.path().join("graph"));
        let snap = engine.snapshot(&resolver, "g").unwrap();
        assert!(snap.nodes.iter().any(|n| n.missing));
    }
}
