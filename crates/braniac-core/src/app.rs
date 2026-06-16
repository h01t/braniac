use std::path::PathBuf;

use braniac_types::{AppSettings, BootstrapResult};
use parking_lot::Mutex;

use crate::bootstrap::{discover_seed_candidates, ensure_vaults};
use crate::graph::GraphEngine;
use crate::index::IndexManager;
use crate::jobs::JobManager;
use crate::plugins::PluginRuntime;
use crate::settings::SettingsStore;
use crate::vault::VaultResolver;

pub struct AppState {
    pub data_dir: PathBuf,
    pub settings: SettingsStore,
    pub vaults: Mutex<VaultResolver>,
    pub index: IndexManager,
    pub graph: GraphEngine,
    pub jobs: JobManager,
    pub plugins: Mutex<PluginRuntime>,
}

impl AppState {
    pub fn new(data_dir: PathBuf) -> crate::error::Result<Self> {
        let settings = SettingsStore::new(&data_dir);
        let app_settings = settings.read()?;
        let vaults_root = settings.vaults_root(&app_settings)?;
        std::fs::create_dir_all(&vaults_root)?;
        let plugins_dir = data_dir.join("plugins");
        std::fs::create_dir_all(&plugins_dir)?;

        Ok(Self {
            data_dir: data_dir.clone(),
            settings,
            vaults: Mutex::new(VaultResolver::new(vaults_root)),
            index: IndexManager::new(data_dir.join("index"))?,
            graph: GraphEngine::new(data_dir.join("graph")),
            jobs: JobManager::default(),
            plugins: Mutex::new(PluginRuntime::new(plugins_dir)),
        })
    }

    pub fn reload_vaults_root(&self) -> crate::error::Result<()> {
        let app_settings = self.settings.read()?;
        let vaults_root = self.settings.vaults_root(&app_settings)?;
        std::fs::create_dir_all(&vaults_root)?;
        *self.vaults.lock() = VaultResolver::new(vaults_root);
        Ok(())
    }

    pub fn bootstrap(&self, extra_seeds: &[PathBuf]) -> crate::error::Result<BootstrapResult> {
        self.reload_vaults_root()?;
        let seeds = discover_seed_candidates(extra_seeds);
        let result = ensure_vaults(&self.settings, &self.vaults.lock(), &seeds)?;
        self.reload_vaults_root()?;
        Ok(result)
    }

    pub fn settings_snapshot(&self) -> crate::error::Result<AppSettings> {
        self.settings.read()
    }

    pub fn vaults_root_path(&self) -> crate::error::Result<PathBuf> {
        let settings = self.settings.read()?;
        self.settings.vaults_root(&settings)
    }
}

pub type SharedAppState = std::sync::Arc<AppState>;
