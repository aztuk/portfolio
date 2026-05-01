import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { WorkItem } from "@/components/home/WorkItem";
import type { UseCase } from "@/content/use-cases/types";

type UseCaseGridProps = {
  useCases: UseCase[];
};

export const UseCaseGrid = ({ useCases }: UseCaseGridProps) => {
  return (
    <Section id="work" className="pb-24 pt-20 md:pb-28 md:pt-24">
      <Container>
        {/* Section header */}
        <div className="flex items-end h-[69px] border-b border-dark-smooth mb-[60px]" />

        {/* Work items */}
        <div className="flex flex-col gap-[60px]">
          {useCases.map((useCase, index) => (
            <WorkItem key={useCase.slug} useCase={useCase} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
