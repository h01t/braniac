use std::collections::{HashMap, HashSet};
use std::path::{Path, PathBuf};
use std::sync::Arc;

use braniac_types::{IndexStatus, SearchQuery, SearchResult};
use chrono::Utc;
use parking_lot::Mutex;
use rusqlite::{params, Connection};

use crate::error::{BraniacError, Result};
use crate::qmd::{collection_name, QmdClient};
use crate::vault::VaultResolver;
use crate::vault_scan::{VaultDocumentScan, VaultRevision};

struct RebuildPrepared {
    vault_root: PathBuf,
    revision: VaultRevision,
    rows: Vec<(String, String, String, String)>,
}

pub struct IndexManager {
    db: Arc<Mutex<Connection>>,
    qmd: Arc<dyn QmdClient>,
    collection_cache: Mutex<HashMap<String, String>>,
}

impl IndexManager {
    pub fn new(data_dir: PathBuf, qmd: Arc<dyn QmdClient>) -> Result<Self> {
        std::fs::create_dir_all(&data_dir)?;
        let db_path = data_dir.join("metadata.db");
        let conn = Connection::open(&db_path)?;
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS documents (
                vault_id TEXT NOT NULL,
                path TEXT NOT NULL,
                title TEXT,
                content_hash TEXT NOT NULL,
                indexed_at TEXT,
                PRIMARY KEY (vault_id, path)
            );
            CREATE TABLE IF NOT EXISTS index_status (
                vault_id TEXT PRIMARY KEY,
                last_rebuild_at TEXT,
                embedding_model TEXT,
                head_hash TEXT,
                worktree_dirty INTEGER NOT NULL DEFAULT 0
            );
            CREATE TABLE IF NOT EXISTS qmd_collections (
                vault_id TEXT PRIMARY KEY,
                collection_name TEXT NOT NULL,
                vault_root TEXT NOT NULL,
                resolved_at TEXT
            );",
        )?;
        ensure_column(&conn, "index_status", "head_hash", "TEXT")?;
        ensure_column(&conn, "index_status", "worktree_dirty", "INTEGER NOT NULL DEFAULT 0")?;
        Ok(Self {
            db: Arc::new(Mutex::new(conn)),
            qmd,
            collection_cache: Mutex::new(HashMap::new()),
        })
    }

    pub fn status_for_vault(&self, vault: &VaultResolver, vault_id: &str) -> Result<IndexStatus> {
        let revision = vault.vault_revision(vault_id)?;
        let scans = vault.scan_documents(vault_id, false)?;
        self.status_with_scan(vault_id, &revision, &scans)
    }

    pub fn status_with_scan(
        &self,
        vault_id: &str,
        revision: &VaultRevision,
        scans: &[VaultDocumentScan],
    ) -> Result<IndexStatus> {
        let document_count = scans.len() as u64;
        let db = self.db.lock();

        let mut stored: HashMap<String, String> = HashMap::new();
        let mut stmt = db.prepare(
            "SELECT path, content_hash FROM documents WHERE vault_id = ?1",
        )?;
        let rows = stmt.query_map(params![vault_id], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
        })?;
        for row in rows {
            let (path, hash) = row?;
            stored.insert(path, hash);
        }

        let indexed_count = stored.len() as u64;
        let mut changed_count = 0u64;
        let mut missing_count = 0u64;

        for scan in scans {
            match stored.get(&scan.path) {
                Some(stored_hash) if stored_hash == &scan.content_hash => {}
                Some(_) => changed_count += 1,
                None => changed_count += 1,
            }
        }

        let scan_paths: HashSet<&str> = scans.iter().map(|s| s.path.as_str()).collect();
        for path in stored.keys() {
            if !scan_paths.contains(path.as_str()) {
                missing_count += 1;
            }
        }

        let stale = revision.worktree_dirty || changed_count > 0 || missing_count > 0;
        let stale_reason = if revision.worktree_dirty {
            Some("worktree_dirty".into())
        } else if missing_count > 0 && changed_count > 0 {
            Some(format!("{missing_count} deleted, {changed_count} changed"))
        } else if missing_count > 0 {
            Some(format!("{missing_count} deleted"))
        } else if changed_count > 0 {
            Some(format!("{changed_count} changed"))
        } else {
            None
        };

        let last_rebuild_at: Option<String> = db
            .query_row(
                "SELECT last_rebuild_at FROM index_status WHERE vault_id = ?1",
                params![vault_id],
                |row| row.get(0),
            )
            .ok();
        let embedding_model: Option<String> = db
            .query_row(
                "SELECT embedding_model FROM index_status WHERE vault_id = ?1",
                params![vault_id],
                |row| row.get(0),
            )
            .ok();

        Ok(IndexStatus {
            vault_id: vault_id.to_string(),
            document_count,
            indexed_count,
            stale,
            changed_count,
            missing_count,
            stale_reason,
            last_rebuild_at: last_rebuild_at.and_then(|s| s.parse().ok()),
            embedding_model,
        })
    }

    pub fn rebuild(&self, vault: &VaultResolver, vault_id: &str) -> Result<IndexStatus> {
        let prepared = self.prepare_rebuild(vault, vault_id)?;
        self.run_qmd_rebuild(vault_id, &prepared)?;
        self.finalize_rebuild(vault_id, &prepared)
    }

    pub fn rebuild_with_vaults(
        &self,
        vaults: &Mutex<VaultResolver>,
        vault_id: &str,
    ) -> Result<IndexStatus> {
        let prepared = {
            let vault = vaults.lock();
            self.prepare_rebuild(&vault, vault_id)?
        };
        self.run_qmd_rebuild(vault_id, &prepared)?;
        self.finalize_rebuild(vault_id, &prepared)
    }

    fn prepare_rebuild(&self, vault: &VaultResolver, vault_id: &str) -> Result<RebuildPrepared> {
        let vault_root = vault.resolve_vault_path(vault_id)?;
        let revision = vault.vault_revision(vault_id)?;
        let scans = vault.scan_documents(vault_id, false)?;
        let mut rows = Vec::with_capacity(scans.len());
        for scan in &scans {
            let name = Path::new(&scan.path)
                .file_name()
                .map(|s| s.to_string_lossy().to_string())
                .unwrap_or_else(|| scan.path.clone());
            rows.push((
                scan.path.clone(),
                name,
                scan.title.clone(),
                scan.content_hash.clone(),
            ));
        }
        Ok(RebuildPrepared {
            vault_root,
            revision,
            rows,
        })
    }

    fn run_qmd_rebuild(&self, vault_id: &str, prepared: &RebuildPrepared) -> Result<()> {
        if self.can_skip_qmd_rebuild(vault_id, prepared)? {
            return Ok(());
        }
        let collection = self.resolve_collection_cached(vault_id, &prepared.vault_root)?;
        self.qmd.update_collection(&collection)?;
        self.qmd.embed_collection(&collection)?;
        Ok(())
    }
    fn can_skip_qmd_rebuild(&self, vault_id: &str, prepared: &RebuildPrepared) -> Result<bool> {
        if prepared.revision.worktree_dirty {
            return Ok(false);
        }
        {
            let db = self.db.lock();
            let stored_head: Option<String> = db
                .query_row(
                    "SELECT head_hash FROM index_status WHERE vault_id = ?1",
                    params![vault_id],
                    |row| row.get(0),
                )
                .ok();
            let stored_dirty: bool = db
                .query_row(
                    "SELECT worktree_dirty FROM index_status WHERE vault_id = ?1",
                    params![vault_id],
                    |row| row.get::<_, i64>(0),
                )
                .map(|v| v != 0)
                .unwrap_or(true);
            if stored_dirty || stored_head.as_deref() != Some(prepared.revision.head_hash.as_str()) {
                return Ok(false);
            }

            let mut stmt = db.prepare(
                "SELECT path, content_hash FROM documents WHERE vault_id = ?1",
            )?;
            let rows = stmt.query_map(params![vault_id], |row| {
                Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
            })?;
            let mut stored: HashMap<String, String> = HashMap::new();
            for row in rows {
                let (path, hash) = row?;
                stored.insert(path, hash);
            }
            if stored.len() != prepared.rows.len() {
                return Ok(false);
            }
            for (path, _name, _title, hash) in &prepared.rows {
                if stored.get(path) != Some(hash) {
                    return Ok(false);
                }
            }
        }

        // Collection lookup must run after releasing db lock — get_cached_collection
        // calls load_collection_from_db which acquires db.lock() again.
        let collection = self
            .get_cached_collection(vault_id)
            .or_else(|| self.load_collection_from_db(vault_id))
            .unwrap_or_else(|| collection_name(vault_id));
        Ok(self.qmd.collection_exists(&collection))
    }

    fn finalize_rebuild(
        &self,
        vault_id: &str,
        prepared: &RebuildPrepared,
    ) -> Result<IndexStatus> {
        {
            let db = self.db.lock();
            db.execute(
                "DELETE FROM documents WHERE vault_id = ?1",
                params![vault_id],
            )?;
            for (path, _name, title, hash) in &prepared.rows {
                db.execute(
                    "INSERT OR REPLACE INTO documents (vault_id, path, title, content_hash, indexed_at)
                     VALUES (?1, ?2, ?3, ?4, ?5)",
                    params![vault_id, path, title, hash, Utc::now().to_rfc3339()],
                )?;
            }
            db.execute(
                "INSERT OR REPLACE INTO index_status (vault_id, last_rebuild_at, embedding_model, head_hash, worktree_dirty)
                 VALUES (?1, ?2, ?3, ?4, ?5)",
                params![
                    vault_id,
                    Utc::now().to_rfc3339(),
                    "qmd",
                    prepared.revision.head_hash,
                    if prepared.revision.worktree_dirty {
                        1
                    } else {
                        0
                    },
                ],
            )?;
        }

        let scans: Vec<VaultDocumentScan> = prepared
            .rows
            .iter()
            .map(|(path, _name, title, hash)| VaultDocumentScan {
                path: path.clone(),
                title: title.clone(),
                content_hash: hash.clone(),
                content: None,
            })
            .collect();
        self.status_with_scan(vault_id, &prepared.revision, &scans)
    }

    pub fn search(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        query: &SearchQuery,
    ) -> Result<Vec<SearchResult>> {
        let limit = query.limit.unwrap_or(5);
        let vault_root = vault.resolve_vault_path(vault_id)?;
        let collection = self.resolve_collection_cached(vault_id, &vault_root)?;
        match self.qmd.query(&collection, &query.text, limit) {
            Ok(results) => Ok(results),
            Err(BraniacError::Search(msg)) if is_collection_not_found(&msg) => {
                self.invalidate_collection_cache(vault_id);
                let collection = self.resolve_collection_cached(vault_id, &vault_root)?;
                self.qmd.query(&collection, &query.text, limit)
            }
            Err(e) => Err(e),
        }
    }

    pub fn search_with_vaults(
        &self,
        vaults: &Mutex<VaultResolver>,
        vault_id: &str,
        query: &SearchQuery,
    ) -> Result<Vec<SearchResult>> {
        let vault_root = {
            let vault = vaults.lock();
            vault.resolve_vault_path(vault_id)?
        };
        let limit = query.limit.unwrap_or(5);
        let collection = self.resolve_collection_cached(vault_id, &vault_root)?;
        match self.qmd.query(&collection, &query.text, limit) {
            Ok(results) => Ok(results),
            Err(BraniacError::Search(msg)) if is_collection_not_found(&msg) => {
                self.invalidate_collection_cache(vault_id);
                let collection = self.resolve_collection_cached(vault_id, &vault_root)?;
                self.qmd.query(&collection, &query.text, limit)
            }
            Err(e) => Err(e),
        }
    }

    fn resolve_collection_cached(&self, vault_id: &str, vault_root: &Path) -> Result<String> {
        let root_key = vault_root.to_string_lossy().to_string();
        if let Some(name) = self.get_cached_collection(vault_id) {
            if let Ok(db_root) = self.load_vault_root_from_db(vault_id) {
                if db_root == root_key {
                    return Ok(name);
                }
            }
        }
        let name = self.qmd.resolve_collection(vault_root, vault_id)?;
        self.store_collection_cache(vault_id, &name, &root_key);
        Ok(name)
    }

    fn get_cached_collection(&self, vault_id: &str) -> Option<String> {
        self.collection_cache
            .lock()
            .get(vault_id)
            .cloned()
            .or_else(|| self.load_collection_from_db(vault_id))
    }

    fn store_collection_cache(&self, vault_id: &str, collection: &str, vault_root: &str) {
        self.collection_cache
            .lock()
            .insert(vault_id.to_string(), collection.to_string());
        let db = self.db.lock();
        let _ = db.execute(
            "INSERT OR REPLACE INTO qmd_collections (vault_id, collection_name, vault_root, resolved_at)
             VALUES (?1, ?2, ?3, ?4)",
            params![vault_id, collection, vault_root, Utc::now().to_rfc3339()],
        );
    }

    fn load_collection_from_db(&self, vault_id: &str) -> Option<String> {
        let db = self.db.lock();
        db.query_row(
            "SELECT collection_name FROM qmd_collections WHERE vault_id = ?1",
            params![vault_id],
            |row| row.get(0),
        )
        .ok()
    }

    fn load_vault_root_from_db(&self, vault_id: &str) -> Result<String> {
        let db = self.db.lock();
        db.query_row(
            "SELECT vault_root FROM qmd_collections WHERE vault_id = ?1",
            params![vault_id],
            |row| row.get(0),
        )
        .map_err(BraniacError::from)
    }

    fn invalidate_collection_cache(&self, vault_id: &str) {
        self.collection_cache.lock().remove(vault_id);
        let db = self.db.lock();
        let _ = db.execute(
            "DELETE FROM qmd_collections WHERE vault_id = ?1",
            params![vault_id],
        );
    }
}

