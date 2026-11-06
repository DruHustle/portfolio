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
        alt: "Smart Factory architecture with Python identity validation provenance and durable queue, local and Oracle Mosquitto, API and worker, Vercel, PostgreSQL and BaSyx",
        width: 1672,
        height: 941,
      }}
      currentStatus="Reviewed against the project repositories on 6 November 2026. The current edge guide specifies local and Oracle-hosted Mosquitto. Python owns the trust boundary and durable queue; Node-RED is an optional adapter. Physical commissioning remains separately verified."
      currentSummary={[
        "Overview workspaces cover the 3D factory, floor plan, P&ID, electrical, telemetry, inventory and infrastructure views; individual metrics need an approved live source.",
        "Standalone Node-RED protocol adapters can feed the Python edge agent, which validates identity/provenance and queues accepted observations before MQTT/TLS.",
        "Oracle API and singleton worker roles are separate. AAS identities and versions use the dedicated BaSyx runtime; cybersecurity findings are distinct from process incidents.",
      ]}
      sourceGuides={[
        { title: "Current gateway and broker", description: "Local and Oracle Mosquitto, Python validation, queue delivery and policy boundaries.", url: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-edge/raspberry-pi/README.md" },
        { title: "Node-RED edge commissioning", description: "Optional adapters, Python validation, source identity and secure messaging.", url: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-edge/deploy/node-red/README.md" },
        { title: "Release and rollback gates", description: "Consolidated checks and safe retirement requirements.", url: "https://github.com/DruHustle/smart-factory/blob/main/docs/consolidated-release.md" },
      ]}
      guides={[
        {
          title: "Architecture Overview",
          name: "architecture",
          description:
            "Node-RED adapters, the Python trust boundary, local and Oracle Mosquitto, durable delivery, API/worker roles and BaSyx asset identity.",
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
