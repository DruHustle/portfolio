import { ProjectDocumentation } from "@/components/ProjectDocumentation";
import { smartFarmerGuides } from "@/data/smartFarmer";

export default function SmartFarmerDocumentation() {
  return (
    <ProjectDocumentation
      project="Smart Farmer"
      slug="smart-farmer"
      directory="smart-farmer"
      accent="cyan"
      description="Independent farm applications, evidence-aware equipment connectivity, field records, animal workflows and commerce."
      guides={[]}
      currentArchitecture={{
        path: "images/smart_farmer_arch.svg",
        alt: "Smart Farmer architecture with separate web and mobile apps, API, private records, and farm edge connectivity",
        width: 1440,
        height: 920,
      }}
      currentStatus="Software implementation and simulated acceptance tests are documented. Physical commissioning, production hosting and payment-provider activation remain separate gates."
      currentSummary={[
        "Independent responsive PWA, Android, iPhone and iPad clients with encrypted offline queues and farm-scoped permissions.",
        "Irrigated crop planning, multi-species livestock, traceable stock, marketplace listings and machinery-service workflows.",
        "Private equipment and camera gateways with explicit source identity, commissioning and local interlock requirements.",
        "Shona and Northern Ndebele interfaces require final fluent review before production claims.",
      ]}
      sourceGuides={smartFarmerGuides}
    />
  );
}