fn ensure_column(conn: &Connection, table: &str, column: &str, column_type: &str) -> Result<()> {
    let mut stmt = conn.prepare(&format!("PRAGMA table_info({table})"))?;
    let names: Vec<String> = stmt
        .query_map([], |row| row.get(1))?
        .collect::<std::result::Result<Vec<_>, _>>()?;
    if !names.iter().any(|n| n == column) {
        conn.execute(
            &format!("ALTER TABLE {table} ADD COLUMN {column} {column_type}"),
            [],
        )?;
    }
    Ok(())
}

fn is_collection_not_found(msg: &str) -> bool {
    let lower = msg.to_lowercase();
    lower.contains("collection") && (lower.contains("not found") || lower.contains("unknown"))
}

pub use crate::vault_scan::content_hash;

#[cfg(test)]
mod tests {
    use std::sync::atomic::{AtomicUsize, Ordering};
    use std::sync::Arc;

    use super::*;
    use crate::vault::VaultResolver;
    use parking_lot::Mutex;
    use tempfile::tempdir;

    struct MockQmdClient {
        resolve_calls: AtomicUsize,
        query_calls: AtomicUsize,
    }

    impl MockQmdClient {
        fn new() -> Arc<Self> {
            Arc::new(Self {
                resolve_calls: AtomicUsize::new(0),
                query_calls: AtomicUsize::new(0),
            })
        }
    }

