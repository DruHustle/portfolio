import { useEffect } from "react";
import { Link } from "wouter";
import {
  Activity,
  ArrowRight,
  Box,
  ExternalLink,
  FileText,
  FlaskConical,
  Layers3,
  LayoutGrid,
  MessageSquare,
  Network,
  ShieldCheck,
} from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { PageNavigation } from "@/components/PageNavigation";
import { SmartFactoryNetwork } from "@/components/SmartFactoryNetwork";
import { SmartFactoryTwin } from "@/components/SmartFactoryTwin";
import {
  smartFactoryCapabilities,
  smartFactoryGuides,
  smartFactoryProject,
} from "@/data/smartFactory";
import { demoUrl } from "@/lib/urls";
import { analyticsService } from "@/services/analyticsService";

const highlightIcons = [Box, Network, Layers3];
const capabilityIcons = {
  activity: Activity,
  layers: Layers3,
  shield: ShieldCheck,
  assistant: MessageSquare,
  demo: FlaskConical,
  health: Activity,
};

export default function SmartFactoryIoTDetail() {
  useEffect(() => {
    analyticsService.trackPageVisit("smart-factory-iot-detail");
    window.scrollTo(0, 0);
  }, []);
  const project = smartFactoryProject;
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white">
      <PageNavigation />
      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 py-16 lg:py-24">
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:items-center lg:px-8">
            <div className="lg:col-span-2">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400">
                <LayoutGrid aria-hidden="true" className="size-3" />
                Connected factory workspace
              </p>
              <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl">
                {project.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                {project.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={demoUrl("smart-factory-iot")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-orange-700 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-800"
                >
                  <ExternalLink aria-hidden="true" className="size-5" />
                  Live Demo
                </a>
                <Link
                  href="/projects/smart-factory/documentation"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-6 py-3 font-bold transition-colors hover:bg-slate-700"
                >
                  <FileText
                    aria-hidden="true"
                    className="size-5 text-orange-400"
                  />
                  Documentation
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {project.stats.map((highlight, index) => {
                const Icon = highlightIcons[index];
                return (
                  <div
                    key={highlight.label}
                    className="rounded-2xl border border-slate-600/60 bg-slate-800/60 p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        aria-hidden="true"
                        className="size-7 shrink-0 text-orange-400"
                      />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {highlight.label}
                        </p>
                        <p className="mt-1 text-2xl font-bold">
                          {highlight.value}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <section aria-labelledby="digital-twins" className="space-y-8">
            <div className="max-w-3xl space-y-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400">
                  Interactive digital twins
                </p>
                <h2
                  id="digital-twins"
                  className="text-3xl font-bold leading-tight sm:text-4xl"
                >
                  From the factory floor to component detail
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-300">
                Navigate a complete 3D factory, then open the equipment and
                components behind an observation. The native inspection
                workspace connects geometry, identity and explicitly mapped
                evidence.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:items-start">
              <div className="order-2 space-y-6 lg:order-1 lg:py-5">
                <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-orange-200">
                      Design the factory layout
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Place and rotate equipment in named zones, grab items to
                      rearrange them, pan the floor, enter fullscreen and save
                      layouts. A selectable floor plan provides an accessible
                      alternative.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-200">
                      Inspect the equipment
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Import GLB models with explicit component mappings. Select
                      parts, explode assemblies, reveal housings, inspect
                      cross-sections and restore saved viewpoints.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-200">
                      Keep the evidence attached
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Connect components to their declared telemetry sources,
                      annotations, documents and supported security findings.
                      Preserve those identities when a reviewed model revision
                      changes.
                    </p>
                  </div>
                </div>
                <a
                  href={smartFactoryGuides.layouts}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-orange-300 underline underline-offset-4 hover:text-orange-200"
                >
                  Factory layout guide{" "}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
              <div className="order-1 min-w-0 lg:order-2">
                <SmartFactoryTwin />
              </div>
            </div>
          </section>

          <SmartFactoryNetwork />

          <section aria-labelledby="platform-capabilities">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400">
                Beyond the dashboard
              </p>
              <h2
                id="platform-capabilities"
                className="text-3xl font-bold sm:text-4xl"
              >
                A connected operational workspace
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                {project.problemStatement}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {smartFactoryCapabilities.map(capability => {
                const Icon =
                  capabilityIcons[
                    capability.icon as keyof typeof capabilityIcons
                  ];
                return (
                  <article
                    key={capability.title}
                    className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 sm:p-7"
                  >
                    <Icon
                      aria-hidden="true"
                      className="mb-5 size-6 text-orange-400"
                    />
                    <h3 className="text-xl font-bold">{capability.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {capability.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            aria-labelledby="system-architecture"
            className="rounded-3xl border border-slate-700 bg-slate-800/40 p-5 sm:p-8 lg:p-10"
          >
            <h2
              id="system-architecture"
              className="text-center text-3xl font-bold"
            >
              System architecture
            </h2>
            <p className="mx-auto mb-8 mt-4 max-w-3xl text-center leading-relaxed text-slate-300">
              The Vercel interface connects to the Oracle ARM64 application API
              and a separate singleton telemetry/notification worker. Managed
              data services and the BaSyx asset runtime support the platform;
              industrial control stays on the factory network.
            </p>
            <ArchitectureDiagram
              path="docs/smartfactoryiot/architecture-1.svg"
              alt="Smart Factory architecture with Vercel, Oracle API and worker roles, edge acquisition, managed data and BaSyx"
              width={1200}
              height={800}
            />
          </section>

          <section aria-labelledby="engineering-stack">
            <h2 id="engineering-stack" className="mb-8 text-3xl font-bold">
              Engineering stack
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.solution.techStack.map(stack => (
                <div
                  key={stack.category}
                  className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6"
                >
                  <h3 className="mb-4 text-sm font-bold text-orange-300">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map(item => (
                      <span
                        key={item}
                        className="rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-1.5 text-xs font-semibold text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="machine-to-decision">
            <h2 id="machine-to-decision" className="mb-8 text-3xl font-bold">
              From machine to decision
            </h2>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {project.implementation.map(step => (
                <li
                  key={step.phase}
                  className="rounded-2xl border border-slate-700 p-6"
                >
                  <span className="text-sm font-bold text-orange-400">
                    {step.duration}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{step.phase}</h3>
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
