/** Product capabilities reviewed against the Smart Factory engineering guides. */
export const smartFactoryProject = {
  title: "Smart Factory",
  subtitle: "Interactive digital twins, industrial connectivity & operations",
  description:
    "Explore a factory in 3D, inspect individual equipment components, and connect asset identity with telemetry, network diagnostics and operational evidence in one industrial workspace.",
  stats: [
    {
      label: "Digital twins",
      value: "Interactive 3D",
      icon: null,
      description:
        "Explore the factory floor and inspect equipment down to its components.",
    },
    {
      label: "Network visibility",
      value: "FX & TSN",
      icon: null,
      description:
        "Understand controller connections, clock synchronization and delivery timing.",
    },
    {
      label: "Asset lifecycle",
      value: "AAS / AASX",
      icon: null,
      description:
        "Keep asset identities, model revisions and product passports connected.",
    },
  ],
  problemStatement:
    "A factory's geometry, machine data, network health and incident history often live in separate tools. Smart Factory brings these views together so operators and engineers can move from the whole plant to the equipment, component and evidence that need attention.",
  requirements: [
    "A selectable 3D factory floor with editable layouts and an accessible floor plan",
    "Component inspection with model import, exploded views, sections and saved viewpoints",
    "OPC UA FX connection diagnostics and TSN clock, latency, jitter and packet-loss evidence",
    "Source-aware telemetry, incident ownership and explicit downtime confirmation",
    "Versioned AAS/AASX assets, reviewed product passports and role-based access",
    "OT security investigations, grounded assistance and an isolated editable demo",
    "A compact Overview with Factory Floor, Floor Plan, Process/P&ID, Electrical, Telemetry, Factory Inventory and Infrastructure views",
  ],
  solution: {
    architecture: [
      {
        title: "Experience",
        desc: "React, native Three.js workspaces and factory layouts",
        icon: null,
      },
      {
        title: "Application API",
        desc: "Node.js, Express and tRPC on Oracle ARM64",
        icon: null,
      },
      {
        title: "Services",
        desc: ".NET 10 LTS API and singleton worker roles",
        icon: null,
      },
      {
        title: "Acquisition",
        desc: "Optional Node-RED → local Mosquitto → Python trust boundary → Oracle Mosquitto/TLS",
        icon: null,
      },
      {
        title: "Industrial diagnostics",
        desc: "OPC UA FX / TSN collector snapshots and evidence",
        icon: null,
      },
      {
        title: "Asset identity",
        desc: "PostgreSQL inventory, BaSyx AAS and versioned models",
        icon: null,
      },
    ],
    techStack: [
      {
        category: "Experience & 3D",
        items: [
          "React",
          "TypeScript",
          "Vite",
          "Three.js",
          "glTF / GLB",
          "Tailwind CSS",
        ],
      },
      {
        category: "Application & services",
        items: ["Node.js", "Express", "tRPC", ".NET 10 LTS", "WebSocket"],
      },
      {
        category: "Industrial connectivity",
        items: [
          "OPC UA",
          "OPC UA FX",
          "PubSub diagnostics",
          "TSN diagnostics",
          "MQTT TLS",
          "Modbus",
          "Raspberry Pi",
          "ESP32",
          "Node-RED (candidate)",
          "Python edge agent",
        ],
      },
      {
        category: "Assets & evidence",
        items: [
          "AAS / AASX",
          "BaSyx",
          "AutomationML / CAEX",
          "PostgreSQL",
          "Drizzle ORM",
          "Redis",
          "Durable outbox",
        ],
      },
      {
        category: "Security & operations",
        items: [
          "RBAC",
          "HttpOnly sessions",
          "OAuth 2.0",
          "OT security evidence",
          "Incident workflows",
          "Read-only Assistant",
        ],
      },
      {
        category: "Delivery",
        items: [
          "Vercel",
          "Oracle ARM64",
          "Docker",
          "GitHub Actions",
          "API compatibility gates",
          "Singleton worker",
        ],
      },
    ],
  },
  implementation: [
    {
      phase: "Model the factory",
      duration: "01",
      description:
        "Register assets and devices, connect their AAS identities, attach 3D models and arrange equipment into named factory zones.",
    },
    {
      phase: "Connect the evidence",
      duration: "02",
      description:
        "Bring in commissioned telemetry and read-only network diagnostics, preserving the source, units, observation time and data quality.",
    },
    {
      phase: "Investigate in context",
      duration: "03",
      description:
        "Move from a floor item to its components, trends, network connections, process incidents and separate security findings.",
    },
    {
      phase: "Operate and review",
      duration: "04",
      description:
        "Assign investigations, record decisions, save inspection views and publish selected passport fields through authorized workflows.",
    },
  ],
  results: [
    "A whole-factory view with direct equipment and component drill-downs",
    "Inspectable digital twins with explicit links to their source evidence",
    "FX/TSN diagnostics that preserve unknown and stale timing states",
    "Asset lifecycle, process incidents and OT security in a shared workspace",
  ],
};

export const smartFactoryCapabilities = [
  {
    title: "Operational evidence & incidents",
    description:
      "Follow trends with acquisition times, engineering units, quality and visible data gaps. Assign incidents, retain investigation notes and confirm downtime explicitly.",
    icon: "activity",
  },
  {
    title: "AAS lifecycle & digital passports",
    description:
      "Create and import AAS/AASX assets, retain model revisions and export AutomationML. Publish only reviewed passport fields, with a separate revocable public identity.",
    icon: "layers",
  },
  {
    title: "OT cybersecurity workspace",
    description:
      "The optional Python SecurityCollector reports read-only identity, configuration, transport and certificate evidence through a separate durable HTTPS path. It is off until commissioned. Findings remain separate from process alarms; Python AI advisory capability is in active development; production inference is not verified by this source review.",
    icon: "shield",
  },
  {
    title: "Smart Factory Assistant",
    description:
      "Ask questions against approved guides and a bounded, role-authorized snapshot. Follow evidence links into the workspace; the Assistant remains read-only.",
    icon: "assistant",
  },
  {
    title: "Editable demo sandbox",
    description:
      "Create simulated equipment, generate readings, try incident and network scenarios, and save personal layouts. Browser-local drafts support backup, export and reset.",
    icon: "demo",
  },
  {
    title: "Python edge agent",
    description:
      "Python verifies allowlisted source identities, validates payloads, units and timestamps, and stamps provenance. Its durable SQLite queue buffers accepted observations and retries delivery to Oracle-hosted Mosquitto over TLS. It enforces commissioned command policy, expiry and replay protection. Broker acknowledgement is not proof of backend persistence or physical action.",
    icon: "health",
  },
];

export const smartFactoryGuides = {
  equipment:
    "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-frontend/docs/equipment-view.md",
  layouts:
    "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-frontend/docs/factory-layouts.md",
  network:
    "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-frontend/docs/fx-tsn.md",
  demo: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-frontend/docs/editable-demo.md",
  edge: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-edge/deploy/node-red/README.md",
};
