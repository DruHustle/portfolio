"""One-time content migration; generated files are reviewed before release.
No runtime settings, credentials, device configuration or project dependencies change.
"""
from pathlib import Path
import hashlib
import json
import posixpath
import re
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
FRONT = ROOT / 'portfolio-frontend'
PUBLIC = FRONT / 'client/public'
FACTORY_SHA = '52b4e4207cb7ceb27f419a3548887e63094d83af'
LOGISTICS_SHA = '4c679f4044b08e15458752398f522ba5ae0e1506'
FARMER_SHA = 'cf6860a0176a12b13e419b62ffc3a5db2c9031cf'
BASE = f'https://github.com/DruHustle/smart-factory/blob/{FACTORY_SHA}/'
DOCS = PUBLIC / 'docs/smartfactoryiot'

def edit(path, old, new):
    path = FRONT / path
    source = path.read_text()
    if old not in source:
        raise ValueError(f'Expected content not found: {path}: {old[:90]}')
    path.write_text(source.replace(old, new))

# Keep every SVG shape, coordinate, font, colour and icon unchanged.
labels = {
    'Node-RED adapters, trusted Python gateways, durable telemetry and asset standards':
        'Python: identity, validation, provenance, durable queue, command policy and optional security collection',
    'Managed MQTT transport': 'Oracle-hosted MQTT/TLS',
    'Machines + WROVER sensors': 'Node-RED adapters (optional)',
    'Node-RED + Python': 'Python edge agent',
    'Optional adapters → gateway': 'Identity • checks • provenance',
    'Identity • validation • spool': 'Queue • TLS • command policy',
    'Individual TLS identities': 'Separate provisioning required',
    'Local acquisition': 'Local Mosquitto',
    'CloudAMQP': 'Mosquitto',
    'Managed MQTT broker': 'Oracle-hosted MQTT',
    'or direct device': 'Python policy checked',
    'Individually authenticated devices may also publish directly.':
        'Direct MQTT devices require separate credentials, reachability and ACLs; the current Pi-only policy does not enable them.',
}
for old, new in labels.items():
    edit('scripts/build-smart-factory-architecture.mjs', old, new)
edit('client/src/data/projects.ts', '"CloudAMQP"', '"Mosquitto"')
edit('client/src/data/smartFactory.ts',
     'Optional Node-RED adapters → Python edge validation and spool → MQTT TLS',
     'Optional Node-RED → local Mosquitto → Python trust boundary → Oracle Mosquitto/TLS')
edit('client/src/data/smartFactory.ts', 'title: "Service health & recovery"', 'title: "Python edge agent"')
edit('client/src/data/smartFactory.ts',
     'Inspect infrastructure and application health, cybersecurity findings, collector coverage, queue backlogs and recovery evidence. Durable gateway and worker outboxes support retry through interruptions.',
     'Python authenticates allowlisted sources, validates payloads, units and timestamps, and stamps provenance. Its durable SQLite queue buffers accepted observations and retries delivery to Oracle-hosted Mosquitto over TLS. It enforces commissioned command policy, expiry and replay protection. Broker acknowledgement is not proof of backend persistence or physical action.')
edit('client/src/data/smartFactory.ts',
     'Review collector coverage, certificate expiry, configuration drift and imported vulnerability evidence. Investigate security findings separately from process alarms.',
     'The optional Python SecurityCollector reports read-only identity, configuration, transport and certificate evidence through a separate durable HTTPS path. It is off until commissioned. Findings remain separate from process alarms; future local AI advisory plugins are not installed or running inference.')
edit('client/src/pages/SmartFactoryIoTDetail.tsx',
     'The Vercel interface connects to Oracle-hosted API services and\n              a separate singleton telemetry/notification worker. Optional\n              Node-RED adapters and the Python gateway preserve source identity\n              and durable acquisition; BaSyx and managed data services support\n              asset identity. Safety-rated control remains on the factory LAN.',
     'Node-RED provides optional protocol adapters and transformations. Local\n              Mosquitto passes their observations to the Python edge agent for\n              source identity, validation, provenance, durable SQLite queuing\n              and command-policy enforcement. Python publishes over TLS to\n              Mosquitto on Oracle; the singleton worker persists and forwards\n              telemetry to the application API. Optional read-only security\n              collection uses a separate HTTPS path. AI inference is not enabled\n              by this edge integration. Safety-rated control stays local.')
