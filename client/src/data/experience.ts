export interface ProfessionalExperience {
  title: string;
  company: string;
  dateRange: string;
  employmentType?: string;
  location?: string;
  description: string;
  responsibilities: string[];
  focus: string[];
  status?: string;
}

// Titles, dates, and responsibilities supplied from Andrew's LinkedIn profile.
export const professionalExperience: ProfessionalExperience[] = [
  {
    "title": "Founder",
    "company": "Onesa UG",
    "dateRange": "Apr 2026 – Present",
    "employmentType": "Self-employed",
    "description": "Founded Onesa UG in April 2026 to develop intelligent software, AI, digital platforms, and robotics. The company portfolio includes Onesa AI Platform and a separate Robotics / Physical AI development line.",
    "responsibilities": [
      "Building Onesa AI Platform around Chat, Knowledge, Agents, and Travel: conversations, document-grounded answers, bounded tools, and editable travel plans in a protected workspace.",
      "Developing the Industrial AI direction across troubleshooting and fault investigation, predictive maintenance, computer vision quality control, process and energy optimization, and digital twins with physics-informed ML. Connected production systems require separate implementation and validation.",
      "Planning business feasibility, investment research, and smart farming applications for comparing options and supporting practical decisions.",
      "Developing Onesa Robotics / Physical AI as a separate product line, currently demonstrated through a protected one-joint software simulator with task review, telemetry, and history.",
      "Combining software engineering, cloud infrastructure, and data engineering with source-backed workflows and human review."
    ],
    "focus": [
      "AI Platforms",
      "Software & Digital Platforms",
      "Knowledge Retrieval",
      "Bounded Agents",
      "Industrial AI",
      "Robotics / Physical AI"
    ],
    "status": "AI applications available · Industrial AI planned · Robotics in simulation"
  },
  {
    "title": "Senior DevOps Engineer",
    "company": "BASF",
    "dateRange": "Nov 2022 – Present",
    "employmentType": "Full-time",
    "location": "Remote from Heidelberg · Berlin office, Germany",
    "description": "Engineer enterprise software delivery and Azure cloud infrastructure, connecting application development, deployment automation, and secure operations. Assigned to the Berlin office with regular visits.",
    "responsibilities": [
      "Design and operate Azure DevOps CI/CD pipelines to improve release reliability, deployment consistency, and repeatability.",
      "Automate infrastructure with Terraform and Azure Bicep across development, QA, and production environments.",
      "Implement role-based access control, managed identities, and Azure Key Vault for secure service access and secrets management.",
      "Build and test applications using C# and JavaScript, collaborating in Agile Scrum teams across the software development lifecycle.",
      "Bring a software engineering perspective to platform delivery, with emphasis on maintainability, clear interfaces, and dependable operations."
    ],
    "focus": [
      "Azure",
      "Azure DevOps",
      "CI/CD",
      "Terraform",
      "Azure Bicep",
      "Cloud Security"
    ]
  },
  {
    "title": "Software Developer",
    "company": "Boehringer Ingelheim",
    "dateRange": "Jan 2022 – Nov 2022",
    "employmentType": "Full-time",
    "location": "Ingelheim am Rhein, Germany",
    "description": "Designed, developed, and tested RESTful APIs and .NET applications using C# and Azure, from requirements analysis through integration and maintenance.",
    "responsibilities": [
      "Established CI/CD pipelines to streamline software releases.",
      "Implemented containerized deployments using Docker."
    ],
    "focus": [
      "C#",
      ".NET",
      "RESTful APIs",
      "Azure",
      "CI/CD",
      "Docker"
    ]
  },
  {
    "title": "IoT Engineer",
    "company": "productONE",
    "dateRange": "Jan 2021 – Dec 2021",
    "employmentType": "Full-time",
    "description": "Designed Industrial IoT solutions connecting equipment, edge devices, and cloud platforms, translating engineering and business requirements into maintainable system architectures.",
    "responsibilities": [
      "Worked with OPC UA, MQTT, and Modbus connectivity, using Kepware and ThingWorx to bridge industrial data and software applications.",
      "Developed .NET and C++ edge SDKs for heterogeneous devices, supporting connectivity and interoperability across edge environments.",
      "Designed and implemented DevOps workflows for IoT platforms across AWS and Azure, enabling reliable software releases and operational consistency.",
      "Analyzed system requirements with cross-functional teams and translated them into scalable IoT solution designs."
    ],
    "focus": [
      "Industrial IoT",
      "OT/IT Integration",
      "OPC UA",
      "MQTT",
      "Modbus",
      "Edge Computing"
    ]
  },
  {
    "title": "Software Product Engineer",
    "company": "HENSOLDT South Africa",
    "dateRange": "Jan 2020 – Dec 2020",
    "employmentType": "Full-time",
    "location": "Cape Town, South Africa",
    "description": "Designed, developed, deployed, and maintained a web application for spectrum management and monitoring in an engineering R&D environment.",
    "responsibilities": [
      "Contributed across the application lifecycle, connecting engineering requirements with software implementation and ongoing maintenance.",
      "Applied software product engineering to a specialist technical domain, combining an electrical engineering foundation with web application development."
    ],
    "focus": [
      "Software Product Engineering",
      "Web Applications",
      "Spectrum Management",
      "Engineering R&D"
    ]
  },
  {
    "title": "Software Engineer",
    "company": "thyssenkrupp",
    "dateRange": "Jan 2017 – Dec 2019",
    "employmentType": "Full-time",
    "location": "Johannesburg, South Africa",
    "description": "Developed digital solutions for engineering problems across requirements, architecture, application development, testing, deployment, and maintenance.",
    "responsibilities": [
      "Contributed to LFS Digital, a liquid fuel storage feasibility-study platform generating project proposals, plot plans, process flow diagrams, and financial analysis reports from user inputs.",
      "Developed desktop and web applications using C#/.NET, ASP.NET MVC, JavaScript, React, and Python within Agile teams.",
      "Worked with three-tier and microservices architectures, relational databases, Entity Framework, Redis, Elasticsearch, and RabbitMQ.",
      "Performed Azure and AWS migrations of virtual machines, applications, and databases.",
      "Applied ML.NET to AI and machine-learning capabilities in applications, and used Postman and xUnit for testing."
    ],
    "focus": [
      "Industrial Digitalization",
      "C#/.NET",
      "Python",
      "React",
      "Microservices",
      "Azure & AWS"
    ]
  },
  {
    "title": "Electronics and Electrical Engineer",
    "company": "Gear Rail",
    "dateRange": "2015 – 2017",
    "employmentType": "Full-time",
    "location": "Sandton, South Africa",
    "description": "Delivered electrical and electronics engineering for railway signalling and infrastructure projects, from feasibility and detailed design to integration, installation, testing, and commissioning.",
    "responsibilities": [
      "Developed electronic interlocking logic using C, C++, and SpoorText, and programmed Siemens, Allen-Bradley, and Microlok PLC systems.",
      "Designed and tested solid-state lamp-driver PCBs with Altium Designer and worked with embedded C/C++ applications for railway equipment.",
      "Integrated and troubleshot telecommunications, axle-counting, and track-vacancy detection systems.",
      "Performed Factory Acceptance Testing (FAT), Site Acceptance Testing (SAT), and FMECA, with attention to reliability and engineering standards.",
      "Produced designs, technical documentation, and bills of materials; designed electrical circuits, lighting, HVAC, and relay-room services using Revit, Relux, and Schneider Ecodial.",
      "Supervised factory assembly and site installations, coordinating quality, safe working procedures, commissioning, and logistics.",
      "Projects included Vereeniging–Union FSDT and De Aar–Jan de Boers for Transnet Freight Rail, and the RLRA and Majuba rail projects for Eskom."
    ],
    "focus": [
      "Railway Signalling",
      "Electronic Interlocking",
      "PLC Programming",
      "Embedded Systems",
      "FAT/SAT",
      "FMECA"
    ]
  },
  {
    "title": "Graduate Engineer",
    "company": "HVAC International",
    "dateRange": "Oct 2013 – Jan 2014",
    "location": "Pretoria, South Africa",
    "description": "Implemented and maintained energy-saving systems at Tshepong mine in Welkom.",
    "responsibilities": [],
    "focus": [
      "Energy-Saving Systems",
      "Implementation & Maintenance"
    ]
  },
  {
    "title": "Graduate Student Researcher",
    "company": "Opti-Num Solutions",
    "dateRange": "Jun 2013 – Dec 2013",
    "location": "Johannesburg, South Africa",
    "description": "Developed a swine flu detection system using MATLAB.",
    "responsibilities": [],
    "focus": [
      "MATLAB",
      "Research"
    ]
  }
];
