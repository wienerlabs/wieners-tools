import type { CatalogData } from "./types";

export const databasesCatalog: CatalogData = {
  id: "databases",
  sections: [
    {
      id: "postgres",
      resources: [
        { slug: "supabase", name: "Supabase", url: "https://supabase.com/", blurb: "Postgres + auth + storage + realtime + edge functions, generous free tier." },
        { slug: "neon", name: "Neon", url: "https://neon.tech/", blurb: "Serverless Postgres with branching; cold-start fast enough for serverless." },
        { slug: "planetscale", name: "PlanetScale (Postgres)", url: "https://planetscale.com/", blurb: "Vitess-backed Postgres, branch-based schema workflow, no-downtime migrations." },
        { slug: "xata", name: "Xata", url: "https://xata.io/", blurb: "Postgres + search + branches + edge SDK; great for content-heavy apps." }
      ]
    },
    {
      id: "edge-sqlite",
      resources: [
        { slug: "turso", name: "Turso", url: "https://turso.tech/", blurb: "libSQL (SQLite fork) replicated to the edge; sub-ms latency reads." },
        { slug: "cloudflare-d1", name: "Cloudflare D1", url: "https://developers.cloudflare.com/d1/", blurb: "Native SQLite for Workers; integrated billing with the rest of CF." }
      ]
    },
    {
      id: "reactive",
      resources: [
        { slug: "convex", name: "Convex", url: "https://www.convex.dev/", blurb: "Reactive backend with TS functions + automatic queries / subscriptions." },
        { slug: "firebase", name: "Firebase Firestore", url: "https://firebase.google.com/products/firestore", blurb: "Document DB with realtime listeners; tight Google ecosystem integration." }
      ]
    },
    {
      id: "olap-search",
      resources: [
        { slug: "clickhouse-cloud", name: "ClickHouse Cloud", url: "https://clickhouse.com/", blurb: "Columnar OLAP for analytics; sub-second queries on billions of rows." },
        { slug: "tinybird", name: "Tinybird", url: "https://www.tinybird.co/", blurb: "ClickHouse-as-a-service with HTTP endpoints over your queries." },
        { slug: "meilisearch", name: "Meilisearch", url: "https://www.meilisearch.com/", blurb: "Open-source typo-tolerant search; self-host or cloud." },
        { slug: "typesense", name: "Typesense", url: "https://typesense.org/", blurb: "Open-source search, geo + vector support, easy ops." }
      ]
    }
  ]
};
