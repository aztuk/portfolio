import type { UseCase } from "@/content/use-cases/types";

const en: UseCase = {
  title: "Personalized dashboard for solar households",
  slug: "customizable-dashboard",
  overview:
    "In 2018, our product helped households equipped with renewable energy monitor their energy.\n\nI personalized the dashboard based on their equipment, goals and level of understanding to make the value more visible.",
  challenge:
    "Make energy data useful to every household, whatever their equipment or level of understanding.",
  roles: {
    owned: ["Discovery", "UX design", "Visual design", "Prototyping", "User testing", "Delivery"],
    contributed: [],
  },
  year: "2018",
  timeline: "4 months",
  tools: ["Figma", "Notion", "Storybook", "Zeplin", "Illustrator"],
  tags: ["B2B2C", "Web & Mobile", "White label", "flagship product", "E2E ownership"],
  projectType: "mobile et web",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/EN_dashboard_preview.png",
    alt: "Preview of the personalized dashboard - modular widget layout.",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/dashboard_hero.png",
    alt: "Personalized dashboard - overview of the key screens.",
  },
  tension: {
    title: "Understanding the problem",
    tensions: [
      {
        label: "For users",
        value:
          "Households did not have the same equipment, goals or level of energy understanding.",
        bullets: [
          "Very different equipment",
          "Strong savings motivation",
          "Variable understanding",
        ],
      },
      {
        label: "For the business",
        value:
          "The product value was hard to demonstrate if the dashboard felt too generic or too technical.",
        bullets: [
          "Value not visible enough",
          "Limited engagement",
          "Difficult differentiation",
        ],
      },
    ],
    discoverySignals: [
      "User interviews",
      "Behavioral analysis",
      "Profile segmentation",
      "Comprehension tests",
      "Engagement analysis",
    ],
    coreQuestion:
      "How can we make the dashboard useful to different households primarily motivated by savings?",
    chartCards: [
      {
        caption: "Households did not all have the same equipment level.",
        chart: {
          type: "bars",
          title: "Household energy profiles",
          bars: [
            { label: "Consumption\nonly", value: 34, color: "var(--color-primary)" },
            { label: "Solar\nonly", value: 27, color: "var(--color-chart-lime)" },
            { label: "Solar +\nbat.", value: 18, color: "var(--color-chart-citron)" },
            { label: "Solar +\nEV", value: 11, color: "var(--color-chart-yellow)" },
            { label: "Solar +\nbat. + EV", value: 10, color: "var(--color-chart-amber)" },
          ],
        },
      },
      {
        caption: "The current dashboard did not hold attention well enough.",
        chart: {
          type: "combined-kpi",
          rows: [
            {
              title: "Bounce rate",
              description: "Share of sessions leaving the dashboard without interacting with its key elements.",
              display: "48%",
              percent: 48,
              variant: "primary",
            },
            {
              title: "Time spent on dashboard",
              description: "Average time spent on the dashboard per user session.",
              display: "41 sec",
              percent: 100,
              variant: "secondary",
            },
          ],
        },
      },
      {
        caption: "Interest dropped sharply after the first discovery.",
        chart: {
          type: "line",
          title: "Retention over time",
          points: [
            { label: "D0", value: 100, color: "var(--color-primary)" },
            { label: "D7", value: 26, color: "var(--color-chart-lime)" },
            { label: "D30", value: 9, color: "var(--color-secondary)" },
          ],
        },
      },
      {
        chart: {
          type: "insight",
          label: "Motivation",
          icon: "piggy-bank",
          insightTitle: "Main motivation: savings",
          insightDescription:
            "Households mostly consulted data that could explain concrete savings.",
          methodology: "Interviews and engagement tests",
          methodologyIcon: "flask",
          color: "#AEED6B",
        },
      },
    ],
  },
  solution: {
    title: "A guided path that earns attention instead of spending it",
    exploredSolutions: [
      {
        id: "intention-based",
        title: "Organize by need",
        summary:
          "Create dedicated sections: save money, understand consumption and track production.",
        pros: ["User language", "Goals more visible"],
        cons: ["Fragmented overview", "Not very suited to hybrid profiles"],
      },
      {
        id: "profile-dashboard",
        title: "Personalize by profile",
        summary:
          "Generate a dashboard adapted to the household's equipment, goals and level of understanding.",
        pros: ["Immediate value", "Needs better targeted"],
        cons: ["Sensitive configuration", "Personalization to justify"],
      },
      {
        id: "contextual-learning",
        title: "Contextual progressive reveal",
        summary:
          "Keep one view, but progressively reveal the explanations and indicators that are useful.",
        pros: ["Less costly", "Improves understanding"],
        cons: ["Limited personalization", "Problem less targeted"],
      },
    ],
    selectedSolutionId: "profile-dashboard",
    keyDecisions: [
      {
        id: "profile-personalization",
        eyebrow: "Personalization",
        title: "Adapt the dashboard to the household",
        summary:
          "The dashboard had to reflect the household's equipment, goals and level of understanding.",
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/household_generated_profile.png",
          alt: "Energy profile generated from onboarding, with motivations, equipment and level of understanding.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/customizable-dashboard/dashboard_hero.png",
            alt: "Dashboard automatically generated according to the household profile.",
            caption: "The dashboard prioritized the modules most useful to the profile.",
          },
          {
            type: "figma",
            src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio-%E2%80%94-Design-Reference?node-id=196-4197&viewport=285%2C928%2C0.11&t=JxcNWhKBZJ0kL01V-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=196%3A4197&show-proto-sidebar=0&page-id=18%3A38",
            title: "Progressive reveal",
            caption: "Indicators became more detailed depending on the level of understanding.",
            mode: "file",
            format: "web",
            protected: true,
            disableInteraction: true,
          },
        ],
        avoidedCost: [
          "A dashboard that was too generic",
          "Modules that were not very useful",
        ],
        acceptedCost: [
          "A more substantial onboarding",
          "Variants to maintain",
        ],
      },
      {
        id: "manual-customization",
        eyebrow: "Control",
        title: "Let users adjust it",
        summary:
          "The generated dashboard served as a starting point, but remained editable by the user.",
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/dashboard_edit_mode.png",
          alt: "Edit mode allowing users to change the dashboard widgets.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/customizable-dashboard/dashboard_generated_1.png",
            alt: "Generated dashboard with a personalized widget layout.",
            caption: "A dashboard could be generated from the initial profile.",
          },
          {
            type: "image",
            src: "/assets/use-cases/customizable-dashboard/dashboard_generated_2.png",
            alt: "Generated dashboard variation with a different module layout.",
            caption: "Modules could change depending on the household's needs.",
          },
          {
            type: "video",
            src: "/assets/use-cases/customizable-dashboard/mobile_creation_widget.mp4",
            alt: "Mobile video showing widget creation and editing.",
            caption: "Users could add and configure their widgets.",
            format: "mobile",
          },
        ],
        avoidedCost: [
          "Frozen personalization",
          "Needs poorly covered",
        ],
        acceptedCost: [
          "More interface states",
          "More complex logic",
        ],
      },
      {
        id: "energy-translation",
        eyebrow: "Education",
        title: "Translate energy data",
        summary:
          "Technical data had to become understandable and actionable messages.",
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/raw_to_meaningul.png",
          alt: "Transformation of raw energy data into understandable messages for the user.",
        },
        gallery: [],
        avoidedCost: [
          "Data that was not understood",
          "Value that was not visible enough",
        ],
        acceptedCost: [
          "More UX writing",
          "Levels to manage",
        ],
      },
    ],
  },
  impactSection: {
    title: "The impacts",
    summary:
      "Personalization improved engagement, comprehension and retention signals.",
    bullets: [
      {
        bold: "The first visit became more relevant",
        regular: "lower bounce and more time spent on the dashboard",
      },
      {
        bold: "Value was better perceived",
        regular: "modules related to savings were consulted more often",
      },
      {
        bold: "Interest held better after discovery",
        regular: "D7 and D30 retention increased on personalized profiles",
      },
    ],
    charts: [
      { chart: { type: "before-after-bar", title: "D7 retention", before: { display: "26%", value: 26 }, after: { display: "34%", value: 34 } } },
      { chart: { type: "before-after-bar", title: "D30 retention", before: { display: "09%", value: 9 }, after: { display: "17%", value: 17 } } },
      { chart: { type: "before-after-bar", title: "Module interactions", before: { display: "22%", value: 22 }, after: { display: "34%", value: 34 } } },
      {
        chart: {
          type: "before-after-combined-kpi",
          rows: [
            { label: "Bounce rate", before: { display: "48%", percent: 48 }, after: { display: "42%", percent: 42 } },
            { label: "Time on dashboard", before: { display: "41 sec", percent: 41 }, after: { display: "54 sec", percent: 54 } },
          ],
        },
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
        do: "Adapt the experience to profiles and motivations",
      },
      {
        dont: "Organize the interface around the product",
        do: "Organize it around what the user is trying to understand",
      },
      {
        dont: "Measure only global engagement",
        do: "Compare signals by profile, module and usage moment",
      },
    ],
  },
  relatedUseCaseSlugs: [],
};

