import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";
import { glossaryByLetter, glossaryLetters, totalGlossaryTerms } from "@/lib/glossary";

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
    slug: "/glossary/",
    title: page.glossaryPage.metaTitle,
    description: page.glossaryPage.metaDescription
  });
}

export default async function GlossaryPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const gp = page.glossaryPage;

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: gp.title, url: absoluteUrl(`/${locale}/glossary/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <section className="ws-glossary-hero">
          <p className="ws-glossary-hero-eyebrow">{gp.eyebrow}</p>
          <h1 className="ws-glossary-hero-title">{gp.title}</h1>
          <p className="ws-glossary-hero-intro">{gp.intro}</p>
          <p className="ws-glossary-hero-count">
            <strong>{totalGlossaryTerms}</strong> {gp.countSuffix}
          </p>
        </section>

        <nav className="ws-glossary-jump" aria-label={gp.jumpLabel}>
          {glossaryLetters.map((letter) => (
            <a key={letter} href={`#letter-${letter}`} className="ws-glossary-jump-letter">
              {letter}
            </a>
          ))}
        </nav>

        <section className="ws-glossary-list">
          {glossaryLetters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="ws-glossary-letter-block">
              <header className="ws-glossary-letter-head">
                <h2>{letter}</h2>
                <span className="ws-glossary-letter-count">
                  {glossaryByLetter[letter].length} {gp.countSuffix}
                </span>
              </header>
              <dl className="ws-glossary-defs">
                {glossaryByLetter[letter].map((t) => (
                  <div key={t.slug} id={t.slug} className="ws-glossary-entry">
                    <dt className="ws-glossary-term">
                      {t.term}
                      {t.link ? (
                        <a className="ws-glossary-term-link" href={t.link} target="_blank" rel="noreferrer" aria-label={`${t.term} reference`}>
                          <ArrowUpRight size={12} />
                        </a>
                      ) : null}
                    </dt>
                    <dd className="ws-glossary-def">
                      {t.definition}
                      {t.related && t.related.length > 0 ? (
                        <span className="ws-glossary-related">
                          {gp.relatedLabel}:{" "}
                          {t.related.map((slug, i) => (
                            <span key={slug}>
                              <a href={`#${slug}`}>{slug.replace(/-/g, " ")}</a>
                              {i < t.related!.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </section>
      </SiteShell>
    </>
  );
}
