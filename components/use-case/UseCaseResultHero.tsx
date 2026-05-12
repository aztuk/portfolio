"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { FigmaEmbed } from "@/components/shared/FigmaEmbed";
import { LockedAsset } from "@/components/shared/LockedAsset";
import { MediaLightbox } from "@/components/shared/MediaLightbox";
import type { GalleryItem } from "@/content/use-cases/types";

type UseCaseResultHeroProps = {
  asset: GalleryItem;
  isAuthenticated?: boolean;
  id?: string;
};

export const UseCaseResultHero = ({
  asset,
  isAuthenticated = true,
  id,
}: UseCaseResultHeroProps) => {
  const reducedMotion = useReducedMotion();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const isProtected = asset.protected && !isAuthenticated;
  const canOpenLightbox = !isProtected && asset.type !== "figma";

  return (
    <section id={id} className="flex items-center justify-center py-12 lg:py-[80px]">
      <div className="w-full max-w-[1200px]">
        {isProtected ? (
          <div className="relative aspect-[8/5] overflow-hidden rounded-[24px] shadow-elevation-2 lg:rounded-[40px]">
            <LockedAsset />
          </div>
        ) : asset.type === "figma" ? (
          <div className="relative aspect-[8/5] overflow-hidden rounded-[24px] shadow-elevation-2 lg:rounded-[40px]">
            <FigmaEmbed item={asset} showPageNavigation />
          </div>
        ) : asset.type === "video" ? (
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="block w-full cursor-zoom-in overflow-hidden rounded-[24px] shadow-elevation-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary lg:rounded-[40px]"
            aria-label={asset.alt}
          >
            <video
              className="block h-auto max-h-[75vh] w-full object-cover"
              autoPlay={!reducedMotion}
              loop
              muted
              playsInline
              poster={asset.poster}
              aria-label={asset.alt}
            >
              <source src={asset.src} />
            </video>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="relative block aspect-[8/5] w-full cursor-zoom-in overflow-hidden rounded-[24px] shadow-elevation-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary lg:rounded-[40px]"
            aria-label={asset.alt}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
              className="object-cover"
              unoptimized
            />
          </button>
        )}
      </div>
      {canOpenLightbox && isLightboxOpen && (
        <MediaLightbox
          items={[asset]}
          index={0}
          onClose={() => setIsLightboxOpen(false)}
          isAuthenticated={isAuthenticated}
        />
      )}
    </section>
  );
};
