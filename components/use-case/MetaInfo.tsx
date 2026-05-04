"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/Container";
import { fadeUp } from "@/lib/motion";
import type { UseCase } from "@/content/use-cases/types";

type MetaInfoProps = {
  useCase: UseCase;
  id?: string;
};

const labelClassName =
  "type-context-label text-smooth/70";

const bodyLargeClassName =
  "type-context-meta text-muted";

const bodySmallClassName =
  "type-context-meta text-muted";

export const MetaInfo = ({ useCase, id }: MetaInfoProps) => {
  const t = useTranslations("sections");

  return (
    <motion.section
      id={id}
      className="py-16 md:py-20"
      initial={fadeUp.initial}
      whileInView={fadeUp.whileInView}
      viewport={fadeUp.viewport}
      transition={fadeUp.transition}
    >
      <Container className="px-6 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Challenge */}
          <div className="flex min-w-0 flex-col justify-center border-b border-dark-smooth p-5 lg:border-b-0 lg:border-r lg:p-6">
            <p className={labelClassName}>{t("challenge")}</p>
            <p className={bodyLargeClassName}>{useCase.challenge}</p>
          </div>

          {/* Other info */}
          <div className="flex min-w-0 flex-col">
            {/* Role */}
            <div className="border-b border-dark-smooth p-5 lg:p-6">
              <p className={labelClassName}>{t("myRole")}</p>
              <p className={bodyLargeClassName}>{useCase.roles.join(", ")}</p>
            </div>

            {/* Year + Timeline + Tools */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="min-w-0 border-b border-dark-smooth p-5 md:border-b-0 lg:p-6">
                <p className={labelClassName}>{t("year")}</p>
                <p className={bodySmallClassName}>{useCase.year}</p>
              </div>
              <div className="min-w-0 border-b border-dark-smooth p-5 md:border-b-0 md:border-l md:border-dark-smooth lg:p-6">
                <p className={labelClassName}>{t("timeline")}</p>
                <p className={bodySmallClassName}>{useCase.timeline}</p>
              </div>
              <div className="min-w-0 p-5 md:col-span-2 md:border-l md:border-dark-smooth lg:p-6">
                <p className={labelClassName}>{t("tools")}</p>
                <p className={bodySmallClassName}>{useCase.tools.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
};
