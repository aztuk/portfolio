import { Link } from "@/i18n/navigation";
import type { UseCase } from "@/content/use-cases/types";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { PreviewMedia } from "@/components/shared/PreviewMedia";
import { Tag } from "@/components/shared/Tag";

const previewAspectRatio = (useCase: UseCase) =>
  useCase.projectType === "mobile" ? "4/5" : "8/5";

type UseCaseCardProps = {
  useCase: UseCase;
};

export const UseCaseCard = ({ useCase }: UseCaseCardProps) => {
  const href = `/use-cases/${useCase.slug}` as never;

  return (
    <Link
      href={href}
      className="group flex flex-col items-center pb-[90px]"
    >
      {/* Image — overlaps 90px into the text below */}
      <div className="relative z-10 mb-[-90px] w-full">
        <div
          className="relative rounded-[20px] shadow-[0px_0px_30px_3px_rgba(72,90,156,0.8)] w-full overflow-hidden"
          style={{ aspectRatio: previewAspectRatio(useCase) }}
        >
          <PreviewMedia
            previewImage={useCase.previewImage}
            previewVideo={useCase.previewVideo}
            mediaClassName="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* Text: title + description + chips */}
      <div className="flex flex-col items-center w-full">
        <h3 className="type-project-title w-full whitespace-pre-line text-center text-muted">
          {useCase.title}
        </h3>
        <p className="type-body-md mt-2 w-full whitespace-pre-line text-center text-smooth">
          <HighlightedText text={useCase.cardDescription ?? useCase.overview} />
        </p>
        {useCase.tags.length > 0 && (
          <div className="flex flex-wrap gap-[4px] items-center justify-center pt-[26px] w-full">
            {useCase.tags.map((tag) => (
              <Tag key={tag} label={tag} tone="white" />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
