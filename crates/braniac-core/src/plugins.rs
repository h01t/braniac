use std::collections::{HashMap, HashSet};
use std::path::{Path, PathBuf};

use braniac_types::{PluginManifest, PluginPermission};
use serde::Deserialize;

use crate::error::{BraniacError, Result};
use crate::vault::ensure_within_parent;

#[derive(Debug, Deserialize)]
struct RawPluginManifest {
    id: String,
    name: String,
    version: String,
    entry: String,
    permissions: Vec<String>,
}

pub struct PluginRuntime {
    plugins_dir: PathBuf,
    enabled: HashMap<String, PluginManifest>,
    granted: HashMap<String, HashSet<PluginPermission>>,
}

impl PluginRuntime {
    pub fn new(plugins_dir: PathBuf) -> Self {
        Self {
            plugins_dir,
            enabled: HashMap::new(),
            granted: HashMap::new(),
        }
    }

    pub fn install(&self, source_dir: &Path) -> Result<PluginManifest> {
        let manifest_path = source_dir.join("manifest.json");
        let raw = std::fs::read_to_string(&manifest_path)
            .map_err(|_| BraniacError::Plugin("manifest.json not found".into()))?;
        let manifest = parse_manifest(&raw)?;
        let dest = resolve_plugin_dir(&self.plugins_dir, &manifest.id)?;
        if dest.exists() {
            std::fs::remove_dir_all(&dest)?;
        }
        copy_dir_all(source_dir, &dest)?;
        Ok(manifest)
    }

    pub fn enable(&mut self, plugin_id: &str, granted_permissions: Vec<PluginPermission>) -> Result<PluginManifest> {
        validate_plugin_id(plugin_id)?;
        let plugin_root = resolve_plugin_dir(&self.plugins_dir, plugin_id)?;
        let manifest_path = plugin_root.join("manifest.json");
        let raw = std::fs::read_to_string(&manifest_path)
            .map_err(|_| BraniacError::NotFound(plugin_id.into()))?;
        let manifest = parse_manifest(&raw)?;
        for required in &manifest.permissions {
            if !granted_permissions.contains(required) {
                return Err(BraniacError::Plugin(format!(
                    "missing permission: {:?}",
                    required
                )));
            }
        }
        self.granted
            .insert(plugin_id.to_string(), granted_permissions.into_iter().collect());
        self.enabled.insert(plugin_id.to_string(), manifest.clone());
        Ok(manifest)
    }

    pub fn check_permission(&self, plugin_id: &str, permission: &PluginPermission) -> Result<()> {
        let granted = self
            .granted
            .get(plugin_id)
            .ok_or_else(|| BraniacError::Plugin("plugin not enabled".into()))?;
        if granted.contains(permission) {
            Ok(())
        } else {
            Err(BraniacError::Plugin(format!(
                "permission denied: {:?}",
                permission
            )))
        }
    }

    pub fn list_installed(&self) -> Result<Vec<PluginManifest>> {
        if !self.plugins_dir.exists() {
            return Ok(Vec::new());
        }
        let mut manifests = Vec::new();
        for entry in std::fs::read_dir(&self.plugins_dir)? {
            let entry = entry?;
            if entry.file_type()?.is_dir() {
                let manifest_path = entry.path().join("manifest.json");
                if manifest_path.exists() {
                    let raw = std::fs::read_to_string(manifest_path)?;
                    manifests.push(parse_manifest(&raw)?);
                }
            }
        }
        Ok(manifests)
    }
}

pub fn validate_plugin_id(plugin_id: &str) -> Result<()> {
    if plugin_id.is_empty()
        || plugin_id.contains("..")
        || plugin_id.contains('/')
        || plugin_id.contains('\\')
        || plugin_id.starts_with('.')
        || plugin_id.starts_with('-')
        || plugin_id.starts_with('_')
    {
        return Err(BraniacError::PathTraversal(plugin_id.into()));
    }
    let mut chars = plugin_id.chars();
    let first = chars.next().unwrap();
    if !first.is_ascii_lowercase() && !first.is_ascii_digit() {
        return Err(BraniacError::PathTraversal(plugin_id.into()));
    }
    for ch in chars {
        if ch.is_ascii_lowercase() || ch.is_ascii_digit() {
            continue;
        }
        if ch == '-' || ch == '_' {
            continue;
        }
        return Err(BraniacError::PathTraversal(plugin_id.into()));
    }
    Ok(())
}

pub fn resolve_plugin_dir(plugins_dir: &Path, plugin_id: &str) -> Result<PathBuf> {
    validate_plugin_id(plugin_id)?;
    std::fs::create_dir_all(plugins_dir)?;
    let dest = plugins_dir.join(plugin_id);
    ensure_within_parent(plugins_dir, &dest)?;
    Ok(dest)
}

pub fn parse_manifest(raw: &str) -> Result<PluginManifest> {
    let raw_manifest: RawPluginManifest = serde_json::from_str(raw)?;
    validate_plugin_id(&raw_manifest.id)?;
    let permissions = raw_manifest
        .permissions
        .iter()
        .map(|p| parse_permission(p))
        .collect::<Result<Vec<_>>>()?;
    Ok(PluginManifest {
        id: raw_manifest.id,
        name: raw_manifest.name,
        version: raw_manifest.version,
        entry: raw_manifest.entry,
        permissions,
    })
}

