"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.section
      id={id}
      className="py-16 md:py-20"
      initial={fadeUp.initial}
      whileInView={fadeUp.whileInView}
      viewport={fadeUp.viewport}
      transition={fadeUp.transition}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Challenge */}
          <div className="flex min-w-0 flex-col justify-center border-b border-dark-smooth p-6 lg:border-b-0 lg:border-r">
            <p className={labelClassName}>Challenge</p>
            <p className={bodyLargeClassName}>{useCase.challenge}</p>
          </div>

          {/* Other info */}
          <div className="flex min-w-0 flex-col">
            {/* Role */}
            <div className="border-b border-dark-smooth p-6">
              <p className={labelClassName}>My role</p>
              <p className={bodyLargeClassName}>{useCase.roles.join(", ")}</p>
            </div>

            {/* Year + Timeline + Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-4">
              <div className="min-w-0 border-b border-dark-smooth p-6 sm:border-b-0">
                <p className={labelClassName}>Year</p>
                <p className={bodySmallClassName}>{useCase.year}</p>
              </div>
              <div className="min-w-0 border-b border-dark-smooth p-6 sm:border-b-0 sm:border-l sm:border-dark-smooth">
                <p className={labelClassName}>Timeline</p>
                <p className={bodySmallClassName}>{useCase.timeline}</p>
              </div>
              <div className="min-w-0 p-6 sm:col-span-2 sm:border-l sm:border-dark-smooth">
                <p className={labelClassName}>Tools</p>
                <p className={bodySmallClassName}>{useCase.tools.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
};
