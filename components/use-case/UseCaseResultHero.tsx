import Image from "next/image";

import { FigmaEmbed } from "@/components/shared/FigmaEmbed";
import { LockedAsset } from "@/components/shared/LockedAsset";
import type { GalleryItem } from "@/content/use-cases/types";

type UseCaseResultHeroProps = {
  asset: GalleryItem;
  isAuthenticated?: boolean;
};

export const UseCaseResultHero = ({ asset, isAuthenticated = true }: UseCaseResultHeroProps) => {
  return (
    <section className="flex items-center justify-center py-[80px]">
      <div
        className="relative aspect-[8/5] w-[1200px] shrink-0 overflow-hidden rounded-[40px] shadow-elevation-2"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[32px]">
          {asset.protected && !isAuthenticated ? (
            <LockedAsset />
          ) : asset.type === "figma" ? (
            <FigmaEmbed item={asset} showPageNavigation />
          ) : asset.type === "video" ? (
            <video
              className="h-full w-full object-cover"
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
              fill
              priority
              className="object-cover"
              sizes="1200px"
            />
          )}
        </div>
      </div>
    </section>
  );
};
