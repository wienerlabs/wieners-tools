export const locales = ["tr", "de", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  tr: "TR",
  de: "DE",
  en: "EN",
  ar: "AR"
};

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  de: "Deutsch",
  en: "English",
  ar: "العربية"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function dirFor(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}
