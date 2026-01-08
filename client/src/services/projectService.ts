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
      'azure-smart-guardian': this.getIoTProject(),
    };

    return projects[projectId] || null;
  }

  private static getIMSOPProject(): ProjectData {
    return {
      title: 'IMSOP',
      subtitle: 'Intelligent Multi-Cloud Supply Chain & Operations Platform',
      description:
        'An enterprise-grade, cloud-native platform designed for real-time supply chain visibility, predictive analytics, and intelligent automation. Built with domain-driven design principles across seven bounded contexts, serving 10M+ requests per day with 99.99% uptime SLA.',
      stats: [
        { label: 'Daily Requests', value: '10M+', icon: null },
        { label: 'Uptime SLA', value: '99.99%', icon: null },
        { label: 'Cost Reduction', value: '35%', icon: null },
      ],
      problemStatement:
        'The organization faced critical challenges in managing legacy monolithic systems that couldn\'t scale with growing demand. Peak traffic loads exceeding 5M requests per day caused frequent outages and high operational costs.',
      requirements: [
        'Handle 10M+ requests per day with sub-100ms latency',
        'Achieve 99.99% uptime SLA across multiple regions',
        'Reduce infrastructure costs by 30-40%',
        'Support multi-cloud strategy (Azure + AWS)',
      ],
      solution: {
        architecture: [
          { title: 'Identity', desc: 'OAuth 2.0, RBAC, managed identities', icon: null },
          { title: 'Ingestion', desc: 'REST APIs, Kafka streams, WebSockets', icon: null },
          { title: 'Operations', desc: 'Shipment tracking, state machines', icon: null },
          { title: 'Analytics', desc: 'Data processing, ML model inference', icon: null },
          { title: 'Prediction', desc: 'Delay prediction, demand forecasting', icon: null },
          { title: 'AI Assistant', desc: 'Natural language chatbot', icon: null },
          { title: 'Reporting', desc: 'GraphQL API, real-time dashboards', icon: null },
        ],
        techStack: [
          { category: 'Backend', items: ['.NET Core 8', 'Python 3.11', 'FastAPI', 'GraphQL'] },
          { category: 'Data', items: ['PostgreSQL', 'Azure SQL', 'MongoDB', 'Redis'] },
          { category: 'Infrastructure', items: ['Kubernetes (AKS)', 'Docker', 'Terraform', 'Azure Bicep'] },
          { category: 'DevOps', items: ['Azure DevOps', 'GitHub Actions', 'ELK Stack', 'Prometheus'] },
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
        '10M+ requests per day with sub-100ms latency',
        '99.99% uptime SLA across all services',
        '35% infrastructure cost reduction',
        'Deployment time reduced from weeks to hours',
      ],
    };
  }

  private static getSAPBTPProject(): ProjectData {
    return {
      title: 'SAP BTP AI Learning Hub',
      subtitle: 'Enterprise AI Education Platform',
      description:
        'An interactive, comprehensive learning platform designed for mastering AI business solutions on SAP Business Technology Platform (BTP). The platform provides hands-on tutorials, best practices, and resources for developers, architects, and business professionals.',
      stats: [
        { label: 'Tutorials', value: '6+', icon: null },
        { label: 'Learning Paths', value: '3', icon: null },
        { label: 'Interactive Tools', value: '4+', icon: null },
      ],
      problemStatement:
        'Organizations face significant challenges in adopting AI solutions on SAP BTP due to a lack of comprehensive, hands-on learning resources and a steep learning curve for services like SAP AI Core and Generative AI Hub.',
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

  private static getIoTProject(): ProjectData {
    return {
      title: 'Azure Smart Guardian',
      subtitle: 'Edge-to-Cloud IoT Security & Environmental Monitoring',
      description:
        'A sophisticated IoT ecosystem leveraging Raspberry Pi 5 as an Edge Gateway and ESP32 nodes for remote sensing and surveillance. The system integrates with Azure IoT Hub for real-time telemetry, automated alerting, and cloud-based image storage.',
      stats: [
        { label: 'Latency', value: '<200ms', icon: null },
        { label: 'Connectivity', value: 'MQTT/TLS', icon: null },
        { label: 'Storage', value: 'Azure Blob', icon: null },
      ],
      problemStatement:
        'Traditional security systems often lack integrated environmental monitoring and are difficult to scale across remote locations. There is a need for a unified platform that combines visual surveillance with real-time sensor data at the edge.',
      requirements: [
        'Real-time temperature and humidity monitoring',
        'Motion-triggered image capture and cloud upload',
        'Edge-based data processing to reduce cloud costs',
        'Secure, encrypted communication between nodes and gateway',
      ],
      solution: {
        architecture: [
          { title: 'Edge Node', desc: 'ESP32-WROVER-E, DHT11, Camera', icon: null },
          { title: 'Gateway', desc: 'Raspberry Pi 5, Azure IoT Edge', icon: null },
          { title: 'Communication', desc: 'MQTT over TLS 1.3', icon: null },
          { title: 'Cloud Hub', desc: 'Azure IoT Hub, Device Provisioning', icon: null },
          { title: 'Processing', desc: 'Azure Stream Analytics', icon: null },
          { title: 'Storage', desc: 'Azure Blob Storage (Images)', icon: null },
          { title: 'Alerting', desc: 'Azure Logic Apps (Email/SMS)', icon: null },
        ],
        techStack: [
          { category: 'Hardware', items: ['Raspberry Pi 5', 'ESP32-WROVER-E', 'DHT11 Sensor', 'OV2640 Camera'] },
          { category: 'Edge Software', items: ['Python', 'C++ (Arduino)', 'Docker', 'Azure IoT Edge Runtime'] },
          { category: 'Cloud Services', items: ['Azure IoT Hub', 'Stream Analytics', 'Blob Storage', 'Logic Apps'] },
          { category: 'Protocols', items: ['MQTT', 'HTTPS', 'AMQP', 'WebSockets'] },
        ],
      },
      implementation: [
        {
          phase: 'Edge Development',
          duration: 'Weeks 1-3',
          description: 'Develop ESP32 firmware for sensor data acquisition and camera integration. Implement MQTT client with TLS.',
        },
        {
          phase: 'Gateway Setup',
          duration: 'Weeks 4-6',
          description: 'Configure Raspberry Pi 5 with Azure IoT Edge. Implement custom modules for local data filtering and image buffering.',
        },
        {
          phase: 'Cloud Integration',
          duration: 'Weeks 7-9',
          description: 'Set up Azure IoT Hub, Stream Analytics jobs, and Blob Storage containers. Configure Logic Apps for automated alerting.',
        },
        {
          phase: 'Testing & Optimization',
          duration: 'Weeks 10-12',
          description: 'Perform end-to-end latency testing, optimize power consumption for edge nodes, and refine motion detection algorithms.',
        },
      ],
      results: [
        'Real-time environmental monitoring with <200ms latency',
        'Automated security alerts with image attachments',
        '30% reduction in cloud bandwidth via edge filtering',
        'Scalable architecture supporting 100+ remote nodes',
      ],
    };
  }
}
