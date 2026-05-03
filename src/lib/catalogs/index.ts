import { rulesCatalog } from "./rules";
import { mcpCatalog } from "./mcp";
import { promptsCatalog } from "./prompts";
import { startersCatalog } from "./starters";
import { evalCatalog } from "./eval";
import { hostingCatalog } from "./hosting";
import { databasesCatalog } from "./databases";
import { authCatalog } from "./auth";
import { feedsCatalog } from "./feeds";
import { hackathonsCatalog } from "./hackathons";
import { CATALOG_ORDER, type CatalogData, type CatalogId } from "./types";

export type { CatalogData, CatalogId, CatalogResource, CatalogSection } from "./types";
export { CATALOG_ORDER } from "./types";

const REGISTRY: Record<CatalogId, CatalogData> = {
  rules: rulesCatalog,
  mcp: mcpCatalog,
  prompts: promptsCatalog,
  starters: startersCatalog,
  eval: evalCatalog,
  hosting: hostingCatalog,
  databases: databasesCatalog,
  auth: authCatalog,
  feeds: feedsCatalog,
  hackathons: hackathonsCatalog
};

export function getCatalog(id: CatalogId): CatalogData {
  return REGISTRY[id];
}

export function isCatalogId(value: string): value is CatalogId {
  return (CATALOG_ORDER as string[]).includes(value);
}

export function allCatalogs(): CatalogData[] {
  return CATALOG_ORDER.map((id) => REGISTRY[id]);
}

export function catalogResourceCount(id: CatalogId): number {
  return REGISTRY[id].sections.reduce((sum, s) => sum + s.resources.length, 0);
}
