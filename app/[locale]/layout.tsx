import type { Metadata } from "next";
import {
  Tektur,
  Special_Elite,
  Roboto_Serif,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { siteContent } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

import "@/app/globals.css";

import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { ThemeDiagnostics } from "@/components/shared/ThemeDiagnostics";
import { ThemeRgbSync } from "@/components/shared/ThemeRgbSync";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";

const themeBootstrapScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    document.documentElement.dataset.theme = storedTheme === "dark" ? "dark" : "light";
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

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

const serif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
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

  const title = t("seoTitle");
  const description = t("seoDescription");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s — ${siteContent.name}`,
    },
    description,
    openGraph: {
      type: "website",
      locale,
      title,
      description,
      siteName: siteContent.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className={`${tektur.variable} ${elite.variable} ${serif.variable} bg-canvas text-ink antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeRgbSync />
          <ThemeDiagnostics />
          <SiteBackground />
          <NoiseOverlay />
          <SiteNav />
          <div className="relative z-10">{children}</div>
          <SiteFooter />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
