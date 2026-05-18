import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { Tag } from "@/components/shared/Tag";

export const HomeHero = async () => {
  const t = await getTranslations("site");
  const intro = t.raw("intro") as string;

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden lg:min-h-screen">
      <Container className="relative z-10 flex w-full items-center justify-center px-2 sm:px-5">
        <div className="flex w-full items-center justify-center gap-[60px]">
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-center">
            <Tag label={t("heroLabel")} tone="default" />
            <h1 className="type-hero-statement w-full whitespace-pre-wrap text-muted">
              <HighlightedText
                text={intro}
                highlightClassName="hero-text-highlight"
              />
            </h1>
            <p className="type-hero-description w-full max-w-[544px] text-smooth">
              {t("heroDescription")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
