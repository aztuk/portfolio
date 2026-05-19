import type { UseCase } from "@/content/use-cases/types";


const en: UseCase = {
  order: 4,
  title: "A system to deliver better across product, design, and engineering",
  slug: "product-ops-transformation",
  tagline:
    "Moving from an interpreted handoff to a clear, verifiable, and scalable delivery system.",
  overview:
    "After the acquisition by Enphase in 2022, we moved from <b>startup delivery</b> to a <b>more global</b> product organization.\n\nI structured a shared delivery system between <b>product, design and dev</b> to reduce ambiguity, rework and design/dev gaps.",
  cardDescription:
    "Redesigning the delivery system between product, design, and engineering after acquisition.",
  challenge:
    "Scale delivery without letting each team reinterpret what needed to be shipped.",
  roles: {
    owned: [
      "Delivery workflow",
      "Quality gates",
      "Design handoff",
      "Design system governance",
      "Cross-team alignment",
      "Product/design/dev ops",
    ],
    team: [
      "Product",
      "Engineering",
      "Design",
      "Executive",
    ],
  },
  year: "2023",
  timeline: "2 years",
  tools: ["Figma", "Notion", "Storybook", "Jira", "Flutter"],
  tags: ["Product ops", "Design ops", "Delivery system", "Quality gates", "Design system governance"],
  projectType: "mobile et web",
  thumbnailTagTone: "white",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/design-system/EN/EN_Thumbnail.png",
    alt: "Preview of the Product Ops transformation — handoff, development and review better aligned.",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/design-system/EN/EN_Hero.png",
    alt: "Overview of the shared delivery and design system built for product, design and development.",
  },
  tension: {
    title: "Understanding the problem",
    artifact: {
      type: "image",
      src: "/assets/use-cases/design-system/EN/EN_Tension_Silos.png",
      alt: "Diagram showing the interpretation gaps between product, design and development before the shared delivery system.",
      caption: "Interpretation gaps between product, design and development before the shared delivery system.",
    },
    tensions: [
      {
        label: "For the product team",
        value:
          "Product intent got lost between initial trade-offs, tickets and reviews.",
        bullets: [
          "Unclear acceptance criteria",
          "Reopened trade-offs",
          "Decisions hard to preserve",
        ],
      },
      {
        label: "For design",
        value:
          "Mockups showed the target interface, but not always the rules needed to implement it.",
        bullets: [
          "Incomplete states",
          "Missing edge cases",
          "Reinvented patterns",
        ],
      },
      {
        label: "For developers",
        value:
          "Developers had to guess expected behaviours, states and quality criteria.",
        bullets: [
          "Divergent implementations",
          "Review loops",
          "Implicit decisions",
        ],
      },
    ],
    coreQuestion:
      "How can we make decisions, criteria and responsibilities verifiable before development starts?",
    chartCards: [
      {
        caption:
          "Too many decisions remained open after development had started.",
        methodology: "Ticket analysis",
        methodologyIcon: "clipboard-text",
        chart: {
          type: "combined-kpi",
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
        methodology: "Ticket analysis",
        methodologyIcon: "clipboard-text",
        chart: {
          type: "bars",
          title: "Implicit decisions in tickets",
          bars: [
            { label: "Missing\nstates", value: 38, color: "var(--color-primary)" },
            { label: "Ambiguous\nflows", value: 31, color: "var(--color-chart-lime)" },
            { label: "Unclear\ncriteria", value: 18, color: "var(--color-chart-citron)" },
            { label: "No\nreuse", value: 16, color: "var(--color-chart-yellow)" },
            { label: "Technical\nconstraint", value: 7, color: "var(--color-chart-amber)" },
          ],
        },
      },
      {
        caption:
          "Teams did not always share the same definition of the deliverable.",
        methodology: "Review analysis",
        methodologyIcon: "clipboard-text",
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
          "Centralise rules, components and guidelines in a hub consultable by all teams.",
        pros: [
          "Fast to launch",
          "Easy to consult",
        ],
        cons: [
          "Little real adoption",
          "Decisions still came late",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/ALL_option_A.png",
          alt: "Wireframe of a documentation hub centralizing rules, components and guidelines.",
        },
      },
      {
        id: "strengthen-reviews",
        title: "Strengthen reviews",
        summary:
          "Add more controls at the end of the cycle to detect gaps before release.",
        pros: [
          "Detects gaps",
          "Improves quality",
        ],
        cons: [
          "Comes too late",
          "Adds rework",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/ALL_option_B.png",
          alt: "Wireframe of a workflow adding a strengthened review gate after development.",
        },
      },
      {
        id: "shared-delivery-system",
        title: "Create shared delivery",
        summary:
          "Align product, design and dev around shared gates, artifacts and quality criteria.",
        pros: [
          "Aligns earlier",
          "Reduces interpretation",
        ],
        cons: [
          "Requires adoption",
          "More demanding at first",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/ALL_option_C.png",
          alt: "Wireframe of a shared delivery system with handoff, gates and quality criteria before development.",
        },
      },
    ],
    selectedSolutionId: "shared-delivery-system",
    why:
      "Because the stack change and flagship product redesign made a clearer delivery system necessary before scaling.",
    keyDecisions: [
      {
        id: "delivery",
        eyebrow: "Delivery",
        title: "Move friction before development",
        summary:
          "Because decisions reopened during review cost more than trade-offs made upfront.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN/EN_KD1-0_workflow.png",
          alt: "Workflow showing the shift of product, design and engineering decisions before development starts.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/design-system/ALL_KD1-1_FullWorkflow.png",
            alt: "Full workflow showing the complete product delivery alignment and validation process.",
          },
        ],
        avoidedCost: [
          "Late reopened decisions",
          "Post-development rework",
        ],
        acceptedCost: [
          "More upfront effort",
          "Process perceived as heavier",
        ],
      },
      {
        id: "gouvernance",
        eyebrow: "Governance",
        title: "Clarify who decides what",
        summary:
          "Because a single library was mixing global decisions, components, product usage and responsibilities.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN/EN_KD2-0_designArchitecture.png",
          alt: "Design system architecture separating foundations, components, product usage and governance responsibilities.",
        },
        gallery: [
          {
            type: "figma",
            src: "https://www.figma.com/design/avvTCRSu4yLCeWcyEnJPqL/Slash-Figma?node-id=9-93&p=f&t=y5MXYta86W8mmaqI-0",
            title: "Design system",
            caption: "Components built on the token architecture.",
            mode: "file",
            format: "web",
            protected: true,
          },
          {
            type: "figma",
            src: "https://www.figma.com/design/FCHt6WHcSXBjp72ZpAXTSN/ENL1-Mockups?m=auto&t=y3MnBAtvL1KApKDp-6",
            title: "Mockups using the DS",
            caption: "Product mockups created with the shared system.",
            mode: "file",
            format: "web",
            protected: true,
          },
        ],
        avoidedCost: [
          "Scattered decisions",
          "Uncontrolled contributions",
        ],
        acceptedCost: [
          "More demanding architecture",
          "More structured contribution",
        ],
      },
      {
        id: "qualite",
        eyebrow: "Quality",
        title: "Make quality verifiable",
        summary:
          "Because reviews came too late and relied too often on different opinions.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN/EN_KD3-0_HandoffPackage.png",
          alt: "Handoff package and review checklist reducing interpretation gaps during development.",
        },
        gallery: [],
        avoidedCost: [
          "Subjective validations",
          "Variable criteria",
        ],
        acceptedCost: [
          "More complete tickets",
          "More demanding reviews",
        ],
      },
      {
        id: "adoption",
        eyebrow: "Adoption",
        title: "Rely on technical advocates",
        summary:
          "Because a shared system couldn’t be sustainably adopted if it remained design-only.",
        media: {
          type: "image",
          src: "/assets/use-cases/design-system/EN/EN_KD4-0_Adoption.png",
          alt: "Adoption model showing how technical advocates helped teams use the shared system.",
        },
        gallery: [],
        avoidedCost: [
          "Design-only adoption",
          "Superficial usage",
        ],
        acceptedCost: [
          "Senior dev time",
          "Progressive adoption",
        ],
      },
    ],
  },
  impactSection: {
    title: "The impacts",
    summary:
      "The system made delivery more predictable: fewer reopened decisions, less late rework and more verifiable quality criteria.",
    bullets: [
      {
        bold: "Decisions were less often reopened after dev start",
        regular: "product, design and dev alignment happened earlier",
      },
      {
        bold: "Reviews required fewer late corrections",
        regular: "quality criteria were made explicit before implementation",
      },
      {
        bold: "Quality relied less on informal exchanges",
        regular: "handoff, checklist and governance made expectations verifiable",
      },
    ],
    charts: [
      {
        chart: {
          type: "before-after-bar",
          title: "Clarifications after dev start",
          before: { display: "59%", value: 59 },
          after: { display: "31%", value: 31 },
        },
        caption: "Fewer decisions were reopened after development had started.",
        methodology: "Ticket analysis",
        methodologyIcon: "clipboard-text",
      },
      {
        chart: {
          type: "before-after-bar",
          title: "Tickets with more than one review cycle",
          before: { display: "40%", value: 40 },
          after: { display: "18%", value: 18 },
        },
        caption: "Tickets required fewer back-and-forth review cycles.",
        methodology: "Ticket analysis",
        methodologyIcon: "clipboard-text",
      },
      {
        chart: {
          type: "before-after-bar",
          title: "Cross-discipline reviews",
          before: { display: "61%", value: 61 },
          after: { display: "34%", value: 34 },
        },
        caption: "Teams more often shared the same definition of the deliverable.",
        methodology: "Review analysis",
        methodologyIcon: "clipboard-text",
      },
      {
        chart: {
          type: "duration-bars",
          title: "Time savings on covered screens",
          items: [
            {
              label: "Standard screen\nprototyping",
              before: { display: "3h30", value: 3.5 },
              after: { display: "1h15", value: 1.25 },
            },
            {
              label: "Standard screen\nimplementation",
              before: { display: "12h", value: 12 },
              after: { display: "5h", value: 5 },
            },
            {
              label: "Post-review\ncorrections",
              before: { display: "5h", value: 5 },
              after: { display: "2h", value: 2 },
            },
          ],
        },
        caption: "Gains were mostly visible on screens covered by the system.",
        methodology: "Workflow estimates",
        methodologyIcon: "clipboard-text",
      },
    ],
  },
  retrospective: {
    title: "Retrospective",
    dontLabel: "DON’T",
    doLabel: "INSTEAD",
    items: [
      {
        dont: "Optimize each team separately",
        do: "Optimize the handoffs between teams",
      },
      {
        dont: "Fix alignment during review",
        do: "Create alignment conditions before development",
      },
      {
        dont: "Assume a system adopts itself",
        do: "Build adoption with its future users",
      },
    ],
  },
};

