import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Github, Cpu, Shield, Zap, BarChart3, Cloud, Database, FileText, Bell } from "lucide-react";
import { useMemo, useEffect } from "react";
import { useNavigationState } from "@/hooks/useNavigationState";
import { safeSessionStorage } from "@/lib/storage";
import { analyticsService } from "@/services/analyticsService";

export default function SmartFactoryIoTDetail() {
  const { showBackButton } = useNavigationState();
  
  useEffect(() => {
    analyticsService.trackPageVisit("smart-factory-iot-detail");
    window.scrollTo(0, 0);
  }, []);

  const projectData = useMemo(
    () => ({
      title: "Smart Factory IoT",
      subtitle: "Real-Time Industrial Monitoring & Control Platform",
      description:
        "A production-oriented industrial IoT platform for asset lifecycle management, durable telemetry, incident response, analytics, and bounded machine control. It combines a Vercel-hosted React UI and API proxy with a scalable Render web tier, a singleton telemetry and notification worker, five .NET services, managed PostgreSQL and Redis, MQTT edge gateways, and an OAuth-protected BaSyx AAS runtime.",
      stats: [
        { label: "Services", value: "6", icon: Zap },
        { label: "Edge Transport", value: "MQTT TLS", icon: Shield },
        { label: "Asset Standard", value: "AAS", icon: Bell },
      ],
      problemStatement: "Manufacturing facilities require real-time visibility into equipment status and production metrics. Traditional systems lack live updates, secure device management, and the scalability needed for modern industrial environments.",
      requirements: [
        "Durable MQTT telemetry with replay-safe ingestion and an outbox",
        "Role-aware incident, notification, and confirmed-downtime workflows",
        "Secure Pi gateways plus eligible direct MQTT devices over TLS",
        "AAS creation, import, versioning, registry, and standards API integration",
        "PostgreSQL-backed asset, identity, telemetry, and audit data",
      ],
      solution: {
        architecture: [
          { title: "Frontend", desc: "React + Vite", icon: Cpu },
          { title: "Public API", desc: "Node.js + Express + tRPC", icon: Cloud },
          { title: "Private Services", desc: "Five .NET services", icon: Zap },
          { title: "Messaging", desc: "CloudAMQP + MQTT TLS", icon: BarChart3 },
          { title: "Data", desc: "Aiven PostgreSQL + Redis", icon: Database },
          { title: "Standards", desc: "AAS + OAuth gateway", icon: Shield },
        ],
        techStack: [
          { category: "Frontend", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "React Context"] },
          { category: "Backend", items: ["Node.js", "Express", "tRPC", ".NET 8", "ASP.NET Core", "REST", "WebSocket"] },
          { category: "IoT & Edge", items: ["CloudAMQP", "MQTT TLS", "Raspberry Pi", "ESP32 WROVER", "OPC UA", "Modbus", "Serial"] },
          { category: "Data", items: ["Aiven PostgreSQL", "Drizzle ORM", "Redis Cloud", "Durable Outbox"] },
          { category: "Assets & Security", items: ["BaSyx", "AAS Core 3.1", "AASX", "CAEX 3.0", "OIDC/OAuth 2.0", "RBAC", "HttpOnly JWT"] },
          { category: "Delivery", items: ["Vercel", "Render Web + Worker", "Docker", "Supervisor", "GitHub Actions", "Immutable Multi-Repo Images"] },
        ],
        implementation: [
          {
            phase: "Foundation",
            duration: "Weeks 1–4",
            description: "Establish the React dashboard, Node API, PostgreSQL model, account roles, asset workflows, and source-pinned CI/CD foundation.",
          },
          {
            phase: "Core Platform",
            duration: "Weeks 5–10",
            description: "Build five .NET services for device management, telemetry, identity, analytics, and durable notifications, then divide them between scalable web and singleton worker roles.",
          },
          {
            phase: "Data Processing",
            duration: "Weeks 11–14",
            description: "Connect Pi gateways and direct devices through CloudAMQP, add replay-safe telemetry ingestion and outbox delivery, and persist dashboard and service data in PostgreSQL.",
          },
          {
            phase: "Optimization",
            duration: "Weeks 15–18",
            description: "Add AAS/AASX lifecycle workflows, revision-safe edits, OAuth-protected BaSyx APIs, Redis-backed cross-instance events, grounded AI assistance, asset analytics, and role-aware incident operations.",
          },
          {
            phase: "Production",
            duration: "Weeks 19–20",
            description: "Release one immutable multi-repository image to the Render worker and scalable web tiers, deploy the prebuilt UI to Vercel, validate readiness, secure service credentials, and document recovery and scaling limits.",
          },
        ],
      },

      results: [
        "Durable, replay-tolerant telemetry from gateway and direct MQTT devices",
        "Versioned AAS lifecycle with AASX import, CAEX export, audit history, and OAuth standards gateway",
        "Role-aware incident ownership, explicit downtime confirmation, and durable inbox/email notifications",
        "Source-pinned delivery across three repositories with independently scalable web and singleton worker roles",
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 max-w-7xl mx-auto w-full">
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="Andrew Gotora" className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover" />
              <span className="text-lg font-bold tracking-tight hidden sm:inline">Andrew Gotora</span>
            </a>
          </Link>
          {showBackButton && (
            <Link href="/">
              <a 
                onClick={() => {
                  // Store intent to scroll to projects
                  safeSessionStorage.setItem('scrollToProjects', 'true');
                }}
                className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </a>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 py-16 lg:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Cpu className="w-3 h-3" /> IoT & Edge Computing
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">{projectData.title}</h1>
              <p className="text-xl font-medium text-slate-300 mb-8 leading-relaxed">{projectData.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                {/* possible future use of GitHub link
                <a href="https://github.com/DruHustle/smart-factory-iot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-all hover:scale-105">
                  <Github className="w-5 h-5" /> GitHub Repo
                </a>
                  */}
                  <a href={
                      typeof window !== "undefined" 
                        ? window.location.hostname.includes("github.io")
                          ? "https://DruHustle.github.io/smart-factory-iot/"
                          : window.location.hostname.includes("vercel.app")
                            ? "https://smart-factory-iot-app.vercel.app/"
                            : window.location.origin // Fallback for localhost (e.g., http://localhost:3000)
                        : "#"
                    }
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>

                <Link href="/projects/smart-factory-iot/documentation">
                  <a className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all hover:scale-105 border border-slate-700">
                    <FileText className="w-5 h-5 text-orange-400" /> Documentation 
                  </a>
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {projectData.stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm flex items-center gap-6">
                  <stat.icon className="w-8 h-8 text-orange-400" />
                  <div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Problem & Requirements */}
        <section className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-8 h-1 bg-orange-500 rounded-full"></span> Problem Statement
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">{projectData.problemStatement}</p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-8 h-1 bg-orange-500 rounded-full"></span> Core Requirements
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {projectData.requirements.map((req, i) => (
                <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  </div>
                  <p className="text-slate-300 text-sm font-medium">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="bg-slate-800/40 rounded-3xl p-8 md:p-12 border border-slate-700/50">
          <h2 className="text-3xl font-bold mb-10 text-center">System Architecture</h2>
          <div className="overflow-hidden">
            <img 
              src={`${import.meta.env.BASE_URL}images/smart_factory_arch.png`}
              alt="Smart Factory IoT split production architecture with factory edge, CloudAMQP, Render web and worker tiers, and managed cloud services"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </section>

        {/* Tech Stack & Key Results */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold">Tech Stack</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {projectData.solution.techStack.map((stack, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">{stack.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, j) => (
                      <span key={j} className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/50 text-xs font-bold text-slate-300">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Key Results</h2>
            <div className="space-y-6">
              {projectData.results.map((result, i) => (
                <div key={i} className="flex gap-5 p-6 bg-white/10 rounded-2xl border border-white/20">
                  <Zap className="w-6 h-6 text-white shrink-0" />
                  <p className="text-lg font-bold leading-tight">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Implementation Roadmap */}
        <div className="lg:col-span-2 space-y-8">
        <h2 className="text-3xl font-bold">Implementation Roadmap</h2>
        <div className="flex flex-col gap-6">
          {projectData.solution.implementation.map((phase, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="sm:w-[100px] text-xs font-bold text-orange-400 uppercase">{phase.duration}</div>
              <div className="sm:w-[140px] text-xl font-bold text-white">{phase.phase}</div>
              <p className="text-sm text-slate-400 leading-relaxed flex-1">{phase.description}</p>
            </div>
          ))}
            </div>
          </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-center">
        <p className="text-slate-500 font-medium">© 2026 Andrew Gotora. All rights reserved.</p>
      </footer>
    </div>
  );
}
