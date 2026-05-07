import type { UseCase } from "@/content/use-cases/types";


const en: UseCase = {
  title: "Creating complex energy offers without writing code",
  slug: "energy-offer-rule-builder",
  overview:
    "In 2019, our platform helped energy suppliers manage their tariff offers.\n\nOffer teams wanted to create new tariffs without going through IT. I designed a visual editor to define rules and see their effect on the bill.",
  challenge:
    "Make offer creation simple enough for business teams, without losing the precision required for billing.",
  roles: {
    owned: ["UX architecture", "Visual design", "Prototyping"],
    contributed: ["Discovery", "User testing", "Delivery"],
  },
  year: "2019",
  timeline: "12 months",
  tools: ["Figma", "Notion", "Zeplin"],
  tags: ["B2B", "Complex UX", "Rule Builder", "Energy", "Billing"],
  projectType: "mobile",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/energy-offer-rule-builder/EN_empower_preview.png",
    alt: "Preview of the rule creation tool for energy offers.",
  },
  resultHero: {
    type: "video",
    src: "/assets/use-cases/energy-offer-rule-builder/EmpowerVideo.mp4",
    poster: "/assets/use-cases/energy-offer-rule-builder/EN_empower_preview.png",
    alt: "Key screens of the tool for creating and verifying complex energy offers.",
  },
  tension: {
    title: "Understanding the problem",
    tensions: [
      {
        label: "For offer teams",
        value:
          "They knew how to imagine new tariffs, but not always how to translate them into reliable rules.",
        bullets: [
          "Variable schedules",
          "Consumption thresholds",
          "Application periods",
        ],
      },
      {
        label: "For the business",
        value:
          "Each offer variant required too much back-and-forth before it could be tested or launched.",
        bullets: [
          "Slower launches",
          "Difficult tests",
          "Limited differentiation",
        ],
      },
      {
        label: "For IT",
        value:
          "The billing system was too critical to replace, but too rigid to absorb every new request.",
        bullets: [
          "Legacy to preserve",
          "Migration risk",
          "Technical dependency",
        ],
      },
    ],
    coreQuestion:
      "How can we turn an offer idea into understandable, configurable and verifiable tariff rules?",
    artifact: {
      type: "image",
      src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreationAdvanced.png",
      alt: "Advanced rule editor showing tariff logic as a technical expression over a blurred schedule interface.",
    },
    discoverySignals: [
      "Business expert interviews",
      "Workflow mapping",
      "Scenario testing",
      "Edge-case analysis",
    ],
    chartCards: [
      {
        caption:
          "Creating a new offer meant translating a business idea into technical logic",
        chart: {
          type: "bars",
          title: "Components of a tariff rule",
          bars: [
            { label: "Application\nperiods", value: 34, color: "var(--color-primary)" },
            { label: "Threshold\nconditions", value: 27, color: "var(--color-chart-lime)" },
            { label: "Contract\ntypes", value: 22, color: "var(--color-chart-citron)" },
            { label: "Special\nevents", value: 14, color: "var(--color-chart-yellow)" },
            { label: "Customer\nexceptions", value: 9, color: "var(--color-chart-amber)" },
          ],
        },
      },
      {
        caption:
          "Offer teams needed to manipulate schedules, thresholds and conditions themselves",
        chart: {
          type: "insight",
          label: "Understand",
          icon: "lightbulb",
          insightTitle: "See when the rule applies",
          insightDescription:
            "Offer teams needed to manipulate schedules, thresholds and conditions themselves",
          methodology: "Observed in business expert interviews",
          methodologyIcon: "clipboard-text",
          color: "var(--color-chart-lime)",
        },
      },
    ],
  },
  solution: {
    title: "Exploration and solution",
    exploredSolutions: [
      {
        id: "dedicated-forms",
        title: "One form per offer",
        summary:
          "Create a dedicated screen for each tariff logic, with simple fields for standard cases.",
        pros: ["Very easy to read", "Fast on simple cases"],
        cons: ["Not very flexible", "Too many variants"],
      },
      {
        id: "advanced-only",
        title: "One advanced editor",
        summary:
          "Expose logic close to the rule engine to cover the most complex tariff scenarios.",
        pros: ["Very flexible", "Covers rare cases"],
        cons: ["Too technical", "Risk of errors"],
      },
      {
        id: "dual-level-editor",
        title: "A guided and advanced mode",
        summary:
          "Combine readable business blocks with an advanced mode for rules that go beyond common cases.",
        pros: ["Accessible to business teams", "Flexible when needed"],
        cons: ["Harder to design", "Model to explain"],
      },
    ],
    selectedSolutionId: "dual-level-editor",
    keyDecisions: [
      {
        id: "productiser-regles",
        eyebrow: "Productization",
        title: "Make rules configurable",
        summary:
          "Instead of coding every new offer, we made rules creatable from a business interface.",
        media: {
          type: "image",
          src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreation.png",
          alt: "Comparison between a rule engine coded by technical teams and a business interface for creating energy offers.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreationZoomed.png",
            alt: "Guided interface for creating a tariff rule from business fields.",
            caption: "A rule could be created from blocks understandable by business teams.",
          },
        ],
        avoidedCost: [
          "Coding every new offer",
          "Constantly depending on developers",
        ],
        acceptedCost: [
          "Defining which rules were configurable",
          "Limiting some specific cases",
        ],
      },
      {
        id: "edition-guided-advanced",
        eyebrow: "Accessibility",
        title: "Separate guided and advanced modes",
        summary:
          "Common cases remained simple, while experts kept an escape hatch for complex rules.",
        media: {
          type: "image",
          src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreationAdvanced.png",
          alt: "Two-level tariff editor combining a guided mode with business blocks and an advanced mode for complex rules.",
        },
        gallery: [],
        avoidedCost: [
          "A tool that was too technical",
          "A form that was too rigid",
        ],
        acceptedCost: [
          "Two modes to connect",
          "A model to explain",
        ],
      },
      {
        id: "timeline",
        eyebrow: "Time",
        title: "Put time at the center",
        summary:
          "Rules depended on dates, seasons or schedules, so their application had to become visible over time.",
        media: {
          type: "image",
          src: "/assets/use-cases/energy-offer-rule-builder/Emp_Timeline.png",
          alt: "Timeline showing the application periods of several tariff rules over time.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/energy-offer-rule-builder/Emp_Timeline_2.png",
            alt: "Timeline view showing active rules, periods and overlaps.",
            caption: "The timeline made periods and overlaps visible.",
          },
        ],
        avoidedCost: [
          "Invisible periods",
          "Conflicts that were hard to spot",
        ],
        acceptedCost: [
          "A more complex visualization",
          "Overlaps to manage",
        ],
      },
      {
        id: "verification",
        eyebrow: "Trust",
        title: "Verify before billing",
        summary:
          "Teams had to see what a rule produced before it reached the billing system.",
        media: {
          type: "image",
          src: "/assets/use-cases/energy-offer-rule-builder/EN_Emp_BillSimulation.png",
          alt: "Workflow showing the verification of a tariff rule on real data before sending it to the billing system.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/energy-offer-rule-builder/EN_Emp_Monitoring.png",
            alt: "Monitoring view for checking the results generated by rules.",
            caption: "Monitoring made it possible to verify rule effects before billing.",
          },
        ],
        avoidedCost: [
          "Discovering errors too late",
          "Sending unverified results",
        ],
        acceptedCost: [
          "Designing validation views",
          "Explaining generated results",
        ],
      },
    ],
  },
  impactSection: {
    title: "The impacts",
    summary:
      "The tool made offers faster to create, easier to verify and less dependent on specific development.",
    bullets: [
      {
        bold: "Offer teams gained autonomy",
        regular: "common cases became configurable in a business interface",
      },
      {
        bold: "New offers became faster to test",
        regular: "less back-and-forth with IT for each variant",
      },
      {
        bold: "Rules became verifiable before billing",
        regular: "simulation, bill preview and control of generated results",
      },
    ],
    charts: [
      {
        chart: {
          type: "duration-bars",
          title: "Time to complete key tasks",
          items: [
            { label: "Create a\nstandard offer", before: { display: "2 wks", value: 20 }, after: { display: "< 1d", value: 5 } },
            { label: "Adjust an\nexisting rule", before: { display: "3d", value: 20 }, after: { display: "< 1h", value: 6 } },
            { label: "Verify a bill\neffect", before: { display: "3h", value: 20 }, after: { display: "20 min", value: 5 } },
          ],
        },
        caption: "Tasks that depended on IT became configurable inside the tool.",
      },
      {
        chart: {
          type: "single-kpi",
          value: "-60%",
          title: "Specific requests",
          description: "Estimate on common scenarios that could be covered by configurable rules.",
        },
      },
      {
        chart: {
          type: "single-kpi",
          value: "-70%",
          title: "Implementation effort",
          description: "Estimate compared with a heavy evolution of the existing billing system.",
        },
      },
    ],
  },
  retrospective: {
    title: "Retrospective",
    dontLabel: "DON'T",
    doLabel: "INSTEAD",
    items: [
      {
        dont: "Create one screen for every case",
        do: "Design a system that absorbs variants",
      },
      {
        dont: "Hide all complexity",
        do: "Make it readable and manipulable",
      },
      {
        dont: "Validate only the interface",
        do: "Verify what the interface actually produces",
      },
    ],
  },
  relatedUseCaseSlugs: [],
};

