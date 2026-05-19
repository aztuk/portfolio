import { Container } from "@/components/layout/Container";
import { HighlightedText } from "@/components/shared/HighlightedText";
import type { AiPageContent } from "@/content/ai/ai-page.content";

type AiHeroProps = {
  content: AiPageContent["hero"];
};

export const AiHero = ({ content }: AiHeroProps) => {
  return (
    <section className="flex min-h-[88svh] items-center pb-16 pt-28 md:pt-32 lg:min-h-[86vh] lg:pb-20 lg:pt-40">
      <Container className="px-2 sm:px-5 lg:px-0">
        <div className="grid items-center gap-12 md:gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.75fr)]">
          <div className="max-w-4xl">
            <p className="type-chip mb-5 inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-primary md:mb-6">
              {content.eyebrow}
            </p>
            <h1 className="type-page-title max-w-[760px] text-ink lg:text-[72px]">
              {content.title}
            </h1>
            <p className="type-body-xl mt-6 max-w-[760px] whitespace-pre-line text-muted md:mt-7">
              <HighlightedText text={content.intro} />
            </p>
            {content.note ? (
              <p className="type-body-md mt-6 max-w-[660px] whitespace-pre-line border-l border-primary/45 pl-5 text-smooth md:mt-7">
                <HighlightedText text={content.note} />
              </p>
            ) : null}
          </div>

          <div className="relative mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-[520px]">
            <div className="rounded-[30px] border border-dark-smooth bg-canvas/70 p-4 shadow-card backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="size-3 rounded-full border border-primary bg-primary/20" />
                  <span className="h-px w-20 bg-primary/35" aria-hidden="true" />
                  <span className="size-3 rounded-full border border-primary/70 bg-canvas" />
                </div>
                <div className="grid grid-cols-2 gap-1 text-smooth" aria-hidden="true">
                  <span className="size-2 rounded-[3px] bg-smooth/80" />
                  <span className="size-2 rounded-[3px] bg-smooth/40" />
                  <span className="size-2 rounded-[3px] bg-smooth/40" />
                  <span className="size-2 rounded-[3px] bg-primary/80" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["01", "02", "03", "04"].map((label, index) => (
                  <div
                    key={label}
                    className="min-h-[96px] rounded-[18px] border border-line/10 bg-line/[0.04] p-4 sm:min-h-[110px] sm:rounded-[20px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="type-data-label-sm text-smooth">{label}</span>
                      <span
                        className="size-2 rounded-full bg-primary shadow-green-glow"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-8 space-y-2">
                      <span
                        className="block h-2 rounded-full bg-muted/45"
                        style={{ width: `${72 - index * 8}%` }}
                      />
                      <span
                        className="block h-2 rounded-full bg-primary/55"
                        style={{ width: `${42 + index * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[20px] border border-primary/20 bg-primary/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full bg-primary" aria-hidden="true" />
                  <span className="h-px flex-1 bg-primary/35" aria-hidden="true" />
                  <span className="size-3 rounded-full bg-chart-citron" aria-hidden="true" />
                  <span className="h-px flex-1 bg-primary/35" aria-hidden="true" />
                  <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
