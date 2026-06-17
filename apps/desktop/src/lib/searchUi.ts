import type { SearchResult } from "../types";

export type SearchPhase = "idle" | "searching" | "results" | "empty";

/** Sidebar shows ranked hits only when the user has an active query and results. */
export function isSearchMode(query: string, results: SearchResult[]): boolean {
  return resolveSearchPhase(query, results, false) === "results";
}

export function resolveSearchPhase(
  query: string,
  results: SearchResult[],
  searching: boolean,
): SearchPhase {
  const q = query.trim();
  if (!q) return "idle";
  if (searching) return "searching";
  if (results.length > 0) return "results";
  return "empty";
}
