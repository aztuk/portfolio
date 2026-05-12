import type { UseCase } from "@/content/use-cases/types";


const en: UseCase = {
  order: 3,
  title: "From a raw list to a decision",
  slug: "virtual-power-plant-flexibility",
  overview:
    "In 2019, we were working on a tool that helped energy suppliers manage batteries, solar panels and other distributed assets across the grid.\n\nEnergy traders struggled to quickly know how much energy was available, where it was located and how long it could be used — I designed an interface to make those answers visible and test a power demand.",
  challenge:
    "Help traders quickly know how much energy can be used, where it is, and how long it remains available.",
  roles: {
    owned: [
      "Discovery",
      "Product scoping",
      "UX architecture",
      "Data visualization",
      "Prototyping",
      "User testing",
    ],
    contributed: ["Delivery", "Handoff"],
  },
  year: "2019",
  timeline: "9 months",
  tools: ["Figma", "Notion", "Zeplin"],
  tags: ["B2B", "Complex", "Data Visualization", "Map", "Regulations"],
  projectType: "mobile",
  thumbnailTagTone: "white",
  previewImage: {
    type: "image",
    src: "/assets/use-cases/cluster/ALL_Thumbnail.png",
    alt: "Before/after montage showing the transition from a raw list of energy assets to a decision interface with map, available capacity and simulation.",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/cluster/ALL_Hero.png",
    alt: "Before/after montage showing the transition from a raw list of energy assets to a decision interface with map, available capacity and simulation.",
  },
  tension: {
    title: "Understanding the problem",
    tensions: [
      {
        label: "For energy traders",
        value:
          "They had to quickly answer a simple question: how much energy can we use now or soon?",
        bullets: [
          "Fast decision",
          "Variable availability",
          "Trust required",
        ],
      },
      {
        label: "For energy providers",
        value:
          "Thousands of distributed assets had to become a readable and usable reserve.",
        bullets: [
          "Distributed assets",
          "Hard to aggregate potential",
          "Local comfort to preserve",
        ],
      },
    ],
    coreQuestion:
      "How can we help a trader quickly know how much energy can be used, where, and for how long?",
    discoverySignals: [
      "Business expert interviews",
      "Energy portfolio mapping",
      "Business scenarios",
      "Data readability tests",
    ],
    artifacts: [
      {
        type: "image",
        src: "/assets/use-cases/cluster/ALL_Tension_Before.png",
        alt: "Old list-based interface showing distributed energy assets, with no map, no aggregation and no decision support.",
        caption:
          "Before: an asset list useful for browsing, but insufficient for making quick decisions.",
      }
    ],
    chartCards: [
      {
        caption: "Key answers required too much manual search.",
        chart: {
          type: "bars",
          title: "Time needed to find",
          bars: [
            {
              label: "Available\npower",
              value: 18,
              displayValue: "18mn",
              color: "var(--color-primary)",
            },
            {
              label: "Available prod or\nstorage units",
              value: 14,
              displayValue: "14mn",
              color: "var(--color-chart-lime)",
            },
            {
              label: "Risk to\nlocal comfort",
              value: 22,
              displayValue: "22mn",
              color: "var(--color-chart-citron)",
            },
          ],
        },
      },
      {
        chart: {
          type: "insight",
          label: "Business insight",
          icon: "lightbulb",
          insightTitle: "Data existed but answers didn't",
          insightDescription:
            "Traders could see assets, but not directly the energy actually usable",
          methodology: "Trading scenarios",
          methodologyIcon: "flask",
          color: {
            dark: "var(--color-chart-citron)",
            light: "#667200",
          },
        },
      },
      {
        caption: "The list displayed data, but not answers.",
        chart: {
          type: "combined-kpi",
          rows: [
            {
              title: "Answers obtained without interaction",
              description:
                "Without filtering, calculating or cross-referencing outside the tool.",
              display: "1/10",
              percent: 10,
              variant: "primary",
            },
            {
              title: "Answers requiring manual analysis",
              description:
                "Comparison, forecasting or estimation outside the tool.",
              display: "9/10",
              percent: 90,
              variant: "secondary",
            },
          ],
        },
      },
    ],
  },

  solution: {
    title: "Exploration and solution",
    exploredSolutions: [
      {
        id: "filtered-list",
        title: "Create a filtered list view",
        summary:
          "Add filters, statuses and key columns to find available assets faster.",
        pros: [
          "Quick to ship",
          "Familiar usage",
        ],
        cons: [
          "Answer still to reassemble",
          "Decision still slow",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_option_A.png",
          alt: "Mini-wireframe of a filtered list of energy assets.",
          caption:
            "Option A: speed up the search, without changing the decision model.",
        },
      },
      {
        id: "geographic-view",
        title: "Create a geographic view",
        summary:
          "Display assets on a map to understand where available energy is located.",
        pros: [
          "Clear localisation",
          "More readable portfolio",
        ],
        cons: [
          "Observation view only",
          "No simulation",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_option_B.png",
          alt: "Mini-wireframe of a geographic view of energy assets.",
          caption:
            "Option B: make the portfolio visible, without yet testing a demand.",
        },
      },
      {
        id: "combined-decision-view",
        title: "Create a decision view",
        summary:
          "Combine map, capacity, forecast, local risk and simulation in a single interface.",
        pros: [
          "Immediate answer",
          "Testable action",
        ],
        cons: [
          "More complex",
          "Thresholds to explain",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_option_C.png",
          alt: "Mini-wireframe of a combined view with map, forecast, local risk and simulation.",
          caption:
            "Option C: move from searching for information to a simulable decision.",
        },
      },
    ],
    selectedSolutionId: "combined-decision-view",
    why:
      "Because in a trading context, searching or merely visualizing was not enough: the value came from getting a fast, actionable answer.",
    keyDecisions: [
      {
        id: "answer-not-table",
        eyebrow: "Readability",
        title: "Put the decision at the heart of the journey",
        summary:
          "Because an asset list forced traders to search, compare and recalculate before they could decide.",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD1-0_RealTimeTrading.png",
          alt: "The three biggest decision questions (where, when, how much) displayed directly in the interface, without needing to search or cross-check data.",
        },
        gallery: [],
        avoidedCost: [
          "Line-by-line searching",
          "Answer to reassemble manually",
        ],
        acceptedCost: [
          "Prioritising the answers",
          "Hiding secondary details",
        ],
      },
      {
        id: "map-as-context",
        eyebrow: "Location",
        title: "Locate before analysing",
        summary:
          "Because available capacity did not have the same value depending on its zone, density and local impact.",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD2-0_SelectedZone.png",
          alt: "Map showing a selected zone of energy assets with available capacity highlighted.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/cluster/ALL_KD2-1_HeatmapDiscomfort.png",
            alt: "Heat map showing discomfort risk across zones, helping traders weigh local impact before committing.",
            caption:
              "The discomfort heat map made local risk visible alongside capacity.",
          },
        ],
        avoidedCost: [
          "Invisible capacity by zone",
          "Slow geographic comparison",
        ],
        acceptedCost: [
          "Map to make readable",
          "Filters to prioritise",
        ],
      },
      {
        id: "forecast-before-action",
        eyebrow: "Time",
        title: "Forecast before acting",
        summary:
          "Because capacity available now could disappear before the period actually requested.",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD3-0_Forecast.png",
          alt: "Chart comparing currently available capacity and forecast capacity during the target period.",
        },
        gallery: [],
        avoidedCost: [
          "Too instantaneous a decision",
          "Poorly anticipated availability",
        ],
        acceptedCost: [
          "Displaying uncertainty",
          "Explaining the forecast",
        ],
      },
      {
        id: "simulate-before-commit",
        eyebrow: "Action",
        title: "Simulate before committing",
        summary:
          "Because committing a demand without testing it could exceed real capacity or degrade local comfort.",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD4-0_Simulation.png",
          alt: "Simulation block showing requested power, target period, result, coverage and confidence.",
        },
        gallery: [],
        avoidedCost: [
          "Too risky a commitment",
          "Underestimated local impact",
        ],
        acceptedCost: [
          "Constraints to model",
          "Limits to display",
        ],
      },
    ],
  },

  impactSection: {
    title: "The impacts",
    summary:
      "The interface transformed slow searching through a raw list into fast reading of decision-ready answers.",
    bullets: [
      {
        bold: "Traders found usable energy faster",
        regular: "less line-by-line searching in the asset list",
      },
      {
        bold: "Available zones and units became more readable",
        regular: "production, storage and availability visible in a single view",
      },
      {
        bold: "Decisions required fewer manual cross-checks",
        regular: "more answers obtained directly from the interface",
      },
    ],
    charts: [
      {
        chart: {
          type: "duration-bars",
          title: "Time to get an answer",
          items: [
            {
              label: "Available\npower",
              before: { display: "18mn", value: 18 },
              after: { display: "4mn", value: 4 },
            },
            {
              label: "Available prod or\nstorage units",
              before: { display: "14mn", value: 14 },
              after: { display: "3mn", value: 3 },
            },
            {
              label: "Risk to\nlocal comfort",
              before: { display: "22mn", value: 22 },
              after: { display: "6mn", value: 6 },
            },
          ],
        },
        caption: "The same questions became faster to answer.",
      },
      {
        chart: {
          type: "before-after-combined-kpi",
          rows: [
            {
              label: "Answers obtained without interaction",
              before: { display: "1/10", percent: 10 },
              after: { display: "6/10", percent: 60 },
            },
            {
              label: "Answers requiring manual analysis",
              before: { display: "9/10", percent: 90 },
              after: { display: "2/10", percent: 20 },
            },
          ],
        },
        caption: "The new interface reduced manual cross-checking.",
      },
    ],
  },

  retrospective: {
    title: "Retrospective",
    summary:
      "This project strengthened the way I design decision interfaces for complex subjects.",
    dontLabel: "DON'T",
    doLabel: "INSTEAD",
    items: [
      {
        dont: "Show more data",
        do: "Turn data into actionable answers",
      },
      {
        dont: "See visualisation as an end",
        do: "Use it as an entry point for a decision",
      },
      {
        dont: "Hide uncertainty to simplify",
        do: "Make it visible to decide with confidence",
      },
    ],
  },
};

