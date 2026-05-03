import type { CatalogData } from "./types";

export const hostingCatalog: CatalogData = {
  id: "hosting",
  sections: [
    {
      id: "fullstack",
      resources: [
        { slug: "vercel", name: "Vercel", url: "https://vercel.com/", blurb: "Next.js-native, edge functions, instant rollbacks. Most polished DX." },
        { slug: "netlify", name: "Netlify", url: "https://www.netlify.com/", blurb: "Pioneer of Jamstack hosting; great for static + edge functions." },
        { slug: "cloudflare-pages", name: "Cloudflare Pages", url: "https://pages.cloudflare.com/", blurb: "Free CDN, free Workers integration, cheap egress. Best for global static." },
        { slug: "render", name: "Render", url: "https://render.com/", blurb: "Heroku-style PaaS: web services, workers, DBs, cron — one dashboard." },
        { slug: "railway", name: "Railway", url: "https://railway.app/", blurb: "Quick monorepo deploys, SQL/Redis add-ons, generous free trial." },
        { slug: "fly", name: "Fly.io", url: "https://fly.io/", blurb: "Global VMs in 30+ regions; deploy via Dockerfile, region-pinned." }
      ]
    },
    {
      id: "edge",
      resources: [
        { slug: "cloudflare-workers", name: "Cloudflare Workers", url: "https://workers.cloudflare.com/", blurb: "V8 isolate edge runtime; KV, R2, D1, Durable Objects native." },
        { slug: "deno-deploy", name: "Deno Deploy", url: "https://deno.com/deploy", blurb: "Edge runtime built on Deno; web-standard APIs first-class." },
        { slug: "bun", name: "Bun (self-host)", url: "https://bun.sh/", blurb: "Run \`bun --hot\` anywhere; pair with Coolify or your own VM." }
      ]
    },
    {
      id: "self-host",
      resources: [
        { slug: "coolify", name: "Coolify", url: "https://coolify.io/", blurb: "Open-source Heroku/Vercel/Netlify alternative for your own server." },
        { slug: "dokploy", name: "Dokploy", url: "https://dokploy.com/", blurb: "Open-source PaaS with one-click deploys, monitoring, multi-server support." },
        { slug: "caprover", name: "CapRover", url: "https://caprover.com/", blurb: "Self-hosted PaaS that wraps Docker Swarm; mature and stable." }
      ]
    }
  ]
};