    impl QmdClient for MockQmdClient {
        fn resolve_collection(&self, _vault_root: &Path, vault_id: &str) -> Result<String> {
            self.resolve_calls.fetch_add(1, Ordering::SeqCst);
            Ok(format!("braniac-{vault_id}"))
        }

        fn update_collection(&self, _collection: &str) -> Result<()> {
            Ok(())
        }

        fn embed_collection(&self, _collection: &str) -> Result<()> {
            Ok(())
        }

        fn query(&self, _collection: &str, _text: &str, _limit: u32) -> Result<Vec<SearchResult>> {
            self.query_calls.fetch_add(1, Ordering::SeqCst);
            Ok(Vec::new())
        }

        fn collection_exists(&self, _collection: &str) -> bool {
            true
        }
    }

    #[test]
    fn content_hash_is_deterministic() {
        assert_eq!(content_hash("hello"), content_hash("hello"));
        assert_ne!(content_hash("hello"), content_hash("world"));
    }

    #[test]
    fn search_uses_cached_collection_after_warmup() {
        let dir = tempdir().unwrap();
        let qmd = MockQmdClient::new();
        let index = IndexManager::new(dir.path().join("index"), qmd.clone()).unwrap();
        let vault = Mutex::new(VaultResolver::new(dir.path().join("vaults")));
        vault.lock().open_vault("bench").unwrap();
        vault
            .lock()
            .write_document("bench", "concepts/a.md", "# A\n", "init")
            .unwrap();

        let query = SearchQuery {
            text: "topic".into(),
            limit: Some(5),
            fuzzy: None,
            field: None,
        };
        index
            .search_with_vaults(&vault, "bench", &query)
            .unwrap();
        index
            .search_with_vaults(&vault, "bench", &query)
            .unwrap();

        assert_eq!(qmd.resolve_calls.load(Ordering::SeqCst), 1);
        assert_eq!(qmd.query_calls.load(Ordering::SeqCst), 2);
    }

