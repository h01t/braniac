'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import styles from '@/app/layout.module.css';
import FileTree from './FileTree';
import Linter from './Linter';
import SearchBar from './SearchBar';
import VaultSelector from './VaultSelector';

const SIDEBAR_STORAGE_KEY = 'compiler-sidebar-width';
const DEFAULT_WIDTH = 260;

function SidebarResizer({ onResize }: { onResize: (width: number) => void }) {
  const [active, setActive] = useState(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onMouseDown = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    startX.current = event.clientX;
    startWidth.current = parseInt(
      document.documentElement.style.getPropertyValue('--sidebar-width') || String(DEFAULT_WIDTH),
      10,
    );
    setActive(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX.current;
      const nextWidth = Math.max(180, Math.min(480, startWidth.current + delta));
      onResize(nextWidth);
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

function NavIcon({ path }: { path: 'main' | 'evalops' | 'settings' }) {
  if (path === 'main') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="4" x2="12" y2="4.01" />
        <line x1="12" y1="20" x2="12" y2="20.01" />
        <line x1="4" y1="12" x2="4.01" y2="12" />
        <line x1="20" y1="12" x2="20.01" y2="12" />
        <line x1="6.34" y1="6.34" x2="6.35" y2="6.35" />
        <line x1="17.66" y1="17.66" x2="17.67" y2="17.67" />
        <line x1="6.34" y1="17.66" x2="6.35" y2="17.67" />
        <line x1="17.66" y1="6.34" x2="17.67" y2="6.35" />
      </svg>
    );
  }

  if (path === 'evalops') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    const width = saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  }, []);

  const handleResize = useCallback((width: number) => {
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(width));
  }, []);

  const isEvalops = pathname?.startsWith('/evalops');
  const isSettings = pathname?.startsWith('/settings');

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <svg className={styles.headerIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          Compiler
        </div>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${!isEvalops && !isSettings ? styles.navLinkActive : ''}`}
          >
            <NavIcon path="main" />
            Main / Graph
          </Link>
          <Link
            href="/evalops"
            className={`${styles.navLink} ${isEvalops ? styles.navLinkActive : ''}`}
          >
            <NavIcon path="evalops" />
            EvalOps (Diffs)
          </Link>
          <Link
            href="/settings"
            className={`${styles.navLink} ${isSettings ? styles.navLinkActive : ''}`}
          >
            <NavIcon path="settings" />
            Settings
          </Link>
        </nav>

        <div className={styles.sidebarContent}>
          <SearchBar />
          <VaultSelector />
          <FileTree />
          <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
            <Linter />
          </div>
        </div>

        <SidebarResizer onResize={handleResize} />
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
