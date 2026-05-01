import { Link } from "@/i18n/navigation";
import type { UseCase } from "@/content/use-cases/types";
import { PreviewMedia } from "@/components/shared/PreviewMedia";

const previewAspectRatio = (useCase: UseCase) =>
  useCase.projectType === "mobile" ? "4/5" : "8/5";

type WorkItemProps = {
  useCase: UseCase;
  index: number;
};

export const WorkItem = ({ useCase, index }: WorkItemProps) => {
  const number = String(index + 1).padStart(2, "0");
  const href = `/use-cases/${useCase.slug}` as never;

  return (
    <Link
      href={href}
      className="group flex h-[750px] items-center justify-between"
    >
      {/* Left — work meta data */}
      <div className="flex flex-1 flex-col gap-px items-start justify-center min-w-0 pr-[80px]">

        {/* Chips */}
        {useCase.tags.length > 0 && (
          <div className="flex flex-wrap gap-[4px] items-center pb-[40px] w-full">
            {useCase.tags.map((tag) => (
              <div
                key={tag}
                className="bg-white/[0.06] border border-white/10 flex items-center px-3 py-3 rounded-[18px]"
              >
                <p className="font-sans font-normal text-[10px] text-white tracking-[2px] whitespace-nowrap uppercase">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Head: title + number */}
        <div className="flex min-h-[100px] w-full shrink-0 items-center border-b border-dark-smooth">
          <div className="flex flex-1 items-center justify-center pr-[64px] min-w-0">
            <p className="flex-1 font-display font-light text-[48px] leading-none text-muted min-w-0">
              {useCase.title}
            </p>
          </div>
          <div className="flex size-[150px] shrink-0 items-center justify-center border-l border-dark-smooth">
            <p className="font-display font-semibold text-[26px] leading-[32px] text-primary w-[38px]">
              {number}
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="flex items-center justify-center py-[32px] w-full shrink-0">
          <p
            className="flex-1 font-sans font-light text-[24px] leading-[1.7] text-muted"
            style={{ letterSpacing: "-0.96px" }}
          >
            {useCase.overview}
          </p>
        </div>

      </div>

      {/* Right — thumbnail */}
      <div className="flex items-center justify-center shrink-0 w-[555px]">
        <div
          className="relative rounded-[20px] shadow-[0px_0px_50px_20px_rgba(72,90,156,0.4)] w-full overflow-hidden"
          style={{ aspectRatio: previewAspectRatio(useCase) }}
        >
          <PreviewMedia
            previewImage={useCase.previewImage}
            previewVideo={useCase.previewVideo}
            mediaClassName="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="555px"
          />
        </div>
      </div>
    </Link>
  );
};
