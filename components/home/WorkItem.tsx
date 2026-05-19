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
    <Link href={href} className="group flex w-full flex-col items-center lg:flex-row lg:gap-[64px]">
      <div className="flex w-full shrink-0 items-center justify-center lg:w-auto">
        <div className="relative aspect-[307/371] w-full overflow-hidden sm:max-w-[307px] lg:h-[621px] lg:w-[513px] lg:max-w-none">
          <PreviewMedia
            previewImage={useCase.previewImage}
            previewVideo={useCase.previewVideo}
            mediaClassName="object-cover object-top transition duration-700 group-hover:scale-[1.03] lg:object-center"
            sizes="(min-width: 1024px) 513px, (min-width: 640px) 307px, calc(100vw - 24px)"
          />
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-[16px] pt-[24px] lg:items-start lg:justify-center lg:gap-px lg:pt-0">
        <div className="flex w-full flex-col items-center gap-2 lg:min-h-[100px] lg:items-start lg:justify-center lg:pr-[64px]">
          <h3 className="type-project-title min-w-0 max-w-[320px] whitespace-pre-line text-center text-muted lg:max-w-none lg:text-left lg:font-medium lg:leading-[1.3]">
            {useCase.title}
          </h3>
          {useCase.tagline ? (
            <p className="type-tagline max-w-[320px] whitespace-pre-line text-center text-[19px] leading-[1.45] text-muted lg:max-w-none lg:text-left">
              {useCase.tagline}
            </p>
          ) : null}
        </div>

        <div className="flex w-full shrink-0 flex-col items-center gap-[16px] lg:items-start lg:gap-[32px] lg:py-[32px]">
          <p className="type-body-md max-w-[320px] whitespace-pre-line text-center text-smooth lg:max-w-none lg:text-left lg:text-[18px] lg:leading-[1.7] lg:text-muted">
            <HighlightedText text={useCase.overview} />
          </p>
          {useCase.tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-[6px] lg:justify-start">
              {useCase.tags.map((tag) => (
                <Tag key={tag} label={tag} tone="white" />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
