import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { PageNavigation } from "@/components/PageNavigation";
import { assetUrl } from "@/lib/urls";
import { FileText, Download, Eye } from "lucide-react";
import { useEffect } from "react";

const docs = [
  {
    title: "Architecture Overview",
    description:
      "Architecture blueprint covering the React client, application APIs, .NET service model, data stores, integration boundaries, and cloud deployment options.",
    mdPath: "/docs/imsop/architecture.md",
    pdfPath: "/docs/imsop/architecture.pdf",
  },
  {
    title: "Database Schema",
    description:
      "Data-model reference for organizations, users, suppliers, products, inventory, orders, shipments, telemetry, and analytics.",
    mdPath: "/docs/imsop/database-schema.md",
    pdfPath: "/docs/imsop/database-schema.pdf",
  },
  {
    title: "API Flows",
    description:
      "Technical flows for authentication, supply-chain operations, telemetry, analytics, permissions, shipment tracking, and reporting.",
    mdPath: "/docs/imsop/api-flows.md",
    pdfPath: "/docs/imsop/api-flows.pdf",
  },
];

export default function IMSOPDocumentation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <PageNavigation backHref="/projects/imsop" backLabel="Back to Project" />

      {/* Header */}
      <main id="main-content" tabIndex={-1}>
        <header className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 border-b border-slate-800">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              <FileText className="w-3 h-3" /> Project Assets
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              IMSOP Documentation
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Technical specifications and architecture blueprints for IMSOP's
              supply-chain operations, telemetry, integration, and cloud
              deployment model.
            </p>
          </div>
        </header>

        {/* Docs Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {docs.map((doc, i) => (
              <div
                key={i}
                className="flex flex-col p-6 sm:p-8 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={assetUrl(doc.pdfPath)}
                      download
                      className="size-11 inline-flex items-center justify-center rounded-lg bg-slate-700/50 text-slate-300 hover:bg-cyan-500 hover:text-white transition-all"
                      aria-label={`Download ${doc.title} PDF`}
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {doc.title}
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {doc.description}
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <a
                    href={assetUrl(doc.pdfPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700/50 text-white font-bold rounded-xl hover:bg-slate-600 transition-all"
                  >
                    <Eye className="w-4 h-4" /> View Online
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Diagrams Section */}
          <section className="mt-16 p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
            <h2 className="text-3xl font-bold mb-4 text-center">
              System Architecture
            </h2>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-center">
              High-level overview of the IMSOP client, API, service, data, and
              integration architecture.
            </p>
            <div className="rounded-2xl overflow-hidden border border-slate-600/50">
              <ArchitectureDiagram
                path="images/imsop_arch.webp"
                alt="IMSOP Architecture"
                width={3120}
                height={1576}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-center">
        <p className="text-slate-400 font-medium">
          © 2026 Andrew Gotora. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
