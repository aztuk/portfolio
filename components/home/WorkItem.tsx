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
    <Link href={href} className="group flex items-center w-full">
      <div className="flex flex-1 gap-[64px] items-center min-w-0">

        {/* Left — thumbnail */}
        <div className="flex items-center justify-center shrink-0">
          <div
            className="relative rounded-[30px] shadow-elevation-2 border border-dark-smooth overflow-hidden"
            style={{ width: "513px", height: "621px" }}
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
        <div className="flex flex-1 flex-col gap-px items-start justify-center min-w-0">

          {/* Chips */}
          {useCase.tags.length > 0 && (
            <div className="flex flex-wrap gap-[4px] items-center pb-[40px] w-full">
              {useCase.tags.map((tag) => (
                <Tag key={tag} label={tag} className="text-white" />
              ))}
            </div>
          )}

          {/* Head: title */}
          <div className="flex min-h-[100px] pb-[32px] w-full shrink-0 items-center border-b border-dark-smooth">
            <div className="flex flex-1 items-center justify-center pr-[64px] min-w-0">
              <p className="type-project-title-lg min-w-0 flex-1 whitespace-pre-line text-muted">
                {useCase.title}
              </p>
            </div>
          </div>

          {/* Overview */}
          <div className="flex items-center justify-center py-[32px] w-full shrink-0">
            <p className="type-body-lg flex-1 whitespace-pre-line text-smooth">
              {useCase.overview}
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
};