edit('client/src/pages/SmartFactoryIoTDetail.tsx',
     'Smart Factory production architecture with Node-RED and Python edge acquisition, MQTT, Oracle API and singleton worker, Vercel, managed data and BaSyx',
     'Smart Factory architecture: Node-RED, local Mosquitto, Python identity validation provenance queue and command policy, Oracle Mosquitto, API and singleton worker')
edit('client/src/pages/SmartFactoryIoTDocumentation.tsx',
     'Smart Factory architecture with Python gateway, managed MQTT, Oracle API and worker, Vercel, PostgreSQL, Redis and BaSyx',
     'Smart Factory architecture with Python identity validation provenance and durable queue, local and Oracle Mosquitto, API and worker, Vercel, PostgreSQL and BaSyx')
edit('client/src/pages/SmartFactoryIoTDocumentation.tsx',
     'Production cutover, independent rollback qualification and physical edge commissioning remain governed release gates. The diagram distinguishes factory-local control from software acquisition and managed services.',
     'Reviewed against the project repositories on 6 November 2026. The current edge guide specifies local and Oracle-hosted Mosquitto. Python owns the trust boundary and durable queue; Node-RED is an optional adapter. Physical commissioning remains separately verified.')
edit('client/src/pages/SmartFactoryIoTDocumentation.tsx',
     'title: "Canonical platform architecture", description: "Source-of-truth application services, data ownership and runtime boundaries.", url: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-backend/ARCHITECTURE.md"',
     'title: "Current gateway and broker", description: "Local and Oracle Mosquitto, Python validation, queue delivery and policy boundaries.", url: "https://github.com/DruHustle/smart-factory/blob/main/smart-factory-edge/raspberry-pi/README.md"')
edit('client/src/pages/SmartFactoryIoTDocumentation.tsx',
     'Vercel delivery, the Oracle API and singleton worker, durable MQTT edge paths, managed data services, and the BaSyx runtime.',
     'Node-RED adapters, the Python trust boundary, local and Oracle Mosquitto, durable delivery, API/worker roles and BaSyx asset identity.')
# Logistics and Farmer do NOT inherit Factory's MQTT uplink.
edit('client/src/data/smartFarmer.ts',
     'Independent Node-RED adapters and Python/transport gateways',
     'Optional Node-RED/Python signed-HTTPS observation path; separate equipment/camera gateways')
edit('client/src/pages/SmartFarmerDetail.tsx',
     'PostgreSQL and private media. Farm gateways validate equipment and',
     'PostgreSQL and private media. The optional Python observation agent\n              validates identity and schema, uses a SQLite outbox, and sends\n              signed HTTPS; it has no remote-start/stop API. Separate gateways handle')
# Refresh the image's existing text only; retain original geometry and typography.
for p in [PUBLIC / 'images/smart_farmer_arch.svg', FRONT / 'design/smart-farmer-architecture.svg']:
    text = p.read_text()
    text = text.replace('Independent gateway', 'Python observation agent')
    text = text.replace('Optional Node-RED + Python', 'Identity, schema, SQLite outbox')
    text = text.replace('Local safety boundary', 'Signed HTTPS uplink')
    text = text.replace('Interlocks, replay journal', 'No control API in Python path')
    p.write_text(text)

