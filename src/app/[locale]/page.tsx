import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { ToolCard } from "@/components/tool-card";
import FallingText from "@/components/falling-text";
import MagnetLines from "@/components/magnet-lines";
import Cubes from "@/components/cubes";
import TypewriterTitle from "@/components/typewriter-title";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
          <h1 className="ws-hero-title ws-hero-title-typewriter">
            <TypewriterTitle
              sequences={page.hero.typewriter.map((text, idx, arr) => ({
                text,
                deleteAfter: idx < arr.length - 1 ? true : true
              }))}
              autoLoop
              naturalVariance
            />
          </h1>
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
          <div className="ws-hero-magnet" aria-hidden="true">
            <MagnetLines
              rows={10}
              columns={12}
              containerSize="min(420px, 80vw)"
              lineColor="rgba(0, 0, 0, 0.55)"
              lineWidth="2px"
              lineHeight="22px"
              baseAngle={-10}
            />
          </div>
        </section>

        <section className="ws-components-cta" aria-labelledby="components-cta-heading">
          <Link href={`/${locale}/components/`} className="ws-components-cta-card">
            <div className="ws-components-cta-body">
              <p className="ws-components-cta-eyebrow">{page.componentsCta.eyebrow}</p>
              <h2 id="components-cta-heading" className="ws-components-cta-title">
                {page.componentsCta.title}
              </h2>
              <p className="ws-components-cta-text">{page.componentsCta.body}</p>
              <p className="ws-components-cta-note">{page.componentsCta.note}</p>
            </div>
            <span className="ws-components-cta-button" aria-hidden="true">
              <span>{page.componentsCta.ctaLabel}</span>
              <ArrowUpRight size={28} strokeWidth={1.6} />
            </span>
          </Link>
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
              <section key={catId} id={catId} className="ws-category">
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

        <section className="ws-section ws-cubes-section">
          <header className="ws-section-head">
            <p className="ws-section-eyebrow">{page.toolsSection.eyebrow}</p>
            <h2 className="ws-section-title">{page.hero.subtitle}</h2>
            <p className="ws-section-intro">{page.toolsSection.intro}</p>
          </header>
          <div className="ws-cubes-frame">
            <Cubes
              gridSize={8}
              maxAngle={28}
              radius={3}
              borderStyle="1px solid rgba(0, 0, 0, 0.18)"
              faceColor="#000000"
              rippleColor="#fff4dd"
              rippleSpeed={1.5}
              autoAnimate
              rippleOnClick
              cellSize={48}
            />
          </div>
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
