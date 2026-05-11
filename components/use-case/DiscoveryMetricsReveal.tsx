"use client";

import { ChartBarIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useId, useState, type ReactNode } from "react";

type DiscoveryMetricsRevealProps = {
  children: ReactNode;
  label: string;
};

export const DiscoveryMetricsReveal = ({
  children,
  label,
}: DiscoveryMetricsRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const contentId = useId();
  const transition: Transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.52, ease: [0.22, 1, 0.36, 1] };

  const revealMetrics = () => {
    setIsRevealed(true);
    if (reducedMotion) {
      setIsContentVisible(true);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence initial={false}>
        {!isRevealed ? (
          <motion.div
            key="discovery-reveal-button"
            className="flex w-full justify-center py-2"
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
          >
            <button
              type="button"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-line/20 bg-paper/5 px-6 py-4 text-muted shadow-soft backdrop-blur-md transition duration-200 hover:border-primary/45 hover:bg-paper/10 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-8"
              aria-controls={contentId}
              aria-expanded={false}
              onClick={revealMetrics}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line/15 bg-paper/5 text-primary transition duration-200 group-hover:border-primary/35 group-hover:bg-primary/10">
                <ChartBarIcon size={20} weight="duotone" aria-hidden="true" />
              </span>
              <span className="type-chip text-left">{label}</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isRevealed ? (
          <motion.div
            key="discovery-reveal-content"
            id={contentId}
            className="w-full overflow-hidden"
            initial={reducedMotion ? false : { height: 0 }}
            animate={{ height: "auto" }}
            transition={transition}
            onAnimationComplete={() => setIsContentVisible(true)}
          >
            <div
              className="w-full"
              data-discovery-reveal={isContentVisible ? "visible" : "hidden"}
            >
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
