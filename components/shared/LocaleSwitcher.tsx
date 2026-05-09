"use client";

import clsx from "clsx";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type LocaleSwitcherProps = {
  variant?: "fixed" | "inline";
};

export const LocaleSwitcher = ({ variant = "fixed" }: LocaleSwitcherProps) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const isUseCasePage = pathname.startsWith("/use-cases/");

  const toggle = () => {
    const next = locale === "en" ? "fr" : "en";
    router.push(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggle}
      className={clsx(
        "type-nav-chip flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-ink/70 backdrop-blur-md transition-colors hover:border-white/30 hover:text-ink",
        variant === "fixed" && "fixed top-3 z-50 lg:top-6 lg:px-4",
        variant === "fixed" &&
          (isHomePage
            ? "left-1/2 -translate-x-1/2"
            : "right-3 lg:right-6"),
        variant === "fixed" && isUseCasePage && "xl:hidden",
        variant === "inline" && "justify-center",
      )}
      aria-label={locale === "en" ? "Passer en français" : "Switch to English"}
    >
      <span className={locale === "en" ? "text-ink" : "text-ink/40"}>EN</span>
      <span className="text-ink/30">/</span>
      <span className={locale === "fr" ? "text-ink" : "text-ink/40"}>FR</span>
    </button>
  );
};
