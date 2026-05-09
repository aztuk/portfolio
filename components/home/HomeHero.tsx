import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { HeroVisual } from "@/components/home/HeroVisual";
import { Tag } from "@/components/shared/Tag";
import { siteContent } from "@/content/site";

export const HomeHero = async () => {
  const t = await getTranslations("site");
  const tHome = await getTranslations("home");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden lg:min-h-screen">
      <Container className="relative z-10 px-5 py-20 lg:px-0 lg:py-28">
        <div className="flex items-center gap-10 lg:gap-16">

          {/* Left column — text content */}
          <div className="flex flex-1 flex-col items-start gap-10 lg:gap-[60px]">

            {/* Chip — status badge */}
            <Tag
              label={t("heroLabel")}
              tone="success"
              className="backdrop-blur-md"
              prefix={<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green shadow-green-glow" />}
            />

            {/* Title block */}
            <div className="flex flex-col items-start pb-2 lg:pb-[30px]">
              <p className="type-hero-kicker text-primary">
                {siteContent.name}
              </p>
              <h1 className="type-hero-title text-ink">
                {t("role")}
              </h1>
              <p className="type-body-xl mt-2 max-w-[560px] text-smooth">
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
                href="#contact"
                className="type-control-lg inline-flex items-center justify-center rounded-full border-2 border-ink px-8 py-3 text-ink transition-colors hover:border-primary hover:text-primary sm:py-2.5"
              >
                {tHome("getInTouch")}
              </a>
            </div>

          </div>

          {/* Right column — hero visual, desktop only */}
          <div className="hidden shrink-0 lg:flex lg:items-center lg:justify-end">
            <HeroVisual />
          </div>

        </div>
      </Container>
    </section>
  );
};