const fr: UseCase = {
  title: "Créer des offres d’énergie complexes sans écrire de code",
  slug: "energy-offer-rule-builder",
  overview: "En 2019, notre plateforme aidait les fournisseurs d’énergie à gérer leurs offres tarifaires.\n \n Les équipes offres voulaient créer de nouveaux tarifs sans passer par l’IT. J’ai conçu un éditeur visuel pour définir les règles et voir leur effet sur la facture.",
  challenge: "Rendre la création d’offres assez simple pour le métier, sans perdre la précision nécessaire à la facturation.",
  roles: {
    owned: ["Architecture UX", "Design visuel", "Prototypage"],
    contributed: ["Discovery", "Tests utilisateurs", "Delivery"],
  },
  year: "2019",
  timeline: "12 mois",
  tools: ["Figma", "Notion", "Zeplin"],
  tags: ["B2B", "Complex UX", "Rule Builder", "Energy", "Billing"],
  previewImage: {
    type: "image",
    src: "/assets/use-cases/energy-offer-rule-builder/FR_empower_preview.png",
    alt: "Aperçu de l’outil de création de règles pour offres d’énergie.",
  },
  resultHero: {
    type: "video",
    src: "/assets/use-cases/energy-offer-rule-builder/EmpowerVideo.mp4",
    poster: "/assets/use-cases/energy-offer-rule-builder/FR_empower_preview.png",
    alt: "Écrans clés de l’outil permettant de créer et vérifier des offres d’énergie complexes.",
  },
  tension: {
     title: "Comprendre le problème",
  tensions: [
  {
    label: "Pour les équipes offres",
    value:
      "Elles savaient imaginer de nouveaux tarifs, mais pas toujours les traduire en règles fiables.",
    bullets: [
      "Horaires variables",
      "Seuils de consommation",
      "Périodes d’application",
    ],
  },
  {
    label: "Pour le business",
    value:
      "Chaque variante d’offre demandait trop d’allers-retours avant de pouvoir être testée ou lancée.",
    bullets: [
      "Lancements ralentis",
      "Tests difficiles",
      "Différenciation limitée",
    ],
  },
  {
    label: "Pour l’IT",
    value:
      "Le système de facturation était trop critique pour être remplacé, mais trop rigide pour absorber chaque nouvelle demande.",
    bullets: [
      "Legacy à préserver",
      "Risque de migration",
      "Dépendance technique",
    ],
  },
],coreQuestion:
  "Comment transformer une idée d’offre en règles tarifaires compréhensibles, configurables et vérifiables ?",
  artifact: {
    type: "image",
    src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreationAdvanced.png",
    alt: "Éditeur avancé montrant une règle tarifaire sous forme d’expression technique au-dessus d’une interface de planning floutée.",
  },
  discoverySignals: [
    "Entretiens experts métier",
    "Mapping du workflow",
    "Tests de scénarios",
    "Analyse des cas limites",
  ],
    chartCards: [
      {
  caption:
    "Créer une nouvelle offre demandait de traduire une idée métier en logique technique",
  chart: {
    type: "bars",
    title: "Composants d’une règle tarifaire",
    bars: [
      { label: "Périodes\nd’application", value: 34, color: "var(--color-primary)" },
      { label: "Conditions\nde seuil", value: 27, color: "var(--color-chart-lime)" },
      { label: "Types de\ncontrat", value: 22, color: "var(--color-chart-citron)" },
      { label: "Évènements\nspéciaux", value: 14, color: "var(--color-chart-yellow)" },
      { label: "Exceptions\nclient", value: 9, color: "var(--color-chart-amber)" },
    ]
  },
},
    {
      caption:
        "Les équipes offres avaient besoin de manipuler elles-mêmes les horaires, seuils et conditions",
      chart: {
        type: "insight",
        label: "Comprendre",
        icon: "lightbulb",
        insightTitle: "Voir quand la règle s’applique",
        insightDescription:
          "Les équipes offres avaient besoin de manipuler elles-mêmes les horaires, seuils et conditions",
        methodology: "Observés dans les entretiens experts métier",
        methodologyIcon: "clipboard-text",
        color: "var(--color-chart-lime)",
      },
    },
  ],
  },
  solution: {
    title: "Exploration et solution",
    exploredSolutions: [
  {
    id: "dedicated-forms",
    title: "Un formulaire par offre",
    summary:
      "Créer un écran dédié pour chaque logique tarifaire, avec des champs simples pour les cas standards.",
    pros: [
      "Très facile à lire",
      "Rapide sur cas simples",
    ],
    cons: [
      "Peu flexible",
      "Trop de variantes",
    ],
  },
  {
    id: "advanced-only",
    title: "Un éditeur avancé unique",
    summary:
      "Exposer une logique proche du moteur de règles pour couvrir les scénarios tarifaires les plus complexes.",
    pros: [
      "Très flexible",
      "Couvre les cas rares",
    ],
    cons: [
      "Trop technique",
      "Risque d’erreurs",
    ],
  },
  {
    id: "dual-level-editor",
    title: "Un mode guidé et avancé",
    summary:
      "Combiner des briques métier lisibles avec un mode avancé pour les règles qui dépassent les cas courants.",
    pros: [
      "Accessible au métier",
      "Flexible si besoin",
    ],
    cons: [
      "Plus dur à concevoir",
      "Modèle à expliquer",
    ],
  },
],
selectedSolutionId: "dual-level-editor",
keyDecisions: [
  {
    id: "productiser-regles",
    eyebrow: "Productisation",
    title: "Rendre les règles configurables",
    summary:
      "Au lieu de coder chaque nouvelle offre, nous avons rendu les règles créables depuis une interface métier.",
    media: {
      type: "image",
      src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreation.png",
      alt: "Comparaison entre un moteur de règles codé par les équipes techniques et une interface métier permettant de créer des offres d’énergie.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreationZoomed.png",
        alt: "Interface guidée permettant de créer une règle tarifaire à partir de champs métier.",
        caption: "Une règle pouvait être créée à partir de briques compréhensibles par le métier.",
      },
    ],
    avoidedCost: [
      "Coder chaque nouvelle offre",
      "Dépendre constamment des développeurs",
    ],
    acceptedCost: [
      "Cadrer les règles configurables",
      "Limiter certains cas spécifiques",
    ],
  },
  {
    id: "edition-guided-advanced",
    eyebrow: "Accessibilité",
    title: "Séparer guidé et avancé",
    summary:
      "Les cas courants restaient simples, tandis que les experts gardaient une porte de sortie pour les règles complexes.",
    media: {
      type: "image",
      src: "/assets/use-cases/energy-offer-rule-builder/Emp_RuleCreationAdvanced.png",
      alt: "Éditeur tarifaire à deux niveaux combinant un mode guidé en briques métier et un mode avancé pour les règles complexes.",
    },
    gallery: [],
    avoidedCost: [
      "Un outil trop technique",
      "Un formulaire trop rigide",
    ],
    acceptedCost: [
      "Deux modes à relier",
      "Un modèle à expliquer",
    ],
  },
  {
    id: "timeline",
    eyebrow: "Temps",
    title: "Mettre le temps au centre",
    summary:
      "Les règles dépendaient de dates, saisons ou horaires ; leur application devait donc devenir visible dans le temps.",
    media: {
      type: "image",
      src: "/assets/use-cases/energy-offer-rule-builder/Emp_Timeline.png",
      alt: "Timeline montrant les périodes d’application de plusieurs règles tarifaires dans le temps.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/energy-offer-rule-builder/Emp_Timeline_2.png",
        alt: "Vue timeline permettant de visualiser les règles actives, les périodes et les chevauchements.",
        caption: "La timeline rendait les périodes et chevauchements visibles.",
      },
    ],
    avoidedCost: [
      "Des périodes invisibles",
      "Des conflits difficiles à repérer",
    ],
    acceptedCost: [
      "Une visualisation plus complexe",
      "Des chevauchements à gérer",
    ],
  },
  {
    id: "verification",
    eyebrow: "Confiance",
    title: "Vérifier avant facturation",
    summary:
      "Les équipes devaient voir ce qu’une règle produisait avant son arrivée dans le système de facturation.",
    media: {
      type: "image",
      src: "/assets/use-cases/energy-offer-rule-builder/FR_Emp_BillSimulation.png",
      alt: "Workflow montrant la vérification d’une règle tarifaire sur des données réelles avant son envoi vers le système de facturation.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/energy-offer-rule-builder/FR_Emp_Monitoring.png",
        alt: "Vue de monitoring permettant de contrôler les résultats générés par les règles.",
        caption: "Le monitoring permettait de vérifier les effets des règles avant facturation.",
      },
    ],
    avoidedCost: [
      "Découvrir les erreurs trop tard",
      "Envoyer des résultats non vérifiés",
    ],
    acceptedCost: [
      "Concevoir des vues de validation",
      "Expliquer les résultats générés",
    ],
  },
],
  },
