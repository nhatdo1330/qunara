export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}
