"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { fadeUp } from "@/lib/motion";
import type { UseCase } from "@/content/use-cases/types";

type MetaInfoProps = {
  useCase: UseCase;
};

const labelClassName =
  "font-display font-light text-2xl leading-[1.2] uppercase text-smooth";

const bodyLargeClassName =
  "font-sans font-light text-2xl leading-[1.7] tracking-[-0.96px] text-muted";

const bodySmallClassName =
  "font-sans text-[22px] leading-[30px] tracking-[-0.6px] text-muted";

export const MetaInfo = ({ useCase }: MetaInfoProps) => {
  return (
    <motion.section
      className="py-16 md:py-20"
      initial={fadeUp.initial}
      whileInView={fadeUp.whileInView}
      viewport={fadeUp.viewport}
      transition={fadeUp.transition}
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Challenge */}
          <div className="flex flex-col border-b border-dark-smooth py-6 md:w-[500px] md:shrink-0 md:border-b-0 md:border-r md:py-6 md:pr-12">
            <p className={labelClassName}>Challenge</p>
            <p className={bodyLargeClassName}>{useCase.challenge}</p>
          </div>

          {/* Other info */}
          <div className="flex flex-col md:flex-1">
            {/* Role */}
            <div className="border-b border-dark-smooth py-6 md:pl-12">
              <p className={labelClassName}>My role</p>
              <p className={bodyLargeClassName}>{useCase.roles.join(", ")}</p>
            </div>

            {/* Year + Timeline + Tools */}
            <div className="flex">
              <div className="flex-1 py-6 md:pl-12">
                <p className={labelClassName}>Year</p>
                <p className={bodySmallClassName}>{useCase.year}</p>
              </div>
              <div className="flex-1 border-l border-dark-smooth py-6 pl-6 md:pl-12">
                <p className={labelClassName}>Timeline</p>
                <p className={bodySmallClassName}>{useCase.timeline}</p>
              </div>
              <div className="w-[350px] shrink-0 border-l border-dark-smooth py-6 pl-6 md:pl-12">
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
