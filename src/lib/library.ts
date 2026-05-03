export type LibraryCategoryId = "ui" | "ai" | "design" | "tools" | "services" | "social";

export type Library = {
  slug: string;
  name: string;
  url: string;
  description: string;
  image?: string;
};

export type LibraryCategoryGroup = {
  id: LibraryCategoryId;
  resources: Library[];
};

export const libraryGroups: LibraryCategoryGroup[] = [
  {
    id: "ui",
    resources: [
      { slug: "kokonutui",          name: "KokonutUI",          url: "https://kokonutui.com",                description: "Open-source UI components for React and Next.js.", image: "/lib-thumbs/ui/kokonutui.png" },
      { slug: "silk",               name: "Silk",               url: "https://silkhq.co/",                   description: "Native-feeling swipeable sheets on the web.", image: "/lib-thumbs/ui/silk.jpeg" },
      { slug: "motion",             name: "Motion",             url: "https://motion.dev/",                  description: "Modern animation library for JavaScript and React.", image: "/lib-thumbs/ui/motion.png" },
      { slug: "base-ui",            name: "Base UI",            url: "https://base-ui.com/",                 description: "Unstyled, accessible primitives for building design systems." },
      { slug: "react-email",        name: "React Email",        url: "https://react.email/",                 description: "Build and send emails with React components.", image: "/lib-thumbs/ui/react-email.jpeg" },
      { slug: "react-bits",         name: "React Bits",         url: "https://www.reactbits.dev/",           description: "Hand-picked animated React components for creative builds.", image: "/lib-thumbs/ui/react-bits.jpeg" },
      { slug: "cmdk",               name: "cmdk",               url: "https://cmdk.paco.me/",                description: "Fast, composable, unstyled command menu for React.", image: "/lib-thumbs/ui/cmdk.jpeg" },
      { slug: "daisyui",            name: "DaisyUI",            url: "https://daisyui.com/",                 description: "Free open-source component library for Tailwind CSS.", image: "/lib-thumbs/ui/daisy-ui.png" },
      { slug: "handyarrows",        name: "Handyarrows",        url: "https://handyarrows.com/",             description: "Drop-in arrow assets for diagrams and UI." },
      { slug: "shadcn-ui",          name: "shadcn/ui",          url: "https://ui.shadcn.com/",               description: "Copy-paste accessible components built on Radix + Tailwind.", image: "/lib-thumbs/ui/shadcn.png" },
      { slug: "aceternity",         name: "Aceternity",         url: "https://ui.aceternity.com/",           description: "Premium Next.js + Tailwind + Framer Motion components.", image: "/lib-thumbs/ui/aceternity.jpeg" },
      { slug: "numberflow",         name: "NumberFlow",         url: "https://number-flow.barvian.me/",      description: "Animated number component, dependency-free and accessible." },
      { slug: "blendy",             name: "Blendy",             url: "https://blendy.tahazsh.com/",          description: "Framework-agnostic morph between two elements.", image: "/lib-thumbs/ui/blendy.png" },
      { slug: "shader-gradient",    name: "Shader Gradient",    url: "https://www.shadergradient.com/",      description: "Animated WebGL gradient backgrounds.", image: "/lib-thumbs/ui/shader-gradient.png" },
      { slug: "easing",             name: "Easing",             url: "https://www.easing.dev/",              description: "Browse and copy easing curves for the web.", image: "/lib-thumbs/ui/easing.png" },
      { slug: "fancy-components",   name: "Fancy Components",   url: "https://www.fancycomponents.dev/",     description: "Growing library of React micro-interactions.", image: "/lib-thumbs/ui/fancy-components.png" },
      { slug: "luxe-ui",            name: "LuxeUI",             url: "https://www.luxeui.com/",              description: "Copy-and-paste polished UI components.", image: "/lib-thumbs/ui/luxe-ui.png" },
      { slug: "kokonutui-pro",      name: "KokonutUI Pro",      url: "https://kokonutui.pro",                description: "100+ premium components for marketing sites and apps.", image: "/lib-thumbs/ui/kokonutui-pro.png" },
      { slug: "21st",               name: "21st",               url: "https://21st.dev",                     description: "Discover and remix UI components from top design engineers.", image: "/lib-thumbs/ui/21st.png" },
      { slug: "uiverse",            name: "Uiverse",            url: "https://uiverse.io",                   description: "Massive open-source UI element catalog.", image: "/lib-thumbs/ui/uiverse.png" },
      { slug: "supahero",           name: "Supahero",           url: "https://www.supahero.io/",             description: "Curated collection of beautiful hero sections.", image: "/lib-thumbs/ui/supahero.png" }
    ]
  },
  {
    id: "ai",
    resources: [
      { slug: "new-email",          name: "new.email",          url: "https://new.email/",                   description: "AI chat that builds email templates.", image: "/lib-thumbs/ai/new.email.jpeg" },
      { slug: "granola",            name: "Granola",            url: "https://www.granola.ai/",              description: "AI notepad for back-to-back meetings.", image: "/lib-thumbs/ai/granola.jpeg" },
      { slug: "vapi",               name: "Vapi",               url: "https://vapi.ai/",                     description: "Voice AI agents for developers.", image: "/lib-thumbs/ai/vapi.jpeg" },
      { slug: "cursor-directory",   name: "Cursor Directory",   url: "https://cursor.directory/",            description: "Best cursor rules + MCP servers for your stack.", image: "/lib-thumbs/ai/cursor-directory.png" },
      { slug: "trae",               name: "Trae",               url: "https://www.trae.ai/",                 description: "Adaptive AI IDE that collaborates with you.", image: "/lib-thumbs/ai/trae.png" },
      { slug: "aider",              name: "aider",              url: "https://aider.chat/",                  description: "AI pair-programming in your terminal." },
      { slug: "highlight-ai",       name: "Highlight AI",       url: "https://www.highlightai.com/",         description: "Recall anything you've seen, heard or said.", image: "/lib-thumbs/ai/highlight-ai.webp" },
      { slug: "v0",                 name: "v0",                 url: "https://v0.dev/",                      description: "Vercel's AI app generator from a chat prompt.", image: "/lib-thumbs/ai/v0.png" },
      { slug: "cursor",             name: "Cursor",             url: "https://www.cursor.com/",              description: "AI-first code editor.", image: "/lib-thumbs/ai/cursor.png" },
      { slug: "same",               name: "Same",               url: "https://same.dev/",                    description: "Clone any website from a URL via prompting.", image: "/lib-thumbs/ai/same.jpeg" },
      { slug: "warp",               name: "Warp",               url: "https://www.warp.dev/",                description: "Intelligent AI terminal.", image: "/lib-thumbs/ai/warp.png" },
      { slug: "replit",             name: "Replit",             url: "https://replit.com/",                  description: "AI-assisted apps builder in the browser.", image: "/lib-thumbs/ai/replit.jpeg" },
      { slug: "dora",               name: "Dora",               url: "https://www.dora.run/ai",              description: "Animated 3D websites from a prompt.", image: "/lib-thumbs/ai/dora.jpeg" },
      { slug: "fal",                name: "Fal",                url: "https://fal.ai/",                      description: "Generative media platform for developers.", image: "/lib-thumbs/ai/fal.jpeg" },
      { slug: "elevenlabs",         name: "ElevenLabs",         url: "https://elevenlabs.io/",               description: "Realistic text-to-speech and voice cloning.", image: "/lib-thumbs/ai/eleven-labs.png" },
      { slug: "lumalabs",           name: "LumaLabs",           url: "https://lumalabs.ai/",                 description: "Realistic motion content with Ray3 and Dream Machine." },
      { slug: "ai-sdk",             name: "AI SDK",             url: "https://sdk.vercel.ai/",               description: "Open-source toolkit for building AI products in TS.", image: "/lib-thumbs/ai/ai-sdk.png" },
      { slug: "code-rabbit",        name: "CodeRabbit",         url: "https://www.coderabbit.ai/",           description: "AI code review that cuts review time in half.", image: "/lib-thumbs/ai/code-rabbit.png" },
      { slug: "wegic",              name: "Wegic",              url: "https://wegic.ai/",                    description: "AI web designer + developer co-pilot.", image: "/lib-thumbs/ai/wegic.jpeg" },
      { slug: "manus",              name: "Manus",              url: "https://manus.im/",                    description: "Frontier AI agent platform.", image: "/lib-thumbs/ai/manus.jpeg" },
      { slug: "lovable",            name: "Lovable",            url: "https://www.lovable.dev/",             description: "Idea to app in seconds, full-stack AI engineer.", image: "/lib-thumbs/ai/lovable.jpeg" },
      { slug: "bolt",               name: "Bolt",               url: "https://www.bolt.new/",                description: "Prompt, run, edit and deploy full-stack apps.", image: "/lib-thumbs/ai/bolt.jpeg" },
      { slug: "windsurf",           name: "Windsurf",           url: "https://www.windsurf.ai/",             description: "AI IDE where developer + AI work in flow.", image: "/lib-thumbs/ai/windsurf.jpeg" },
      { slug: "replicate",          name: "Replicate",          url: "https://replicate.com/",               description: "Run and fine-tune ML models at scale." },
      { slug: "shaped",             name: "Shaped",             url: "https://www.shaped.ai/",               description: "GenAI search and recommendations API.", image: "/lib-thumbs/ai/shaped.jpeg" },
      { slug: "prompts",            name: "Prompts.chat",       url: "https://prompts.chat/",                description: "Curated prompt library for ChatGPT and other LLMs." },
      { slug: "firecrawl",          name: "Firecrawl",          url: "https://www.firecrawl.dev/",           description: "Turn websites into LLM-ready data.", image: "/lib-thumbs/ai/firecrawl.jpeg" },
      { slug: "langbase",           name: "Langbase",           url: "https://langbase.com/",                description: "Composable AI developer platform.", image: "/lib-thumbs/ai/langbase.jpeg" },
      { slug: "hugging-face",       name: "Hugging Face",       url: "https://huggingface.co/",              description: "Community hub for ML models and datasets.", image: "/lib-thumbs/ai/hugging-face.png" }
    ]
  },
  {
    id: "design",
    resources: [
      { slug: "avatars-outpace",    name: "Handcrafted Avatars",url: "https://avatars.outpace.systems/",     description: "Free, beautifully crafted gradient avatars.", image: "/lib-thumbs/design/avatars-outpace.png" },
      { slug: "muzli",              name: "Muzli",              url: "https://muz.li/",                      description: "Browser extension surfacing fresh design stories.", image: "/lib-thumbs/design/muzli.png" },
      { slug: "shots",              name: "Shots",              url: "https://shots.so/",                    description: "Mockups, presentations and image scenes.", image: "/lib-thumbs/design/shots.png" },
      { slug: "svgl",               name: "Svgl",               url: "https://svgl.app/",                    description: "Beautiful SVG logo library.", image: "/lib-thumbs/design/svgl.jpeg" },
      { slug: "icones",             name: "Icônes",             url: "https://icones.js.org/",               description: "Icon explorer with 100k+ filterable icons." },
      { slug: "paper",              name: "Paper",              url: "https://paper.design/",                description: "New home for designers, a Figma alternative.", image: "/lib-thumbs/tools/paper.jpeg" },
      { slug: "items",              name: "Items",              url: "https://items.design/",                description: "600+ AI-generated design assets.", image: "/lib-thumbs/design/items-design.png" },
      { slug: "relume",             name: "Relume",             url: "https://www.relume.io/",               description: "Websites designed and built by AI.", image: "/lib-thumbs/design/relume.jpeg" },
      { slug: "boring-avatars",     name: "Boring Avatars",     url: "https://boringavatars.com/",           description: "Open-source SVG avatar generator.", image: "/lib-thumbs/design/boring-avatars.png" },
      { slug: "morflax",            name: "Morflax",            url: "https://www.morflax.com/",             description: "3D design tool in the browser.", image: "/lib-thumbs/design/morflax.jpeg" },
      { slug: "unicorn",            name: "Unicorn Studio",     url: "https://www.unicorn.studio/",          description: "Enchanting WebGL effects, motion, interactivity.", image: "/lib-thumbs/design/unicorn-studio.png" },
      { slug: "midjourney",         name: "Midjourney",         url: "https://www.midjourney.com/",          description: "AI image generator." },
      { slug: "layers",             name: "Layers",             url: "https://layers.to/",                   description: "Home for designers, the magazine and platform.", image: "/lib-thumbs/design/layers.jpeg" },
      { slug: "awwwards",           name: "Awwwards",           url: "https://www.awwwards.com/",            description: "Web design awards and inspiration archive.", image: "/lib-thumbs/design/awwwards.png" },
      { slug: "footer",             name: "Footer",             url: "https://www.footer.design/",           description: "The only footer gallery on earth.", image: "/lib-thumbs/design/footer.jpeg" },
      { slug: "shapefest",          name: "Shapefest",          url: "https://shapefest.com/",               description: "Massive collection of free 3D shapes.", image: "/lib-thumbs/design/shapefest.jpeg" },
      { slug: "framer",             name: "Framer",             url: "https://www.framer.com/",              description: "The website builder for designers.", image: "/lib-thumbs/design/framer.jpeg" },
      { slug: "godly",              name: "Godly",              url: "https://godly.website/",               description: "Astronomically good web design inspiration." },
      { slug: "spline",             name: "Spline",             url: "https://spline.design/",               description: "Browser-based 3D design tool.", image: "/lib-thumbs/design/spline.png" },
      { slug: "logoipsum",          name: "Logoipsum",          url: "https://logoipsum.com/",               description: "Beautiful SVG placeholder logos.", image: "/lib-thumbs/design/logoipsum.png" },
      { slug: "uncoverlab",         name: "Uncoverlab",         url: "https://uncoverlab.co/",               description: "Growing library of Figma website templates.", image: "/lib-thumbs/design/uncoverlab.jpeg" },
      { slug: "curated-design",     name: "Curated Design",     url: "https://www.curated.design/",          description: "Web design inspiration catalog.", image: "/lib-thumbs/design/curated-design.jpeg" },
      { slug: "undraw",             name: "Undraw",             url: "https://undraw.co/",                   description: "Open-source illustrations for any idea.", image: "/lib-thumbs/design/undraw.png" },
      { slug: "saas-landing-pages", name: "SaaS Landing Pages", url: "https://saaslandingpages.com/",        description: "Beautiful SaaS landing page library.", image: "/lib-thumbs/design/saas-landing-page.png" },
      { slug: "60fps",              name: "60fps",              url: "https://60fps.io/",                    description: "UI/UX animation inspiration for mobile and web.", image: "/lib-thumbs/design/60fps.png" },
      { slug: "lummi",              name: "Lummi",              url: "https://www.lummi.ai/",                description: "Unique AI stock photos, illustrations and 3D.", image: "/lib-thumbs/design/lummi.png" }
    ]
  },
  {
    id: "tools",
    resources: [
      { slug: "efecto",             name: "Efecto",             url: "https://efecto.app/",                  description: "Turn 3D models, videos and images into ASCII art.", image: "/lib-thumbs/tools/efecto.png" },
      { slug: "isocons",            name: "Isocons",            url: "https://www.isocons.app/",             description: "Carefully crafted isometric icon set.", image: "/lib-thumbs/tools/isocons.png" },
      { slug: "screen-studio",      name: "Screen Studio",      url: "https://screen.studio/",               description: "Screen recorder that auto-edits to a polished video.", image: "/lib-thumbs/tools/screen-studio.jpeg" },
      { slug: "rive",               name: "Rive",               url: "https://rive.app/",                    description: "Design and ship interactive graphics anywhere.", image: "/lib-thumbs/tools/rive.png" },
      { slug: "tldraw",             name: "tldraw",             url: "https://tldraw.dev/",                  description: "Build instant collaborative whiteboards." },
      { slug: "rayso",              name: "Ray.so",             url: "https://www.ray.so/",                  description: "Beautiful screenshots of code.", image: "/lib-thumbs/tools/ray.jpeg" },
      { slug: "ghostty",            name: "Ghostty",            url: "https://ghostty.org/",                 description: "Fast, feature-rich, cross-platform terminal.", image: "/lib-thumbs/tools/ghostty.png" },
      { slug: "magic-pattern",      name: "Magic Pattern",      url: "https://www.magicpattern.design/",     description: "SVG/CSS patterns, gradients and organic shapes." },
      { slug: "monaspace",          name: "Monaspace",          url: "https://monaspace.githubnext.com/",    description: "GitHub Next's superfamily of code fonts.", image: "/lib-thumbs/tools/monaspace.png" },
      { slug: "clocks",             name: "Clocks",             url: "https://www.clocks.app/",              description: "A more fun standby mode for your Mac.", image: "/lib-thumbs/tools/clocks.jpeg" },
      { slug: "lookaway",           name: "LookAways",          url: "https://lookaway.app/",                description: "Break reminder for macOS.", image: "/lib-thumbs/tools/look-away.jpeg" },
      { slug: "klack",              name: "Klack",              url: "https://tryklack.com/",                description: "Satisfying sound with every keystroke.", image: "/lib-thumbs/tools/klack.png" },
      { slug: "cap",                name: "Cap",                url: "https://cap.so/",                      description: "Open-source Loom alternative.", image: "/lib-thumbs/tools/cap.png" },
      { slug: "post-bridge",        name: "Post Bridge",        url: "https://www.post-bridge.com/",         description: "Schedule content across every channel in seconds.", image: "/lib-thumbs/tools/post-bridge.jpeg" },
      { slug: "contra",             name: "Contra",             url: "https://contra.com/",                  description: "Commission-free freelance network.", image: "/lib-thumbs/tools/contra.jpeg" }
    ]
  },
  {
    id: "services",
    resources: [
      { slug: "raycast",            name: "Raycast",            url: "https://raycast.com/",                 description: "Your shortcut to everything, loved by developers.", image: "/lib-thumbs/services/raycast.jpeg" },
      { slug: "seline",             name: "Seline",             url: "https://seline.so/",                   description: "Simple, private, cookieless product analytics.", image: "/lib-thumbs/services/seline.png" },
      { slug: "og-new",             name: "og.new",             url: "https://og.new/",                      description: "Generate open-graph images with zero effort.", image: "/lib-thumbs/services/og-new.png" },
      { slug: "openpanel",          name: "OpenPanel",          url: "https://openpanel.dev/",               description: "Open-source Mixpanel + Plausible alternative.", image: "/lib-thumbs/services/openpanel.png" },
      { slug: "gsap",               name: "GSAP",               url: "https://gsap.com/",                    description: "Animate anything on the web.", image: "/lib-thumbs/services/gsap.jpeg" },
      { slug: "attio",              name: "Attio",              url: "https://attio.com/",                   description: "AI-native CRM for go-to-market builders.", image: "/lib-thumbs/services/attio.png" },
      { slug: "dub",                name: "Dub",                url: "https://dub.sh/",                      description: "Short links with superpowers.", image: "/lib-thumbs/services/dub.jpeg" },
      { slug: "supabase",           name: "Supabase",           url: "https://www.supabase.com/",            description: "Open-source Firebase alternative.", image: "/lib-thumbs/services/supabase.png" },
      { slug: "uploadthing",        name: "UploadThings",       url: "https://uploadthing.com/",             description: "File upload as a service for developers.", image: "/lib-thumbs/services/uploadthing.jpeg" },
      { slug: "neon",               name: "Neon",               url: "https://neon.tech/",                   description: "Serverless Postgres built for the cloud.", image: "/lib-thumbs/services/neon.jpeg" },
      { slug: "tigris",             name: "Tigris",             url: "https://www.tigrisdata.com/",          description: "Globally distributed S3-compatible object storage.", image: "/lib-thumbs/services/tigris.jpeg" },
      { slug: "sevalla",            name: "Sevalla",            url: "https://sevalla.com/",                 description: "Deployment platform for any kind of app.", image: "/lib-thumbs/services/sevalla.jpeg" },
      { slug: "graphite",           name: "Graphite",           url: "https://graphite.com/",                description: "AI code review for stacked PRs.", image: "/lib-thumbs/services/graphite.png" },
      { slug: "clerk",              name: "Clerk",              url: "https://clerk.com/",                   description: "Complete user management platform.", image: "/lib-thumbs/services/clerk.jpeg" },
      { slug: "vercel",             name: "Vercel",             url: "https://vercel.com/",                  description: "Frontend cloud, deploy in one click.", image: "/lib-thumbs/services/vercel.jpeg" },
      { slug: "dodo-payments",      name: "Dodo Payments",      url: "https://dodopayments.com/",            description: "Payments + billing for AI, SaaS and digital products.", image: "/lib-thumbs/services/dodo-payments.png" },
      { slug: "polar",              name: "Polar",              url: "https://polar.sh/",                    description: "Best monetization platform for developers.", image: "/lib-thumbs/services/polar.jpeg" },
      { slug: "improvmx",           name: "ImprovMX",           url: "https://improvmx.com/",                description: "Email forwarding for custom domains in seconds." },
      { slug: "stripe",             name: "Stripe",             url: "https://stripe.com/",                  description: "Payments infrastructure for the internet.", image: "/lib-thumbs/services/stripe.jpeg" },
      { slug: "resend",             name: "Resend",             url: "https://resend.com/",                  description: "Emails for developers.", image: "/lib-thumbs/services/resend.png" },
      { slug: "fumadocs",           name: "Fumadocs",           url: "https://fumadocs.com/",                description: "Next.js framework for building docs sites.", image: "/lib-thumbs/services/fumadocs.png" },
      { slug: "posthog",            name: "PostHog",            url: "https://posthog.com/",                 description: "Open-source product analytics platform.", image: "/lib-thumbs/services/posthog.png" },
      { slug: "mintlify",           name: "Mintlify",           url: "https://mintlify.app/",                description: "Documentation platform of tomorrow.", image: "/lib-thumbs/services/mintlify.png" },
      { slug: "better-auth",        name: "Better Auth",        url: "https://www.better-auth.com/",         description: "Comprehensive TypeScript authentication framework.", image: "/lib-thumbs/services/better-auth.webp" },
      { slug: "ai-engineer-pack",   name: "AI Engineer Pack",   url: "https://www.aiengineerpack.com/",      description: "Curated tools to ship AI products faster.", image: "/lib-thumbs/services/ai-engineer-pack.jpeg" },
      { slug: "feature-base",       name: "Featurebase",        url: "https://www.featurebase.app/",         description: "Feedback collection, support and changelog tools.", image: "/lib-thumbs/services/Featurebase.jpeg" },
      { slug: "appwrite",           name: "Appwrite",           url: "https://appwrite.io/",                 description: "Open-source backend-as-a-service.", image: "/lib-thumbs/services/app-write.png" },
      { slug: "languine",           name: "Languine",           url: "https://languine.ai/",                 description: "Localization automation for developers." },
      { slug: "trigger-dev",        name: "Trigger.dev",        url: "https://trigger.dev/",                 description: "Background jobs, AI agents, scheduled tasks for devs.", image: "/lib-thumbs/services/trigger-dev.jpeg" },
      { slug: "umami",              name: "Umami",              url: "https://umami.is/",                    description: "Open-source analytics with a generous free tier." },
      { slug: "coolify",            name: "Coolify",            url: "https://coolify.io/",                  description: "Self-hostable Heroku / Vercel alternative.", image: "/lib-thumbs/services/coolify.jpeg" },
      { slug: "canny",              name: "Canny",              url: "https://canny.io/",                    description: "Centralize feedback, ship the right things.", image: "/lib-thumbs/services/canny.jpeg" },
      { slug: "jam",                name: "Jam",                url: "https://jam.dev/",                     description: "Bug capture for engineers, with the right context.", image: "/lib-thumbs/services/jam.jpeg" },
      { slug: "chromatic",          name: "Chromatic",          url: "https://www.chromatic.com/",           description: "Visual testing and review for web UIs." }
    ]
  },
  {
    id: "social",
    resources: [
      { slug: "daily-dev",          name: "Daily.dev",          url: "https://daily.dev/",                   description: "Professional network for developers.", image: "/lib-thumbs/social/daily-dev.jpeg" },
      { slug: "peerlist",           name: "Peerlist",           url: "https://peerlist.io/",                 description: "Showcase proof-of-work and get hired.", image: "/lib-thumbs/social/peerlist.jpeg" },
      { slug: "typefully",          name: "Typefully",          url: "https://typefully.com/",               description: "Write better content, grow audience faster.", image: "/lib-thumbs/services/typefully.png" },
      { slug: "prototypr",          name: "Prototypr",          url: "https://prototypr.io/",                description: "Write a draft, design an app, curate inspiration.", image: "/lib-thumbs/social/prototypr.png" },
      { slug: "fourthwall",         name: "Fourthwall",         url: "https://fourthwall.com/",              description: "Launch your brand on your terms.", image: "/lib-thumbs/social/fourth-wall.jpeg" },
      { slug: "microlaunch",        name: "Microlaunch",        url: "https://microlaunch.net/",             description: "Distribute products as a maker or startup." },
      { slug: "indie-hackers",      name: "Indie Hackers",      url: "https://www.indiehackers.com/",        description: "The best place to build and launch your SaaS.", image: "/lib-thumbs/social/indie-hackers.jpeg" },
      { slug: "tinylaunch",         name: "TinyLaunch",         url: "https://www.tinylaun.ch/",             description: "Discover and launch tomorrow's exciting products today." }
    ]
  }
];

export const totalLibraryCount = libraryGroups.reduce((sum, g) => sum + g.resources.length, 0);
