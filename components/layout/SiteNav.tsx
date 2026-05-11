"use client";

import { useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { siteContent } from "@/content/site";

type NavItem = {
  labelKey: string;
  href: string;
  sectionId: string;
};

const NAV_ITEMS: NavItem[] = [
  { labelKey: "home", href: "/#hero", sectionId: "hero" },
  { labelKey: "works", href: "/#work", sectionId: "work" },
  { labelKey: "about", href: "/#about", sectionId: "about" },
  { labelKey: "contact", href: "/#contact", sectionId: "contact" },
];

const EASE = [0.4, 0, 0.2, 1] as const;
const THEME_STORAGE_KEY = "portfolio-theme";

type ThemeName = "dark" | "light";

const readStoredTheme = (): ThemeName => {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const applyTheme = (theme: ThemeName) => {
  document.documentElement.dataset.theme = theme;
};

export const SiteNav = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("navigation");
  const prefersReducedMotion = useReducedMotion();

  const [isCompact, setIsCompact] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [theme, setTheme] = useState<ThemeName>("light");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const storedTheme = readStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y < 80) {
        setIsCompact(false);
      } else if (y > lastScrollY.current) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }
      lastScrollY.current = y;

      // Active section detection — find the last section whose top is above the middle of the viewport
      const midpoint = window.innerHeight / 2;
      let current = "hero";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.sectionId);
        if (el && el.getBoundingClientRect().top <= midpoint) {
          current = item.sectionId;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    router.push(pathname, { locale: locale === "en" ? "fr" : "en" });
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The visual theme can still update when storage is unavailable.
    }
  };

  const isOnHome = pathname === "/";

  const localeOrder = locale === "fr" ? ["fr", "en"] : ["en", "fr"];
  const dur = prefersReducedMotion ? 0 : 0.3;
  const isDarkTheme = theme === "dark";

  return (
    <div className="fixed left-0 right-0 top-4 z-50 flex items-center justify-center gap-2.5 px-4 lg:top-6">

      {/* Main nav pill — shrinks to avatar circle on scroll down */}
      <nav
        className="site-glass-surface inline-flex items-center rounded-[68px] p-2"
        aria-label={t("mainNav")}
      >
        {/* Avatar — always visible */}
        <Link
          href="/#hero"
          className="block size-10 shrink-0 overflow-hidden rounded-[40px] transition-opacity hover:opacity-80"
          aria-label={`${t("home")} - ${siteContent.name}`}
          title={siteContent.name}
        >
          <Image
            src="/assets/picture.png"
            alt={siteContent.name}
            width={40}
            height={40}
            className="size-full object-cover object-top"
            priority
          />
        </Link>

        {/* Collapsible content */}
        <AnimatePresence initial={false}>
          {!isCompact && (
            <motion.div
              key="nav-content"
              initial={{ opacity: 0, maxWidth: 0, marginLeft: 0, marginRight: 0 }}
              animate={{ opacity: 1, maxWidth: 600, marginLeft: 24, marginRight: 24 }}
              exit={{ opacity: 0, maxWidth: 0, marginLeft: 0, marginRight: 0 }}
              transition={{ duration: dur, ease: EASE }}
              className="hidden items-center gap-6 overflow-hidden whitespace-nowrap md:flex"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = isOnHome && activeSection === item.sectionId;
                return (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    className={clsx(
                      "type-nav-pill transition-colors",
                      isActive ? "text-ink" : "text-smooth hover:text-ink/80",
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Locale pill — FR/EN swap with layout animation */}
      <button
        onClick={toggleLocale}
        className="site-glass-surface inline-flex size-14 shrink-0 flex-col items-center justify-center rounded-full transition-opacity hover:opacity-80"
        aria-label={locale === "en" ? "Passer en français" : "Switch to English"}
      >
        {localeOrder.map((loc, index) => (
          <motion.span
            key={loc}
            layout
            className={clsx(
              "type-nav-pill",
              index === 0 ? "text-ink" : "text-smooth/50",
            )}
            initial={{
              fontSize: index === 0 ? "15px" : "12px",
              fontWeight: index === 0 ? 600 : 400,
              lineHeight: 1,
            }}
            animate={{
              fontSize: index === 0 ? "15px" : "12px",
              fontWeight: index === 0 ? 600 : 400,
              lineHeight: 1,
            }}
            transition={{ duration: dur, ease: "easeInOut" }}
          >
            {loc.toUpperCase()}
          </motion.span>
        ))}
      </button>

      <button
        onClick={toggleTheme}
        className="site-glass-surface inline-flex size-14 shrink-0 items-center justify-center rounded-full text-ink transition-opacity hover:opacity-80"
        aria-label={isDarkTheme ? t("themeToLight") : t("themeToDark")}
        title={isDarkTheme ? t("themeToLight") : t("themeToDark")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -18, scale: 0.82 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 18, scale: 0.82 }}
            transition={{ duration: dur, ease: EASE }}
            className="flex items-center justify-center"
          >
            {isDarkTheme ? (
              <SunIcon size={22} weight="bold" aria-hidden="true" />
            ) : (
              <MoonIcon size={22} weight="bold" aria-hidden="true" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

    </div>
  );
};
