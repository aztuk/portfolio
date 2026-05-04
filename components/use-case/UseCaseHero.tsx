"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/shared/Tag";
import { PreviewMedia } from "@/components/shared/PreviewMedia";
import { MediaLightbox } from "@/components/shared/MediaLightbox";
import type { UseCase } from "@/content/use-cases/types";

type UseCaseHeroProps = {
  useCase: UseCase;
};

export const UseCaseHero = ({ useCase }: UseCaseHeroProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const heroMedia = useCase.previewVideo ?? useCase.previewImage;

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center py-16 lg:min-h-screen lg:py-20">
      <Container className="flex flex-col items-center gap-8 px-3 sm:px-5 lg:gap-[60px] lg:px-6">
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {useCase.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Image + title overlap block */}
        <div className="relative flex w-full flex-col items-center">
          {/* Masked wrapper — padded 80px on all sides so the mask covers image + shadow bleed */}
          {/* -translate-y-[80px] compensates for the top padding so the image top stays at top-0 */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-12 p-7 min-[375px]:p-12 sm:-translate-y-16 sm:p-16 lg:-translate-y-[80px] lg:p-[80px]"
            style={{
              maskImage: "linear-gradient(to bottom, black 43%, transparent 72%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 43%, transparent 72%)",
            }}
          >
            {/* Shadow layer — no overflow-hidden so shadow isn't clipped */}
            <div
              className="relative w-[260px] rounded-[20px] sm:w-[320px] sm:rounded-[24px] lg:w-[380px] lg:rounded-[30px]"
              style={{
                aspectRatio: "380 / 460",
                boxShadow: "0 -10px 60px 10px rgba(28, 40, 90, 0.85), 0 0 40px 15px rgba(28, 40, 90, 0.6), 0 0 0 1px rgba(72, 90, 156, 0.3)",
              }}
            >
              {/* Image layer — clips content to rounded corners */}
              <div className="absolute inset-0 overflow-hidden rounded-[inherit] border border-dark-smooth">
                <PreviewMedia
                  previewImage={useCase.previewImage}
                  previewVideo={useCase.previewVideo}
                  priority
                  mediaClassName="object-cover object-top"
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 260px"
                />
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  aria-label={heroMedia.alt}
                />
              </div>
            </div>
          </div>

          {/* Title + overview — rendered over the image, padding-top pushes text into the lower portion */}
          <div className="pointer-events-none relative z-10 w-full px-0 pt-[170px] text-center sm:pt-[224px] lg:px-[90px] lg:pt-[300px]">
            <h1 className="type-page-title mx-auto max-w-[828px] text-ink">
              {useCase.title}
            </h1>
            <p className="type-body-md mx-auto mt-8 max-w-[828px] whitespace-pre-line text-smooth lg:type-body-lg-light">
              {useCase.overview}
            </p>
          </div>
        </div>
      </Container>
      {isLightboxOpen && (
        <MediaLightbox
          items={[heroMedia]}
          index={0}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </section>
  );
};
