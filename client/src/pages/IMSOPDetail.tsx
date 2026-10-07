import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Github, Server, Shield, Zap, BarChart3, Database, Globe, FileText } from "lucide-react";
import { useMemo, useEffect } from "react";
import { useNavigationState } from "@/hooks/useNavigationState";
import { safeSessionStorage } from "@/lib/storage";
import { analyticsService } from "@/services/analyticsService";

export default function IMSOPDetail() {
  const { showBackButton } = useNavigationState();
  
  useEffect(() => {
    analyticsService.trackPageVisit("imsop-detail");
    window.scrollTo(0, 0);
  }, []);

  const projectData = useMemo(
    () => ({
      title: "IMSOP",
      subtitle: "Supply Chain Operations, Telemetry & Integration Platform",
      description:
        "A full-stack platform for supply chain visibility and operational workflows. IMSOP combines a React dashboard with shipment, order, telemetry, analytics, mapping, reporting, and role-based access features; a Node/Express REST API provides the deployed application backend, while a companion .NET 8 solution models gateway, supply-chain, and operations microservices with GraphQL and SignalR.",
      stats: [
        { label: "Frontend", value: "React 19", icon: Shield },
        { label: "APIs", value: "REST + GraphQL", icon: Zap },
        { label: "Services", value: "Node + .NET", icon: BarChart3 },
      ],
      problemStatement: "Supply chain teams need a unified view of shipments, orders, telemetry, operational performance, and geographic activity. Fragmented tools make it difficult to coordinate workflows, investigate delays, enforce access controls, and evolve integrations without coupling the user experience to one backend implementation.",
      requirements: [
        "Shipment, order, telemetry, analytics, and reporting workflows",
        "JWT authentication with role-based application access",
        "REST APIs for the deployed application and GraphQL in the .NET gateway",
        "Containerized services with repeatable CI/CD and cloud deployment",
      ],
      solution: {
        architecture: [
          { title: "Experience", desc: "React dashboard, charts, maps, exports", icon: Globe },
          { title: "Application API", desc: "Node.js, Express, TypeScript, REST", icon: Server },
          { title: "Identity", desc: "JWT, bcrypt, RBAC, protected routes", icon: Shield },
          { title: "Operations", desc: "Shipments, orders, telemetry, reports", icon: BarChart3 },
          { title: ".NET Services", desc: "Gateway, supply chain, operations", icon: Zap },
          { title: "Persistence", desc: "Aiven MySQL and PostgreSQL service model", icon: Database },
        ],
        techStack: [
          { category: "Frontend", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "Google Maps / OpenStreetMap"] },
          { category: "Application API", items: ["Node.js", "Express", "TypeScript", "Drizzle ORM", "Zod", "JWT", "bcrypt"] },
          { category: ".NET Backend", items: [".NET 8", "ASP.NET Core", "HotChocolate GraphQL", "SignalR", "Entity Framework Core"] },
          { category: "Data", items: ["Aiven MySQL", "PostgreSQL", "Telemetry and operations schemas"] },
          { category: "Infrastructure", items: ["Docker", "Kubernetes manifests", "Terraform", "Azure Bicep", "Render", "GitHub Pages"] },
          { category: "Delivery & Quality", items: ["GitHub Actions", "Azure DevOps", "Vitest", "Playwright", "Health endpoints"] },
        ],
          
        implementation: [
        {
          phase: "Foundation",
          duration: "Delivered",
          description: "Build the React operations experience, application routing, dashboards, maps, exports, and reusable UI system.",
        },
        {
          phase: "Core Services",
          duration: "Delivered",
          description: "Implement the Node/Express REST API, JWT authentication, Aiven MySQL persistence, shipment, order, and telemetry endpoints.",
        },
        {
          phase: "Service Architecture",
          duration: "Implemented",
          description: "Develop the companion .NET gateway, supply-chain, and operations services with GraphQL, SignalR, and PostgreSQL support.",
        },
        {
          phase: "Production",
          duration: "Automated",
          description: "Containerize services, add health checks and automated tests, and deliver through GitHub Actions with Render and static frontend hosting.",
        },
      ],

      },
      results: [
        "Unified shipment, order, telemetry, analytics, and mapping experience",
        "Authenticated REST workflows with role-aware access controls",
        "Extensible .NET gateway and domain-service architecture",
        "CSV/PDF reporting and operational visualization",
        "Automated test, container, and deployment workflows"
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 max-w-7xl mx-auto w-full">
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="Andrew Gotora" className="w-10 h-10 rounded-full border-2 border-cyan-500 object-cover" />
              <span className="text-lg font-bold tracking-tight hidden sm:inline">Andrew Gotora</span>
            </a>
          </Link>
          {showBackButton && (
            <Link href="/">
              <a 
                onClick={() => safeSessionStorage.setItem('scrollToProjects', 'true')}
                className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </a>
            </Link>
          )}
        </div>
      </nav>

      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 py-16 lg:py-24 border-b border-slate-800">
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Server className="w-3 h-3" /> Enterprise Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white">{projectData.title}</h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">{projectData.subtitle}</p>
              <div className="flex flex-wrap gap-4">
               {/* Possible future use of GitHub link
                <a href="https://github.com/DruHustle/imsop-app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-all">
                  <Github className="w-5 h-5" /> Source Code
                </a>
                 */}  

                  <a href={
                      typeof window !== "undefined" 
                        ? window.location.hostname.includes("github.io")
                          ? "https://DruHustle.github.io/imsop-app/"
                          : window.location.hostname.includes("vercel.app")
                            ? "https://imsop-app.vercel.app/"
                            : window.location.origin // Fallback for localhost (e.g., http://localhost:3000)
                        : "#"
                    }
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>

                <Link href="/projects/imsop/documentation">
                  <a className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all border border-slate-700">
                    <FileText className="w-5 h-5 text-cyan-400" /> Documentation
                  </a>
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {projectData.stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-6">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
            {/* Problem & Requirements */}  
        <section className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Problem Statement</h2>
            <p className="text-slate-400 text-lg leading-relaxed">{projectData.problemStatement}</p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Core Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {projectData.requirements.map((req, i) => (
                <div key={i} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex gap-3">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 shrink-0"></div>
                  <p className="text-slate-400 text-sm">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      {/* System Architecture */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">System Architecture</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden">
            <img 
              src={`${import.meta.env.BASE_URL}images/imsop_arch.png`} 
              alt="IMSOP Architecture" 
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Tech Stack */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {projectData.solution.techStack.map((stack, i) => (
                <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">{stack.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, j) => (
                      <span key={j} className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-300">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
              {/* Project Results */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Key Results</h2>
            <div className="space-y-4">
              {projectData.results.map((result, i) => (
                <div key={i} className="flex gap-4 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
                  <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
                  <p className="text-sm font-medium text-slate-300">{result}</p>
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
                <div className="sm:w-[100px] text-xs font-bold text-cyan-400 uppercase">{phase.duration}</div>
                <div className="sm:w-[140px] text-xl font-bold text-white">{phase.phase}</div>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="border-t border-slate-800 py-12 text-center">
        <p className="text-slate-500 text-sm">© 2026 Andrew Gotora. All rights reserved.</p>
      </footer>
    </div>
  );
}
