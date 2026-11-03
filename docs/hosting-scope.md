# Hosting scope reviewed for the Onesa infrastructure migration

The current portfolio production application is the static Vite build served by
Vercel at `https://andrewgotora.com/`. Its `vercel.json` publishes `dist` and has
no backend API proxy. The browser uses bundled project/content data. The README
already states that the optional Express/tRPC `server/` is not required by the
portfolio, and that its auth procedures are anonymous placeholders.

The requested separation leaves this frontend and domain on Vercel. There is no
required portfolio production database or backend service to reproduce on Render
from this repository. Creating either would add an unused service and cost.

This source review cannot prove whether an old portfolio container is still
running on an Oracle VM. Inventory live process/container ownership and incoming
traffic before retiring any such service. If that inspection finds an actively
used backend outside the current source contract, document its consumers and
data, then qualify its Render replacement before stopping it. Do not infer that
a similarly named container is safe to remove.

No Oracle resources, Vercel settings, DNS, paid Render services or databases were
changed by this review. No new deployment manifest is needed for the current
static portfolio.
