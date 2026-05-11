import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { siteContent } from "@/content/site";

export const AboutSection = async () => {
  const t = await getTranslations("about");

  return (
    <Section
      id="about"
      className="flex min-h-[620px] items-center justify-center py-16 md:py-20 lg:min-h-[640px] lg:py-0"
    >
      <Container className="px-5 lg:px-0">
        <div className="flex w-full flex-col items-center justify-center gap-10 md:gap-[60px] lg:flex-row">
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="relative size-[min(78vw,424px)] shrink-0 overflow-hidden rounded-full md:size-[424px]">
              <Image
                src="/assets/full_picture.png"
                alt={siteContent.name}
                width={424}
                height={637}
                sizes="(min-width: 768px) 424px, 78vw"
                className="absolute left-[-0.08%] top-[0.12%] h-[150.3%] w-[100.2%] max-w-none object-cover object-top"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start justify-center text-left">
            <p className="type-about-kicker min-w-full text-primary">
              {t("greeting")}
            </p>
            <div className="type-about-body w-full max-w-[544px] whitespace-pre-wrap text-muted">
              <p>{t("bio1")}</p>
              <p className="mt-[35.7px]">{t("bio2")}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
