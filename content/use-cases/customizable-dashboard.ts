import type { UseCase } from "@/content/use-cases/types";

const en: UseCase = {
  order: 1,
  title: "Customizable dashboard",
  slug: "customizable-dashboard",
  tagline:
    "Turning a generic screen into a personalized experience for a white-label B2B2C product.",
  overview:
    "Tracking energy was still difficult for households equipped with solar, a battery, or an electric vehicle.\n\nI replaced a <b>generic dashboard</b> with a <b>personalized experience by household profile</b>, to make the data more useful and the value more visible.",
  cardDescription:
    "Turning a generic energy dashboard into a personalized experience for different household profiles.",
  challenge:
    "Make energy data useful to every household, whatever their equipment or level of understanding.",
  roles: {
    owned: [
      "Product framing",
      "UX architecture",
      "Personalization logic",
      "Dashboard modularity",
      "Prototyping",
      "Product/dev alignment",
    ],
    team: [
      "Product",
      "Engineering",
      "Grand compte clients",
      "Sales",
    ],
  },
  year: "2018",
  timeline: "4 months",
  tools: ["Figma", "Notion", "Storybook", "Zeplin", "Illustrator"],
  tags: ["B2B2C", "Dashboard", "Personalization", "White-label", "Energy literacy"],
  projectType: "mobile et web",
  thumbnailTagTone: "canvas",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/ALL_Thumbnail.png",
    alt: "Preview of the personalized dashboard - modular widget layout.",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/ALL_Hero.png",
    alt: "Personalized dashboard - overview of the key screens.",
  },
  resultHeroLabel: "Result",
  tension: {
    title: "Understanding the problem",
    artifact: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/EN/EN_Tension_Before.png",
      alt: "The existing dashboard before personalization — same layout shown to all households regardless of equipment or goals.",
      caption: "The same dashboard layout shown to all households, regardless of equipment or goals.",
    },
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
          "The product value became hard to demonstrate with a dashboard that was too generic or too technical.",
        bullets: [
          "Value barely visible",
          "Limited engagement",
          "Difficult differentiation",
        ],
      },
    ],
    coreQuestion:
      "How can we make the dashboard useful to different households primarily motivated by savings?",
    chartCards: [
      {
        caption: "Households did not all have the same equipment level.",
        methodology: "Profile segmentation",
        methodologyIcon: "flask",
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
        caption: "The single dashboard did not hold attention well enough.",
        methodology: "Anonymized usage data",
        methodologyIcon: "chart-bar",
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
        methodology: "Anonymized usage data",
        methodologyIcon: "chart-bar",
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
          color: {
            dark: "#AEED6B",
            light: "#4f7d1b",
          },
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
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/ALL_option_A.png",
          alt: "Wireframe of a dashboard organized by user needs: save money, understand consumption and track production.",
          caption: "Option A: organize the dashboard around user intentions.",
        },
      },
      {
        id: "profile-dashboard",
        title: "Personalize by profile",
        summary:
          "Generate a dashboard adapted to the household's equipment, goals and level of understanding.",
        pros: ["Immediate value", "Needs better targeted"],
        cons: ["Sensitive configuration", "Personalization to justify"],
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/ALL_option_B.png",
          alt: "Wireframe showing a household profile generating a personalized dashboard.",
          caption: "Option B: use the household profile to generate a useful dashboard from the first visit.",
        },
      },
      {
        id: "contextual-learning",
        title: "Contextual progressive reveal",
        summary:
          "Keep one view, but progressively reveal the explanations and indicators that are useful.",
        pros: ["Less costly", "Improves understanding"],
        cons: ["Limited personalization", "Problem less targeted"],
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/ALL_option_C.png",
          alt: "Wireframe of a single dashboard view with progressive levels of explanation.",
          caption: "Option C: keep a shared view and add progressive pedagogy.",
        },
      },
    ],
    selectedSolutionId: "profile-dashboard",
    why:
      "Because households had needs that were too different for a single view, and personalization also reinforced the white-label logic expected by large accounts.",
    keyDecisions: [
      {
        id: "profile-personalization",
        eyebrow: "Personalization",
        title: "Adapt the dashboard to the household",
        summary:
          "Because the same dashboard could not be useful to households with different equipment, motivations and levels of understanding.",
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/ALL_KD1-0_Profile.png",
          alt: "Energy profile generated from onboarding, with motivations, equipment and level of understanding.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/customizable-dashboard/ALL_KD1-1_Generated.png",
            alt: "Dashboard automatically generated according to the household profile.",
            caption: "The dashboard prioritized the modules most useful to the profile.",
          },
          {
            type: "figma",
            src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio-%E2%80%94-Design-Reference?node-id=865-11930&viewport=-2073%2C860%2C0.18&t=IsFhSH1PHI1VYnPG-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=865%3A12243&page-id=1%3A2",
            title: "Progressive reveal",
            caption: "Indicators became more detailed depending on the level of understanding.",
            mode: "file",
            format: "web",
            protected: false,
            disableInteraction: true,
          },
        ],
        avoidedCost: [
          "A view that was too generic",
          "Modules that were not very useful",
        ],
        acceptedCost: [
          "A profile to explain",
          "Variants to maintain",
        ],
      },
      {
        id: "manual-customization",
        eyebrow: "Control",
        title: "Let users adjust it",
        summary:
          "Because an initial profile could help at the start, but should not lock users into a frozen configuration.",
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/ALL_KD2-0_EditMode.png",
          alt: "Edit mode allowing users to change the dashboard widgets.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/customizable-dashboard/ALL_KD2-1_EditedDashboard.png",
            alt: "Generated dashboard with a personalized widget layout.",
            caption: "A dashboard could be generated from the initial profile.",
          },
          {
            type: "image",
            src: "/assets/use-cases/customizable-dashboard/ALL_KD2-2_EditedDashboard2.png",
            alt: "Generated dashboard variation with a different module layout.",
            caption: "Modules could change depending on the household's needs.",
          },
          {
            type: "video",
            src: "/assets/use-cases/customizable-dashboard/ALL_KD2-3_MobileWidgetCreation.mp4",
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
        eyebrow: "Pedagogy",
        title: "Translate energy data",
        summary:
          "Because households were not looking for raw data, but for a clear explanation of their consumption and savings.",
        media: {
          type: "image",
          src: "/assets/use-cases/customizable-dashboard/ALL_KD3-0_DataTransformation.png",
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
      "Personalization improved the dashboard's key signals: initial attention, retention and understanding of value.",
    bullets: [
      {
        bold: "The first visit became more relevant",
        regular: "with lower bounce and more time spent on the dashboard",
      },
      {
        bold: "Interest held better after discovery",
        regular: "with D7 and D30 retention increasing on personalized profiles",
      },
      {
        bold: "Value was better perceived",
        regular: "with savings-related modules consulted more often",
      },
    ],
    charts: [
      {
        chart: {
          type: "before-after-combined-kpi",
          rows: [
            { label: "Bounce rate", before: { display: "48%", percent: 48 }, after: { display: "36%", percent: 36 } },
            { label: "Time on dashboard", before: { display: "41 sec", percent: 41 }, after: { display: "54 sec", percent: 54 } },
          ],
        },
        caption: "The dashboard held attention better from the first visit.",
        methodology: "Anonymized usage data",
        methodologyIcon: "chart-bar",
      },
      {
        chart: {
          type: "before-after-bar",
          title: "D7 retention",
          before: { display: "26%", value: 26 },
          after: { display: "34%", value: 34 },
        },
        caption: "More users came back after the first week.",
        methodology: "Anonymized usage data",
        methodologyIcon: "chart-bar",
      },
      {
        chart: {
          type: "before-after-bar",
          title: "D30 retention",
          before: { display: "09%", value: 9 },
          after: { display: "17%", value: 17 },
        },
        caption: "Interest held better after one month.",
        methodology: "Anonymized usage data",
        methodologyIcon: "chart-bar",
      },
      {
        chart: {
          type: "before-after-bar",
          title: "Module interactions",
          before: { display: "22%", value: 22 },
          after: { display: "34%", value: 34 },
        },
        caption: "Modules useful to the profile were consulted more often.",
        methodology: "Anonymized usage data",
        methodologyIcon: "chart-bar",
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
        do: "Adapt the visible value to the user's context",
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
};

const fr: UseCase = {
  order: 1,
  title: "Dashboard personnalisable",
  slug: "customizable-dashboard",
  tagline:
    "Transformer un écran générique en expérience personnalisée à un produit B2B2C white-label.",
  overview:
    "Suivre l’énergie restait difficile pour les foyers équipés de solaire, batterie ou véhicule électrique. \n\nJ’ai remplacé un <b>dashboard générique</b> par une <b>expérience personnalisée par profil de foyer</b>, pour rendre les données plus utiles et la valeur plus visible.",
  cardDescription:
    "Transformer un dashboard énergétique générique en expérience personnalisée selon les profils de foyers.",
  challenge:
    "Rendre les données énergétiques utiles à chaque foyer, quel que soit son équipement ou son niveau de compréhension.",
roles: {
  owned: [
    "Framing produit",
    "Architecture UX",
    "Logique de personnalisation",
    "Modularité dashboard",
    "Prototypage",
    "Alignement product/dev",
  ],
  team: [
    "Product",
    "Engineering",
    "Grand compte clients",
    "Sales",
  ],
},
  year: "2018",
  timeline: "4 mois",
  tools: ["Figma", "Notion", "Storybook", "Zeplin", "Illustrator"],
  tags: ["B2B2C", "Dashboard", "Personnalisation", "White-label", "Energy literacy"],
  projectType: "mobile et web",
  thumbnailTagTone: "canvas",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/ALL_Thumbnail.png",
    alt: "Aperçu du dashboard personnalisé — disposition modulaire des widgets.",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/ALL_Hero.png",
    alt: "Dashboard personnalisé — aperçu des écrans clés.",
  },
  resultHeroLabel: "Résultat",
  tension: {
    title: "Comprendre le problème",
    artifact: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/FR/FR_Tension_Before.png",
      alt: "Le dashboard existant avant personnalisation — même disposition affichée à tous les foyers, indépendamment de leur équipement ou de leurs objectifs.",
      caption: "La même disposition affichée à tous les foyers, indépendamment de leur équipement ou de leurs objectifs.",
    },
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
      "La valeur du produit devenait difficile à démontrer avec un dashboard trop générique ou trop technique.",
    bullets: [
      "Valeur peu visible",
      "Engagement limité",
      "Différenciation difficile",
    ],
  },
],
    coreQuestion:
  "Comment rendre le dashboard utile à des foyers différents, motivés d’abord par les économies ?",
  chartCards: [
      {
        caption: "Les foyers n’avaient pas tous le même niveau d’équipement.",
        methodology: "Segmentation des profils",
        methodologyIcon: "flask",
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
        caption: "Le dashboard unique ne retenait pas assez l’attention",
        methodology: "Données d’usage anonymisées",
        methodologyIcon: "chart-bar",
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
      {
        caption: "L’intérêt chutait fortement après la première découverte",
        methodology: "Données d’usage anonymisées",
        methodologyIcon: "chart-bar",
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
    color: {
      dark: "#AEED6B",
      light: "#4f7d1b",
    },
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
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/ALL_option_A.png",
      alt: "Mini-wireframe d’un dashboard organisé par besoins : économiser, comprendre sa consommation et suivre sa production.",
      caption:
        "Option A : organiser le dashboard autour des intentions utilisateur.",
    },
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
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/ALL_option_B.png",
      alt: "Mini-wireframe montrant un profil foyer générant un dashboard personnalisé.",
      caption:
        "Option B : partir du profil foyer pour générer un dashboard utile dès l’arrivée.",
    },
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
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/ALL_option_C.png",
      alt: "Mini-wireframe d’un dashboard unique avec niveaux progressifs d’explication.",
      caption:
        "Option C : conserver une vue commune et ajouter de la pédagogie progressive.",
    },
  },
],
selectedSolutionId: "profile-dashboard",
why:
  "Parce que les foyers avaient des besoins trop différents pour une vue unique, et que la personnalisation renforçait aussi la logique white-label attendue par les grands comptes.",
