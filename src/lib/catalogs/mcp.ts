import type { CatalogData } from "./types";

const cfg = (server: string, args: string[]) =>
  JSON.stringify({ mcpServers: { [server]: { command: args[0], args: args.slice(1) } } }, null, 2);

export const mcpCatalog: CatalogData = {
  id: "mcp",
  sections: [
    {
      id: "official",
      resources: [
        {
          slug: "filesystem",
          name: "Filesystem",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
          blurb: "Read, write, search files in a sandboxed directory. The most-used local MCP.",
          install: "npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/dir",
          contentLanguage: "json",
          content: cfg("filesystem", ["npx", "-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"])
        },
        {
          slug: "github",
          name: "GitHub",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
          blurb: "Read repos, create issues, open PRs. Auth via GITHUB_PERSONAL_ACCESS_TOKEN.",
          install: "npx -y @modelcontextprotocol/server-github",
          contentLanguage: "json",
          content: JSON.stringify({
            mcpServers: {
              github: {
                command: "npx",
                args: ["-y", "@modelcontextprotocol/server-github"],
                env: { GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx" }
              }
            }
          }, null, 2)
        },
        {
          slug: "postgres",
          name: "Postgres",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
          blurb: "Read-only SQL queries against any Postgres connection string.",
          install: "npx -y @modelcontextprotocol/server-postgres postgres://user:pass@host/db",
          contentLanguage: "json",
          content: cfg("postgres", ["npx", "-y", "@modelcontextprotocol/server-postgres", "postgres://localhost/mydb"])
        },
        {
          slug: "sqlite",
          name: "SQLite",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite",
          blurb: "Inspect and query a local SQLite database file.",
          install: "uvx mcp-server-sqlite --db-path ./mydb.sqlite",
          contentLanguage: "json",
          content: cfg("sqlite", ["uvx", "mcp-server-sqlite", "--db-path", "./mydb.sqlite"])
        },
        {
          slug: "fetch",
          name: "Fetch",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
          blurb: "Pull a URL's content as Markdown — most useful read-from-the-web tool.",
          install: "uvx mcp-server-fetch",
          contentLanguage: "json",
          content: cfg("fetch", ["uvx", "mcp-server-fetch"])
        },
        {
          slug: "memory",
          name: "Memory (knowledge graph)",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
          blurb: "Persistent knowledge graph: entities, observations, relations across sessions.",
          install: "npx -y @modelcontextprotocol/server-memory",
          contentLanguage: "json",
          content: cfg("memory", ["npx", "-y", "@modelcontextprotocol/server-memory"])
        },
        {
          slug: "puppeteer",
          name: "Puppeteer",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer",
          blurb: "Browser automation: navigate, click, screenshot, evaluate JS.",
          install: "npx -y @modelcontextprotocol/server-puppeteer",
          contentLanguage: "json",
          content: cfg("puppeteer", ["npx", "-y", "@modelcontextprotocol/server-puppeteer"])
        },
        {
          slug: "brave-search",
          name: "Brave Search",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
          blurb: "Web search via Brave's API. Needs BRAVE_API_KEY.",
          install: "npx -y @modelcontextprotocol/server-brave-search",
          contentLanguage: "json",
          content: JSON.stringify({
            mcpServers: {
              "brave-search": {
                command: "npx",
                args: ["-y", "@modelcontextprotocol/server-brave-search"],
                env: { BRAVE_API_KEY: "..." }
              }
            }
          }, null, 2)
        },
        {
          slug: "slack",
          name: "Slack",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
          blurb: "Read channels, post messages, react. Needs SLACK_BOT_TOKEN.",
          install: "npx -y @modelcontextprotocol/server-slack"
        },
        {
          slug: "gdrive",
          name: "Google Drive",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive",
          blurb: "Search and read Google Drive files. OAuth required.",
          install: "npx -y @modelcontextprotocol/server-gdrive"
        },
        {
          slug: "gitlab",
          name: "GitLab",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab",
          blurb: "Read repos, MRs, issues on self-hosted or gitlab.com.",
          install: "npx -y @modelcontextprotocol/server-gitlab"
        },
        {
          slug: "sequential-thinking",
          name: "Sequential Thinking",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking",
          blurb: "Step-by-step reasoning workspace. Helpful for hard planning.",
          install: "npx -y @modelcontextprotocol/server-sequential-thinking"
        }
      ]
    },
    {
      id: "community",
      resources: [
        { slug: "notion", name: "Notion", url: "https://github.com/makenotion/notion-mcp-server", blurb: "Read and write Notion pages, blocks, databases.", install: "npx -y @notionhq/notion-mcp-server" },
        { slug: "linear", name: "Linear", url: "https://github.com/jerhadf/linear-mcp-server", blurb: "Read issues, projects, cycles; create tasks from chat.", install: "npx -y linear-mcp-server" },
        { slug: "supabase", name: "Supabase", url: "https://github.com/supabase-community/supabase-mcp", blurb: "Query Supabase tables, manage projects, deploy edge functions.", install: "npx -y @supabase/mcp-server-supabase" },
        { slug: "figma", name: "Figma", url: "https://github.com/GLips/Figma-Context-MCP", blurb: "Pull a Figma file's nodes, styles, screenshots into context.", install: "npx -y figma-developer-mcp --figma-api-key=..." },
        { slug: "stripe", name: "Stripe", url: "https://github.com/stripe/agent-toolkit", blurb: "Inspect customers, products, invoices via the Stripe API.", install: "npx -y @stripe/mcp" },
        { slug: "browser-use", name: "Browser Use", url: "https://github.com/browser-use/browser-use", blurb: "AI-driven browser agent that can plan + act on a real Chromium.", install: "uvx browser-use-mcp" },
        { slug: "playwright", name: "Playwright", url: "https://github.com/microsoft/playwright-mcp", blurb: "Microsoft's official Playwright MCP — record/replay flows.", install: "npx -y @playwright/mcp" },
        { slug: "exa", name: "Exa Search", url: "https://github.com/exa-labs/exa-mcp-server", blurb: "Neural / hybrid web search via Exa API. Better than keyword for research.", install: "npx -y exa-mcp-server" },
        { slug: "perplexity", name: "Perplexity", url: "https://github.com/ppl-ai/modelcontextprotocol", blurb: "Perplexity Sonar models for grounded web answers.", install: "npx -y server-perplexity-ask" },
        { slug: "cloudflare", name: "Cloudflare", url: "https://github.com/cloudflare/mcp-server-cloudflare", blurb: "Manage Workers, KV, R2, D1 from chat.", install: "npx -y @cloudflare/mcp-server-cloudflare" },
        { slug: "fetch-firecrawl", name: "Firecrawl", url: "https://github.com/mendableai/firecrawl-mcp-server", blurb: "Crawl + scrape sites cleanly into markdown for LLMs.", install: "npx -y firecrawl-mcp" },
        { slug: "obsidian", name: "Obsidian", url: "https://github.com/MarkusPfundstein/mcp-obsidian", blurb: "Read + edit your local Obsidian vault from Claude / Cursor.", install: "uvx mcp-obsidian" },
        { slug: "atlassian", name: "Atlassian (Jira + Confluence)", url: "https://github.com/sooperset/mcp-atlassian", blurb: "Read tickets, post comments, fetch Confluence pages.", install: "uvx mcp-atlassian" },
        { slug: "neon", name: "Neon", url: "https://github.com/neondatabase/mcp-server-neon", blurb: "Manage Neon Postgres branches, run SQL, manage roles.", install: "npx -y @neondatabase/mcp-server-neon" },
        { slug: "clickhouse", name: "ClickHouse", url: "https://github.com/ClickHouse/mcp-clickhouse", blurb: "Run SQL on ClickHouse OLAP from Claude.", install: "uvx mcp-clickhouse" },
        { slug: "hf-hub", name: "Hugging Face", url: "https://github.com/evalstate/mcp-hfspace", blurb: "Search HF models, run Spaces, get paper abstracts.", install: "uvx mcp-hfspace" },
        { slug: "kubernetes", name: "Kubernetes", url: "https://github.com/Flux159/mcp-server-kubernetes", blurb: "Read pods, logs, deployments. Apply manifests carefully.", install: "npx -y mcp-server-kubernetes" },
        { slug: "redis", name: "Redis", url: "https://github.com/modelcontextprotocol/servers/tree/main/src/redis", blurb: "Read keys, run commands against a Redis URL.", install: "npx -y @modelcontextprotocol/server-redis" },
        { slug: "everart", name: "EverArt", url: "https://github.com/modelcontextprotocol/servers/tree/main/src/everart", blurb: "Generate images via EverArt models from prompts.", install: "npx -y @modelcontextprotocol/server-everart" },
        { slug: "tavily", name: "Tavily Search", url: "https://github.com/tavily-ai/tavily-mcp", blurb: "Search engine optimized for AI agents (research-grade).", install: "npx -y tavily-mcp" }
      ]
    }
  ]
};
