/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Terminal, 
  Target, 
  Search, 
  Send, 
  RotateCcw, 
  Copy, 
  Check, 
  Layout, 
  Sidebar,
  Type,
  Code,
  Zap,
  Smartphone,
  ShoppingBag,
  BookOpen,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Star,
  Users,
  Share2,
  Link as LinkIcon,
  Activity,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { askGemini, ChatMode } from "./lib/gemini";
import { 
  BLOG_POSTS, 
  SERVICES, 
  PRODUCTS, 
  LEGAL_CONTENT, 
  ECOSYSTEM,
  LANGUAGES,
  FAQS,
  STORE_APPS,
  STORE_TEMPLATES
} from "./constants";

const FAQSection = ({ faqs, pageTitle }: { faqs: { question: string; answer: string }[], pageTitle: string }) => (
  <div className="py-20 space-y-12">
    <div className="flex items-center gap-4">
      <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">FAQ // {pageTitle}</span>
      <div className="h-[1px] flex-1 bg-[#E8E4DE]" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {faqs.map((faq, idx) => (
        <div key={idx} className="space-y-4">
          <h4 className="text-xl italic text-[#1A1A1A]">{faq.question}</h4>
          <p className="text-sm leading-relaxed text-[#8C8C8C]">{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
);

const FAQSchema = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
    />
  );
};

const LanguageSwitcher = ({ currentLang, onToggle }: { currentLang: string, onToggle: (l: string) => void }) => (
  <div className="flex gap-2 p-1 bg-[#F9F7F5] border border-[#E8E4DE] rounded-full">
    {LANGUAGES.map((l) => (
      <button
        key={l.code}
        onClick={() => onToggle(l.code)}
        className={`px-3 py-1 rounded-full text-[9px] uppercase font-sans font-bold tracking-widest transition-all ${
          currentLang === l.code 
            ? "bg-[#1A1A1A] text-white shadow-sm" 
            : "text-[#8C8C8C] hover:text-[#1A1A1A] cursor-pointer"
        }`}
      >
        {l.label}
      </button>
    ))}
  </div>
);

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SaaSSkulLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00BDFF" />
        <stop offset="100%" stopColor="#7A22FF" />
      </linearGradient>
    </defs>
    <path 
      d="M30 25L50 15L85 35L85 65L65 75M70 75L50 85L15 65L15 35L35 25M35 25L50 35L65 25M35 75L50 65L65 75" 
      stroke="url(#logo-gradient)" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M50 35L50 65" 
      stroke="url(#logo-gradient)" 
      strokeWidth="12" 
      strokeLinecap="round" 
    />
  </svg>
);

const UniversalBadge = () => (
  <div className="flex items-center gap-2 px-3 py-1.5 border border-[#E8E4DE] bg-white rounded-full shadow-sm">
    <SaaSSkulLogo className="w-4 h-4" />
    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A]">A Product of SaaSSkul</span>
  </div>
);

type View = "home" | "services" | "blog" | "store" | "storeApps" | "storeTemplates" | "studio" | "legal" | "contact" | "ai-lead-engine" | "pricing";
type LegalType = "terms" | "privacy" | "cookies";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="bg-[#F9F7F5] border border-[#E8E4DE] p-10 md:p-16 space-y-10">
      {!submitted ? (
        <>
          <div className="space-y-4">
            <h2 className="text-4xl italic">Brief the Studio.</h2>
            <p className="text-sm font-sans uppercase tracking-widest text-[#8C8C8C]">Lead Capture Protocol v1.0</p>
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans"
          >
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#A69F95]">Full Name</label>
              <input required type="text" className="w-full bg-white border border-[#E8E4DE] p-4 text-sm focus:border-[#1A1A1A] outline-none transition-colors" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#A69F95]">Email Address</label>
              <input required type="email" className="w-full bg-white border border-[#E8E4DE] p-4 text-sm focus:border-[#1A1A1A] outline-none transition-colors" placeholder="john@company.com" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#A69F95]">Project Brief / Service Interest</label>
              <textarea required rows={4} className="w-full bg-white border border-[#E8E4DE] p-4 text-sm focus:border-[#1A1A1A] outline-none transition-colors" placeholder="Tell us about your SaaS goals..." />
            </div>
            <button type="submit" className="md:col-span-2 py-5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#8C7851] transition-all cursor-pointer">
              Transmit Lead Details
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-20 space-y-6">
          <div className="w-16 h-16 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-3xl italic">Message Synchronized.</h2>
          <p className="text-sm font-sans uppercase tracking-[0.2em] text-[#8C8C8C]">Our team will reach out within 4 neural cycles.</p>
        </div>
      )}
    </div>
  );
};

