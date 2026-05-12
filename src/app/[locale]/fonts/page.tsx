import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";
import { fontGroups, googleEmbedHref, totalFontCount } from "@/lib/fonts";

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
    slug: "/fonts/",
    title: page.fontsPage.metaTitle,
    description: page.fontsPage.metaDescription
  });
}

const SAMPLE_ALPHA = "Aa Bb Cc Dd Ee Ff Gg";
const SAMPLE_SENTENCE = "The quick brown fox jumps over the lazy dog.";
const SAMPLE_NUM = "1234567890 — ! @ # $ % &";

export default async function FontsPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const fp = page.fontsPage;
  const googleHref = googleEmbedHref();

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: fp.title, url: absoluteUrl(`/${locale}/fonts/`) }
  ]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {googleHref ? <link rel="stylesheet" href={googleHref} /> : null}

      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <section className="ws-fonts-hero">
          <p className="ws-fonts-hero-eyebrow">{fp.eyebrow}</p>
          <h1 className="ws-fonts-hero-title">{fp.title}</h1>
          <p className="ws-fonts-hero-intro">{fp.intro}</p>
          <p className="ws-fonts-hero-count">
            <strong>{totalFontCount}</strong> {fp.countSuffix}
          </p>
          <p className="ws-fonts-hero-note">{fp.note}</p>
        </section>

        <nav className="ws-fonts-jump" aria-label={fp.jumpLabel}>
          {fontGroups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="ws-fonts-jump-link">
              {fp.categoryLabels[g.id]}
              <span className="ws-fonts-jump-count">{g.fonts.length}</span>
            </a>
          ))}
        </nav>

        <section className="ws-fonts-list">
          {fontGroups.map((group) => (
            <section key={group.id} id={group.id} className="ws-fonts-group">
              <header className="ws-fonts-group-head">
                <h2 className="ws-fonts-group-title">{fp.categoryLabels[group.id]}</h2>
                <span className="ws-fonts-group-count">
                  {group.fonts.length} {fp.countSuffix}
                </span>
              </header>

              <ul className="ws-fonts-grid">
                {group.fonts.map((font) => {
                  const familyStack =
                    group.id === "mono"
                      ? `"${font.family}", ui-monospace, monospace`
                      : group.id === "serif"
                        ? `"${font.family}", ui-serif, serif`
                        : `"${font.family}", system-ui, sans-serif`;
                  return (
                    <li key={font.slug} className="ws-fonts-card">
                      <header className="ws-fonts-card-head">
                        <h3 className="ws-fonts-card-name">{font.name}</h3>
                        <div className="ws-fonts-card-actions">
                          {font.googleHref ? (
                            <a className="ws-bc-pill" href={font.googleHref} target="_blank" rel="noreferrer">
                              Google <ArrowUpRight size={12} />
                            </a>
                          ) : null}
                          <a className="ws-bc-pill" href={font.url} target="_blank" rel="noreferrer">
                            {fp.foundryLabel} <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </header>

                      <div className="ws-fonts-sample" style={{ fontFamily: familyStack }}>
                        <div className="ws-fonts-sample-big">{font.name}</div>
                        <div className="ws-fonts-sample-line">{SAMPLE_SENTENCE}</div>
                        <div className="ws-fonts-sample-alpha">{SAMPLE_ALPHA}</div>
                        <div className="ws-fonts-sample-num">{SAMPLE_NUM}</div>
                      </div>

                      <p className="ws-fonts-card-blurb">{font.blurb}</p>

                      <footer className="ws-fonts-card-meta">
                        <span><strong>{fp.designerLabel}:</strong> {font.designer}</span>
                        <span><strong>{fp.licenseLabel}:</strong> {font.license}</span>
                        {font.weights ? <span><strong>{fp.weightsLabel}:</strong> {font.weights}</span> : null}
                      </footer>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </section>

        <p className="ws-fonts-attribution">{fp.attribution}</p>
      </SiteShell>
    </>
  );
}
