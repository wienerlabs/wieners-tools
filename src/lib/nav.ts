import type { Locale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { githubUrl } from "@/lib/site";
import { categoryOrder, localizedCategory } from "@/lib/tools/categories";

export type NavLink = { label: string; href: string; external?: boolean };
export type NavGroup = { title: string; links: NavLink[] };

export function navFor(locale: Locale) {
  const ui = content[locale];
  const base = `/${locale}`;

  const tools: NavGroup = {
    title: ui.toolsSection.eyebrow,
    links: [
      { label: ui.nav.allTools, href: `${base}/#tools` },
      ...categoryOrder.map((id) => ({ label: localizedCategory(locale, id).name, href: `${base}/#${id}` }))
    ]
  };

  const resources: NavGroup = {
    title: ui.nav.resources,
    links: [
      { label: ui.libraryPage.nav, href: `${base}/library/` },
      { label: ui.catalogIndexPage.nav, href: `${base}/catalog/` },
      { label: ui.blockchainPage.nav, href: `${base}/blockchain/` },
      { label: ui.fontsPage.nav, href: `${base}/fonts/` },
      { label: ui.glossaryPage.nav, href: `${base}/glossary/` },
      { label: ui.gallery.nav, href: `${base}/components/` }
    ]
  };

  const more: NavGroup = {
    title: ui.nav.more,
    links: [
      { label: "Architect", href: `${base}/tools/architect/` },
      { label: "Wiener DL", href: `${base}/tools/video-downloader/` },
      { label: ui.nav.about, href: `${base}/about/` },
      { label: ui.feedback.title, href: `${base}/feedback/` },
      { label: "GitHub", href: githubUrl, external: true },
      { label: "Wiener Labs", href: "https://wienerlabs.xyz", external: true }
    ]
  };

  const primary: NavLink[] = [
    { label: ui.toolsSection.eyebrow, href: `${base}/` },
    { label: ui.libraryPage.nav, href: `${base}/library/` },
    { label: ui.catalogIndexPage.nav, href: `${base}/catalog/` }
  ];

  return { tools, resources, more, primary };
}