const fr: UseCase = {
  title: "Dashboard personnalisé pour foyers solaires",
  slug: "customizable-dashboard",
  overview:
  "En 2018, notre produit aidait les foyers équipés d’énergie renouvelable à suivre leur énergie. \n\n J’ai personnalisé le dashboard selon leur équipement, leurs objectifs et leur niveau de compréhension pour rendre la valeur plus visible.",
challenge:
  "Rendre les données énergétiques utiles à chaque foyer, quel que soit son équipement ou son niveau de compréhension.",
  roles: {
    owned: ["Discovery", "UX design", "Design visuel", "Prototypage", "Tests utilisateurs", "Delivery"],
    contributed: [],
  },
  year: "2018",
  timeline: "4 mois",
  tools: ["Figma", "Notion", "Storybook", "Zeplin", "Illustrator"],
  tags: ["B2B2C", "Web & Mobile", "White label", "flagship product", "E2E ownership"],
  projectType: "mobile et web",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/FR_dashboard_preview.png",
    alt: "Aperçu du dashboard personnalisé — disposition modulaire des widgets.",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/dashboard_hero.png",
    alt: "Dashboard personnalisé — aperçu des écrans clés.",
  },
  tension: {
    title: "Comprendre le problème",
    tensions: [
  {
    label: "Pour les utilisateurs",
    value:
      "Les foyers n’avaient pas les mêmes équipements, objectifs ni niveau de compréhension énergétique.",
    bullets: [
      "Équipements très différents",
      "Motivation économique forte",
      "Compréhension variable",
    ],
  },
  {
    label: "Pour le business",
    value:
      "La valeur du produit était difficile à démontrer si le dashboard semblait trop générique ou trop technique.",
    bullets: [
      "Valeur peu visible",
      "Engagement limité",
      "Différenciation difficile",
    ],
  },
],
    discoverySignals: [
  "Entretiens utilisateurs",
  "Analyse comportementale",
  "Segmentation des profils",
  "Tests de compréhension",
  "Analyse d’engagement",
    ],
    coreQuestion:
  "Comment rendre le dashboard utile à des foyers différents, motivés d’abord par les économies ?",
  chartCards: [
      {caption: "Les foyers n’avaient pas tous le même niveau d’équipement.",
        chart: {
          type: "bars",
          title: "Profils énergétiques des foyers",
          bars: [
            { label: "Conso\nseule",         value: 34, color: "var(--color-primary)" },
            { label: "Solaire\nseul",         value: 27, color: "var(--color-chart-lime)" },
            { label: "Solaire +\nbat.",       value: 18, color: "var(--color-chart-citron)" },
            { label: "Solaire +\nEV",         value: 11, color: "var(--color-chart-yellow)" },
            { label: "Solaire +\nbat. + EV",  value: 10, color: "var(--color-chart-amber)" },
          ],
        },
      },
      {
        caption: "Le dashboard actuel ne retenait pas assez l’attention",
        chart: {
          type: "combined-kpi",
          rows: [
            {
              title: "Taux de rebond",
              description: "Part des sessions quittant le dashboard sans interaction sur ses éléments clés.",
              display: "48%",
              percent: 48,
              variant: "primary",
            },
            {
              title: "Temps passé sur dashboard",
              description: "Temps moyen passé sur le dashboard par session utilisateur.",
              display: "41 sec",
              percent: 100,
              variant: "secondary",
            },
          ],
        },
      },
      {caption: "L’intérêt chutait fortement après la première découverte",
        chart: {
          type: "line",
          title: "Rétention dans le temps",
          points: [
            { label: "J0",  value: 100, color: "var(--color-primary)" },
            { label: "J7",  value: 26,  color: "var(--color-chart-lime)" },
            { label: "J30", value: 9,   color: "var(--color-secondary)" },
          ],
        },
      },{
  chart: {
    type: "insight",
    label: "Motivation",
    icon: "piggy-bank",
    insightTitle: "Principale motivation: Les économies",
    insightDescription:
      "Les foyers consultaient surtout les données capables d’expliquer une économie concrète.",
    methodology: "Entretiens et tests d’engagement",
    methodologyIcon: "flask",
    color: "#AEED6B",
  },
}
    ],
  },
  solution: {
    title: "Un chemin guidé qui gagne l'attention au lieu de la dépenser",
exploredSolutions: [
  {
    id: "intention-based",
    title: "Organiser par besoin",
    summary:
      "Créer des sections dédiées : économiser, comprendre sa consommation et suivre sa production.",
    pros: [
      "Langage utilisateur",
      "Objectifs plus visibles",
    ],
    cons: [
      "Vue globale fragmentée",
      "Peu adapté aux hybrides",
    ],
  },
  {
    id: "profile-dashboard",
    title: "Personnaliser par profil",
    summary:
      "Générer un dashboard adapté à l’équipement, aux objectifs et au niveau de compréhension du foyer.",
    pros: [
      "Valeur immédiate",
      "Besoins mieux ciblés",
    ],
    cons: [
      "Configuration sensible",
      "Personnalisation à justifier",
    ],
  },
  {
    id: "contextual-learning",
    title: "Progressive reveal contextuel",
    summary:
      "Garder une vue unique, mais révéler progressivement les explications et indicateurs utiles.",
    pros: [
      "Moins coûteux",
      "Compréhension renforcée",
    ],
    cons: [
      "Personnalisation limitée",
      "Problème moins ciblé",
    ],
  },
],
selectedSolutionId: "profile-dashboard",
keyDecisions: [
  {
    id: "profile-personalization",
    eyebrow: "Personnalisation",
    title: "Adapter le dashboard au foyer",
    summary:
      "Le dashboard devait refléter l’équipement, les objectifs et le niveau de compréhension du foyer.",
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/household_generated_profile.png",
      alt: "Profil énergétique généré à partir de l’onboarding, avec motivations, équipements et niveau de compréhension.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/customizable-dashboard/dashboard_hero.png",
        alt: "Dashboard généré automatiquement selon le profil du foyer.",
        caption: "Le dashboard priorisait les modules les plus utiles au profil.",
      },
      {
        type: "figma",
        src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio-%E2%80%94-Design-Reference?node-id=196-4197&viewport=285%2C928%2C0.11&t=JxcNWhKBZJ0kL01V-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=196%3A4197&show-proto-sidebar=0&page-id=18%3A38",
        title: "Progressive reveal",
        caption: "Les indicateurs devenaient plus détaillés selon le niveau de compréhension.",
        mode: "file",
        format: "web",
        protected: true,
        disableInteraction: true,
      },
    ],
    avoidedCost: [
      "Une vue trop générique",
      "Des modules peu utiles",
    ],
    acceptedCost: [
      "Un onboarding plus important",
      "Des variantes à maintenir",
    ],
  },
  {
    id: "manual-customization",
    eyebrow: "Contrôle",
    title: "Laisser l’utilisateur ajuster",
    summary:
      "Le dashboard généré servait de point de départ, mais restait modifiable par l’utilisateur.",
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/dashboard_edit_mode.png",
      alt: "Mode édition permettant de modifier les widgets du dashboard.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/customizable-dashboard/dashboard_generated_1.png",
        alt: "Dashboard généré avec une organisation de widgets personnalisée.",
        caption: "Un dashboard pouvait être généré selon le profil initial.",
      },
      {
        type: "image",
        src: "/assets/use-cases/customizable-dashboard/dashboard_generated_2.png",
        alt: "Variation du dashboard généré avec une disposition différente des modules.",
        caption: "Les modules pouvaient changer selon les besoins du foyer.",
      },
      {
        type: "video",
        src: "/assets/use-cases/customizable-dashboard/mobile_creation_widget.mp4",
        alt: "Vidéo mobile montrant la création et l’édition d’un widget.",
        caption: "L’utilisateur pouvait ajouter et configurer ses widgets.",
        format: "mobile",
      },
    ],
    avoidedCost: [
      "Une personnalisation figée",
      "Des besoins mal couverts",
    ],
    acceptedCost: [
      "Plus d’états d’interface",
      "Une logique plus complexe",
    ],
  },
  {
    id: "energy-translation",
    eyebrow: "Pédagogie",
    title: "Traduire les données énergétiques",
    summary:
      "Les données techniques devaient devenir des messages compréhensibles et actionnables.",
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/raw_to_meaningul.png",
      alt: "Transformation des données énergétiques brutes en messages compréhensibles pour l’utilisateur.",
    },
    gallery: [
    ],
    avoidedCost: [
      "Des données incomprises",
      "Une valeur peu visible",
    ],
    acceptedCost: [
      "Plus de rédaction UX",
      "Des niveaux à gérer",
    ],
  },
],  
  },
