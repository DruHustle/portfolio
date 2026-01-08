import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Github, BookOpen, Code2, Layers, Award, Zap, Smartphone } from "lucide-react";
import { useMemo } from "react";

export default function SAPBTPAIHubDetail() {
  const projectData = useMemo(
    () => ({
      title: "SAP BTP AI Learning Hub",
      subtitle: "Enterprise AI Education Platform",
      description:
        "An interactive, comprehensive learning platform designed for mastering AI business solutions on SAP Business Technology Platform (BTP). The platform provides hands-on tutorials, best practices, and resources for developers, architects, and business professionals.",
      stats: [
        { label: "Tutorials", value: "6+", icon: BookOpen },
        { label: "Learning Paths", value: "3", icon: Layers },
        { label: "Interactive Tools", value: "4+", icon: Code2 },
      ],
      problemStatement: `Organizations face significant challenges in adopting AI solutions on SAP BTP:

• Lack of comprehensive, hands-on learning resources for SAP BTP AI services
• Steep learning curve for developers unfamiliar with SAP AI Core and Generative AI Hub
• Limited practical examples and best practices documentation
• No interactive playground for experimenting with LLMs before production deployment
• Difficulty understanding AI architecture patterns and integration approaches`,
      requirements: [
        "Provide comprehensive tutorials covering beginner to advanced topics",
        "Create interactive playground for experimenting with LLMs",
        "Enable hands-on learning with code examples and architecture diagrams",
        "Support progress tracking and knowledge verification through quizzes",
        "Deliver production-ready, responsive user interface",
        "Ensure fast load times and optimal performance",
        "Make content easily accessible and searchable",
      ],
      solution: {
        architecture: [
          { title: "Frontend Framework", desc: "React 19 with TypeScript for type-safe component development", icon: Code2 },
          { title: "Styling System", desc: "Tailwind CSS 4 for responsive, utility-first design", icon: Layers },
          { title: "UI Components", desc: "shadcn/ui for consistent, accessible component library", icon: Smartphone },
          { title: "Animations", desc: "Framer Motion for smooth, engaging transitions", icon: Zap },
          { title: "Code Highlighting", desc: "Syntax highlighting for code examples", icon: Code2 },
          { title: "Diagrams", desc: "Mermaid integration for architecture and flow diagrams", icon: Layers },
        ],
        techStack: [
          { category: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui"] },
          { category: "Tooling", items: ["Vite", "pnpm", "ESLint", "Prettier"] },
          { category: "Libraries", items: ["Wouter", "Framer Motion", "Mermaid"] },
          { category: "Deployment", items: ["GitHub Pages", "GitHub Actions"] },
        ],
      },
      implementation: [
        {
          phase: "Phase 1: Foundation & Setup",
          duration: "Weeks 1-2",
          description: "Establish project structure, design system, and component library",
          details: "Created React project with Vite, configured Tailwind CSS, implemented shadcn/ui component system, set up routing with Wouter, and established design tokens.",
        },
        {
          phase: "Phase 2: Tutorial System",
          duration: "Weeks 3-5",
          description: "Develop tutorial content structure and rendering system",
          details: "Implemented tutorial system with markdown support, created tutorial card components, built tutorial detail page with progress tracking, and integrated quiz system.",
        },
        {
          phase: "Phase 3: Interactive Features",
          duration: "Weeks 6-7",
          description: "Build interactive playground and architecture builder",
          details: "Created API playground component for testing LLM endpoints, built architecture builder with drag-and-drop interface, integrated Mermaid for diagram rendering, and added code editor with syntax highlighting.",
        },
        {
          phase: "Phase 4: Polish & Optimization",
          duration: "Weeks 8-9",
          description: "Optimize performance, add animations, and refine UX",
          details: "Implemented Framer Motion animations, optimized bundle size, added search functionality, created certificate system for completed tutorials, and performed cross-browser testing.",
        },
      ],
      results: [
        "Delivered comprehensive learning platform with 6+ tutorials covering beginner to advanced topics",
        "Achieved 98+ Lighthouse performance score with optimized bundle size",
        "Implemented interactive features including playground, architecture builder, and quiz system",
        "Created responsive design supporting desktop, tablet, and mobile devices",
        "Enabled progress tracking and knowledge verification for learners",
        "Built reusable component library following shadcn/ui patterns",
      ],
      features: [
        { title: "Comprehensive Tutorials", description: "6 progressive tutorials from Getting Started with SAP BTP Trial to Advanced Custom AI Models", icon: BookOpen },
        { title: "Interactive Playground", description: "Hands-on API playground for experimenting with LLM endpoints and prompt engineering", icon: Code2 },
        { title: "Architecture Builder", description: "Visual tool for designing and understanding SAP BTP AI architecture patterns", icon: Layers },
        { title: "Quiz System", description: "Knowledge verification through interactive quizzes with progress tracking", icon: Award },
        { title: "Code Examples", description: "Production-ready code examples with syntax highlighting and explanations", icon: Code2 },
        { title: "Responsive Design", description: "Mobile-first design supporting all device sizes with smooth animations", icon: Smartphone },
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 max-w-7xl mx-auto w-full">
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/profile.jpg"
                alt="Andrew Gotora"
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              />
              <span className="text-lg font-bold tracking-tight hidden sm:inline">
                Andrew Gotora
              </span>
            </a>
          </Link>
          <Link href="/#projects">
            <a className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </a>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
          <div className="grid grid-cols-8 h-full w-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/10"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <BookOpen className="w-3 h-3" />
              AI Education Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight break-words">
              {projectData.title}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-8 leading-relaxed">
              {projectData.subtitle}
            </p>
            <p className="text-lg text-slate-400 leading-relaxed text-justify max-w-2xl">
              {projectData.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            {projectData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* Problem & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Problem Statement
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
              {projectData.problemStatement}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              Core Requirements
            </h2>
            <div className="grid gap-4">
              {projectData.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-slate-700 font-medium">{req}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Solution Architecture */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Platform Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.solution.architecture.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <item.icon className="w-6 h-6 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl font-bold mb-12 text-center">Technology Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectData.solution.techStack.map((stack, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.features.map((feature, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                <feature.icon className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Timeline */}
        <section>
          <h2 className="text-3xl font-bold mb-12 text-center">Implementation Roadmap</h2>
          <div className="space-y-8">
            {projectData.implementation.map((phase, idx) => (
              <div
                key={idx}
                className="group relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-5 gap-8 items-start">
                  <div className="md:col-span-1 mb-4 md:mb-0">
                    <div className="text-sm font-bold text-blue-600 uppercase tracking-tighter">{phase.duration}</div>
                    <div className="text-xl font-extrabold text-slate-900">{phase.phase}</div>
                  </div>
                  <div className="md:col-span-4 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:border-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/5 transition-all duration-500">
                    <h4 className="text-lg font-bold mb-3 text-slate-900">{phase.description}</h4>
                    <p className="text-slate-600 leading-relaxed">{phase.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results & Impact */}
        <section className="bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Project Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectData.results.map((result, idx) => (
              <div
                key={idx}
                className="flex gap-5 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg font-medium leading-relaxed">{result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="text-center py-10">
          <h2 className="text-3xl font-bold mb-8">Explore the Project</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://github.com/andrewgotora/sap-btp-ai-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-slate-900/20"
            >
              <Github className="w-5 h-5" />
              Source Code
            </a>
            <a
              href="https://andrewgotora.github.io/sap-btp-ai-hub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-600/20"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demonstration
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 font-medium">
            © 2026 Andrew Gotora. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
