import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import Linter from '@/components/Linter';
import FileTree from '@/components/FileTree';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: 'AI Knowledge Compiler',
  description: 'A tool to compile and manage knowledge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Compiler
            </div>
            <nav className={styles.nav}>
              <a href="/" className={styles.navLink}>Main / Graph</a>
              <a href="/evalops" className={styles.navLink}>EvalOps (Diffs)</a>
            </nav>
            <div className={styles.sidebarContent} style={{display: 'flex', flexDirection: 'column'}}>
              <SearchBar />
              <div style={{color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 'bold'}}>VAULT: default</div>
              <FileTree vaultId="default" />
              <div style={{ marginTop: '16px' }}>
                <Linter vaultId="default" />
              </div>
            </div>
          </aside>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
