import type { UseCase } from "@/content/use-cases/types";

const designSystemFigmaPreview =
  "https://www.figma.com/design/avvTCRSu4yLCeWcyEnJPqL/Slash-Figma?node-id=8845-72979&t=y5MXYta86W8mmaqI-11";

const en: UseCase = {
  title: "Raised first-week activation by making setup feel like progress",
  slug: "product-ops-transformation",
  overview:
    "Reshaped onboarding around one meaningful early win, reducing decision fatigue and improving first-week activation on mobile.",
  challenge:
    "Increase activation on mobile without turning onboarding into a longer checklist or a skippable tutorial.",
  roles: ["Design Operations Lead"],
  year: "2024",
  timeline: "10 weeks",
  tools: ["Figma", "Amplitude", "Lookback", "FigJam", "After Effects"],
  tags: ["B2C", "Mobile", "Growth"],
  projectType: "mobile",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/mobile-onboarding-optimization/preview.svg",
    alt: "Mobile preview cards for the onboarding optimization case study.",
  },
  previewRatio: "586/1254",
  resultHero: {
    type: "figma",
    src: designSystemFigmaPreview,
    title: "Design system Figma file",
    mode: "file",
    format: "web",
    protected: true,
  },
  tension: {
    title: "Understanding the problem",
    tensions: [
      {
        label: "For users",
        value:
          "The challenge was tied to user motivations, uneven levels of understanding, and very different usage contexts from one household to another.",
        bullets: [
          "Very different levels of understanding",
          "Savings came first in user expectations",
          "Equipment varied significantly from one household to another",
        ],
      },
      {
        label: "For the business",
        value:
          "The impact was immediate on the business side, creating sales friction and making the product's value harder to communicate.",
        bullets: [
          "Low perceived value",
          "Limited engagement",
          "Product impact was hard to demonstrate",
        ],
      },
    ],
    coreQuestion:
      "How might we create value for heterogeneous users primarily motivated by savings?",
    chartCards: [
      {
        caption: "Highly heterogeneous household types and installations",
        chart: {
          type: "vertical-bars",
          bars: [
            { label: "Home\nonly",          value: 34, color: "var(--color-primary)" },
            { label: "Solar\nonly",         value: 27, color: "#00fe33" },
            { label: "Solar +\nbat.",       value: 18, color: "#c3fe00" },
            { label: "Solar +\nEV",         value: 11, color: "#fef100" },
            { label: "Solar +\nbat. + EV",  value: 10, color: "#feba00" },
          ],
        },
      },
      {
        caption: "The current dashboard is too dense or too confusing",
        chart: {
          type: "dual-progress",
          rows: [
            {
              title: "Bounce rate",
              description: "Share of sessions leaving the dashboard without interacting with its key elements.",
              display: "48%",
              percent: 48,
              variant: "primary",
            },
            {
              title: "Time on dashboard",
              description: "Average time spent on the dashboard per user session.",
              display: "41 sec",
              percent: 72,
              variant: "secondary",
            },
          ],
        },
      },
      {
        caption: "A significant retention drop after one month",
        chart: {
          type: "line",
          points: [
            { label: "D0",  value: 100, color: "var(--color-primary)" },
            { label: "D7",  value: 26,  color: "#00fe33" },
            { label: "D30", value: 9,   color: "var(--color-secondary)" },
          ],
        },
      },
      {
        caption: "Savings interest users the most",
        chart: {
          type: "ranked-bars",
          title: "Interaction rate by displayed module type",
          bars: [
            { label: "Estimated savings",  value: 31, percent: 100, isPrimary: true },
            { label: "Home consumption",   value: 28, percent: 75,  isPrimary: false },
            { label: "Production",         value: 17, percent: 45,  isPrimary: false },
            { label: "CO2 saved",          value: 15, percent: 41,  isPrimary: false },
          ],
        },
      },
    ],
  },
  solution: {
    title: "Exploration and solution",
    exploredSolutions: [
      {
        id: "strengthen-documentation",
        title: "Strengthen documentation",
        summary:
          "Centralize rules and guidelines to make information more accessible.",
        pros: ["Fast to implement"],
        cons: ["No habit change"],
      },
      {
        id: "strengthen-reviews",
        title: "Strengthen reviews",
        summary:
          "Add more end-of-cycle controls to detect gaps.",
        pros: ["Detects issues better"],
        cons: ["Comes too late"],
      },
      {
        id: "shared-delivery-system",
        title: "Create a shared delivery system",
        summary:
          "Align product, design and engineering around shared gates, artifacts, rules and quality criteria.",
        pros: ["Aligns earlier"],
        cons: ["Adoption is critical"],
      },
    ],
    selectedSolutionId: "shared-delivery-system",
    keyDecisions: [
      {
        id: "delivery",
        eyebrow: "Key delivery decision",
        title: "Move friction BEFORE development",
        summary: "Intentional upstream friction to reduce downstream rework",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN_workflow.png",
          alt: "Workflow showing how product, design and engineering decisions move before development.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/design-system/FullWorkflow.png",
            alt: "Full product delivery workflow showing the complete alignment and validation process.",
          },
        ],
        avoidedCost: [
          "Decisions reopened in review",
          "Late rework",
          "Quality dependent on informal exchanges",
        ],
        acceptedCost: [
          "More initial effort",
          "Perceived risk of a heavier process",
        ],
      },
      {
        id: "governance",
        eyebrow: "Key governance decision",
        title: "Separate responsibilities to align disciplines",
        summary:
          "The goal was to move away from a single library where global decisions, components and product usages were mixed together.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_designArchitecture.png",
          alt: "Design system architecture separating foundation, components, product usages and governance responsibilities.",
        },
        gallery: [
          {
            type: "figma",
            src: "https://www.figma.com/design/avvTCRSu4yLCeWcyEnJPqL/Slash-Figma?node-id=9-93&p=f&t=y5MXYta86W8mmaqI-0",
            title: "Design system components",
            caption: "Component library built on top of the token architecture",
            mode: "file",
            format: "web",
            protected: true,
          },
          {
            type: "figma",
            src: "https://www.figma.com/design/FCHt6WHcSXBjp72ZpAXTSN/ENL1-Mockups?m=auto&t=y3MnBAtvL1KApKDp-6",
            title: "Mockups using the design system",
            caption: "Product mockups created with the shared component system",
            mode: "file",
            format: "web",
            protected: true,
          },
          {
            type: "video",
            src: "/assets/use-cases/design-system/pocMolecule.mp4",
            poster: "/assets/use-cases/design-system/previewDesignSystem.png",
            alt: "PoC video showing how the molecule system works.",
            caption: "PoC video showing how the molecule system works",
            format: "web",
          },
        ],
        avoidedCost: [
          "Unmanageable single library",
          "Scattered global decisions",
          "Uncontrolled contributions",
        ],
        acceptedCost: [
          "More demanding architecture",
          "Learning required",
          "More structured contribution",
        ],
      },
      {
        id: "quality",
        eyebrow: "Key quality decision",
        title: "Make handoff and review verifiable",
        summary: "Less interpretation upfront, less opinion in review",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_HandoffPackage.png",
          alt: "Handoff package and review checklist making design-to-development quality criteria explicit.",
        },
        gallery: [],
        avoidedCost: [
          "Subjective validations",
          "Late back-and-forth",
          "Variable criteria",
        ],
        acceptedCost: [
          "More complete tickets",
          "More demanding reviews",
          "More discipline before development",
        ],
      },
      {
        id: "adoption",
        eyebrow: "Key adoption decision",
        title: "Build adoption with technical relays",
        summary:
          "Adoption did not come from documentation alone, but from technical relays involved in decisions.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_Adoption.png",
          alt: "Adoption model showing technical relays involved in design system decisions.",
        },
        gallery: [],
        avoidedCost: [
          "Design-only adoption",
          "Superficial usage",
          "Dependency on owners",
        ],
        acceptedCost: [
          "Senior development time",
          "Technical debates",
          "Progressive adoption",
        ],
      },
    ],
  },
  impactSection: {
    title: "The impacts",
    summary: "All signals point in the same direction",
    bullets: [
      { bold: "The first visit becomes more relevant", regular: "(lower bounce, more time spent)" },
      { bold: "Value is better perceived from the start", regular: "(more return after first session)" },
      { bold: "This effect is not limited to curiosity", regular: "(still perceptible after 30 days)" },
      { bold: "Personalised modules seem better targeted", regular: "(engagement up on modules)" },
    ],
    charts: [
      { type: "bar", title: "Day-7 retention",         before: { display: "26%", value: 26 }, after: { display: "34%", value: 34 } },
      { type: "bar", title: "Day-30 retention",        before: { display: "09%", value: 9  }, after: { display: "17%", value: 17 } },
      { type: "bar", title: "Module interaction rate", before: { display: "22%", value: 22 }, after: { display: "34%", value: 34 } },
      {
        type: "progress",
        rows: [
          { label: "Bounce rate",       before: { display: "48%",    percent: 48 }, after: { display: "42%",    percent: 42 } },
          { label: "Time on Dashboard", before: { display: "41 sec", percent: 41 }, after: { display: "54 sec", percent: 54 } },
        ],
      },
    ],
  },
  retrospective: {
    title: "Retrospective",
    summary: "A few short lessons the project changed in my practice.",
    dontLabel: "DON'T",
    doLabel: "INSTEAD",
    items: [
      {
        dont: "Design one view for everyone",
        do: "Use onboarding to segment and configure a more relevant experience",
      },
      {
        dont: "Organise the interface around product logic",
        do: "Organise it around user intent",
      },
      {
        dont: "Measure along a single dimension",
        do: "Track a combined set of targeted signals",
      },
    ],
  },
  relatedUseCaseSlugs: [],
};

