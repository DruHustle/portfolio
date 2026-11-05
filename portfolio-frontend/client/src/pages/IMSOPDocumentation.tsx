import { ProjectDocumentation } from "@/components/ProjectDocumentation";

export default function IMSOPDocumentation() {
  return (
    <ProjectDocumentation
      project="Smart Logistics"
      slug="smart-logistics"
      directory="imsop"
      accent="cyan"
      description="Architecture, PostgreSQL data models, authenticated API workflows, and visual operations guides for the supply-chain and operations platform."
      currentArchitecture={{
        path: "images/smart_logistics_arch.svg",
        alt: "Smart Logistics architecture with Vercel, Oracle gateway, signed warehouse sensors and fleet GPS edge, data and services",
        width: 1440,
        height: 920,
      }}
      currentStatus="The standalone logistics edge is a software and commissioning candidate. Warehouse sensors and truck GPS observations are signed and workspace-scoped; production migration and tested rollback remain gated."
      currentSummary={[
        "Shipment projections, purchase orders, warehouse receiving, durable reviews, exports and contextual assistance use scoped authorized records.",
        "Warehouse scanners, RFID, sensors and fleet GPS enter through independent Node-RED/Python gateways using durable signed HTTPS events, not an assumed cloud MQTT path.",
        "GPS observation freshness and accuracy, provider connectivity and real warehouse commissioning must be verified separately.",
      ]}
      sourceGuides={[
        { title: "Current logistics capability", description: "Implemented workflows, evidence contracts and known limits.", url: "https://github.com/DruHustle/smart-logistics/blob/main/smart-logistics-backend/docs/CURRENT_PLATFORM.md" },
        { title: "Warehouse and fleet edge", description: "HMAC intake, gateway commissioning, local queues and source restrictions.", url: "https://github.com/DruHustle/smart-logistics/blob/main/smart-logistics-backend/edge/README.md" },
        { title: "Consolidated release", description: "Production qualification and rollback checks for the canonical repository.", url: "https://github.com/DruHustle/smart-logistics/blob/main/docs/CONSOLIDATED_RELEASE.md" },
      ]}
      guides={[
        {
          title: "Architecture Overview",
          name: "architecture",
          description:
            "React delivery, the Oracle-hosted Node and .NET runtime, PostgreSQL ownership, signed logistics integrations, and authentication boundaries.",
        },
        {
          title: "Database Schema",
          name: "database-schema",
          description:
            "Separate Node and EF Core models, entity relationships, migration ownership, logistics replay protection, telemetry, and recovery considerations.",
        },
        {
          title: "API Flows",
          name: "api-flows",
          description:
            "Session and recovery sequences, role-based endpoint access, signed shipment events, telemetry ingestion, exports, and protected purchase orders.",
        },
      ]}
    />
  );
}
