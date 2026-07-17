"use client";

import {
  NextIntlClientProvider,
  type AbstractIntlMessages,
} from "next-intl";

import type { Locale } from "@/i18n/config";

type TranslationProviderProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
};

export function TranslationProvider({
  children,
  locale,
  messages,
}: TranslationProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
