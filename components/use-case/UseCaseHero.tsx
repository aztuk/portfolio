import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/shared/Tag";
import { PreviewMedia } from "@/components/shared/PreviewMedia";
import type { UseCase } from "@/content/use-cases/types";

type UseCaseHeroProps = {
  useCase: UseCase;
};

export const UseCaseHero = ({ useCase }: UseCaseHeroProps) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center py-20">
      <Container className="flex flex-col items-center gap-[60px] px-6">
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
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[80px]"
            style={{
              padding: "80px",
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
              </div>
            </div>
          </div>

          {/* Title + overview — rendered over the image, padding-top pushes text into the lower portion */}
          <div className="relative z-10 w-full pt-[200px] px-4 text-center sm:pt-[252px] lg:pt-[300px] lg:px-[90px]">
            <h1 className="type-page-title mx-auto max-w-[828px] text-ink">
              {useCase.title}
            </h1>
            <p className="type-body-md mx-auto mt-8 max-w-[828px] whitespace-pre-line text-smooth lg:type-body-lg-light">
              {useCase.overview}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
