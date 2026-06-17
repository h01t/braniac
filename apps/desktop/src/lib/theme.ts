import type { ThemePreference } from "../types";

export function applyThemePreference(pref: ThemePreference): void {
  const root = document.documentElement;
  if (pref === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.dataset.theme = pref;
  }
}

export function themePreferenceLabel(pref: ThemePreference): string {
  if (pref === "system") return "system";
  return pref;
}
