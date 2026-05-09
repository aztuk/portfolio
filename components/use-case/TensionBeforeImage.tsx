"use client";

import { useState } from "react";
import Image from "next/image";

import { MediaLightbox } from "@/components/shared/MediaLightbox";
import type { ImageAsset } from "@/content/use-cases/types";

type TensionBeforeImageProps = {
  item: ImageAsset;
  label: string;
  aspectRatio?: string;
};

export const TensionBeforeImage = ({
  item,
  label,
  aspectRatio,
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
            <span
              className="relative block w-full overflow-hidden rounded-[24px] border border-dark-smooth bg-[rgb(53_69_128/31%)] shadow-elevation-2 backdrop-blur-md lg:rounded-[40px]"
              style={{ aspectRatio: aspectRatio ?? "8/5" }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`${aspectRatio ? "object-contain" : "object-cover"} transition-transform duration-300 group-hover:scale-[1.015]`}
                sizes="(min-width: 1280px) 1000px, (min-width: 1024px) 84vw, 100vw"
              />
            </span>

            <span className="type-before-stamp absolute -bottom-4 right-2 flex rotate-[-12deg] items-center justify-center overflow-hidden border-2 border-[#7a211c] bg-[#9a2a23] px-5 pb-1 pt-2 text-white sm:right-[-18px] sm:px-7 lg:right-[-24px]">
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
