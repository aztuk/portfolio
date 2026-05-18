"use client";

import { useEffect, useRef, useState } from "react";
import { ListIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { siteContent } from "@/content/site";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

type NavItem = {
  labelKey: string;
  href: string;
  sectionId: string;
};

const NAV_ITEMS: NavItem[] = [
  { labelKey: "works", href: "/#work", sectionId: "work" },
  { labelKey: "ai", href: "/ai", sectionId: "ai" },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleLocale = () => {
    router.push(pathname, { locale: locale === "en" ? "fr" : "en" });
  };

  const changeLocale = (nextLocale: "en" | "fr") => {
    router.push(pathname, { locale: nextLocale });
    setIsMobileMenuOpen(false);
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
  const mobileMenuLabel = isMobileMenuOpen ? t("closeMenu") : t("openMenu");

  const getIsItemActive = (item: NavItem) => {
    if (item.href === "/ai") return pathname === "/ai";

    return isOnHome && activeSection === item.sectionId;
  };

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur, ease: EASE }}
            className="fixed inset-0 z-40 bg-canvas text-ink md:hidden"
          >
            <div className="flex min-h-svh flex-col px-2 pb-8 pt-24 sm:px-6">
              <nav
                className="flex flex-1 flex-col justify-center border-y border-dark-smooth py-8"
                aria-label={t("mainNav")}
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "type-project-title-medium py-4 transition-colors",
                      getIsItemActive(item) ? "text-primary" : "text-ink hover:text-primary",
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </nav>

              <div className="grid gap-6 pt-6">
                <div>
                  <p className="type-data-label-sm mb-3 text-smooth">
                    {t("language")}
                  </p>
                  <div className="flex gap-3">
                    {(["fr", "en"] as const).map((loc) => (
                      <button
                        key={loc}
                        onClick={() => changeLocale(loc)}
                        className={clsx(
                          "type-body-md rounded-full border px-4 py-2 transition-colors",
                          locale === loc
                            ? "border-ink bg-ink text-canvas"
                            : "border-dark-smooth text-muted hover:border-ink hover:text-ink",
                        )}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="type-data-label-sm mb-3 text-smooth">
                    {t("theme")}
                  </p>
                  <button
                    onClick={toggleTheme}
                    className="type-body-md rounded-full border border-dark-smooth px-4 py-2 text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    {isDarkTheme ? t("lightTheme") : t("darkTheme")}
                  </button>
                </div>

                <p className="type-body-sm border-t border-dark-smooth pt-5 text-smooth">
                  {siteContent.name}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="fixed left-0 right-0 top-4 z-50 flex items-center justify-start gap-2.5 px-2 md:justify-center md:px-4 lg:top-6">
        <nav
          className="site-glass-surface hidden items-center rounded-[68px] p-2 md:inline-flex"
          aria-label={t("mainNav")}
        >
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
                  const isActive = getIsItemActive(item);

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

        <button
          onClick={toggleLocale}
          className="site-glass-surface hidden size-14 shrink-0 flex-col items-center justify-center rounded-full transition-opacity hover:opacity-80 md:inline-flex"
          aria-label={locale === "en" ? "Passer en francais" : "Switch to English"}
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
          className="site-glass-surface hidden size-14 shrink-0 items-center justify-center rounded-full text-ink transition-opacity hover:opacity-80 md:inline-flex"
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

        <button
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-dark-smooth bg-canvas/95 text-ink shadow-card transition-opacity hover:opacity-80 md:hidden"
          aria-label={mobileMenuLabel}
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          title={mobileMenuLabel}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isMobileMenuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -18, scale: 0.82 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 18, scale: 0.82 }}
              transition={{ duration: dur, ease: EASE }}
              className="flex items-center justify-center"
            >
              <ListIcon size={24} weight="bold" aria-hidden="true" />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </>
  );
};
