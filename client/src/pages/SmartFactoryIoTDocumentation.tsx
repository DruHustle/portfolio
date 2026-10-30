import { ProjectDocumentation } from "@/components/ProjectDocumentation";

export default function SmartFactoryIoTDocumentation() {
  return (
    <ProjectDocumentation
      project="Smart Factory"
      slug="smart-factory"
      directory="smartfactoryiot"
      accent="orange"
      description="Current hosting, security boundaries, API workflows, and data models for the industrial asset and telemetry platform."
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
