"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export const HomeButton = () => {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  if (pathname === "/") {
    return null;
  }

  return (
    <Link
      href="/"
      className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-ink/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-ink"
      aria-label={t("backHome")}
    >
      <span aria-hidden="true">&lt;</span>
      <span>{t("backHome")}</span>
    </Link>
  );
};