sources = [
    'smart-factory-edge/raspberry-pi/README.md',
    'smart-factory-edge/deploy/node-red/README.md',
    'smart-factory-frontend/docs/architecture.md',
    'smart-factory-frontend/docs/api-flows.md',
    'smart-factory-frontend/docs/database-schema.md',
]
source_hashes = {}
source_texts = {}
for path in sources:
    url = f'https://raw.githubusercontent.com/DruHustle/smart-factory/{FACTORY_SHA}/{path}'
    with urllib.request.urlopen(url, timeout=30) as response:
        data = response.read()
    source_hashes[path] = hashlib.sha256(data).hexdigest()
    source_texts[path] = data.decode()

def absolute_links(text, source_path):
    def rewrite(match):
        target = match.group(1)
        if target.startswith(('http:', 'https:', '#', 'mailto:')):
            return match.group(0)
        return '](' + BASE + posixpath.normpath(posixpath.join(posixpath.dirname(source_path), target)) + ')'
    return re.sub(r'\]\(([^\s)]+)\)', rewrite, text)

review = f'''\n\n## Current edge and broker responsibilities\n\nSource review: **6 November 2026**, canonical Smart Factory commit `{FACTORY_SHA}`. The current [Raspberry Pi gateway guide]({BASE}smart-factory-edge/raspberry-pi/README.md) specifies **local Mosquitto on the Pi and production Mosquitto in a separate Oracle VM container**. Older backend diagrams and staging runbooks contain superseded broker-provider references; the current edge guide and source-specific configuration take precedence. This documentation review is not a new inspection of the VM or physical commissioning.\n\n| Component | Responsibility and limits |\n| --- | --- |\n| Node-RED (optional) | Protocol/vendor adapters and transformations. Per-source commissioning and publish-only local broker ACLs; no cloud credentials or actuator authority. Existing native Python drivers remain available. |\n| Python identity and validation | Check allowed source/topic, schema, types, units and timestamps. Stamp gateway provenance; reject spoofed integration claims and preserve unverified/bad quality until approved. |\n| Python durable delivery | Persist accepted observations in SQLite before acknowledging eligible local messages; retry across restarts/outages with original timestamps. Remove upstream QoS 1/2 entries only after the corresponding broker handshake. This is not an end-to-end exactly-once guarantee. |\n| Python command policy | Enforce authorized, commissioned targets and command expiry/replay protection. Safety interlocks and manual override stay at the machine. An acknowledgement is not physical feedback. |\n| Python cybersecurity | Optional read-only SecurityCollector with an independent durable HTTPS path for identity, configuration, transport and certificate evidence. Disabled until its namespace/token is commissioned. |\n| Python AI | Future optional read-only advisory plugins. This integration installs no model and enables no AI inference; it cannot bypass command policy. |\n| Oracle Mosquitto and worker | TLS, dedicated credentials and scoped topics. The .NET worker independently persists/validates telemetry and retries application-API delivery. Redis is transient fan-out, not the durable telemetry record. |\n\nDirect MQTT devices need separate credentials, network reachability and device ACLs. The current Pi-only broker policy does **not** enable them. Node-RED and Python do not replace safety-rated controller functions. See [Node-RED commissioning and Python security/AI scope]({BASE}smart-factory-edge/deploy/node-red/README.md).\n'''
for name in ['architecture', 'api-flows', 'database-schema']:
    source_path = f'smart-factory-frontend/docs/{name}.md'
    text = absolute_links(source_texts[source_path], source_path)
    first, rest = text.split('\n', 1)
    text = first + review + '\n' + rest
    text = text.replace('CloudAMQP', 'Oracle Mosquitto').replace('MQTT TLS/AMQPS', 'MQTT TLS')
    text = text.replace('Managed PostgreSQL, Redis and MQTT and the private BaSyx/Caddy stack retain their existing providers.', 'PostgreSQL and Redis retain their configured providers; MQTT runs in the separate Oracle Mosquitto container alongside the private BaSyx/Caddy stack.')
    text = text.replace('Broker[MQTT TLS broker]', 'Broker[Mosquitto on Oracle - TLS]')
    text = text.replace('Other eligible devices with native MQTT/TLS and per-device identities may connect directly to Oracle Mosquitto.', 'The direct-device software path requires separate provisioning and is not enabled by the current Pi-only broker policy.')
    (DOCS / f'{name}.md').write_text(text)

