use std::process::Command;
use std::sync::Arc;
use std::time::Instant;

use braniac_core::graph::GraphEngine;
use braniac_core::index::IndexManager;
use braniac_core::qmd::{qmd_bin, ProcessQmdClient};
use braniac_core::vault::VaultResolver;
use braniac_types::{LayoutOptions, SearchQuery};

fn qmd_available() -> bool {
    Command::new(qmd_bin())
        .arg("--version")
        .output()
        .map(|o| o.status.success())
        .unwrap_or(false)
}

fn seed_vault(resolver: &VaultResolver, count: usize) {
    for i in 0..count {
        let path = format!("concepts/doc-{i}.md");
        let body = format!(
            "# Doc {i}\n\nContent about topic {i} [[concepts/doc-{}]]",
            (i + 1) % count.max(1)
        );
        resolver
            .write_document("bench", &path, &body, "seed")
            .expect("write");
    }
}

fn bench_index_status(resolver: &VaultResolver, index: &IndexManager, label: &str, docs: usize) {
    let start = Instant::now();
    let _ = index.status_for_vault(resolver, "bench").expect("status");
    println!("status_for_vault_{label}_docs={docs} ms={}", start.elapsed().as_millis());
}

fn bench_graph_layout(graph: &GraphEngine, resolver: &VaultResolver, nodes: usize) {
    let snapshot = graph.snapshot(resolver, "bench").expect("snapshot");
    let start = Instant::now();
    let _ = graph
        .layout(&snapshot, &LayoutOptions::default())
        .expect("layout");
    println!(
        "graph_layout_nodes={nodes} elapsed_ms={}",
        start.elapsed().as_millis()
    );
}

fn main() {
    let dir = tempfile::tempdir().expect("tempdir");
    let vault_root = dir.path().join("vaults");
    let data_dir = dir.path().join("data");
    let resolver = VaultResolver::new(vault_root.clone());
    resolver.open_vault("bench").expect("open vault");

    seed_vault(&resolver, 1000);

    let qmd = Arc::new(ProcessQmdClient);
    let index = IndexManager::new(data_dir.join("index"), qmd).expect("index");

    for &count in &[1000, 5000, 10_000] {
        if count > 1000 {
            seed_vault(&resolver, count - 1000);
        }
        bench_index_status(&resolver, &index, &format!("{count}"), count);
    }

    if qmd_available() {
        let start = Instant::now();
        index.rebuild(&resolver, "bench").expect("rebuild");
        println!("cold_index_build_ms={}", start.elapsed().as_millis());

        let query = SearchQuery {
            text: "topic 42".into(),
            limit: Some(5),
            fuzzy: None,
            field: None,
        };

        let start = Instant::now();
        let _ = index.search(&resolver, "bench", &query).expect("search");
        println!("search_latency_ms={}", start.elapsed().as_millis());

        let start = Instant::now();
        let _ = index.search(&resolver, "bench", &query).expect("warm search");
        println!("warm_search_latency_ms={}", start.elapsed().as_millis());
    } else {
        eprintln!("skip: qmd not installed ({})", qmd_bin());
    }

    let graph = GraphEngine::new(data_dir.join("graph"));
    for &target in &[500, 1000, 1500] {
        if target > 1000 {
            seed_vault(&resolver, target - 1000);
        }
        bench_graph_layout(&graph, &resolver, target);
    }
}
