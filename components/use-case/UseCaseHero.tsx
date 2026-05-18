"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { HighlightedText } from "@/components/shared/HighlightedText";
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
      <Container className="flex flex-col items-center gap-8 px-2 sm:px-8 lg:gap-[60px] lg:px-6">
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
            className="absolute top-0 [left:calc(50%-50vw)] w-screen -translate-y-12 py-7 min-[375px]:py-12 sm:[left:50%] sm:w-auto sm:-translate-x-1/2 sm:-translate-y-16 sm:p-16 lg:-translate-y-[80px] lg:p-[80px]"
            style={{
              maskImage: "linear-gradient(to bottom, black 43%, transparent 72%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 43%, transparent 72%)",
            }}
          >
            {/* Shadow layer — no overflow-hidden so shadow isn't clipped */}
            <div
              className="relative mx-auto aspect-[380/460] w-[calc(100vw-1rem)] rounded-[20px] shadow-[var(--thumbnail-shadow)] sm:mx-0 sm:w-[320px] sm:rounded-[24px] lg:w-[500px] lg:rounded-[30px]"
            >
              {/* Image layer — clips content to rounded corners */}
              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <PreviewMedia
                  previewImage={useCase.previewImage}
                  previewVideo={useCase.previewVideo}
                  priority
                  mediaClassName="object-cover object-top"
                  sizes="(min-width: 1024px) 500px, (min-width: 640px) 320px, calc(100vw - 1rem)"
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
          <div className="pointer-events-none relative z-10 w-full px-0 pt-[280px] text-center min-[375px]:pt-[310px] sm:pt-[224px] lg:px-[90px] lg:pt-[350px]">
            <h1 className="type-page-title mx-auto max-w-[828px] text-ink">
              {useCase.title}
            </h1>
            <p className="type-body-md mx-auto mt-8 max-w-[828px] whitespace-pre-line text-smooth lg:type-body-lg-light">
              <HighlightedText text={useCase.overview} />
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
