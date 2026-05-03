import type { CatalogData } from "./types";

export const snippetsCatalog: CatalogData = {
  id: "snippets",
  sections: [
    {
      id: "auth",
      resources: [
        {
          slug: "clerk-middleware",
          name: "Clerk + Next.js middleware",
          url: "https://clerk.com/docs/references/nextjs/clerk-middleware",
          blurb: "Protect routes with Clerk's middleware in Next.js App Router.",
          contentLanguage: "ts",
          content: `// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/dashboard(.*)", "/api/private(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"]
};`
        },
        {
          slug: "lucia-session",
          name: "Lucia session check (App Router)",
          url: "https://lucia-auth.com/",
          blurb: "Server-side session lookup with Lucia in a server component.",
          contentLanguage: "ts",
          content: `// lib/auth.ts
import { Lucia } from "lucia";
import { cookies } from "next/headers";

export async function getSession() {
  const c = await cookies();
  const id = c.get(lucia.sessionCookieName)?.value ?? null;
  if (!id) return { user: null, session: null };
  const { user, session } = await lucia.validateSession(id);
  if (session?.fresh) {
    const fresh = lucia.createSessionCookie(session.id);
    c.set(fresh.name, fresh.value, fresh.attributes);
  }
  return { user, session };
}`
        },
        {
          slug: "jwt-verify",
          name: "Verify a JWT (jose)",
          url: "https://github.com/panva/jose",
          blurb: "Verify an HS256/RS256 JWT and extract claims with jose.",
          contentLanguage: "ts",
          content: `import { jwtVerify, importSPKI } from "jose";

export async function verify(token: string) {
  const key = await importSPKI(process.env.JWT_PUBLIC_KEY!, "RS256");
  const { payload } = await jwtVerify(token, key, {
    issuer: "https://your-issuer",
    audience: "your-audience"
  });
  return payload as { sub: string; email?: string };
}`
        },
        {
          slug: "next-auth-credentials",
          name: "Auth.js credentials provider",
          url: "https://authjs.dev/getting-started/authentication/credentials",
          blurb: "Email + password sign-in with Auth.js (NextAuth) v5.",
          contentLanguage: "ts",
          content: `// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async ({ email, password }) => {
        const user = await db.user.findUnique({ where: { email: String(email) } });
        if (!user || !user.hash) return null;
        const ok = await compare(String(password), user.hash);
        return ok ? { id: user.id, email: user.email } : null;
      }
    })
  ],
  session: { strategy: "jwt" }
});`
        },
        {
          slug: "webhook-signature",
          name: "Verify a webhook signature (HMAC-SHA256)",
          url: "https://docs.svix.com/receiving/verifying-payloads/why",
          blurb: "Constant-time HMAC verification for incoming webhooks.",
          contentLanguage: "ts",
          content: `import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyWebhook(rawBody: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signature, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// usage in route handler:
// const ok = verifyWebhook(await req.text(), req.headers.get("x-signature")!, process.env.WEBHOOK_SECRET!);
// if (!ok) return new Response("invalid signature", { status: 401 });`
        }
      ]
    },
    {
      id: "ai",
      resources: [
        {
          slug: "claude-stream",
          name: "Claude streaming chat",
          url: "https://docs.anthropic.com/en/api/streaming",
          blurb: "Stream tokens from Claude Sonnet 4.6 via the official SDK.",
          contentLanguage: "ts",
          content: `import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function* askClaude(prompt: string) {
  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }]
  });
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      yield event.delta.text;
    }
  }
}`
        },
        {
          slug: "claude-tool-use",
          name: "Claude tool use loop",
          url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
          blurb: "Minimal loop: model picks a tool, you run it, feed the result back.",
          contentLanguage: "ts",
          content: `import Anthropic from "@anthropic-ai/sdk";
const c = new Anthropic();

const tools = [{
  name: "get_time",
  description: "Returns the current UTC time as ISO string.",
  input_schema: { type: "object", properties: {} }
}];

async function runTool(name: string) {
  if (name === "get_time") return new Date().toISOString();
  throw new Error("unknown tool: " + name);
}

export async function chat(userPrompt: string) {
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: userPrompt }];
  for (let step = 0; step < 6; step++) {
    const r = await c.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      tools,
      messages
    });
    messages.push({ role: "assistant", content: r.content });
    if (r.stop_reason !== "tool_use") return r;
    const calls = r.content.filter((b: any) => b.type === "tool_use");
    const results = await Promise.all(
      calls.map(async (call: any) => ({
        type: "tool_result" as const,
        tool_use_id: call.id,
        content: await runTool(call.name)
      }))
    );
    messages.push({ role: "user", content: results });
  }
  throw new Error("budget exceeded");
}`
        },
        {
          slug: "claude-prompt-cache",
          name: "Anthropic prompt caching",
          url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
          blurb: "Mark a long system prompt as cacheable to cut token cost on repeated calls.",
          contentLanguage: "ts",
          content: `await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: bigSystemPrompt,
      cache_control: { type: "ephemeral" }
    }
  ],
  messages: [{ role: "user", content: userPrompt }]
});

// First call writes the cache; later calls within ~5 min hit it
// and pay only for the user prompt + completion.`
        },
        {
          slug: "openai-stream",
          name: "OpenAI streaming completion",
          url: "https://platform.openai.com/docs/guides/streaming",
          blurb: "Stream a chat completion from GPT-4o with the official SDK.",
          contentLanguage: "ts",
          content: `import OpenAI from "openai";
const openai = new OpenAI();

export async function* ask(prompt: string) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    stream: true
  });
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}`
        },
        {
          slug: "embeddings-batch",
          name: "Batch embeddings (OpenAI)",
          url: "https://platform.openai.com/docs/guides/embeddings",
          blurb: "Embed many texts in one call. Cheaper + faster than one-at-a-time.",
          contentLanguage: "ts",
          content: `import OpenAI from "openai";
const openai = new OpenAI();

export async function embed(texts: string[]) {
  const r = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts
  });
  return r.data.map((d) => d.embedding);
}

// usage: const vectors = await embed(chunks); // chunks: string[]`
        },
        {
          slug: "rag-retrieve",
          name: "Tiny RAG retrieve (cosine)",
          url: "https://en.wikipedia.org/wiki/Cosine_similarity",
          blurb: "Brute-force cosine search over an in-memory vector store. Works for ≤10k chunks.",
          contentLanguage: "ts",
          content: `function dot(a: number[], b: number[]) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(v: number[]) {
  return Math.sqrt(dot(v, v));
}

export function cosine(a: number[], b: number[]) {
  return dot(a, b) / (norm(a) * norm(b));
}

export function topK<T>(query: number[], items: { vec: number[]; doc: T }[], k = 5) {
  return items
    .map((it) => ({ score: cosine(query, it.vec), doc: it.doc }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}`
        },
        {
          slug: "ai-sdk-tool",
          name: "Vercel AI SDK tool calling",
          url: "https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling",
          blurb: "Define a typed tool with Zod and let the model invoke it through generateText.",
          contentLanguage: "ts",
          content: `import { generateText, tool } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

const result = await generateText({
  model: anthropic("claude-sonnet-4-6"),
  tools: {
    weather: tool({
      description: "Get weather for a city",
      parameters: z.object({ city: z.string() }),
      execute: async ({ city }) => fetchWeather(city)
    })
  },
  prompt: "What's the weather in Istanbul?"
});`
        },
        {
          slug: "json-mode",
          name: "Strict JSON output (Anthropic)",
          url: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/increase-consistency",
          blurb: "Coerce the model to return parseable JSON. Wrap with jsonrepair fallback.",
          contentLanguage: "ts",
          content: `import { jsonrepair } from "jsonrepair";

const r = await anthropic.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  system: "Reply with raw JSON only, no markdown fence, no commentary.",
  messages: [{ role: "user", content: "List 3 dog breeds with their typical weight in kg." }]
});

const raw = r.content[0].type === "text" ? r.content[0].text : "";
const data = JSON.parse(jsonrepair(raw));`
        }
      ]
    },
    {
      id: "web",
      resources: [
        {
          slug: "fetch-retry",
          name: "fetch with timeout + retry",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          blurb: "Cancel slow requests, retry transient 5xx with exponential backoff.",
          contentLanguage: "ts",
          content: `export async function fetchWithRetry(url: string, init: RequestInit = {}, opts = { timeoutMs: 8000, retries: 3 }) {
  for (let attempt = 0; attempt <= opts.retries; attempt++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), opts.timeoutMs);
    try {
      const res = await fetch(url, { ...init, signal: ctrl.signal });
      clearTimeout(t);
      if (res.status < 500 || attempt === opts.retries) return res;
    } catch (err) {
      clearTimeout(t);
      if (attempt === opts.retries) throw err;
    }
    await new Promise((r) => setTimeout(r, 2 ** attempt * 250));
  }
  throw new Error("unreachable");
}`
        },
        {
          slug: "use-debounce",
          name: "useDebounce hook",
          url: "https://react.dev/reference/react/useEffect",
          blurb: "Delay a value update until N ms after the last change. For search-as-you-type.",
          contentLanguage: "tsx",
          content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, ms = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}

// usage:
// const debouncedQuery = useDebounce(query, 250);
// const { data } = useQuery({ queryKey: ["search", debouncedQuery], queryFn: ... });`
        },
        {
          slug: "use-intersect",
          name: "useInView hook (IntersectionObserver)",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
          blurb: "Trigger when an element enters the viewport. Lazy load + infinite scroll.",
          contentLanguage: "tsx",
          content: `import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return { ref, inView };
}`
        },
        {
          slug: "server-action-form",
          name: "Server Action form (Next.js)",
          url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
          blurb: "Form posts directly to a server function. No client state library.",
          contentLanguage: "tsx",
          content: `// app/comments/page.tsx
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

async function add(formData: FormData) {
  "use server";
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;
  await db.comment.create({ data: { text } });
  revalidatePath("/comments");
}

export default async function Page() {
  const items = await db.comment.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <form action={add}>
        <input name="text" required />
        <button type="submit">Post</button>
      </form>
      <ul>{items.map((c) => <li key={c.id}>{c.text}</li>)}</ul>
    </>
  );
}`
        },
        {
          slug: "rate-limit-edge",
          name: "Edge rate limit (Upstash)",
          url: "https://upstash.com/docs/redis/sdks/ratelimit-ts/overview",
          blurb: "Per-IP fixed window rate limit at the edge.",
          contentLanguage: "ts",
          content: `import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "1 m")
});

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = await limiter.limit(ip);
  if (!success) return new NextResponse("rate limit", { status: 429 });
  return NextResponse.next();
}

export const config = { matcher: "/api/:path*" };`
        },
        {
          slug: "presigned-s3",
          name: "Presigned S3 upload URL",
          url: "https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-presigned-urls.html",
          blurb: "Server signs, browser PUTs directly to S3 — no payload through your server.",
          contentLanguage: "ts",
          content: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function presignUpload(key: string, contentType: string) {
  const cmd = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType
  });
  return getSignedUrl(s3, cmd, { expiresIn: 60 });
}

// client side:
// const url = await fetch("/api/presign?...").then(r => r.text());
// await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });`
        }
      ]
    },
    {
      id: "data",
      resources: [
        {
          slug: "drizzle-schema",
          name: "Drizzle schema + relations",
          url: "https://orm.drizzle.team/docs/sql-schema-declaration",
          blurb: "Typed Postgres schema with one-to-many relation. Drives migrations.",
          contentLanguage: "ts",
          content: `import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull()
});

export const usersRelations = relations(users, ({ many }) => ({ posts: many(posts) }));
export const postsRelations = relations(posts, ({ one }) => ({ user: one(users, { fields: [posts.userId], references: [users.id] }) }));`
        },
        {
          slug: "prisma-tx",
          name: "Prisma interactive transaction",
          url: "https://www.prisma.io/docs/orm/prisma-client/queries/transactions",
          blurb: "Multi-step write that rolls back on any error.",
          contentLanguage: "ts",
          content: `await prisma.$transaction(async (tx) => {
  const order = await tx.order.create({ data: { userId, total } });
  await tx.orderItem.createMany({
    data: items.map((it) => ({ orderId: order.id, productId: it.id, qty: it.qty }))
  });
  await tx.user.update({
    where: { id: userId },
    data: { credit: { decrement: total } }
  });
}, { isolationLevel: "Serializable", timeout: 10_000 });`
        },
        {
          slug: "advisory-lock",
          name: "Postgres advisory lock",
          url: "https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS",
          blurb: "App-level lock keyed by an int, useful for preventing duplicate cron runs.",
          contentLanguage: "ts",
          content: `// hash a string key into a 32-bit int for pg_try_advisory_lock
function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return h;
}

export async function withLock<T>(key: string, fn: () => Promise<T>): Promise<T | null> {
  const id = hash(key);
  const got = await db.$queryRaw\`SELECT pg_try_advisory_lock(\${id}) AS got\`;
  if (!got[0].got) return null;
  try {
    return await fn();
  } finally {
    await db.$queryRaw\`SELECT pg_advisory_unlock(\${id})\`;
  }
}`
        },
        {
          slug: "redis-cache-wrapper",
          name: "Cache wrapper (read-through)",
          url: "https://redis.io/docs/latest/commands/setex/",
          blurb: "Wrap any async function to memoize its result in Redis with TTL.",
          contentLanguage: "ts",
          content: `import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

export async function cached<T>(key: string, ttlSec: number, fn: () => Promise<T>): Promise<T> {
  const hit = await redis.get<T>(key);
  if (hit !== null) return hit;
  const fresh = await fn();
  await redis.setex(key, ttlSec, fresh);
  return fresh;
}

// usage:
// const user = await cached(\`user:\${id}\`, 60, () => db.user.findUnique({ where: { id } }));`
        }
      ]
    },
    {
      id: "web3",
      resources: [
        {
          slug: "wagmi-read",
          name: "wagmi: read an ERC-20 balance",
          url: "https://wagmi.sh/react/hooks/useReadContract",
          blurb: "Read balanceOf for the connected wallet. Type-safe via the ABI.",
          contentLanguage: "tsx",
          content: `import { useAccount, useReadContract } from "wagmi";
import { erc20Abi, formatUnits } from "viem";

const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

export function UsdcBalance() {
  const { address } = useAccount();
  const { data, isPending } = useReadContract({
    address: USDC_BASE,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });
  if (isPending) return null;
  return <span>{data ? formatUnits(data, 6) : "0"} USDC</span>;
}`
        },
        {
          slug: "solana-transfer",
          name: "Solana: transfer SOL",
          url: "https://github.com/anza-xyz/kit",
          blurb: "Build, sign and send a SOL transfer with @solana/kit (web3.js v2).",
          contentLanguage: "ts",
          content: `import {
  createSolanaRpc,
  address,
  lamports,
  pipe,
  createTransactionMessage,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  signTransactionMessageWithSigners,
  getSignatureFromTransaction
} from "@solana/kit";
import { getTransferSolInstruction } from "@solana-program/system";

export async function sendSol(from: any, toBase58: string, sol: number) {
  const rpc = createSolanaRpc(process.env.HELIUS_RPC!);
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  const tx = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayerSigner(from, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
    (m) => appendTransactionMessageInstructions(
      [getTransferSolInstruction({ source: from, destination: address(toBase58), amount: lamports(BigInt(sol * 1e9)) })],
      m
    )
  );
  const signed = await signTransactionMessageWithSigners(tx);
  return getSignatureFromTransaction(signed);
}`
        },
        {
          slug: "eip712-sign",
          name: "Sign EIP-712 typed data (viem)",
          url: "https://viem.sh/docs/actions/wallet/signTypedData",
          blurb: "Sign structured data the user can preview in their wallet.",
          contentLanguage: "ts",
          content: `import { useSignTypedData } from "wagmi";

const { signTypedDataAsync } = useSignTypedData();

const signature = await signTypedDataAsync({
  domain: { name: "MyApp", version: "1", chainId: 8453, verifyingContract: "0x..." },
  types: {
    Order: [
      { name: "id", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "recipient", type: "address" }
    ]
  },
  primaryType: "Order",
  message: { id: 42n, amount: 1000n, recipient: "0xRecipient" }
});`
        }
      ]
    },
    {
      id: "ops",
      resources: [
        {
          slug: "dockerfile-node",
          name: "Multi-stage Dockerfile (Node)",
          url: "https://docs.docker.com/build/building/multi-stage/",
          blurb: "Build deps + cache deps separately, ship a minimal runtime image.",
          contentLanguage: "dockerfile",
          content: `# syntax=docker/dockerfile:1
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]`
        },
        {
          slug: "gha-deploy",
          name: "GitHub Action: deploy on tag",
          url: "https://docs.github.com/en/actions",
          blurb: "Build + deploy when you push a v* tag. Caches node_modules.",
          contentLanguage: "yaml",
          content: `name: Deploy
on:
  push:
    tags: ["v*"]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Deploy
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
        run: npx vercel deploy --prod --token "$DEPLOY_TOKEN"`
        },
        {
          slug: "healthcheck",
          name: "Healthcheck endpoint",
          url: "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/",
          blurb: "Liveness + readiness probes that actually check downstream deps.",
          contentLanguage: "ts",
          content: `// app/api/health/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";

export async function GET() {
  const start = Date.now();
  const checks: Record<string, boolean> = {};
  try { await db.$queryRaw\`SELECT 1\`; checks.db = true; } catch { checks.db = false; }
  try { await redis.ping(); checks.redis = true; } catch { checks.redis = false; }
  const ok = Object.values(checks).every(Boolean);
  return NextResponse.json(
    { ok, checks, ms: Date.now() - start },
    { status: ok ? 200 : 503 }
  );
}`
        }
      ]
    }
  ]
};
