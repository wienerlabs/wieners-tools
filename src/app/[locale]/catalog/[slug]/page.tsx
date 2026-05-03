import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { CatalogCard } from "@/components/catalog-card";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";
import {
  CATALOG_ORDER,
  catalogResourceCount,
  getCatalog,
  isCatalogId,
  type CatalogId
} from "@/lib/catalogs";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CATALOG_ORDER.map((slug) => ({ locale, slug }))
  );
}

async function getParams(params: PageProps["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (!isCatalogId(slug)) notFound();
  return { locale: locale as Locale, slug: slug as CatalogId };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await getParams(params);
  const page = content[locale];
  const meta = page.catalogs[slug];
  return buildPageMetadata({
    locale,
    slug: `/catalog/${slug}/`,
    title: `${meta.title} — Wiener's Tools`,
    description: meta.intro
  });
}

export default async function CatalogDetailPage({ params }: PageProps) {
  const { locale, slug } = await getParams(params);
  const page = content[locale];
  const meta = page.catalogs[slug];
  const labels = page.catalogLabels;
  const catalog = getCatalog(slug);
  const totalCount = catalogResourceCount(slug);

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: page.catalogIndexPage.title, url: absoluteUrl(`/${locale}/catalog/`) },
    { name: meta.title, url: absoluteUrl(`/${locale}/catalog/${slug}/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <section className="ws-cat-hero">
          <Link href={`/${locale}/catalog/`} className="ws-cat-back">
            <ArrowLeft size={14} />
            <span>{labels.back}</span>
          </Link>
          <p className="ws-cat-hero-eyebrow">{meta.nav}</p>
          <h1 className="ws-cat-hero-title">{meta.title}</h1>
          <p className="ws-cat-hero-intro">{meta.intro}</p>
          <p className="ws-cat-hero-count">
            <strong>{totalCount}</strong> {page.catalogIndexPage.countSuffix}
          </p>
        </section>

        <section className="ws-cat-list">
          {catalog.sections.map((section) => (
            <section key={section.id} id={section.id} className="ws-cat-group">
              <header className="ws-cat-group-head">
                <h2 className="ws-cat-group-title">
                  {meta.sectionLabels[section.id] ?? section.id}
                </h2>
                <span className="ws-cat-group-count">
                  {section.resources.length} {page.catalogIndexPage.countSuffix}
                </span>
              </header>
              <div className="ws-cat-cards">
                {section.resources.map((resource) => (
                  <CatalogCard
                    key={resource.slug}
                    resource={resource}
                    labels={{
                      copy: labels.copy,
                      copied: labels.copied,
                      install: labels.install,
                      config: labels.config,
                      open: labels.open
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      </SiteShell>
    </>
  );
}
