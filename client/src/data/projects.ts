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
    id: "imsop",
    title: "IMSOP",
    subtitle: "Intelligent Multi-Cloud Supply Chain & Operations Platform",
    description:
      "Enterprise-grade microservices architecture with 7 bounded contexts, serving 10M+ requests per day with 99.99% uptime SLA.",
    tags: [
      { label: ".NET Core", color: "cyan" },
      { label: "Python", color: "cyan" },
      { label: "Kubernetes", color: "cyan" },
      { label: "Azure", color: "cyan" },
      { label: "AWS", color: "cyan" },
      { label: "Kafka", color: "cyan" },
      { label: "Terraform", color: "cyan" },
    ],
    link: "/projects/imsop",
    gradient: {
      from: "from-cyan-500",
      to: "to-teal-600",
    },
  },
  {
    id: "sap-btp-ai-hub",
    title: "SAP BTP AI Learning Hub",
    description:
      "Interactive learning platform with hands-on tutorials, AI playground, and architecture builder for mastering SAP Business Technology Platform AI solutions.",
    tags: [
      { label: "React", color: "blue" },
      { label: "TypeScript", color: "blue" },
      { label: "SAP BTP", color: "blue" },
      { label: "AI/ML", color: "blue" },
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
