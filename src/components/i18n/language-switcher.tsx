"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import {
  isLocale,
  localeLabels,
  locales,
  type Locale,
} from "@/i18n/config";
import { localizePathname } from "@/i18n/routing";

const localeCookie = "NEXT_LOCALE";

export function LanguageSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");

  function changeLocale(locale: string) {
    if (!isLocale(locale) || locale === activeLocale) return;

    document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
    window.location.assign(localizePathname(pathname, locale));
  }

  return (
    <label className="q-language-switcher" title={t("label")}>
      <Languages aria-hidden="true" size={18} />
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        value={activeLocale}
        onChange={(event) => changeLocale(event.target.value)}
      >
        {locales.map((locale: Locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
