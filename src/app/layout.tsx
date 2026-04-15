'use client';

import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import Linter from '@/components/Linter';
import FileTree from '@/components/FileTree';
import SearchBar from '@/components/SearchBar';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';

const SIDEBAR_STORAGE_KEY = 'compiler-sidebar-width';
const DEFAULT_WIDTH = 260;

function SidebarResizer({ onResize }: { onResize: (w: number) => void }) {
  const [active, setActive] = useState(false);
  const startX = useRef(0);
  const startW = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startX.current = e.clientX;
    startW.current = parseInt(
      document.documentElement.style.getPropertyValue('--sidebar-width') || String(DEFAULT_WIDTH)
    );
    setActive(true);

    const onMouseMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX.current;
      const newW = Math.max(180, Math.min(480, startW.current + delta));
      onResize(newW);
    };

    const onMouseUp = () => {
      setActive(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [onResize]);

  return (
    <div
      className={`${styles.resizer} ${active ? styles.active : ''}`}
      onMouseDown={onMouseDown}
    />
  );
}

function NavIcon({ path }: { path: 'main' | 'evalops' }) {
  if (path === 'main') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><line x1="12" y1="4" x2="12" y2="4.01"/><line x1="12" y1="20" x2="12" y2="20.01"/>
      <line x1="4" y1="12" x2="4.01" y2="12"/><line x1="20" y1="12" x2="20.01" y2="12"/>
      <line x1="6.34" y1="6.34" x2="6.35" y2="6.35"/><line x1="17.66" y1="17.66" x2="17.67" y2="17.67"/>
      <line x1="6.34" y1="17.66" x2="6.35" y2="17.67"/><line x1="17.66" y1="6.34" x2="17.67" y2="6.35"/>
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  // Load persisted width on mount
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    const width = saved ? parseInt(saved) : DEFAULT_WIDTH;
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  }, []);

  const handleResize = useCallback((w: number) => {
    document.documentElement.style.setProperty('--sidebar-width', `${w}px`);
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(w));
  }, []);

  const isEvalops = pathname?.startsWith('/evalops');

  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <aside className={styles.sidebar} ref={sidebarRef}>
            {/* Header */}
            <div className={styles.sidebarHeader}>
              <svg className={styles.headerIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
              Compiler
            </div>

            {/* Nav */}
            <nav className={styles.nav}>
              <a
                href="/"
                className={`${styles.navLink} ${!isEvalops ? styles.navLinkActive : ''}`}
              >
                <NavIcon path="main" />
                Main / Graph
              </a>
              <a
                href="/evalops"
                className={`${styles.navLink} ${isEvalops ? styles.navLinkActive : ''}`}
              >
                <NavIcon path="evalops" />
                EvalOps (Diffs)
              </a>
            </nav>

            {/* Sidebar content */}
            <div className={styles.sidebarContent}>
              <SearchBar />
              <div className={styles.vaultLabel}>
                <span className={styles.vaultDot} />
                Vault: default
              </div>
              <FileTree vaultId="default" />
              <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                <Linter vaultId="default" />
              </div>
            </div>

            {/* Resizer */}
            <SidebarResizer onResize={handleResize} />
          </aside>

          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