impactSection: {
  title: "Les impacts",
  summary:
    "L’outil a rendu les offres plus rapides à créer, plus faciles à vérifier et moins dépendantes du développement spécifique.",
  bullets: [
    {
      bold: "Les équipes offres gagnaient en autonomie",
      regular: "les cas courants devenaient configurables dans une interface métier",
    },
    {
      bold: "Les nouvelles offres devenaient plus rapides à tester",
      regular: "moins d’allers-retours avec l’IT pour chaque variante",
    },
    {
      bold: "Les règles devenaient vérifiables avant facturation",
      regular: "simulation, aperçu facture et contrôle des résultats générés",
    },
  ],
  charts: [
    {
      chart: {
        type: "duration-bars",
        title: "Temps pour réaliser les tâches clés",
        items: [
          {
            label: "Créer une offre\nstandard",
            before: { display: "2 sem.", value: 20 },
            after: { display: "< 1j", value: 5 },
          },
          {
            label: "Ajuster une règle\nexistante",
            before: { display: "3j", value: 20 },
            after: { display: "< 1h", value: 6 },
          },
          {
            label: "Vérifier un effet\nsur facture",
            before: { display: "3h", value: 20 },
            after: { display: "20 min", value: 5 },
          },
        ],
      },
      caption: "Les tâches dépendantes de l’IT devenaient configurables dans l’outil.",
    },
    {
      chart: {
        type: "single-kpi",
        value: "-60%",
        title: "Demandes spécifiques",
        description:
          "Estimation sur les scénarios courants pouvant être couverts par les règles configurables.",
      },
    },
    {
      chart: {
        type: "single-kpi",
        value: "-70%",
        title: "Effort d’implémentation",
        description:
          "Estimation comparée à une évolution lourde du système de facturation existant.",
      },
    },
  ],
},retrospective: {
  title: "Rétrospective",
  dontLabel: "NE PLUS",
  doLabel: "MAIS PLUTÔT",
  items: [
    {
      dont: "Créer un écran pour chaque cas",
      do: "Concevoir un système qui absorbe les variantes",
    },
    {
      dont: "Cacher toute la complexité",
      do: "La rendre lisible et manipulable",
    },
    {
      dont: "Valider seulement l’interface",
      do: "Vérifier ce que l’interface produit réellement",
    },
  ],
},
  relatedUseCaseSlugs: [],
  projectType: "mobile"
};

export const ruleBuilder: Record<string, UseCase> = { en, fr };
