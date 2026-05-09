import { Link } from "@/i18n/navigation";
import type { UseCase } from "@/content/use-cases/types";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { PreviewMedia } from "@/components/shared/PreviewMedia";
import { Tag } from "@/components/shared/Tag";

type WorkItemProps = {
  useCase: UseCase;
};

export const WorkItem = ({ useCase }: WorkItemProps) => {
  const href = `/use-cases/${useCase.slug}` as never;
  const thumbnailTagTone = useCase.thumbnailTagTone ?? "white";

  return (
    <Link href={href} className="group flex w-full items-center">
      <div className="flex w-full flex-col items-center lg:hidden">
        <div className="flex w-full items-center justify-center">
          <div
            className="relative aspect-[307/371] w-full overflow-hidden rounded-[24px] border border-dark-smooth sm:max-w-[307px]"
            style={{
              boxShadow:
                "0px -8px 21px 0px rgba(38,53,103,0.15), 0px -5px 13px 0px rgba(38,53,103,0.15), 0px -3px 8px 0px rgba(38,53,103,0.15), 0px -2px 5px 0px rgba(38,53,103,0.15), 0px -1px 3px 0px rgba(38,53,103,0.15)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
              }}
            >
              <PreviewMedia
                previewImage={useCase.previewImage}
                previewVideo={useCase.previewVideo}
                mediaClassName="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 640px) 307px, calc(100vw - 24px)"
              />
            </div>

            {useCase.tags.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-[4px] px-4 pb-5">
                {useCase.tags.slice(0, 4).map((tag) => (
                  <Tag key={tag} label={tag} tone={thumbnailTagTone} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[16px] pt-[24px]">
          <h3 className="type-project-title max-w-[320px] whitespace-pre-line text-center text-muted">
            {useCase.title}
          </h3>
          <p className="type-body-md max-w-[320px] whitespace-pre-line text-center text-smooth">
            <HighlightedText text={useCase.overview} />
          </p>
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-[64px] lg:flex">
        <div className="flex shrink-0 items-center justify-center">
          <div
            className="relative h-[621px] w-[513px] overflow-hidden rounded-[30px] border border-dark-smooth shadow-elevation-2"
          >
            <PreviewMedia
              previewImage={useCase.previewImage}
              previewVideo={useCase.previewVideo}
              mediaClassName="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="513px"
            />
            {useCase.tags.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-[4px] px-6 pb-6">
                {useCase.tags.map((tag) => (
                  <Tag key={tag} label={tag} tone={thumbnailTagTone} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-px">
          <div className="flex min-h-[100px] w-full shrink-0 items-center border-b border-dark-smooth pb-[32px]">
            <div className="flex min-w-0 flex-1 items-center justify-center pr-[64px]">
              <p className="type-project-title-lg min-w-0 flex-1 whitespace-pre-line text-muted">
                {useCase.title}
              </p>
            </div>
          </div>

          <div className="flex w-full shrink-0 items-center justify-center py-[32px]">
            <p className="type-body-lg flex-1 whitespace-pre-line text-smooth">
              <HighlightedText text={useCase.overview} />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
