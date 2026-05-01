import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PreviewMedia } from "@/components/shared/PreviewMedia";
import type { UseCase } from "@/content/use-cases/types";
import { Link } from "@/i18n/navigation";

type RelatedProjectsProps = {
  useCases: UseCase[];
};

const getPreviewAspectRatio = (useCase: UseCase) =>
  useCase.projectType === "mobile" ? "4 / 5" : "406 / 254";

const RelatedProjectCard = ({ useCase }: { useCase: UseCase }) => {
  const href = `/use-cases/${useCase.slug}` as never;

  return (
    <Link
      href={href}
      className="group flex min-w-0 flex-col items-center text-center"
    >
      <div className="relative z-10 mb-[-90px] w-full">
        <div
          className="relative w-full overflow-hidden rounded-[20px] border border-black/60 shadow-[0_0_30px_3px_var(--color-dark-smooth)]"
          style={{
            aspectRatio: getPreviewAspectRatio(useCase),
            maskImage: "linear-gradient(to bottom, black 0%, black 43%, transparent 88%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 43%, transparent 88%)",
          }}
        >
          <PreviewMedia
            previewImage={useCase.previewImage}
            previewVideo={useCase.previewVideo}
            mediaClassName="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 1280px) 347px, (min-width: 768px) 45vw, 100vw"
          />
        </div>
      </div>

      <h3 className="relative z-20 w-full font-display text-[34px] font-light leading-[1.08] text-muted md:text-[40px] md:leading-[1.2]">
        {useCase.title}
      </h3>

      <p
        className="mt-2 w-full font-sans text-[16px] font-normal leading-[1.7] text-smooth md:text-[18px]"
        style={{ letterSpacing: "-0.72px" }}
      >
        {useCase.overview}
      </p>

      {useCase.tags.length > 0 && (
        <div className="flex w-full flex-wrap items-center justify-center gap-[4px] pt-[26px]">
          {useCase.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-[18px] border border-white/10 bg-white/[0.06] px-3 py-3 font-sans text-[10px] font-normal uppercase tracking-[2px] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

export const RelatedProjects = ({ useCases }: RelatedProjectsProps) => {
  if (useCases.length === 0) {
    return null;
  }

  return (
    <Section className="pb-20 pt-40">
      <Container className="px-6">
        <div className="grid gap-20 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase) => (
            <RelatedProjectCard key={useCase.slug} useCase={useCase} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
