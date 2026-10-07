/**
 * Project Data Service
 * Implements Single Responsibility Principle by separating data from components
 */

export interface ProjectStat {
  label: string;
  value: string;
  icon: any;
}

export interface ArchitectureItem {
  title: string;
  desc: string;
  icon: any;
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

    return projects[projectId] || null;
  }

  private static getIMSOPProject(): ProjectData {
    return {
      title: 'IMSOP',
      subtitle: 'Supply Chain Operations, Telemetry & Integration Platform',
      description:
        'A full-stack operations platform combining a React dashboard, Node/Express REST API, shipment and telemetry workflows, analytics, mapping, JWT/RBAC, and an extensible .NET microservices backend.',
      stats: [
        { label: 'Frontend', value: 'React 19', icon: null },
        { label: 'APIs', value: 'REST + GraphQL', icon: null },
        { label: 'Services', value: 'Node + .NET', icon: null },
      ],
      problemStatement:
        'The organization faced critical challenges in managing legacy monolithic systems that couldn\'t scale with growing demand. Peak traffic loads exceeding 5M requests per day caused frequent outages and high operational costs.',
      requirements: [
        'Unify shipment, order, telemetry, analytics, and reporting workflows',
        'Protect application operations with JWT and role-based access',
        'Support deployed REST APIs and an extensible GraphQL service gateway',
        'Automate testing, containers, and cloud delivery',
      ],
      solution: {
        architecture: [
          { title: 'Experience', desc: 'React dashboards, maps, charts, exports', icon: null },
          { title: 'Application API', desc: 'Node.js, Express, TypeScript, REST', icon: null },
          { title: 'Identity', desc: 'JWT, bcrypt, RBAC, protected routes', icon: null },
          { title: 'Operations', desc: 'Shipments, orders, telemetry, reports', icon: null },
          { title: '.NET Services', desc: 'Gateway, supply chain, operations', icon: null },
          { title: 'Persistence', desc: 'MySQL and PostgreSQL service models', icon: null },
        ],
        techStack: [
          { category: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Recharts', 'Google Maps'] },
          { category: 'Backend', items: ['Node.js', 'Express', '.NET 8', 'GraphQL', 'SignalR'] },
          { category: 'Data', items: ['Aiven MySQL', 'PostgreSQL', 'Drizzle ORM', 'EF Core'] },
          { category: 'Delivery', items: ['Docker', 'GitHub Actions', 'Azure DevOps', 'Terraform', 'Azure Bicep'] },
        ],
      },
      implementation: [
        {
          phase: 'Foundation',
          duration: 'Weeks 1-4',
          description: 'Set up cloud infrastructure, establish CI/CD pipelines, and deploy initial microservices framework.',
        },
        {
          phase: 'Core Services',
          duration: 'Weeks 5-12',
          description: 'Develop and deploy core business services with event-driven communication using Azure Service Bus.',
        },
        {
          phase: 'Optimization',
          duration: 'Weeks 13-16',
          description: 'Integrate all services, optimize performance, and implement distributed tracing with App Insights.',
        },
        {
          phase: 'Production',
          duration: 'Weeks 17-20',
          description: 'Deploy to production, implement security hardening, and establish operational procedures.',
        },
      ],
      results: [
        'Unified operations, telemetry, analytics, and mapping experience',
        'Authenticated REST workflows with role-aware access',
        'Extensible .NET gateway and domain-service architecture',
        'Automated test, container, and deployment workflows',
      ],
    };
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
    return {
      title: 'Smart Factory IoT Dashboard',
      subtitle: 'Real-Time Industrial IoT Monitoring & Analytics Platform',
      description:
        'A production-oriented industrial IoT platform for asset lifecycle management, durable MQTT telemetry, incident response, analytics, notifications, and secure edge integration.',
      stats: [
        { label: 'Services', value: '6 Processes', icon: null },
        { label: 'Edge Transport', value: 'MQTT TLS', icon: null },
        { label: 'Asset Standard', value: 'AAS', icon: null },
      ],
      problemStatement:
        'Manufacturing facilities require real-time visibility into equipment status, environmental conditions, and production metrics. Traditional systems lack live updates, flexible alerting, and the ability to organize devices by production zones.',
      requirements: [
        'Durable replay-safe telemetry ingestion from gateway and direct MQTT devices',
        'Role-aware incident ownership, notifications, and downtime confirmation',
        'AAS creation, import, versioning, registry, and standards API integration',
        'Secure edge configuration and bounded machine-control workflows',
      ],
      solution: {
        architecture: [
          { title: 'Frontend', desc: 'React + TypeScript + Vite', icon: null },
          { title: 'Public API', desc: 'Node.js + Express + tRPC', icon: null },
          { title: 'Private Services', desc: 'Five .NET 8 services', icon: null },
          { title: 'Messaging', desc: 'CloudAMQP + MQTT TLS', icon: null },
          { title: 'Database', desc: 'Aiven PostgreSQL + Drizzle', icon: null },
          { title: 'Asset Standards', desc: 'AAS repositories and gateway', icon: null },
          { title: 'Edge', desc: 'Pi, WROVER, OPC UA, Modbus, serial', icon: null },
        ],
        techStack: [
          { category: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS'] },
          { category: 'Backend', items: ['Node.js', 'Express', 'tRPC', '.NET 8', 'ASP.NET Core'] },
          { category: 'Data', items: ['Aiven PostgreSQL', 'Drizzle ORM', 'Redis Cloud'] },
          { category: 'IoT & Edge', items: ['CloudAMQP', 'MQTT TLS', 'Raspberry Pi', 'ESP32', 'OPC UA', 'Modbus'] },
          { category: 'Delivery', items: ['Vercel', 'Render', 'Docker', 'GitHub Actions'] },
        ],
      },
      implementation: [
        {
          phase: 'Platform Foundation',
          duration: 'Weeks 1-2',
          description: 'Build foundational dashboard with device management, sensor data visualization, and alert monitoring.',
        },
        {
          phase: 'Service Integration',
          duration: 'Weeks 3-4',
          description: 'Integrate the private .NET services for devices, telemetry, identity, analytics, and notifications.',
        },
        {
          phase: 'Edge & Telemetry',
          duration: 'Weeks 5-6',
          description: 'Connect secure MQTT gateways, durable ingestion, PostgreSQL persistence, and alert workflows.',
        },
        {
          phase: 'AAS & Production',
          duration: 'Weeks 7-8',
          description: 'Add AAS lifecycle integration and source-pinned immutable delivery across Vercel and Render.',
        },
      ],
      results: [
        'Durable replay-tolerant MQTT telemetry ingestion',
        'Versioned AAS lifecycle and standards gateway',
        'Role-aware incidents and durable notifications',
        'Source-pinned multi-repository production delivery',
      ],
    };
  }
}
