import { Link } from "wouter";
import { ArrowLeft, FileText, Download, Eye, ExternalLink } from "lucide-react";
import { useEffect } from "react";

const docs = [
  {
    title: "Project Overview (README)",
    description: "Comprehensive overview of the IMSOP platform, its goals, and high-level features.",
    mdPath: "/docs/README.md",
    pdfPath: "/docs/README.pdf",
  },
  {
    title: "Design Document",
    description: "Detailed technical design, including system architecture and bounded contexts.",
    mdPath: "/docs/DESIGN.md",
    pdfPath: "/docs/DESIGN.pdf",
  },
  {
    title: "Requirements Specification",
    description: "Functional and non-functional requirements for the enterprise-grade platform.",
    mdPath: "/docs/REQUIREMENTS.md",
    pdfPath: "/docs/REQUIREMENTS.pdf",
  },
  {
    title: "API Documentation",
    description: "Technical specification for REST and GraphQL APIs used across the platform.",
    mdPath: "/docs/API_DOCUMENTATION.md",
    pdfPath: "/docs/API_DOCUMENTATION.pdf",
  },
];

export default function Documentation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 max-w-7xl mx-auto w-full">
          <Link href="/projects/imsop">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="Andrew Gotora" className="w-10 h-10 rounded-full border-2 border-cyan-500 object-cover" />
              <span className="text-lg font-bold tracking-tight hidden sm:inline">Andrew Gotora</span>
            </a>
          </Link>
          <Link href="/projects/imsop">
            <a className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to IMSOP
            </a>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 border-b border-slate-800">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
            <FileText className="w-3 h-3" /> Project Assets
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">IMSOP Documentation</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Technical specifications, design patterns, and architectural blueprints for the Intelligent Multi-Cloud Supply Chain platform.
          </p>
        </div>
      </header>

      {/* Docs Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {docs.map((doc, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="flex gap-2">
                  <a 
                    href={doc.pdfPath} 
                    download 
                    className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-cyan-500 hover:text-white transition-all"
                    title="Download PDF"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{doc.title}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">{doc.description}</p>
              <div className="flex gap-4">
                <a 
                  href={doc.pdfPath} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-all"
                >
                  <Eye className="w-4 h-4" /> View Online
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Diagrams Section */}
        <section className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 text-center">
          <h2 className="text-3xl font-bold mb-4">System Diagrams</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Visual representations of the platform's high-level architecture and data flow.
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <img 
              src="/docs/diagrams/high_level_architecture.png" 
              alt="High Level Architecture" 
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a 
                href="/docs/diagrams/high_level_architecture.png" 
                target="_blank" 
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-5 h-5" /> View Full Resolution
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-center">
        <p className="text-slate-500 font-medium">© 2026 Andrew Gotora. All rights reserved.</p>
      </footer>
    </div>
  );
}
