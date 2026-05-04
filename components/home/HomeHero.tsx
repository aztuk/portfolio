import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/shared/Tag";
import { siteContent } from "@/content/site";

export const HomeHero = async () => {
  const t = await getTranslations("site");
  const tHome = await getTranslations("home");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden lg:min-h-screen">
      <Container className="relative z-10 px-5 py-20 lg:px-0 lg:py-28">
        <div className="flex max-w-[1200px] flex-col items-start gap-10 lg:gap-[60px]">

          {/* Chip — status badge */}
          <Tag
            label={t("heroLabel")}
            tone="success"
            className="backdrop-blur-md"
            prefix={<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green shadow-green-glow" />}
          />

          {/* Title block */}
          <div className="flex max-w-full flex-col items-start pb-2 lg:pb-[30px]">
            <p className="type-hero-kicker text-primary">
              {siteContent.name}
            </p>
            <h1 className="type-hero-title max-w-full text-ink">
              {t("role")}
            </h1>
            <p className="type-body-xl mt-2 w-full max-w-[826px] text-smooth">
              {t("intro")}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center lg:gap-6">
            <a
              href="#work"
              className="type-control-lg inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-dark shadow-elevation-2 transition-opacity hover:opacity-85 sm:py-2.5"
            >
              {tHome("viewWork")}
            </a>
            <a
              href={`mailto:${siteContent.email}`}
              className="type-control-lg inline-flex items-center justify-center rounded-full border-2 border-ink px-8 py-3 text-ink transition-colors hover:border-primary hover:text-primary sm:py-2.5"
            >
              {tHome("getInTouch")}
            </a>
          </div>

        </div>
      </Container>
    </section>
  );
};
