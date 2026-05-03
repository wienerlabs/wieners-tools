export type CatalogId =
  | "rules"
  | "mcp"
  | "prompts"
  | "snippets"
  | "cheatsheets"
  | "decisions"
  | "starters"
  | "eval"
  | "hosting"
  | "databases"
  | "auth"
  | "feeds"
  | "hackathons";

export type CatalogResource = {
  slug: string;
  name: string;
  url: string;
  blurb: string;
  thumb?: string;
  install?: string;
  snippet?: string;
  content?: string;
  contentLanguage?: string;
  badge?: string;
};

export type CatalogSection = {
  id: string;
  resources: CatalogResource[];
};

export type CatalogData = {
  id: CatalogId;
  sections: CatalogSection[];
};

export const CATALOG_ORDER: CatalogId[] = [
  "rules",
  "mcp",
  "prompts",
  "snippets",
  "cheatsheets",
  "decisions",
  "starters",
  "eval",
  "hosting",
  "databases",
  "auth",
  "feeds",
  "hackathons"
];
