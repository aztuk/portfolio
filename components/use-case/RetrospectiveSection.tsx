import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RetroCard } from "@/components/use-case/RetroCard";
import type { RetrospectiveSectionData } from "@/content/use-cases/types";

type RetrospectiveSectionProps = {
  retrospective: RetrospectiveSectionData;
};

export const RetrospectiveSection = ({
  retrospective,
}: RetrospectiveSectionProps) => {
  const dontLabel = retrospective.dontLabel ?? "NE PLUS";
  const doLabel = retrospective.doLabel ?? "MAIS PLUTÔT";

  return (
    <Section>
      <Container>
        {/* Heading: Teko Light 40px, leading-[1.2], no tracking — matches Figma H3 spec */}
        <div className="mb-12">
          <h2 className="font-display font-light text-[2.5rem] leading-[1.2] text-muted">
            {retrospective.title}
          </h2>
        </div>

        {/* Card pairs — centered within the 1200px container */}
        <div className="flex flex-col items-center gap-12">
          {retrospective.items.map((item, index) => (
            <div
              key={index}
              className="flex w-full max-w-[50rem] flex-col gap-6 sm:flex-row"
            >
              <RetroCard text={item.dont} variant="dont" label={dontLabel} />
              <RetroCard text={item.do} variant="do" label={doLabel} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
