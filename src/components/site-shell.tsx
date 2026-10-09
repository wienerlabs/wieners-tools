import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localeLabels, localeNames, locales } from "@/lib/i18n";
import { content } from "@/lib/content";
import { getLegalLinks } from "@/lib/legal";
import { navFor, type NavGroup } from "@/lib/nav";
import { siteName } from "@/lib/site";
import { BrandMark } from "@/components/brand-mark";
import { SiteNav } from "@/components/site-nav";

type SiteShellProps = {
  locale: Locale;
  children: React.ReactNode;
  variant?: "wide" | "compact";
};

function languageOption(locale: Locale) {
  return { code: locale, label: localeLabels[locale], name: localeNames[locale] };
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const ui = content[locale];
  const nav = navFor(locale);

  return (
    <SiteNav
      homeHref={`/${locale}/`}
      brand={siteName}
      primary={nav.primary}
      groups={[nav.tools, nav.resources, nav.more]}
      menuLabel={ui.nav.menu}
      closeLabel={ui.nav.close}
      language={languageOption(locale)}
      languages={locales.filter((item) => item !== locale).map(languageOption)}
    />
  );
}

function FooterColumn({ group }: { group: NavGroup }) {
  return (
    <div className="ws-foot-col">
      <p className="ws-foot-head">{group.title}</p>
      <ul>
        {group.links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ) : (
              <Link href={link.href}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const ui = content[locale];
  const nav = navFor(locale);
  const legal = getLegalLinks(locale);
  const languages: NavGroup = {
    title: ui.footer.languages,
    links: locales.map((item) => ({ label: localeNames[item], href: `/${item}/` }))
  };

  return (
    <footer className="ws-foot">
      <div className="ws-foot-inner">
        <div className="ws-foot-top">
          <div className="ws-foot-brand">
            <Link href={`/${locale}/`} className="ws-foot-logo">
              <BrandMark className="ws-foot-mark" />
              <span>{siteName}</span>
            </Link>
            <p className="ws-foot-tagline">{ui.footer.tagline}</p>
            <a href={`mailto:${ui.contact.email}`} className="ws-button ws-button-primary">
              {ui.footer.feedbackCta}
            </a>
          </div>

          <div className="ws-foot-cols">
            <FooterColumn group={{ ...nav.tools, links: nav.tools.links.slice(0, 7) }} />
            <FooterColumn group={nav.resources} />
            <FooterColumn group={nav.more} />
            <FooterColumn group={languages} />
          </div>
        </div>

        <div className="ws-foot-bottom">
          <p>© 2026 Wiener Labs</p>
          <ul>
            {legal.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ws-foot-wordmark" aria-hidden="true">
        <BrandMark className="ws-foot-wordmark-mark" />
        <span>{siteName}</span>
      </div>
    </footer>
  );
}

export function SiteShell({ locale, children, variant = "wide" }: SiteShellProps) {
  return (
    <div className={`ws-shell ${variant === "compact" ? "is-compact" : ""}`} id="top">
      <SiteHeader locale={locale} />
      <main className="ws-canvas">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
