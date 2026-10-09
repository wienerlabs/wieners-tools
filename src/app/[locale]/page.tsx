import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { ToolCard } from "@/components/tool-card";
import { ToolExplorer } from "@/components/tool-explorer";
import { content } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { totalLibraryCount } from "@/lib/library";
import { CATALOG_ORDER, catalogResourceCount } from "@/lib/catalogs";
import { totalGlossaryTerms } from "@/lib/glossary";
import { totalFontCount } from "@/lib/fonts";
import { normalizeSearch } from "@/lib/search";
import { buildPageMetadata, organizationSchema, webApplicationSchema, websiteSchema } from "@/lib/site";
import { categoryOrder, localizedCategory } from "@/lib/tools/categories";
import { tools } from "@/lib/tools/registry";
import { getToolI18n } from "@/lib/tools/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

async function getLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const page = content[locale];
  return buildPageMetadata({
    locale,
    title: page.meta.title,
    description: page.meta.description,
    keywords: ["online tools", "browser tools", "image compressor", "pdf tools", "developer tools", "privacy"]
  });
}

export default async function LocaleHome({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const available = tools.filter((tool) => tool.status !== "soon");

  const index = available.map((tool) => {
    const local = getToolI18n(tool.slug, locale);
    const english = getToolI18n(tool.slug, "en");
    const text = [local.name, local.short, local.description, ...local.keywords, english.name, ...english.keywords, tool.slug.replace(/-/g, " ")].join(" ");
    return { slug: tool.slug, category: tool.category, text: normalizeSearch(text) };
  });

  const categories = categoryOrder.map((id) => ({
    id,
    name: localizedCategory(locale, id).name,
    count: available.filter((tool) => tool.category === id).length
  }));

  const catalogEntries = CATALOG_ORDER.reduce((sum, id) => sum + catalogResourceCount(id), 0);

  const resources = [
    { key: "library", label: page.libraryPage.nav, href: `/${locale}/library/`, meta: `${totalLibraryCount} ${page.libraryPage.countSuffix}` },
    { key: "catalog", label: page.catalogIndexPage.nav, href: `/${locale}/catalog/`, meta: `${catalogEntries} ${page.catalogIndexPage.countSuffix}` },
    { key: "blockchain", label: page.blockchainPage.nav, href: `/${locale}/blockchain/` },
    { key: "fonts", label: page.fontsPage.nav, href: `/${locale}/fonts/`, meta: `${totalFontCount} ${page.fontsPage.countSuffix}` },
    { key: "glossary", label: page.glossaryPage.nav, href: `/${locale}/glossary/`, meta: `${totalGlossaryTerms} ${page.glossaryPage.countSuffix}` },
    { key: "components", label: page.gallery.nav, href: `/${locale}/components/` }
  ] as const;

  return (
    <>
      <SeoJsonLd data={[organizationSchema(), websiteSchema(), webApplicationSchema(locale)]} />
      <SiteShell locale={locale}>
        <section className="ws-page-hero ws-home-hero">
          <p className="ws-eyebrow">{page.hero.eyebrow.replace("{count}", String(available.length))}</p>
          <h1 className="ws-display">{page.hero.title}</h1>
          <p className="ws-lead">{page.hero.subtitle}</p>
        </section>

        <ToolExplorer
          categories={categories}
          tools={index}
          labels={{ search: page.toolsSection.searchPlaceholder, all: page.toolsSection.all, empty: page.toolsSection.empty }}
        >
          {categoryOrder.map((id) => {
            const category = localizedCategory(locale, id);
            return (
              <section key={id} id={id} className="ws-category" data-category={id}>
                <header className="ws-category-head">
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </header>
                <ul className="ws-card-grid">
                  {available
                    .filter((tool) => tool.category === id)
                    .map((tool) => (
                      <li key={tool.slug} data-slug={tool.slug}>
                        <ToolCard locale={locale} tool={tool} i18n={getToolI18n(tool.slug, locale)} />
                      </li>
                    ))}
                </ul>
              </section>
            );
          })}
        </ToolExplorer>

        <section className="ws-home-resources" aria-labelledby="resources-title">
          <header className="ws-home-resources-head">
            <p className="ws-eyebrow">{page.home.resourcesEyebrow}</p>
            <h2 id="resources-title">{page.home.resourcesTitle}</h2>
          </header>
          <ul className="ws-resource-grid">
            {resources.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="ws-resource-card">
                  <span className="ws-resource-top">
                    <span className="ws-resource-name">{item.label}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                  <span className="ws-resource-desc">{page.home.resources[item.key]}</span>
                  {"meta" in item ? <span className="ws-resource-count">{item.meta}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </SiteShell>
    </>
  );
}
