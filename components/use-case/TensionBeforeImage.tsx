"use client";

import { useState } from "react";
import Image from "next/image";

import { MediaLightbox } from "@/components/shared/MediaLightbox";
import type { ImageAsset } from "@/content/use-cases/types";

type TensionBeforeImageProps = {
  item: ImageAsset;
  label: string;
};

export const TensionBeforeImage = ({
  item,
  label,
}: TensionBeforeImageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div className="mt-10 flex w-full justify-center lg:mt-12">
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="group relative block w-full cursor-zoom-in overflow-visible rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary lg:rounded-[40px]"
            aria-label={item.alt}
          >
            <span className="relative block aspect-[8/5] w-full overflow-hidden rounded-[24px] border-[3px] border-muted bg-muted shadow-elevation-2 lg:rounded-[40px]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                sizes="(min-width: 1280px) 1000px, (min-width: 1024px) 84vw, 100vw"
              />
            </span>

            <span className="type-before-stamp absolute -bottom-3 right-2 flex rotate-[-12deg] items-center justify-center border-[3px] border-negative bg-negative/40 px-3 pb-2 pt-3 text-negative shadow-elevation-2 sm:right-[-18px] lg:right-[-24px]">
              {label}
            </span>
          </button>

          {item.caption ? (
            <p className="type-body-lg max-w-[560px] text-center text-smooth">
              {item.caption}
            </p>
          ) : null}
        </div>
      </div>

      {isLightboxOpen ? (
        <MediaLightbox
          items={[item]}
          index={0}
          onClose={() => setIsLightboxOpen(false)}
        />
      ) : null}
    </>
  );
};
