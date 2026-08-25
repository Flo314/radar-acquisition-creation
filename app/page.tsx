"use client";

import {useMemo,useState} from "react";
import {deepSyntheses} from "./deep-summaries";

type Level="Prioritaire"|"À tester"|"À surveiller"|"Inspiration";
type Item={
  id:number; topics:string[]; tag:string; kind:"Officiel"|"Média"|"Expert"|"Recherche"; level:Level;
  author?:string; platform?:string; date:string; title:string; summary:string; impact:string;
  source:string; url:string; read:string; echoes?:string[];
};
type Edition={id:string;label:string;period:string;headline:string;items:Item[]};

const categories=["Tout","E-commerce","Acquisition","IA & outils","Creative strategy","Formats publicitaires","Meta & Google","CRO","Design"];
const aiScope=[
  {name:"Modèles occidentaux",detail:"OpenAI · Anthropic / Claude · Gemini / DeepMind · Meta Llama · Mistral · xAI · Microsoft"},
  {name:"Écosystème chinois",detail:"DeepSeek · Alibaba Qwen · Kimi · MiniMax · Baidu ERNIE · Zhipu GLM · Doubao · Tencent Hunyuan"},
  {name:"Vidéo, image & audio",detail:"Sora · Veo / Flow · Runway · Kling · Seedance · Hailuo · Pika · Luma · Firefly · Midjourney · FLUX · ElevenLabs"},
  {name:"Agents & usages",detail:"Agents autonomes · API · automatisation · recherche · commerce agentique · création · code · productivité"},
  {name:"Évolutions produit",detail:"Nouveaux modèles · fonctionnalités · accès France / Europe · prix · limites · intégrations · benchmarks"},
  {name:"Confiance & règles",detail:"Données · copyright · licences · provenance · watermarking · sécurité · régulation européenne"}
];

