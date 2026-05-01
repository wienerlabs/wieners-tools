import { notFound } from "next/navigation";
import { CookieBanner } from "@/components/cookie-banner";
import { dirFor, isLocale, locales, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;

  return (
    <div lang={locale} dir={dirFor(locale)} className="min-h-screen">
      {children}
      <CookieBanner locale={locale} />
    </div>
  );
}
