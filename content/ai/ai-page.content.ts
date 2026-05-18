import type { AiImpactCriterionId, AiImpactTaskId } from "@/content/ai/ai-impact.config";
import type { Locale } from "@/i18n/routing";

export type PrototypingLoopIconName =
  | "agent"
  | "check"
  | "code"
  | "commit"
  | "figma"
  | "file"
  | "list"
  | "memory"
  | "package"
  | "question"
  | "roadmap"
  | "shield"
  | "specs"
  | "test";

export type PrototypingLoopLegendTone =
  | "protocol"
  | "human"
  | "file"
  | "design"
  | "code"
  | "memory";

type PrototypingLoopNode = {
  id: string;
  title: string;
  description: string;
  icon: PrototypingLoopIconName;
  note?: string;
  emphasis?: "primary" | "secondary";
  badge?: string;
};

export type AiPageContent = {
  seoTitle: string;
  seoDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
  };
  impact: {
    title: string;
    description: string;
    modelLabel: string;
    scoreLabel: string;
    maxScoreLabel: string;
    criteriaLabels: Record<AiImpactCriterionId, string>;
    taskLabels: Record<AiImpactTaskId, string>;
    taskDescriptions: Record<AiImpactTaskId, string>;
  };
  workflow: {
    title: string;
    intro: string;
    steps: {
      title: string;
      whatAiDoes: string[];
      whatAiDoesNotDo: string[];
    }[];
  };
  prototypingLoop: {
    title: string;
    intro: string;
    legend: Array<{
      id: string;
      label: string;
      tone: PrototypingLoopLegendTone;
    }>;
    inputTitle: string;
    loopTitle: string;
    outputTitle: string;
    inputs: PrototypingLoopNode[];
    loopSteps: Array<{
      id: string;
      title: string;
      icon: PrototypingLoopIconName;
      note?: string;
    }>;
    validation: {
      title: string;
      description: string;
      icon: PrototypingLoopIconName;
      note?: string;
    };
    updates: PrototypingLoopNode[];
    outputs: PrototypingLoopNode[];
    guardrailsTitle: string;
    guardrails: Array<{
      id: string;
      label: string;
      icon: PrototypingLoopIconName;
    }>;
  };
  handoff: {
    title: string;
    packageLabel: string;
    packageBody: string;
    files: {
      name: string;
      description: string;
    }[];
  };
};