const editions:Edition[]=[{
  id:"2026-08-24", label:"24 août 2026", period:"17–23 août",
  headline:"ChatGPT Ads arrive en France, tandis que Meta, Google, Amazon et Shopify déplacent rapidement les règles du jeu.",
  items:[
    {
      id:12,topics:["Acquisition","IA & outils","E-commerce","Formats publicitaires"],tag:"CHATGPT ADS",kind:"Officiel",level:"Prioritaire",date:"18 août 2026",
      title:"ChatGPT Ads arrive en France le 24 août parmi 31 nouveaux marchés",
      summary:"OpenAI confirme l’expansion européenne : la France fait partie des 31 marchés activés. L’accès annonceur passe d’abord par l’équipe Ads Solutions, des agences et des partenaires technologiques ; le self-service doit suivre plus tard dans l’été.",
      impact:"C’est un nouveau canal d’acquisition à tester tôt. Préparer un petit budget exploratoire, le pixel, la Conversion API et un protocole de mesure incrémentale plutôt que de comparer uniquement le CPM à Meta ou Google.",
      source:"OpenAI · annonce Europe",url:"https://openai.com/index/chatgpt-ads-expands-across-europe/",read:"6 min",echoes:["François Weider","Trendos","Search Engine Land"]
    },
    {
      id:1,topics:["Meta & Google","Acquisition","E-commerce"],tag:"GOOGLE ADS",kind:"Officiel",level:"Prioritaire",date:"17 août 2026",
      title:"Le tCPA et le tROAS changent de comportement quand le budget limite la campagne",
      summary:"Google met à jour ses enchères : les campagnes limitées par le budget doivent se rapprocher plus régulièrement de la cible indiquée, y compris après une modification budgétaire.",
      impact:"Auditer les campagnes dont le CPA réel était meilleur que la cible. Elles peuvent consommer davantage de marge et revenir vers le tCPA ou le tROAS demandé.",
      source:"Google Ads Help",url:"https://support.google.com/google-ads/answer/17061251?hl=en",read:"3 min",echoes:["Common Thread Collective","communauté PPC"]
    },
    {
      id:2,topics:["Meta & Google","Acquisition","IA & outils","E-commerce"],tag:"GOOGLE ADS",kind:"Officiel",level:"Prioritaire",date:"20 août 2026",
      title:"AI Max permettra de tester budgets et objectifs de ROI sur plusieurs campagnes",
      summary:"À partir de septembre, Google annonce des tests A/B multi-campagnes sur les budgets et objectifs de ROI. Les tests AI Max pourront conserver les contrôles de marque et de localisation.",
      impact:"Préparer une vraie hypothèse business, un groupe témoin et une durée suffisante, plutôt que d’activer AI Max sans point de comparaison.",
      source:"Google Ads & Commerce",url:"https://blog.google/products/ads-commerce/ai-max-testing-planning-tools/",read:"4 min",echoes:["InboxSmith","praticiens Google Ads"]
    },
    {
      id:3,topics:["Meta & Google","IA & outils","Acquisition","E-commerce"],tag:"META AI",kind:"Officiel",level:"Prioritaire",date:"19 août 2026",
      title:"Meta AI devient un assistant de reporting pour les petites entreprises",
      summary:"La nouvelle application Mac peut relier Facebook, Instagram, les campagnes Meta et Google Workspace pour analyser les performances, formuler des recommandations et produire des synthèses.",
      impact:"Utile pour accélérer le diagnostic. Meta précise toutefois que la création et la publication des publicités restent dans Ads Manager ou Business Suite.",
      source:"Meta for Business",url:"https://www.facebook.com/business/news/meta-ai-for-small-businesses",read:"5 min",echoes:["Axios"]
    },
    {
      id:4,topics:["E-commerce","CRO","Design"],tag:"SHOPIFY",kind:"Officiel",level:"Prioritaire",date:"Échéance le 26 août",
      title:"Dernier contrôle avant l’arrêt des ScriptTags sur la page de statut de commande",
      summary:"Shopify arrête les ScriptTags sur cette page pour les boutiques non-Plus. Les personnalisations doivent passer par des applications, Checkout UI extensions ou web pixel extensions.",
      impact:"Auditer immédiatement le tracking, les enquêtes post-achat et scripts tiers. Une migration oubliée peut créer une perte de données silencieuse après la commande.",
      source:"Shopify Developers",url:"https://shopify.dev/docs/apps/build/online-store/blocking-script-tags",read:"4 min",echoes:["Common Thread Collective"]
    },
    {
      id:5,topics:["Creative strategy","Meta & Google","Formats publicitaires","Acquisition"],tag:"TEST CRÉATIF",kind:"Expert",level:"Prioritaire",author:"Étienne Garcia",platform:"LinkedIn",date:"20 août 2026",
      title:"Sur Meta, une micro-variation n’est pas forcément un nouveau test créatif",
      summary:"Étienne Garcia explique que des variantes trop proches peuvent être regroupées par Meta. Il recommande de tester concepts, promesses, cibles ou formats réellement distincts.",
      impact:"Revoir la matrice : angle et concept d’abord, hook et exécution ensuite. Il s’agit d’une analyse de praticien, pas d’une annonce officielle de Meta.",
      source:"Publication d’Étienne Garcia",url:"https://fr.linkedin.com/posts/etienne-garcia_comment-tester-ses-cr%C3%A9as-sur-meta-activity-7496121434361008128-39WC",read:"4 min"
    },
    {
      id:6,topics:["Creative strategy","IA & outils","Design"],tag:"IA · CRÉA",kind:"Expert",level:"À tester",author:"Nilsen Irmouli",platform:"LinkedIn",date:"18 août 2026",
      title:"Automatiser la production ne remplace pas le jugement du creative strategist",
      summary:"Après plus d’un an d’automatisation chez Kreads — recherche, briefs et variantes — Nilsen Irmouli observe un fort gain de productivité, mais aussi une convergence des idées produites par l’IA seule.",
      impact:"Utiliser l’IA pour collecter, synthétiser et décliner. Garder l’humain sur les angles neufs, la hiérarchisation et la décision de test.",
      source:"Publication de Nilsen Irmouli",url:"https://fr.linkedin.com/posts/nilsenirmouli_depuis-plus-dun-an-on-essaie-dautomatiser-activity-7495360848002203650-nEBs",read:"5 min"
    },
    {
      id:7,topics:["Formats publicitaires","Acquisition","Creative strategy","Design"],tag:"YOUTUBE SHORTS",kind:"Expert",level:"À tester",author:"Nilsen Irmouli",platform:"LinkedIn",date:"20 août 2026",
      title:"YouTube Shorts mérite un test d’acquisition distinct de Meta",
      summary:"Nilsen Irmouli défend Shorts comme canal encore sous-exploité par les marques DTC. Le principal frein serait moins l’achat média que la production de créations réellement natives.",
      impact:"Tester un lot conçu pour Shorts — rythme, son, voix et narration propres — au lieu de recycler automatiquement les Reels Meta.",
      source:"Publication de Nilsen Irmouli",url:"https://fr.linkedin.com/posts/nilsenirmouli_les-marques-dtc-qui-spend-sur-google-ads-activity-7496101711032360960-XyGq",read:"4 min"
    },
    {
      id:8,topics:["CRO","Design","E-commerce"],tag:"CRO · UX",kind:"Recherche",level:"Prioritaire",author:"Christian Holst",platform:"Baymard",date:"19 août 2026",
      title:"Baymard propose de chiffrer le manque à gagner créé par les frictions UX",
      summary:"Le calculateur d’opportunité relie trafic, taux de conversion ou revenu par visiteur aux problèmes observés sur le checkout, la navigation mobile et les pages produit.",
      impact:"Transformer le backlog CRO en revenu récupérable aide à arbitrer les priorités design. Les projections restent à valider par l’expérimentation.",
      source:"Baymard Institute",url:"https://baymard.com/blog/hidden-cost-bad-ux-revenue-calculator",read:"7 min"
    },
    {
      id:9,topics:["Creative strategy","IA & outils","Design","Formats publicitaires"],tag:"GOOGLE FLOW",kind:"Officiel",level:"Inspiration",date:"19 août 2026",
      title:"Trois campagnes montrent où l’IA créative aide — et où l’idée reste centrale",
      summary:"Google documente trois campagnes réalisées avec Flow par Susan Credle, Tiffany Rolfe et Jayanta Jenkins, surtout autour de la visualisation rapide d’univers narratifs ambitieux.",
      impact:"Bon terrain pour prototyper une direction ou une séquence avant production. À lire comme étude de cas promotionnelle, pas comme preuve indépendante de performance.",
      source:"Google Ads & Commerce",url:"https://blog.google/products/ads-commerce/the-small-brief/",read:"8 min"
    },
    {
      id:11,topics:["IA & outils","Creative strategy","Formats publicitaires","Design"],tag:"IA VIDÉO",kind:"Officiel",level:"À surveiller",date:"17 août 2026",
      title:"ByteDance et la MPA encadrent davantage les modèles vidéo et image",
      summary:"L’accord vise à renforcer la protection de la propriété intellectuelle autour de Seedance et Seedream, proposés notamment via CapCut et Dreamina.",
      impact:"La provenance des références, les droits et la traçabilité des assets deviennent des critères de production publicitaire à part entière.",
      source:"TikTok Newsroom",url:"https://newsroom.tiktok.com/mpa-and-bytedance-announce-global-agreement-to-protect-intellectual-property-on-ai-video-and-image-generation-models?lang=en",read:"4 min"
    },
    {
      id:13,topics:["Meta & Google","Acquisition","Formats publicitaires"],tag:"META · PLACEMENTS",kind:"Expert",level:"Prioritaire",author:"Jon Loomer",platform:"Blog",date:"20 août 2026",
      title:"Meta retire des contrôles de placement au niveau de l’ensemble de publicités",
      summary:"Jon Loomer documente la disparition des exclusions par placement, plateforme, appareil et système d’exploitation dans certains comptes. Meta pousse davantage la distribution automatisée.",
      impact:"Vérifier les comptes cette semaine. Les alternatives deviennent les value rules et certains contrôles de placement au niveau du compte.",
      source:"Jon Loomer",url:"https://www.jonloomer.com/meta-removing-placement-controls-ad-sets/",read:"5 min",echoes:["Common Thread Collective"]
    },
    {
      id:14,topics:["Meta & Google","Acquisition","IA & outils","Creative strategy","Formats publicitaires","Design"],tag:"PMAX · VIDÉO",kind:"Expert",level:"Prioritaire",author:"Common Thread Collective",platform:"Coach’s Corner",date:"19 août 2026",
      title:"PMax va générer automatiquement les ratios vidéo manquants",
      summary:"Google prévoit de recadrer ou générer des variantes 9:16 et 1:1 quand elles manquent dans Performance Max. Le réglage est annoncé activé par défaut, avec une option de retrait avant le 4 septembre.",
      impact:"Auditer les campagnes et fournir des versions natives. Une adaptation automatique peut préserver la diffusion mais détériorer cadrage, texte embarqué ou intégrité de marque.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/google-pmax-generative-ai-video-resize-september-2026-ecommerce",read:"5 min"
    },
    {
      id:15,topics:["Meta & Google","IA & outils","Creative strategy","Formats publicitaires","Design"],tag:"META · TEXTE IMAGE",kind:"Expert",level:"Prioritaire",author:"Common Thread Collective",platform:"Coach’s Corner",date:"18 août 2026",
      title:"Advantage+ Creative peut réécrire le texte intégré aux images",
      summary:"Meta peut générer jusqu’à huit variantes de titres embarqués tout en conservant le style visuel. Une promotion ou une formulation réglementée peut donc être altérée par défaut.",
      impact:"Configurer les mots restreints, vérifier le rapport créatif et désactiver la fonction campagne par campagne lorsque le wording doit rester exact.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/meta-advantage-plus-creative-image-text-rewriting-ecommerce-2026",read:"6 min"
    },
    {
      id:16,topics:["E-commerce","CRO","Design","Acquisition"],tag:"SHOPIFY · INTERNATIONAL",kind:"Expert",level:"Prioritaire",author:"Common Thread Collective",platform:"Coach’s Corner",date:"20 août 2026",
      title:"Managed Markets met fin au DDU et bascule vers le DDP",
      summary:"À partir du 24 août, les expéditions DDU sont converties en DDP là où il est disponible. Taxes et droits deviennent plus explicites au checkout, mais la structure de prix change.",
      impact:"Auditer codes HS, marges, prix et messages de livraison. Désactiver Managed Markets si le DDU reste une contrainte opérationnelle.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/shopify-managed-markets-ends-ddu-on-august-24-what-international-ecommerce-brands-must-do-now",read:"6 min"
    },
    {
      id:17,topics:["Meta & Google","Acquisition","Formats publicitaires","E-commerce"],tag:"YOUTUBE · MESURE",kind:"Expert",level:"À tester",author:"Common Thread Collective",platform:"Coach’s Corner",date:"18 août 2026",
      title:"Google modifie la mesure des recherches de marque générées par YouTube",
      summary:"La conversion “Branded Searches” devient un indicateur de reporting pour YouTube et Demand Gen, avec fenêtre par défaut de sept jours et mapping préalable de la marque.",
      impact:"L’utiliser comme signal de création de demande, pas comme conversion utilisée par les enchères. PMax n’est pas encore couvert.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/google-branded-searches-conversion-measurement-august-2026",read:"5 min"
    },
    {
      id:18,topics:["Meta & Google","Acquisition","E-commerce","IA & outils","CRO"],tag:"GOOGLE · CUSTOMER MATCH",kind:"Expert",level:"Prioritaire",author:"Common Thread Collective",platform:"Coach’s Corner",date:"18 août 2026",
      title:"Google étiquette automatiquement certaines listes clients et alimente Smart Bidding",
      summary:"Les listes fondées sur les conversions peuvent recevoir les labels client existant, nouveau ou autre, puis influencer les stratégies automatiques. La fonction touche notamment les comptes avec Enhanced Conversions et Customer Match.",
      impact:"Auditer les classifications : un client mal étiqueté peut fausser acquisition, rétention, lecture du taux de conversion et allocation des enchères.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/google-ads-customer-list-labeling-august-2026-ecommerce",read:"5 min",echoes:["signal d’abord repéré dans les comptes annonceurs"]
    },
    {
      id:19,topics:["Meta & Google","Acquisition","Formats publicitaires"],tag:"MESSENGER STORIES",kind:"Expert",level:"À surveiller",author:"Common Thread Collective",platform:"Coach’s Corner",date:"17 août 2026",
      title:"Meta retire le placement Messenger Stories le 27 août",
      summary:"Le placement disparaît et le budget sera redistribué vers d’autres inventaires lorsque les campagnes utilisent les placements automatiques.",
      impact:"Repérer les campagnes qui y dépensent encore et anticiper le déplacement du spend plutôt que de découvrir le changement dans le reporting.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/meta-messenger-stories-ad-placement-removed-august-2026",read:"4 min"
    },
    {
      id:20,topics:["E-commerce","Acquisition","CRO"],tag:"GROWTH MODEL",kind:"Expert",level:"Inspiration",author:"Common Thread Collective",platform:"Playbook",date:"18 août 2026",
      title:"CTC résume la croissance e-commerce autour de trois piliers opérationnels",
      summary:"Le modèle combine une source de vérité fiable, une définition partagée du succès et une exécution soutenue. L’intérêt est moins la nouveauté que la cohérence du système de pilotage.",
      impact:"Comparer l’organisation actuelle à ces trois piliers : mesure commune, objectif économique commun et cadence d’expérimentation réellement tenue.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/ecommerce-playbook/ecommerce-growth-the-3-pillar-framework-we-use",read:"9 min"
    },
    {
      id:21,topics:["E-commerce","CRO","Creative strategy","Acquisition","Design"],tag:"AGENCE · MODÈLE",kind:"Expert",level:"À surveiller",author:"Common Thread Collective",platform:"Playbook",date:"20 août 2026",
      title:"CTC lie désormais sa promesse de croissance aux résultats",
      summary:"L’agence présente un modèle avec benchmarks concurrents, tests de landing pages et créations en volume, réseau de créateurs et garantie conditionnelle sur les résultats.",
      impact:"À lire comme signal de marché : les agences pointues déplacent leur proposition de valeur du volume de livrables vers la responsabilité économique.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/ecommerce-playbook/ecommerce-growth-with-a-money-back-guarantee",read:"7 min"
    },
    {
      id:22,topics:["IA & outils","E-commerce","Creative strategy","CRO","Design"],tag:"SECOND BRAIN",kind:"Expert",level:"À tester",author:"Joanna Lambadjieva",platform:"LinkedIn",date:"Repéré le 20 août",
      title:"Un “second cerveau” IA centralise le contexte d’une marque e-commerce",
      summary:"Joanna Lambadjieva décrit trois couches : marque, produits et audience ; fichiers de travail ; puis usages pour PDP, listings Amazon, emails, briefs et analyse concurrentielle.",
      impact:"Construire une base de contexte partagée avant de multiplier les prompts. La qualité des sorties dépend davantage du corpus de marque que du modèle seul.",
      source:"Publication de Joanna Lambadjieva",url:"https://www.linkedin.com/posts/joannalambadjieva_i-built-an-ai-second-brain-for-my-ecommerce-activity-7492554103080902658-JPns",read:"5 min"
    },
    {
      id:23,topics:["E-commerce","Acquisition","Formats publicitaires","Creative strategy"],tag:"AMAZON ADS",kind:"Expert",level:"Prioritaire",author:"Common Thread Collective",platform:"Coach’s Corner",date:"17 août 2026",
      title:"Amazon a inscrit automatiquement les Sponsored Products dans des contenus d’influenceurs",
      summary:"Les campagnes actives peuvent apparaître dans des avis, guides et vidéos de créateurs, sur Amazon et hors plateforme, avec les enchères existantes et sans opt-in préalable.",
      impact:"Segmenter immédiatement le reporting depuis le 10 août et comparer ACOS, clics et commandes de ce placement avant de décider de le conserver.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/amazon-sponsored-products-influencer-placements-august-2026",read:"6 min"
    },
    {
      id:24,topics:["Meta & Google","E-commerce","Acquisition","Creative strategy","Formats publicitaires"],tag:"META · Q4",kind:"Expert",level:"Prioritaire",author:"Common Thread Collective",platform:"Coach’s Corner",date:"17 août 2026",
      title:"Le Holiday Insights Center de Meta fixe déjà le tempo créatif de Q4",
      summary:"Le nouveau hub rassemble données saisonnières, recommandations média et benchmarks créatifs. Meta recommande des campagnes Advantage+ avec contenu créateur prêtes à la mi-octobre.",
      impact:"Remonter le calendrier de briefs et de production. L’enjeu n’est pas seulement le budget Black Friday, mais la disponibilité de créations natives suffisamment tôt.",
      source:"Common Thread Collective",url:"https://commonthreadco.com/blogs/coachs-corner/meta-holiday-insights-center-2026-q4-ecommerce",read:"7 min"
    },
    {
      id:25,topics:["Meta & Google","E-commerce","CRO","Design"],tag:"MERCHANT CENTER",kind:"Expert",level:"À surveiller",author:"Common Thread Collective",platform:"Tracker Google",date:"21 août 2026",
      title:"Google prépare un minimum de 500 × 500 px pour les images produit",
      summary:"Le suivi hebdomadaire CTC signale qu’à partir du 31 janvier 2027, les images sous 500 × 500 px pourront être refusées dans Shopping et les fiches gratuites ; 1 500 × 1 500 est recommandé.",
      impact:"Lancer un audit du flux image, prioriser les produits à fort revenu et garantir la cohérence entre annonce, listing et page produit.",
      source:"CTC · Google Ads changes 2026",url:"https://commonthreadco.com/blogs/coachs-corner/google-ads-changes-2026",read:"4 min"
    },
    {
      id:26,topics:["Acquisition","Creative strategy","Formats publicitaires","Meta & Google"],tag:"LEAD GEN · CRÉA",kind:"Expert",level:"À tester",author:"Nilsen Irmouli",platform:"LinkedIn",date:"19 août 2026",
      title:"Une seule création lead-gen a absorbé 108 k€ de spend Meta",
      summary:"Nilsen Irmouli transpose au lead generation des méthodes DTC fondées sur les niveaux de conscience et montre qu’une idée forte peut rester performante bien au-delà du cycle de renouvellement habituel.",
      impact:"Tester des angles structurés par maturité du prospect plutôt que de produire mécaniquement de nouvelles variantes chaque semaine.",
      source:"Publication de Nilsen Irmouli",url:"https://fr.linkedin.com/posts/nilsenirmouli_108-000-de-spend-meta-ads-sur-une-seule-activity-7495739290325245953-LkI_",read:"5 min"
    },
    {
      id:27,topics:["CRO","Design"],tag:"USER RESEARCH",kind:"Recherche",level:"Inspiration",author:"Emma Boulton",platform:"Repéré via Smashing",date:"Remis en avant le 17 août",
      title:"Les huit piliers de la recherche utilisateur reviennent dans le radar design",
      summary:"Le modèle couvre environnement, scope, recrutement, gouvernance, outils, données, personnes et organisation. C’est une ressource plus ancienne, mais remise en avant cette semaine par un média de référence.",
      impact:"S’en servir comme checklist avant un programme CRO : mieux recruter, centraliser les apprentissages et éviter que chaque test reparte de zéro.",
      source:"ResearchOps Community",url:"https://medium.com/researchops-community/the-eight-pillars-of-user-research-1bcd2820d75a",read:"10 min",echoes:["Smashing Magazine"]
    },
    {
      id:28,topics:["E-commerce","Acquisition","Formats publicitaires"],tag:"RETAIL MEDIA",kind:"Média",level:"À surveiller",date:"21 août 2026",
      title:"Le retail media mondial devrait dépasser 200 Md$ en 2026",
      summary:"WARC Media prévoit 200,4 Md$ de dépenses cette année et 223,4 Md$ en 2027, avec une avance de croissance américaine sur l’Europe.",
      impact:"Le retail media devient un poste structurel du mix acquisition. Cartographier Amazon, marketplaces et réseaux marchands pertinents avant d’ajouter un canal.",
      source:"invidis · données WARC",url:"https://invidis.com/news/2026/08/retail-global-retail-media-ad-market-forecast-to-top-200b-in-2026/",read:"4 min"
    },
    {
      id:29,topics:["IA & outils","E-commerce","Creative strategy","Formats publicitaires","Design","Acquisition"],tag:"OUTIL IA · ADS",kind:"Média",level:"À tester",date:"20 août 2026",
      title:"Sell the Trend transforme des images produit en campagnes multiformats",
      summary:"Le nouvel AI Ads Blueprint analyse des formats publicitaires performants puis génère à partir d’images produit une campagne avec déclinaisons et textes associés.",
      impact:"À tester comme accélérateur de prototypage, avec contrôle humain strict sur l’angle, les claims, le rendu produit et l’adaptation native à chaque plateforme.",
      source:"MarTech",url:"https://martech.org/the-latest-ai-powered-martech-news-and-releases/",read:"5 min"
    },
    {
      id:30,topics:["IA & outils","Creative strategy","Design"],tag:"DESIGN · IA",kind:"Expert",level:"Inspiration",author:"Jessica Walsh",platform:"Adobe Design",date:"21 août 2026",
      title:"Face à l’IA, Jessica Walsh défend le goût, l’imperfection et le point de vue",
      summary:"Elle oppose les sorties techniquement compétentes mais génériques à un travail humain reconnaissable par ses choix, ses références et sa capacité à reformuler le vrai problème.",
      impact:"Dans les workflows créatifs assistés par IA, réserver la machine à l’exploration et la production ; protéger le goût, l’idée et la direction artistique comme avantage distinctif.",
      source:"Adobe Design",url:"https://adobe.design/ideas/is-design-dead-in-the-age-of-ai",read:"8 min",echoes:["Smashing Magazine"]
    },
    {
      id:31,topics:["E-commerce","CRO","Design","Acquisition"],tag:"SHOPIFY · CRO",kind:"Expert",level:"À tester",author:"Magebit",platform:"LinkedIn · Instagram",date:"20 août 2026",
      title:"Après 1 000 audits Shopify, les mêmes petites fuites de conversion reviennent",
      summary:"Magebit remet l’accent sur les frictions diffuses du parcours : clarté de la proposition, confiance, expérience mobile, page produit et continuité jusqu’au checkout.",
      impact:"Faire un audit court par étape du funnel avant d’augmenter le trafic. Corriger une fuite mesurable à la fois, puis vérifier son effet sur ajout au panier et achat.",
      source:"Publication de Magebit",url:"https://www.linkedin.com/posts/magebit_weve-audited-1000-shopify-stores-and-activity-7496144319217623040-qx0g",read:"4 min",echoes:["Instagram","Facebook"]
    },
    {
      id:32,topics:["IA & outils","Creative strategy","Design"],tag:"CLAUDE · PROVENANCE",kind:"Officiel",level:"Prioritaire",date:"17 août 2026 · sujet émergent UE",
      title:"Claude prépare des watermarks invisibles dans le texte et une provenance C2PA dans les fichiers",
      summary:"Anthropic prévoit un marquage lisible par machine pour les nouveaux modèles lancés dans l’Union européenne depuis le 2 août. Les textes embarqueront un watermark et les fichiers compatibles une provenance numérique signée.",
      impact:"Pour les contenus de marque, conserver les fichiers sources et documenter les retouches. Un passage par Claude pourra laisser une trace de provenance même après copier-coller ou modification légère.",
      source:"Anthropic Help Center",url:"https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content",read:"6 min",echoes:["The Guardian","The Verge"]
    },
    {
      id:33,topics:["IA & outils"],tag:"CLAUDE · API",kind:"Officiel",level:"À tester",date:"18 août 2026",
      title:"Anthropic transforme Workbench en Playground dans la console Claude",
      summary:"Le nouvel espace prend en charge tous les paramètres de la Messages API, propose des modèles pour l’exécution de code et la recherche web, puis affiche la requête SDK et la réponse complète.",
      impact:"Un environnement plus simple pour prototyper et comparer des workflows Claude avant de les intégrer à un outil, un agent ou une automatisation métier.",
      source:"Claude Platform · release notes",url:"https://platform.claude.com/docs/en/release-notes/overview",read:"4 min"
    },
    {
      id:34,topics:["IA & outils","Creative strategy","Design"],tag:"QWEN · CHINE",kind:"Officiel",level:"Prioritaire",date:"17 août 2026",
      title:"Alibaba ouvre Qwen3.8-27B et les poids de son modèle Qwen3.8 flagship",
      summary:"Qwen3.8-27B est un modèle multimodal Apache 2.0 capable de comprendre images et vidéos, avec 262 000 tokens de contexte extensibles à un million. Alibaba publie aussi les poids du modèle Qwen3.8 de 2,4 billions de paramètres.",
      impact:"Le coût, l’ouverture et le fonctionnement local rendent les modèles chinois difficiles à ignorer. À comparer sur recherche, génération de briefs, analyse d’assets et confidentialité des données.",
      source:"Alibaba Cloud",url:"https://www.alibabacloud.com/blog/alibaba-unveils-qwen3-8-27b-and-releases-weights-of-qwen3-8-flagship-model_603463",read:"7 min",echoes:["Hugging Face","Arena AI"]
    },
    {
      id:35,topics:["IA & outils","Creative strategy","Formats publicitaires","Design"],tag:"RUNWAY · VIDÉO IA",kind:"Officiel",level:"À surveiller",date:"20 août 2026",
      title:"Runway estime que la valeur se déplace du meilleur modèle vers le meilleur workflow",
      summary:"Après plusieurs centaines d’échanges clients, Runway observe une convergence des modèles vidéo. L’entreprise met désormais l’accent sur l’orchestration, l’édition, les données de marque, les droits et l’exécution créative de bout en bout.",
      impact:"Évaluer un outil vidéo IA sur tout le processus — brief, cohérence, retouche, collaboration, propriété des assets et coût final — plutôt que sur une seule génération spectaculaire.",
      source:"Runway",url:"https://runwayml.com/news/company-news/the-next-phase-of-enterprise-video-generation",read:"8 min"
    }
  ]
}];

