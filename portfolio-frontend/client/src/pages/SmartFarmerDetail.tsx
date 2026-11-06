import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Camera,
  CloudOff,
  Droplets,
  ExternalLink,
  FileText,
  PawPrint,
  Tractor,
  Wheat,
} from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { PageNavigation } from "@/components/PageNavigation";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { smartFarmerCapabilities, smartFarmerProject } from "@/data/smartFarmer";
import { analyticsService } from "@/services/analyticsService";

const highlightIcons = [Wheat, Droplets, Tractor];
const farmerGuide = "https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/status.md";
const capabilityIcons = {
  irrigation: Droplets,
  animals: PawPrint,
  market: Tractor,
  reports: BarChart3,
  security: Camera,
  offline: CloudOff,
};

export default function SmartFarmerDetail() {
  useEffect(() => {
    analyticsService.trackPageVisit("smart-farmer-detail");
    window.scrollTo(0, 0);
  }, []);
  const project = smartFarmerProject;
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      <PageNavigation />
      <main id="main-content" tabIndex={-1}>
        <section className="relative border-b border-slate-800 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 py-16 lg:py-24">
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <Wheat aria-hidden="true" className="size-3" />
                  Farm Operations
                </div>
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="mb-8 text-xl leading-relaxed text-slate-400">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/DruHustle/smart-farmer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-200"
                  >
                    <ExternalLink aria-hidden="true" className="size-5" />
                    Source repository
                  </a>
                  <Link
                    href="/projects/smart-farmer/documentation"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-bold text-white transition-colors hover:bg-slate-700"
                  >
                    <FileText
                      aria-hidden="true"
                      className="size-5 text-cyan-400"
                    />
                    Documentation
                  </Link>
                </div>
              </div>
              <ProjectHighlights
                highlights={project.stats}
                icons={highlightIcons}
                accent="cyan"
              />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:space-y-16 lg:px-8 lg:py-16">
          <section aria-labelledby="farmer-capabilities" className="space-y-6">
            <div className="max-w-4xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">
                Connected farm workflows
              </p>
              <h2
                id="farmer-capabilities"
                className="text-3xl font-bold text-white"
              >
                From field work to farm-wide decisions
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                {project.description}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {smartFarmerCapabilities.map(capability => {
                const Icon =
                  capabilityIcons[
                    capability.icon as keyof typeof capabilityIcons
                  ];
                return (
                  <article
                    key={capability.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                  >
                    <Icon
                      aria-hidden="true"
                      className="mb-4 size-6 text-cyan-400"
                    />
                    <h3 className="text-xl font-bold text-white">
                      {capability.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {capability.description}
                    </p>
                  </article>
                );
              })}
            </div>
            <a
              href={farmerGuide}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
            >
              Current capability guide{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </section>

          <section
            aria-labelledby="farmer-architecture"
            className="rounded-3xl border border-slate-700/50 bg-slate-800/40 p-5 sm:p-8"
          >
            <h2
              id="farmer-architecture"
              className="mb-4 text-center text-3xl font-bold text-white"
            >
              System Architecture
            </h2>
            <p className="mx-auto mb-6 max-w-3xl text-center leading-relaxed text-slate-400">
              Independent web and native clients connect to the farm-scoped API,
              PostgreSQL and private media. Farm gateways validate equipment and
              camera observations. Production hosting, physical commissioning
              and payment-provider activation remain separate release gates.
            </p>
            <ArchitectureDiagram
              path="images/smart_farmer_arch.svg"
              alt="Smart Farmer software architecture: independent web and native clients, farm API, PostgreSQL, private media and equipment gateways"
              width={1440}
              height={920}
            />
          </section>

          <section aria-labelledby="farmer-stack">
            <h2 id="farmer-stack" className="mb-6 text-3xl font-bold text-white">
              Engineering stack
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.solution.techStack.map(stack => (
                <div
                  key={stack.category}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >
                  <h3 className="mb-4 text-sm font-bold text-cyan-300">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map(item => (
                      <span
                        key={item}
                        className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="farmer-workflow">
            <h2
              id="farmer-workflow"
              className="mb-6 text-3xl font-bold text-white"
            >
              From field records to farm decisions
            </h2>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {project.implementation.map(step => (
                <li
                  key={step.phase}
                  className="rounded-2xl border border-slate-800 p-6"
                >
                  <span className="text-sm font-bold text-cyan-400">
                    {step.duration}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white">
                    {step.phase}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-400">
        <p>© 2026 Andrew Gotora. All rights reserved.</p>
      </footer>
    </div>
  );
}
