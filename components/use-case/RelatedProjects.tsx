import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PreviewMedia } from "@/components/shared/PreviewMedia";
import { Tag } from "@/components/shared/Tag";
import type { UseCase } from "@/content/use-cases/types";
import { Link } from "@/i18n/navigation";

type RelatedProjectsProps = {
  useCases: UseCase[];
};

const RelatedProjectCard = ({ useCase }: { useCase: UseCase }) => {
  const href = `/use-cases/${useCase.slug}` as never;

  return (
    <Link href={href} className="group flex flex-col items-center pb-[90px]">
      {/* Image — overlaps 90px into the text below */}
      <div className="relative z-10 mb-[-90px] flex w-full items-center justify-center">
        <div
          className="relative overflow-hidden rounded-[30px] border border-dark-smooth"
          style={{
            width: "307px",
            height: "371px",
            boxShadow:
              "0px -8px 21px 0px rgba(38,53,103,0.15), 0px -5px 13px 0px rgba(38,53,103,0.15), 0px -3px 8px 0px rgba(38,53,103,0.15), 0px -2px 5px 0px rgba(38,53,103,0.15), 0px -1px 3px 0px rgba(38,53,103,0.15)",
            maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
          }}
        >
          <PreviewMedia
            previewImage={useCase.previewImage}
            previewVideo={useCase.previewVideo}
            mediaClassName="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            sizes="307px"
          />
        </div>
      </div>

      {/* Text */}
      <div className="relative z-20 flex w-full flex-col items-center gap-[16px]">
        <h3 className="type-project-title-medium max-w-[380px] text-center text-muted">
          {useCase.title}
        </h3>

        {useCase.tags.length > 0 && (
          <div className="flex w-full flex-wrap items-center justify-center gap-[4px] pt-[26px]">
            {useCase.tags.slice(0, 4).map((tag) => (
              <Tag key={tag} label={tag} className="text-white" />
            ))}
          </div>
        )}
      </div>
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
        <div className="mb-12">
          <h2 className="type-section-title text-muted">
            Autres projets
          </h2>
        </div>
        <div className="grid gap-20 md:grid-cols-2">
          {useCases.slice(0, 2).map((useCase) => (
            <RelatedProjectCard key={useCase.slug} useCase={useCase} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
