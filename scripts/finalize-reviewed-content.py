"""Complete the one-time source review without changing layout or deployment state."""
from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]
front = root / 'portfolio-frontend'
replacements = {
    'future local AI advisory plugins are not installed or running inference.': 'Python AI advisory capability is in active development; production inference is not verified by this source review.',
    'AI inference is not enabled\n              by this edge integration.': 'Python AI advisory capability is in active development;\n              production inference is not verified by this review.',
    'Future optional read-only advisory plugins. This integration installs no model and enables no AI inference; it cannot bypass command policy.': 'Read-only AI advisory capability is in active development. Development status does not establish enabled production inference; any AI component remains subject to source authorization and command policy.',
    'future Python AI plugins': 'Python AI capability in active development',
    'Node-RED adapters, trusted Python gateways, durable telemetry and asset standards': 'Python: identity, validation, provenance, durable queue, command policy and AI in active development',
    'Python: identity, validation, provenance, durable queue, command policy and optional security collection': 'Python: identity, validation, provenance, durable queue, command policy and AI in active development',
}
for base in [front/'client/src', front/'client/public/docs', front/'scripts']:
    for p in base.rglob('*'):
        if p.suffix not in {'.tsx', '.ts', '.md', '.mjs'}:
            continue
        s = p.read_text()
        updated = s
        for a, b in replacements.items():
            updated = updated.replace(a, b)
        if updated != s:
            p.write_text(updated)

p = root/'docs/portfolio-content-review.json'
data = json.loads(p.read_text())
data['pythonAI'] = 'In active development: read-only Python AI advisory capability. Production inference is not verified by this documentation review.'
data['developmentStatusSource'] = 'Project owner clarification, 6 November 2026: the Python AI capability is being developed, not future-only.'
p.write_text(json.dumps(data, indent=2)+'\n')

p = front/'scripts/build-docs.mjs'
s = p.read_text()
a = '''            const node = new DOMParser().parseFromString(
              source,
              "image/svg+xml"
            ).documentElement;
            if (node.localName !== "svg")'''
b = '''            // Normalize Mermaid's HTML labels into well-formed SVG/XHTML.
            const node = new DOMParser().parseFromString(
              source,
              "text/html"
            ).querySelector("svg");
            if (!node || node.localName !== "svg")'''
assert a in s, 'SVG serialization hook changed'
s = s.replace(a,b)
p.write_text(s)
print('Python AI is labeled in active development; existing visual styles retained.')