const fr: UseCase = {
  title: "Structurer la delivery entre design, product et développement",
  slug: "product-ops-transformation",
  overview: "Transformation d’une delivery fragmentée en système partagé, avec moins d’interprétation, moins de rework et plus de cohérence design/dev",
  challenge: "Scaler la delivery produit sans multiplier les interprétations entre équipes.",
  roles: ["Design Operations Lead"],
  year: "2022",
  timeline: "2 ans",
  tools: ["Figma", "Notion", "Storybook", "Jira", "Flutter"],
  tags: ["B2E", "Web & Mobile", "Governance", "Product Ops"],
  projectType: "mobile et web",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/design-system/previewDesignSystem.png",
    alt: "Design system preview cards for the design system case study.",
  },
  resultHero: {
    type: "figma",
    src: designSystemFigmaPreview,
    title: "Fichier Figma du design system",
    mode: "file",
    format: "web",
    protected: true,
  },
  tension: {
    title: "Comprendre le problème",
    tensions: [
      {
        label: "Pour l’équipe produit",
        value:
          "Les arbitrages revenaient tard dans le cycle, générant des discussions répétées et une perte de clarté.",
        bullets: [
          "Décisions difficiles à préserver",
          "Critères d’acceptation ouverts",
          "Arbitrages tardifs",
        ],
      },
      {
        label: "Pour le design",
        value:
          "Les maquettes ne servaient que de références visuelles, sans donner les règles de comportement, état, edge cases ou variations.",
        bullets: [
          "Désalignement design et dev",
          "États incomplets",
          "Patterns réinventés à chaque feature",
        ],
      },
      {
        label: "Pour les dev",
        value:
          "Les développeurs devaient transformer des intentions visuelles en logique produit, souvent sans règles partagées.",
        bullets: [
          "Implémentations divergentes",
          "Boucles de review",
          "Décisions implicites dans le code",
        ],
      },
    ],
    coreQuestion:
      "Comment passer d’une delivery basée sur l’interprétation à une delivery basée sur des règles partagées ?",
    discoverySignals: [
      "Audit de workflow",
      "Analyse de tickets",
      "Analyse de reviews",
      "Carthographie des artefacts",
      "Entretiens parties prenantes",
    ],
    chartCards: [
      {
        caption:
          "Trop de décisions restaient à prendre après le démarrage du développement",
        chart: {
          type: "dual-progress",
          rows: [
            {
              title: "Clarifications après démarrage dev",
              description: "Part des tickets revenant en discussion après le démarrage du développement.",
              display: "59%",
              percent: 59,
              variant: "primary",
            },
            {
              title: "Tickets avec plus d’un cycle de review",
              description: "Part des tickets nécessitant plus d’un cycle de correction design/dev.",
              display: "40%",
              percent: 40,
              variant: "secondary",
            },
          ],
        },
      },
      {
        caption: "La cause du rework venait surtout de décisions restées implicites.",
        chart: {
          type: "vertical-bars",
          bars: [
            { label: "États\nmanquants", value: 38, color: "var(--color-primary)" },
            { label: "Flows\nambigus", value: 31, color: "#00fe33" },
            { label: "Critères\nflous", value: 18, color: "#c3fe00" },
            { label: "Re-use\nabsent", value: 16, color: "#fef100" },
            { label: "Contrainte\ntechnique", value: 7, color: "#feba00" },
          ],
        },
      },
      {
        caption:
          "Les métiers n’avaient pas la même représentation de ce qui devait être livré",
        chart: {
          type: "single-kpi",
          value: "61%",
          title: "Reworks avec feedback multi-métier",
          description:
            "Part des tickets avec au moins deux types de feedback en review : produit, design ou engineering",
        },
      },
    ],
  },
  solution: {
    title: "Exploration et solution",
    exploredSolutions: [
      {
        id: "renforcer-documentation",
        title: "Renforcer la documentation",
        summary:
          "Centraliser les règles et guidelines pour rendre l'information plus accessible.",
        pros: ["Rapide à mettre en place"],
        cons: ["Pas de changement d’habitudes"],
      },
      {
        id: "renforcer-reviews",
        title: "Renforcer les reviews",
        summary:
          "Ajouter plus de contrôles en fin de cycle pour détecter les écarts.",
        pros: ["Détecte mieux les problèmes"],
        cons: ["Arrive trop tard"],
      },
      {
        id: "systeme-delivery-partage",
        title: "Créer un système de delivery partagé",
        summary:
          "Aligner product, design et engineering autour de gates, artefacts, règles et critères qualité partagés.",
        pros: ["Aligne plus tôt"],
        cons: ["Adoption cruciale"],
      },
    ],
    selectedSolutionId: "systeme-delivery-partage",
    keyDecisions: [
      {
        id: "delivery",
        eyebrow: "Décision clé sur la delivery",
        title: "Déplacer la friction AVANT le développement",
        summary: "Une friction volontaire en amont pour réduire le rework en aval",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_workflow.png",
          alt: "Workflow montrant le déplacement des décisions product, design et engineering avant le développement.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/design-system/FullWorkflow.png",
            alt: "Workflow complet montrant le processus d’alignement et de validation de la delivery produit.",
          },
        ],
        avoidedCost: [
          "Des décisions réouvertes en review",
          "Rework tardif",
          "Qualité dépendante des échanges informels",
        ],
        acceptedCost: [
          "Un effort initial plus important",
          "Risque perçu d’un process plus lourd",
        ],
      },
      {
        id: "gouvernance",
        eyebrow: "Décision clé sur la gouvernance",
        title: "Séparer les responsabilités pour aligner les métiers",
        summary:
          "L’objectif était de sortir d’une bibliothèque unique où décisions globales, composants et usages produit se mélangeaient",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_designArchitecture.png",
          alt: "Architecture du design system séparant foundations, composants, usages produit et responsabilités de gouvernance.",
        },
        gallery: [
          {
            type: "figma",
            src: "https://www.figma.com/design/avvTCRSu4yLCeWcyEnJPqL/Slash-Figma?node-id=9-93&p=f&t=y5MXYta86W8mmaqI-0",
            title: "Design system",
            caption: "Composants construits sur l'architecture de tokens",
            mode: "file",
            format: "web",
            protected: true,
          },
          {
            type: "figma",
            src: "https://www.figma.com/design/FCHt6WHcSXBjp72ZpAXTSN/ENL1-Mockups?m=auto&t=y3MnBAtvL1KApKDp-6",
            title: "Mockups utilisant le DS",
            caption: "Mockups produit créés avec le système de composants partagé",
            mode: "file",
            format: "web",
            protected: true,
          },
          {
            type: "video",
            src: "/assets/use-cases/design-system/pocMolecule.mp4",
            poster: "/assets/use-cases/design-system/previewDesignSystem.png",
            alt: "Vidéo de PoC montrant comment fonctionne le système de molécules.",
            caption: "Vidéo de PoC pour montrer comment ça fonctionne",
            format: "web",
          },
        ],
        avoidedCost: [
          "Bibliothèque unique ingérable",
          "Décisions globales dispersées",
          "Contributions non contrôlées",
        ],
        acceptedCost: [
          "Architecture plus exigeante",
          "Apprentissage nécessaire",
          "Contribution plus encadrée",
        ],
      },
      {
        id: "qualite",
        eyebrow: "Décision clé sur la qualité",
        title: "Rendre le handoff et la review vérifiables",
        summary: "Moins d’interprétation au départ, moins d’opinion en review",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_HandoffPackage.png",
          alt: "Handoff package et checklist de review rendant les critères qualité vérifiables.",
        },
        gallery: [],
        avoidedCost: [
          "Validations subjectives",
          "Allers-retours tardifs",
          "Critères variables",
        ],
        acceptedCost: [
          "Tickets plus complets",
          "Reviews plus exigeantes",
          "Plus de discipline avant dev",
        ],
      },
      {
        id: "adoption",
        eyebrow: "Décision clé sur l’adoption",
        title: "Construire l’adoption avec des relais techniques",
        summary:
          "L’adoption ne venait pas de la documentation seule, mais de relais techniques impliqués dans les décisions.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_Adoption.png",
          alt: "Modèle d’adoption montrant les relais techniques impliqués dans les décisions du design system.",
        },
        gallery: [],
        avoidedCost: [
          "Adoption design-only",
          "Usage superficiel",
          "Dépendance aux owners",
        ],
        acceptedCost: [
          "Temps senior dev",
          "Débats techniques",
          "Adoption progressive",
        ],
      }
    ],
  },
  impactSection: {
    title: "Les impacts",
    summary:
      "Signaux observés sur les workflows couverts par le design system, les patterns réutilisables et les tickets utilisant les composants du système.",
    bullets: [
      {
        bold: "L’alignement est devenu une étape du delivery",
        regular: "(moins de décisions réouvertes tardivement en review)",
      },
      {
        bold: "La vitesse a augmenté là où le système était réutilisé",
        regular: "(prototypage et implémentation accélérés sur les patterns couverts)",
      },
      {
        bold: "La qualité dépendait moins des individus",
        regular: "(parité design/dev, handoff plus clair, adoption mesurable)",
      },
    ],
    charts: [
      {
        type: "duration-bars",
        items: [
          { label: "Prototypage écran\nstandard", before: { display: "3h30", value: 3.5 }, after: { display: "1h15", value: 1.25 } },
          { label: "Implémentation\nécran standard", before: { display: "12h", value: 12 }, after: { display: "5h", value: 5 } },
          { label: "Corrections après\nreview", before: { display: "5h", value: 5 }, after: { display: "2h", value: 2 } },
        ],
        caption:
          "Les gains les plus visibles apparaissaient sur les tâches récurrentes et les écrans couverts par le système.",
      },
      {
        type: "kpi-progress",
        title: "KPI de gouvernance créées",
        rows: [
          { label: "Parité Figma / Flutter", display: "78%", percent: 78 },
          { label: "Nouveaux tickets avec DS (adoption)", display: "62%", percent: 62 },
          { label: "Pulse survey: Score de clarté handoff", display: "4.0 / 5", rating: { value: 4, max: 5 } },
        ],
        caption:
          "L’alignement devenait mesurable grâce à de nouveaux signaux de parité, d’adoption et de clarté.",
      },
    ],
  },
  retrospective: {
    title: "Retrospective",
    dontLabel: "NE PLUS",
    doLabel: "MAIS PLUTOT",
    items: [
      {
        dont: "Optimiser chaque équipe séparément",
        do: "Optimiser les passages entre product, design et engineering",
      },
      {
        dont: "Corriger l’alignement en review",
        do: "Créer les conditions d’alignement avant le développement",
      },
      {
        dont: "Penser qu’un bon système s’adopte seul",
        do: "Construire l’adoption avec ceux qui vont le faire vivre",
      },
    ],
  },
  relatedUseCaseSlugs: [],
};

export const designSystem: Record<string, UseCase> = { en, fr };