impactSection: {
  title: "Les impacts",
  summary:
    "La personnalisation a amélioré les signaux d’engagement, de compréhension et de rétention.",
  bullets: [
    {
      bold: "La première visite devenait plus pertinente",
      regular: "moins de rebond et plus de temps passé sur le dashboard",
    },
    {
      bold: "La valeur était mieux perçue",
      regular: "les modules liés aux économies étaient davantage consultés",
    },
    {
      bold: "L’intérêt se maintenait mieux après découverte",
      regular: "rétention J7 et J30 en hausse sur les profils personnalisés",
    },
  ],
  charts: [
    {
      chart: {
        type: "before-after-bar",
        title: "Rétention J7",
        before: { display: "26%", value: 26 },
        after: { display: "34%", value: 34 },
      },
    },
    {
      chart: {
        type: "before-after-bar",
        title: "Rétention J30",
        before: { display: "09%", value: 9 },
        after: { display: "17%", value: 17 },
      },
    },
    {
      chart: {
        type: "before-after-bar",
        title: "Interactions modules",
        before: { display: "22%", value: 22 },
        after: { display: "34%", value: 34 },
      },
    },
    {
      chart: {
        type: "before-after-combined-kpi",
        rows: [
          {
            label: "Taux de rebond",
            before: { display: "48%", percent: 48 },
            after: { display: "42%", percent: 42 },
          },
          {
            label: "Temps sur dashboard",
            before: { display: "41 sec", percent: 41 },
            after: { display: "54 sec", percent: 54 },
          },
        ],
      },
    },
  ],
},
retrospective: {
  title: "Rétrospective",
  summary: "Quelques leçons courtes que le projet a changées dans ma pratique.",
  dontLabel: "NE PLUS",
  doLabel: "MAIS PLUTÔT",
  items: [
    {
      dont: "Concevoir une vue unique pour tous",
      do: "Adapter l’expérience aux profils et motivations",
    },
    {
      dont: "Organiser l’interface selon le produit",
      do: "L’organiser selon ce que l’utilisateur cherche à comprendre",
    },
    {
      dont: "Mesurer seulement l’engagement global",
      do: "Comparer les signaux par profil, module et moment d’usage",
    },
  ],
},
  relatedUseCaseSlugs: [],
};

export const customizableDashboard: Record<string, UseCase> = { en, fr };