    #[test]
    fn deleted_path_count_uses_hash_set() {
        use crate::vault_scan::{content_hash, VaultDocumentScan, VaultRevision};

        let dir = tempdir().unwrap();
        let qmd = MockQmdClient::new();
        let index = IndexManager::new(dir.path().join("index"), qmd).unwrap();
        let vault_id = "v";
        let revision = VaultRevision {
            head_hash: "abc".into(),
            worktree_dirty: false,
        };
        let scans = vec![
            VaultDocumentScan {
                path: "concepts/a.md".into(),
                title: "A".into(),
                content_hash: content_hash("# A"),
                content: None,
            },
            VaultDocumentScan {
                path: "concepts/b.md".into(),
                title: "B".into(),
                content_hash: content_hash("# B"),
                content: None,
            },
        ];

        {
            let db = index.db.lock();
            db.execute(
                "INSERT INTO documents (vault_id, path, title, content_hash) VALUES (?1, ?2, ?3, ?4)",
                params![vault_id, "concepts/a.md", "A", content_hash("# A")],
            )
            .unwrap();
            db.execute(
                "INSERT INTO documents (vault_id, path, title, content_hash) VALUES (?1, ?2, ?3, ?4)",
                params![vault_id, "concepts/b.md", "B", content_hash("# B")],
            )
            .unwrap();
            db.execute(
                "INSERT INTO documents (vault_id, path, title, content_hash) VALUES (?1, ?2, ?3, ?4)",
                params![vault_id, "concepts/c.md", "C", content_hash("# C")],
            )
            .unwrap();
        }

        let status = index
            .status_with_scan(vault_id, &revision, &scans)
            .unwrap();
        assert_eq!(status.missing_count, 1);
    }

