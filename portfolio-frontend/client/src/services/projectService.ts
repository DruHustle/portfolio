import { imsopProject } from "@/data/imsop";
import { smartFactoryProject } from "@/data/smartFactory";
import type { LucideIcon } from "lucide-react";

/**
 * Project Data Service
 * Implements Single Responsibility Principle by separating data from components
 */

export interface ProjectStat {
  label: string;
  value: string;
  icon: LucideIcon | null;
}

export interface ArchitectureItem {
  title: string;
  desc: string;
  icon: LucideIcon | null;
}

export interface TechStackItem {
  category: string;
  items: string[];
}

export interface ImplementationPhase {
  phase: string;
  duration: string;
  description: string;
}

export interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  stats: ProjectStat[];
  problemStatement: string;
  requirements: string[];
  solution: {
    architecture: ArchitectureItem[];
    techStack: TechStackItem[];
  };
  implementation: ImplementationPhase[];
  results: string[];
}

/**
 * Project service - handles all project-related data operations
 * Follows Dependency Inversion Principle by exposing interfaces
 */
export class ProjectService {
  /**
   * Get project data by ID
   * @param projectId - The project identifier
   * @returns Project data or null if not found
   */
  static getProjectById(projectId: string): ProjectData | null {
    const projects: Record<string, ProjectData> = {
      imsop: this.getIMSOPProject(),
      'sap-btp-ai-hub': this.getSAPBTPProject(),
      'smart-factory-iot': this.getSmartFactoryIoTProject(),
    };

    return Object.hasOwn(projects, projectId) ? projects[projectId] : null;
  }

  private static getIMSOPProject(): ProjectData {
    return imsopProject;
  }

  private static getSAPBTPProject(): ProjectData {
    return {
      title: 'Learning Hub',
      subtitle: 'Enterprise AI Education Platform',
      description:
        'An interactive, comprehensive learning platform designed for mastering AI business solutions on using different AI technologies. The platform provides hands-on tutorials, best practices, and resources for developers, architects, and business professionals.',
      stats: [
        { label: 'Tutorials', value: '6+', icon: null },
        { label: 'Learning Paths', value: '3', icon: null },
        { label: 'Interactive Tools', value: '4+', icon: null },
      ],
      problemStatement:
        'Organizations face significant challenges in adopting AI solutions due to a lack of comprehensive, hands-on learning resources and a steep learning curve for AI technologies. There is a need for an interactive platform that provides practical tutorials and tools to facilitate learning and experimentation with AI in business contexts.',
      requirements: [
        'Provide comprehensive tutorials for all skill levels',
        'Create interactive playground for LLM experimentation',
        'Enable hands-on learning with code and diagrams',
        'Deliver production-ready, responsive user interface',
      ],
      solution: {
        architecture: [
          { title: 'Frontend', desc: 'React 19 with TypeScript', icon: null },
          { title: 'Styling', desc: 'Tailwind CSS 4', icon: null },
          { title: 'UI Components', desc: 'shadcn/ui library', icon: null },
          { title: 'Animations', desc: 'Framer Motion', icon: null },
          { title: 'Code', desc: 'Syntax highlighting', icon: null },
          { title: 'Diagrams', desc: 'Mermaid integration', icon: null },
          { title: 'Routing', desc: 'Wouter for navigation', icon: null },
        ],
        techStack: [
          { category: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui'] },
          { category: 'Tooling', items: ['Vite', 'pnpm', 'ESLint', 'Prettier'] },
          { category: 'Libraries', items: ['Wouter', 'Framer Motion', 'Mermaid'] },
          { category: 'Deployment', items: ['GitHub Pages', 'GitHub Actions'] },
        ],
      },
      implementation: [
        {
          phase: 'Foundation',
          duration: 'Weeks 1-2',
          description: 'Establish project structure, design system, and component library using React and Tailwind.',
        },
        {
          phase: 'Tutorial System',
          duration: 'Weeks 3-5',
          description: 'Develop tutorial content structure and rendering system with markdown support.',
        },
        {
          phase: 'Interactive Features',
          duration: 'Weeks 6-7',
          description: 'Build interactive playground and architecture builder with Mermaid integration.',
        },
        {
          phase: 'Polish',
          duration: 'Weeks 8-9',
          description: 'Optimize performance, add animations, and refine UX for all device sizes.',
        },
      ],
      results: [
        '6+ comprehensive tutorials delivered',
        '98+ Lighthouse performance score',
        'Interactive playground and quiz system',
        'Fully responsive mobile-first design',
      ],
    };
  }

  private static getSmartFactoryIoTProject(): ProjectData {
    return smartFactoryProject;
  }
}
