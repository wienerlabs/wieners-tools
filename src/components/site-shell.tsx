import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localeLabels, localeNames, locales } from "@/lib/i18n";
import { content } from "@/lib/content";
import { getLegalLinks } from "@/lib/legal";
import { LanguageSwitcher } from "@/components/language-switcher";

type SiteShellProps = {
  locale: Locale;
  children: React.ReactNode;
  variant?: "wide" | "compact";
};

export function SiteHeader({ locale }: { locale: Locale }) {
  const languageOptions = locales
    .filter((item) => item !== locale)
    .map((item) => ({
      href: `/${item}/`,
      label: localeNames[item]
    }));

  const ui = content[locale];
  const navLabels = {
    tools: locale === "tr" ? "Araçlar" : locale === "de" ? "Werkzeuge" : locale === "ar" ? "الأدوات" : "Tools",
    about: locale === "tr" ? "Hakkında" : locale === "de" ? "Über" : locale === "ar" ? "حول" : "About",
    feedback:
      locale === "tr"
        ? "Geri bildirim"
        : locale === "de"
          ? "Feedback"
          : locale === "ar"
            ? "تعليقات"
            : "Feedback"
  };

  return (
    <header className="ws-header" dir="ltr">
      <Link href={`/${locale}/`} className="ws-brand" aria-label="Wiener home">
        <img src="/logo.jpg" alt="Wiener Tools" className="ws-brand-logo" width={32} height={32} />
      </Link>

      <nav className="ws-nav" aria-label="Primary">
        <Link href={`/${locale}/#tools`} className="ws-nav-link">
          {navLabels.tools}
        </Link>
        <Link href={`/${locale}/about/`} className="ws-nav-link">
          {navLabels.about}
        </Link>
        <Link href={`/${locale}/feedback/`} className="ws-nav-link">
          {navLabels.feedback}
        </Link>
        <LanguageSwitcher currentLabel={localeNames[locale]} options={languageOptions} />
      </nav>
      <span className="sr-only">{ui.toolsSection.eyebrow}</span>
    </header>
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
