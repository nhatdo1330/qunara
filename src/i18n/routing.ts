import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales, type Locale } from "./config";

export const pathnames = {
  "/": "/",
  "/learn": { en: "/learn", vi: "/hoc" },
  "/learn/dialogue": { en: "/learn/dialogue", vi: "/hoc/dialogue" },
  "/learn/[path]/[chapter]": {
    en: "/learn/[path]/[chapter]",
    vi: "/hoc/[path]/[chapter]",
  },
  "/explore": { en: "/explore", vi: "/kham-pha" },
  "/about": { en: "/about", vi: "/gioi-thieu" },
  "/community": { en: "/community", vi: "/cong-dong" },
  "/practice": "/practice",
  "/research": "/research",
  "/contact": "/contact",
  "/search": "/search",
  "/admin": "/admin",
  "/buddhism": "/buddhism",
  "/collections": "/collections",
  "/perspectives": "/perspectives",
  "/quantum": "/quantum",
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
  pathnames,
});

const localizedSegments: Record<Locale, Record<string, string>> = {
  en: {
    learn: "learn",
    explore: "explore",
    about: "about",
    community: "community",
  },
  vi: {
    learn: "hoc",
    explore: "kham-pha",
    about: "gioi-thieu",
    community: "cong-dong",
  },
};

/**
 * Builds a locale-prefixed URL without translating dynamic content slugs.
 * Dynamic slugs will be resolved through stable content IDs during migration.
 */
export function localizePathname(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (locales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  if (segments[0]) {
    const canonicalSegment =
      Object.entries(localizedSegments).flatMap(([, values]) =>
        Object.entries(values),
      ).find(([, localized]) => localized === segments[0])?.[0] ?? segments[0];

    segments[0] = localizedSegments[locale][canonicalSegment] ?? canonicalSegment;
  }

  return `/${locale}${segments.length ? `/${segments.join("/")}` : ""}`;
}

/** Resolves a public localized URL to the existing route during migration. */
export function getInternalPathname(pathname: string): {
  locale: Locale;
  pathname: string;
} | null {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments.shift();

  if (!isSupportedLocale(locale)) return null;

  if (segments[0]) {
    const canonicalSegment =
      Object.values(localizedSegments)
        .flatMap((values) => Object.entries(values))
        .find(([, localized]) => localized === segments[0])?.[0] ?? segments[0];

    segments[0] = canonicalSegment;
  }

  return {
    locale,
    pathname: segments.length ? `/${segments.join("/")}` : "/",
  };
}

function isSupportedLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}