const fr: UseCase = {
  order: 3,
  title: "Passer d'une liste brute à une décision",
  slug: "virtual-power-plant-flexibility",
  overview:
    "En 2019, nous travaillions sur un outil qui aidait les fournisseurs d'énergie à piloter des batteries, panneaux solaires et autres équipements répartis sur le territoire. \n\nLes traders énergie avaient du mal à savoir rapidement <b>combien d'énergie</b> était disponible, <b>où elle se trouvait</b> et <b>combien de temps</b> elle pouvait être utilisée ; j'ai conçu une interface pour rendre <b>ces réponses visibles</b> et tester une demande de puissance.",
  challenge:
    "Aider les traders à savoir rapidement combien d'énergie peut être utilisée, où elle se trouve et combien de temps elle reste disponible.",
  roles: {
    owned: [
      "Discovery",
      "Cadrage produit",
      "Architecture UX",
      "Data visualization",
      "Prototypage",
      "Tests utilisateurs",
    ],
    contributed: ["Delivery", "Handoff"],
  },
  year: "2019",
  timeline: "9 mois",
  tools: ["Figma", "Notion", "Zeplin"],
  tags: ["B2B", "Complexe", "Data Visualization", "Carte", "Régulations"],
  thumbnailTagTone: "white",

  previewImage: {
    type: "image",
    src: "/assets/use-cases/cluster/ALL_Thumbnail.png",
    alt: "Montage avant/après montrant le passage d'une liste brute d'équipements énergétiques à une interface de décision avec carte, capacité mobilisable et simulation.",
  },
  resultHero: {
    type: "image",
    src: "/assets/use-cases/cluster/ALL_Hero.png",
    alt: "Montage avant/après montrant le passage d'une liste brute d'équipements énergétiques à une interface de décision avec carte, capacité mobilisable et simulation.",
  },

  tension: {
    title: "Comprendre le problème",
    tensions: [
      {
        label: "Pour les traders énergie",
        value:
          "Ils devaient répondre vite à une question simple : combien d'énergie peut-on utiliser maintenant ou bientôt ?",
        bullets: [
          "Décision rapide",
          "Disponibilité variable",
          "Confiance nécessaire",
        ],
      },
      {
        label: "Pour les fournisseurs d'énergie",
        value:
          "Des milliers d'équipements dispersés devaient devenir une réserve lisible et utilisable.",
        bullets: [
          "Équipements dispersés",
          "Potentiel difficile à additionner",
          "Confort local à préserver",
        ],
      },
    ],
    coreQuestion:
      "Comment aider un trader à savoir rapidement combien d'énergie peut être utilisée, où et pendant combien de temps ?",
    discoverySignals: [
      "Entretiens avec experts métier",
      "Cartographie du parc énergétique",
      "Scénarios métier",
      "Tests de lisibilité des données",
    ],
    artifacts: [
      {
        type: "image",
        src: "/assets/use-cases/cluster/ALL_Tension_Before.png",
        alt: "Ancienne interface sous forme de liste brute montrant des équipements énergétiques dispersés, sans carte, sans agrégation et sans aide à la décision.",
        caption:
          "Avant : une liste d'équipements utile pour consulter, mais insuffisante pour décider rapidement.",
      }
    ],

    chartCards: [
      {
        caption: "Les réponses clés demandaient trop de recherche manuelle",
        chart: {
          type: "bars",
          title: "Temps nécessaire pour chercher",
          bars: [
            {
              label: "Puissance\nmobilisable",
              value: 18,
              displayValue: "18mn",
              color: "var(--color-primary)",
            },
            {
              label: "Unités prod ou\nstorage disponibles",
              value: 14,
              displayValue: "14mn",
              color: "var(--color-chart-lime)",
            },
            {
              label: "Risque sur le\nconfort local",
              value: 22,
              displayValue: "22mn",
              color: "var(--color-chart-citron)",
            },
          ],
        },
      },
      {
        chart: {
          type: "insight",
          label: "Insight métier",
          icon: "lightbulb",
          insightTitle: "La donnée existait mais pas la réponse",
          insightDescription:
            "Les traders voyaient les équipements, mais pas directement l'énergie réellement utilisable",
          methodology: "Scénarios de trading",
          methodologyIcon: "flask",
          color: {
            dark: "var(--color-chart-citron)",
            light: "#667200",
          },
        },
      },
      {
        caption: "La liste affichait les données, mais pas les réponses.",
        chart: {
          type: "combined-kpi",
          rows: [
            {
              title: "Réponses obtenues sans interaction",
              description:
                "Sans filtre, calcul ou recoupement hors outil.",
              display: "1/10",
              percent: 10,
              variant: "primary",
            },
            {
              title: "Réponses nécessitant analyse manuelle",
              description:
                "Comparaison, prévision ou estimation hors outil.",
              display: "9/10",
              percent: 90,
              variant: "secondary",
            },
          ],
        },
      },
    ],
  },

  solution: {
    title: "Exploration et solution",
    exploredSolutions: [
      {
        id: "filtered-list",
        title: "Créer une vue liste filtrée",
        summary:
          "Ajouter filtres, statuts et colonnes clés pour retrouver plus vite les assets disponibles.",
        pros: [
          "Rapide à livrer",
          "Usage déjà connu",
        ],
        cons: [
          "Réponse à recomposer",
          "Décision encore lente",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_option_A.png",
          alt: "Mini-wireframe d'une liste filtrée d'assets énergétiques.",
          caption:
            "Option A : accélérer la recherche, sans changer le modèle de décision.",
        },
      },
      {
        id: "geographic-view",
        title: "Créer une vue géographique",
        summary:
          "Afficher les assets sur une carte pour comprendre où se trouve l'énergie disponible.",
        pros: [
          "Localisation claire",
          "Parc plus lisible",
        ],
        cons: [
          "Vue d'observation",
          "Simulation absente",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_option_B.png",
          alt: "Mini-wireframe d'une vue géographique des assets énergétiques.",
          caption:
            "Option B : rendre le parc visible, sans encore tester une demande.",
        },
      },
      {
        id: "combined-decision-view",
        title: "Créer une vue de décision",
        summary:
          "Combiner carte, capacité, prévision, risque local et simulation dans une même interface.",
        pros: [
          "Réponse immédiate",
          "Action testable",
        ],
        cons: [
          "Plus complexe",
          "Seuils à expliquer",
        ],
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_option_C.png",
          alt: "Mini-wireframe d'une vue combinée avec carte, prévision, risque local et simulation.",
          caption:
            "Option C : passer de la recherche d'information à une décision simulable.",
        },
      },
    ],
    selectedSolutionId: "combined-decision-view",
    why:
      "Parce qu'en contexte de trading, chercher ou seulement visualiser ne suffisait pas : la valeur venait d'une réponse obtenue rapidement et actionnable.",
    keyDecisions: [
      {
        id: "answer-not-table",
        eyebrow: "Lecture",
        title: "Mettre la décision au coeur du parcours",
        summary:
          "Parce qu'une liste d'assets obligeait le trader à chercher, comparer et recalculer avant de pouvoir décider",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD1-0_RealTimeTrading.png",
          alt: "Les 3 plus grandes questions de décision (où, quand, combien) affichées directement dans l'interface, sans besoin de chercher ou recouper les données",
        },
        gallery: [],
        avoidedCost: [
          "Recherche ligne par ligne",
          "Réponse à recomposer",
        ],
        acceptedCost: [
          "Hiérarchiser les réponses",
          "Masquer des détails secondaires",
        ],
      },
      {
        id: "map-as-context",
        eyebrow: "Localisation",
        title: "Localiser avant d'analyser",
        summary:
          "Parce que la capacité disponible n'avait pas la même valeur selon sa zone, sa densité et son impact local",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD2-0_SelectedZone.png",
          alt: "Carte montrant une zone sélectionnée d'assets énergétiques avec la capacité disponible mise en valeur.",
        },
        gallery: [
          {
            type: "image",
            src: "/assets/use-cases/cluster/ALL_KD2-1_HeatmapDiscomfort.png",
            alt: "Carte de chaleur montrant le risque d'inconfort local par zone, pour évaluer l'impact avant engagement.",
            caption:
              "La heatmap d'inconfort rendait le risque local visible à côté de la capacité disponible.",
          },
        ],
        avoidedCost: [
          "Capacité invisible par zone",
          "Comparaison géographique lente",
        ],
        acceptedCost: [
          "Carte à rendre lisible",
          "Filtres à hiérarchiser",
        ],
      },
      {
        id: "forecast-before-action",
        eyebrow: "Temps",
        title: "Prévoir avant d'agir",
        summary:
          "Parce qu'une capacité disponible maintenant pouvait disparaître avant la période réellement demandée",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD3-0_Forecast.png",
          alt: "Graphique comparant la capacité disponible maintenant et la capacité prévue pendant la période cible.",
        },
        gallery: [],
        avoidedCost: [
          "Décision trop instantanée",
          "Disponibilité mal anticipée",
        ],
        acceptedCost: [
          "Afficher l'incertitude",
          "Expliquer la prévision",
        ],
      },
      {
        id: "simulate-before-commit",
        eyebrow: "Action",
        title: "Simuler avant d'engager",
        summary:
          "Parce qu'engager une demande sans test pouvait dépasser la capacité réelle ou dégrader le confort local",
        media: {
          type: "image",
          src: "/assets/use-cases/cluster/ALL_KD4-0_Simulation.png",
          alt: "Bloc de simulation montrant la puissance demandée, la période cible, le résultat, la couverture et la confiance.",
        },
        gallery: [],
        avoidedCost: [
          "Engagement trop risqué",
          "Impact local sous-estimé",
        ],
        acceptedCost: [
          "Contraintes à modéliser",
          "Limites à afficher",
        ],
      },
    ],
  },

  impactSection: {
    title: "Les impacts",
    summary:
      "L'interface a transformé une recherche lente dans une liste brute en lecture rapide des réponses utiles à la décision.",
    bullets: [
      {
        bold: "Les traders trouvaient plus vite l'énergie utilisable",
        regular:
          "moins de recherche ligne par ligne dans la liste d'équipements",
      },
      {
        bold: "Les zones et unités disponibles devenaient plus lisibles",
        regular:
          "production, stockage et disponibilité visibles dans une même lecture",
      },
      {
        bold: "Les décisions demandaient moins de recoupements manuels",
        regular:
          "plus de réponses obtenues directement dans l'interface",
      },
    ],
    charts: [
      {
        chart: {
          type: "duration-bars",
          title: "Temps pour obtenir une réponse",
          items: [
            {
              label: "Puissance\nutilisable",
              before: { display: "18mn", value: 18 },
              after: { display: "4mn", value: 4 },
            },
            {
              label: "Unités prod ou\nstorage disponibles",
              before: { display: "14mn", value: 14 },
              after: { display: "3mn", value: 3 },
            },
            {
              label: "Risque sur le\nconfort local",
              before: { display: "22mn", value: 22 },
              after: { display: "6mn", value: 6 },
            },
          ],
        },
        caption: "Les mêmes questions devenaient plus rapides à traiter.",
      },
      {
        chart: {
          type: "before-after-combined-kpi",
          rows: [
            {
              label: "Réponses obtenues sans interaction",
              before: { display: "1/10", percent: 10 },
              after: { display: "6/10", percent: 60 },
            },
            {
              label: "Réponses nécessitant analyse manuelle",
              before: { display: "9/10", percent: 90 },
              after: { display: "2/10", percent: 20 },
            },
          ],
        },
        caption: "La nouvelle interface réduisait les recoupements manuels.",
      },
    ],
  },

  retrospective: {
    title: "Rétrospective",
    summary:
      "Ce projet a renforcé ma manière de concevoir des interfaces de décision pour des sujets complexes.",
    dontLabel: "NE PLUS",
    doLabel: "MAIS PLUTÔT",
    items: [
      {
        dont: "Montrer plus de données",
        do: "Transformer les données en réponses actionnables",
      },
      {
        dont: "Voir la visualisation comme une fin",
        do: "L'utiliser comme point d'entrée vers une décision",
      },
      {
        dont: "Cacher l'incertitude pour simplifier",
        do: "La rendre visible pour décider avec confiance",
      },
    ],
  },
  projectType: "mobile",
};

export const virtualPowerPlantSimulation: Record<string, UseCase> = { en, fr };