export const aiPageContent = {
  en: {
    seoTitle: "My take on AI",
    seoDescription:
      "A personal, critical and structured view of how Quentin Gillon uses AI as a quality lever in Product Design.",
    hero: {
      eyebrow: "AI × Product Design",
      title: "My take on AI",
      intro:
        "For now, I don’t see AI as a tool meant to accelerate or replace product design work.\n\nAI is a <b>quality lever</b> in design thinking. It helps us explore <b>more options</b>, be <b>clearer</b>, more exhaustive, and above all <b>invert the prototyping process</b> by allowing tests to happen much earlier.",
      note:
        "DISCLAIMER: This is my current workflow for personal projects, not an enterprise process I have already industrialized with a full team.",
    },
    impact: {
      title: "Where AI helps most",
      description:
        "A personal scoring model based on how I use AI in Product Design. The goal is not to prove a universal truth, but to make my own judgment visible.",
      modelLabel: "Personal working model",
      scoreLabel: "Score",
      maxScoreLabel: "out of 15",
      criteriaLabels: {
        speedGain: "Time gain",
        qualityGain: "Quality gain",
        riskControl: "Trust in AI",
      },
      taskLabels: {
        understand: "Understand",
        structure: "Structure",
        explore: "Explore",
        prototype: "Prototype",
        evaluate: "Evaluate",
        decide: "Decide",
        document: "Document",
        communicate: "Communicate",
        produce: "Produce",
        polish: "Polish",
      },
      taskDescriptions: {
        understand: "Discovery, research, interviews, analysis",
        structure: "Problem framing, workflow, decision criteria",
        explore: "Solutions, options, scenarios, alternatives",
        prototype: "Figma, vibe coding, interactive prototypes",
        evaluate: "Testing, critique, edge cases, review",
        decide: "Arbitration, trade-offs, solution choices",
        document: "Specs, handoff, memory, guidelines, design system",
        communicate: "Storytelling, alignment, presentations, team conversations",
        produce: "Screen creation, flow, assets, components",
        polish: "Visual craft, finishing, microcopy, UI details",
      },
    },
    workflow: {
      title: "My AI-augmented workflow",
      intro:
        "At every step, I keep the decision and design judgment. AI helps me structure, challenge, explore and document, but it does not decide for me and does not create evidence.",
      steps: [
        {
          title: "Discovery",
          whatAiDoes: [
            "Structures notes, qualitative signals and quantitative data",
            "Helps identify patterns and contradictions",
            "Challenges early assumptions",
          ],
          whatAiDoesNotDo: [
            "Does not replace user interviews",
            "Does not decide what is a real insight",
            "Does not turn correlation into evidence",
          ],
        },
        {
          title: "Problem framing",
          whatAiDoes: [
            "Helps formulate multiple problem angles",
            "Makes assumptions and fuzzy areas visible",
            "Suggests clearer reformulations",
          ],
          whatAiDoesNotDo: [
            "Does not choose the problem to solve",
            "Does not replace business context",
            "Does not validate product priority alone",
          ],
        },
        {
          title: "Exploration",
          whatAiDoes: [
            "Broadens the solution space",
            "Generates variants, scenarios and edge cases",
            "Helps compare the strengths and limits of each direction",
          ],
          whatAiDoesNotDo: [
            "Does not choose the final solution",
            "Does not replace product taste",
            "Does not guarantee technical feasibility",
          ],
        },
        {
          title: "Prototyping",
          whatAiDoes: [
            "Creates interactive flows",
            "Documents Figma references in design.md",
            "Documents trade-offs and decisions in Roadmap.md & Memory.md",
          ],
          whatAiDoesNotDo: [
            "Does not produce production code",
            "Does not create anything in Figma or in the design system",
            "Does not validate the experience without user testing",
          ],
        },
        {
          title: "Testing",
          whatAiDoes: [
            "Helps prepare test scenarios",
            "Spots possible bias in questions",
            "Structures observed feedback and signals",
          ],
          whatAiDoesNotDo: [
            "Does not replace real users",
            "Does not turn a weak test into strong evidence",
            "Does not decide alone whether a solution works",
          ],
        },
        {
          title: "Arbitrage",
          whatAiDoes: [
            "Synthesizes options and their compromises",
            "Makes risks, costs and benefits visible",
            "Helps formalize decision criteria",
          ],
          whatAiDoesNotDo: [
            "Does not make the final decision",
            "Does not replace product responsibility",
            "Does not decide without human, business and technical context",
          ],
        },
        {
          title: "Handoff",
          whatAiDoes: [
            "Creates a structured package for the engineering team",
            "Helps produce Design.md, Memory.md, Roadmap.md and Specifications.md",
            "Turns the validated prototype into a more usable support for developers",
          ],
          whatAiDoesNotDo: [
            "Does not replace discussion with engineers",
            "Does not guarantee technical quality alone",
            "Must not introduce unvalidated rules",
          ],
        },
      ],
    },
    prototypingLoop: {
      title: "My prototyping loop with coding agents",
      intro:
        "I don’t ask AI to design on its own. I feed a controlled loop with tasks, design context and validations.",
      legend: [
        { id: "protocol", label: "Agent protocol", tone: "protocol" },
        { id: "human", label: "Human action", tone: "human" },
      ],
      inputTitle: "What I feed",
      loopTitle: "Agent loop",
      outputTitle: "What the loop produces",
      inputs: [
        {
          id: "todo",
          title: "Todo.md",
          description: "Fixes, additions, new tasks and priorities.",
          icon: "list",
          emphasis: "primary",
          note: "This is often my main input: I add fixes while the prototype evolves.",
        },
        {
          id: "figma",
          title: "Figma",
          description: "Flows, components, tokens and visual references.",
          icon: "figma",
          emphasis: "primary",
          note: "I can keep working in Figma while agents iterate on another part of the flow.",
        },
        {
          id: "design",
          title: "Design.md",
          description: "Updated only when the system or design rules evolve.",
          icon: "file",
          emphasis: "secondary",
          badge: "when needed",
          note: "Design.md is not a frozen brief: it evolves when the system or rules change.",
        },
      ],
      loopSteps: [
        { id: "read-todo", title: "Read Todo.md", icon: "list" },
        { id: "update-roadmap", title: "Update Roadmap.md", icon: "roadmap" },
        { id: "pick-task", title: "Pick the highest-priority task", icon: "check" },
        { id: "check-design", title: "Check Design.md and Figma", icon: "figma" },
        {
          id: "questions",
          title: "Ask clarifying questions",
          icon: "question",
          note: "The agent should not fill ambiguity on its own.",
        },
        { id: "plan", title: "Propose a plan", icon: "agent" },
        { id: "implement", title: "Implement the prototype", icon: "code" },
        {
          id: "manual-test",
          title: "Suggest a manual test",
          icon: "test",
          note: "Each iteration must produce a concrete verification step.",
        },
      ],
      validation: {
        title: "Human validation",
        description: "I validate, correct or redirect before the loop can close.",
        icon: "shield",
        note: "I validate, correct or redirect.",
      },
      updates: [
        {
          id: "memory-update",
          title: "Updates Memory.md, Roadmap.md, Specifications.md",
          description: "Project memory, task status and rules stay current.",
          icon: "memory",
        },
        {
          id: "commit",
          title: "Commits if validated",
          description: "The next iteration starts from Todo.md again.",
          icon: "commit",
          note: "No commit without validation.",
        },
      ],
      outputs: [
        {
          id: "prototype",
          title: "Interactive prototype",
          description: "A testable flow with interactions, states and edge cases.",
          icon: "code",
        },
        {
          id: "memory",
          title: "Memory.md",
          description: "Decisions, context and learnings preserved.",
          icon: "memory",
          note: "Prevents context loss between sessions.",
        },
        {
          id: "roadmap",
          title: "Roadmap.md",
          description: "Prioritized, ongoing and completed tasks.",
          icon: "roadmap",
        },
        {
          id: "specifications",
          title: "Specifications.md",
          description: "Rules and constraints updated when the solution evolves.",
          icon: "specs",
        },
        {
          id: "commit",
          title: "Validated commit",
          description: "Only after manual testing and validation.",
          icon: "commit",
        },
      ],
      guardrailsTitle: "Guardrails",
      guardrails: [
        { id: "human", label: "Human validation", icon: "shield" },
        { id: "manual-test", label: "Manual test at each iteration", icon: "test" },
        { id: "parity", label: "Figma / prototype parity", icon: "figma" },
        { id: "checks", label: "Lint, typecheck and tests before PR", icon: "check" },
      ],
    },
    handoff: {
      title: "Handoff as structured memory",
      packageLabel: "Handoff package",
      packageBody:
        "The goal is not only to pass over a finished solution.\nThe package also carries context, reasoning and tested decisions, so information is not lost between design, prototype and implementation.",
      files: [
        {
          name: "Design.md",
          description:
            "UI choices, flows, states, edge cases and interaction logic.",
        },
        {
          name: "Memory.md",
          description:
            "Reasoning, trade-offs and mistakes already encountered.\nHelps the developer — or their agent — understand why a decision exists.",
        },
        {
          name: "Roadmap.md",
          description: "Priorities, task status and next steps.",
        },
        {
          name: "Specifications.md",
          description:
            "Functional rules, constraints and acceptance criteria.",
        },
        {
          name: "Validated repo",
          description: "Validated prototype used as a behavioral reference.",
        },
      ],
    },
  },
  fr: {
    seoTitle: "Ma vision de l’IA",
    seoDescription:
      "Une vision personnelle, critique et structurée de la façon dont Quentin Gillon utilise l’IA comme levier de qualité en Product Design.",
    hero: {
      eyebrow: "IA × Product Design",
      title: "Ma vision de l’IA",
      intro:
        "Pour moi, l'IA n'est pour le moment pas un outil visant à accélerer ni à remplacer le travail du product design. \n \nL'ia est un <b>levier de qualité</b> dans la réflexion design. Il nous permet d'explorer <b>plus d'options</b>, d'etre <b>plus clair</b>, <b>plus exhaustif</b>, et surtout d'<b>inverser le processus de prototypage</b> en permattant les tests d'arriver beaucoup plus tôt.",
      note:
        "DISCLAIMER: Il s'agit de mon workflow actuel pour des projets personnels, et non d'un processus d'entreprise que j'aurais déjà industrialisé avec une équipe complète.",
    },
    impact: {
      title: "Où l’IA m’aide le plus",
      description:
        "Un modèle de scoring personnel basé sur ma pratique du Product Design avec l’IA.",
      modelLabel: "Scoring personnel des étapes de product design",
      scoreLabel: "Score",
      maxScoreLabel: "sur 15",
      criteriaLabels: {
        speedGain: "Gain de temps",
        qualityGain: "Gain de qualité",
        riskControl: "Confiance en l’IA",
      },
      taskLabels: {
        understand: "Comprendre",
        structure: "Structurer",
        explore: "Explorer",
        prototype: "Prototyper",
        evaluate: "Évaluer",
        decide: "Décider",
        document: "Documenter",
        communicate: "Communiquer",
        produce: "Produire",
        polish: "Polir",
      },
      taskDescriptions: {
        understand: "Discovery, Recherche, Interview, Analyses",
        structure: "Cadrage problème, Workflow, Critères de décision",
        explore: "Solutions, Options, Scénarios, Alternatives",
        prototype: "Figma, Vibe coding, Prototypes interactifs",
        evaluate: "Tests, Critique, Edge cases, Review",
        decide: "Arbitrages, Trade-offs, Choix de solutions",
        document: "Specs, Handoff, Mémoires, Guidelines, Design System",
        communicate: "Storytelling, Alignment, Presentations, Conversations d’équipe",
        produce: "Création d'écrans, Flow, Assets, Composants",
        polish: "Craft visuel, Finition, Microcopy, Détails UI",
      },
    },
    workflow: {
      title: "Mon workflow augmenté par l’IA",
      intro:
        "À chaque étape, je garde la décision et le jugement design. L’IA m’aide à structurer, challenger, explorer et documenter mais elle ne décide pas pour moi et ne créé pas de preuves.",
      steps: [
        {
          title: "Discovery",
          whatAiDoes: [
            "Structure les notes, signaux quali et données quanti",
            "Aide à repérer des patterns et contradictions",
            "Challenge les premières hypothèses",
          ],
          whatAiDoesNotDo: [
            "Ne remplace pas les entretiens utilisateurs",
            "Ne décide pas ce qui est un vrai insight",
            "Ne transforme pas une corrélation en preuve",
          ],
        },
        {
          title: "Problem framing",
          whatAiDoes: [
            "Aide à formuler plusieurs angles de problème",
            "Rend visibles les hypothèses et zones floues",
            "Propose des reformulations plus claires",
          ],
          whatAiDoesNotDo: [
            "Ne choisit pas le problème à résoudre",
            "Ne remplace pas le contexte business",
            "Ne valide pas seule la priorité produit",
          ],
        },
        {
          title: "Exploration",
          whatAiDoes: [
            "Élargit le champ des solutions possibles",
            "Génère des variantes, scénarios et edge cases",
            "Aide à comparer les forces et limites de chaque piste",
          ],
          whatAiDoesNotDo: [
            "Ne choisit pas la solution finale",
            "Ne remplace pas le goût produit",
            "Ne garantit pas la faisabilité technique",
          ],
        },
        {
          title: "Prototyping",
          whatAiDoes: [
            "Créé les flows interactifs",
            "Documente les références figma dans design.md",
            "Documente les trade-offs et décisions dans Roadmap.md & Memory.md",
          ],
          whatAiDoesNotDo: [
            "Ne produit pas du code de production",
            "Ne créé rien dans figma ni dans le design system",
            "Ne valide pas l’expérience sans test utilisateur",
          ],
        },
        {
          title: "Testing",
          whatAiDoes: [
            "Aide à préparer les scénarios de test",
            "Repère les biais possibles dans les questions",
            "Structure les retours et signaux observés",
          ],
          whatAiDoesNotDo: [
            "Ne remplace pas les vrais utilisateurs",
            "Ne transforme pas un test faible en preuve solide",
            "Ne décide pas seule si une solution fonctionne",
          ],
        },
        {
          title: "Arbitrage",
          whatAiDoes: [
            "Synthétise les options et leurs compromis",
            "Rend visibles les risques, coûts et bénéfices",
            "Aide à formaliser les critères de décision",
          ],
          whatAiDoesNotDo: [
            "Ne prend pas la décision finale",
            "Ne remplace pas la responsabilité produit",
            "Ne tranche pas sans contexte humain, business et technique",
          ],
        },
        {
          title: "Handoff",
          whatAiDoes: [
            "Créé un package structuré pour l'équipe d'engineering",
            "Aide à produire Design.md, Memory.md, Roadmap.md et Specifications.md",
            "Transforme le prototype validé en support plus exploitable pour les devs",
          ],
          whatAiDoesNotDo: [
            "Ne remplace pas la discussion avec les engineers",
            "Ne garantit pas seule la qualité technique",
            "Ne doit pas introduire des règles non validées",
          ],
        },
      ],
    },
    prototypingLoop: {
      title: "Ma boucle de prototypage avec agents",
      intro:
        "Je ne demande pas à l’IA de concevoir seule. J’alimente une boucle contrôlée avec des tâches, du contexte design et des validations.",
      legend: [
        { id: "protocol", label: "Protocole agents", tone: "protocol" },
        { id: "human", label: "Action humaine", tone: "human" },
      ],
      inputTitle: "Ce que j’alimente",
      loopTitle: "Boucle des agents",
      outputTitle: "Ce que la boucle produit",
      inputs: [
        {
          id: "todo",
          title: "Todo.md",
          description: "Corrections, ajouts, nouvelles tâches et priorités.",
          icon: "list",
          emphasis: "primary",
          note: "C’est souvent ma principale entrée : j’ajoute les corrections pendant que le prototype évolue.",
        },
        {
          id: "figma",
          title: "Figma",
          description: "Flows, composants, tokens et références visuelles.",
          icon: "figma",
          emphasis: "primary",
          note: "Je peux continuer à travailler sur Figma pendant que les agents avancent sur une autre partie du flow.",
        },
        {
          id: "design",
          title: "Design.md",
          description: "Mis à jour seulement quand le système ou les règles design évoluent.",
          icon: "file",
          emphasis: "secondary",
          badge: "si besoin",
          note: "Design.md n’est pas un brief figé : il évolue quand le système ou les règles changent.",
        },
      ],
      loopSteps: [
        { id: "read-todo", title: "Lit Todo.md", icon: "list" },
        { id: "update-roadmap", title: "Met à jour Roadmap.md", icon: "roadmap" },
        { id: "pick-task", title: "Prend la tâche prioritaire", icon: "check" },
        { id: "check-design", title: "Vérifie Design.md et Figma", icon: "figma" },
        {
          id: "questions",
          title: "Pose les questions utiles",
          icon: "question",
          note: "L’agent ne doit pas combler les flous seul.",
        },
        { id: "plan", title: "Propose un plan", icon: "agent" },
        { id: "implement", title: "Implémente le prototype", icon: "code" },
        {
          id: "manual-test",
          title: "Propose un test manuel",
          icon: "test",
          note: "Chaque itération doit produire une vérification concrète.",
        },
      ],
      validation: {
        title: "Validation humaine",
        description: "Je valide, corrige ou réoriente avant que la boucle se ferme.",
        icon: "shield",
        note: "C’est moi qui valide, corrige ou réoriente.",
      },
      updates: [
        {
          id: "memory-update",
          title: "Met à jour Memory.md, Roadmap.md, Specifications.md",
          description: "Mémoire projet, état des tâches et règles restent à jour.",
          icon: "memory",
        },
        {
          id: "commit",
          title: "Commit si validé",
          description: "La prochaine itération repart de Todo.md.",
          icon: "commit",
          note: "Aucun commit sans validation.",
        },
      ],
      outputs: [
        {
          id: "prototype",
          title: "Prototype interactif",
          description: "Un flow testable avec interactions, états et edge cases.",
          icon: "code",
        },
        {
          id: "memory",
          title: "Memory.md",
          description: "Décisions, contexte et apprentissages conservés.",
          icon: "memory",
          note: "Évite de perdre le contexte entre deux sessions.",
        },
        {
          id: "roadmap",
          title: "Roadmap.md",
          description: "Tâches priorisées, en cours ou terminées.",
          icon: "roadmap",
        },
        {
          id: "specifications",
          title: "Specifications.md",
          description: "Règles et contraintes mises à jour si la solution évolue.",
          icon: "specs",
        },
        {
          id: "commit",
          title: "Commit validé",
          description: "Seulement après test manuel et validation.",
          icon: "commit",
        },
      ],
      guardrailsTitle: "Garde-fous",
      guardrails: [
        { id: "human", label: "Validation humaine", icon: "shield" },
        { id: "manual-test", label: "Test manuel à chaque itération", icon: "test" },
        { id: "parity", label: "Parité Figma / prototype", icon: "figma" },
        { id: "checks", label: "Lint, typecheck et tests avant PR", icon: "check" },
      ],
    },
    handoff: {
      title: "Le handoff comme mémoire structurée",
      packageLabel: "Package de handoff",
      packageBody:
        "Le but n’est pas seulement de transmettre une solution finie.\nLe package transmet aussi le contexte, le raisonnement et les décisions déjà testées, pour éviter la perte d’information entre design, prototype et implémentation.",
      files: [
        {
          name: "Design.md",
          description:
            "Choix UI, flows, états, edge cases et logique d’interaction.",
        },
        {
          name: "Memory.md",
          description:
            "Raisonnement, arbitrages et erreurs déjà rencontrées.\nPermet au dev — ou à son agent — de comprendre pourquoi une décision existe.",
        },
        {
          name: "Roadmap.md",
          description: "Priorités, statut des tâches et prochaines étapes.",
        },
        {
          name: "Specifications.md",
          description:
            "Règles fonctionnelles, contraintes et critères d’acceptation.",
        },
        {
          name: "Validated repo",
          description: "Prototype validé servant de référence comportementale.",
        },
      ],
    },
  },
} satisfies Record<Locale, AiPageContent>;

export const getAiPageContent = (locale: string): AiPageContent =>
  aiPageContent[locale === "fr" ? "fr" : "en"];
