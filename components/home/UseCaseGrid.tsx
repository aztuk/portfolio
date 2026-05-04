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
      <Container>
        <div className="flex flex-col">
          {useCases.map((useCase) => (
            <div key={useCase.slug} className="h-screen flex items-center">
              <WorkItem useCase={useCase} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
