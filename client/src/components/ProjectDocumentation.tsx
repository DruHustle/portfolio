import { useEffect } from "react";
import { FileText } from "lucide-react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { PageNavigation } from "@/components/PageNavigation";
import { assetUrl } from "@/lib/urls";

interface Guide {
  title: string;
  description: string;
  name: string;
}

interface ProjectDocumentationProps {
  project: string;
  slug: string;
  directory: string;
  description: string;
  guides: Guide[];
  accent: "cyan" | "orange";
}

const operationalGuides: Guide[] = [
  {
    title: "Deployment Guide",
    description:
      "Visual hosting map, local setup, configuration boundaries, release sequence, verification, and rollback.",
    name: "deployment",
  },
  {
    title: "System Diagrams",
    description:
      "Rendered runtime, identity, data, integration, and release flows with explanations of each boundary.",
    name: "system-diagrams",
  },
];

/** Both projects share guide formats, navigation, and visual treatment. */
export function ProjectDocumentation({
  project,
  slug,
  directory,
  description,
  guides,
  accent,
}: ProjectDocumentationProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const color =
    accent === "orange"
      ? {
          text: "text-orange-400",
          border: "hover:border-orange-500/40",
          badge: "bg-orange-500/10 border-orange-500/20 text-orange-400",
          header: "via-orange-950",
        }
      : {
          text: "text-cyan-400",
          border: "hover:border-cyan-500/40",
          badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
          header: "via-blue-950",
        };
  const path = (name: string, extension: string) =>
    assetUrl(`/docs/${directory}/${name}.${extension}`);
  const card = (guide: Guide, visual = false) => {
    const Heading = visual ? "h3" : "h2";
    return (
      <article
        key={guide.name}
        className={`flex flex-col overflow-hidden rounded-2xl bg-slate-800/40 border border-slate-700/50 transition-colors ${color.border}`}
      >
        {visual && (
          <a
            href={path(guide.name, "html")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Preview ${guide.title}`}
            className="block bg-slate-100 p-4"
          >
            <img
              src={path(`${guide.name}-1`, "svg")}
              alt={`${project} ${guide.title.toLowerCase()} overview`}
              loading="lazy"
              width={800}
              height={400}
              className="w-full h-48 object-contain"
            />
          </a>
        )}
        <div className="flex flex-col flex-1 p-6 sm:p-8">
          <Heading className="flex items-center gap-3 text-2xl font-bold mb-3">
            <FileText
              aria-hidden="true"
              className={`size-6 shrink-0 ${color.text}`}
            />
            <span>{guide.title}</span>
          </Heading>
          <p className="text-slate-400 mb-7 leading-relaxed text-sm">
            {guide.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-3">
            <a
              href={path(guide.name, "html")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-700/50 font-bold rounded-xl hover:bg-slate-600"
            >
              View
            </a>
            <a
              href={path(guide.name, "pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-700/30 font-bold rounded-xl hover:bg-slate-600"
            >
              PDF
            </a>
          </div>
        </div>
      </article>
    );
  };
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <PageNavigation
        backHref={`/projects/${slug}`}
        backLabel="Back to Project"
      />
      <main id="main-content" tabIndex={-1}>
        <header
          className={`bg-gradient-to-br from-slate-900 ${color.header} to-slate-900 py-16 border-b border-slate-800`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 ${color.badge}`}
            >
              <FileText aria-hidden="true" className="size-3" /> Engineering
              Documentation
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              {project} Documentation
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guides.map(guide => card(guide))}
          </div>
          <section className="mt-12" aria-labelledby="operational-guides">
            <h2 id="operational-guides" className="text-2xl font-bold mb-3">
              Operational Guides
            </h2>
            <p className="text-slate-400 mb-6">
              Explore deployment and system flows as visual guides.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {operationalGuides.map(guide => card(guide, true))}
            </div>
          </section>
          <section
            className="mt-16 p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50"
            aria-labelledby="system-architecture"
          >
            <h2
              id="system-architecture"
              className="text-3xl font-bold mb-4 text-center"
            >
              System Architecture
            </h2>
            <p className="text-slate-400 mb-8 text-center">
              Current hosting, application services, and external data
              boundaries.
            </p>
            <div className="rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900 p-3 sm:p-6">
              <ArchitectureDiagram
                path={`docs/${directory}/architecture-1.svg`}
                alt={`${project} Architecture`}
                width={1200}
                height={800}
              />
            </div>
          </section>
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
