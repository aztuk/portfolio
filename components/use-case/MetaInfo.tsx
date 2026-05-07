"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/Container";
import { fadeUp } from "@/lib/motion";
import type { UseCase } from "@/content/use-cases/types";
import clsx from "clsx";

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
            {/* My role */}
            <div className="border-b border-dark-smooth p-5 lg:p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <p className={clsx(labelClassName, "flex-1")}>{t("myRole")}</p>
                <span className="type-role-tag rounded-lg bg-dark-smooth px-1.5 py-1 text-muted whitespace-nowrap">
                  {t("owned")}
                </span>
                <span className="type-role-tag rounded-lg bg-dark-smooth/50 px-1.5 py-1 text-smooth whitespace-nowrap">
                  {t("contributed")}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {useCase.roles.owned.map((tag) => (
                  <span
                    key={tag}
                    className="type-role-tag rounded-lg bg-dark-smooth px-1.5 py-1 text-muted whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
                {useCase.roles.contributed.map((tag) => (
                  <span
                    key={tag}
                    className="type-role-tag rounded-lg bg-dark-smooth/50 px-1.5 py-1 text-smooth whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
