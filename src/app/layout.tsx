import type { Metadata } from "next";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TranslationProvider } from "@/components/i18n/translation-provider";
import { isLocale, defaultLocale } from "@/i18n/config";

export const metadata:Metadata={metadataBase:new URL("https://qunara.org"),title:{default:"Qunara — Explore Reality Through Science and Wisdom",template:"%s | Qunara"},description:"A premium educational and community platform exploring quantum physics, Buddhist philosophy, consciousness, and the practice of living wisely.",openGraph:{title:"Qunara",description:"Explore Reality Through Science and Wisdom.",type:"website"},robots:{index:true,follow:true}};
export default async function RootLayout({children}:{children:React.ReactNode}){
  const requestedLocale = await getLocale();
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const messages = await getMessages();
  const t = await getTranslations("layout");

  return <html lang={locale}><body className="font-sans antialiased"><TranslationProvider locale={locale} messages={messages}><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-gold focus:p-3 focus:text-midnight">{t("skipToContent")}</a><Navbar/><main id="main">{children}</main><Footer/></TranslationProvider></body></html>
}
