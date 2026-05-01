import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Github, Mail } from "lucide-react";
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
    slug: "/feedback/",
    title: page.feedback.title,
    description: page.feedback.intro
  });
}

export default async function FeedbackPage({ params }: PageProps) {
  const locale = await getLocale(params);
  const page = content[locale];

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: page.feedback.title, url: absoluteUrl(`/${locale}/feedback/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <article className="ws-doc">
          <p className="ws-doc-eyebrow">{page.hero.eyebrow}</p>
          <h1>{page.feedback.title}</h1>
          <p className="ws-doc-intro">{page.feedback.intro}</p>

          <div className="ws-feedback-actions">
            <a
              className="ws-button ws-button-primary"
              href={`mailto:${page.contact.email}?subject=Wiener%27s%20Tools%20feedback`}
            >
              <Mail size={16} /> {page.feedback.mailLabel}
            </a>
            <a
              className="ws-button ws-button-ghost"
              href={`${page.contact.githubUrl}/issues/new`}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> {page.feedback.githubLabel}
            </a>
          </div>

          <p className="ws-doc-note">{page.feedback.note}</p>
        </article>
      </SiteShell>
    </>
  );
}