function kindClass(kind:Item["kind"]){return kind.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}

export default function Home(){
  const[current,setCurrent]=useState(editions[0].id);
  const[active,setActive]=useState("Tout");
  const[query,setQuery]=useState("");
  const[view,setView]=useState<"essential"|"all">("essential");
  const edition=editions.find(e=>e.id===current)!;
  const counts=useMemo(()=>Object.fromEntries(categories.map(c=>[c,c==="Tout"?edition.items.length:edition.items.filter(i=>i.topics.includes(c)).length])),[edition]);
  const filtered=useMemo(()=>edition.items.filter(i=>{
    const deep=deepSyntheses[i.id];
    const searchable=[i.title,i.summary,deep?.synthesis,...(deep?.points??[]),i.impact,i.source,i.author??""].join(" ").toLowerCase();
    return (view==="all"||i.level==="Prioritaire")&&(active==="Tout"||i.topics.includes(active))&&searchable.includes(query.toLowerCase());
  }),[edition,active,query,view]);
  const sourceCount=new Set(edition.items.map(i=>i.source)).size;
  const pros=new Set(edition.items.flatMap(i=>[i.author,...(i.echoes??[])].filter(Boolean))).size;
  return <main>
    <header className="topbar"><a className="brand" href="#top"><span className="brandmark">R</span><span>RADAR</span></a><div className="top-actions"><span className="status"><i/> Automatisation active</span><span className="last-update">Nouvelle édition · chaque lundi à 8 h</span></div></header>
    <div className="shell" id="top">
      <div className="verified">CYCLE HEBDOMADAIRE ACTIF · COLLECTE DU LUNDI AU DIMANCHE · PUBLICATION ET ALERTE LE LUNDI À 8 H</div>
      <section className="intro"><div><p className="eyebrow">ÉDITION DU {edition.label.toUpperCase()}</p><h1>Bonjour Florent.</h1><p className="lede">Votre veille minutieuse : plateformes, médias et professionnels du secteur.</p></div><div className="edition-picker"><label htmlFor="edition">CONSULTER UNE ÉDITION</label><select id="edition" value={current} onChange={e=>{setCurrent(e.target.value);setActive("Tout")}}>{editions.map(e=><option value={e.id} key={e.id}>Lundi {e.label}</option>)}</select></div></section>
      <section className="brief"><div className="brief-index">01</div><div><p className="eyebrow light">À RETENIR · SEMAINE DU {edition.period}</p><h2>{edition.headline}</h2><p>Chaque fiche contient désormais une synthèse autonome de la source complète : faits, modalités, chiffres, limites et décision utile. Le lien original reste disponible pour vérifier ou approfondir.</p></div><div className="brief-stat"><strong>{edition.items.length}</strong><span>synthèses<br/>complètes</span></div></section>
      <section className="coverage" aria-label="Couverture de la veille"><div><strong>{sourceCount}</strong><span>sources directes</span></div><div><strong>{pros}</strong><span>professionnels & relais</span></div><div><strong>8/8</strong><span>rubriques à 10+</span></div><div><strong>4</strong><span>niveaux de priorité</span></div></section>
      <section className="source-legend" aria-label="Nature des sources"><span><i className="official"/> Annonce officielle</span><span><i className="research"/> Recherche</span><span><i className="media"/> Média spécialisé</span><span><i className="expert"/> Publication d’expert</span></section>
      <section className="view-switch" aria-label="Niveau de lecture"><div><button className={view==="essential"?"active":""} onClick={()=>setView("essential")}><strong>Les essentiels</strong><span>{edition.items.filter(i=>i.level==="Prioritaire").length} décisions à prendre</span></button><button className={view==="all"?"active":""} onClick={()=>setView("all")}><strong>Couverture complète</strong><span>{edition.items.length} signaux vérifiés</span></button></div><p>{view==="essential"?"Les informations prioritaires, entièrement comprises depuis la page.":"Toutes les annonces, analyses et signaux faibles, avec leur synthèse complète."}</p></section>
      <section className="controls"><div className="tabs">{categories.map(c=><button key={c} className={active===c?"active":""} onClick={()=>setActive(c)}>{c}<b>{counts[c]}</b></button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher" aria-label="Rechercher"/></label></section>
      <section className="section-head"><div><p className="eyebrow">{view==="essential"?"SÉLECTION PRIORITAIRE":"VEILLE EXHAUSTIVE"}</p><h2>{active==="Tout"?"Les signaux à suivre":active}</h2></div><span>{filtered.length} PUBLICATIONS AFFICHÉES</span></section>
      <section className={view==="all"?"grid compact":"grid"}>{filtered.map(i=>{
        const deep=deepSyntheses[i.id];
        return <article className={`card level-${i.level.toLowerCase().replaceAll(" ","-").normalize("NFD").replace(/[\u0300-\u036f]/g,"")}`} key={i.id}>
          <div className="card-top"><span className="tag">{i.tag}</span><div><span className={`source-type ${kindClass(i.kind)}`}>{i.kind}</span><span className="level">{i.level}</span></div></div>
          <p className="date">{i.date}</p>{i.author&&<p className="author">{i.author} · {i.platform}</p>}
          <h3><a href={i.url} target="_blank" rel="noreferrer">{i.title}</a></h3>
          <div className="synthesis"><span className="synthesis-label">SYNTHÈSE COMPLÈTE · 1 MIN</span><p>{deep?.synthesis??i.summary}</p>{deep?.points&&<ul>{deep.points.map(point=><li key={point}>{point}</li>)}</ul>}{deep?.caveat&&<p className="caveat"><strong>À NUANCER</strong>{deep.caveat}</p>}</div>
          <div className="impact"><span>CE QUE ÇA CHANGE</span><p>{i.impact}</p></div>
          {i.echoes&&<p className="echoes"><span>RELAYÉ / COMMENTÉ</span>{i.echoes.join(" · ")}</p>}
          <div className="topics">{i.topics.map(t=><button key={t} onClick={()=>{setActive(t);window.scrollTo({top:620,behavior:"smooth"})}}>{t}</button>)}</div>
          <div className="meta"><a href={i.url} target="_blank" rel="noreferrer">Article original · {i.source} ↗</a><span>Lecture source · {i.read}</span></div>
        </article>
      })}{filtered.length===0&&<div className="empty">Aucun signal ne correspond à cette recherche dans ce niveau de lecture.</div>}</section>
      <section className="ai-universe"><div className="ai-title"><p className="eyebrow">COUVERTURE IA ÉLARGIE</p><h2>L’IA dans toute sa largeur</h2><p>Le radar ne se limite pas aux outils marketing. Une annonce majeure reste suivie même si son application e-commerce n’est pas encore immédiate.</p></div><div className="ai-scope">{aiScope.map(f=><article key={f.name}><strong>{f.name}</strong><span>{f.detail}</span></article>)}</div></section>
      <section className="watchlist"><div><p className="eyebrow">PÉRIMÈTRE DE COLLECTE</p><h2>Ce que le radar inspecte</h2></div><div className="watch-grid"><p><strong>Plateformes business</strong><span>Meta, Google, Shopify, Amazon, TikTok et leurs documentations, blogs et changelogs.</span></p><p><strong>Laboratoires IA</strong><span>OpenAI, Anthropic, Google DeepMind, Mistral et principaux acteurs chinois, avec leurs blogs, documentations, release notes et dépôts officiels.</span></p><p><strong>Professionnels</strong><span>Étienne Garcia, Nilsen Irmouli, Common Thread Collective, Jon Loomer et autres experts retenus au fil des éditions.</span></p><p><strong>Canaux publics</strong><span>Web, newsletters, YouTube, LinkedIn, Instagram et publications sociales accessibles publiquement.</span></p><p><strong>Recherche internationale</strong><span>Balayage en français et en anglais, complété par les sources internationales accessibles quand l’annonce naît en Chine ou sur un autre marché.</span></p><p><strong>Contrôle</strong><span>Recherche croisée, dédoublonnage, source primaire privilégiée et signalement clair des analyses, rumeurs ou informations non officielles.</span></p></div></section>
      <section className="method"><div><p className="eyebrow">MÉTHODE</p><h2>Une veille en cinq passes</h2></div><div className="method-grid"><p><strong>1 · Scanner</strong><span>Sources officielles, médias, experts et réseaux publics.</span></p><p><strong>2 · Lire</strong><span>Article, post, carrousel ou transcription complète quand elle est accessible.</span></p><p><strong>3 · Recouper</strong><span>Date, source primaire, reprises et niveau de certitude.</span></p><p><strong>4 · Synthétiser</strong><span>Faits, modalités, chiffres, limites et conséquences utiles.</span></p><p><strong>5 · Prioriser</strong><span>Impact, urgence, action possible et pertinence pour vos sujets.</span></p></div><small>Chaque cycle couvre le lundi à 00 h 00 jusqu’au dimanche à 23 h 59, heure de Paris. Le Radar distingue ce que la source confirme de ce qu’un expert interprète. Lorsqu’une partie d’un contenu social n’est pas publiquement accessible, elle n’est pas inventée et la limite est indiquée dans la fiche.</small></section>
      <section className="archive"><div><p className="eyebrow">ARCHIVES</p><h2>Retrouver les éditions</h2></div><div className="archive-list">{editions.map(e=><button key={e.id} onClick={()=>{setCurrent(e.id);window.scrollTo({top:0,behavior:"smooth"})}}><span>LUNDI</span><strong>{e.label}</strong><em>{e.items.length} signaux</em><b>→</b></button>)}</div></section>
      <footer><div className="brand small"><span className="brandmark">R</span><span>RADAR</span></div><p>Une veille hebdomadaire pensée pour décider, pas seulement s’informer.</p><a href="#top">RETOUR EN HAUT ↑</a></footer>
    </div>
  </main>
}
