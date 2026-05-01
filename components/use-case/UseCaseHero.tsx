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
        <div className="flex w-full flex-col items-center">
          {/* Preview image with bottom mask fade */}
          <div
            className="relative w-full overflow-hidden rounded-[28px] shadow-[0_0_50px_20px_var(--color-dark-smooth)] lg:w-[68%] lg:rounded-[40px]"
            style={{
              aspectRatio: "816 / 510",
              maskImage: "linear-gradient(to bottom, black 35%, transparent 85%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 85%)",
            }}
          >
            <PreviewMedia
              previewImage={useCase.previewImage}
              previewVideo={useCase.previewVideo}
              priority
              mediaClassName="object-cover object-top"
              sizes="(min-width: 1200px) 816px, (min-width: 1024px) 68vw, 100vw"
            />
          </div>

          {/* Title + overview — overlaps bottom 41% of image on desktop */}
          <div className="relative z-10 w-full px-4 text-center lg:-mt-[17.5%] lg:px-[90px]">
            <h1 className="font-display font-medium text-[clamp(2rem,7.33vw,5.5rem)] leading-[0.88] tracking-[-3px] text-ink">
              {useCase.title}
            </h1>
            <p className="mt-8 font-sans font-light text-lg leading-[1.7] tracking-[-0.04em] text-smooth lg:text-[24px]">
              {useCase.overview}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
