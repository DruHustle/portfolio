import { useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight, BarChart3, BookOpen, Camera, CloudOff, Droplets,
  ExternalLink, FileText, PawPrint, Tractor, Wheat,
} from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { PageNavigation } from "@/components/PageNavigation";
import { ProjectHighlights } from "@/components/ProjectHighlights";
import { smartFarmerCapabilities, smartFarmerGuides, smartFarmerProject } from "@/data/smartFarmer";
import { analyticsService } from "@/services/analyticsService";

const highlightIcons = [Wheat, Droplets, ShoppingBag];
const capabilityIcons = {
  irrigation: Droplets,
  animals: PawPrint,
  security: Camera,
  market: Tractor,
  offline: CloudOff,
  reports: BarChart3,
};

export default function SmartFarmerDetail() {
  useEffect(() => {
    analyticsService.trackPageVisit("smart-farmer-detail");
    window.scrollTo(0, 0);
  }, []);
  const project = smartFarmerProject;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <PageNavigation />
      <main id="main-content" tabIndex={-1}>
        <header className="border-b border-emerald-700/20 bg-gradient-to-br from-emerald-950/80 via-slate-950 to-slate-950 py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            <div className="lg:col-span-2">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-200">
                <Wheat aria-hidden="true" className="size-4" /> Agricultural operations
              </p>
              <h1 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
              <p className="max-w-2xl text-xl leading-relaxed text-slate-300">{project.subtitle}</p>
              <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">{project.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects/smart-farmer/documentation"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-400"
                >
                  <FileText aria-hidden="true" className="size-5" /> Documentation
                </Link>
                <a
                  href="https://github.com/DruHustle/smart-farmer"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:border-emerald-400"
                >
                  <ExternalLink aria-hidden="true" className="size-5" /> Source repository
                </a>
              </div>
              <p className="mt-6 text-sm text-emerald-200">Software candidate: physical farm equipment and payment providers are not claimed as live or commissioned.</p>
            </div>
            <ProjectHighlights highlights={project.stats} icons={highlightIcons} accent="cyan" />
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:space-y-16 lg:px-8 lg:py-16">
          <section aria-labelledby="farmer-capabilities">
            <div className="mb-8 max-w-3xl">
              <h2 id="farmer-capabilities" className="mb-4 text-3xl font-bold sm:text-4xl">From field work to farm-wide decisions</h2>
              <p className="leading-relaxed text-slate-300">{project.problemStatement}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {smartFarmerCapabilities.map(capability => {
                const Icon = capabilityIcons[capability.icon as keyof typeof capabilityIcons];
                return (
                  <article key={capability.title} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
                    <Icon aria-hidden="true" className="mb-4 size-7 text-emerald-300" />
                    <h3 className="text-xl font-bold">{capability.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{capability.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="farmer-architecture" className="rounded-3xl border border-slate-700 bg-slate-900/70 p-4 sm:p-8">
            <h2 id="farmer-architecture" className="text-center text-3xl font-bold">System architecture</h2>
            <p className="mx-auto mb-8 mt-4 max-w-3xl text-center leading-relaxed text-slate-300">
              Separate native and web clients, a farm-scoped API, private storage and independent edge gateways.
              Local control and camera credentials remain behind the trusted farm boundary.
            </p>
            <ArchitectureDiagram path="images/smart_farmer_arch.svg"
              alt="Smart Farmer software architecture: independent web and native apps, API, PostgreSQL, private media, edge gateways, irrigation equipment and cameras"
              width={1440} height={920} />
          </section>

          <section aria-labelledby="farmer-workflow">
            <h2 id="farmer-workflow" className="mb-7 text-3xl font-bold">How the platform works</h2>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {project.implementation.map(step => (
                <li key={step.duration} className="rounded-2xl border border-slate-700 bg-slate-900/40 p-6">
                  <span className="font-bold text-emerald-300">{step.duration}</span>
                  <h3 className="mt-3 text-lg font-bold">{step.phase}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="farmer-stack">
            <h2 id="farmer-stack" className="mb-7 text-3xl font-bold">Engineering stack</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.solution.techStack.map(group => (
                <article key={group.category} className="rounded-2xl border border-slate-700 p-6">
                  <h3 className="mb-4 font-bold text-emerald-300">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">{group.items.map(item => (
                    <span key={item} className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-200">{item}</span>
                  ))}</div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="farmer-guides">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="farmer-guides" className="text-3xl font-bold">Engineering references</h2>
              <Link href="/projects/smart-farmer/documentation"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-200 underline underline-offset-4">
                <BookOpen aria-hidden="true" className="size-5" /> Browse documentation <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {smartFarmerGuides.map(guide => (
                <a key={guide.title} href={guide.url} target="_blank" rel="noopener noreferrer"
                  className="rounded-xl border border-slate-700 bg-slate-900/40 p-5 hover:border-emerald-500">
                  <h3 className="font-bold">{guide.title} <ExternalLink aria-hidden="true" className="inline size-4" /></h3>
                  <p className="mt-2 text-sm text-slate-300">{guide.description}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-400">
        <p>© 2026 Andrew Gotora. All rights reserved.</p>
      </footer>
    </div>
  );
}
