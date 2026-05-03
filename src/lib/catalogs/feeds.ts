import type { CatalogData } from "./types";

export const feedsCatalog: CatalogData = {
  id: "feeds",
  sections: [
    {
      id: "newsletters",
      resources: [
        { slug: "bytes", name: "Bytes", url: "https://bytes.dev/", blurb: "Weekly JS newsletter from the ui.dev team. Funny, current, opinionated." },
        { slug: "console", name: "Console", url: "https://console.dev/", blurb: "Weekly digest of new dev tools, vetted by working engineers." },
        { slug: "lenny", name: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com/", blurb: "Product, growth, career insights from senior PMs and founders." },
        { slug: "tldr", name: "TLDR", url: "https://tldr.tech/", blurb: "Daily 5-min summary of tech, product, eng news. Multiple verticals." },
        { slug: "react-status", name: "React Status", url: "https://react.statuscode.com/", blurb: "Weekly React + ecosystem digest from Cooperpress." },
        { slug: "node-weekly", name: "Node Weekly", url: "https://nodeweekly.com/", blurb: "Weekly Node.js + JS server-side news." },
        { slug: "frontend-focus", name: "Frontend Focus", url: "https://frontendfoc.us/", blurb: "Weekly frontend news, deep-dives, releases." },
        { slug: "rust-magazine", name: "This Week in Rust", url: "https://this-week-in-rust.org/", blurb: "Weekly digest of Rust ecosystem activity." },
        { slug: "golang-weekly", name: "Golang Weekly", url: "https://golangweekly.com/", blurb: "Weekly Go ecosystem news from Cooperpress." },
        { slug: "rundown-ai", name: "The Rundown AI", url: "https://www.therundown.ai/", blurb: "Daily AI news + use-cases for builders." },
        { slug: "alphasignal", name: "AlphaSignal", url: "https://alphasignal.ai/", blurb: "Weekly AI research and tooling roundup." },
        { slug: "import-ai", name: "Import AI (Jack Clark)", url: "https://jack-clark.net/", blurb: "Weekly synthesis of AI research with policy framing." }
      ]
    },
    {
      id: "podcasts",
      resources: [
        { slug: "lex", name: "Lex Fridman Podcast", url: "https://lexfridman.com/podcast/", blurb: "Long-form interviews; AI, science, philosophy guests." },
        { slug: "syntax", name: "Syntax", url: "https://syntax.fm/", blurb: "Wes Bos + Scott Tolinski on web dev, frameworks, careers." },
        { slug: "changelog", name: "The Changelog", url: "https://changelog.com/podcast", blurb: "Weekly conversations with people building open-source." },
        { slug: "dwarkesh", name: "Dwarkesh Patel", url: "https://www.dwarkeshpatel.com/podcast", blurb: "Deep technical interviews on AI, biology, history." },
        { slug: "swyx", name: "Latent Space", url: "https://www.latent.space/", blurb: "AI engineering podcast + newsletter from swyx + Alessio." },
        { slug: "20-vc", name: "20VC", url: "https://www.thetwentyminutevc.com/", blurb: "Harry Stebbings on venture, founders, scaling." }
      ]
    },
    {
      id: "youtube",
      resources: [
        { slug: "fireship", name: "Fireship", url: "https://www.youtube.com/@Fireship", blurb: "100-second crash courses on every framework + concept." },
        { slug: "theo", name: "Theo (t3.gg)", url: "https://www.youtube.com/@t3dotgg", blurb: "Hot takes + deep dives on TypeScript, React, the JS ecosystem." },
        { slug: "web-dev-simplified", name: "Web Dev Simplified", url: "https://www.youtube.com/@WebDevSimplified", blurb: "Patient JS / React / CSS tutorials, beginner-friendly." },
        { slug: "primeagen", name: "ThePrimeagen", url: "https://www.youtube.com/@ThePrimeagen", blurb: "Vim, Rust, performance, terminal lifestyle." },
        { slug: "lex-clips", name: "Anthropic", url: "https://www.youtube.com/@anthropic-ai", blurb: "Claude announcements, prompt engineering tips, research deep-dives." },
        { slug: "vercel", name: "Vercel", url: "https://www.youtube.com/@VercelHQ", blurb: "Next.js conf talks, AI SDK demos, framework deep-dives." }
      ]
    }
  ]
};
