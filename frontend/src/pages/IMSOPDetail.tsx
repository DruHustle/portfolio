import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Link } from "wouter";
import {
  ExternalLink,
  Server,
  Shield,
  Zap,
  BarChart3,
  Database,
  Globe,
  FileText,
} from "lucide-react";
import { useMemo, useEffect } from "react";
import { PageNavigation } from "@/components/PageNavigation";
import { demoUrl } from "@/lib/urls";
import { analyticsService } from "@/services/analyticsService";

export default function IMSOPDetail() {
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
      problemStatement:
        "Supply chain teams need a unified view of shipments, orders, telemetry, operational performance, and geographic activity. Fragmented tools make it difficult to coordinate workflows, investigate delays, enforce access controls, and evolve integrations without coupling the user experience to one backend implementation.",
      requirements: [
        "Shipment, order, telemetry, analytics, and reporting workflows",
        "JWT authentication with role-based application access",
        "REST APIs for the deployed application and GraphQL in the .NET gateway",
        "Containerized services with repeatable CI/CD and cloud deployment",
      ],
      solution: {
        architecture: [
          {
            title: "Experience",
            desc: "React dashboard, charts, maps, exports",
            icon: Globe,
          },
          {
            title: "Application API",
            desc: "Node.js, Express, TypeScript, REST",
            icon: Server,
          },
          {
            title: "Identity",
            desc: "JWT, bcrypt, RBAC, protected routes",
            icon: Shield,
          },
          {
            title: "Operations",
            desc: "Shipments, orders, telemetry, reports",
            icon: BarChart3,
          },
          {
            title: ".NET Services",
            desc: "Gateway, supply chain, operations",
            icon: Zap,
          },
          {
            title: "Persistence",
            desc: "Managed PostgreSQL; Node and EF Core models",
            icon: Database,
          },
        ],
        techStack: [
          {
            category: "Frontend",
            items: [
              "React 19",
              "TypeScript",
              "Vite",
              "Tailwind CSS",
              "Recharts",
              "Google Maps / OpenStreetMap",
            ],
          },
          {
            category: "Application API",
            items: [
              "Node.js",
              "Express",
              "TypeScript",
              "Drizzle ORM",
              "Zod",
              "JWT",
              "bcrypt",
            ],
          },
          {
            category: ".NET Backend",
            items: [
              ".NET 8",
              "ASP.NET Core",
              "HotChocolate GraphQL",
              "SignalR",
              "Entity Framework Core",
            ],
          },
          {
            category: "Data",
            items: [
              "Aiven PostgreSQL",
              "Separate Node / EF Core migrations",
              "Telemetry and operations schemas",
            ],
          },
          {
            category: "Infrastructure",
            items: [
              "Docker",
              "Kubernetes manifests",
              "Terraform",
              "Azure Bicep",
              "Oracle Cloud",
              "Vercel",
              "GitHub Pages",
            ],
          },
          {
            category: "Delivery & Quality",
            items: [
              "GitHub Actions",
              "Azure DevOps",
              "Vitest",
              "Playwright",
              "Health endpoints",
            ],
          },
        ],

        implementation: [
          {
            phase: "Foundation",
            duration: "Delivered",
            description:
              "Build the React operations experience, application routing, dashboards, maps, exports, and reusable UI system.",
          },
          {
            phase: "Core Services",
            duration: "Delivered",
            description:
              "Implement the Node/Express REST API, JWT authentication, PostgreSQL persistence, shipment, order, and telemetry endpoints.",
          },
          {
            phase: "Service Architecture",
            duration: "Implemented",
            description:
              "Develop the companion .NET gateway, supply-chain, and operations services with GraphQL, SignalR, and PostgreSQL support.",
          },
          {
            phase: "Production",
            duration: "Deployed",
            description:
              "Containerize services, add health checks and automated tests, and release the Oracle backend independently from the Vercel and GitHub Pages frontend.",
          },
        ],
      },
      results: [
        "Unified shipment, order, telemetry, analytics, and mapping experience",
        "Authenticated REST workflows with role-aware access controls",
        "Extensible .NET gateway and domain-service architecture",
        "CSV/PDF reporting and operational visualization",
        "Automated test, container, and deployment workflows",
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <PageNavigation />

      <main id="main-content" tabIndex={-1}>
        <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 py-16 lg:py-24 border-b border-slate-800">
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Server className="w-3 h-3" /> Enterprise Platform
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white">
                  {projectData.title}
                </h1>
                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                  {projectData.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  {/* Possible future use of GitHub link
                <a href="https://github.com/DruHustle/imsop-app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-300 text-slate-950 font-bold rounded-xl hover:bg-cyan-200 transition-all">
                  <Github className="w-5 h-5" /> Source Code
                </a>
                 */}

                  <a
                    href={demoUrl("imsop")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-300 text-slate-950 font-bold rounded-xl hover:bg-cyan-200 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>

                  <Link
                    href="/projects/imsop/documentation"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    <FileText className="w-5 h-5 text-cyan-400" /> Documentation
                  </Link>
                </div>
              </div>
              <div className="grid gap-4">
                {projectData.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-6"
                  >
                    <stat.icon className="w-8 h-8 text-cyan-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
          {/* Problem & Requirements */}
          <section className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                Problem Statement
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                {projectData.problemStatement}
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                Core Requirements
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {projectData.requirements.map((req, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 shrink-0"></div>
                    <p className="text-slate-400 text-sm">{req}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* System Architecture */}
          <section className="bg-slate-800/40 rounded-3xl p-4 sm:p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              System Architecture
            </h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">
              Vercel delivery, Oracle-hosted application services, signed
              logistics integrations, and managed PostgreSQL.
            </p>
            <div className="overflow-hidden">
              <ArchitectureDiagram
                path="images/imsop_system_architecture_v3.webp"
                alt="IMSOP system architecture with Vercel, Oracle Caddy ingress, Node and .NET services, managed PostgreSQL, and signed logistics events"
                width={1672}
                height={941}
              />
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Tech Stack */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {projectData.solution.techStack.map((stack, i) => (
                  <div
                    key={i}
                    className="p-6 bg-slate-900 border border-slate-800 rounded-2xl"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
                      {stack.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((item, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-300"
                        >
                          {item}
                        </span>
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
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl"
                  >
                    <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
                    <p className="text-sm font-medium text-slate-300">
                      {result}
                    </p>
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
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
                >
                  <div className="sm:w-[100px] text-xs font-bold text-cyan-400 uppercase">
                    {phase.duration}
                  </div>
                  <div className="sm:w-[140px] text-xl font-bold text-white">
                    {phase.phase}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-12 text-center">
        <p className="text-slate-400 text-sm">
          © 2026 Andrew Gotora. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
