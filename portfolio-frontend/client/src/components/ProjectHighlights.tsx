import type { LucideIcon } from "lucide-react";

/** Preserve the compact value-and-label cards used by the original project heroes. */
export function ProjectHighlights({
  highlights,
  icons,
  accent,
  largeValue = false,
}: {
  highlights: { label: string; value: string }[];
  icons: LucideIcon[];
  accent: "orange" | "cyan";
  largeValue?: boolean;
}) {
  const orange = accent === "orange";
  return (
    <div className="grid gap-4" data-testid="project-highlights">
      {highlights.map((highlight, index) => {
        const Icon = icons[index];
        return (
          <div
            key={highlight.label}
            className={`flex items-center gap-6 rounded-2xl border p-6 ${orange ? "border-slate-700/50 bg-slate-800/50 backdrop-blur-sm" : "border-slate-800 bg-slate-900"}`}
          >
            <Icon
              aria-hidden="true"
              className={`size-8 shrink-0 ${orange ? "text-orange-400" : "text-cyan-400"}`}
            />
            <div className="min-w-0">
              <div
                className={`${largeValue ? "text-3xl" : "text-2xl"} font-bold text-white`}
              >
                {highlight.value}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {highlight.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
