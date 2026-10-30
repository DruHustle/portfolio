/** Current product scope: imsop-app-backend/docs/CURRENT_PLATFORM.md. */
export const imsopProject = {
  title: "IMSOP",
  subtitle: "Supply Chain Visibility, Exceptions & Purchasing",
  description:
    "A supply-chain workspace connecting shipment visibility, durable exception review and warehouse receiving. Teams follow the same authorized records through tables, maps, analytics and reports, with clear source and observation times.",
  stats: [
    { label: "Operational visibility", value: "Shipment tracking", icon: null },
    {
      label: "Persistent investigations",
      value: "Exception review",
      icon: null,
    },
    { label: "Purchasing & stock", value: "PO receiving", icon: null },
  ],
  problemStatement:
    "Shipment events, review decisions and purchasing records need to stay connected as operations change. IMSOP preserves their source history and access scope so teams can investigate an exception, record a decision and follow an order into warehouse stock.",
  requirements: [
    "Shared shipment selection across tables, maps, metrics and exports",
    "Durable exception assignment, notes, resolution and audit history",
    "Purchase orders with source currency and idempotent partial receiving",
    "Signed logistics intake with deterministic replay and field provenance",
    "Workspace-scoped access, revocable sessions and separate Live/Demo data",
    "Record-grounded assistance and explicit optional-provider configuration",
  ],
  solution: {
    architecture: [
      {
        title: "Frontend",
        desc: "React workspace, maps, optional 3D globe and reports",
        icon: null,
      },
      {
        title: "Ingress",
        desc: "Vercel same-origin proxy and Oracle Caddy HTTPS ingress",
        icon: null,
      },
      {
        title: "Gateway",
        desc: ".NET 8 YARP gateway with session validation",
        icon: null,
      },
      {
        title: "Application",
        desc: "Node/Express API, shipment projection and review workflows",
        icon: null,
      },
      {
        title: "Purchasing",
        desc: "SupplyChainService, transactional outbox and receiving",
        icon: null,
      },
      {
        title: "Data",
        desc: "PostgreSQL with separate Node and EF Core ownership",
        icon: null,
      },
    ],
    techStack: [
      {
        category: "Experience",
        items: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Recharts",
          "Maps / 3D globe",
        ],
      },
      {
        category: "Application API",
        items: ["Node.js", "Express", "REST", "Drizzle ORM", "Zod"],
      },
      {
        category: "Gateway & purchasing",
        items: [
          ".NET 8",
          "ASP.NET Core",
          "YARP",
          "Entity Framework Core",
          "Transactional outbox",
        ],
      },
      {
        category: "Data & integration",
        items: [
          "PostgreSQL",
          "Signed HMAC events",
          "Event replay",
          "Idempotent receiving",
          "Source currency",
        ],
      },
      {
        category: "Access & delivery",
        items: [
          "HttpOnly sessions",
          "Workspace scoping",
          "RBAC",
          "Durable notification queues",
          "Audit history",
        ],
      },
      {
        category: "Deployment & quality",
        items: [
          "Vercel",
          "Oracle ARM64",
          "Caddy",
          "Docker",
          "GitHub Actions",
          "Vitest / Playwright",
        ],
      },
    ],
  },
  implementation: [
    {
      phase: "Receive an event",
      duration: "01",
      description:
        "Validate a configured provider's signed event and preserve its workspace, tracking identity and observation time.",
    },
    {
      phase: "Build the record",
      duration: "02",
      description:
        "Replay retained events deterministically, retaining field provenance and the original delivery promise.",
    },
    {
      phase: "Review the exception",
      duration: "03",
      description:
        "Acknowledge, assign, annotate and resolve a persistent case with audit history and in-app notifications.",
    },
    {
      phase: "Follow the operation",
      duration: "04",
      description:
        "Inspect the same scoped selection in maps and reports, or follow purchasing through partial warehouse receipts and stock updates.",
    },
  ],
  results: [
    "One authorized shipment selection across operational views and reports",
    "Exception decisions that persist with their investigation history",
    "Replay-safe purchasing and inventory updates",
    "Source-aware analytics and record-grounded assistance",
  ],
};

export const imsopCapabilities = [
  {
    title: "Shipment visibility",
    description:
      "Filter and inspect stable shipment records across tables, geographic maps and an optional 3D globe. Retain source-read and provider-observation times alongside reported status and location.",
    icon: "shipments",
  },
  {
    title: "Durable exception review",
    description:
      "Turn signed exceptions into persistent cases. Acknowledge, assign, add notes, resolve and reopen investigations, with audit history and per-user in-app notifications.",
    icon: "review",
  },
  {
    title: "Purchasing & warehouse receiving",
    description:
      "Create orders from scoped suppliers and products, preserve item prices and source currency, and record idempotent partial receipts that update inventory through a transactional outbox.",
    icon: "purchasing",
  },
  {
    title: "Analytics & scoped reports",
    description:
      "Use the complete matching selection for metrics, maps and exports. On-time performance compares actual arrival with the retained original promise; unknown and mixed currencies remain explicit.",
    icon: "analytics",
  },
  {
    title: "Signed logistics integrations",
    description:
      "Validate configured carrier, GPS and IoT events, reject conflicting duplicates and retain field provenance through replay. Integration views distinguish configuration from receipt and connectivity evidence.",
    icon: "integration",
  },
  {
    title: "Record-grounded assistance",
    description:
      "Retrieve authorized shipment details by exact identifier and follow links to the source records. Deterministic assistance supports operational investigation; optional forecast providers require separate configuration.",
    icon: "assistant",
  },
];

export const imsopGuide =
  "https://github.com/DruHustle/imsop-app-backend/blob/main/docs/CURRENT_PLATFORM.md";
