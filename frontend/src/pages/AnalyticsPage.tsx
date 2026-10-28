import { ExternalLink, BarChart3 } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";

export default function AnalyticsPage() {
  const enabled = import.meta.env.VITE_ENABLE_ANALYTICS === "true";
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <PageNavigation backLabel="Back to Home" />
      <main
        id="main-content"
        tabIndex={-1}
        className="container py-12 sm:py-20"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-cyan-300 text-sm font-semibold mb-3">
            Portfolio insights
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Analytics
          </h1>
          <p className="text-slate-300 mb-10">
            Visitor reports are available to the site owner in the Vercel
            dashboard. This public page does not display visitor data.
          </p>
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10">
            <BarChart3
              aria-hidden="true"
              className="size-10 text-cyan-300 mb-6"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {enabled
                ? "Analytics configured"
                : "Analytics not enabled for this build"}
            </h2>
            <p className="text-slate-300 mb-8">
              {enabled
                ? "This build includes Vercel Web Analytics. Collection depends on analytics being enabled for the deployed Vercel project; live collection status is not verified here."
                : "This build does not load the Vercel tracking script. No live metrics are available on this page."}
            </p>
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-cyan-300 text-slate-950 rounded-lg font-semibold hover:bg-cyan-200"
            >
              Open Vercel dashboard{" "}
              <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
            </a>
            <p className="text-sm text-slate-400 mt-4">
              Requires the site owner's Vercel account.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
