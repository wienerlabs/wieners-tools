import type { CatalogData } from "./types";

export const hackathonsCatalog: CatalogData = {
  id: "hackathons",
  sections: [
    {
      id: "platforms",
      resources: [
        { slug: "devpost", name: "Devpost", url: "https://devpost.com/hackathons", blurb: "Largest cross-platform hackathon directory — students + corporate + virtual." },
        { slug: "ethglobal", name: "ETHGlobal", url: "https://ethglobal.com/", blurb: "Top EVM hackathons; 1-week sprints with serious prize pools and partners." },
        { slug: "solana-hackathons", name: "Solana Foundation", url: "https://solana.com/news/categories/hackathon", blurb: "Quarterly global Solana hackathons (Renaissance, Radar, etc.)." },
        { slug: "mlh", name: "Major League Hacking", url: "https://mlh.io/", blurb: "Student-focused weekend hackathons across the US, EU, Asia." },
        { slug: "buildspace", name: "Buildspace", url: "https://buildspace.so/", blurb: "Cohort-based 6-week build sprints with mentors and demo days." },
        { slug: "ycombinator-launches", name: "YC Launches", url: "https://www.ycombinator.com/launches", blurb: "Watch what YC companies ship; reverse-engineer demand signals." }
      ]
    },
    {
      id: "showcases",
      resources: [
        { slug: "product-hunt", name: "Product Hunt", url: "https://www.producthunt.com/", blurb: "Daily product launches; great for distribution if you ship something." },
        { slug: "tinylaunch", name: "TinyLaunch", url: "https://www.tinylaun.ch/", blurb: "Indie launch board with simpler rules than PH." },
        { slug: "microlaunch", name: "Microlaunch", url: "https://microlaunch.net/", blurb: "Maker-focused launch platform; dev-friendly tone." }
      ]
    }
  ]
};
