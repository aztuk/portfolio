import clsx from "clsx";
import Image from "next/image";

import type { MediaAsset as MediaAssetType } from "@/content/use-cases/types";

type MediaAssetProps = {
  asset: MediaAssetType;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export const MediaAsset = ({
  asset,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 960px, 100vw",
}: MediaAssetProps) => {
  if (asset.type === "video") {
    return (
      <div
        className={clsx(
          "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-soft backdrop-blur-2xl",
          className,
        )}
      >
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
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-soft backdrop-blur-2xl",
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        className="object-cover"
        sizes={sizes}
      />
    </div>
  );
};
