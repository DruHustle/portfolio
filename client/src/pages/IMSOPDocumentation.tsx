import { ProjectDocumentation } from "@/components/ProjectDocumentation";

export default function IMSOPDocumentation() {
  return (
    <ProjectDocumentation
      project="IMSOP"
      slug="imsop"
      directory="imsop"
      accent="cyan"
      description="Architecture, PostgreSQL data models, authenticated API workflows, and visual operations guides for the supply-chain and operations platform."
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