(DOCS / 'deployment.md').write_text('''# Smart Factory Deployment Guide\n''' + review + '''\n## Runtime boundaries\n\n```mermaid\nflowchart TB\n  Web[Vercel React UI and same-origin proxy] --> API[Oracle Node API and private .NET services]\n  NodeRed[Optional Node-RED adapters] --> Local[Pi-local Mosquitto]\n  Local --> Python[Python identity validation provenance and SQLite spool]\n  Python -->|MQTT TLS| Broker[Oracle Mosquitto container]\n  Broker --> Worker[One telemetry and notification worker]\n  Worker -->|Authenticated durable retry| API\n  API --> DB[(PostgreSQL)]\n  API --> Redis[Transient Redis fan-out]\n  API --> AAS[Private BaSyx runtime]\n```\n\n## Configuration and release\n\nKeep gateway, local sensor, worker and application identities separate. Node-RED receives only per-source local publish rights. The central broker uses TLS with hostname verification, dedicated credentials, topic ACLs and persistent storage. A native MQTT device is not authorized merely because software supports that path.\n\nQualify an immutable application revision with its migrations, API compatibility, singleton-worker receipt, backup and rollback evidence. Install API changes before the matching worker, and never run duplicate consumers with the same persistent identity. The historical RENDER_SERVICE_ROLE variable is a compatibility identifier, not evidence of Render hosting.\n\nDeployments and provider changes are not performed by visiting this portfolio. No credentials, internal endpoints or farm/factory device settings belong in the public documentation. Kubernetes manifests alone do not establish a running cluster.\n\n## Verification and rollback\n\nTest local identity rejection, invalid/stale payloads, queue-full handling, process restart, TLS reconnect, duplicate deliveries and original timestamp preservation. Check worker persistence separately from broker receipt. For any authorized physical command, validate expiry, replay rejection, manual override and observed feedback at the installation. Retain known-good runtime settings and queues for rollback.\n\n## Source references\n\n- [Current gateway and broker](''' + BASE + '''smart-factory-edge/raspberry-pi/README.md)\n- [Consolidated release gates](''' + BASE + '''docs/consolidated-release.md)\n- [Oracle deployment runbook](''' + BASE + '''smart-factory-frontend/deploy/oracle/README.md)\n''')
(DOCS / 'system-diagrams.md').write_text('''# Smart Factory System Diagrams\n''' + review + '''\n## Acquisition and trusted delivery\n\n```mermaid\nflowchart LR\n  Source[Machine or sensor] --> NR[Optional Node-RED adapters]\n  NR --> Local[Local Mosquitto - source ACLs]\n  Local --> Agent[Python trust boundary]\n  Native[Existing native Python drivers] --> Agent\n  Agent --> Queue[(Durable SQLite spool)]\n  Queue -->|TLS| Broker[Oracle Mosquitto]\n  Broker --> Worker[.NET telemetry worker]\n  Worker --> Data[(PostgreSQL outbox)]\n  Data --> API[Authenticated application API]\n```\n\n## Python policy boundaries\n\n```mermaid\nflowchart TB\n  Input[Source observation] --> Identity[Allowlist and topic identity]\n  Identity --> Validate[Schema units timestamps quality]\n  Validate --> Provenance[Gateway-stamped provenance]\n  Provenance --> Queue[Durable enqueue before local ACK]\n  Queue --> Uplink[Retry with original observation time]\n  Commands[Separately authorized command] --> Policy[Commissioned target expiry replay checks]\n  Policy --> Local[Local interlocks and manual override]\n  Security[Optional read-only SecurityCollector] --> Outbox[Independent durable security queue]\n  Outbox --> HTTPS[Authenticated HTTPS evidence API]\n```\n\n## Evidence interpretation\n\nA broker receipt is not database persistence, a command receipt is not physical feedback, and an offline connection is not confirmed production downtime. Missing clocks, stale values and uncommissioned sources remain explicit. The browser Assistant and future Python AI plugins are distinct; neither has implicit control authority.\n\n## Independent applications\n\nSmart Logistics and Smart Farmer have their own Node-RED/Python, identities, storage and policies. Their documented Python observation paths send signed HTTPS, not Smart Factory's MQTT uplink. Farmer's optional Python path has no remote-start/stop API; its equipment/camera gateways are separate.\n''')
# Remove superseded vendor names from ancillary published text and old generated SVGs.
for path in (PUBLIC / 'docs').rglob('*'):
    if path.suffix not in {'.md', '.html', '.svg'}:
        continue
    text = path.read_text()
    if 'CloudAMQP' in text:
        path.write_text(text.replace('CloudAMQP', 'Oracle Mosquitto').replace('MQTT TLS/AMQPS', 'MQTT TLS'))

