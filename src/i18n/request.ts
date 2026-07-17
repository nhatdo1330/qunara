import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

import { defaultLocale, isLocale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const headerLocale = headers().get("x-qunara-locale");
  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : isLocale(headerLocale)
      ? headerLocale
      : defaultLocale;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
