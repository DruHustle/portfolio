import { ProjectDocumentation } from "@/components/ProjectDocumentation";

export default function SmartFactoryIoTDocumentation() {
  return (
    <ProjectDocumentation
      project="Smart Factory"
      slug="smart-factory"
      directory="smartfactoryiot"
      accent="orange"
      description="Current hosting, security boundaries, API workflows, and data models for the industrial asset and telemetry platform."
      currentArchitecture={{
        path: "images/smart_factory_arch.svg",
        alt: "Smart Factory architecture with Python gateway, managed MQTT, Oracle API and worker, Vercel, PostgreSQL, Redis and BaSyx",
        width: 1672,
        height: 941,
      }}
      currentStatus="Production cutover, independent rollback qualification and physical edge commissioning remain governed release gates. The diagram distinguishes factory-local control from software acquisition and managed services."
      currentSummary={[
        "Overview workspaces cover the 3D factory, floor plan, P&ID, electrical, telemetry, inventory and infrastructure views; individual metrics need an approved live source.",
        "Standalone Node-RED protocol adapters can feed the Python edge agent, which validates identity/provenance and queues accepted observations before MQTT/TLS.",
        "Oracle API and singleton worker roles are separate. AAS identities and versions use the dedicated BaSyx runtime; cybersecurity findings are distinct from process incidents.",
      ]}
      sourceGuides={[
        { title: "Canonical platform architecture", description: "Source-of-truth application services, data ownership and runtime boundaries.", url: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-backend/ARCHITECTURE.md" },
        { title: "Node-RED edge commissioning", description: "Optional adapters, Python validation, source identity and secure messaging.", url: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-edge/deploy/node-red/README.md" },
        { title: "Release and rollback gates", description: "Consolidated checks and safe retirement requirements.", url: "https://github.com/DruHustle/smart-factory/blob/main/docs/consolidated-release.md" },
      ]}
      guides={[
        {
          title: "Architecture Overview",
          name: "architecture",
          description:
            "Vercel delivery, the Oracle API and singleton worker, durable MQTT edge paths, managed data services, and the BaSyx runtime.",
        },
        {
          title: "Database Schema",
          name: "database-schema",
          description:
            "PostgreSQL identities, system settings, AAS assets and revisions, gateway mappings, replay-safe telemetry, incident workflows, and durable notifications.",
        },
        {
          title: "API Flows",
          name: "api-flows",
          description:
            "Role-enforced login, AAS creation and versioning, configured Assistant routing, edge profiles, MQTT telemetry, incident response, and service delegation.",
        },
      ]}
    />
  );
}