    #[test]
    fn dirty_worktree_marks_index_stale() {
        let dir = tempdir().unwrap();
        let qmd = MockQmdClient::new();
        let index = IndexManager::new(dir.path().join("index"), qmd).unwrap();
        let vault = VaultResolver::new(dir.path().join("vaults"));
        vault.open_vault("v").unwrap();
        vault
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();
        index.rebuild(&vault, "v").unwrap();

        let status = index.status_for_vault(&vault, "v").unwrap();
        assert!(!status.stale);

        let vault_path = vault.resolve_vault_path("v").unwrap();
        let doc_path = vault_path.join("concepts/a.md");
        let mut content = std::fs::read_to_string(&doc_path).unwrap();
        content.push_str("\nuncommitted edit\n");
        std::fs::write(&doc_path, content).unwrap();

        let status = index.status_for_vault(&vault, "v").unwrap();
        assert!(status.stale);
        assert_eq!(status.stale_reason.as_deref(), Some("worktree_dirty"));
    }

    #[test]
    fn rebuild_skip_check_does_not_deadlock_when_index_is_current() {
        let dir = tempdir().unwrap();
        let qmd = MockQmdClient::new();
        let index = IndexManager::new(dir.path().join("index"), qmd).unwrap();
        let vault = VaultResolver::new(dir.path().join("vaults"));
        vault.open_vault("v").unwrap();
        vault
            .write_document("v", "concepts/a.md", "# A\n", "init")
            .unwrap();
        index.rebuild(&vault, "v").unwrap();
        index.rebuild(&vault, "v").unwrap();
    }
}