const EcosystemSection = () => (
  <div className="space-y-12">
    <div className="flex items-center gap-4">
      <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">02 // SaaSSkul Network</span>
      <div className="h-[1px] flex-1 bg-[#E8E4DE]" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {ECOSYSTEM.map((site) => (
        <div key={site.name} className="p-10 border border-[#E8E4DE] bg-[#FDFCFB] space-y-6 hover:border-[#1A1A1A] transition-all group">
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#8C7851]">{site.role}</span>
            <h4 className="text-2xl italic">{site.name}</h4>
            <p className="text-sm opacity-60 leading-relaxed">{site.description}</p>
          </div>
          <a 
            href={site.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest group-hover:translate-x-2 transition-transform"
          >
            Explore Platform <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  </div>
);

const SolutionsShowcase = ({ onNavigate, onSelect }: { onNavigate: (v: View) => void, onSelect: (id: string | null) => void }) => {
  const highlightApps = [
    { id: "crm-sync", icon: Share2, label: "CRM Sync" },
    { id: "api-integration", icon: LinkIcon, label: "API Gate" },
    { id: "analytics-dash", icon: Activity, label: "Analytics Dash" },
    { id: "ai-neural", icon: Cpu, label: "AI Neural" }
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">03 // Core Instruments</span>
        <div className="h-[1px] flex-1 bg-[#E8E4DE]" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {highlightApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              onSelect(app.id);
              onNavigate("services");
            }}
            className="flex flex-col items-center justify-center p-8 border border-[#E8E4DE] bg-white group hover:border-[#1A1A1A] transition-all cursor-pointer"
          >
            <app.icon className="w-8 h-8 mb-4 text-[#8C8C8C] group-hover:text-[#1A1A1A] transition-colors" />
            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#8C8C8C] group-hover:text-[#1A1A1A] transition-colors">
              {app.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const GoogleReviews = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      { name: "Alex Rivers", text: "The AI lead gen engine saved us 20 hours a week. Incredible ROI.", rating: 5 },
      { name: "Sarah Chen", text: "Minimalist aesthetic combined with powerful neural logic. Best in the biz.", rating: 5 },
      { name: "Marcus Thorne", text: "SaaSSkul transformed our outreach. Highly recommend the studio services.", rating: 5 }
    ].map((review, i) => (
      <div key={review.name} className="p-8 border border-[#E8E4DE] bg-[#FDFCFB] space-y-4">
        <div className="flex gap-1">
          {[...Array(review.rating)].map((_, j) => (
            <Star key={j} className="w-3 h-3 fill-[#8C7851] text-[#8C7851]" />
          ))}
        </div>
        <p className="text-sm italic leading-relaxed opacity-80">"{review.text}"</p>
        <div className="flex items-center gap-3 border-t border-[#E8E4DE] pt-4">
          <div className="w-6 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center">
            <Users className="w-3 h-3 text-white" />
          </div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#A69F95]">{review.name}</span>
        </div>
      </div>
    ))}
  </div>
);

export default function App() {
  const [view, setView] = useState<View>("home");
  const [lang, setLang] = useState("en");
  const [legalView, setLegalView] = useState<LegalType>("terms");
  const [mode, setMode] = useState<ChatMode>("creative");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    const titles: Record<View, string> = {
      home: "SaaSSkul Studio & Store — Digital Products, Apps & Templates",
      store: "Store — SaaSSkul Studio",
      storeApps: "Apps & Instruments — SaaSSkul Store",
      storeTemplates: "Templates & Assets — SaaSSkul Store",
      services: "Strategic Solutions — SaaSSkul Studio",
      blog: "Learn // MentorArena — SaaSSkul Studio",
      contact: "Brief Studio — SaaSSkul Studio",
      studio: "AI Lead Engine v4.2 — SaaSSkul Studio",
      legal: "Legal Protocol — SaaSSkul Studio",
      "ai-lead-engine": "AI Lead Engine Product — SaaSSkul Store",
      pricing: "Pricing & Access — SaaSSkul Studio"
    };

    if (view === "services" && selectedServiceId) {
      const service = SERVICES.find(s => s.id === selectedServiceId);
      if (service) {
        document.title = service.metaTitle || titles.services;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', service.metaDescription || "");
      }
    } else {
      document.title = titles[view] || "SaaSSkul";
    }
  }, [view, selectedServiceId]);

  const currentLangData = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (scrollRef.current && view === "studio") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, view]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (view !== "studio") setView("studio");

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askGemini(input, mode);
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response || "Something went wrong.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const modes: { id: ChatMode; label: string; icon: any; color: string }[] = [
    { id: "creative", label: "Atmospheric", icon: Sparkles, color: "text-orange-500" },
    { id: "technical", label: "Technical", icon: Terminal, color: "text-emerald-500" },
    { id: "strategy", label: "Strategic", icon: Target, color: "text-blue-500" },
    { id: "critique", label: "Critical", icon: Search, color: "text-rose-500" },
  ];

  const studioModes: { id: View; label: string; icon: any }[] = [
    { id: "home", label: "Studio", icon: Layout },
    { id: "services", label: "Strategic Solutions", icon: Zap },
    { id: "store", label: "Marketplace", icon: ShoppingBag },
    { id: "blog", label: "Learn", icon: BookOpen },
    { id: "contact", label: "Brief Studio", icon: MessageSquare },
    { id: "studio", label: "AI Engine", icon: Sparkles },
  ];

  const currentModeInfo = modes.find(m => m.id === mode)!;

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-700 bg-[var(--bg)] text-[var(--ink)] ${view === "studio" && mode === "technical" ? "technical-mode font-mono" : "font-serif"}`} id="app-root" dir={currentLangData.dir}>
      {/* Top Header */}
      <header className="h-20 border-b border-[#E8E4DE] flex items-center justify-between px-10 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div 
            onClick={() => setView("home")}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <SaaSSkulLogo className="w-10 h-10 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start translate-y-[-1px]">
              <h1 id="brand-title" className="font-sans font-black tracking-tight text-xl leading-none uppercase text-[#1A1A1A] flex items-baseline">
                <span>SaaSS</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#00BDFF] to-[#7A22FF]">Kul</span>
              </h1>
              <span className="font-sans font-bold tracking-[0.25em] text-[7px] uppercase text-[#8C8C8C] mt-1">Studio & Store</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8C8C8C]">
              {[
                { id: "home", label: "Studio" },
                { id: "store", label: "Store" },
                { id: "services", label: "Solutions" },
                { id: "pricing", label: "Access" },
                { id: "blog", label: "Learn" },
                { id: "contact", label: "Contact" }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setView(item.id as View);
                    setSelectedServiceId(null);
                  }}
                  className={`${(view === item.id || (item.id === 'store' && (view === 'storeApps' || view === 'storeTemplates'))) ? "text-[#1A1A1A] border-b border-[#1A1A1A] pb-1" : "hover:text-[#1A1A1A]"} transition-all cursor-pointer`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <LanguageSwitcher currentLang={lang} onToggle={setLang} />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => setView("studio")}
              className="px-6 py-2 bg-[#1A1A1A] text-white text-[9px] font-sans font-bold uppercase tracking-widest hover:bg-[#8C7851] transition-all cursor-pointer"
            >
              Launch AI Engine
            </button>
          </div>
        </div>
      </header>

      {/* Main Workbench */}
      <main className="flex-1 flex flex-col relative bg-white" id="main-content">
        {/* Content Area */}
        <div 
          ref={scrollRef}
          className="flex-1"
          id="content-area"
        >
          <AnimatePresence mode="wait">
            {view === "home" && (
              <motion.div 
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-6xl mx-auto space-y-24"
              >
                <div className="space-y-6 text-center md:text-left">
                  <h1 className="text-7xl md:text-9xl italic leading-[0.8] tracking-tight text-[#1A1A1A]">
                    Studio <br/> & Store.
                  </h1>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <p className="max-w-sm text-xl leading-relaxed text-[#1A1A1A] opacity-80">
                      High-fidelity SaaS instruments, digital templates, and framework education from SaaSSkul Karachi. We build the infrastructure for the next generation of founders using the SaaSSkul app ecosystem.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setView("store")}
                        className="px-8 py-4 bg-[#1A1A1A] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#8C7851] transition-all cursor-pointer"
                      >
                        Visit the Store
                      </button>
                      <button 
                        onClick={() => setView("studio")}
                        className="px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#FDFCFB] transition-all cursor-pointer"
                      >
                        Launch AI Engine
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8 bg-[#F9F7F5] border border-[#E8E4DE] p-12 flex flex-col justify-between aspect-video relative overflow-hidden group">
                    <div className="space-y-4 relative z-10">
                      <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">01 // Featured Product</span>
                      <h3 className="text-4xl md:text-5xl italic leading-tight">AI Lead Engine <br/> Qualifying at Scale.</h3>
                      <p className="text-sm opacity-60 max-w-sm">The SaaSSkul app for autonomous lead qualification. Transform your B2B sales pipeline with neural logic.</p>
                      <button 
                        onClick={() => setView("ai-lead-engine")}
                        className="mt-6 flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest text-[#8C7851] hover:translate-x-2 transition-transform"
                      >
                        View Product Protocol <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-8 relative z-10">
                      {["B2B Automation", "Neural Logic", "CRM Sync", "Live v4.2"].map(tag => (
                        <span key={tag} className="px-4 py-2 border border-[#E8E4DE] bg-white text-[9px] uppercase font-bold tracking-widest">{tag}</span>
                      ))}
                    </div>
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Zap className="w-48 h-48" />
                    </div>
                  </div>
                  <div className="md:col-span-4 bg-[#1A1A1A] text-white p-12 flex flex-col justify-between">
                    <SaaSSkulLogo className="w-12 h-12" />
                    <div className="space-y-4">
                      <h4 className="text-2xl italic">Calcoo Hub</h4>
                      <p className="text-[10px] uppercase tracking-widest leading-relaxed opacity-60">
                        Our flagship free quantification tool for SaaS founders and digital entrepreneurs.
                      </p>
                      <a 
                        href="https://calcoo.online" 
                        target="_blank" 
                        className="inline-flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest text-[#8C7851]"
                      >
                        Visit Calcoo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <EcosystemSection />
                <SolutionsShowcase onNavigate={setView} onSelect={setSelectedServiceId} />

                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">04 // Verified Impact</span>
                    <div className="h-[1px] flex-1 bg-[#E8E4DE]" />
                  </div>
                  <GoogleReviews />
                </div>

                <FAQSection faqs={FAQS.home} pageTitle="SaaSSkul Studio" />
                <FAQSchema faqs={FAQS.home} />

                <div className="pt-20 border-t border-[#E8E4DE] grid grid-cols-1 md:grid-cols-4 gap-12 font-sans">
                  <div className="space-y-6">
                    <SaaSSkulLogo className="w-8 h-8" />
                    <p className="text-[10px] uppercase tracking-widest leading-relaxed text-[#8C8C8C]">
                      Transforming intent into enterprise value through neural automation.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest">Studio Contact</h5>
                    <a href="mailto:support@saasskul.com" className="text-sm border-b border-[#1A1A1A] pb-1 hover:text-[#8C7851] hover:border-[#8C7851] transition-all">
                      support@saasskul.com
                    </a>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest">Compliance</h5>
                    <nav className="flex flex-col gap-2 text-xs text-[#8C8C8C]">
                      <button onClick={() => { setView("legal"); setLegalView("terms"); }} className="text-left hover:text-[#1A1A1A] cursor-pointer">Terms of Service</button>
                      <button onClick={() => { setView("legal"); setLegalView("privacy"); }} className="text-left hover:text-[#1A1A1A] cursor-pointer">Privacy & GDPR</button>
                      <button onClick={() => { setView("legal"); setLegalView("cookies"); }} className="text-left hover:text-[#1A1A1A] cursor-pointer">Cookie Policy</button>
                    </nav>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest">Connect</h5>
                    <div className="flex gap-4">
                      <a href="https://linkedin.com/company/saasskul" target="_blank" className="text-xs hover:text-[#1A1A1A]">LN</a>
                      <a href="https://twitter.com/saasskul" target="_blank" className="text-xs hover:text-[#1A1A1A]">TW</a>
                      <a href="https://github.com/FazalShahidLatif/saasskul-website" target="_blank" className="text-xs hover:text-[#1A1A1A]">GH</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {view === "contact" && (
              <motion.div 
                key="contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-4xl mx-auto space-y-20"
              >
                <div className="space-y-6 text-center">
                  <h1 className="text-6xl md:text-8xl italic">Founder Access.</h1>
                  <p className="max-w-md mx-auto text-lg opacity-60">Digital Entrepreneur, Educator & SaaS/SEO Consultant at SaaSSkul Karachi. Brief our studio for high-impact partnerships globally.</p>
                </div>
                <ContactForm />
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">Location // Studio Base</span>
                    <div className="h-[1px] flex-1 bg-[#E8E4DE]" />
                  </div>
                  <div className="w-full aspect-video border border-[#E8E4DE] grayscale hover:grayscale-0 transition-all duration-700">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.3123869279513!2d67.12658428509395!3d24.88453736798033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33946c42bccd9%3A0x9041b68403e46c74!2zMjYsIDc5MiBTaGFocmEtZS1GYWlzYWwsIEZhaXNhbCBDYW50b25tZW50LCBLYXJhY2hpLCBQYWtpc3Rhbg!5e0!3m2!1sen!2s!4v1714994783456!5m2!1sen!2s" 
                      className="w-full h-full"
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                
                <FAQSection faqs={FAQS.home} pageTitle="Contact SaaSSkul" />
                <FAQSchema faqs={FAQS.home} />
              </motion.div>
            )}

            {view === "legal" && (
              <motion.div 
                key="legal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-3xl mx-auto space-y-16"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-[#E8E4DE] pb-10">
                  <div className="space-y-2">
                    <h1 className="text-5xl italic">{LEGAL_CONTENT[legalView].title}</h1>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-[#A69F95]">Last Revised: {LEGAL_CONTENT[legalView].lastUpdated}</p>
                  </div>
                  <div className="flex gap-4 p-1 bg-[#F9F7F5] border border-[#E8E4DE]">
                    {(["terms", "privacy", "cookies"] as LegalType[]).map(key => (
                      <button 
                        key={key}
                        onClick={() => setLegalView(key)}
                        className={`px-4 py-2 text-[9px] uppercase font-sans font-bold tracking-widest transition-all ${legalView === key ? "bg-[#1A1A1A] text-white" : "text-[#8C8C8C] hover:text-[#1A1A1A]"}`}
                      >
                        {key === "privacy" ? "GDPR" : key}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="prose prose-stone max-w-none">
                  <p className="text-lg leading-relaxed whitespace-pre-line opacity-80">
                    {LEGAL_CONTENT[legalView].content}
                  </p>
                </div>
                <div className="pt-10 border-t border-[#E8E4DE]">
                   <button 
                    onClick={() => setView("home")}
                    className="flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest hover:translate-x-2 transition-transform"
                   >
                     <ArrowRight className="w-3 h-3 rotate-180" /> Back to Collection
                   </button>
                </div>
              </motion.div>
            )}

            {view === "services" && (
              <motion.div 
                key="services"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-6xl mx-auto space-y-20"
              >
                {!selectedServiceId ? (
                  <>
                    <div className="border-b border-[#E8E4DE] pb-10">
                      <h2 className="text-5xl italic mb-4">Strategic Frameworks.</h2>
                      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8C8C8C]">Implementation by SaaSSkul Karachi // Solutions Grid</p>
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1px bg-[#E8E4DE] border border-[#E8E4DE]">
                      {SERVICES.map((service, idx) => (
                        <div key={service.id} className="bg-white p-16 space-y-8 group hover:bg-[#FDFCFB] transition-colors relative">
                          <div className="flex justify-between items-start">
                            <span className="text-[11px] font-sans font-bold text-[#A69F95]">0{idx + 1}</span>
                            {service.icon === "Zap" ? <Zap className="w-6 h-6 opacity-20" /> : 
                             service.icon === "Search" ? <Search className="w-6 h-6 opacity-20" /> :
                             service.icon === "Share2" ? <Share2 className="w-6 h-6 opacity-20" /> :
                             service.icon === "LinkIcon" ? <LinkIcon className="w-6 h-6 opacity-20" /> :
                             service.icon === "Activity" ? <Activity className="w-6 h-6 opacity-20" /> :
                             service.icon === "Cpu" ? <Cpu className="w-6 h-6 opacity-20" /> :
                             service.icon === "Users" ? <Users className="w-6 h-6 opacity-20" /> :
                             <Sparkles className="w-6 h-6 opacity-20" />}
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-3xl italic">{service.title}</h3>
                            <p className="text-sm leading-relaxed opacity-60 max-w-sm">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {service.longDescription ? (
                              <button 
                                onClick={() => setSelectedServiceId(service.id)}
                                className="inline-flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest hover:translate-x-2 transition-transform cursor-pointer text-[#8C7851]"
                              >
                                View Detailed Solution <ArrowRight className="w-3 h-3" />
                              </button>
                            ) : service.url ? (
                               <button 
                                  onClick={() => setView(service.url === "/ai-lead-engine" ? "ai-lead-engine" : "home")}
                                  className="inline-flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest hover:translate-x-2 transition-transform cursor-pointer text-[#8C7851]"
                               >
                                  Launch Experience <ArrowRight className="w-3 h-3" />
                               </button>
                            ) : (
                              <button 
                                onClick={() => setView("contact")}
                                className="inline-flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest hover:translate-x-2 transition-transform cursor-pointer"
                              >
                                Book Protocol <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="bg-[#1A1A1A] text-white p-16 space-y-8 relative">
                        <span className="text-[11px] font-sans font-bold text-white/40">0{SERVICES.length + 1}</span>
                        <h3 className="text-3xl italic text-white">Karachi On-Site</h3>
                        <p className="text-sm leading-relaxed text-white/60 max-w-sm">
                          SaaSSkul Karachi exclusive local workshops and intensive build cycles for Pakistan-based startups.
                        </p>
                        <button onClick={() => setView("contact")} className="flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest hover:translate-x-2 transition-transform cursor-pointer text-[#8C7851]">
                          Request Local Brief <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-20">
                    {(() => {
                      const s = SERVICES.find(x => x.id === selectedServiceId)!;
                      return (
                        <>
                          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E4DE] pb-10 gap-8">
                            <div className="space-y-4">
                              <button 
                                onClick={() => setSelectedServiceId(null)}
                                className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C8C] hover:text-[#1A1A1A] flex items-center gap-2 mb-4"
                              >
                                <ArrowRight className="w-3 h-3 rotate-180" /> Back to Solutions
                              </button>
                              <h1 className="text-6xl italic">{s.title}</h1>
                              <p className="max-w-xl text-lg opacity-60 leading-relaxed font-serif">
                                {s.longDescription || s.description}
                              </p>
                            </div>
                            <button 
                              onClick={() => setView("contact")}
                              className="px-8 py-4 bg-[#1A1A1A] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#8C7851] transition-all cursor-pointer"
                            >
                              Get Started
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <div className="space-y-12">
                              <div className="flex items-center gap-4">
                                <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">Core Features // Capabilities</span>
                                <div className="h-[1px] flex-1 bg-[#E8E4DE]" />
                              </div>
                              <ul className="space-y-6">
                                {s.features?.map((f, i) => (
                                  <li key={i} className="flex items-center gap-4 text-xl italic text-[#1A1A1A]">
                                    <div className="w-2 h-2 rounded-full bg-[#8C7851]" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-12 bg-[#F9F7F5] border border-[#E8E4DE] space-y-6 flex flex-col justify-center">
                              <h4 className="text-2xl italic leading-tight">Implementation by SaaSSkul Karachi.</h4>
                              <p className="text-sm opacity-60">We don't just sell software; we build the infrastructure for your success. Our team in Karachi handles the entire deployment cycle.</p>
                            </div>
                          </div>

                          <FAQSection faqs={FAQS.services} pageTitle={s.title} />
                        </>
                      );
                    })()}
                  </div>
                )}

                <FAQSection faqs={FAQS.services} pageTitle="SaaSSkul Services" />
                <FAQSchema faqs={FAQS.services} />
              </motion.div>
            )}

            {view === "pricing" && (
              <motion.div 
                key="pricing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-6xl mx-auto space-y-20"
              >
                <div className="border-b border-[#E8E4DE] pb-10">
                  <h2 className="text-5xl italic mb-4">Investment Blocks.</h2>
                  <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8C8C8C]">Pricing for SaaSSkul App Ecosystem & Studio Services</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {[
                     { plan: "Micro-SaaS", price: "$49/mo", features: ["1 SaaSSkul App Access", "Base Neural Logic", "Community Support"] },
                     { plan: "Studio Partner", price: "$499/mo", features: ["Full App Ecosystem", "Custom Integration", "Direct Engineer Access"] },
                     { plan: "Enterprise", price: "Custom", features: ["Bespoke Neural Models", "White-label Studio", "On-site Deployment"] }
                   ].map((p, i) => (
                     <div key={i} className="p-12 border border-[#E8E4DE] space-y-8 flex flex-col justify-between hover:border-[#1A1A1A] transition-all">
                        <div className="space-y-6">
                          <h4 className="text-2xl italic text-[#1A1A1A]">{p.plan}</h4>
                          <div className="text-4xl italic text-[#1A1A1A]">{p.price}</div>
                          <ul className="space-y-4">
                            {p.features.map(f => <li key={f} className="text-sm opacity-60 flex items-center gap-3"><Check className="w-3 h-3 text-[#8C7851]" /> {f}</li>)}
                          </ul>
                        </div>
                        <button onClick={() => setView("contact")} className="w-full py-4 bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-widest hover:bg-[#8C7851]">Choose Protocol</button>
                     </div>
                   ))}
                </div>

                <FAQSection faqs={FAQS.pricing} pageTitle="Pricing" />
                <FAQSchema faqs={FAQS.pricing} />
              </motion.div>
            )}

            {view === "blog" && (
              <motion.div 
                key="blog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-4xl mx-auto space-y-20"
              >
                <div className="text-center space-y-4">
                  <h1 className="text-6xl md:text-8xl italic">Learn // MentorArena</h1>
                  <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#8C8C8C]">Insights // Frameworks // Workshops</p>
                </div>

                <div className="space-y-24">
                  {BLOG_POSTS.map((post) => (
                    <article key={post.id} className="space-y-8 group cursor-pointer">
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#8C7851]">{post.category}</span>
                        <div className="h-[1px] flex-1 bg-[#E8E4DE]" />
                        <span className="text-[10px] font-sans text-[#8C8C8C] uppercase tracking-widest">{post.date}</span>
                      </div>
                      <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl italic group-hover:text-[#8C7851] transition-colors leading-[1.1]">{post.title}</h2>
                        <p className="text-lg md:text-xl leading-relaxed opacity-60">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] uppercase font-sans font-bold tracking-widest">
                        Read Story <ExternalLink className="w-3 h-3" />
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            )}

            {view === "ai-lead-engine" && (
              <motion.div 
                key="ai-lead-engine"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-6xl mx-auto space-y-24"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E4DE] pb-10 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-[#8C7851]" />
                      <span className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">Flagship Asset // SaaSSkul Store</span>
                    </div>
                    <h1 className="text-6xl italic">AI Lead Engine</h1>
                    <p className="max-w-md text-lg opacity-60 leading-relaxed">
                      Specialized autonomous intelligence for B2B lead capture. This SaaSSkul app is the production engine behind successful SaaSSkul Karachi implementations globally.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setView("studio")}
                      className="px-8 py-4 bg-[#1A1A1A] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#8C7851] transition-all cursor-pointer"
                    >
                      Launch Preview
                    </button>
                    <button 
                      onClick={() => setView("storeApps")}
                      className="px-8 py-4 border border-[#E8E4DE] font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#F9F7F5]"
                    >
                      Back to Store
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {[
                     { title: "Neural Intake", desc: "Filters low-intent traffic using real-time behavioral markers." },
                     { title: "CRM Sync", desc: "Instant population of qualify data into Hubspot, Pipedrive, or Salesforce." },
                     { title: "Auto-Booking", desc: "Natively integrates with Calendly for zero-touch appointment loops." }
                   ].map((f, i) => (
                     <div key={i} className="p-10 border border-[#E8E4DE] space-y-6">
                       <span className="text-3xl italic opacity-20">0{i+1}</span>
                       <h4 className="text-2xl italic">{f.title}</h4>
                       <p className="text-sm opacity-60 leading-relaxed">{f.desc}</p>
                     </div>
                   ))}
                </div>

                <FAQSection faqs={FAQS.home} pageTitle="AI Lead Engine" />
                <FAQSchema faqs={FAQS.home} />
              </motion.div>
            )}

            {view === "store" && (
              <motion.div 
                key="store"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-6xl mx-auto space-y-24"
              >
                <div className="space-y-8 text-center max-w-3xl mx-auto">
                  <h1 className="text-7xl md:text-9xl italic">The Store.</h1>
                  <p className="text-xl opacity-60 leading-relaxed">
                    SaaSSkul curated marketplace for high-performance SaaS instruments, Notion templates, and AI prompt architecture. Access the best of the SaaSSkul app ecosystem globally.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div 
                    onClick={() => setView("storeApps")}
                    className="group bg-[#1A1A1A] text-white p-12 md:p-20 space-y-8 cursor-pointer overflow-hidden relative"
                  >
                    <div className="space-y-4 relative z-10">
                      <h3 className="text-5xl italic">Apps & Tools</h3>
                      <p className="opacity-60 max-w-xs leading-relaxed">Mini-SaaS assets, calculators, and automation engines built by SaaSSkul Karachi.</p>
                      <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest group-hover:translate-x-2 transition-transform">
                        Browse Applications <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                    <Layout className="absolute bottom-[-20px] right-[-20px] w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity" />
                  </div>
                  <div 
                    onClick={() => setView("storeTemplates")}
                    className="group bg-[#F9F7F5] border border-[#E8E4DE] p-12 md:p-20 space-y-8 cursor-pointer overflow-hidden relative"
                  >
                    <div className="space-y-4 relative z-10">
                      <h3 className="text-5xl italic text-[#1A1A1A]">Templates</h3>
                      <p className="opacity-60 max-w-xs leading-relaxed text-[#1A1A1A]">Notion boards, AI prompt packs, and automation blueprints for the modern founder using SaaSSkul Karachi frameworks.</p>
                      <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] group-hover:translate-x-2 transition-transform">
                        Browse Assets <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                    <ShoppingBag className="absolute bottom-[-20px] right-[-20px] w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity" />
                  </div>
                </div>

                <FAQSection faqs={FAQS.store} pageTitle="SaaSSkul Store" />
                <FAQSchema faqs={FAQS.store} />
              </motion.div>
            )}

            {view === "storeApps" && (
              <motion.div 
                key="storeApps"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-6xl mx-auto space-y-20"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E4DE] pb-10 gap-8">
                  <div>
                    <h2 className="text-5xl italic mb-4">Software & Instruments.</h2>
                    <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8C8C8C]">Proprietary SaaSSkul Applications</p>
                  </div>
                  <button 
                    onClick={() => setView("store")}
                    className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#8C7851]"
                  >
                    Back to Store Landing
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {STORE_APPS.map((app) => (
                     <div key={app.id} className="p-10 border border-[#E8E4DE] bg-[#FDFCFB] space-y-8 flex flex-col justify-between group hover:border-[#1A1A1A] transition-all">
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#8C7851]">{app.status}</span>
                            <Layout className="w-4 h-4 opacity-20" />
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-2xl italic leading-tight">{app.title}</h4>
                            <p className="text-sm opacity-60 leading-relaxed">{app.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {app.tags.map(t => <span key={t} className="px-2 py-1 bg-white border border-[#E8E4DE] text-[8px] uppercase font-bold tracking-widest">{t}</span>)}
                          </div>
                        </div>
                        {app.isExternal ? (
                          <a href={app.ctaHref} target="_blank" className="w-full py-4 bg-[#1A1A1A] text-white text-center text-[10px] uppercase font-bold tracking-widest hover:bg-[#8C7851] transition-colors">{app.ctaLabel}</a>
                        ) : (
                          <button onClick={() => setView(app.id === "lead-engine" ? "ai-lead-engine" : "home")} className="w-full py-4 bg-[#1A1A1A] text-white text-center text-[10px] uppercase font-bold tracking-widest hover:bg-[#8C7851] transition-colors">{app.ctaLabel}</button>
                        )}
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {view === "storeTemplates" && (
              <motion.div 
                key="storeTemplates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-10 md:p-20 max-w-6xl mx-auto space-y-20"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E4DE] pb-10 gap-8">
                  <div>
                    <h2 className="text-5xl italic mb-4">Frameworks & Assets.</h2>
                    <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8C8C8C]">Digital Downloads via Gumroad Marketplace</p>
                  </div>
                  <button 
                    onClick={() => setView("store")}
                    className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#8C7851]"
                  >
                    Back to Store Landing
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {STORE_TEMPLATES.map((item) => (
                     <div key={item.id} className="p-10 border border-[#E8E4DE] bg-[#FDFCFB] space-y-8 flex flex-col justify-between group hover:border-[#1A1A1A] transition-all">
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#8C7851]">{item.type}</span>
                            <ShoppingBag className="w-4 h-4 opacity-20" />
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-2xl italic leading-tight">{item.title}</h4>
                            <p className="text-sm opacity-60 leading-relaxed">{item.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {item.tags.map(t => <span key={t} className="px-2 py-1 bg-white border border-[#E8E4DE] text-[8px] uppercase font-bold tracking-widest">{t}</span>)}
                          </div>
                        </div>
                        <a href={item.ctaHref} target="_blank" className="w-full py-4 bg-white border border-[#1A1A1A] text-[#1A1A1A] text-center text-[10px] uppercase font-bold tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all">{item.ctaLabel}</a>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {view === "studio" && (
              <motion.div 
                key="studio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col pt-10"
              >
                <div className="flex-1 overflow-y-auto px-10 space-y-12 pb-32" id="chat-scroller">
                  <div className="max-w-4xl mx-auto space-y-12">
                    <div className="flex flex-col items-center text-center space-y-6 pt-20">
                      <div className={`p-4 rounded-full bg-[#1A1A1A] shadow-2xl ${currentModeInfo.color}`}>
                        <currentModeInfo.icon className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-4xl italic">AI Lead Engine v4.2</h2>
                        <p className="text-[10px] uppercase font-sans font-bold tracking-[0.4em] text-[#A69F95]">
                           {currentModeInfo.label} Analysis Mode // Neural Logic Active
                        </p>
                      </div>
                      
                      <div className="flex gap-2 p-1 bg-[#F9F7F5] border border-[#E8E4DE] rounded-full">
                        {modes.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setMode(m.id)}
                            className={`px-6 py-2 rounded-full text-[9px] uppercase font-sans font-bold tracking-widest transition-all ${
                              mode === m.id 
                                ? "bg-[#1A1A1A] text-white shadow-lg" 
                                : "text-[#8C8C8C] hover:text-[#1A1A1A] cursor-pointer"
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-10">
                      {messages.map((m) => (
                        <div key={m.id} className={`flex gap-6 ${m.role === "assistant" ? "bg-[#FDFCFB] p-10 border border-[#E8E4DE]" : ""}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-[#8C7851]" : "bg-[#1A1A1A]"}`}>
                            {m.role === "user" ? <Users className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
                          </div>
                          <div className="space-y-4 flex-1">
                            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#A69F95]">
                              {m.role === "user" ? "Client Input" : "Neural Output"} // {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className="prose prose-stone leading-relaxed opacity-90 text-lg">
                              <div className="whitespace-pre-wrap">{m.content}</div>
                            </div>
                            {m.role === "assistant" && (
                              <button 
                                onClick={() => copyToClipboard(m.content, m.id)}
                                className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#8C7851] hover:text-[#1A1A1A] transition-colors"
                              >
                                {copiedId === m.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copiedId === m.id ? "Copied" : "Copy Output"}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex gap-6 animate-pulse">
                          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] opacity-20 shrink-0" />
                          <div className="space-y-4 flex-1">
                            <div className="h-2 w-24 bg-[#E8E4DE] rounded" />
                            <div className="h-4 w-full bg-[#FDFCFB] rounded" />
                            <div className="h-4 w-2/3 bg-[#FDFCFB] rounded" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-10 border-t border-[#E8E4DE] bg-white sticky bottom-0">
                  <div className="max-w-4xl mx-auto flex gap-4">
                    <textarea 
                      rows={1}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      className="flex-1 bg-[#F9F7F5] border border-[#E8E4DE] p-6 font-sans text-sm md:text-lg focus:border-[#1A1A1A] outline-none transition-colors italic resize-none scrollbar-hide"
                      placeholder="Input strategic parameters or questions..."
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="px-10 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#8C7851] transition-all disabled:opacity-50 cursor-pointer h-full min-h-[64px]"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Global Footer */}
        <footer className="bg-[#FDFCFB] border-t border-[#E8E4DE] pt-24 pb-12 px-10">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-4 space-y-8">
                <div className="flex items-center gap-6">
                  <SaaSSkulLogo className="w-12 h-12" />
                  <div className="flex flex-col items-center">
                    <h3 className="font-sans font-black tracking-tight text-2xl leading-none uppercase text-[#1A1A1A] flex items-baseline">
                      <span>SaaSS</span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#00BDFF] to-[#7A22FF]">Kul</span>
                    </h3>
                    <p className="font-sans font-bold tracking-[0.3em] text-[10px] uppercase text-[#8C8C8C] mt-1">Studio & Store</p>
                    <div className="mt-4">
                       <UniversalBadge />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-sans text-[#8C8C8C] leading-relaxed max-w-sm">
                  The umbrella brand for modern SaaS tools, educational frameworks, and strategic automation. Transducing intent into enterprise value through neural logic.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4 text-[#A69F95]">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-sans font-bold tracking-widest">Neural Pulse: Active // 2026</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://linkedin.com/company/saasskul" target="_blank" className="p-3 border border-[#E8E4DE] hover:border-[#1A1A1A] transition-all">LN</a>
                    <a href="https://twitter.com/saasskul" target="_blank" className="p-3 border border-[#E8E4DE] hover:border-[#1A1A1A] transition-all">TW</a>
                    <a href="https://github.com/FazalShahidLatif/saasskul-website" target="_blank" className="p-3 border border-[#E8E4DE] hover:border-[#1A1A1A] transition-all text-[10px] flex items-center justify-center font-bold">GH</a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A69F95]">Studio Index</h5>
                <nav className="flex flex-col gap-4 text-xs font-sans font-bold uppercase tracking-widest text-[#8C8C8C]">
                  {[
                    { id: "home", label: "Studio" },
                    { id: "store", label: "Store" },
                    { id: "services", label: "Solutions" },
                    { id: "blog", label: "Learn" },
                    { id: "contact", label: "Contact" }
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => { setView(item.id as View); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                      className="text-left hover:text-[#1A1A1A] transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="md:col-span-3 space-y-6">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A69F95]">HQ & Transmissions</h5>
                <div className="space-y-6 font-sans">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#A69F95] block">Studio Address</span>
                    <p className="text-sm leading-relaxed text-[#5C5C5C]">
                      26/792m Cantt Bazar,<br/>
                      Drigh Road, Karachi - 75350
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#A69F95] block">Direct Contact</span>
                    <div className="flex flex-col gap-2">
                      <a href="mailto:support@saasskul.com" className="text-sm border-b border-[#E8E4DE] pb-1 hover:border-[#1A1A1A] transition-all w-fit">support@saasskul.com</a>
                      <a href="https://wa.me/923322137898" target="_blank" className="text-sm border-b border-[#E8E4DE] pb-1 hover:border-[#1A1A1A] transition-all w-fit">+92 332 213 7898</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-6">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A69F95]">Compliance & Data</h5>
                <div className="space-y-6">
                  <nav className="flex flex-col gap-4 text-xs font-sans font-bold uppercase tracking-widest text-[#8C8C8C]">
                    <button onClick={() => { setView("legal"); setLegalView("terms"); window.scrollTo({ top: 0 }); }} className="text-left hover:text-[#1A1A1A]">Terms of Service</button>
                    <button onClick={() => { setView("legal"); setLegalView("privacy"); window.scrollTo({ top: 0 }); }} className="text-left hover:text-[#1A1A1A]">Privacy & GDPR</button>
                    <button onClick={() => { setView("legal"); setLegalView("cookies"); window.scrollTo({ top: 0 }); }} className="text-left hover:text-[#1A1A1A]">Cookie Policy</button>
                  </nav>
                  <div className="p-6 bg-[#F9F7F5] border border-[#E8E4DE] space-y-3">
                    <p className="text-[9px] uppercase font-bold tracking-widest leading-relaxed text-[#A69F95]">
                      All rights reserved. SaaSSkul Studio & Store is a brand supporting the global SaaS ecosystem.
                    </p>
                    <span className="text-[10px] font-black tracking-widest">© 2026 // STUDIO GRIP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-[#E8E4DE] flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
              <span className="text-[9px] uppercase font-bold tracking-[0.6em] text-[#A69F95]">Atomic Precision // Neural Execution</span>
              <div className="flex gap-1" aria-hidden="true">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-[1px] h-3 bg-[#1A1A1A]" />
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
