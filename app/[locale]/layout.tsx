import type { Metadata } from "next";
import { Space_Grotesk, Teko, Tektur, Special_Elite } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import "@/app/globals.css";

import { routing } from "@/i18n/routing";
import { HomeButton } from "@/components/shared/HomeButton";
import { ThemeDiagnostics } from "@/components/shared/ThemeDiagnostics";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { ThemeRgbSync } from "@/components/shared/ThemeRgbSync";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { SiteBackground } from "@/components/layout/SiteBackground";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const display = Teko({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-tektur",
});

const elite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-elite",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: LocaleLayoutProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} ${tektur.variable} ${elite.variable} bg-canvas text-ink antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeRgbSync />
          <ThemeDiagnostics />
          <SiteBackground />
          <NoiseOverlay />
          <HomeButton />
          <LocaleSwitcher />
          <div className="relative z-10">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
