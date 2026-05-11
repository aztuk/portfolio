import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { WorkItem } from "@/components/home/WorkItem";
import type { UseCase } from "@/content/use-cases/types";

type UseCaseGridProps = {
  useCases: UseCase[];
};

export const UseCaseGrid = ({ useCases }: UseCaseGridProps) => {
  return (
    <Section id="work">
      <Container className="px-5 lg:px-0">
        <div className="flex flex-col divide-y divide-dark-smooth">
          {useCases.map((useCase) => (
            <div
              key={useCase.slug}
              className="py-12 lg:py-20"
            >
              <WorkItem useCase={useCase} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
