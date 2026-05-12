export type FontCategoryId = "mono" | "sans" | "serif" | "display" | "pixel";

export type Font = {
  slug: string;
  name: string;
  family: string;
  designer: string;
  license: string;
  url: string;
  googleHref?: string;
  weights?: string;
  blurb: string;
  installCmd?: string;
  sample?: string;
};

export type FontGroup = {
  id: FontCategoryId;
  fonts: Font[];
};

export const fontGroups: FontGroup[] = [
  {
    id: "mono",
    fonts: [
      { slug: "jetbrains-mono", name: "JetBrains Mono", family: "JetBrains Mono", designer: "JetBrains", license: "OFL", url: "https://www.jetbrains.com/lp/mono/", googleHref: "https://fonts.google.com/specimen/JetBrains+Mono", weights: "100–800", blurb: "Editor-grade with code ligatures, generous x-height. Daily driver for many JetBrains and VS Code users." },
      { slug: "fira-code", name: "Fira Code", family: "Fira Code", designer: "Nikita Prokopov", license: "OFL", url: "https://github.com/tonsky/FiraCode", googleHref: "https://fonts.google.com/specimen/Fira+Code", weights: "300–700", blurb: "The original ligature font that made `=>` and `!=` look right. Still a great default." },
      { slug: "monaspace", name: "Monaspace", family: "Monaspace Neon", designer: "GitHub Next", license: "OFL", url: "https://monaspace.githubnext.com/", weights: "200–800", blurb: "Five matched mono variants (Neon, Argon, Xenon, Radon, Krypton) you can mix in one file. Texture healing fixes letter-pair gaps." },
      { slug: "geist-mono", name: "Geist Mono", family: "Geist Mono", designer: "Vercel", license: "OFL", url: "https://vercel.com/font", googleHref: "https://fonts.google.com/specimen/Geist+Mono", weights: "100–900", blurb: "Vercel's mono companion to Geist Sans. Clean, modern, free." },
      { slug: "ibm-plex-mono", name: "IBM Plex Mono", family: "IBM Plex Mono", designer: "IBM / Bold Monkey", license: "OFL", url: "https://www.ibm.com/plex/", googleHref: "https://fonts.google.com/specimen/IBM+Plex+Mono", weights: "100–700", blurb: "Corporate-polished mono with broad weight coverage. Great in long-form code blocks." },
      { slug: "cascadia-code", name: "Cascadia Code", family: "Cascadia Code", designer: "Microsoft", license: "OFL", url: "https://github.com/microsoft/cascadia-code", weights: "200–700", blurb: "Microsoft's terminal font, made for Windows Terminal and VS Code. Has a Cursive italic variant." },
      { slug: "commit-mono", name: "Commit Mono", family: "Commit Mono", designer: "Eigil Nikolajsen", license: "OFL", url: "https://commitmono.com/", weights: "300–700", blurb: "Anonymous-feeling neutral mono. Pairs well with humanist sans bodies." },
      { slug: "iosevka", name: "Iosevka", family: "Iosevka", designer: "Renzhi Li", license: "OFL", url: "https://typeof.net/Iosevka/", weights: "100–900", blurb: "Narrow, tall, hyper-configurable. Build your own variant from the source if defaults don't fit." },
      { slug: "recursive-mono", name: "Recursive Mono", family: "Recursive Mono", designer: "Stephen Nixon / Arrow Type", license: "OFL", url: "https://www.recursive.design/", googleHref: "https://fonts.google.com/specimen/Recursive", weights: "300–1000", blurb: "Variable axes for weight and 'casual'. Same family does code AND UI." },
      { slug: "maple-mono", name: "Maple Mono", family: "Maple Mono", designer: "Subframe7536", license: "OFL", url: "https://github.com/subframe7536/maple-font", weights: "300–700", blurb: "Round, friendly, CJK-aware. Strong ligatures with optional 'NL' (no ligatures) variant." },
      { slug: "departure-mono", name: "Departure Mono", family: "Departure Mono", designer: "Helena Zhang", license: "OFL", url: "https://departuremono.com/", weights: "Regular", blurb: "Retro-computing pixel mono. Great for terminal-themed designs and pixel art typography." },
      { slug: "berkeley-mono", name: "Berkeley Mono", family: "Berkeley Mono", designer: "U.S. Graphics Co.", license: "Commercial", url: "https://usgraphics.com/products/berkeley-mono", weights: "Regular + Bold", blurb: "Paid, premium mono with strong design-thinking. Beautiful in Ghostty and tmux." }
    ]
  },
  {
    id: "sans",
    fonts: [
      { slug: "inter", name: "Inter", family: "Inter", designer: "Rasmus Andersson", license: "OFL", url: "https://rsms.me/inter/", googleHref: "https://fonts.google.com/specimen/Inter", weights: "100–900", blurb: "The default sans for UI work in the last decade. Pretty much unmissable, ships variable + display variants." },
      { slug: "geist", name: "Geist", family: "Geist", designer: "Vercel", license: "OFL", url: "https://vercel.com/font", googleHref: "https://fonts.google.com/specimen/Geist", weights: "100–900", blurb: "Vercel's house font. Geometric, modern, free. Pairs naturally with Geist Mono." },
      { slug: "host-grotesk", name: "Host Grotesk", family: "Host Grotesk", designer: "Joao Pinheiro", license: "OFL", url: "https://hostgrotesk.com/", googleHref: "https://fonts.google.com/specimen/Host+Grotesk", weights: "300–800", blurb: "Wiener Tools' own headline font. Crisp grotesk with personality at large sizes." },
      { slug: "manrope", name: "Manrope", family: "Manrope", designer: "Mikhail Sharanda", license: "OFL", url: "https://manropefont.com/", googleHref: "https://fonts.google.com/specimen/Manrope", weights: "200–800", blurb: "Friendly, slightly rounded geometric. Reads well at small sizes." },
      { slug: "satoshi", name: "Satoshi", family: "Satoshi", designer: "Indian Type Foundry", license: "Free + commercial", url: "https://www.fontshare.com/fonts/satoshi", weights: "300–900", blurb: "Modernist sans with bold confidence. Default headline option on many indie sites in 2024–25." },
      { slug: "switzer", name: "Switzer", family: "Switzer", designer: "Indian Type Foundry", license: "Free + commercial", url: "https://www.fontshare.com/fonts/switzer", weights: "100–900", blurb: "Neutral Swiss-style sans, cleaner than Helvetica and friendlier than Inter." },
      { slug: "outfit", name: "Outfit", family: "Outfit", designer: "Smartsheet", license: "OFL", url: "https://www.outfitlondon.com/", googleHref: "https://fonts.google.com/specimen/Outfit", weights: "100–900", blurb: "Geometric, slightly playful. Good when you want clean without sterile." },
      { slug: "plus-jakarta", name: "Plus Jakarta Sans", family: "Plus Jakarta Sans", designer: "Tokotype", license: "OFL", url: "https://github.com/tokotype/PlusJakartaSans", googleHref: "https://fonts.google.com/specimen/Plus+Jakarta+Sans", weights: "200–800", blurb: "Indonesian-designed grotesk, wide x-height, very legible in long body." },
      { slug: "onest", name: "Onest", family: "Onest", designer: "Reslav Khristich / Talgat Baizhanov", license: "OFL", url: "https://github.com/onelogica/onest", googleHref: "https://fonts.google.com/specimen/Onest", weights: "100–900", blurb: "Recent open grotesk, optical-size aware. Used by Linear and several modern dashboards." },
      { slug: "space-grotesk", name: "Space Grotesk", family: "Space Grotesk", designer: "Florian Karsten", license: "OFL", url: "https://floriankarsten.com/space-grotesk", googleHref: "https://fonts.google.com/specimen/Space+Grotesk", weights: "300–700", blurb: "Wider, slightly quirky. Great for tech-brand headlines that want personality." }
    ]
  },
  {
    id: "serif",
    fonts: [
      { slug: "instrument-serif", name: "Instrument Serif", family: "Instrument Serif", designer: "Instrument", license: "OFL", url: "https://fonts.google.com/specimen/Instrument+Serif", googleHref: "https://fonts.google.com/specimen/Instrument+Serif", weights: "Regular + Italic", blurb: "Headline-only didone serif. The 'Linear pricing page' font on every modern landing in 2024–25." },
      { slug: "fraunces", name: "Fraunces", family: "Fraunces", designer: "Undercase Type", license: "OFL", url: "https://fonts.google.com/specimen/Fraunces", googleHref: "https://fonts.google.com/specimen/Fraunces", weights: "100–900", blurb: "Variable serif with adjustable softness + opsz. From compact body to soft heroes." },
      { slug: "newsreader", name: "Newsreader", family: "Newsreader", designer: "Production Type", license: "OFL", url: "https://fonts.google.com/specimen/Newsreader", googleHref: "https://fonts.google.com/specimen/Newsreader", weights: "200–800", blurb: "Editorial workhorse. Reads well on screen at body sizes, nice at display sizes too." },
      { slug: "source-serif", name: "Source Serif", family: "Source Serif 4", designer: "Frank Grießhammer", license: "OFL", url: "https://github.com/adobe-fonts/source-serif", googleHref: "https://fonts.google.com/specimen/Source+Serif+4", weights: "200–900", blurb: "Adobe's free serif companion to Source Sans. Calm, readable, neutral." },
      { slug: "cormorant", name: "Cormorant", family: "Cormorant Garamond", designer: "Christian Thalmann", license: "OFL", url: "https://github.com/CatharsisFonts/Cormorant", googleHref: "https://fonts.google.com/specimen/Cormorant+Garamond", weights: "300–700", blurb: "Garamond-inspired display serif. Elegant for editorial covers and luxury brands." },
      { slug: "libre-caslon", name: "Libre Caslon Text", family: "Libre Caslon Text", designer: "Pablo Impallari / Rodrigo Fuenzalida", license: "OFL", url: "https://fonts.google.com/specimen/Libre+Caslon+Text", googleHref: "https://fonts.google.com/specimen/Libre+Caslon+Text", weights: "400, 700 + italics", blurb: "Classic Caslon revival, free. Great for long-form essays and book-style layouts." }
    ]
  },
  {
    id: "display",
    fonts: [
      { slug: "boldonse", name: "Boldonse", family: "Boldonse", designer: "Atelier Triay", license: "OFL", url: "https://fonts.google.com/specimen/Boldonse", googleHref: "https://fonts.google.com/specimen/Boldonse", weights: "Regular", blurb: "Big, blocky, brutalist headline face. Drops with confidence on hero sections." },
      { slug: "tasa-orbiter", name: "Tasa Orbiter", family: "Tasa Orbiter Display", designer: "Tasa Type Foundry", license: "Free + commercial", url: "https://www.fontshare.com/fonts/tasa-orbiter", weights: "100–900", blurb: "Modernist display with strong geometric bones. Pairs with mono bodies." },
      { slug: "anton", name: "Anton", family: "Anton", designer: "Vernon Adams", license: "OFL", url: "https://fonts.google.com/specimen/Anton", googleHref: "https://fonts.google.com/specimen/Anton", weights: "Regular", blurb: "Condensed bold sans for posters and editorial covers. Free workhorse." },
      { slug: "caprasimo", name: "Caprasimo", family: "Caprasimo", designer: "Sebastian Yoffe", license: "OFL", url: "https://fonts.google.com/specimen/Caprasimo", googleHref: "https://fonts.google.com/specimen/Caprasimo", weights: "Regular", blurb: "Friendly, retro-quirky display. Reads warmer than most modern displays." },
      { slug: "climate-crisis", name: "Climate Crisis", family: "Climate Crisis", designer: "Helsingin Sanomat / Daniel Coull", license: "OFL", url: "https://fonts.google.com/specimen/Climate+Crisis", googleHref: "https://fonts.google.com/specimen/Climate+Crisis", weights: "Variable", blurb: "Variable axis goes from 1979 (solid) to 2050 (eroded). Designed for climate-crisis editorial use." },
      { slug: "funnel-display", name: "Funnel Display", family: "Funnel Display", designer: "Ralu Codreanu", license: "OFL", url: "https://fonts.google.com/specimen/Funnel+Display", googleHref: "https://fonts.google.com/specimen/Funnel+Display", weights: "300–800", blurb: "Recent crisp display sans with soft details. Strong default for SaaS heroes." }
    ]
  },
  {
    id: "pixel",
    fonts: [
      { slug: "press-start-2p", name: "Press Start 2P", family: "Press Start 2P", designer: "CodeMan38", license: "OFL", url: "https://fonts.google.com/specimen/Press+Start+2P", googleHref: "https://fonts.google.com/specimen/Press+Start+2P", weights: "Regular", blurb: "8-bit NES-era pixel font. Use sparingly, hits nostalgia button hard." },
      { slug: "vt323", name: "VT323", family: "VT323", designer: "Peter Hull", license: "OFL", url: "https://fonts.google.com/specimen/VT323", googleHref: "https://fonts.google.com/specimen/VT323", weights: "Regular", blurb: "DEC VT320 terminal revival. Long lines, glowing CRT vibe." },
      { slug: "silkscreen", name: "Silkscreen", family: "Silkscreen", designer: "Jason Kottke", license: "OFL", url: "https://fonts.google.com/specimen/Silkscreen", googleHref: "https://fonts.google.com/specimen/Silkscreen", weights: "Regular + Bold", blurb: "Sharp pixel font for buttons and chip-like UI accents. Tiny but legible." },
      { slug: "pixelify-sans", name: "Pixelify Sans", family: "Pixelify Sans", designer: "Stefie Justprince", license: "OFL", url: "https://fonts.google.com/specimen/Pixelify+Sans", googleHref: "https://fonts.google.com/specimen/Pixelify+Sans", weights: "400–700", blurb: "Modern pixel face with multiple weights. Easier to read than Press Start 2P." },
      { slug: "major-mono-display", name: "Major Mono Display", family: "Major Mono Display", designer: "Emily Lime", license: "OFL", url: "https://fonts.google.com/specimen/Major+Mono+Display", googleHref: "https://fonts.google.com/specimen/Major+Mono+Display", weights: "Regular", blurb: "All-caps mono display, alt-tech vibe. Pairs with grotesk body for editorial covers." }
    ]
  }
];

export const allFonts = fontGroups.flatMap((g) => g.fonts);
export const totalFontCount = allFonts.length;

const GOOGLE_PARAM_RE = /^https:\/\/fonts\.google\.com\/specimen\/([^/?#]+)/;

export function googleEmbedHref(): string {
  const families: string[] = [];
  for (const f of allFonts) {
    if (!f.googleHref) continue;
    const m = GOOGLE_PARAM_RE.exec(f.googleHref);
    if (!m) continue;
    const familyParam = m[1];
    families.push(`family=${familyParam}:wght@400;700`);
  }
  if (families.length === 0) return "";
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}
