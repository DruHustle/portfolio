/**
 * Projects Data Module
 * 
 * This module follows SOLID principles:
 * - Single Responsibility: Manages project data structure and definitions
 * - Open/Closed: Easy to extend with new projects without modifying existing code
 * - Liskov Substitution: All projects conform to the same interface
 * - Interface Segregation: Projects only expose necessary properties
 * - Dependency Inversion: Components depend on this data interface, not hardcoded values
 */

export interface ProjectTag {
  label: string;
  color: "cyan" | "blue" | "purple" | "green" | "red" | "indigo";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  tags: ProjectTag[];
  link?: string;
  isExternal?: boolean;
  gradient: {
    from: string;
    to: string;
  };
}

export const projects: Project[] = [
  {
    id: "smart-factory",
    title: "Smart Factory",
    subtitle: "Digital Twins, Industrial Networks & Operations",
    description:
      "Interactive factory digital twins, telemetry evidence, OT cybersecurity and AAS asset lifecycle, with a Node-RED/Python edge candidate and FX/TSN diagnostics.",
    tags: [
      { label: "React (Vite)", color: "cyan" },
      { label: ".NET 10", color: "cyan" },
      { label: "Three.js", color: "cyan" },
      { label: "OPC UA FX", color: "cyan" },
      { label: "TSN", color: "cyan" },
      { label: "Node.js", color: "cyan" },
      { label: "PostgreSQL", color: "cyan" },
      { label: "CloudAMQP", color: "cyan" },
      { label: "AAS", color: "cyan" },
      { label: "BaSyx", color: "cyan" },
      { label: "Docker", color: "cyan" },
      { label: "TypeScript", color: "cyan" },
      { label: "Redis", color: "cyan" },
      { label: "MQTT", color: "cyan" },
    ],
    link: "/projects/smart-factory",
    gradient: {
      from: "from-cyan-500",
      to: "to-blue-600",
    },
  },
  {
    id: "smart-logistics",
    title: "Smart Logistics",
    subtitle: "Supply Chain Visibility, Exceptions & Purchasing",
    description:
      "Shipment and warehouse operations, audit-ready exception handling, purchasing and fleet/GPS sensor integration candidates with source-aware analysis.",
    tags: [
      { label: "React 19", color: "purple" },
      { label: "Node.js", color: "purple" },
      { label: ".NET 8", color: "purple" },
      { label: "YARP", color: "purple" },
      { label: "REST API", color: "purple" },
      { label: "Aiven PostgreSQL", color: "purple" },
      { label: "Signed events", color: "purple" },
      { label: "Docker", color: "purple" },
      { label: "GitHub Actions", color: "purple" },
    ],
    link: "/projects/smart-logistics",
    gradient: {
      from: "from-purple-500",
      to: "to-indigo-600",
    },
  },
  {
    id: "smart-farmer",
    title: "Smart Farmer",
    subtitle: "Connected Agriculture, Livestock & Rural Commerce",
    description:
      "Offline-first crop and livestock operations, irrigated equipment, private cameras, marketplace and machinery hire across independent mobile and web apps.",
    tags: [
      { label: "React Native", color: "green" },
      { label: "Node.js", color: "green" },
      { label: "PostgreSQL", color: "green" },
      { label: "MQTT / Modbus", color: "green" },
      { label: "ONVIF", color: "green" },
      { label: "Offline sync", color: "green" },
      { label: "iOS / Android", color: "green" },
    ],
    link: "/projects/smart-farmer",
    gradient: {
      from: "from-emerald-500",
      to: "to-green-700",
    },
  },
  {
    id: "sap-btp-ai-hub",
    title: "Learning Hub",
    description:
      "Interactive AI learning hub for designing, prototyping, and deploying real-world solutions using a modern multi-tool ecosystem — including .NET, SAP BTP, NVIDIA technologies, and cloud AI services — featuring hands-on tutorials, an API playground, and a visual architecture builder.",
    tags: [
      { label: "React", color: "blue" },
      { label: "Python", color: "cyan" },
      { label: "TypeScript", color: "blue" },
      { label: "SAP BTP", color: "blue" },
      { label: "AI/ML", color: "blue" },
      { label: "API Development", color: "blue" },
      { label: "GitHub Pages", color: "blue" },
    ],
    link: "/projects/sap-btp-ai-hub",
    gradient: {
      from: "from-blue-600",
      to: "to-indigo-700",
    },
  },
];

/**
 * Get a project by ID
 * Follows Open/Closed Principle: Can be extended with caching or API calls
 */
export function getProjectById(id: string): Project | undefined {
  const canonicalId = id === "imsop" ? "smart-logistics" : id === "smart-factory-iot" ? "smart-factory" : id;
  return projects.find((project) => project.id === canonicalId);
}

/**
 * Get all projects
 * Follows Single Responsibility: Data retrieval is isolated
 */
export function getAllProjects(): Project[] {
  return projects;
}
