import type { UseCase } from "@/content/use-cases/types";

const en: UseCase = {
  title: "Raised first-week activation by making setup feel like progress",
  slug: "customizable-dashboard",
  overview:
    "Reshaped onboarding around one meaningful early win, reducing decision fatigue and improving first-week activation on mobile.",
  challenge:
    "Increase activation on mobile without turning onboarding into a longer checklist or a skippable tutorial.",
  roles: ["Lead Product Designer", "Product Strategy", "Mobile UX"],
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
  previewVideo: {
    type: "video",
    src: "/assets/use-cases/customizable-dashboard/preview.mp4",
    poster: "/assets/use-cases/mobile-onboarding-optimization/preview.svg",
    alt: "Customizable Dashboard — animated preview",
  },
  previewRatio: "586/1254",
  resultHero: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/boost_dashboard.png",
    alt: "Customizable Dashboard — key screens overview.",
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
      {
        chart: {
          type: "insight",
          label: "Comprehension",
          icon: "lightbulb",
          insightTitle: "Too much detail, too early",
          insightDescription:
            "Many households struggled to interpret technical indicators when they were not tied to a simple explanation.",
          methodology: "Seen in comprehension tests",
          methodologyIcon: "clipboard-text",
          color: "#6F55D8",
        },
      },
      {
        chart: {
          type: "insight",
          label: "Relevance",
          icon: "users-three",
          insightTitle: "One dashboard could not fit all",
          insightDescription:
            "Equipment type, goals and energy literacy changed what felt useful from one household to another.",
          methodology: "Seen in segmentation analysis",
          methodologyIcon: "chart-bar",
          color: "#2876C7",
        },
      },
      {
        chart: {
          type: "insight",
          label: "Qualitative Insight",
          icon: "piggy-bank",
          insightTitle: "Saving came first",
          insightDescription:
            "Users were less interested in raw energy data than in understanding how much they could save",
          methodology: "Seen in interviews & engagement test",
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
        id: "compressed",
        title: "Compressed setup flow",
        summary:
          "Shorten the existing flow but keep all current questions and decisions in a tighter sequence.",
        pros: ["Simpler to build", "Minimal scope risk"],
        cons: ["Does not fix the core friction", "Completion rates unlikely to shift"],
      },
      {
        id: "guided-activation",
        title: "Guided activation journey",
        summary:
          "Lead users through one meaningful task first, then progressively introduce setup and personalization.",
        pros: ["Drives early value delivery", "High momentum on mobile"],
        cons: ["Requires rethinking the first-session goal", "More upfront design investment"],
      },
      {
        id: "skip-heavy",
        title: "Mostly skippable onboarding",
        summary:
          "Push the majority of setup after entry, relying on reminders and empty states to educate later.",
        pros: ["Fast to ship", "Lower drop-off at entry"],
        cons: ["Deferred setup reduces activation", "Empty states harder to design well"],
      },
    ],
    selectedSolutionId: "guided-activation",
    gallery: [
      {
        type: "figma",
        src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio?node-id=196-4414&starting-point-node-id=196-4414&page-id=18:38",
        title: "Customizable dashboard — prototype interactif",
        caption: "Prototype interactif — naviguez dans le flow",
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
  title: "Dashboard personnalisé pour foyers à énergie renouvelable",
  slug: "customizable-dashboard",
  overview:
    "Transformation d’un dashboard énergétique dense en expérience personnalisée selon l’équipement, les objectifs et le niveau de compréhension du foyer",
  challenge:
    "Rendre la valeur énergétique compréhensible et utile pour chaque type de foyer",
  roles: ["Principal Product Designer"],
  year: "2018",
  timeline: "4 mois",
  tools: ["Figma", "Notion", "Storybook", "Zeplin", "Illustrator"],
  tags: ["B2B2C", "Web & Mobile", "White label", "flagship product", "E2E ownership"],
  projectType: "mobile et web",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/preview.png",
    alt: "Vidéo à éditer du dashboard personnalisé (mobile)",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/customizable-dashboard/preview.png",
    alt: "Dashboard personnalisé — aperçu des écrans clés.",
  },
  tension: {
    title: "Comprendre le problème",
    tensions: [
      {
        label: "Pour les utilisateurs",
        value:
          "Un problème lié aux motivations, au niveau de compréhension et à la diversité d'usage selon les foyers.",
        bullets: [
          "Niveaux de compréhension très variés",
          "Attente d'abord économique",
          "Des équipements très différents d'un foyer à l'autre",
        ],
      },
      {
        label: "Pour le business",
        value:
          "Des conséquences et impacts très directs côté business, provoquant des frictions à la vente.",
        bullets: [
          "Faible perception de valeur",
          "Engagement limité",
          "Impact produit difficile à démontrer",
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
      "Comment rendre le dashboard utile à des foyers très différents, motivés d’abord par les économies ?",
    chartCards: [
      {
        caption: "Des foyers et types d'installation très hétérogènes",
        chart: {
          type: "vertical-bars",
          bars: [
            { label: "Conso\nseule",         value: 34, color: "var(--color-primary)" },
            { label: "Solaire\nseul",         value: 27, color: "#00fe33" },
            { label: "Solaire +\nbat.",       value: 18, color: "#c3fe00" },
            { label: "Solaire +\nEV",         value: 11, color: "#fef100" },
            { label: "Solaire +\nbat. + EV",  value: 10, color: "#feba00" },
          ],
        },
      },
      {
        caption: "Le dashboard actuel est trop dense ou trop confus",
        chart: {
          type: "dual-progress",
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
      {caption: "Le dashboard perdait rapidement son intérêt après la découverte",
        chart: {
          type: "line",
          points: [
            { label: "J0",  value: 100, color: "var(--color-primary)" },
            { label: "J7",  value: 26,  color: "#00fe33" },
            { label: "J30", value: 9,   color: "var(--color-secondary)" },
          ],
        },
      },
      {
        chart: {
          type: "insight",
          label: "Compréhension",
          icon: "lightbulb",
          insightTitle: "Les données sont trop techniques",
          insightDescription:
            "Beaucoup de foyers avaient du mal à interpréter les indicateurs techniques lorsqu'ils n'étaient pas reliés à une explication simple.",
          methodology: "Observé en tests de compréhension",
          methodologyIcon: "clipboard-text",
          color: "#aa95ff",
        },
      },
      {
        chart: {
          type: "insight",
          label: "Pertinence",
          icon: "users-three",
          insightTitle: "Un seul dashboard ne pouvait pas convenir à tous",
          insightDescription:
            "Le type d'équipement, les objectifs et le niveau de compréhension énergétique changeaient ce qui semblait utile d'un foyer à l'autre.",
          methodology: "Observé en analyse de segmentation",
          methodologyIcon: "chart-bar",
          color: "#67d4ff",
        },
      },
      {
        chart: {
          type: "insight",
          label: "Insight qualitatif",
          icon: "piggy-bank",
          insightTitle: "Les économies passaient en premier",
          insightDescription:
            "Les utilisateurs s'intéressaient moins aux données énergétiques brutes qu'à ce qu'elles leur permettaient d'économiser",
          methodology: "Observé en entretiens et test d'engagement",
          methodologyIcon: "flask",
          color: "#AEED6B",
        },
      },
    ],
  },
  solution: {
    title: "Un chemin guidé qui gagne l'attention au lieu de la dépenser",
    exploredSolutions: [
      {
        id: "compressed",
        title: "Organiser l'interface par intention",
        summary:
          "Des blocs liés aux objectifs de consultation (Réduire ma facture, Mieux comprendre ma conso, ...)",
        pros: ["Langage utilisateur", "Motivation adressée"],
        cons: ["Vue d’ensemble fragmentée", "Peu adapté aux foyers hybrides"],
      },
      {
        id: "guided-activation",
        title: "Dashboard personnalisable par profil d'utilisateur",
        summary:
          "Les utilisateurs peuvent concevoir leur propre dashboard à partir d'un généré selon leur onboarding",
        pros: ["Hétérogénéités traitées", "Valeur immédiate par profil"],
        cons: ["Complexe de configuration", "Transparence nécessaire"],
      },
      {
        id: "skip-heavy",
        title: "Vue unique et pédagogie contextuelle",
        summary:
          "Progress reveal, hiérarchie renforcée, explications contextuelles, indicateurs traduits",
        pros: ["Améliore la compréhension", "Plus rapide et coût réduit"],
        cons: [
    "Personnalisation limitée", "Réponse aux problèmes moins ciblée"],
      },
    ],
    selectedSolutionId: "guided-activation",
    gallery: [
      {
        type: "figma",
        src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio-%E2%80%94-Design-Reference?node-id=196-4197&viewport=861%2C1527%2C0.24&t=zRYMpAQ8Koghcc27-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=196%3A4197&page-id=18%3A38&show-proto-sidebar=1",
        caption: "Customizations par niveau de compréhension",
        title: "Customizations par niveau de compréhension",
      },
      {
        type: "figma",
        src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio-%E2%80%94-Design-Reference?node-id=196-7791&viewport=861%2C1527%2C0.24&t=zRYMpAQ8Koghcc27-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=196%3A7791&page-id=18%3A38&show-proto-sidebar=1",
        title: "Des customizations de taille et position",
        caption: "Des customizations de taille et position",
      },
      {
        type: "figma",
        src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio?node-id=196-4414&starting-point-node-id=196-4414&page-id=18:38",
        title: "Customizable dashboard — prototype interactif",
        caption: "Un dashboard qui s'adapte à chaque utilisateur",
      },
      {
        type: "figma",
        src: "https://www.figma.com/proto/gUTv202uYQooOVed5IXOPT/Portfolio-%E2%80%94-Design-Reference?node-id=209-2856&viewport=861%2C1527%2C0.24&t=zRYMpAQ8Koghcc27-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=209%3A2043&page-id=18%3A38&show-proto-sidebar=1",
        title: "Des données et indicateurs traduits en langage utilisateur",
        caption: "Des données et indicateurs traduits en langage utilisateur",
      }
    ],
  },
  impactSection: {
    title: "Les impacts",
    summary: "La personnalisation a amélioré les signaux d’engagement, de rétention et de perception de valeur.",
    bullets: [
  {
    bold: "La première visite devient plus pertinente",
    regular: "(moins de rebond, plus de temps passé)"
  },
  {
    bold: "La valeur est mieux perçue dès le départ",
    regular: "(modules d’économies plus consultés)"
  },
  {
    bold: "L’effet se maintient après la découverte",
    regular: "(rétention J7 et J30 en hausse)"
  },
  {
    bold: "La personnalisation cible mieux les besoins",
    regular: "(engagement module en hausse)"
  },
],
    charts: [
      { type: "bar", title: "Rétention J7",                    before: { display: "26%", value: 26 }, after: { display: "34%", value: 34 } },
      { type: "bar", title: "Rétention J30",                   before: { display: "09%", value: 9  }, after: { display: "17%", value: 17 } },
      { type: "bar", title: "Taux d'interaction avec modules", before: { display: "22%", value: 22 }, after: { display: "34%", value: 34 } },
      {
        type: "progress",
        rows: [
          { label: "Taux de rebond",      before: { display: "48%",    percent: 48 }, after: { display: "42%",    percent: 42 } },
          { label: "Temps sur Dashboard", before: { display: "41 sec", percent: 41 }, after: { display: "54 sec", percent: 54 } },
        ],
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
        do: "Utiliser l'on-boarding pour segmenter et configurer une expérience plus pertinente",
      },
      {
        dont: "Organiser l'interface selon la logique du produit",
        do: "L'organiser selon les intentions utilisateur",
      },
      {dont: "Mesurer seulement l’engagement global",
do: "Comparer les signaux par profil, module et moment d’usage"
      },
    ],
  },
  relatedUseCaseSlugs: [],
};

export const customizableDashboard: Record<string, UseCase> = { en, fr };
