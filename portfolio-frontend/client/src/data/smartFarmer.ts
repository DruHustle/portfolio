/** Smart Farmer capability summary, source: DruHustle/smart-farmer (5 November 2026). */
export const smartFarmerProject = {
  title: "Smart Farmer",
  subtitle: "Connected agriculture, livestock & rural commerce",
  description:
    "An offline-capable farm operations platform for irrigated crops, livestock, equipment, private security and rural trading, with independent web and Android/iPhone/iPad applications.",
  stats: [
    { label: "Field operations", value: "Offline-first", icon: null },
    { label: "Connected equipment", value: "IoT & cameras", icon: null },
    { label: "Rural commerce", value: "Market & hire", icon: null },
  ],
  problemStatement:
    "Farm records, irrigation, animal care, equipment, cameras and trading are often fragmented across notebooks and disconnected tools. Smart Farmer brings them into farm-scoped workflows while preserving unknown facts, source evidence and the ability to work offline.",
  requirements: [
    "Irrigated maize and crop planning with tasks, harvest records and sourced costs",
    "Broilers, layers, breeding chickens, rabbits and fish with traceable animal events",
    "Borehole, pump, pivot and sensor registration with verified commissioning gates",
    "Private ONVIF/RTSP camera monitoring, motion events and notifications",
    "Listings, offers, reservations, machinery/service quotes and audit trails",
    "Android, iPhone, iPad and web with Shona/Ndebele localization and offline queues",
  ],
  solution: {
    architecture: [
      { title: "Experiences", desc: "Independent responsive web/PWA and native Android, iPhone and iPad", icon: null },
      { title: "Farm API", desc: "Versioned /v1 API with farm roles and PostgreSQL transactions", icon: null },
      { title: "Edge", desc: "Independent Node-RED adapters and Python/transport gateways", icon: null },
      { title: "Equipment & cameras", desc: "HTTP, MQTT, Modbus, ONVIF/RTSP and verified-command lifecycle", icon: null },
      { title: "Storage", desc: "PostgreSQL, private object/media storage and durable offline queues", icon: null },
      { title: "Commerce", desc: "Farm-scoped marketplace, hire workflows and manually recorded payments", icon: null },
    ],
    techStack: [
      { category: "Clients", items: ["React", "TypeScript", "Web/PWA", "React Native", "Android", "iOS / iPad"] },
      { category: "API & records", items: ["Node.js", "Versioned REST", "PostgreSQL 17", "Scoped RBAC", "Transactional audit"] },
      { category: "Offline & private data", items: ["Encrypted IndexedDB", "SQLCipher", "SecureStore", "S3 adapter", "Durable sync"] },
      { category: "Farm edge", items: ["Node-RED", "Python agent", "MQTT", "Modbus", "HTTP", "ONVIF / RTSP"] },
      { category: "Farm operations", items: ["Irrigation", "Livestock", "Crop planning", "Inventory", "Field tasks", "Reports"] },
      { category: "Commerce & access", items: ["Marketplace", "Machinery hire", "Shona / Ndebele", "Private media", "Verified commands"] },
    ],
  },
  implementation: [
    { duration: "01", phase: "Record the farm", description: "Invite farm members, register crops, animals, equipment and observations without inventing unknown planting or hardware details." },
    { duration: "02", phase: "Work online or offline", description: "Capture field tasks, photos, inputs, harvest, finance and animal events in encrypted local queues, then reconcile safely." },
    { duration: "03", phase: "Commission equipment", description: "Connect sensors, pumps, pivots and cameras via independently verified gateways; retain provenance and local safety interlocks." },
    { duration: "04", phase: "Trade and review", description: "Publish scoped listings and services, manage offers and reservations, and track receipts, stock, costs and audit history." },
  ],
  results: [
    "Independent web, Android, iPhone and iPad software with verified test journeys",
    "Crop, livestock, monitoring, marketplace and machinery-service workflows",
    "Farm-scoped records with encryption, corrections and recovery tooling",
    "Physical commissioning and live payment providers remain external release gates",
  ],
};

export const smartFarmerCapabilities = [
  {
    title: "Crops, irrigation & equipment",
    icon: "irrigation",
    description:
      "Plan irrigated maize and field work; register boreholes, pumps and pivots; inspect readings, maintenance and safe-command eligibility. Hardware operation requires model-specific commissioning.",
  },
  {
    title: "Animals & traceability",
    icon: "animals",
    description:
      "Record broilers, layers, breeding and hatching, rabbits, fish, feed, treatments, transfers, losses, stock and sales with sourced event histories.",
  },
  {
    title: "Private monitoring",
    icon: "security",
    description:
      "Connect cameras through private ONVIF/RTSP gateways, review motion events, protected footage, schedules, grants and acknowledgement workflows.",
  },
  {
    title: "Marketplace & machinery hire",
    icon: "market",
    description:
      "Find and publish goods or animals, exchange offers, reserve stock and manage machinery/service quotations, deposits, work and reviews. Payments remain manual until verified providers are activated.",
  },
  {
    title: "Offline-first, multilingual work",
    icon: "offline",
    description:
      "Use independent web and native phone/tablet apps with encrypted offline queues, scoped farm roles and Shona/Ndebele text. Fluent human language review remains required.",
  },
  {
    title: "Reports & assistance",
    icon: "reports",
    description:
      "Review crop/animal production, inventory, costs, source-aware weather and farm activity. The optional AI Companion is read-only and tied to authorized records.",
  },
];

export const smartFarmerGuides = [
  { title: "Architecture", description: "Independent clients, edge devices, identity and private data boundaries.", url: "https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/architecture.md" },
  { title: "Capabilities & acceptance", description: "Implemented features, tests, blockers and evidence limits.", url: "https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/status.md" },
  { title: "Hardware commissioning", description: "Verified-read-only versus control-enabled states and site gates.", url: "https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/hardware-and-commissioning.md" },
  { title: "Integration & recovery", description: "Backup, private media, notifications, providers and operations.", url: "https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/operational-integrations.md" },
];