fn parse_permission(s: &str) -> Result<PluginPermission> {
    match s {
        "vault:read" => Ok(PluginPermission::VaultRead),
        "vault:write" => Ok(PluginPermission::VaultWrite),
        "search:query" => Ok(PluginPermission::SearchQuery),
        "index:read" => Ok(PluginPermission::IndexRead),
        "graph:read" => Ok(PluginPermission::GraphRead),
        "ingest:run" => Ok(PluginPermission::IngestRun),
        "ai:request" => Ok(PluginPermission::AiRequest),
        "ui:panel" => Ok(PluginPermission::UiPanel),
        "commands:register" => Ok(PluginPermission::CommandsRegister),
        other => Err(BraniacError::Plugin(format!("unknown permission: {other}"))),
    }
}

fn copy_dir_all(src: &Path, dest: &Path) -> Result<()> {
    std::fs::create_dir_all(dest)?;
    for entry in std::fs::read_dir(src)? {
        let entry = entry?;
        let target = dest.join(entry.file_name());
        if entry.file_type()?.is_dir() {
            copy_dir_all(&entry.path(), &target)?;
        } else {
            std::fs::copy(entry.path(), target)?;
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn manifest_validation() {
        let raw = r#"{
            "id": "example",
            "name": "Example",
            "version": "0.1.0",
            "entry": "index.js",
            "permissions": ["vault:read", "commands:register"]
        }"#;
        let m = parse_manifest(raw).unwrap();
        assert_eq!(m.permissions.len(), 2);
    }

    #[test]
    fn plugin_id_validation_accepts_valid_slugs() {
        for id in ["example", "my-plugin", "plugin_v2", "a1"] {
            assert!(validate_plugin_id(id).is_ok(), "expected valid: {id}");
        }
    }

    #[test]
    fn plugin_id_validation_rejects_unsafe_ids() {
        for id in [
            "",
            "../escape",
            "/abs",
            "foo/bar",
            "..",
            ".hidden",
            "-leading",
            "_leading",
            "UPPER",
            "has space",
        ] {
            assert!(validate_plugin_id(id).is_err(), "expected invalid: {id:?}");
        }
    }

    #[test]
    fn install_replaces_existing_valid_plugin_directory() {
        let dir = tempdir().unwrap();
        let plugins_dir = dir.path().join("plugins");
        std::fs::create_dir_all(&plugins_dir).unwrap();
        let runtime = PluginRuntime::new(plugins_dir.clone());

        let v1 = dir.path().join("plugin-src-v1");
        std::fs::create_dir_all(&v1).unwrap();
        std::fs::write(
            v1.join("manifest.json"),
            r#"{"id":"example","name":"Ex","version":"0.1.0","entry":"index.js","permissions":[]}"#,
        )
        .unwrap();
        std::fs::write(v1.join("index.js"), "v1").unwrap();
        runtime.install(&v1).unwrap();

        let v2 = dir.path().join("plugin-src-v2");
        std::fs::create_dir_all(&v2).unwrap();
        std::fs::write(
            v2.join("manifest.json"),
            r#"{"id":"example","name":"Ex","version":"0.2.0","entry":"index.js","permissions":[]}"#,
        )
        .unwrap();
        std::fs::write(v2.join("index.js"), "v2").unwrap();
        runtime.install(&v2).unwrap();

        let installed = std::fs::read_to_string(plugins_dir.join("example/index.js")).unwrap();
        assert_eq!(installed, "v2");
    }

    #[test]
    fn install_rejects_traversal_manifest_id() {
        let dir = tempdir().unwrap();
        let plugin_dir = dir.path().join("bad");
        std::fs::create_dir_all(&plugin_dir).unwrap();
        std::fs::write(
            plugin_dir.join("manifest.json"),
            r#"{"id":"../escape","name":"Bad","version":"0.1.0","entry":"index.js","permissions":[]}"#,
        )
        .unwrap();
        let runtime = PluginRuntime::new(dir.path().join("plugins"));
        assert!(runtime.install(&plugin_dir).is_err());
    }

    #[test]
    fn permission_denied_without_grant() {
        let dir = tempdir().unwrap();
        let plugin_dir = dir.path().join("example");
        std::fs::create_dir_all(&plugin_dir).unwrap();
        std::fs::write(
            plugin_dir.join("manifest.json"),
            r#"{"id":"example","name":"Ex","version":"0.1.0","entry":"index.js","permissions":["vault:write"]}"#,
        )
        .unwrap();
        let runtime_dir = dir.path().join("plugins");
        let mut runtime = PluginRuntime::new(runtime_dir);
        runtime.install(&plugin_dir).unwrap();
        let err = runtime
            .enable("example", vec![PluginPermission::VaultRead])
            .unwrap_err();
        assert!(err.to_string().contains("missing permission"));
    }
}
