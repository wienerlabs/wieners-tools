import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";
import { libraryGroups, totalLibraryCount } from "@/lib/library";

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
    slug: "/library/",
    title: page.libraryPage.metaTitle,
    description: page.libraryPage.metaDescription
  });
}

function initialLetter(name: string) {
  return name.replace(/[^A-Za-z0-9]/g, "").charAt(0).toUpperCase() || "·";
}

export default async function LibraryPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const lp = page.libraryPage;

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: lp.title, url: absoluteUrl(`/${locale}/library/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <section className="ws-lib-hero">
          <p className="ws-lib-hero-eyebrow">{lp.eyebrow}</p>
          <h1 className="ws-lib-hero-title">{lp.title}</h1>
          <p className="ws-lib-hero-intro">{lp.intro}</p>
          <p className="ws-lib-hero-count">
            <strong>{totalLibraryCount}</strong> {lp.countSuffix}
          </p>
          <p className="ws-lib-hero-audience">{lp.audience}</p>
        </section>

        <section className="ws-lib-list">
          {libraryGroups.map((group) => (
            <section key={group.id} id={group.id} className="ws-lib-group">
              <header className="ws-lib-group-head">
                <h2 className="ws-lib-group-title">{lp.sectionLabels[group.id]}</h2>
                <span className="ws-lib-group-count">
                  {group.resources.length} {lp.countSuffix}
                </span>
              </header>

              <ul className="ws-lib-grid">
                {group.resources.map((resource) => (
                  <li key={resource.slug} className="ws-lib-card-li">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ws-lib-card"
                    >
                      <div className="ws-lib-card-thumb">
                        {resource.image ? (
                          <img
                            src={resource.image}
                            alt={`${resource.name} preview`}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className="ws-lib-card-fallback" aria-hidden="true">
                            {initialLetter(resource.name)}
                          </span>
                        )}
                      </div>
                      <div className="ws-lib-card-meta">
                        <header className="ws-lib-card-head">
                          <h3 className="ws-lib-card-title">{resource.name}</h3>
                          <span className="ws-lib-card-cta" aria-hidden="true">
                            <ArrowUpRight size={14} />
                          </span>
                        </header>
                        <p className="ws-lib-card-desc">{resource.description}</p>
                        <span className="ws-lib-card-domain">
                          {new URL(resource.url).host.replace(/^www\./, "")}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>

        <p className="ws-lib-attribution">
          {lp.attribution}{" "}
          <a href="https://arca.directory/" target="_blank" rel="noreferrer">
            arca.directory
          </a>
        </p>
      </SiteShell>
    </>
  );
}
