import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/shared/Tag";
import { siteContent } from "@/content/site";

export const HomeHero = async () => {
  const t = await getTranslations("site");
  const tHome = await getTranslations("home");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <Container className="relative z-10 py-28">
        <div className="flex flex-col gap-[60px] items-start max-w-[1200px]">

          {/* Chip — status badge */}
          <Tag
            label={t("heroLabel")}
            tone="success"
            className="backdrop-blur-md"
            prefix={<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green shadow-green-glow" />}
          />

          {/* Title block */}
          <div className="flex flex-col items-start pb-[30px]">
            <p className="font-display font-light text-[40px] leading-none text-primary">
              {siteContent.name}
            </p>
            <h1 className="font-display font-medium text-[120px] leading-none tracking-[-3px] text-ink uppercase">
              {t("role")}
            </h1>
            <p className="mt-2 font-sans font-light text-[24px] leading-[1.7] tracking-[-0.04em] text-smooth w-[448px]">
              {t("intro")}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-2.5 font-sans text-[18px] font-medium text-dark shadow-elevation-2 transition-opacity hover:opacity-85"
            >
              {tHome("viewWork")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-ink px-8 py-2.5 font-sans text-[18px] font-medium text-ink transition-colors hover:border-primary hover:text-primary"
            >
              {tHome("getInTouch")}
            </a>
          </div>

        </div>
      </Container>
    </section>
  );
};
