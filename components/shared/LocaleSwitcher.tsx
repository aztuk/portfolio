"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () => {
    const next = locale === "en" ? "fr" : "en";
    router.push(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className="type-nav-chip fixed right-3 top-3 z-50 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-ink/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-ink lg:right-6 lg:top-6 lg:px-4"
      aria-label={locale === "en" ? "Passer en français" : "Switch to English"}
    >
      <span className={locale === "en" ? "text-ink" : "text-ink/40"}>EN</span>
      <span className="text-ink/30">/</span>
      <span className={locale === "fr" ? "text-ink" : "text-ink/40"}>FR</span>
    </button>
  );
};
