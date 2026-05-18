import type { Metadata } from "next";

import { AiHero } from "@/components/ai/AiHero";
import { AiImpactRanking } from "@/components/ai/AiImpactRanking";
import { AiWorkflow } from "@/components/ai/AiWorkflow";
import { HandoffPackage } from "@/components/ai/HandoffPackage";
import { PrototypingLoopSection } from "@/components/ai/PrototypingLoopSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PageTransition } from "@/components/shared/PageTransition";
import { getAiPageContent } from "@/content/ai/ai-page.content";

type AiPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: AiPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const content = getAiPageContent(locale);

  return {
    title: content.seoTitle,
    description: content.seoDescription,
  };
};

const AiPage = async ({ params }: AiPageProps) => {
  const { locale } = await params;
  const content = getAiPageContent(locale);

  return (
    <PageTransition>
      <AiHero content={content.hero} />

      <Section id="ai-impact" className="py-16 md:py-20 lg:py-24">
        <Container className="px-5 lg:px-0">
          <div className="space-y-10 md:space-y-9">
            <SectionHeading
              title={content.impact.title}
              description={content.impact.description}
              size="compact"
            />
            <AiImpactRanking content={content.impact} />
          </div>
        </Container>
      </Section>

      <Section id="ai-workflow" className="py-16 md:py-20 lg:py-24">
        <Container className="px-5 lg:px-0">
          <div className="space-y-10 md:space-y-9">
            <SectionHeading
              title={content.workflow.title}
              description={content.workflow.intro}
              size="compact"
            />
            <AiWorkflow steps={content.workflow.steps} />
          </div>
        </Container>
      </Section>

      <Section id="ai-vibe-coding" className="py-16 md:py-20 lg:py-24">
        <Container className="px-5 lg:px-0">
          <div className="space-y-10 md:space-y-9">
            <SectionHeading
              title={content.prototypingLoop.title}
              description={content.prototypingLoop.intro}
              size="compact"
            />
            <PrototypingLoopSection content={content.prototypingLoop} />
          </div>
        </Container>
      </Section>

      <Section id="ai-handoff" className="pb-24 pt-16 md:pt-20 lg:pb-28 lg:pt-24">
        <Container className="px-5 lg:px-0">
          <div className="mx-auto max-w-[980px] space-y-10 md:space-y-9">
            <SectionHeading title={content.handoff.title} size="compact" />
            <HandoffPackage content={content.handoff} />
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
};

export default AiPage;
