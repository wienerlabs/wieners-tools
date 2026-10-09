import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";
import { getAllSlugs } from "@/lib/tools/registry";
import { CATALOG_ORDER } from "@/lib/catalogs";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "",
  "/library/",
  "/catalog/",
  "/blockchain/",
  "/fonts/",
  "/glossary/",
  "/components/",
  "/about/",
  "/feedback/",
  "/privacy-policy/",
  "/cookie-policy/"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: absoluteUrl(`/${locale}${route}`),
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.6
      });
    }
    for (const id of CATALOG_ORDER) {
      entries.push({
        url: absoluteUrl(`/${locale}/catalog/${id}/`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6
      });
    }
    for (const slug of slugs) {
      entries.push({
        url: absoluteUrl(`/${locale}/tools/${slug}/`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8
      });
    }
  }

  return entries;
}
