import clsx from "clsx";
import Image from "next/image";

import { FigmaEmbed } from "@/components/shared/FigmaEmbed";
import { LockedAsset } from "@/components/shared/LockedAsset";
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
  const isProtected = asset.protected && !isAuthenticated;
  const needsFixedRatio = isProtected || asset.type === "figma";

  return (
    <section id={id} className="flex items-center justify-center py-[80px]">
      <div
        className={clsx(
          "w-full max-w-[1200px] overflow-hidden rounded-[40px] shadow-elevation-2",
          needsFixedRatio && "relative aspect-[8/5]",
        )}
      >
        {isProtected ? (
          <LockedAsset />
        ) : asset.type === "figma" ? (
          <FigmaEmbed item={asset} showPageNavigation />
        ) : asset.type === "video" ? (
          <video
            className="block h-auto max-h-[75vh] w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={asset.poster}
            aria-label={asset.alt}
          >
            <source src={asset.src} />
          </video>
        ) : (
          <Image
            src={asset.src}
            alt={asset.alt}
            width={0}
            height={0}
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
            className="block h-auto max-h-[75vh] w-full"
            unoptimized
          />
        )}
      </div>
    </section>
  );
};
