import type { CatalogData } from "./types";

export const decisionsCatalog: CatalogData = {
  id: "decisions",
  sections: [
    {
      id: "infra",
      resources: [
        {
          slug: "db-choice",
          name: "Which database?",
          url: "https://www.postgresql.org/",
          blurb: "Postgres is the right default. Pick something else only when these specific shapes apply.",
          contentLanguage: "markdown",
          content: `# Database choice

| Option | Pick when | Skip when |
| --- | --- | --- |
| **Postgres** (Supabase / Neon / managed) | Default for ~95% of apps. Relational + JSONB is enough. | Edge-first read-heavy ≤1ms latency budget. |
| **SQLite (Turso / D1)** | Read-heavy at the edge; per-tenant isolated DB; offline-first apps. | Heavy concurrent writes from multiple regions. |
| **MySQL / MariaDB** | Existing infra mandates it; PlanetScale-style sharding. | Greenfield — Postgres is more capable today. |
| **MongoDB** | Truly schemaless ingestion with deep nested docs. | Anything you'd ever want to JOIN — Postgres JSONB is enough. |
| **Convex / Firebase** | Want reactive subscriptions baked in; small team without a backend dev. | Need full SQL or to leave the platform later. |
| **ClickHouse / Tinybird** | OLAP — billions of rows, sub-second analytics. | Transactional workloads (use it ALONGSIDE Postgres). |
| **Redis (Upstash)** | Cache, rate limit, pub/sub, leaderboards. | Source of truth — durability story is weak. |
| **Vector DB (Pinecone, Qdrant, pgvector)** | RAG retrieval, semantic search, embeddings. | <100k vectors → just use \`pgvector\` inside your Postgres. |

## Tiebreakers
- New app + small team → **Supabase** (Postgres + auth + storage + realtime in one box).
- Already have Postgres + need vectors → add the \`pgvector\` extension, don't bring a new system.
- Edge runtime + read-heavy → **Turso** or **D1**. Pair with a single Postgres region for writes if needed.
- Don't pick "NewSQL" for a new app you might never scale. Postgres + good schema design covers absurd scale.`
        },
        {
          slug: "hosting-choice",
          name: "Where to deploy?",
          url: "https://vercel.com/",
          blurb: "Edge / serverless / container / VM / self-host — the matrix that picks for you.",
          contentLanguage: "markdown",
          content: `# Hosting choice

| Option | Best for | Avoid when |
| --- | --- | --- |
| **Vercel** | Next.js apps, marketing sites, fast iteration, preview URLs per PR. | Heavy long-running processes; egress-heavy workloads (gets expensive). |
| **Netlify** | Static + Jamstack, form handling, identity built-in. | Heavy serverless throughput. |
| **Cloudflare Pages + Workers** | Global static + edge functions, cheap egress, KV/R2/D1 close at hand. | Stateful Node services that need long execution. |
| **Render / Railway / Fly.io** | Long-running web services, background workers, managed Postgres beside the app. | Sub-100ms-cold-start serverless needs. |
| **AWS (ECS / Fargate / Lambda)** | Strict enterprise / compliance; deep AWS service usage. | Greenfield app with a small team — DX cost is real. |
| **Coolify / Dokploy on a VPS** | Predictable monthly cost, full control, side projects. | You don't want to be on call for the host yourself. |
| **Bare VM (Hetzner / DigitalOcean)** | You actually need root, custom kernel, GPU, big RAM. | A team without an ops budget. |

## Tiebreakers
- One Next.js app, ship fast → **Vercel** for v1; revisit if egress bill stings.
- Global static + edge logic, cheap → **Cloudflare**.
- Long-lived workers + DB beside app → **Render** or **Fly.io**.
- Self-host + indie cost → **Coolify** on a $6/mo Hetzner box.`
        }
      ]
    },
    {
      id: "ai",
      resources: [
        {
          slug: "llm-choice",
          name: "Which LLM?",
          url: "https://www.anthropic.com/claude",
          blurb: "Frontier models compared by what they're actually best at — not their MMLU.",
          contentLanguage: "markdown",
          content: `# LLM choice

| Model | Best for | Watch out |
| --- | --- | --- |
| **Claude Sonnet 4.6** | Coding, agent loops, long-context (200k+) reasoning, careful refactors. | Slightly higher latency than Haiku. |
| **Claude Haiku 4.5** | High-volume cheap tasks; chat triage; embedded in product flows. | Less reliable on multi-step planning. |
| **Claude Opus 4.7** | Hardest planning + research tasks; one-shot deep work. | Most expensive; slow; overkill for chat. |
| **GPT-4o / 4.1** | Multimodal (vision, audio), broad ecosystem, function calling DX. | Less consistent on long agentic loops vs Sonnet. |
| **Gemini 2.5 Pro** | 1M+ context window for huge codebases or long video. | Tooling ecosystem still catching up. |
| **Mistral Large** | EU data residency; on-prem; competitive on European languages. | Trails frontier on hardest reasoning. |
| **Llama 3.x (self-host)** | Cost control, full data isolation, fine-tuning. | Need GPU infra + ops; quality gap on non-English. |
| **Local (Ollama, Llama.cpp)** | Demos, prototyping, offline notebooks. | Production-grade quality and speed. |

## Tiebreakers
- Coding agent → **Claude Sonnet 4.6**, prompt-cache the system message.
- Customer-facing chat at high QPS → **Haiku 4.5** for triage, escalate to Sonnet for hard turns.
- Multimodal (image input) → **GPT-4o** is still the strongest one-stop.
- Compliance / EU data → **Mistral Large** on Azure EU or self-host **Llama**.`
        },
        {
          slug: "ai-editor",
          name: "Cursor vs Windsurf vs Claude Code",
          url: "https://www.cursor.com/",
          blurb: "Three serious AI coding setups. They are not interchangeable.",
          contentLanguage: "markdown",
          content: `# AI coding editor

| Tool | Strengths | Weaknesses |
| --- | --- | --- |
| **Cursor** | Mature multi-file edits; Composer; tab autocomplete; broad MCP support; fastest improvements right now. | Subscription cost; occasional editor lag on huge repos. |
| **Windsurf** | Codeium's editor; agent flows that touch many files autonomously; more aggressive defaults. | Smaller plugin ecosystem than Cursor. |
| **Claude Code (CLI)** | Lives in your terminal; great for long-running agent tasks; pairs with the rest of the Anthropic stack; first-class hooks. | No GUI editor; command-line muscle memory required. |
| **GitHub Copilot** | Best-in-class single-line autocomplete; deepest IDE integrations; familiar pricing for orgs. | Edit/agent flows trail Cursor + Windsurf. |
| **Continue.dev (OSS)** | Open source; bring your own model; extensible. | DX behind paid editors; you operate it. |

## Tiebreakers
- Pair-programming flow, multi-file edits → **Cursor**.
- "Go fix this whole feature" autonomous → **Windsurf** or **Claude Code**.
- Already deep in JetBrains / VS Code, want subtle help → **Copilot**.
- Want full control + open weights → **Continue.dev** + a self-hosted model.

## Real talk
- Use Cursor + Claude Sonnet 4.6 daily. Drop into Claude Code for long agentic refactors that need terminal access.
- Don't switch editors mid-project — the AI cost of context-switching is bigger than any feature gap.`
        }
      ]
    },
    {
      id: "stack",
      resources: [
        {
          slug: "auth-choice",
          name: "Which auth provider?",
          url: "https://clerk.com/",
          blurb: "Drop-in SaaS vs self-host OSS. The actual decision tree.",
          contentLanguage: "markdown",
          content: `# Auth provider choice

| Option | Pick when | Skip when |
| --- | --- | --- |
| **Clerk** | Next.js app, want UI components shipping today, B2B orgs supported. | Tight cost control on free tier limits. |
| **Auth0** | Enterprise contracts, SAML / OIDC mandates, broad SDK coverage. | Indie / small team — pricing scales fast. |
| **Stytch** | Passkey-first, B2B SSO + SCIM at a friendlier price than Auth0. | You need a polished UI kit out of the box. |
| **WorkOS** | Selling to enterprise, need SSO + SCIM + Audit Logs as APIs. | Consumer auth — overkill. |
| **Better Auth (OSS)** | TS-first OSS framework, you control the DB, modern feature set. | Want zero-ops — you still run it yourself. |
| **Auth.js (NextAuth)** | OSS in Next.js / SvelteKit / Express; mature; many providers. | Latest features (passkeys, orgs) trail commercial offerings. |
| **Lucia** | Lightest possible session library; bring your own DB + adapters. | You wanted batteries-included. |
| **Supabase Auth** | You're already on Supabase; tight RLS integration. | Standalone use without Supabase Postgres. |
| **Privy / Dynamic** | Web3 onboarding (embedded wallets); email + wallet auth combined. | Pure web2 — overkill. |

## Tiebreakers
- Ship today, B2B SaaS in Next.js → **Clerk**.
- Sell to enterprise → **WorkOS** or **Stytch** (depending on UI needs).
- Self-host + cost control + modern → **Better Auth**.
- Web3 onboarding → **Privy** for EVM-first, **Dynamic** for multi-chain.`
        },
        {
          slug: "framework-choice",
          name: "Which frontend framework?",
          url: "https://nextjs.org/",
          blurb: "Next is the safe default. Pick something else for these reasons only.",
          contentLanguage: "markdown",
          content: `# Frontend framework

| Option | Pick when | Skip when |
| --- | --- | --- |
| **Next.js** | Default for full-stack React apps; widest hiring pool; best deploy targets. | You hate React or you need ship-zero-JS by default. |
| **Remix / React Router 7** | Web-standards-first React, nested routing, server-first data flow. | You'd rather use App Router and Server Components. |
| **SvelteKit** | Smallest runtime, fastest dev experience, you don't need React's hiring pool. | Component-library budget is small (smaller ecosystem). |
| **Nuxt** | Vue 3 + Composition API team; serverless-friendly. | Pure React shop. |
| **Astro** | Marketing site, blog, docs; want zero-JS by default with islands. | Heavy interactivity throughout the page. |
| **SolidStart** | You actually benchmark perf and need fine-grained reactivity. | Library availability is critical. |
| **TanStack Start** | You love React Query and want full-stack TS without vendor lock. | You need today-ready production patterns. |
| **Plain Vite + React** | SPA, no SEO needs, ship behind auth. | Public marketing site. |

## Tiebreakers
- Marketing + blog + docs together → **Astro**.
- Full app, ship in days → **Next.js** (App Router).
- Smallest bundle, fastest dev → **SvelteKit**.
- Internal tools behind login, no SEO → **Vite + React** (or Refine on top).`
        },
        {
          slug: "monorepo-choice",
          name: "Monorepo tool?",
          url: "https://turbo.build/",
          blurb: "Three real options for JS / TS, plus when 'no monorepo' is the right answer.",
          contentLanguage: "markdown",
          content: `# Monorepo tool

| Option | Pick when | Skip when |
| --- | --- | --- |
| **Turborepo** | JS/TS monorepo, want minimal config, remote caching for free with Vercel. | Polyglot repo with Go / Rust / Python sharing the cache. |
| **Nx** | Polyglot (TS + Go + Python + Java), need code generators / scaffolds, larger team. | Small team — config surface is heavier. |
| **Bun workspaces** | Pure-Bun stack, want speed without an extra orchestrator. | Need cache-aware task graph across many packages. |
| **pnpm workspaces (no orchestrator)** | <5 packages, no need for build cache. | Cross-package dependency graph + caching matters. |
| **No monorepo (split repos)** | Truly independent products, separate release cycles. | You're constantly grep-ing across two repos. |

## Tiebreakers
- Next.js + shared UI library + couple internal packages → **Turborepo + pnpm**.
- 20+ packages with codegen needs → **Nx**.
- Backend in Go and frontend in TS, shared schemas → split repos OR Nx.
- 2 packages → just pnpm workspaces, no orchestrator.`
        }
      ]
    }
  ]
};
