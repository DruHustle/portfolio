import { Link } from "wouter";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Code2,
  Cloud,
  Zap,
  Shield,
  Database,
  GitBranch,
  Award,
  Target,
  TrendingUp,
  Menu,
  CalendarDays,
  MapPin,
  Mic2,
  Factory,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMemo, useEffect, useState } from "react";
import { NavigationService } from "@/services/navigationService";
import { analyticsService } from "@/services/analyticsService";
import { safeSessionStorage } from "@/lib/storage";
import { professionalExperience } from "@/data/experience";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    analyticsService.trackPageVisit("home");
  }, []);

  const principles = useMemo(
    () => [
      {
        icon: Code2,
        title: "Microservices",
        desc: "Independent, scalable services with clear boundaries",
      },
      {
        icon: Cloud,
        title: "Multi-Cloud ",
        desc: "Azure + AWS for resilience and cost optimization",
      },
      {
        icon: Zap,
        title: "Reliability Engineering",
        desc: "Observable, recoverable systems with measurable service health",
      },
      {
        icon: Database,
        title: "Domain-Driven Design",
        desc: "Bounded contexts aligned with business capabilities",
      },
      {
        icon: GitBranch,
        title: "Infrastructure as Code",
        desc: "Terraform and Bicep for automated management",
      },
      {
        icon: Shield,
        title: "Secure Delivery",
        desc: "Identity, secrets, policy, and supply-chain controls by design",
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      {
        "title": "Industrial IoT & Automation",
        "skills": [
          "OPC UA, MQTT & Modbus",
          "ThingWorx & Kepware",
          "Industrial Telemetry & Asset Models",
          "Asset Administration Shells (AAS)"
        ]
      },
      {
        "title": "Edge Computing & Digital Twins",
        "skills": [
          "Edge Gateways & Protocol Integration",
          "Raspberry Pi & ESP32 Development",
          "Digital Twins & Asset Lifecycle",
          "Industrial Monitoring & Control"
        ]
      },
      {
        "title": "AI Platforms & Applied AI",
        "skills": [
          "Open-Weight Foundation Models",
          "Retrieval-Augmented Generation (RAG)",
          "Model Customization & Fine-Tuning",
          "Self-Hosted AI Infrastructure"
        ]
      },
      {
        "title": "Cloud-Native Systems",
        "skills": [
          "Azure & AWS Platforms",
          "Docker & Kubernetes",
          "Microservices Architecture",
          "Cloud Migration & Modernization"
        ]
      },
      {
        "title": "Industrial Software Engineering",
        "skills": [
          "C# & .NET",
          "Python (Django, FastAPI)",
          "JavaScript & TypeScript",
          "SQL & Database Design"
        ]
      },
      {
        "title": "API & Integration",
        "skills": [
          "REST & GraphQL APIs",
          "OAuth 2.0 & Security",
          "Event-Driven Architecture",
          "SignalR & Message Queues"
        ]
      },
      {
        "title": "DevOps & Infrastructure",
        "skills": [
          "Terraform & Azure Bicep",
          "Azure DevOps & GitHub Actions",
          "CI/CD Pipeline Automation",
          "Infrastructure as Code"
        ]
      },
      {
        "title": "Observability & Reliability",
        "skills": [
          "Metrics, Logs & Distributed Tracing",
          "SLOs, Alerting & Incident Response",
          "Performance & Capacity Engineering",
          "Operational Readiness & Recovery"
        ]
      },
      {
        "title": "Architecture, Security & Quality",
        "skills": [
          "Domain-Driven Design & SOLID",
          "Test-Driven Development",
          "RBAC & Secrets Management",
          "Secure API Design & Governance"
        ]
      }
    ],
    []
  );

  const businessImpact = useMemo(
    () => [
      {
        icon: TrendingUp,
        title: "Interoperable Industrial Systems",
        desc: "Connecting industrial assets, engineering information, and enterprise applications through open protocols, secure APIs, and shared asset models.",
      },
      {
        icon: Target,
        title: "Reliable Enterprise Delivery",
        desc: "Bringing software engineering and operational ownership together with CI/CD, repeatable infrastructure, observability, and secure cloud delivery.",
      },
      {
        icon: Award,
        title: "Adaptable AI Platforms",
        desc: "Developing Onesa AI around self-managed infrastructure, privacy, efficient inference, and a shared application layer designed to evolve with its models.",
      },
    ],
    []
  );

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | null, id: string) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const shouldScroll = safeSessionStorage.getItem('scrollToProjects');
    if (shouldScroll === 'true') {
      safeSessionStorage.removeItem('scrollToProjects');
      setTimeout(() => {
        scrollToSection(null, 'projects');
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav aria-label="Main navigation" className="fixed top-0 w-full bg-[#03121e]/95 backdrop-blur-md text-white z-50 border-b border-cyan-200/10">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 md:py-4 max-w-7xl mx-auto w-full">
          <Link href="/">
            <a className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity min-w-0">
              <img
                src={`${import.meta.env.BASE_URL}images/profile.jpg`}
                alt="Andrew Gotora"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-teal-400 object-cover flex-shrink-0"
              />
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight truncate">
                Andrew Gotora
              </span>
            </a>
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#projects" 
              onClick={(e) => scrollToSection(e, "projects")}
              className="text-sm font-medium hover:text-teal-400 transition-all duration-300 cursor-pointer" >
              Projects
            </a>
            <a href="#skills" 
              onClick={(e) => scrollToSection(e, "skills")}
              className="text-sm font-medium hover:text-teal-400 transition-all duration-300 cursor-pointer" >
              Skills
            </a>   
            <a href="#experience"
              onClick={(e) => scrollToSection(e, "experience")}
              className="text-sm font-medium hover:text-teal-400 transition-colors">
              Experience
            </a>
            <a href="#onesa"
              onClick={(e) => scrollToSection(e, "onesa")}
              className="text-sm font-medium hover:text-teal-400 transition-colors">
              Onesa AI
            </a>
            <a href="#about" 
              onClick={(e) => scrollToSection(e, "about")}
              className="text-sm font-medium hover:text-teal-400 transition-all duration-300 cursor-pointer">
              About
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button aria-label="Open navigation menu" variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent 
                side="right" 
                // Added [&>button]:text-white to target the built-in close icon
                className="!bg-transparent shadow-none border-none p-0 w-fit min-w-[140px] h-[calc(100dvh-1rem)] m-2 flex flex-col focus:outline-none [&>button]:text-white [&>button]:hover:text-teal-400"
              >
                {/* Inner Glass Card */}
                <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/20 flex flex-col p-6 pt-16 gap-6 h-full text-white">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>

                  <a 
                    href="#projects" 
                    onClick={(e) => {
                      scrollToSection(e, "projects");
                      setIsMenuOpen(false);
                    }}
                    className="text-lg font-medium hover:text-teal-400 transition-colors"
                  >
                    Projects
                  </a>
                  <a 
                    href="#skills" 
                    onClick={(e) => {
                      scrollToSection(e, "skills");
                      setIsMenuOpen(false);
                    }}
                    className="text-lg font-medium hover:text-teal-400 transition-colors"
                  >
                    Skills
                  </a>
                  <a
                    href="#experience"
                    onClick={(e) => {
                      scrollToSection(e, "experience");
                      setIsMenuOpen(false);
                    }}
                    className="text-lg font-medium hover:text-teal-400 transition-colors"
                  >
                    Experience
                  </a>
                  <a
                    href="#onesa"
                    onClick={(e) => {
                      scrollToSection(e, "onesa");
                      setIsMenuOpen(false);
                    }}
                    className="text-lg font-medium hover:text-teal-400 transition-colors"
                  >
                    Onesa AI
                  </a>
                  <a
                    href="#about" 
                    onClick={(e) => {
                      scrollToSection(e, "about");
                      setIsMenuOpen(false);
                    }}
                    className="text-lg font-medium hover:text-teal-400 transition-colors"
                  >
                    About
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="industrial-hero relative pt-28 sm:pt-36 text-white overflow-hidden bg-[#03121e]">
        <img
          src={`${import.meta.env.BASE_URL}images/industrial-hero.webp`}
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
          className="industrial-hero-image absolute inset-0 w-full h-full object-cover"
        />
        <div className="industrial-hero-shade absolute inset-0" aria-hidden="true" />
        <div className="px-4 sm:px-6 lg:px-8 relative max-w-7xl mx-auto w-full">
          <div className="max-w-[760px] pb-12 sm:pb-16 lg:pb-20">
            <p className="text-cyan-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-5">
              Industrial software. Intelligent systems.
            </p>
            <h1 id="hero-heading" className="text-[2.35rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block">Senior Industrial</span>{" "}
              <span className="block">Software &amp;</span>{" "}
              <span className="block text-cyan-300">Digitalization Engineer</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-[570px] mb-6">
              I build software connecting industrial assets, engineering information, and enterprise systems—with reliability and interoperability at the centre.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300 mb-8">
              <span className="font-semibold text-white">Co-Founder, Onesa UG</span>
              <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="w-4 h-4 text-cyan-300" /> Heidelberg, Germany</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="#projects" onClick={(e) => scrollToSection(e, "projects")} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-cyan-300 text-slate-950 font-semibold rounded-lg hover:bg-cyan-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
                View Projects <ChevronRight aria-hidden="true" className="w-4 h-4" />
              </a>
              <a href={`${import.meta.env.BASE_URL}resume/resume_download.pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/35 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
                View Resume <ExternalLink aria-hidden="true" className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/andrewgotora/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-3 text-slate-200 font-medium hover:text-cyan-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
                <Linkedin aria-hidden="true" className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 py-7 sm:py-8 border-t border-cyan-200/20">
            {[
              { icon: Factory, title: "Industrial IoT & Automation", description: "Connected assets. Interoperable systems." },
              { icon: BrainCircuit, title: "AI Platforms", description: "Open models. Self-managed infrastructure." },
              { icon: Cloud, title: "Cloud-Native Systems", description: "Reliable software. Secure delivery." },
            ].map((focus) => (
              <div key={focus.title} className="flex gap-3 items-start">
                <focus.icon aria-hidden="true" className="w-5 h-5 text-cyan-300 shrink-0 mt-1" />
                <div>
                  <h2 className="text-sm sm:text-base font-semibold tracking-normal mb-1">{focus.title}</h2>
                  <p className="text-sm text-slate-300">{focus.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speaking */}
      <section className="py-16 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="rounded-2xl overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="p-8 md:p-10 bg-gradient-to-br from-teal-500/20 to-blue-500/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                  <Mic2 className="w-4 h-4" /> Featured Speaker
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                  Enterprise Continuous Delivery &amp; Automation Summit 2026
                </h2>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p className="flex items-center gap-3"><CalendarDays className="w-4 h-4 text-teal-400 shrink-0" /> November 30 – December 1, 2026</p>
                  <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-teal-400 shrink-0" /> Maritim proArte Hotel, Berlin</p>
                </div>
                <a
                  href="https://www.we-conect.com/events/enterprise-continuous-delivery-automation-summit-2026/speakers/1fd0e561-a633-44e6-b578-00c5d13f63cd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-teal-300 hover:text-teal-200 transition-colors"
                >
                  View official speaker profile <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="p-8 md:p-10 space-y-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Case study · 09:00–09:25</p>
                  <h3 className="text-xl font-bold mb-2">Balancing Control and Flexibility</h3>
                  <p className="text-gray-400 leading-relaxed">Building modern delivery platforms for complex enterprise environments—combining governed core systems with modular architecture, APIs, secure automation, and CI/CD.</p>
                </div>
                <div className="pt-6 border-t border-slate-700">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Panel discussion · 18:00–18:45</p>
                  <h3 className="text-xl font-bold mb-2">AI in Highly Regulated Industries</h3>
                  <p className="text-gray-400 leading-relaxed">Exploring how enterprise AI governance can enable responsible experimentation, strengthen compliance, and accelerate innovation without compromising security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Light Ocean Blue Background */}
      <section id="projects" className="py-20 bg-[#E0F2FE]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-2">Industrial digitalization, enterprise integration, and applied AI in practice.</p>
            <p className="text-teal-600 font-bold text-sm animate-pulse">Click on projects below to discover more</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Factory IoT",
                sub: "Industrial Asset, Telemetry & Edge Platform",
                desc: "Production-oriented IoT platform spanning asset lifecycle management, AAS integration, durable MQTT telemetry, incident workflows, analytics, and secure edge gateways.",
                tech: ["React", "Node.js", ".NET 8", "PostgreSQL", "MQTT", "AAS"],
                link: "/projects/smart-factory-iot",
                color:"from-orange-500 to-red-500"
              },
              {
                title: "IMSOP",
                sub: "Supply Chain Operations & Telemetry Platform",
                desc: "Full-stack operations platform for shipment and order workflows, telemetry, analytics, mapping, role-based access, and extensible .NET microservices.",
                tech: ["React 19", "Node.js", ".NET 8", "REST/GraphQL", "MySQL", "Docker"],
                link: "/projects/imsop",
                color: "from-cyan-500 to-teal-500" 
              },
              {
                title: "Learning Hub",
                sub: "Enterprise AI Education Platform",
                desc: "Interactive learning hub for designing, prototyping, and deploying real-world AI solutions using a modern multi-tool ecosystem.",
                tech: ["Python", "OpenAI", "NVIDIA CUDA", "Azure AI", "SAP BTP AI Core", "AI/ML"],
                link: "/projects/sap-btp-ai-hub",
                color:"from-blue-500 to-indigo-500"
              }
            ].map((p, i) => (
              <Link key={i} href={p.link}>
                <a 
                  onClick={() => NavigationService.setFromFeaturedProjects()}
                  className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-blue-100 hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer will-change-transform"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${p.color}`}></div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">Project</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{p.title}</h3>
                    <p className="text-sm text-teal-600 font-semibold mb-4">{p.sub}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {p.tech.map((t, j) => (
                        <span key={j} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase tracking-wider">{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Onesa AI Platform */}
      <section id="onesa" aria-labelledby="onesa-heading" className="py-20 bg-[#E0F2FE]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 items-stretch">
            <div className="p-8 md:p-10 rounded-2xl bg-[#03121e] text-white border border-cyan-900/40">
              <span className="inline-flex px-3 py-1 mb-5 rounded-full bg-cyan-400/10 border border-cyan-300/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">In development</span>
              <h2 id="onesa-heading" className="text-3xl md:text-4xl font-bold mb-3">Onesa AI</h2>
              <p className="text-cyan-300 font-semibold mb-5">Co-Founder, Onesa UG · April 2026</p>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>I am developing a general-purpose, modular, self-hosted artificial intelligence platform for developing and deploying intelligent applications across European and international markets.</p>
                <p>Built on open-weight foundation models, Onesa AI is designed for conversational AI, agentic workflows, enterprise knowledge retrieval, multilingual and multimodal capabilities, and model customization and fine-tuning.</p>
                <p>The foundation model retains broad general-purpose capabilities. The fine-tuning strategy supports independently versioned specializations across domains, languages, and regions, with a shared API and application layer designed to adopt model changes without rebuilding the platform.</p>
              </div>
              <a href="mailto:andrewgotora@yahoo.com?subject=Onesa%20AI%20partnership" className="inline-flex items-center gap-2 mt-7 text-cyan-300 font-semibold hover:text-cyan-200 transition-colors">
                Discuss a partnership <ChevronRight aria-hidden="true" className="w-4 h-4" />
              </a>
            </div>
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Platform priorities</h3>
              <div className="space-y-4 text-slate-600 mb-7">
                <p><strong className="text-slate-900">AI sovereignty.</strong> Self-managed infrastructure with privacy, security, and European market readiness at the centre.</p>
                <p><strong className="text-slate-900">Efficient deployment.</strong> Efficient inference and scalable deployment across heterogeneous GPU infrastructure.</p>
                <p><strong className="text-slate-900">Adaptable applications.</strong> Manufacturing, industrial digitalization, tourism, and business services for enterprises, developers, institutions, and consumers.</p>
              </div>
              <div className="border-t border-blue-100 pt-6">
                <h3 className="text-base font-bold text-slate-900 mb-3">Proposed future profiles</h3>
                <p className="text-sm text-slate-600 mb-4">These are future model or application profiles, not implemented products. African-language and contextual adaptation is one possible regional specialization.</p>
                <ul className="flex flex-wrap gap-2" aria-label="Proposed Onesa profiles">
                  {["Onesa General", "Onesa Enterprise", "Onesa Industrial", "Onesa Travel", "Onesa Multilingual", "Onesa African Languages"].map((profile) => (
                    <li key={profile} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">{profile}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600">Also built: <a href="https://www.diasporaunlocked.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-900">Diaspora Unlocked</a>, a Zimbabwe diaspora-services platform.</p>
        </div>
      </section>

      {/* Skills Section - Light Ocean Blue Background */}
      <section id="skills" className="py-20 bg-[#F0F9FF]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">Electrical engineering, industrial software, cloud infrastructure, and applied AI—connecting operational technology with modern enterprise systems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-blue-50 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, j) => (
                    <span key={j} className="px-3 py-1.5 bg-blue-50/50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" aria-labelledby="experience-heading" className="py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="mb-10 max-w-3xl">
            <p className="text-teal-700 text-sm font-semibold uppercase tracking-wider mb-3">Professional experience</p>
            <h2 id="experience-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">A career connecting engineering and software.</h2>
            <p className="text-slate-600 text-lg">From electrical engineering and railway signalling to industrial digitalization, enterprise software delivery, and AI platforms.</p>
          </div>
          <div className="space-y-5">
            {professionalExperience.map((role) => (
              <article key={`${role.company}-${role.dateRange}`} className="p-6 sm:p-8 rounded-xl border border-slate-200 border-l-4 border-l-cyan-600 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-teal-700 mb-1">{role.company}{role.employmentType && <span className="font-normal text-slate-500"> · {role.employmentType}</span>}</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{role.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 shrink-0">{role.dateRange}</p>
                </div>
                {role.location && <p className="text-sm text-slate-500 mb-3">{role.location}</p>}
                <p className="text-slate-700 max-w-4xl">{role.description}</p>
                {role.status && <p className="mt-3 text-sm font-semibold text-teal-700">{role.status} · Proposed profiles are future plans.</p>}
                {role.responsibilities.length > 0 && (
                  <details className="mt-4 group">
                    <summary className="text-sm font-semibold text-teal-700 cursor-pointer w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">Role details</summary>
                    <ul className="mt-4 space-y-2 list-disc pl-5 text-sm text-slate-600 max-w-4xl">
                      {role.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                    </ul>
                  </details>
                )}
                <ul className="flex flex-wrap gap-2 mt-5" aria-label={`${role.company} focus areas`}>
                  {role.focus.map((focus) => <li key={focus} className="text-xs font-medium text-slate-600 px-2.5 py-1 rounded bg-white border border-slate-200">{focus}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="about" className="py-20 bg-[#E0F2FE]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">

              <div>
                 <div className="mb-8">
                  <p className="text-teal-700 text-sm font-semibold uppercase tracking-wider mb-3">About Andrew</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Engineering across the industrial and digital worlds.</h2>
                  <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                    <p>Over more than a decade, my career has progressed from railway signalling and electronic interlocking to Industrial IoT, distributed applications, and enterprise software delivery. I combine electrical engineering, industrial software, cloud infrastructure, and applied AI, with reliability and interoperability at the centre.</p>
                    <p>My experience spans C#/.NET, Python, JavaScript, REST APIs, microservices, Docker, and Kubernetes, alongside OPC UA, MQTT, Modbus, ThingWorx, and Kepware.</p>
                    <p>At BASF, I work as a <strong>Senior DevOps Engineer</strong>, supporting software engineering and enterprise delivery through Azure DevOps, CI/CD, Terraform, Azure Bicep, and secure cloud infrastructure. I live in Heidelberg and work remotely, assigned to the Berlin office with regular visits to Berlin.</p>
                    <p>I co-founded <strong>Onesa UG in April 2026</strong> and am developing Onesa AI. I welcome conversations about senior industrial software engineering, technical leadership, AI platforms, and partnerships that turn digital innovation into useful products.</p>
                  </div>
                  <a href="mailto:andrewgotora@yahoo.com" className="inline-flex items-center gap-2 mt-6 text-teal-700 font-semibold hover:text-teal-900 transition-colors"><Mail aria-hidden="true" className="w-4 h-4" /> Let’s talk</a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {principles.map((p, i) => (
                  <div key={i} className="p-6 bg-white rounded-xl border border-blue-50 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-all">
                        <p.icon className="w-5 h-5 text-teal-400" />
                      </div>
                      <h4 className="font-bold text-gray-900">{p.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
               ))}
              </div>

            </div>
            <div className="grid gap-6">
              {businessImpact.map((impact, i) => (
                <div key={i} className="p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 hover:border-teal-500/50 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-all">
                      <impact.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold">{impact.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{impact.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}images/profile.jpg`}
                alt="Andrew Gotora"
                className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
              />
              <span className="text-xl font-bold tracking-tight">Andrew Gotora</span>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/DruHustle" aria-label="Andrew Gotora on GitHub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/andrewgotora/" aria-label="Andrew Gotora on LinkedIn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:andrewgotora@yahoo.com" aria-label="Email Andrew Gotora" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">© 2026 Andrew Gotora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
