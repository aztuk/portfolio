import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/home/ContactForm";

export const ContactSection = async () => {
  const t = await getTranslations("contact");

  return (
    <Section
      id="contact"
      className="flex min-h-[100svh] items-center py-16 lg:min-h-screen lg:py-20"
    >
      <Container className="px-5 lg:px-0">
        <div className="grid gap-10 border-t border-dark-smooth pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16 lg:pt-16">
          <div className="flex flex-col gap-4">
            <p className="type-eyebrow text-[18px] text-primary">{t("eyebrow")}</p>
            <h2 className="type-section-title max-w-[680px] text-left text-[40px] text-muted">
              {t("title")}
            </h2>
            <p className="type-body-lg-light max-w-[560px] text-muted">
              {t("description")}
            </p>
          </div>
          <ContactForm
            labels={{
              name: t("name"),
              email: t("email"),
              message: t("message"),
              submit: t("submit"),
              sending: t("sending"),
              success: t("success"),
              error: t("error"),
            }}
          />
        </div>
      </Container>
    </Section>
  );
};