keyDecisions: [
  {
    id: "profile-personalization",
    eyebrow: "Personnalisation",
    title: "Adapter le dashboard au foyer",
    summary:
      "Parce qu’un même dashboard ne pouvait pas être utile à des foyers équipés, motivés et compétents différemment.",
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/ALL_KD1-0_Profile.png",
      alt: "Profil énergétique généré pour un foyer, avec motivations, équipements et niveau de compréhension.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/customizable-dashboard/ALL_KD1-1_Generated.png",
        alt: "Dashboard généré automatiquement selon le profil du foyer.",
        caption: "Le dashboard priorisait les modules les plus utiles au profil.",
      },
      {
        type: "figma",
        src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio-%E2%80%94-Design-Reference?node-id=865-11930&viewport=-2073%2C860%2C0.18&t=IsFhSH1PHI1VYnPG-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=865%3A12243&page-id=1%3A2",
        title: "Progressive reveal",
        caption: "Les indicateurs devenaient plus détaillés selon le niveau de compréhension.",
        mode: "file",
        format: "web",
        protected: false,
        disableInteraction: true,
      },
    ],
    avoidedCost: [
      "Une vue trop générique",
      "Des modules peu utiles",
    ],
    acceptedCost: [
      "Un profil à expliquer",
      "Des variantes à maintenir",
    ],
  },
  {
    id: "manual-customization",
    eyebrow: "Contrôle",
    title: "Laisser l’utilisateur ajuster",
    summary:
      "Parce qu’un profil initial pouvait aider au départ, mais ne devait pas enfermer l’utilisateur dans une configuration figée.",
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/ALL_KD2-0_EditMode.png",
      alt: "Mode édition permettant de modifier les widgets du dashboard.",
    },
    gallery: [
      {
        type: "image",
        src: "/assets/use-cases/customizable-dashboard/ALL_KD2-1_EditedDashboard.png",
        alt: "Dashboard généré avec une organisation de widgets personnalisée.",
        caption: "Un dashboard pouvait être généré selon le profil initial.",
      },
      {
        type: "image",
        src: "/assets/use-cases/customizable-dashboard/ALL_KD2-2_EditedDashboard2.png",
        alt: "Variation du dashboard généré avec une disposition différente des modules.",
        caption: "Les modules pouvaient changer selon les besoins du foyer.",
      },
      {
        type: "video",
        src: "/assets/use-cases/customizable-dashboard/ALL_KD2-3_MobileWidgetCreation.mp4",
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
      "Parce que les foyers ne cherchaient pas des données brutes, mais une explication claire de leur consommation et de leurs économies.",
    media: {
      type: "image",
      src: "/assets/use-cases/customizable-dashboard/ALL_KD3-0_DataTransformation.png",
      alt: "Transformation des données énergétiques brutes en messages compréhensibles pour l’utilisateur.",
    },
    gallery: [],
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
    "La personnalisation a amélioré les signaux clés du dashboard : attention initiale, rétention et compréhension de la valeur.",
  bullets: [
    {
      bold: "La première visite devenait plus pertinente",
      regular: "moins de rebond et plus de temps passé sur le dashboard",
    },
    {
      bold: "L’intérêt se maintenait mieux après découverte",
      regular: "rétention J7 et J30 en hausse sur les profils personnalisés",
    },
    {
      bold: "La valeur était mieux perçue",
      regular: "les modules liés aux économies étaient davantage consultés",
    },
  ],
  charts: [
    {
      chart: {
        type: "before-after-combined-kpi",
        rows: [
          {
            label: "Taux de rebond",
            before: { display: "48%", percent: 48 },
            after: { display: "36%", percent: 36 },
          },
          {
            label: "Temps sur dashboard",
            before: { display: "41 sec", percent: 41 },
            after: { display: "54 sec", percent: 54 },
          },
        ],
      },
      caption: "Le dashboard retenait mieux l’attention dès la première visite.",
      methodology: "Données d’usage anonymisées",
      methodologyIcon: "chart-bar",
    },
    {
      chart: {
        type: "before-after-bar",
        title: "Rétention J7",
        before: { display: "26%", value: 26 },
        after: { display: "34%", value: 34 },
      },
      caption: "Plus d’utilisateurs revenaient après la première semaine.",
      methodology: "Données d’usage anonymisées",
      methodologyIcon: "chart-bar",
    },
    {
      chart: {
        type: "before-after-bar",
        title: "Rétention J30",
        before: { display: "09%", value: 9 },
        after: { display: "17%", value: 17 },
      },
      caption: "L’intérêt se maintenait mieux après un mois.",
      methodology: "Données d’usage anonymisées",
      methodologyIcon: "chart-bar",
    },
    {
      chart: {
        type: "before-after-bar",
        title: "Interactions modules",
        before: { display: "22%", value: 22 },
        after: { display: "34%", value: 34 },
      },
      caption: "Les modules utiles au profil étaient davantage consultés.",
      methodology: "Données d’usage anonymisées",
      methodologyIcon: "chart-bar",
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
      do: "Adapter la valeur visible au contexte utilisateur",
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
};

export const customizableDashboard: Record<string, UseCase> = { en, fr };
