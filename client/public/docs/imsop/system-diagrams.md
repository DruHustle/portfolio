# IMSOP System Diagrams

These rendered diagrams explain current runtime boundaries and source-backed request flows. Solid lines indicate implemented routing or data paths; the optional companion-service model is described explicitly rather than assumed active in every browser workflow.

## 1. Runtime and trust boundaries

```mermaid
flowchart TB
  Browser[Browser] --> Frontend[Vercel React frontend]
  Frontend -->|Same-origin HTTPS proxy| Ingress[Oracle Caddy]
  Ingress --> Gateway[.NET gateway]
  subgraph Private[Private backend image]
    Gateway --> Node[Node operational REST API]
    Gateway --> Supply[.NET purchase-order API]
    Gateway --> Ops[.NET Operations foundation]
  end
  Node -->|Node migrations| Database[(Managed PostgreSQL)]
  Supply -->|EF Core migrations| Database
  Node --> Email[Configured mail provider]
  Provider[External carrier or GPS system] -->|HMAC signed event| Ingress
```

Browser operations use the Node API. The gateway and .NET service foundation are packaged alongside it. A deployment template for an Azure dependency is not evidence that the live application uses it. Caddy terminates HTTPS and internal service ports remain private.

## 2. Real-account authentication

```mermaid
sequenceDiagram
  participant User as Browser
  participant API as Node API
  participant DB as PostgreSQL
  User->>API: Login with real account
  API->>DB: Fetch account and password hash
  API->>API: Verify password and issue short-lived JWT
  API-->>User: HttpOnly Secure session cookie
  User->>API: Read operational data
  API->>API: Verify token and enforce role
  API-->>User: Authorized records or 401 / 403
```

Demo authentication is a separate browser adapter. The real-account flow verifies token issuer, audience, expiry, and role server-side. UI visibility alone does not grant access.

## 3. Logistics event consistency

```mermaid
flowchart TD
  Event[Provider event and timestamp] --> Verify[Verify HMAC over exact raw bytes]
  Verify --> Validate[Validate timestamp and canonical payload]
  Validate --> Transaction[Begin PostgreSQL transaction]
  Transaction --> Unique{New provider and event ID?}
  Unique -->|Yes| Save[Insert event and upsert shipment]
  Save --> Commit[Commit together]
  Unique -->|No| Skip[Skip shipment update]
  Commit --> Accepted[202 accepted]
  Skip --> Duplicate[202 accepted with duplicate flag]
```

Idempotency uses a unique provider/event key. A tracking number identifies the shipment. The handler does not order events by occurrence time, so late events need integration-level handling.

## 4. Telemetry and reporting

```mermaid
flowchart LR
  Writer[Admin or engineer] --> Validate[Authenticate and validate metric]
  Validate --> Samples[(PostgreSQL telemetry)]
  Samples --> Read[Admin engineer analyst reads]
  Orders[(Operational orders and shipments)] --> Export[Admin or analyst export route]
  Export --> Report[Downloadable report]
```

Telemetry uses authenticated REST ingestion; it does not imply a commissioned MQTT or factory-control connection. Samples use server storage timestamps, while logistics records retain provider occurrence and API receipt timestamps.

## 5. Independent release and recovery

```mermaid
flowchart TD
  Backend[Backend source and tests] --> Image[Reviewed ARM64 image]
  Image --> Oracle[Oracle private runtime]
  Oracle --> Ready[Health readiness auth checks]
  Frontend[Frontend source and tests] --> Static[Verified static build]
  Static --> Vercel[Vercel frontend delivery]
  Ready --> Journey[Verify actual UI and API journey]
  Vercel --> Journey
  Previous[Retained prior image and manifest] -. rollback .-> Oracle
```

Backend updates are manual and independent from frontend releases. Restore a compatible tested image on failed acceptance; recover incompatible database changes through a separate restore plan.

## Related references

- [Architecture overview](architecture.md)
- [Database relationships](database-schema.md)
- [API sequences and endpoint roles](api-flows.md)
- [Visual deployment guide](deployment.md)
- [Oracle source runbook](https://github.com/DruHustle/imsop-app-backend/blob/main/deploy/oracle/README.md)

Source review: 21 October 2026.
