import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal-document";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { legalContent } from "@/lib/legal";
import { buildPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

async function getLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  const doc = legalContent[locale].cookies;
  return buildPageMetadata({
    locale,
    slug: "/cookie-policy/",
    title: doc.title,
    description: doc.description
  });
}

export default async function CookiePolicyPage({ params }: PageProps) {
  const locale = await getLocale(params);
  return <LegalDocument locale={locale} kind="cookies" />;
}
