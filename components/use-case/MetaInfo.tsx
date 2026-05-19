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

type ChipListProps = {
  items: string[];
  tone?: "strong" | "soft";
};

type RoleBlockProps = {
  title: string;
  items: string[];
};

type TeamBlockProps = {
  title: string;
  items: string[];
};

const labelClassName =
  "type-context-label text-smooth/70";

const bodyLargeClassName =
  "type-context-meta text-muted";

const bodySmallClassName =
  "type-context-meta text-muted";

const ChipList = ({ items, tone = "soft" }: ChipListProps) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((item) => (
      <span
        key={item}
        className={clsx(
          "type-role-tag rounded-lg px-2 py-1 text-muted",
          tone === "strong" ? "bg-[var(--role-owned-bg)]" : "bg-[var(--role-contributed-bg)]",
        )}
      >
        {item}
      </span>
    ))}
  </div>
);

const DotSeparatedList = ({ items }: { items: string[] }) => (
  <p className={bodySmallClassName}>
    {items.map((item, index) => (
      <span key={item}>
        {index > 0 ? <span className="px-2 text-smooth/60">·</span> : null}
        {item}
      </span>
    ))}
  </p>
);

const RoleBlock = ({ title, items }: RoleBlockProps) => (
  <div className="border-b border-dark-smooth p-5 lg:p-6">
    <p className={labelClassName}>{title}</p>
    <ChipList items={items} tone="strong" />
  </div>
);

const TeamBlock = ({ title, items }: TeamBlockProps) => (
  <div className="p-5 lg:p-6">
    <p className={labelClassName}>{title}</p>
    <DotSeparatedList items={items} />
  </div>
);

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
      <Container className="px-2 sm:px-8 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Role + Team */}
          <div className="flex min-w-0 flex-col border-b border-dark-smooth lg:border-b-0 lg:border-r">
            <RoleBlock title={t("myRole")} items={useCase.roles.owned} />
            <TeamBlock title={t("team")} items={useCase.roles.team} />
          </div>

          {/* Other info */}
          <div className="flex min-w-0 flex-col">
            {/* Challenge */}
            <div className="border-b border-dark-smooth p-5 lg:p-6">
              <p className={labelClassName}>{t("challenge")}</p>
              <p className={bodyLargeClassName}>{useCase.challenge}</p>
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
