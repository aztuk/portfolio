import Image from "next/image";

import type { ImageAsset } from "@/content/use-cases/types";

type MasonryGalleryProps = {
  items: ImageAsset[];
};

const galleryAspectRatios = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[5/4]"];

export const MasonryGallery = ({ items }: MasonryGalleryProps) => {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5">
      {items.map((item, index) => (
        <figure
          key={`${item.src}-${index}`}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] shadow-card backdrop-blur-2xl"
        >
          <div className={`relative ${galleryAspectRatios[index % galleryAspectRatios.length]}`}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
              sizes="(min-width: 768px) 45vw, 50vw"
            />
          </div>
        </figure>
      ))}
    </div>
  );
};
