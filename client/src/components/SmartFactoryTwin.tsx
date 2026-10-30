import { useEffect, useRef, useState, type ComponentType } from "react";
import { Box, Maximize2, Play } from "lucide-react";
import { assetUrl } from "@/lib/urls";
import { smartFactoryGuides } from "@/data/smartFactory";

export function SmartFactoryTwin() {
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState<{
    Scene: ComponentType<{ onRetry: () => void }>;
  } | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  async function start() {
    setStarted(true);
    setError(false);
    try {
      const module = await import("./SmartFactoryTwinScene");
      if (mounted.current) setLoaded({ Scene: module.default });
    } catch {
      if (mounted.current) setError(true);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-5 py-4">
        <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-100">
          <Box aria-hidden="true" className="size-4 text-orange-400" /> Pump &
          motor assembly
        </p>
        <span className="text-xs font-semibold text-slate-400">
          Original Smart Factory model
        </span>
      </div>
      {started && loaded ? (
        <loaded.Scene
          key={attempt}
          onRetry={() => setAttempt(value => value + 1)}
        />
      ) : (
        <div className="relative h-[340px] bg-[#0e1827] sm:h-[460px] lg:h-[520px]">
          <img
            src={assetUrl("models/smart-factory/pump-motor-preview.webp")}
            alt="Detailed Smart Factory pump, coupling and electric motor model"
            width={752}
            height={520}
            loading="lazy"
            className="h-full w-full object-contain"
          />
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/95 via-transparent to-transparent p-6">
            <div className="text-center">
              <button
                onClick={() => void start()}
                disabled={started && !error}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-orange-700 px-5 py-3 font-bold text-white shadow-lg transition-colors hover:bg-orange-800 disabled:opacity-70"
              >
                <Play aria-hidden="true" className="size-4" />
                {error
                  ? "Retry 3D preview"
                  : started
                    ? "Loading 3D preview…"
                    : "Explore the 3D model"}
              </button>
              <p
                className="mt-3 text-xs text-slate-300"
                role={error ? "alert" : undefined}
              >
                {error
                  ? "The preview could not load. You can retry or open the full inspection guide below."
                  : "Loads on demand · 6.4 MB model"}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-700 px-5 py-4 text-sm">
        <p className="max-w-xl text-slate-400">
          Illustrative reference geometry. In Smart Factory, explicit component
          bindings connect the model to telemetry and inspection records.
        </p>
        <a
          href={smartFactoryGuides.equipment}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-orange-300 underline decoration-orange-300/40 underline-offset-4 hover:text-orange-200"
        >
          Full inspection guide{" "}
          <Maximize2 aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}
