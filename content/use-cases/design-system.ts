import type { UseCase } from "@/content/use-cases/types";

const designSystemFigmaPreview =
  "https://www.figma.com/design/avvTCRSu4yLCeWcyEnJPqL/Slash-Figma?node-id=8845-72979&t=y5MXYta86W8mmaqI-11";

const en: UseCase = {
  title: "Aligning product, design and development",
  slug: "product-ops-transformation",
  overview:
    "When Enphase acquired us in 2022, our teams had to move from startup-style delivery to a more global product organization.\n\nI structured a shared delivery system between product, design and development to reduce interpretation, rework and design/dev gaps.",
  challenge:
    "Scale delivery without letting each team reinterpret what needed to be shipped.",
  roles: ["Design Operations Lead"],
  year: "2023",
  timeline: "2 years",
  tools: ["Figma", "Notion", "Storybook", "Jira", "Flutter"],
  tags: ["B2E", "Web & Mobile", "Governance", "Product Ops"],
  projectType: "mobile et web",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/design-system/EN_designsystem_preview.png",
    alt: "Preview of the Product Ops transformation - handoff, development and review better aligned.",
  },
  resultHero: {
    type: "figma",
    src: designSystemFigmaPreview,
    title: "Shared delivery system and design system",
    mode: "file",
    format: "web",
    protected: true,
  },
  tension: {
    title: "Understanding the problem",
    tensions: [
      {
        label: "For the product team",
        value:
          "Decisions came back too late, often after development had already started.",
        bullets: [
          "Decisions were hard to preserve",
          "Acceptance criteria were unclear",
          "Trade-offs were reopened",
        ],
      },
      {
        label: "For design",
        value:
          "Mockups showed the visual intent, but not always the usage rules.",
        bullets: [
          "Incomplete states",
          "Missing edge cases",
          "Patterns reinvented",
        ],
      },
      {
        label: "For developers",
        value:
          "Developers had to translate product intentions into implementation logic.",
        bullets: [
          "Divergent implementations",
          "Review loops",
          "Implicit decisions",
        ],
      },
    ],
    coreQuestion:
      "How can we reduce interpretation between product, design and development before development starts?",
    discoverySignals: [
      "Workflow audit",
      "Ticket analysis",
      "Review analysis",
      "Artifact mapping",
      "Stakeholder interviews",
    ],
    chartCards: [
      {
        caption:
          "Too many decisions remained open after development had started.",
        chart: {
          type: "dual-progress",
          rows: [
            {
              title: "Clarifications after dev start",
              description: "Share of tickets returning to discussion after development had started.",
              display: "59%",
              percent: 59,
              variant: "primary",
            },
            {
              title: "Tickets with more than one review cycle",
              description: "Share of tickets requiring more than one design/dev correction cycle.",
              display: "40%",
              percent: 40,
              variant: "secondary",
            },
          ],
        },
      },
      {
        caption: "Rework mostly came from decisions that remained implicit.",
        chart: {
          type: "vertical-bars",
          title: "Implicit decisions in tickets",
          bars: [
            { label: "Missing\nstates", value: 38, color: "var(--color-primary)" },
            { label: "Ambiguous\nflows", value: 31, color: "#00fe33" },
            { label: "Unclear\ncriteria", value: 18, color: "#c3fe00" },
            { label: "No\nreuse", value: 16, color: "#fef100" },
            { label: "Technical\nconstraint", value: 7, color: "#feba00" },
          ],
        },
      },
      {
        caption:
          "Teams did not always share the same definition of the deliverable.",
        chart: {
          type: "single-kpi",
          value: "61%",
          title: "Cross-discipline reviews",
          description:
            "Share of tickets receiving at least two types of feedback: product, design or engineering.",
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
          "Centralize rules and guidelines to help every team find the same decisions.",
        pros: ["Fast to launch", "Easy to consult"],
        cons: ["Little real adoption", "Decisions still came late"],
      },
      {
        id: "strengthen-reviews",
        title: "Strengthen reviews",
        summary:
          "Add more controls at the end of the cycle to detect gaps before release.",
        pros: ["Detects gaps", "Improves quality"],
        cons: ["Comes too late", "Adds rework"],
      },
      {
        id: "shared-delivery-system",
        title: "Create shared delivery",
        summary:
          "Align product, design and development around shared gates, artifacts and quality criteria.",
        pros: ["Aligns earlier", "Reduces interpretation"],
        cons: ["Requires adoption", "More demanding at first"],
      },
    ],
    selectedSolutionId: "shared-delivery-system",
    keyDecisions: [
      {
        id: "delivery",
        eyebrow: "Delivery decision",
        title: "Move friction BEFORE development",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN_workflow.png",
          alt: "Workflow showing product, design and engineering decisions moved before development.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/design-system/FullWorkflow.png",
            alt: "Full workflow showing the product delivery alignment and validation process.",
          },
        ],
        avoidedCost: [
          "Decisions reopened during review",
          "Late rework",
          "Quality dependent on informal exchanges",
        ],
        acceptedCost: [
          "Greater initial effort",
          "Perceived risk of a heavier process",
        ],
      },
      {
        id: "governance",
        eyebrow: "Governance decision",
        title: "Clarify who decides what",
        summary:
          "We separated foundations, components and product usages to make responsibilities clearer.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN_designArchitecture.png",
          alt: "Design system architecture separating foundations, components, product usages and governance responsibilities.",
        },
        gallery: [
          {
            type: "figma",
            src: "https://www.figma.com/design/avvTCRSu4yLCeWcyEnJPqL/Slash-Figma?node-id=9-93&p=f&t=y5MXYta86W8mmaqI-0",
            title: "Design system",
            caption: "Components built on top of the token architecture",
            mode: "file",
            format: "web",
            protected: true,
          },
          {
            type: "figma",
            src: "https://www.figma.com/design/FCHt6WHcSXBjp72ZpAXTSN/ENL1-Mockups?m=auto&t=y3MnBAtvL1KApKDp-6",
            title: "Mockups using the DS",
            caption: "Product mockups created with the shared component system",
            mode: "file",
            format: "web",
            protected: true,
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
        eyebrow: "Quality decision",
        title: "Make quality verifiable",
        summary:
          "We turned handoff and review into observable criteria, less dependent on opinions.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN_HandoffPackage.png",
          alt: "Handoff package and review checklist reducing interpretation during development.",
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
        eyebrow: "Adoption decision",
        title: "Rely on technical relays",
        summary:
          "We involved senior developers to turn rules into practices that were actually used.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN_Adoption.png",
          alt: "Adoption model showing how technical relays helped teams use the system.",
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
    summary:
      "Delivery became more predictable on the covered workflows: less interpretation, more reuse and more measurable quality criteria.",
    bullets: [
      {
        bold: "Alignment became a delivery step",
        regular: "fewer decisions reopened late during review",
      },
      {
        bold: "Speed increased on covered patterns",
        regular: "faster prototyping and implementation thanks to reusable components",
      },
      {
        bold: "Quality depended less on individuals",
        regular: "design/dev parity, clearer handoff and measurable adoption",
      },
    ],
    charts: [
      {
        type: "duration-bars",
        items: [
          { label: "Standard screen\nprototyping", before: { display: "3h30", value: 3.5 }, after: { display: "1h15", value: 1.25 } },
          { label: "Standard screen\nimplementation", before: { display: "12h", value: 12 }, after: { display: "5h", value: 5 } },
          { label: "Post-review\ncorrections", before: { display: "5h", value: 5 }, after: { display: "2h", value: 2 } },
        ],
        caption:
          "Gains appeared mostly on screens covered by the system.",
      },
      {
        type: "kpi-progress",
        title: "Governance KPIs created",
        rows: [
          { label: "Figma / Flutter parity", display: "78%", percent: 78 },
          { label: "New tickets with DS adoption", display: "62%", percent: 62 },
          { label: "Pulse survey: handoff clarity score", display: "4.0 / 5", rating: { value: 4, max: 5 } },
        ],
        caption:
          "Alignment became measurable through parity, adoption and clarity.",
      },
    ],
  },
  retrospective: {
    title: "Retrospective",
    dontLabel: "DON'T",
    doLabel: "INSTEAD",
    items: [
      {
        dont: "Optimize each team separately",
        do: "Optimize the handoffs between teams",
      },
      {
        dont: "Fix alignment during review",
        do: "Create alignment before development",
      },
      {
        dont: "Wait for the system to adopt itself",
        do: "Build adoption with its future users",
      },
    ],
  },
  relatedUseCaseSlugs: [],
};

const fr: UseCase = {
  title: "Aligner product, design et développement",
  slug: "product-ops-transformation",
  overview: "Lorsque Enphase nous a rachetés en 2022, nos équipes ont dû passer d’une delivery startup à une organisation produit plus globale. \n\nJ’ai structuré un système de delivery partagé entre product, design et dev pour réduire l’interprétation, le rework et les écarts design/dev.",
 challenge: "Faire scaler la delivery sans laisser chaque équipe réinterpréter ce qui devait être livré.",
  roles: ["Design Operations Lead"],
  year: "2023",
  timeline: "2 ans",
  tools: ["Figma", "Notion", "Storybook", "Jira", "Flutter"],
  tags: ["B2E", "Web & Mobile", "Governance", "Product Ops"],
  projectType: "mobile et web",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/design-system/FR_designsystem_preview.png",
    alt: "Aperçu de la transformation Product Ops — handoff, développement et review mieux alignés",
  },
  resultHero: {
    type: "figma",
    src: designSystemFigmaPreview,
    title: "Système de delivery et design system partagé",
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
      "Les arbitrages revenaient trop tard, souvent après le démarrage du développement.",
    bullets: [
      "Décisions difficiles à préserver",
      "Critères d’acceptation flous",
      "Arbitrages réouverts",
    ],
  },
  {
    label: "Pour le design",
    value:
      "Les maquettes montraient l’intention visuelle, mais pas toujours les règles d’usage.",
    bullets: [
      "États incomplets",
      "Edge cases absents",
      "Patterns réinventés",
    ],
  },
  {
    label: "Pour les dev",
    value:
      "Les développeurs devaient transformer des intentions produit en logique d’implémentation.",
    bullets: [
      "Implémentations divergentes",
      "Boucles de review",
      "Décisions implicites",
    ],
  },
],
    coreQuestion:
  "Comment réduire l’interprétation entre product, design et développement avant le démarrage du dev ?",
  discoverySignals: [
  "Audit du workflow",
  "Analyse de tickets",
  "Analyse des reviews",
  "Cartographie des artefacts",
  "Entretiens avec les parties prenantes",
    ],
    chartCards: [
      {
        caption:
          "Trop de décisions restaient ouvertes après le démarrage du développement",
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
        caption: "Le rework venait surtout de décisions restées implicites.",
        chart: {
          type: "vertical-bars",
          title: "Décisions implicites dans les tickets",
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
          "Les équipes ne partageaient pas toujours la même définition du livrable",
        chart: {
          type: "single-kpi",
          value: "61%",
          title: "Reviews multi-métier",
          description:
            "Part des tickets recevant au moins deux types de feedback : produit, design ou engineering",
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
      "Centraliser les règles et guidelines pour aider chaque équipe à retrouver les mêmes décisions.",
    pros: [
      "Rapide à lancer",
      "Facile à consulter",
    ],
    cons: [
      "Peu d’adoption réelle",
      "Décisions encore tardives",
    ],
  },
  {
    id: "renforcer-reviews",
    title: "Renforcer les reviews",
    summary:
      "Ajouter plus de contrôles en fin de cycle pour détecter les écarts avant livraison.",
    pros: [
      "Détecte les écarts",
      "Améliore la qualité",
    ],
    cons: [
      "Arrive trop tard",
      "Ajoute du rework",
    ],
  },
  {
    id: "systeme-delivery-partage",
    title: "Créer une delivery partagée",
    summary:
      "Aligner product, design et dev autour de gates, artefacts et critères qualité communs.",
    pros: [
      "Aligne plus tôt",
      "Réduit l’interprétation",
    ],
    cons: [
      "Demande adoption",
      "Plus exigeant au départ",
    ],
  },
],
selectedSolutionId: "systeme-delivery-partage",
    keyDecisions: [
      {
        id: "delivery",
        eyebrow: "Décision sur la delivery",
        title: "Déplacer la friction AVANT le développement",
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
        eyebrow: "Décision sur la gouvernance",
        title: "Clarifier qui décide quoi",
         summary:
    "Nous avons séparé fondations, composants et usages produit pour rendre les responsabilités plus claires.",
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
        eyebrow: "Décision sur la qualité",
        title: "Rendre la qualité vérifiable",
        summary:
    "Nous avons transformé le handoff et la review en critères observables, moins dépendants des opinions.",
  media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_HandoffPackage.png",
          alt: "Handoff package et checklist de review permettant de réduire les interprétations pendant le développement.",
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
        eyebrow: "Décision sur l'adoption",
        title: "S’appuyer sur des relais techniques",
        summary:
    "Nous avons impliqué des devs seniors pour transformer les règles en pratiques réellement utilisées.",
  media: {
          type: "image",
          src: "/assets/use-cases/design-system/FR_Adoption.png",
          alt: "Modèle d’adoption montrant comment les relais techniques aidaient les équipes à utiliser le système."
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
  impactSection: {  title: "Les impacts",
  summary:
    "La delivery est devenue plus prévisible sur les workflows couverts : moins d’interprétation, plus de réutilisation et des critères qualité plus mesurables.",
  bullets: [
    {
      bold: "L’alignement est devenu une étape du delivery",
      regular: "moins de décisions réouvertes tardivement en review",
    },
    {
      bold: "La vitesse a augmenté sur les patterns couverts",
      regular: "prototypage et implémentation accélérés grâce aux composants réutilisables",
    },
    {
      bold: "La qualité dépendait moins des individus",
      regular: "parité design/dev, handoff plus clair et adoption mesurable",
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
          "Les gains apparaissaient surtout sur les écrans couverts par le système",
      },
      {
        type: "kpi-progress",
        title: "KPI de gouvernance créés",
        rows: [
          { label: "Parité Figma / Flutter", display: "78%", percent: 78 },
          { label: "Nouveaux tickets avec DS (adoption)", display: "62%", percent: 62 },
          { label: "Pulse survey: Score de clarté handoff", display: "4.0 / 5", rating: { value: 4, max: 5 } },
        ],
        caption:
          "L’alignement devenait mesurable par la parité, l’adoption et la clarté",
      },
    ],
  },
  retrospective: {
  title: "Rétrospective",
  dontLabel: "NE PLUS",
  doLabel: "MAIS PLUTÔT",
  items: [
    {
      dont: "Optimiser chaque équipe séparément",
      do: "Optimiser les passages entre équipes",
    },
    {
      dont: "Corriger l’alignement en review",
      do: "Créer l’alignement avant le développement",
    },
    {
      dont: "Attendre que le système s’adopte seul",
      do: "Construire l’adoption avec ses futurs utilisateurs",
    },
  ],
},
  relatedUseCaseSlugs: [],
};

export const designSystem: Record<string, UseCase> = { en, fr };
