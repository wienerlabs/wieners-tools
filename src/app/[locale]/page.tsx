import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { ToolCard } from "@/components/tool-card";
import FallingText from "@/components/falling-text";
import { content } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata, organizationSchema, webApplicationSchema, websiteSchema } from "@/lib/site";
import { categoryOrder, localizedCategory } from "@/lib/tools/categories";
import { tools } from "@/lib/tools/registry";
import { getBundle } from "@/lib/tools/i18n";

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
    keywords: ["image tools", "browser image", "compress", "convert", "pixelart", "qr code"]
  });
}

export default async function LocaleHome({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const bundle = getBundle(locale);

  return (
    <>
      <SeoJsonLd data={[organizationSchema(), websiteSchema(), webApplicationSchema(locale)]} />
      <SiteShell locale={locale}>
        <section className="ws-hero">
          <p className="ws-hero-eyebrow">{page.hero.eyebrow}</p>
          <h1 className="ws-hero-title">{page.hero.title}</h1>
          <p className="ws-hero-subtitle">{page.hero.subtitle}</p>
          <div className="ws-hero-ctas">
            <a href="#tools" className="ws-button ws-button-primary">
              {page.hero.primaryCta}
            </a>
            <a href={`/${locale}/about/`} className="ws-button ws-button-ghost">
              {page.hero.secondaryCta}
            </a>
          </div>
          <div className="ws-hero-proof">
            {page.hero.proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section id="tools" className="ws-section">
          <header className="ws-section-head">
            <p className="ws-section-eyebrow">{page.toolsSection.eyebrow}</p>
            <h2 className="ws-section-title">{page.toolsSection.title}</h2>
            <p className="ws-section-intro">{page.toolsSection.intro}</p>
          </header>

          {categoryOrder.map((catId) => {
            const cat = localizedCategory(locale, catId);
            const items = tools.filter((t) => t.category === catId);
            return (
              <section key={catId} className="ws-category">
                <header className="ws-category-head">
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                </header>
                <div className="ws-card-grid">
                  {items.map((tool) => (
                    <ToolCard key={tool.slug} locale={locale} tool={tool} i18n={bundle[tool.slug]} />
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        <section className="ws-section ws-falling-section">
          <header className="ws-section-head">
            <p className="ws-section-eyebrow">{page.fallingHero.eyebrow}</p>
            <h2 className="ws-section-title">{page.about.title}</h2>
            <p className="ws-section-intro">{page.fallingHero.hint}</p>
          </header>
          <div className="ws-falling-stage">
            <FallingText
              text={page.fallingHero.text}
              highlightWords={page.fallingHero.highlightWords}
              highlightClass="ft-highlighted"
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="2rem"
              mouseConstraintStiffness={0.9}
            />
          </div>
        </section>
      </SiteShell>
    </>
  );
}
