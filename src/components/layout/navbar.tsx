"use client";

import { Menu, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Link, usePathname } from "@/i18n/navigation";

const links = [
  { key: "learn", href: "/learn" },
  { key: "explore", href: "/explore" },
  { key: "practice", href: "/practice" },
  { key: "community", href: "/community" },
  { key: "research", href: "/research" },
  { key: "about", href: "/about" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="q-nav">
      <div className="q-shell q-nav-inner">
        <Link href="/" className="q-brand" aria-label={t("homeLabel")}>
          <Logo />
          <span>
            <b>QUNARA</b>
            <small>{t("tagline")}</small>
          </span>
        </Link>
        <nav className="q-nav-links" aria-label={t("mainLabel")}>
          {links.map(({ key, href }) => (
            <Link
              key={href}
              href={href}
              className={pathname.startsWith(href) ? "active" : ""}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="q-nav-actions">
          <LanguageSwitcher />
          <Link href="/search" aria-label={t("searchLabel")}>
            <Search />
          </Link>
          <Link href="/learn" className="q-nav-cta">
            {t("startLearning")}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="q-mobile-nav"
          aria-label={t("mobileLabel")}
        >
          {links.map(({ key, href }) => (
            <Link href={href} key={href}>
              {t(key)}
            </Link>
          ))}
          <Link href="/search">{t("search")}</Link>
        </nav>
      )}
    </header>
  );
}

export function Logo() {
  return (
    <span className="q-logo" aria-hidden="true">
      <i />
      <i />
      <i />
      <b />
    </span>
  );
}
