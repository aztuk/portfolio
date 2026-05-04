import { Link } from "@/i18n/navigation";
import type { UseCase } from "@/content/use-cases/types";
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
        <div className="relative z-10 mb-[-70px] flex w-full items-center justify-center">
          <div
            className="relative aspect-[307/371] w-full max-w-[260px] overflow-hidden rounded-[24px] border border-dark-smooth sm:max-w-[307px]"
            style={{
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
              sizes="260px"
            />
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center gap-[16px] pb-[70px]">
          <h3 className="type-project-title-medium max-w-[320px] whitespace-pre-line text-center text-muted">
            {useCase.title}
          </h3>

          {useCase.tags.length > 0 && (
            <div className="flex w-full flex-wrap items-center justify-center gap-[4px] pt-4">
              {useCase.tags.slice(0, 4).map((tag) => (
                <Tag key={tag} label={tag} className="text-white" />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-[64px] lg:flex">

        {/* Left — thumbnail */}
        <div className="flex w-auto shrink-0 flex-col items-center justify-center gap-6">
          {useCase.tags.length > 0 && (
            <div className="flex w-full max-w-[513px] flex-wrap items-center justify-center gap-[4px]">
              {useCase.tags.map((tag) => (
                <Tag key={tag} label={tag} className="text-white" />
              ))}
            </div>
          )}

          <div
            className="relative h-[621px] w-[513px] overflow-hidden rounded-[30px] border border-dark-smooth shadow-elevation-2"
          >
            <PreviewMedia
              previewImage={useCase.previewImage}
              previewVideo={useCase.previewVideo}
              mediaClassName="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="513px"
            />
          </div>
        </div>

        {/* Right — work meta data */}
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center">

          {/* Head: title */}
          <div className="flex min-h-0 w-full shrink-0 items-center pb-2 lg:pb-3">
            <div className="flex min-w-0 flex-1 items-center justify-center lg:pr-[64px]">
              <p className="type-project-title-medium min-w-0 flex-1 whitespace-pre-line text-center text-muted lg:text-left">
                {useCase.title}
              </p>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};
