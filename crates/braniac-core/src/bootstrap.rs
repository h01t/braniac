use std::path::{Path, PathBuf};

use braniac_types::BootstrapResult;

use crate::error::Result;
use crate::settings::SettingsStore;
use crate::vault::VaultResolver;

const WELCOME_DOC: &str = r#"# Welcome to Braniac

**Summary**
Your local knowledge vault is ready.

**Source Context**
Created automatically on first launch.

## Related pages
- [[concepts/index.md]]
"#;

/// Ensure at least one vault exists. Prefers pointing settings at a discovered seed folder.
pub fn ensure_vaults(
    settings: &SettingsStore,
    resolver: &VaultResolver,
    seed_candidates: &[PathBuf],
) -> Result<BootstrapResult> {
    let vaults_root = resolver.vaults_root().to_path_buf();
    let existing = resolver.list_vaults()?;
    if !existing.is_empty() {
        return Ok(BootstrapResult {
            vault_ids: existing.into_iter().map(|v| v.id).collect(),
            imported: Vec::new(),
            created_welcome_vault: false,
            vaults_root: vaults_root.to_string_lossy().to_string(),
            message: "Vaults already configured".into(),
        });
    }

    for seed in seed_candidates {
        if is_vaults_container(seed) {
            let mut app_settings = settings.read()?;
            app_settings.vaults_root = Some(seed.to_string_lossy().to_string());
            settings.write(&app_settings)?;
            return Ok(BootstrapResult {
                vault_ids: list_vault_ids(seed)?,
                imported: Vec::new(),
                created_welcome_vault: false,
                vaults_root: seed.to_string_lossy().to_string(),
                message: format!("Using vaults at {}", seed.display()),
            });
        }
    }

    for seed in seed_candidates {
        if seed.exists() {
            let imported = crate::migrate::import_legacy_vaults(seed, resolver)?;
            if !imported.is_empty() {
                let vault_ids = resolver.list_vaults()?.into_iter().map(|v| v.id).collect();
                return Ok(BootstrapResult {
                    vault_ids,
                    imported,
                    created_welcome_vault: false,
                    vaults_root: vaults_root.to_string_lossy().to_string(),
                    message: "Imported demo vaults into app storage".into(),
                });
            }
        }
    }

    resolver.open_vault("default")?;
    resolver.write_document(
        "default",
        "concepts/welcome.md",
        WELCOME_DOC,
        "Create welcome document",
    )?;
    resolver.write_document(
        "default",
        "concepts/index.md",
        "# Index\n\n- [[concepts/welcome.md]]\n",
        "Create index",
    )?;

    Ok(BootstrapResult {
        vault_ids: vec!["default".into()],
        imported: Vec::new(),
        created_welcome_vault: true,
        vaults_root: vaults_root.to_string_lossy().to_string(),
        message: "Created a new default vault with a welcome note".into(),
    })
}

pub fn discover_seed_candidates(extra: &[PathBuf]) -> Vec<PathBuf> {
    let mut candidates = Vec::new();

    if let Ok(env_path) = std::env::var("BRANIAC_VAULTS_SOURCE") {
        candidates.push(PathBuf::from(env_path));
    }

    candidates.extend(extra.iter().cloned());

    // Dev: repo vaults next to the workspace (braniac-core -> ../../vaults)
    let repo_from_core = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(|p| p.parent())
        .map(|p| p.join("vaults"));
    if let Some(path) = repo_from_core {
        candidates.push(path);
    }

    // Dev: when cwd is apps/desktop during `tauri dev`
    if let Ok(cwd) = std::env::current_dir() {
        candidates.push(cwd.join("../../vaults"));
        candidates.push(cwd.join("../../../vaults"));
    }

    candidates
        .into_iter()
        .filter(|p| !p.as_os_str().is_empty())
        .collect()
}

fn is_vaults_container(path: &Path) -> bool {
    if !path.is_dir() {
        return false;
    }
    ["default", "test", "deepblue"]
        .iter()
        .any(|name| path.join(name).is_dir())
        || std::fs::read_dir(path)
            .ok()
            .into_iter()
            .flatten()
            .filter_map(|e| e.ok())
            .any(|e| e.path().join("concepts").is_dir())
}

fn list_vault_ids(root: &Path) -> Result<Vec<String>> {
    let resolver = VaultResolver::new(root.to_path_buf());
    Ok(resolver
        .list_vaults()?
        .into_iter()
        .map(|v| v.id)
        .collect())
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn creates_welcome_vault_when_no_seed() {
        let dir = tempdir().unwrap();
        let data = dir.path().join("data");
        let settings = SettingsStore::new(&data);
        let vaults = VaultResolver::new(dir.path().join("vaults"));
        let result = ensure_vaults(&settings, &vaults, &[]).unwrap();
        assert!(result.created_welcome_vault);
        assert!(vaults.list_vaults().unwrap().iter().any(|v| v.id == "default"));
    }
}
