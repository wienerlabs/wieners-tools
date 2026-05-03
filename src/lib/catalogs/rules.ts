import type { CatalogData } from "./types";

export const rulesCatalog: CatalogData = {
  id: "rules",
  sections: [
    {
      id: "frontend",
      resources: [
        {
          slug: "nextjs-16",
          name: "Next.js 16 (App Router + Turbopack)",
          url: "https://nextjs.org/docs",
          blurb: "App Router default, Server Components first, Client Components only when interactive.",
          contentLanguage: "markdown",
          content: `# Next.js 16 conventions

- Default to Server Components; only mark "use client" when you need state, effects, or browser APIs.
- Use the App Router (\`src/app/\`); colocate route segments with their layouts and loading states.
- Wrap async server components with their own \`<Suspense>\` boundary; show a skeleton via \`loading.tsx\`.
- Read env vars from \`process.env\`; use \`NEXT_PUBLIC_\` only for values that must reach the client bundle.
- Prefer \`fetch()\` with \`{ next: { revalidate: N } }\` for caching over manual cache layers.
- Co-locate generated metadata with the page via \`generateMetadata()\`; never duplicate \`<title>\` in JSX.
- For images use \`next/image\`; never \`<img>\` without an explicit width/height.
- For forms use Server Actions when possible; the form's \`action\` becomes a callable async function.
- Use Turbopack for dev (\`next dev --turbo\`); validate with \`next build\` before ship.`
        },
        {
          slug: "react-19",
          name: "React 19",
          url: "https://react.dev",
          blurb: "Hooks first, no class components. Avoid useEffect for data flow.",
          contentLanguage: "markdown",
          content: `# React 19 conventions

- Functional components only; never write class components.
- Use \`useState\`, \`useReducer\`, \`useContext\` for state. Never read state from refs.
- Avoid \`useEffect\` for derived state. Compute it during render or memoize with \`useMemo\`.
- For data fetching prefer Server Components or React Query; \`useEffect(fetch)\` is an anti-pattern.
- Pass primitive props; lift complex objects into context to avoid prop drilling.
- Use the \`use()\` API to await promises and consume context inside conditionals.
- Mark refs that hold DOM nodes with \`useRef<HTMLDivElement | null>(null)\` for type safety.
- Memoize callbacks with \`useCallback\` only when handed to a memoized child or hook deps.`
        },
        {
          slug: "tailwind-v4",
          name: "Tailwind CSS v4",
          url: "https://tailwindcss.com",
          blurb: "Utility-first, design tokens via CSS variables. No nested arbitrary values.",
          contentLanguage: "markdown",
          content: `# Tailwind CSS v4 conventions

- Use the v4 CSS-first config: \`@import "tailwindcss";\` plus custom CSS variables in your stylesheet.
- Define design tokens (color, font, spacing) once as CSS variables; reference them in utilities.
- Prefer composition of small utilities over a single \`@apply\`-heavy class.
- Avoid arbitrary values in critical paths (\`p-[17px]\`); add to the theme instead.
- Use \`@layer components\` only for true reusable patterns (cards, buttons), not one-off blocks.
- Always pair interactive utilities with focus and hover states (\`hover:\`, \`focus-visible:\`).
- Group dark-mode variants with \`dark:\`; never duplicate full class lists.`
        },
        {
          slug: "shadcn-ui",
          name: "shadcn/ui",
          url: "https://ui.shadcn.com",
          blurb: "Copy-paste components, edit the source. No npm dependency for the components themselves.",
          contentLanguage: "markdown",
          content: `# shadcn/ui conventions

- Install components via the CLI (\`npx shadcn@latest add button\`); they live in \`src/components/ui/\`.
- Treat the generated components as YOUR source code; modify them directly when you need a variant.
- Don't lock to a Radix Primitive version; let shadcn manage it via the registry.
- Compose new patterns by importing the primitives and styling with Tailwind, not by overriding shadcn classes from outside.
- For data table, use TanStack Table under the hood as shadcn does.
- When updating Tailwind / Radix, re-run the shadcn CLI for any component that ships internal updates.`
        },
        {
          slug: "vue-3",
          name: "Vue 3 (Composition API)",
          url: "https://vuejs.org",
          blurb: "Composition API + script setup. Pinia for state.",
          contentLanguage: "markdown",
          content: `# Vue 3 conventions

- Use \`<script setup lang="ts">\` for every SFC; no Options API in new code.
- Reach for \`ref()\` for primitives, \`reactive()\` for objects you don't reassign.
- Compose logic into \`useThing()\` composables in \`src/composables/\`; do not put logic in components.
- Use Pinia for cross-component state, not \`provide/inject\`.
- Type emits with \`defineEmits<{ change: [value: string] }>()\`.
- For data fetching, \`useAsyncData\` (Nuxt) or \`useQuery\` (vue-query) — never plain \`onMounted(fetch)\`.`
        },
        {
          slug: "svelte-5",
          name: "Svelte 5 (Runes)",
          url: "https://svelte.dev",
          blurb: "Runes-based reactivity. $state, $derived, $effect.",
          contentLanguage: "markdown",
          content: `# Svelte 5 conventions

- Use runes (\`$state\`, \`$derived\`, \`$effect\`) for new code; avoid the legacy reactive labels.
- Reach for \`$derived\` over \`$effect\` whenever the value can be computed from existing state.
- Limit \`$effect\` to side effects (DOM I/O, subscriptions) — not to "react to changes".
- Prop typing: \`let { name, age = 18 }: { name: string; age?: number } = $props();\`.
- For SvelteKit, server logic lives in \`+page.server.ts\` / \`+server.ts\`; client-only code in \`+page.svelte\`.
- Use \`$bindable()\` only when the parent really needs two-way binding; otherwise emit events.`
        },
        {
          slug: "astro-5",
          name: "Astro 5",
          url: "https://docs.astro.build",
          blurb: "Islands architecture. Ship zero JS by default.",
          contentLanguage: "markdown",
          content: `# Astro 5 conventions

- Default to \`.astro\` components rendered to static HTML — zero runtime JS.
- Use \`client:load\`, \`client:visible\`, \`client:idle\` directives sparingly; pick the lightest.
- Mix frameworks at island boundaries (React + Svelte + Vue) only when justified.
- Place shared layouts in \`src/layouts/\`; co-locate page assets next to the route.
- For content-heavy sites, use Content Collections with Zod schemas for type-safe frontmatter.
- Server endpoints in \`src/pages/api/\` with the \`APIRoute\` type.`
        },
        {
          slug: "tanstack-query",
          name: "TanStack Query (React Query)",
          url: "https://tanstack.com/query",
          blurb: "Server state lives in queries. Mutations invalidate, never manually setQueryData.",
          contentLanguage: "markdown",
          content: `# TanStack Query conventions

- One query key per endpoint+args: \`['user', userId]\` not \`'user-' + userId\`.
- Use \`useQuery\` for reads, \`useMutation\` for writes; \`onSuccess\` invalidates relevant query keys.
- Avoid \`setQueryData\` for cache mutation unless you can guarantee the shape; otherwise invalidate.
- Set \`staleTime\` per query type — auth = Infinity, lists = 30s, real-time = 0.
- For dependent queries chain with the \`enabled\` flag, never with conditional hooks.
- Provide a typed \`queryFn\` and a typed \`select\` so the hook return is fully inferred.`
        }
      ]
    },
    {
      id: "backend",
      resources: [
        {
          slug: "fastapi",
          name: "FastAPI",
          url: "https://fastapi.tiangolo.com",
          blurb: "Async by default, Pydantic everywhere, dependency injection over globals.",
          contentLanguage: "markdown",
          content: `# FastAPI conventions

- Define every request/response as a Pydantic v2 model in \`schemas/\`.
- Use \`async def\` route handlers when calling I/O; sync \`def\` is fine for pure CPU.
- Inject dependencies (DB session, user, settings) with \`Depends()\` — never import a global session.
- Group routes into \`APIRouter\` modules under \`app/routers/\`; \`main.py\` only mounts.
- Lifespan startup/shutdown via the \`lifespan\` context manager; not the deprecated event hooks.
- Background work belongs in Celery / Arq / BackgroundTasks; never block a request.
- Use \`uvicorn\` in dev, \`gunicorn -k uvicorn.workers.UvicornWorker\` in prod.`
        },
        {
          slug: "django-5",
          name: "Django 5",
          url: "https://docs.djangoproject.com",
          blurb: "Class-based views, async views where helpful, DRF for APIs.",
          contentLanguage: "markdown",
          content: `# Django 5 conventions

- Use class-based views (\`ListView\`, \`DetailView\`, \`UpdateView\`) for CRUD; FBVs for one-off endpoints.
- Mark I/O-heavy views \`async def\` — Django 5 supports async ORM via \`Model.objects.aget()\`.
- All forms validated via \`forms.Form\` / \`ModelForm\`; never trust \`request.POST\` directly.
- Migrations are immutable history — never edit a committed migration; squash via \`makemigrations --squash\`.
- For APIs, DRF + drf-spectacular for OpenAPI; ViewSets + Routers, not raw URLs.
- Use \`select_related\` (fk) and \`prefetch_related\` (m2m / reverse) to dodge N+1 queries.
- Settings split: \`base.py\`, \`dev.py\`, \`prod.py\` with \`DJANGO_SETTINGS_MODULE\` env var.`
        },
        {
          slug: "spring-boot-3",
          name: "Spring Boot 3",
          url: "https://docs.spring.io/spring-boot/index.html",
          blurb: "Constructor injection, @ConfigurationProperties for config, Testcontainers for tests.",
          contentLanguage: "markdown",
          content: `# Spring Boot 3 conventions

- Use constructor injection always; never field injection (\`@Autowired\` on a field).
- Bind config via \`@ConfigurationProperties\` records, not \`@Value\` per field.
- Layer the app: \`controller\` → \`service\` → \`repository\`; controllers do no business logic.
- Use \`@Transactional\` at the service layer, never at controller or repository.
- Validate input with Jakarta Bean Validation (\`@Valid\` + \`@NotNull\` etc.); return \`ProblemDetail\` for errors.
- For tests use Testcontainers with the same DB engine as prod; H2 lies about Postgres behavior.
- Leverage Spring AOT for native images via \`./gradlew nativeCompile\` when you need fast startup.`
        },
        {
          slug: "go-stdlib",
          name: "Go (stdlib first)",
          url: "https://go.dev/doc/effective_go",
          blurb: "Use stdlib net/http, errors.Is, table-driven tests. Avoid frameworks.",
          contentLanguage: "markdown",
          content: `# Go conventions

- Prefer stdlib (\`net/http\`, \`encoding/json\`, \`database/sql\`) over frameworks (Gin/Echo) for new services.
- Wrap errors with \`fmt.Errorf("op: %w", err)\`; check with \`errors.Is\` / \`errors.As\`.
- Return errors as the last value; never panic across package boundaries.
- Use \`context.Context\` as the FIRST parameter of any function that touches I/O.
- Tests are table-driven; subtests via \`t.Run(name, func(t *testing.T){})\`.
- Concurrency: \`errgroup\` for fan-out/fan-in, \`sync.Once\` for lazy init, channels only when you need streaming.
- Format with \`gofmt\`, lint with \`golangci-lint\` (default config); both run in CI.`
        },
        {
          slug: "rust-axum",
          name: "Rust + Axum",
          url: "https://docs.rs/axum",
          blurb: "Axum routers, tower middleware, sqlx for DB. Use anyhow only at the edge.",
          contentLanguage: "markdown",
          content: `# Rust + Axum conventions

- Use \`anyhow::Result\` only at the binary edge; library code returns concrete errors via \`thiserror\`.
- Axum routers are nested; share state via the \`State<AppState>\` extractor, not globals.
- Tower middleware composes; rate-limit, CORS, tracing, compression all live in middleware layers.
- For DB use sqlx with compile-time query checking; never raw \`sqlx::query\` in hot paths.
- Async runtime is Tokio; \`async-std\` is no longer maintained.
- For serialization use serde with \`#[serde(deny_unknown_fields)]\` on inputs.
- \`#[tracing::instrument]\` every public handler; structured logs over println.`
        },
        {
          slug: "node-bun",
          name: "Node.js / Bun",
          url: "https://bun.sh/docs",
          blurb: "ESM, TypeScript by default, no CommonJS in new packages.",
          contentLanguage: "markdown",
          content: `# Node.js / Bun conventions

- ESM only (\`"type": "module"\`); no \`require\` in new packages.
- TypeScript with \`"moduleResolution": "Bundler"\` for app code, \`"NodeNext"\` for libraries.
- Prefer Bun's stdlib APIs (\`Bun.file\`, \`Bun.serve\`) when targeting Bun runtime; otherwise stay portable.
- Use native \`fetch()\`, \`URL\`, \`Response\` — no \`node-fetch\`, no \`got\`.
- Top-level \`await\` is fine; lifecycle hooks via \`process.on('SIGTERM')\` for graceful shutdown.
- Test with \`bun test\` (Bun) or \`vitest\` (Node); never \`mocha\`/\`jest\` in new repos.`
        }
      ]
    },
    {
      id: "blockchain",
      resources: [
        {
          slug: "solana-anchor",
          name: "Solana + Anchor",
          url: "https://www.anchor-lang.com",
          blurb: "Account model, Anchor macros, versioned transactions, @solana/kit (web3.js v2).",
          contentLanguage: "markdown",
          content: `# Solana + Anchor conventions

- Programs in Anchor; never raw Solana program without account validation macros.
- Use \`@solana/kit\` (web3.js v2) for new client code, not legacy v1.
- All transactions are versioned (V0); use Address Lookup Tables for >20 accounts.
- Sign via Wallet Standard / wallet-adapter — never \`window.solana\` directly.
- Account model: every PDA derived from explicit seeds, documented in the IDL comments.
- Use \`anchor test\` (mocha-like); for integration use Bankrun for fast simulation.
- Pay rent with \`AccountInfo\` checks; never assume an account is initialized.`
        },
        {
          slug: "evm-foundry",
          name: "EVM + Foundry",
          url: "https://book.getfoundry.sh",
          blurb: "Forge for tests, Anvil for local node, fuzz tests, no truffle.",
          contentLanguage: "markdown",
          content: `# EVM + Foundry conventions

- Tests live in \`test/\` as \`*.t.sol\`; one contract per test file, mirroring \`src/\`.
- Use \`forge test --gas-report\` to track gas regressions in CI.
- Fuzz inputs with \`function testFuzz_X(uint256 x) public\`; bound with \`vm.assume\`.
- Use \`vm.startPrank(alice)\` not \`vm.prank\` for multi-call sequences.
- Deployments: scripts in \`script/\`, called via \`forge script ... --broadcast\`.
- Prefer \`solady\` over \`solmate\`/OpenZeppelin where gas matters; use OZ for security-critical bits.
- Always verify on the explorer with \`forge verify-contract\` immediately after deploy.`
        },
        {
          slug: "base-onchainkit",
          name: "Base + OnchainKit",
          url: "https://docs.base.org/onchainkit",
          blurb: "Smart Wallet first, Paymaster sponsorship, OnchainKit components.",
          contentLanguage: "markdown",
          content: `# Base + OnchainKit conventions

- Default to Coinbase Smart Wallet (passkey) — not extension wallets — for onboarding.
- Use OnchainKit components (\`<ConnectWallet>\`, \`<Transaction>\`, \`<Identity>\`) over custom hand-rolled flows.
- Sponsor first-tx gas via Coinbase Paymaster URL from CDP; rate-limit server-side.
- Read CDP_KEY from env; never embed in client.
- Use Base mainnet (chainId 8453) for prod, Sepolia (84532) for tests; faucet at coinbase.com/faucets.
- For ERC-20 reads use viem's \`readContract\` with the official token address (e.g. USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913).`
        }
      ]
    },
    {
      id: "data",
      resources: [
        {
          slug: "postgres-prisma",
          name: "Postgres + Prisma",
          url: "https://www.prisma.io/docs",
          blurb: "Schema first, migrations checked in, never use raw SQL for app queries.",
          contentLanguage: "markdown",
          content: `# Postgres + Prisma conventions

- Schema-first: edit \`schema.prisma\`, then \`prisma migrate dev --name x\`. Never alter the DB directly.
- Migration files are committed; never run \`db push\` in CI for shared environments.
- Use \`select\` to restrict returned columns; default \`findMany\` returns everything.
- For complex aggregates use \`prisma.$queryRaw\` with the typed tag, never string concat.
- Connection pooling: PgBouncer / Prisma Accelerate / Neon serverless driver — pick one, stick with it.
- Always wrap multi-table writes in \`prisma.$transaction\`.
- Generate the client into \`node_modules/.prisma/\` (default); never check it in.`
        },
        {
          slug: "drizzle-orm",
          name: "Drizzle ORM",
          url: "https://orm.drizzle.team",
          blurb: "TypeScript-first, edge-runtime compatible, no codegen step.",
          contentLanguage: "markdown",
          content: `# Drizzle ORM conventions

- Schema in \`src/db/schema.ts\` as TS objects; types are inferred — no codegen.
- Use \`drizzle-kit migrate\` for migrations; commit the generated SQL files.
- Queries are SQL-shaped (\`db.select().from(users).where(eq(...))\`); read like SQL on purpose.
- For inserts use \`returning()\` instead of separate select.
- Edge-compatible drivers: \`@neondatabase/serverless\`, \`@vercel/postgres\`. Avoid \`pg\` in edge runtimes.
- For transactions use \`db.transaction(async (tx) => { ... })\`.`
        },
        {
          slug: "supabase",
          name: "Supabase",
          url: "https://supabase.com/docs",
          blurb: "Row-Level Security on every table. No service-role key in the browser.",
          contentLanguage: "markdown",
          content: `# Supabase conventions

- Enable RLS on every table the moment you create it. Default policy: deny.
- Service-role key NEVER touches the browser; use it only in server functions / edge functions.
- For SSR data fetching use \`createServerClient\` from \`@supabase/ssr\`; never \`createClient\` server-side.
- Subscribe to changes via Realtime channel; don't poll \`supabase.from().select()\` on a timer.
- For storage buckets set policies via SQL; the dashboard toggles are not enough for prod.
- Use \`pg_cron\` for scheduled jobs inside the DB; Edge Functions for HTTP-triggered work.`
        }
      ]
    }
  ]
};
