import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales, type Locale } from "./config";

export const pathnames = {
  "/": "/",
  "/learn": { en: "/learn", vi: "/hoc" },
  "/learn/dialogue": { en: "/learn/dialogue", vi: "/hoc/doi-thoai" },
  "/learn/[path]/[chapter]": {
    en: "/learn/[path]/[chapter]",
    vi: "/hoc/[path]/[chapter]",
  },
  "/explore": { en: "/explore", vi: "/kham-pha" },
  "/explore/[slug]": {
    en: "/explore/[slug]",
    vi: "/kham-pha/[slug]",
  },
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
  localeDetection: false,
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

const exploreSlugs = {
  "many-worlds": "tam-thien-dai-thien-the-gioi",
  "life-in-water": "sinh-mang-trong-mot-chen-nuoc",
  impermanence: "vo-thuong",
  "dependent-origination": "duyen-khoi",
  entanglement: "vuong-viu-luong-tu-va-duyen-khoi",
  superposition: "chong-chap-luong-tu-va-tu-duy-bat-nhi",
  measurement: "phep-do-luong-tu-va-chanh-niem",
  emptiness: "tanh-khong-va-chan-khong-luong-tu",
} as const;

const learnPaths = {quantum: "vat-ly-luong-tu", buddhism: "phat-hoc"} as const;
const learnSlugs = {
  "why-quantum-changed-everything": "vi-sao-vat-ly-luong-tu-thay-doi-moi-thu",
  "what-is-a-quantum": "luong-tu-la-gi",
  "wave-particle-duality": "luong-tinh-song-hat-va-thi-nghiem-hai-khe",
  "wave-function": "ham-song", superposition: "chong-chap-luong-tu",
  measurement: "phep-do-va-bai-toan-phep-do", entanglement: "vuong-viu-luong-tu",
  "uncertainty-principle": "nguyen-ly-bat-dinh", "quantum-fields": "truong-luong-tu",
  "quantum-computing": "may-tinh-luong-tu", "open-questions": "nhung-cau-hoi-con-mo",
  "common-myths": "nhung-hieu-lam-pho-bien-ve-luong-tu",
  "who-was-the-buddha": "duc-phat-la-ai", "four-noble-truths": "tu-dieu-de",
  "eightfold-path": "bat-chanh-dao", impermanence: "vo-thuong",
  "dependent-origination": "duyen-khoi", "non-self": "vo-nga", emptiness: "tanh-khong",
  mindfulness: "chanh-niem", meditation: "thien-dinh", compassion: "tu-bi", wisdom: "tri-tue",
  "buddhism-modern-world": "phat-giao-trong-the-gioi-hien-dai",
} as const;

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

    if (canonicalSegment === "explore" && segments[1]) {
      const englishSlug = (Object.entries(exploreSlugs) as [string,string][])
        .find(([english,vietnamese]) => english === segments[1] || vietnamese === segments[1])?.[0] ?? segments[1];
      segments[1] = locale === "vi"
        ? exploreSlugs[englishSlug as keyof typeof exploreSlugs] ?? englishSlug
        : englishSlug;
    }
    if (canonicalSegment === "learn" && segments[1]) {
      if (segments[1] === "dialogue" || segments[1] === "doi-thoai") {
        segments[1] = locale === "vi" ? "doi-thoai" : "dialogue";
      } else {
        const englishPath = (Object.entries(learnPaths) as [string, string][])
          .find(([en, vi]) => en === segments[1] || vi === segments[1])?.[0] ?? segments[1];
        segments[1] = locale === "vi" ? learnPaths[englishPath as keyof typeof learnPaths] ?? englishPath : englishPath;
        if (segments[2]) {
          const englishSlug = (Object.entries(learnSlugs) as [string, string][])
            .find(([en, vi]) => en === segments[2] || vi === segments[2])?.[0] ?? segments[2];
          segments[2] = locale === "vi" ? learnSlugs[englishSlug as keyof typeof learnSlugs] ?? englishSlug : englishSlug;
        }
      }
    }
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