# Allow a targeted rebuild without changing Logistics or the resume.
edit('scripts/build-docs.mjs', 'const manifest = { generator: "scripts/build-docs.mjs", documents: {} };',
     'const selection = process.env.DOC_PROJECT;\nif (selection && !projects.some(project => project.directory === selection)) throw new Error("Unknown documentation project");\nconst manifest = selection\n  ? JSON.parse(await readFile(path.join(root, "client/public/docs/manifest.json"), "utf8"))\n  : { generator: "scripts/build-docs.mjs", documents: {} };')
edit('scripts/build-docs.mjs', 'for (const project of projects) {', 'for (const project of projects.filter(project => !selection || project.directory === selection)) {')
edit('scripts/build-docs.mjs', 'Source review: 21 October 2026', 'Source review: ${project.directory === "smartfactoryiot" ? "6 November 2026" : "21 October 2026"}')
edit('scripts/build-docs.mjs', '  const resume = await browser.newPage();', '  if (!selection) {\n  const resume = await browser.newPage();')
edit('scripts/build-docs.mjs', '    await resume.close();\n  }\n} finally', '    await resume.close();\n  }\n  }\n} finally')
# Update expectations while retaining the unchanged geometry hash assertion.
edit('e2e/content-preservation.spec.ts', 'expect(svg).toContain("Node-RED + Python");', 'expect(svg).toContain("Python edge agent");\n  expect(svg).toContain("Mosquitto");\n  expect(svg).not.toContain("CloudAMQP");')
edit('e2e/content-preservation.spec.ts', 'expect(svg).toContain("Optional adapters → gateway");', 'expect(svg).toContain("Node-RED adapters (optional)");\n  expect(svg).toContain("Queue • TLS • command policy");')

review_data = {
    'reviewedAt': '2026-11-06',
    'repositories': {'smart-factory': FACTORY_SHA, 'smart-logistics': LOGISTICS_SHA, 'smart-farmer': FARMER_SHA},
    'factorySourcesSha256': source_hashes,
    'sourcePrecedence': 'Current Raspberry Pi README for deployed messaging; Node-RED README for optional adapters/security/AI; application architecture and contracts for service/data ownership. Older staging documents are not current-production evidence.',
    'factoryBroker': 'Pi-local Mosquitto and separate Oracle Mosquitto container over TLS',
    'factoryPython': ['source identity', 'schema/units/time validation', 'gateway provenance', 'durable SQLite queue', 'TLS uplink and retry', 'commissioned command policy', 'optional read-only SecurityCollector'],
    'pythonAI': 'Future optional read-only plugins; no installed model or enabled inference in this integration',
    'otherPythonUplinks': {'smart-logistics': 'signed HTTPS; independent workspace-scoped observations', 'smart-farmer': 'signed HTTPS; independent farm observations; no control API in Python path'},
    'limits': 'Repository documentation review, not new VM/physical-equipment commissioning evidence.'
}
(ROOT / 'docs/portfolio-content-review.json').write_text(json.dumps(review_data, indent=2) + '\n')
print('Updated source content without changing portfolio styling or SVG geometry.')
