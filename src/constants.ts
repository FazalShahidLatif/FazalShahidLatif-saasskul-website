/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  url?: string;
  metaTitle?: string;
  metaDescription?: string;
  longDescription?: string;
  features?: string[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  url?: string;
}

export const LEGAL_CONTENT = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "May 06, 2026",
    content: `Welcome to SaaSSkul. By using our services, you agree to these terms.
    1. Acceptance: By accessing our digital products or studio services, you agree to be bound by these Terms and all applicable laws and regulations.
    2. License: We grant you a limited, non-exclusive license to use our AI Lead Gen tools. You may not reverse engineer the neural logic.
    3. User Conduct: You agree not to use our systems for any harmful or illegal activity, including spamming or unauthorized data mining.
    4. Intellectual Property: The SaaSSkul brand, neural engine, and editorial aesthetic are protected by international copyright laws.`
  },
  privacy: {
    title: "Privacy & GDPR",
    lastUpdated: "May 06, 2026",
    content: `Your data integrity is our priority. In accordance with GDPR (2026 standards):
    1. Tracking: We use only necessary cookies for authentication and performance.
    2. Data Ownership: You own your lead data. We act as a processor for your captured leads.
    3. Portability: You can export your data at any time via the Studio interface.
    4. Deletion: We honor 'Right to be Forgotten' requests. Contact support@saasskul.com for data erasure.`
  },
  cookies: {
    title: "Cookies Policy",
    lastUpdated: "May 06, 2026",
    content: `SaaSSkul uses minimal cookies to enhance your creative workflow.
    1. Functional: Required for logging into the Studio Workspace.
    2. Analytics: Anonymous telemetry to improve neural processing speed.
    3. Preferences: Storing your selected editorial mode (Atmospheric vs Technical).
    We do not sell your behavior to third-party advertisers.`
  }
};

export const STORE_APPS = [
  {
    id: "lead-engine",
    title: "AI Lead Engine",
    description: "Flagship autonomous lead qualification system for B2B. Captured, qualified, and synchronized.",
    type: "App",
    tags: ["AI", "Sales", "Automation"],
    ctaLabel: "Launch Engine",
    ctaHref: "/ai-lead-engine",
    isExternal: false,
    status: "live"
  },
  {
    id: "calcoo",
    title: "Calcoo.online",
    description: "Multi-module quantification hub for finance, tax, and SaaS metrics. Atomic accuracy.",
    type: "App",
    tags: ["Finance", "SaaS", "Calculators"],
    ctaLabel: "Open Calcoo (Free)",
    ctaHref: "https://calcoo.online",
    isExternal: true,
    status: "live"
  },
  {
    id: "crm-bridge",
    title: "SaaSSkul CRM Bridge",
    description: "Deep-layer synchronization between disparate sales stacks. Automated mapping & lead routing.",
    type: "Integration",
    tags: ["CRM", "Hubspot", "Salesforce"],
    ctaLabel: "Configure Sync",
    ctaHref: "#",
    isExternal: true,
    status: "live"
  },
  {
    id: "api-connector",
    title: "Universal API Connector",
    description: "No-code gateway for custom third-party integrations and webhooks. Atomic data flow.",
    type: "Automation",
    tags: ["API", "Webhooks", "DevOps"],
    ctaLabel: "Connect API",
    ctaHref: "#",
    isExternal: true,
    status: "coming_soon"
  },
  {
    id: "analytics-pulse",
    title: "Analytics Pulse Dashboard",
    description: "High-fidelity real-time visualization for SaaS growth metrics and conversion funnels.",
    type: "Tool",
    tags: ["Analytics", "Data", "SaaS"],
    ctaLabel: "View Dashboards",
    ctaHref: "#",
    isExternal: true,
    status: "live"
  },
  {
    id: "neural-solutions",
    title: "Neural AI Solutions",
    description: "Custom Large Language Model implementations and agentic workflows for enterprise tasks.",
    type: "AI Engine",
    tags: ["AI", "LLM", "Agents"],
    ctaLabel: "Explore Solutions",
    ctaHref: "#",
    isExternal: true,
    status: "live"
  },
  {
    id: "web-gen",
    title: "SaaSSkul Web Generator",
    description: "Blueprint-to-deployment website generator for rapid landing page testing.",
    type: "App",
    tags: ["DevTools", "AI", "Deployment"],
    ctaLabel: "Get Access",
    ctaHref: "#",
    isExternal: true,
    status: "coming_soon"
  }
];