const fr: UseCase = {
  order: 4,
  title: "Un système pour mieux livrer entre product, design et engineering",
  slug: "product-ops-transformation",
  tagline:
    "Passer d’une handoff interprétées à un système de delivery clair, vérifiable et scalable",
  overview:
    "Après le rachat par Enphase en 2022, nous sommes passés <b>d’une delivery startup</b> à une organisation produit <b>plus globale</b>.\n\nJ’ai structuré un système de delivery partagé entre <b>product, design et dev</b>, pour réduire l’ambiguïté, le rework et les écarts design/dev.",
  cardDescription:
    "Refondre le système de delivery product/design/engineering après acquisition.",
  challenge: "Faire scaler la delivery sans laisser chaque équipe réinterpréter ce qui devait être livré.",
  roles: {
  owned: [
    "Workflow de delivery",
    "Quality gates",
    "Design handoff",
    "Gouvernance design system",
    "Alignement transverse",
    "Product/design/dev ops",
  ],
  team: [
    "Product",
    "Engineering",
    "Design",
    "Executive",
  ],
},
  year: "2023",
  timeline: "2 ans",
  tools: ["Figma", "Notion", "Storybook", "Jira", "Flutter"],
  tags: ["Product ops", "Design ops", "Delivery system", "Quality gates", "Gouvernance design system"],
  projectType: "mobile et web",
  thumbnailTagTone: "white",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/design-system/FR/FR_Thumbnail.png",
    alt: "Aperçu de la transformation Product Ops — handoff, développement et review mieux alignés",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/design-system/FR/FR_Hero.png",
    alt: "Vue d'ensemble du système de delivery et design system partagé entre product, design et développement.",
  },
  tension: {
    title: "Comprendre le problème",
    artifact: {
      type: "image",
      src: "/assets/use-cases/design-system/FR/FR_Tension_Silos.png",
      alt: "Schéma illustrant les écarts d’interprétation entre product, design et développement avant le système de delivery partagé.",
      caption: "Les écarts d’interprétation entre product, design et développement avant le système de delivery partagé.",
    },
    tensions: [
  {
    label: "Pour l’équipe produit",
    value:
      "L’intention produit se perdait entre les arbitrages initiaux, les tickets et les reviews.",
    bullets: [
      "Critères d’acceptation flous",
      "Arbitrages réouverts",
      "Décisions difficiles à préserver",
    ],
  },
  {
    label: "Pour le design",
    value:
      "Les maquettes montraient l’interface cible, mais pas toujours les règles nécessaires pour l’implémenter.",
    bullets: [
      "États incomplets",
      "Edge cases absents",
      "Patterns réinventés",
    ],
  },
  {
    label: "Pour les dev",
    value:
      "Les développeurs devaient deviner les comportements, les états et les critères qualité attendus.",
    bullets: [
      "Implémentations divergentes",
      "Boucles de review",
      "Décisions implicites",
    ],
  },
],coreQuestion:
  "Comment rendre les décisions, critères et responsabilités vérifiables avant le développement ?",
    chartCards: [
      {
        caption:
          "Trop de décisions restaient ouvertes après le démarrage du développement",
        methodology: "Analyse de tickets",
        methodologyIcon: "clipboard-text",
        chart: {
          type: "combined-kpi",
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
        methodology: "Analyse de tickets",
        methodologyIcon: "clipboard-text",
        chart: {
          type: "bars",
          title: "Décisions implicites dans les tickets",
          bars: [
            { label: "États\nmanquants", value: 38, color: "var(--color-primary)" },
            { label: "Flows\nambigus", value: 31, color: "var(--color-chart-lime)" },
            { label: "Critères\nflous", value: 18, color: "var(--color-chart-citron)" },
            { label: "Re-use\nabsent", value: 16, color: "var(--color-chart-yellow)" },
            { label: "Contrainte\ntechnique", value: 7, color: "var(--color-chart-amber)" },
          ],
        },
      },
      {
        caption:
          "Les équipes ne partageaient pas toujours la même définition du livrable",
        methodology: "Analyse des reviews",
        methodologyIcon: "clipboard-text",
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
    id: "strengthen-documentation",
    title: "Renforcer la documentation",
    summary:
      "Centraliser règles, composants et guidelines dans un hub consultable par les équipes.",
    pros: [
      "Rapide à lancer",
      "Facile à consulter",
    ],
    cons: [
      "Peu d’adoption réelle",
      "Décisions encore tardives",
    ],
    media: {
      type: "image",
      src: "/assets/use-cases/design-system/ALL_option_A.png",
      alt: "Mini-wireframe d’un hub documentaire centralisant règles, composants et guidelines.",
    },
  },
  {
    id: "strengthen-reviews",
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
    media: {
      type: "image",
      src: "/assets/use-cases/design-system/ALL_option_B.png",
      alt: "Mini-wireframe d’un workflow ajoutant une review renforcée après développement.",
    },
  },
  {
    id: "shared-delivery-system",
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
    media: {
      type: "image",
      src: "/assets/use-cases/design-system/ALL_option_C.png",
      alt: "Mini-wireframe d’un système de delivery partagé avec handoff, gates et critères qualité avant développement.",
    },
  },
],
selectedSolutionId: "shared-delivery-system",
why:
  "Parce que le changement de stack et la refonte du produit flagship rendaient nécessaire un système de delivery plus clair avant de scaler.",
    keyDecisions: [
  {
    id: "delivery",
    eyebrow: "Delivery",
    title: "Déplacer la friction avant le développement",
    summary:
      "Parce que les décisions réouvertes en review coûtaient plus cher que les arbitrages faits en amont.",
    media: {
      type: "image",
      src: "/assets/use-cases/design-system/FR/FR_KD1-0_workflow.png",
      alt: "Workflow montrant le déplacement des décisions product, design et engineering avant le développement.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/design-system/ALL_KD1-1_FullWorkflow.png",
        alt: "Workflow complet montrant le processus d'alignement et de validation de la delivery produit.",
      },
    ],
    avoidedCost: [
      "Décisions réouvertes tard",
      "Rework après développement",
    ],
    acceptedCost: [
      "Plus d’effort en amont",
      "Process perçu plus lourd",
    ],
  },
  {
    id: "gouvernance",
    eyebrow: "Gouvernance",
    title: "Clarifier qui décide quoi",
    summary:
      "Parce qu’une bibliothèque unique mélangeait décisions globales, composants, usages produit et responsabilités.",
    media: {
      type: "image",
      src: "/assets/use-cases/design-system/FR/FR_KD2-0_designArchitecture.png",
      alt: "Architecture du design system séparant foundations, composants, usages produit et responsabilités de gouvernance.",
    },
    gallery: [
      {
        type: "figma",
        src: "https://www.figma.com/design/avvTCRSu4yLCeWcyEnJPqL/Slash-Figma?node-id=9-93&p=f&t=y5MXYta86W8mmaqI-0",
        title: "Design system",
        caption: "Composants construits sur l’architecture de tokens.",
        mode: "file",
        format: "web",
        protected: true,
      },
      {
        type: "figma",
        src: "https://www.figma.com/design/FCHt6WHcSXBjp72ZpAXTSN/ENL1-Mockups?m=auto&t=y3MnBAtvL1KApKDp-6",
        title: "Mockups utilisant le DS",
        caption: "Mockups produit créés avec le système partagé.",
        mode: "file",
        format: "web",
        protected: true,
      },
    ],
    avoidedCost: [
      "Décisions dispersées",
      "Contributions non contrôlées",
    ],
    acceptedCost: [
      "Architecture plus exigeante",
      "Contribution plus encadrée",
    ],
  },
  {
    id: "qualite",
    eyebrow: "Qualité",
    title: "Rendre la qualité vérifiable",
    summary:
      "Parce que les reviews arrivaient trop tard et reposaient trop souvent sur des opinions différentes.",
    media: {
      type: "image",
      src: "/assets/use-cases/design-system/FR/FR_KD3-0_HandoffPackage.png",
      alt: "Handoff package et checklist de review permettant de réduire les interprétations pendant le développement.",
    },
    gallery: [],
    avoidedCost: [
      "Validations subjectives",
      "Critères variables",
    ],
    acceptedCost: [
      "Tickets plus complets",
      "Reviews plus exigeantes",
    ],
  },
  {
    id: "adoption",
    eyebrow: "Adoption",
    title: "S’appuyer sur des relais techniques",
    summary:
      "Parce qu’un système partagé ne pouvait pas être adopté durablement s’il restait porté uniquement par le design.",
    media: {
      type: "image",
      src: "/assets/use-cases/design-system/FR/FR_KD4-0_Adoption.png",
      alt: "Modèle d’adoption montrant comment les relais techniques aidaient les équipes à utiliser le système.",
    },
    gallery: [],
    avoidedCost: [
      "Adoption design-only",
      "Usage superficiel",
    ],
    acceptedCost: [
      "Temps senior dev",
      "Adoption progressive",
    ],
  },
],
  },
  impactSection: {
  title: "Les impacts",
  summary:
    "Le système a rendu la delivery plus prévisible : moins de décisions réouvertes, moins de rework tardif et des critères qualité plus vérifiables.",
  bullets: [
    {
      bold: "Les décisions étaient moins réouvertes après le démarrage dev",
      regular: "l’alignement produit, design et dev arrivait plus tôt",
    },
    {
      bold: "Les reviews demandaient moins de corrections tardives",
      regular: "les critères qualité étaient explicités avant l’implémentation",
    },
    {
      bold: "La qualité dépendait moins des échanges informels",
      regular: "handoff, checklist et gouvernance rendaient les attentes vérifiables",
    },
  ],
   charts: [
  {
    chart: {
      type: "before-after-bar",
      title: "Clarifications après démarrage dev",
      before: { display: "59%", value: 59 },
      after: { display: "31%", value: 31 },
    },
    caption: "Moins de décisions étaient réouvertes après le démarrage du dev.",
    methodology: "Analyse de tickets",
    methodologyIcon: "clipboard-text",
  },
  {
    chart: {
      type: "before-after-bar",
      title: "Tickets avec plus d’un cycle de review",
      before: { display: "40%", value: 40 },
      after: { display: "18%", value: 18 },
    },
    caption: "Les tickets demandaient moins d’allers-retours en review.",
    methodology: "Analyse de tickets",
    methodologyIcon: "clipboard-text",
  },
  {
    chart: {
      type: "before-after-bar",
      title: "Reviews multi-métier",
      before: { display: "61%", value: 61 },
      after: { display: "34%", value: 34 },
    },
    caption: "Les équipes partageaient plus souvent la même définition du livrable.",
    methodology: "Analyse des reviews",
    methodologyIcon: "clipboard-text",
  },
  {
    chart: {
      type: "duration-bars",
      title: "Gains sur les écrans couverts",
      items: [
        {
          label: "Prototypage écran\nstandard",
          before: { display: "3h30", value: 3.5 },
          after: { display: "1h15", value: 1.25 },
        },
        {
          label: "Implémentation\nécran standard",
          before: { display: "12h", value: 12 },
          after: { display: "5h", value: 5 },
        },
        {
          label: "Corrections après\nreview",
          before: { display: "5h", value: 5 },
          after: { display: "2h", value: 2 },
        },
      ],
    },
    caption: "Les gains étaient surtout visibles sur les écrans couverts par le système.",
    methodology: "Estimations de workflow",
    methodologyIcon: "clipboard-text",
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
      do: "Créer les conditions d’alignement avant le dev",
    },
    {
      dont: "Penser qu’un système s’adopte seul",
      do: "Construire l’adoption avec ses futurs utilisateurs",
    },
  ],
},
};

export const designSystem: Record<string, UseCase> = { en, fr };
