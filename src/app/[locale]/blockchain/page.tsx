import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Download, Sparkles, Zap } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { BlockchainResourceCard } from "@/components/blockchain-resource-card";
import { content } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";
import { networks } from "@/lib/blockchain";

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
    slug: "/blockchain/",
    title: page.blockchainPage.metaTitle,
    description: page.blockchainPage.metaDescription
  });
}

export default async function BlockchainPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];
  const bp = page.blockchainPage;

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: bp.title, url: absoluteUrl(`/${locale}/blockchain/`) }
  ]);

  const cardLabels = {
    whyVibe: bp.networkLabels.whyVibe,
    install: bp.networkLabels.install,
    example: bp.networkLabels.example,
    promptHeading: bp.networkLabels.promptHeading,
    promptHelp: bp.networkLabels.promptHelp,
    copyPrompt: bp.networkLabels.copyPrompt,
    copied: bp.networkLabels.copied,
    openLink: bp.networkLabels.openLink,
    openDocs: bp.networkLabels.openDocs
  };

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <section className="ws-bc-hero">
          <p className="ws-bc-hero-eyebrow">{bp.eyebrow}</p>
          <h1 className="ws-bc-hero-title">{bp.title}</h1>
          <p className="ws-bc-hero-intro">{bp.intro}</p>
          <ul className="ws-bc-hero-badges">
            {bp.vibeBadges.map((b) => (
              <li key={b} className="ws-bc-hero-badge">
                <Zap size={12} aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className="ws-bc-hero-audience">{bp.audience}</p>
        </section>

        <section className="ws-bc-agentic">
          <div className="ws-bc-agentic-inner">
            <div className="ws-bc-agentic-head">
              <span className="ws-bc-agentic-icon" aria-hidden="true"><Sparkles size={20} /></span>
              <p className="ws-bc-agentic-eyebrow">{bp.agentic.eyebrow}</p>
              <h2 className="ws-bc-agentic-title">{bp.agentic.title}</h2>
            </div>
            <p className="ws-bc-agentic-body">{bp.agentic.body}</p>
            <blockquote className="ws-bc-agentic-quote">&ldquo;{bp.agentic.quote}&rdquo;</blockquote>
            <a
              href={bp.agentic.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="ws-bc-agentic-cta"
            >
              <span>{bp.agentic.ctaLabel}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section className="ws-bc-list">
          {networks.map((network) => {
            const overrides = bp.networkOverrides[network.id];
            return (
              <article
                key={network.id}
                className={`ws-bc-network ws-bc-network-${network.id}`}
                style={
                  {
                    ["--bc-primary" as string]: network.primaryColor,
                    ["--bc-accent" as string]: network.accentColor ?? network.primaryColor
                  } as React.CSSProperties
                }
              >
                <header className="ws-bc-network-head">
                  <div className="ws-bc-network-brand">
                    <img
                      src={network.squareSrc}
                      alt={`${network.name} mark`}
                      className="ws-bc-network-mark"
                      width={56}
                      height={56}
                    />
                    <div className="ws-bc-network-meta">
                      <h2 className="ws-bc-network-name">{network.name}</h2>
                      <p className="ws-bc-network-tagline">{overrides.tagline}</p>
                    </div>
                  </div>
                  <div className="ws-bc-network-actions">
                    <a className="ws-bc-pill" href={network.docsUrl} target="_blank" rel="noreferrer">
                      {bp.networkLabels.docs} <ArrowUpRight size={14} />
                    </a>
                    <a className="ws-bc-pill" href={network.ecosystemUrl} target="_blank" rel="noreferrer">
                      {bp.networkLabels.visitSite} <ArrowUpRight size={14} />
                    </a>
                    <a className="ws-bc-pill" href={network.brandKitUrl} target="_blank" rel="noreferrer">
                      {bp.networkLabels.brandKit} <ArrowUpRight size={14} />
                    </a>
                  </div>
                </header>

                <p className="ws-bc-network-about">{overrides.about}</p>

                <div className="ws-bc-network-vibe">
                  <span className="ws-bc-network-vibe-tag">⚡ {bp.networkLabels.whyVibe}</span>
                  <p>{overrides.vibePitch}</p>
                </div>

                <div className="ws-bc-network-logo-strip">
                  <img
                    src={network.logoSrc}
                    alt={`${network.name} logo`}
                    className="ws-bc-network-logo"
                  />
                </div>

                <section className="ws-bc-brand-kit">
                  <header className="ws-bc-brand-kit-head">
                    <h3>{bp.networkLabels.brandKitTitle}</h3>
                    <p>{bp.networkLabels.brandKitNote}</p>
                  </header>
                  <ul className="ws-bc-brand-kit-grid">
                    {network.brandAssets.map((asset) => (
                      <li
                        key={asset.filename}
                        className={`ws-bc-brand-kit-card ws-bc-brand-kit-bg-${asset.bg}`}
                      >
                        <div className="ws-bc-brand-kit-thumb">
                          <img src={asset.src} alt={asset.label} />
                        </div>
                        <div className="ws-bc-brand-kit-meta">
                          <span className="ws-bc-brand-kit-label">{asset.label}</span>
                          <span className="ws-bc-brand-kit-file">{asset.filename}</span>
                          <a
                            href={asset.src}
                            download={asset.filename}
                            className="ws-bc-brand-kit-dl"
                          >
                            <Download size={12} />
                            <span>{bp.networkLabels.downloadLabel}</span>
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="ws-bc-modules">
                  <h3 className="ws-bc-modules-title">{bp.networkLabels.sectionsTitle}</h3>
                  {network.sections.map((section) => (
                    <div key={section.id} className="ws-bc-modules-section">
                      <h4 className="ws-bc-modules-section-title">{bp.sectionLabels[section.id]}</h4>
                      <div className="ws-bc-modules-list">
                        {section.resources.map((resource) => (
                          <BlockchainResourceCard
                            key={resource.url + resource.name}
                            resource={resource}
                            labels={cardLabels}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              </article>
            );
          })}
        </section>

        <p className="ws-bc-foot">
          <Link href={`/${locale}/feedback/`}>{page.feedback.title}</Link>
        </p>
      </SiteShell>
    </>
  );
}