export const STORE_TEMPLATES = [
  {
    id: "notion-pinterest",
    title: "Notion Pinterest Manager",
    description: "The ultimate content planning and analytics board for Pinterest marketers.",
    type: "Template",
    tags: ["Notion", "Marketing", "Pinterest"],
    ctaLabel: "Buy on Gumroad",
    ctaHref: "https://gumroad.com",
    isExternal: true,
    status: "live"
  },
  {
    id: "avatar-prompts",
    title: "AI Avatar Prompt Pack",
    description: "Battle-tested presets for high-fidelity professional headshots and stylistic characters.",
    type: "Prompts",
    tags: ["AI", "ImageGen", "Midjourney"],
    ctaLabel: "Download Pack",
    ctaHref: "https://gumroad.com",
    isExternal: true,
    status: "live"
  },
  {
    id: "video-workflows",
    title: "AI Video Production Workflows",
    description: "Structured logic for Runway, Luma, and Kling AI video generation.",
    type: "Workflow",
    tags: ["AI", "Video", "Production"],
    ctaLabel: "Get Framework",
    ctaHref: "https://gumroad.com",
    isExternal: true,
    status: "live"
  }
];

export const LANGUAGES = [
  { code: "en", label: "EN", dir: "ltr" },
  { code: "ur", label: "UR", dir: "rtl" }
];

export const FAQS = {
  home: [
    { question: "What is SaaSSkul and how does the SaaSSkul app ecosystem work?", answer: "SaaSSkul is a digital products studio and store. The SaaSSkul app ecosystem consists of specialized tools like AI Lead Engine and Calcoo, designed to automate growth and quantification for modern founders." },
    { question: "Is SaaSSkul Karachi based but serving international clients?", answer: "Yes, SaaSSkul Karachi is our central hub. While we are proud of our roots in Pakistan, we operate as a global studio, serving clients and users across North America, Europe, and Asia." },
    { question: "What kind of SaaSSkul templates and AI prompts are available?", answer: "Our store features high-fidelity Notion templates for Pinterest and content management, as well as battle-tested AI prompt packs for image and video generation." }
  ],
  store: [
    { question: "How do I buy SaaSSkul templates and apps?", answer: "Most our assets are available via Gumroad. Simply click the purchase button on the SaaSSkul app or template you want, and you'll be directed to a secure checkout." },
    { question: "Can I use SaaSSkul apps if I'm outside Pakistan?", answer: "Absolutely. SaaSSkul products are digital and globally accessible. Whether you're in Karachi or New York, the tools work identically." }
  ],
  services: [
    { question: "Does SaaSSkul Karachi offer custom implementations?", answer: "Yes, SaaSSkul Karachi provides strategic consulting and custom implementation for our proprietary tools, as well as bespoke SEO and automation funnel builds." },
    { question: "How long does a typical SaaSSkul studio project take?", answer: "Timelines vary, but most strategic implementation cycles for SaaSSkul apps and solutions range from 2 to 6 weeks." }
  ],
  pricing: [
    { question: "Are there subscription models for SaaSSkul apps?", answer: "Yes, certain flagship tools like the AI Lead Engine offer tier-based subscriptions, while templates are typically one-time purchases." },
    { question: "Does SaaSSkul offer localized pricing for Pakistan?", answer: "We strive to maintain accessible pricing. While our primary rates are in USD for global consistency, we occasionally offer regional packages for the Pakistan market." }
  ]
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How AI Lead Generation is Transforming Small Businesses in 2026",
    excerpt: "Insights from the MentorArena cohorts on autonomous lead qualification and scaling impact.",
    date: "Feb 12, 2026",
    category: "Insights"
  },
  {
    id: "2",
    title: "Building the Perfect Marketing Automation Stack for Your SaaS",
    excerpt: "A deep dive into our proprietary funnel logic used for global SaaS clients and studio projects.",
    date: "Mar 05, 2026",
    category: "Automation"
  },
  {
    id: "3",
    title: "Case Study: Calcoo's Atomic Accuracy Engine",
    excerpt: "How we built a directory of 100+ quantification modules using advanced neural logic.",
    date: "Apr 20, 2026",
    category: "Product"
  }
];

