"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export const HomeButton = () => {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  if (pathname === "/" || pathname.startsWith("/use-cases/")) {
    return null;
  }

  return (
    <Link
      href="/"
      className="type-nav-chip fixed left-3 top-3 z-50 inline-flex max-w-[calc(100vw-6rem)] items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-ink/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-ink lg:left-6 lg:top-6 lg:max-w-none lg:px-4"
      aria-label={t("backHome")}
    >
      <span aria-hidden="true">&lt;</span>
      <span>{t("backHome")}</span>
    </Link>
  );
};
