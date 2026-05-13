import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localeLabels, localeNames, locales } from "@/lib/i18n";
import { content } from "@/lib/content";
import { getLegalLinks } from "@/lib/legal";
import { LanguageSwitcher } from "@/components/language-switcher";
import CardNav from "@/components/card-nav";

type SiteShellProps = {
  locale: Locale;
  children: React.ReactNode;
  variant?: "wide" | "compact";
};

export function SiteHeader({ locale }: { locale: Locale }) {
  const ui = content[locale];
  const languageOptions = locales
    .filter((item) => item !== locale)
    .map((item) => ({
      href: `/${item}/`,
      label: localeNames[item]
    }));

  return (
    <CardNav
      logo="/logo.jpg"
      logoAlt="Wiener Tools"
      logoHref={`/${locale}/`}
      items={ui.cardNav.items}
      ctaLabel={ui.cardNav.ctaLabel}
      ctaHref={`/${locale}/components/`}
      secondaryCtaLabel={ui.cardNav.secondaryCtaLabel}
      secondaryCtaHref={`/${locale}/blockchain/`}
      menuLabel={ui.cardNav.menuLabel}
      closeLabel={ui.cardNav.closeLabel}
      rightSlot={<LanguageSwitcher currentLabel={localeNames[locale]} options={languageOptions} />}
    />
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const ui = content[locale];
  const legalLinks = getLegalLinks(locale);

  const footerCta =
    locale === "tr"
      ? "Geri bildirim mi?"
      : locale === "de"
        ? "Feedback?"
        : locale === "ar"
          ? "تعليقات؟"
          : "Got feedback?";

  const sitemapTitle =
    locale === "tr" ? "Site haritası" : locale === "de" ? "Sitemap" : locale === "ar" ? "خريطة الموقع" : "Sitemap";

  const langTitle =
    locale === "tr" ? "Diller" : locale === "de" ? "Sprachen" : locale === "ar" ? "اللغات" : "Languages";

  const backLabel =
    locale === "tr" ? "Başa dön" : locale === "de" ? "Nach oben" : locale === "ar" ? "للأعلى" : "Back to top";

  return (
    <footer id="footer" className="ws-footer" dir="ltr">
      <div className="ws-footer-shell">
        <div className="ws-footer-hero">
          <h2>{footerCta}</h2>
          <a href={`mailto:${ui.contact.email}`} className="ws-footer-mail">
            {ui.contact.email}
          </a>
        </div>

        <div className="ws-footer-links">
          <div className="ws-footer-column">
            <h3>{sitemapTitle}</h3>
            <div className="ws-footer-list">
              <Link href={`/${locale}/`}>{ui.toolsSection.eyebrow}</Link>
              <Link href={`/${locale}/components/`}>{ui.cardNav.ctaLabel}</Link>
              <Link href={`/${locale}/blockchain/`}>{ui.blockchainPage.nav}</Link>
              <Link href={`/${locale}/library/`}>{ui.libraryPage.nav}</Link>
              <Link href={`/${locale}/catalog/`}>{ui.catalogIndexPage.nav}</Link>
              <Link href={`/${locale}/glossary/`}>{ui.glossaryPage.nav}</Link>
              <Link href={`/${locale}/fonts/`}>{ui.fontsPage.nav}</Link>
              <Link href={`/${locale}/tools/architect/`}>Architect</Link>
              <Link href={`/${locale}/tools/video-downloader/`}>Wiener DL</Link>
              <Link href={`/${locale}/about/`}>{ui.about.title}</Link>
              <Link href={`/${locale}/feedback/`}>{ui.feedback.title}</Link>
            </div>
          </div>

          <div className="ws-footer-column">
            <h3>{ui.feedback.title}</h3>
            <div className="ws-footer-list">
              <a href={`mailto:${ui.contact.email}`}>{ui.contact.email}</a>
              <a href={ui.contact.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <div className="ws-footer-column">
            <h3>{langTitle}</h3>
            <div className="ws-footer-list">
              {locales.map((item) => (
                <Link key={item} href={`/${item}/`}>
                  {localeLabels[item]}
                </Link>
              ))}
            </div>
          </div>

          <div className="ws-footer-column">
            <h3>{legalLinks.title}</h3>
            <div className="ws-footer-list">
              {legalLinks.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="ws-footer-bottom">
          <div className="ws-footer-wordmark">WIENER&rsquo;S TOOLS</div>
          <div className="ws-footer-meta">
            <a href="#top">{backLabel} ↑</a>
            <p>© Wiener Labs · 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ locale, children, variant = "wide" }: SiteShellProps) {
  return (
    <main className={`ws-shell ${variant === "compact" ? "is-compact" : ""}`} id="top">
      <div className="ws-canvas">
        <SiteHeader locale={locale} />
        {children}
      </div>
      <SiteFooter locale={locale} />
    </main>
  );
}