export const SERVICES: Service[] = [
  {
    id: "leadgen",
    title: "AI Lead Engine",
    description: "Our flagship done-for-you lead system. Capture, qualify, and book appointments on autopilot.",
    icon: "Zap",
    url: "/ai-lead-engine",
    metaTitle: "AI Lead Engine — Autonomous B2B Lead Generation | SaaSSkul Karachi",
    metaDescription: "Qualify B2B leads at scale with the SaaSSkul AI Lead Engine. Proprietary neural logic for automated sales discovery and appointment booking.",
    longDescription: "The AI Lead Engine is a specialized autonomous intelligence layer for B2B lead capture. Built by SaaSSkul Karachi, it filters low-intent traffic and populates your CRM with verified sales opportunities.",
    features: ["Neural Intent Scoring", "Automated Qualification", "CRM Identity Sync", "Calendly Native Loops"]
  },
  {
    id: "crm-sync",
    title: "CRM & Sales Stack Integration",
    description: "Deep-layer synchronization for B2B enterprises. Hubspot, Salesforce, and Pipedrive automation.",
    icon: "Share2",
    metaTitle: "CRM Integration & Sales Stack Automation | SaaSSkul Karachi",
    metaDescription: "Sync your sales stack with SaaSSkul CRM Bridge. We integrate Hubspot, Salesforce, and custom CRMs with automated lead routing logic.",
    longDescription: "Our CRM sync services bridge the gap between your marketing intake and sales execution. We build custom middleware that ensures zero lead drop-off and consistent data mapping across your entire organization.",
    features: ["Bi-directional Sync", "Custom Field Mapping", "Lead Routing Logic", "Duplicate Prevention"]
  },
  {
    id: "api-integration",
    title: "API & Middleware Solutions",
    description: "Custom API development and third-party integrations for high-growth SaaS and startups.",
    icon: "LinkIcon",
    metaTitle: "API Development & SaaS Middleware Solutions | SaaSSkul Karachi",
    metaDescription: "Connect any app with SaaSSkul API solutions. Custom middleware, webhook handlers, and third-party API orchestrations for Karachi and global startups.",
    longDescription: "We specialize in building robust API connectors and middleware that allow disparate systems to communicate. From simple webhooks to complex GraphQL orchestrations, we ensure atomic data flow.",
    features: ["Custom API Builds", "Webhook Architecture", "Secure Data Bridges", "Legacy System Wrappers"]
  },
  {
    id: "analytics-dash",
    title: "High-Fidelity Analytics Dashboards",
    description: "Real-time SaaS metrics and conversion visualization. Data-driven growth for founders.",
    icon: "Activity",
    metaTitle: "SaaS Analytics & Performance Dashboards | SaaSSkul Karachi",
    metaDescription: "Visualize your growth with SaaSSkul Analytics Dashboards. High-fidelity tracking for conversion funnels, churn, and LTV metrics.",
    longDescription: "Stop flying blind. Our analytics solutions provide a clear window into your business performance. We build custom dashboards that pull from your real-time data sources to give you actionable insights.",
    features: ["Real-time Tracking", "Multi-source Aggregation", "Churn & LTV Models", "Executive Reporting"]
  },
  {
    id: "ai-neural",
    title: "Neural AI & Agentic Workflows",
    description: "LLM implementations, custom GPT agents, and autonomous workflow architecture.",
    icon: "Cpu",
    metaTitle: "Custom AI Solutions & Agentic Workflows | SaaSSkul Karachi",
    metaDescription: "Leverage Large Language Models with SaaSSkul AI Solutions. Custom agentic workflows and neural implementations to automate complex business tasks.",
    longDescription: "We don't just use AI; we build intelligence into your business. Our neural solutions involve custom fine-tuning, RAG (Retrieval-Augmented Generation), and autonomous agent frameworks for complex tasks.",
    features: ["Custom LLM Tuning", "Agentic Flow Design", "RAG Implementations", "Neural Task Automation"]
  },
  {
    id: "seo",
    title: "SEO & Content Systems",
    description: "Neural-driven organic growth. We optimize for high-intent search volume and conversion.",
    icon: "Search",
    metaTitle: "SaaS SEO & Content Marketing Systems | SaaSSkul Karachi",
    metaDescription: "Dominate search rankings with SaaSSkul's neural-driven SEO systems. We focus on high-intent long-tail keywords and conversion architecture for SaaS founders.",
    features: ["Keyword Blueprinting", "Semantic Content Mesh", "Technical Audits", "Backlink Strategy"]
  },
  {
    id: "mentorship",
    title: "MentorArena Cohorts",
    description: "Direct mentorship and education for students and aspiring digital entrepreneurs.",
    icon: "Users",
    metaTitle: "MentorArena — Digital Entrepreneurship Mentorship | SaaSSkul Karachi",
    metaDescription: "Join MentorArena by SaaSSkul Karachi. Cohort-based learning for building SaaS tools, automating growth, and mastering digital commerce.",
    features: ["Live Build Cycles", "Strategic Logic", "Commerce Training", "Network Access"]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "calcoo",
    name: "Calcoo Online",
    price: "Free",
    description: "SaaSSkul's flagship quantification hub for finance, tax, and SaaS metrics.",
    category: "Software",
    url: "https://calcoo.online"
  },
  {
    id: "gumroad-pack",
    name: "Automation Template Kit",
    price: "$129",
    description: "Plug-and-play funnel templates and workflow packs on Gumroad.",
    category: "Marketplace",
    url: "https://gumroad.com"
  },
  {
    id: "uk-course",
    name: "UK Ltd Company Course",
    price: "$499",
    description: "Complete guide to UK tax logic and compliance for expats and founders.",
    category: "Education"
  }
];

export const ECOSYSTEM = [
  {
    name: "Calcoo.online",
    role: "Quantification Hub",
    description: "100+ atomic accuracy modules for finance, tax, and SaaS.",
    link: "https://calcoo.online"
  },
  {
    name: "MentorArena",
    role: "Education Brand",
    description: "Cohort-based mentorship for the next gen of SaaS founders.",
    link: "#"
  },
  {
    name: "Studio Marketplace",
    role: "Gumroad Assets",
    description: "Premium automations and launch-ready business templates.",
    link: "https://gumroad.com"
  }
];
