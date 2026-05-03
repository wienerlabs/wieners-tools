import type { CatalogData } from "./types";

export const startersCatalog: CatalogData = {
  id: "starters",
  sections: [
    {
      id: "saas",
      resources: [
        { slug: "t3-stack", name: "create-t3-app", url: "https://create.t3.gg/", blurb: "Next.js + tRPC + Prisma + NextAuth + Tailwind, opinionated and well-maintained.", install: "npm create t3-app@latest" },
        { slug: "taxonomy", name: "Taxonomy", url: "https://github.com/shadcn-ui/taxonomy", blurb: "shadcn's open-source Next.js 13+ starter; great App Router reference." },
        { slug: "supastarter", name: "supastarter (free tier)", url: "https://supastarter.dev/", blurb: "Next.js + Supabase SaaS starter with auth, billing, teams, i18n." },
        { slug: "open-saas", name: "OpenSaaS", url: "https://github.com/wasp-lang/open-saas", blurb: "Wasp-based React + Node SaaS starter with Stripe, OpenAI, AWS S3." },
        { slug: "t3-turbo", name: "create-t3-turbo", url: "https://github.com/t3-oss/create-t3-turbo", blurb: "Turborepo monorepo of Expo + Next.js + tRPC sharing a typed API." },
        { slug: "kirimase", name: "Kirimase", url: "https://github.com/nicoalbanese/kirimase", blurb: "CLI to scaffold tRPC, Drizzle, Lucia auth, billing into existing Next.js apps.", install: "npx kirimase add" },
        { slug: "next-saas-starter", name: "Next.js SaaS Starter (Vercel)", url: "https://github.com/nextjs/saas-starter", blurb: "Vercel-maintained Next + Drizzle + Stripe template, simple and current." },
        { slug: "shipfast", name: "Refine", url: "https://refine.dev/", blurb: "Open-source React framework for internal tools, admin panels and B2B apps." },
        { slug: "vercel-templates", name: "Vercel templates gallery", url: "https://vercel.com/templates", blurb: "Hundreds of one-click deploy starters across Next, Svelte, Nuxt, Astro." },
        { slug: "shadcn-template", name: "Next.js + shadcn dashboard", url: "https://github.com/shadcn-ui/next-template", blurb: "Minimal shadcn + Next.js starter, great base for marketing sites." }
      ]
    },
    {
      id: "ai",
      resources: [
        { slug: "ai-sdk-templates", name: "Vercel AI SDK templates", url: "https://vercel.com/templates?type=ai", blurb: "Streaming chat, RAG, generative UI templates using AI SDK + Next.js." },
        { slug: "langchain-template", name: "LangChain Templates", url: "https://github.com/langchain-ai/langchain/tree/master/templates", blurb: "Reference RAG, agent, and chain projects in Python and TS." },
        { slug: "agent-starter", name: "Anthropic Agents Cookbook", url: "https://github.com/anthropics/anthropic-cookbook", blurb: "Recipes for tool use, agents, RAG, citations with Claude." },
        { slug: "openai-cookbook", name: "OpenAI Cookbook", url: "https://github.com/openai/openai-cookbook", blurb: "Reference notebooks for embeddings, fine-tuning, function calling, evals." }
      ]
    },
    {
      id: "blockchain",
      resources: [
        { slug: "create-onchain", name: "create-onchain", url: "https://www.smartwallet.dev/", blurb: "Coinbase OnchainKit Next.js starter for Base apps.", install: "npm create onchain@latest" },
        { slug: "scaffold-eth", name: "Scaffold-ETH 2", url: "https://github.com/scaffold-eth/scaffold-eth-2", blurb: "Hardhat / Foundry + Next.js + RainbowKit + wagmi monorepo for EVM dApps." },
        { slug: "solana-new", name: "solana.new", url: "https://www.solana.new/", blurb: "Cursor + Claude-ready Solana scaffold with Privy + Phantom + Jupiter + Helius pre-wired.", install: "curl -fsSL https://www.solana.new/setup.sh | bash" },
        { slug: "anchor-starter", name: "Anchor program starter", url: "https://github.com/coral-xyz/anchor", blurb: "Official Anchor workspace template for Solana programs.", install: "anchor init my-program" }
      ]
    }
  ]
};
