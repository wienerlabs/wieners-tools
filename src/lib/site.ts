import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export const siteUrl = "https://tools.wienerlabs.xyz";
export const siteName = "Wiener Tools";
export const siteShort = "wieners-tools";
export const orgEmail = "baturalp@wienerlabs.com";
export const githubUrl = "https://github.com/wienerlabs/wieners-tools";

export const localePathLabels: Record<Locale, string> = {
  tr: "tr-TR",
  de: "de-DE",
  en: "en-US",
  ar: "ar"
};

function localizedPath(locale: Locale, slug = "") {
  return `/${locale}${slug}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildAlternates(locale: Locale, slug = "") {
  return {
    canonical: localizedPath(locale, slug),
    languages: {
      tr: localizedPath("tr", slug),
      de: localizedPath("de", slug),
      en: localizedPath("en", slug),
      ar: localizedPath("ar", slug),
      "x-default": localizedPath("en", slug)
    }
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  slug = "",
  keywords
}: {
  locale: Locale;
  title: string;
  description: string;
  slug?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(localizedPath(locale, slug));

  return {
    title: title === siteName ? { absolute: title } : title,
    description,
    keywords,
    alternates: buildAlternates(locale, slug),
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: localePathLabels[locale],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wiener Labs",
    url: "https://wienerlabs.xyz",
    email: orgEmail,
    sameAs: [githubUrl]
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: ["tr", "de", "en", "ar"],
    publisher: {
      "@type": "Organization",
      name: "Wiener Labs"
    }
  };
}

export function webApplicationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    url: absoluteUrl(`/${locale}/`),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (browser)",
    browserRequirements: "Requires JavaScript. Modern browser with WebAssembly support.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: [
      "Image compression",
      "Format conversion",
      "Resize",
      "Pixelart",
      "Color adjustment",
      "QR generation",
      "Palette extraction",
      "ASCII art"
    ],
    inLanguage: ["tr", "de", "en", "ar"]
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
