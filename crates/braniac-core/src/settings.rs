use std::path::{Path, PathBuf};

use braniac_types::AppSettings;
use serde::{Deserialize, Serialize};

use crate::error::{BraniacError, Result};

const SETTINGS_FILE: &str = "settings.json";

#[derive(Debug, Clone, Serialize, Deserialize)]
struct SettingsFile {
    #[serde(flatten)]
    settings: AppSettings,
}

pub struct SettingsStore {
    data_dir: PathBuf,
}

impl SettingsStore {
    pub fn new(data_dir: impl AsRef<Path>) -> Self {
        Self {
            data_dir: data_dir.as_ref().to_path_buf(),
        }
    }

    fn settings_path(&self) -> PathBuf {
        self.data_dir.join(SETTINGS_FILE)
    }

    pub fn read(&self) -> Result<AppSettings> {
        let path = self.settings_path();
        if !path.exists() {
            return Ok(AppSettings::default());
        }
        let raw = std::fs::read_to_string(&path)?;
        let file: SettingsFile = serde_json::from_str(&raw)?;
        Ok(file.settings)
    }

    pub fn write(&self, settings: &AppSettings) -> Result<()> {
        std::fs::create_dir_all(&self.data_dir)?;
        let file = SettingsFile {
            settings: settings.clone(),
        };
        let raw = serde_json::to_string_pretty(&file)?;
        std::fs::write(self.settings_path(), raw)?;
        Ok(())
    }

    pub fn vaults_root(&self, settings: &AppSettings) -> Result<PathBuf> {
        if let Some(root) = &settings.vaults_root {
            let path = PathBuf::from(root);
            if !path.is_absolute() {
                return Err(BraniacError::Vault(
                    "vaults_root must be an absolute path".into(),
                ));
            }
            return Ok(path);
        }

        let data_dir = dirs::data_dir()
            .ok_or_else(|| BraniacError::Vault("cannot resolve data directory".into()))?
            .join("braniac")
            .join("vaults");
        Ok(data_dir)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use braniac_types::AiProvider;
    use tempfile::tempdir;

    #[test]
    fn settings_round_trip() {
        let dir = tempdir().unwrap();
        let store = SettingsStore::new(dir.path());

        let defaults = store.read().unwrap();
        assert_eq!(defaults.ingest_provider, AiProvider::Deepseek);
        assert_eq!(defaults.theme, braniac_types::ThemePreference::Dark);

        let updated = AppSettings {
            ingest_model: "custom-model".into(),
            ..AppSettings::default()
        };
        store.write(&updated).unwrap();

        let loaded = store.read().unwrap();
        assert_eq!(loaded.ingest_model, "custom-model");
    }
}
