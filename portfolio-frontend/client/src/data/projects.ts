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
    id: "smart-factory-iot",
    title: "Smart Factory",
    subtitle: "Digital Twins, Industrial Networks & Operations",
    description:
      "Interactive 3D factory layouts and equipment inspection, OPC UA FX/TSN diagnostics, AAS lifecycle, source-aware telemetry, OT security and operational investigations.",
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
    id: "imsop",
    title: "IMSOP",
    subtitle: "Supply Chain Visibility, Exceptions & Purchasing",
    description:
      "Shipment visibility, durable exception review, purchase orders and warehouse receiving, with scoped analytics, maps, signed logistics intake and record-grounded assistance.",
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
    link: "/projects/imsop",
    gradient: {
      from: "from-purple-500",
      to: "to-indigo-600",
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
  return projects.find((project) => project.id === id);
}

/**
 * Get all projects
 * Follows Single Responsibility: Data retrieval is isolated
 */
export function getAllProjects(): Project[] {
  return projects;
}
