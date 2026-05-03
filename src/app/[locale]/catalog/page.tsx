import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";
import { CATALOG_ORDER, catalogResourceCount } from "@/lib/catalogs";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
    slug: "/catalog/",
    title: page.catalogIndexPage.metaTitle,
    description: page.catalogIndexPage.metaDescription
  });
}

export default async function CatalogIndexPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const ix = page.catalogIndexPage;

  const totalCount = CATALOG_ORDER.reduce((sum, id) => sum + catalogResourceCount(id), 0);

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: ix.title, url: absoluteUrl(`/${locale}/catalog/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <section className="ws-cat-index-hero">
          <p className="ws-cat-hero-eyebrow">{ix.eyebrow}</p>
          <h1 className="ws-cat-hero-title">{ix.title}</h1>
          <p className="ws-cat-hero-intro">{ix.intro}</p>
          <p className="ws-cat-hero-count">
            <strong>{totalCount}</strong> {ix.countSuffix}
          </p>
          <p className="ws-cat-hero-audience">{ix.audience}</p>
        </section>

        <ul className="ws-cat-index-grid">
          {CATALOG_ORDER.map((id) => {
            const meta = page.catalogs[id];
            const count = catalogResourceCount(id);
            return (
              <li key={id} className="ws-cat-index-li">
                <Link href={`/${locale}/catalog/${id}/`} className="ws-cat-index-card">
                  <header className="ws-cat-index-card-head">
                    <h2 className="ws-cat-index-card-title">{meta.title}</h2>
                    <span className="ws-cat-index-card-cta" aria-hidden="true">
                      <ArrowUpRight size={16} />
                    </span>
                  </header>
                  <p className="ws-cat-index-card-intro">{meta.intro}</p>
                  <span className="ws-cat-index-card-count">
                    {count} {ix.countSuffix}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </SiteShell>
    </>
  );
}
