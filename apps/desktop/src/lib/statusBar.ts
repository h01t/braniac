export type StatusBarMode = "collapsed" | "compact" | "expanded";

export const STATUS_BAR_MODE_KEY = "braniac.statusBarMode";
export const STATUS_BAR_USER_SET_KEY = "braniac.statusBarUserSet";

export function loadStatusBarMode(): StatusBarMode | null {
  try {
    const raw = localStorage.getItem(STATUS_BAR_MODE_KEY);
    if (raw === "collapsed" || raw === "compact" || raw === "expanded") return raw;
    return null;
  } catch {
    return null;
  }
}

export function saveStatusBarMode(mode: StatusBarMode): void {
  try {
    localStorage.setItem(STATUS_BAR_MODE_KEY, mode);
    localStorage.setItem(STATUS_BAR_USER_SET_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function hasUserSetStatusBarMode(): boolean {
  try {
    return localStorage.getItem(STATUS_BAR_USER_SET_KEY) === "1";
  } catch {
    return false;
  }
}

export function defaultStatusBarModeForTab(tab: string): StatusBarMode {
  return tab === "graph" ? "collapsed" : "compact";
}
