"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { Logo } from "./navbar";

const groups = [
  {
    key: "discover",
    links: [
      { key: "learn", href: "/learn" },
      { key: "connections", href: "/explore" },
      { key: "research", href: "/research" },
    ],
  },
  {
    key: "practice",
    links: [
      { key: "meditation", href: "/practice" },
      { key: "dailyReflection", href: "/practice", hash: "reflection" },
      { key: "tracker", href: "/practice", hash: "tracker" },
    ],
  },
  {
    key: "qunara",
    links: [
      { key: "community", href: "/community" },
      { key: "about", href: "/about" },
      { key: "admin", href: "/admin" },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="q-footer">
      <div className="q-shell q-footer-grid">
        <div>
          <Link href="/" className="q-brand" aria-label={t("homeLabel")}>
            <Logo />
            <span>
              <b>QUNARA</b>
              <small>{t("tagline")}</small>
            </span>
          </Link>
          <p>{t("description")}</p>
        </div>
        {groups.map((group) => (
          <div key={group.key}>
            <h2>{t(`groups.${group.key}.title`)}</h2>
            {group.links.map((link) => (
              <Link
                href={{ pathname: link.href, hash: "hash" in link ? link.hash : undefined }}
                key={`${link.href}-${"hash" in link ? link.hash : ""}`}
              >
                {t(`groups.${group.key}.${link.key}`)}
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="q-shell q-footer-bottom">
        <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        <span>{t("closingLine")}</span>
      </div>
    </footer>
  );
}
