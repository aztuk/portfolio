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

  return (
    <Link href={href} className="group flex w-full items-center">
      <div className="flex w-full flex-col items-center lg:hidden">
        <div className="flex w-full items-center justify-center">
          <div
            className="relative aspect-[307/371] w-full overflow-hidden sm:max-w-[307px]"
          >
            <PreviewMedia
              previewImage={useCase.previewImage}
              previewVideo={useCase.previewVideo}
              mediaClassName="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
              sizes="(min-width: 640px) 307px, calc(100vw - 24px)"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[16px] pt-[24px]">
          <h3 className="type-project-title max-w-[320px] whitespace-pre-line text-center text-muted">
            {useCase.title}
          </h3>
          <p className="type-body-md max-w-[320px] whitespace-pre-line text-center text-smooth">
            <HighlightedText text={useCase.overview} />
          </p>
          {useCase.tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-[6px]">
              {useCase.tags.map((tag) => (
                <Tag key={tag} label={tag} tone="white" />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-[64px] lg:flex">
        <div className="flex shrink-0 items-center justify-center">
          <div
            className="relative h-[621px] w-[513px] overflow-hidden"
          >
            <PreviewMedia
              previewImage={useCase.previewImage}
              previewVideo={useCase.previewVideo}
              mediaClassName="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="513px"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-px">
          <div className="flex min-h-[100px] w-full shrink-0 items-center">
            <div className="flex min-w-0 flex-1 items-center justify-center pr-[64px]">
              <p className="type-project-title-medium leading-[1.3] min-w-0 flex-1 whitespace-pre-line text-muted">
                {useCase.title}
              </p>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col items-start gap-[32px] py-[32px]">
            <p className="type-body-lg flex-1 whitespace-pre-line text-muted">
              <HighlightedText text={useCase.overview} />
            </p>
            {useCase.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-[6px]">
                {useCase.tags.map((tag) => (
                  <Tag key={tag} label={tag} tone="white" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
