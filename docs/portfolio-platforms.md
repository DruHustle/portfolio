# Portfolio project architecture and publication status

Reviewed against canonical source repositories on 5 November 2026. This describes the **portfolio presentation** and does not authorize a production deployment or imply commissioning. Architectural images in `portfolio-frontend/client/public/images/` are explanatory diagrams, not live topology measurements.

| Project | Canonical repository | Portfolio route | Runtime/evidence boundary |
| --- | --- | --- | --- |
| Smart Factory | [DruHustle/smart-factory](https://github.com/DruHustle/smart-factory) | `#/projects/smart-factory` | Factory OT → optional Node-RED adapters/Python gateway → TLS MQTT → .NET worker and Node services; Vercel UI, Oracle runtime, PostgreSQL, BaSyx. Consolidated cutover/rollback not yet fully qualified. |
| Smart Logistics | [DruHustle/smart-logistics](https://github.com/DruHustle/smart-logistics) | `#/projects/smart-logistics` | Independent warehouse and fleet edge (Node-RED/Python, signed HTTPS), scoped shipment reviews and purchasing; production migration and edge commissioning remain gated. |
| Smart Farmer | [DruHustle/smart-farmer](https://github.com/DruHustle/smart-farmer) | `#/projects/smart-farmer` | Independent PWA and iPhone/iPad/Android, PostgreSQL API, private media, equipment/camera edge; real devices, provider activation, languages and hosting need field signoff. |

## Source of truth and caveats

1. Source code, versioned API contracts, commissioning records and acceptance matrices in each canonical repository take precedence over the marketing diagram.
2. Factory and Logistics legacy static HTML/PDF guides remain accessible under `public/docs/smartfactoryiot/` and `public/docs/imsop/` as historical reference snapshots. Their old folder names are compatibility paths, **not** product names.
3. The portfolio presents **software candidates versus live production** explicitly. Read-only diagnostics are not control-grade network timing; a simulator is not proof of physical commissioning; provider acceptance is not delivery or payment settlement.
4. All three platforms are standalone, with separate identity/policy, persistence and automation boundaries. Optional Node-RED, Python or Activepieces workflows are not a shared Onesa bus.
5. Keep the existing frontend/backend isolation. Do not introduce shared runtime packages between `portfolio-frontend` and `portfolio-backend`.
6. After changes, run both folders' audit/lint/type/unit/build and the 375/768/1440 pixel browser accessibility/navigation suite; publish only after approved CI and preview qualification.

## Engineering source links

- [Factory consolidated release](https://github.com/DruHustle/smart-factory/blob/main/docs/consolidated-release.md) and [edge Node-RED](https://github.com/DruHustle/smart-factory/blob/main/smart-factory-edge/deploy/node-red/README.md)
- [Logistics edge commissioning](https://github.com/DruHustle/smart-logistics/blob/main/smart-logistics-backend/edge/README.md) and [release gates](https://github.com/DruHustle/smart-logistics/blob/main/docs/CONSOLIDATED_RELEASE.md)
- [Farmer architecture](https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/architecture.md), [hardware commissioning](https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/hardware-and-commissioning.md) and [acceptance matrix](https://github.com/DruHustle/smart-farmer/blob/main/smart-farmer-backend/docs/status.md)
