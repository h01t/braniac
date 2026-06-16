export const KNOWN_CLUSTERS = [
  "concepts",
  "entities",
  "events",
  "papers",
  "sources",
] as const;

export function clusterCssVar(cluster: string | null | undefined): string {
  if (!cluster) return "--graph-node-default";
  const safe = cluster.toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!safe) return "--graph-node-default";
  return `--graph-cluster-${safe}`;
}

export function linkEndpointId(endpoint: string | { id?: string }): string {
  if (typeof endpoint === "string") return endpoint;
  return endpoint.id ?? "";
}

export function computeDegreeMap(
  links: { source: string | { id?: string }; target: string | { id?: string } }[],
): Map<string, number> {
  const map = new Map<string, number>();
  const bump = (id: string) => {
    if (!id) return;
    map.set(id, (map.get(id) ?? 0) + 1);
  };
  for (const link of links) {
    bump(linkEndpointId(link.source));
    bump(linkEndpointId(link.target));
  }
  return map;
}

export function nodeRadius(degree: number, missing: boolean): number {
  const base = missing ? 4 : 3;
  const scaled = base + Math.sqrt(degree) * 0.85;
  const min = missing ? 4 : 3;
  return Math.min(10, Math.max(min, scaled));
}

export function clusterLabel(cluster: string): string {
  if (cluster === "concepts") return "Concept";
  return cluster.charAt(0).toUpperCase() + cluster.slice(1);
}
