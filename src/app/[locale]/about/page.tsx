import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";

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
    slug: "/about/",
    title: page.about.title,
    description: page.about.intro
  });
}

export default async function AboutPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: page.about.title, url: absoluteUrl(`/${locale}/about/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <article className="ws-doc">
          <p className="ws-doc-eyebrow">{page.hero.eyebrow}</p>
          <h1>{page.about.title}</h1>
          <p className="ws-doc-intro">{page.about.intro}</p>

          <div className="ws-doc-sections">
            {page.about.sections.map((section) => (
              <section key={section.title} className="ws-doc-card">
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>

          <a className="ws-button ws-button-primary" href={page.about.ctaUrl} target="_blank" rel="noreferrer">
            {page.about.ctaLabel}
          </a>
        </article>
      </SiteShell>
    </>
  );
}
