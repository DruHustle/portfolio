/** Resolve public assets relative to the configured application base. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
}

const demos = {
  imsop: "https://imsop-app.vercel.app/",
  "sap-btp-ai-hub": "https://tech-learning-hub-app.vercel.app/",
  "smart-factory-iot": "https://smart-factory-iot-app.vercel.app/",
};

/** Verified public demo destinations, independent of the portfolio's host. */
export function demoUrl(project: keyof typeof demos): string {
  return demos[project];
}
