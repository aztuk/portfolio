"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      className={clsx("py-16 md:py-24", className)}
      initial={fadeUp.initial}
      whileInView={fadeUp.whileInView}
      viewport={fadeUp.viewport}
      transition={fadeUp.transition}
    >
      {children}
    </motion.section>
  );
};
