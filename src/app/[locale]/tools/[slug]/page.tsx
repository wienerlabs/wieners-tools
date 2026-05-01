import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SiteShell } from "@/components/site-shell";
import { ToolFrame } from "@/components/tool-frame";
import { ToolRunnerHost } from "@/components/tool-runner-host";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata } from "@/lib/site";
import { content } from "@/lib/content";
import { getTool, getAllSlugs } from "@/lib/tools/registry";
import { getToolI18n } from "@/lib/tools/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

async function getParams(params: PageProps["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const tool = getTool(slug);
  if (!tool) notFound();
  return { locale: locale as Locale, slug, tool };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, tool } = await getParams(params);
  const i18n = getToolI18n(slug, locale);
  return buildPageMetadata({
    locale,
    slug: `/tools/${slug}/`,
    title: i18n.name,
    description: i18n.description,
    keywords: i18n.keywords
  });
}

export default async function ToolPage({ params }: PageProps) {
  const { locale, slug, tool } = await getParams(params);
  const i18n = getToolI18n(slug, locale);
  const page = content[locale];

  const breadcrumbs = breadcrumbSchema([
    { name: page.toolsSection.eyebrow, url: absoluteUrl(`/${locale}/`) },
    { name: i18n.name, url: absoluteUrl(`/${locale}/tools/${slug}/`) }
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumbs} />
      <SiteShell locale={locale} variant="compact">
        <ToolFrame locale={locale} tool={tool} i18n={i18n}>
          <ToolRunnerHost locale={locale} tool={tool} i18n={i18n} />
        </ToolFrame>
      </SiteShell>
    </>
  );
}
