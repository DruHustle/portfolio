# Smart Factory IoT System Diagrams

These visual flows show application, factory edge, service identity, and persistence boundaries. They complement the detailed architecture and API references.

## Related guides

- [Architecture](architecture.md)
- [API flows](api-flows.md)
- [Database relationships](database-schema.md)
- [Assistant boundaries](assistant.md)
- [Current Oracle source runbook](https://github.com/DruHustle/smart-factory-iot-frontend/blob/main/deploy/oracle/README.md)

Source review: 21 October 2026.

## 1. Current runtime

```mermaid
flowchart TB
  Browser[Factory user] --> UI[Vercel UI and API proxy]
  UI -->|HTTPS| Ingress[Oracle Caddy]
  Ingress --> API[Node API plus Device Identity Analytics]
  API --> AAS[Private BaSyx repositories registries and AASX server]
  API --> DB[(Managed PostgreSQL)]
  AAS --> AASDB[(BaSyx PostgreSQL)]
  API --> Redis[(Redis TLS)]
  Worker[Singleton Telemetry and Notification worker] -->|Authenticated ingress| API
  Worker --> DB
  Edge[Factory edge] -->|MQTT TLS| Broker[CloudAMQP]
  Broker --> Worker
  Worker --> Mail[Configured mail provider]
```

API and worker roles share one reviewed backend image on Oracle. The six BaSyx services retain their own configuration and data boundary. Render is a historical hosting path; it is not the current production tier.

## 2. Durable telemetry

```mermaid
flowchart TD
  Machine[Commissioned machine] -->|OPC UA Modbus or serial| Pi[Pi gateway and durable spool]
  Sensor[WROVER sensor] -->|Local MQTT TLS and allowlist| Pi
  Pi -->|Scoped MQTT TLS| Broker[CloudAMQP]
  Direct[Eligible native MQTT device] -->|Individual identity and ACL| Broker
  Broker --> Intake[TelemetryService]
  Intake --> Store[(Telemetry persistence and retryable outbox)]
  Store --> Bridge[Authenticated Node ingestion bridge]
  Bridge --> AppDB[(Dashboard PostgreSQL)]
  AppDB --> UI[Monitoring charts and incident generation]
```

WROVER and serial controllers stay behind the Pi. Eligible native MQTT devices can use a direct path with individual credentials. A transient Redis notification is not a durable telemetry record. Publication acknowledgement and application persistence are separate checkpoints.

## 3. Identity and AAS access

```mermaid
sequenceDiagram
  participant B as Browser
  participant N as Node API
  participant I as IdentityService
  participant A as BaSyx runtime
  B->>N: Request with HttpOnly session cookie
  N->>I: Service token and authenticated account ID
  I-->>N: Current account and role
  N->>N: Enforce engineer or admin for AAS gateway
  N->>A: HTTPS request with server-side OAuth token
  A-->>N: Authorized component response
  N-->>B: Scoped result, no service credential
```

Application identity and AAS service identity are distinct. Service credentials never grant a browser role. Form-managed AAS changes go through the versioned application workflow so direct standards writes cannot bypass revision history.

## 4. Asset configuration and acknowledgement

```mermaid
flowchart TD
  Engineer[Engineer or admin] --> Validate[Validate asset revision and gateway mapping]
  Validate --> Device[DeviceService]
  Device --> Register[Register AAS models and lifecycle snapshot]
  Register --> Publish[Publish retained desired-state profile]
  Publish --> Pi[Pi validates allowlist and applies profile]
  Pi --> Ack[Matching application acknowledgement]
  Ack --> UI[Display applied configuration state]
```

QoS 1 publication does not establish that a gateway applied the profile. A configuration acknowledgement does not establish firmware installation or physical movement. Equipment controls require commissioned protocol adapters and remain separate from protective safety functions.

## 5. Incidents and durable notifications

```mermaid
flowchart TD
  Sample[Validated telemetry] --> Threshold[Warning or critical threshold]
  Threshold --> Incident[Create or escalate one open incident]
  Incident --> Inbox[(Transactional per-user inbox)]
  Incident --> Operator[Operator acknowledges]
  Operator --> Technician[Assigned engineer confirms downtime]
  Technician --> Resolve[Assigned engineer or admin resolves]
  Inbox --> Worker[NotificationService claims leased job]
  Worker --> Policy[Check current role and recipient policy]
  Policy --> Provider[Configured email provider]
  Provider --> Result[Accepted or failed with bounded retries]
```

Connectivity loss alone does not start production downtime. Notification read state and incident acknowledgement are separate. Provider acceptance is not proof of mailbox delivery.

## 6. Release flow

```mermaid
flowchart LR
  Source[Pinned source and checks] --> Image[Tested ARM64 backend image]
  Image --> API[Update Oracle API]
  API --> Ready[Verify readiness]
  Ready --> Worker[Start one worker]
  Worker --> Telemetry[Verify MQTT and queues]
  Frontend[Matching frontend CI] --> Vercel[Source-qualified Vercel artifact]
  Telemetry --> Journey[Verify UI API AAS and roles]
  Vercel --> Journey
```

See the [visual deployment guide](deployment.md) for configuration, rollout, and rollback. Backend updates are currently manual; the frontend workflow waits for matching source CI.
