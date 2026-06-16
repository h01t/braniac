use std::path::Path;

use crate::error::Result;
use crate::vault::VaultResolver;

/// Import legacy vaults from a source directory (e.g. repo `vaults/`).
pub fn import_legacy_vaults(source_root: &Path, resolver: &VaultResolver) -> Result<Vec<String>> {
    let mut imported = Vec::new();
    if !source_root.exists() {
        return Ok(imported);
    }
    for entry in std::fs::read_dir(source_root)? {
        let entry = entry?;
        if !entry.file_type()?.is_dir() {
            continue;
        }
        let vault_id = entry.file_name().to_string_lossy().to_string();
        if vault_id.starts_with('.') {
            continue;
        }
        let dest_exists = resolver.resolve_vault_path(&vault_id)?.exists();
        if dest_exists {
            continue;
        }
        resolver.import_vault_from(&entry.path(), &vault_id)?;
        imported.push(vault_id);
    }
    Ok(imported)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::vault::VaultResolver;
    use tempfile::tempdir;

    #[test]
    fn imports_default_test_deepblue_layout() {
        let repo_vaults = Path::new(env!("CARGO_MANIFEST_DIR"))
            .parent()
            .unwrap()
            .parent()
            .unwrap()
            .join("vaults");
        if !repo_vaults.exists() {
            return;
        }
        let dir = tempdir().unwrap();
        let resolver = VaultResolver::new(dir.path().join("vaults"));
        let imported = import_legacy_vaults(&repo_vaults, &resolver).unwrap();
        for name in ["default", "test", "deepblue"] {
            if repo_vaults.join(name).exists() {
                assert!(imported.contains(&name.to_string()) || resolver.resolve_vault_path(name).unwrap().exists());
            }
        }
    }
}
