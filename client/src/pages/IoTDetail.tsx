import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Github, Cpu, Shield, Zap, BarChart3, Cloud, Globe, Camera } from "lucide-react";
import { useMemo, useEffect } from "react";

export default function IoTDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projectData = useMemo(
    () => ({
      title: "Azure Smart Guardian",
      subtitle: "Edge-to-Cloud IoT Security & Environmental Monitoring",
      description:
        "A sophisticated IoT ecosystem leveraging Raspberry Pi 5 as an Edge Gateway and ESP32 nodes for remote sensing and surveillance. The system integrates with Azure IoT Hub for real-time telemetry, automated alerting, and cloud-based image storage.",
      stats: [
        { label: "Latency", value: "<200ms", icon: Zap },
        { label: "Connectivity", value: "MQTT/TLS", icon: Shield },
        { label: "Storage", value: "Azure Blob", icon: Cloud },
      ],
      problemStatement: "Traditional security systems often lack integrated environmental monitoring and are difficult to scale across remote locations. There is a need for a unified platform that combines visual surveillance with real-time sensor data at the edge.",
      requirements: [
        "Real-time temperature and humidity monitoring",
        "Motion-triggered image capture and cloud upload",
        "Edge-based data processing to reduce cloud costs",
        "Secure, encrypted communication between nodes and gateway",
      ],
      solution: {
        architecture: [
          { title: "Edge Node", desc: "ESP32-WROVER-E, DHT11, Camera", icon: Cpu },
          { title: "Gateway", desc: "Raspberry Pi 5, Azure IoT Edge", icon: Server },
          { title: "Communication", desc: "MQTT over TLS 1.3", icon: Globe },
          { title: "Cloud Hub", desc: "Azure IoT Hub, Device Provisioning", icon: Cloud },
          { title: "Processing", desc: "Azure Stream Analytics", icon: BarChart3 },
          { title: "Storage", desc: "Azure Blob Storage (Images)", icon: Database },
          { title: "Alerting", desc: "Azure Logic Apps (Email/SMS)", icon: Zap },
        ],
        techStack: [
          { category: "Hardware", items: ["Raspberry Pi 5", "ESP32-WROVER-E", "DHT11 Sensor", "OV2640 Camera"] },
          { category: "Edge Software", items: ["Python", "C++ (Arduino)", "Docker", "Azure IoT Edge Runtime"] },
          { category: "Cloud Services", items: ["Azure IoT Hub", "Stream Analytics", "Blob Storage", "Logic Apps"] },
          { category: "Protocols", items: ["MQTT", "HTTPS", "AMQP", "WebSockets"] },
        ],
      },
      implementation: [
        {
          phase: "Edge Development",
          duration: "Weeks 1-3",
          description: "Develop ESP32 firmware for sensor data acquisition and camera integration. Implement MQTT client with TLS.",
        },
        {
          phase: "Gateway Setup",
          duration: "Weeks 4-6",
          description: "Configure Raspberry Pi 5 with Azure IoT Edge. Implement custom modules for local data filtering and image buffering.",
        },
        {
          phase: "Cloud Integration",
          duration: "Weeks 7-9",
          description: "Set up Azure IoT Hub, Stream Analytics jobs, and Blob Storage containers. Configure Logic Apps for automated alerting.",
        },
        {
          phase: "Testing & Optimization",
          duration: "Weeks 10-12",
          description: "Perform end-to-end latency testing, optimize power consumption for edge nodes, and refine motion detection algorithms.",
        },
      ],
      results: [
        "Real-time environmental monitoring with <200ms latency",
        "Automated security alerts with image attachments",
        "30% reduction in cloud bandwidth via edge filtering",
        "Scalable architecture supporting 100+ remote nodes",
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
              <img src="images/profile.jpg" alt="Andrew Gotora" className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover" />
              <span className="text-lg font-bold tracking-tight hidden sm:inline">Andrew Gotora</span>
            </a>
          </Link>
          <a href="#projects" className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </a>
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
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-400 transition-all hover:scale-105 opacity-50 cursor-not-allowed">
                  <Github className="w-5 h-5" /> Coming Soon
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-400 font-bold rounded-xl hover:bg-orange-500/10 transition-all hover:scale-105 opacity-50 cursor-not-allowed">
                  <ExternalLink className="w-5 h-5" /> Case Study
                </button>
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
          <h2 className="text-3xl font-bold mb-10 text-center">IoT Architecture</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {projectData.solution.architecture.map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-all group">
                <item.icon className="w-6 h-6 text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xs font-bold text-white uppercase tracking-tighter">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap & Tech Stack */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold">Implementation Roadmap</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {projectData.implementation.map((phase, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-xs font-bold text-orange-400 uppercase mb-2">{phase.duration}</div>
                  <h4 className="text-xl font-bold text-white mb-3">{phase.phase}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Tech Stack</h2>
            <div className="space-y-6">
              {projectData.solution.techStack.map((stack, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400">{stack.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, j) => (
                      <span key={j} className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs font-bold text-slate-300">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <section className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-10 text-center">Projected Impact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projectData.results.map((result, i) => (
              <div key={i} className="flex gap-5 p-6 bg-white/10 rounded-2xl border border-white/20">
                <Zap className="w-6 h-6 text-white shrink-0" />
                <p className="text-lg font-bold leading-tight">{result}</p>
              </div>
            ))}
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
