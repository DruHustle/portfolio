import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Expand, Factory, Layers, Minimize, Scan } from "lucide-react";
import type FactoryFloorScene from "./SmartFactoryTwinScene";
import { FloorPlan } from "./smart-factory/FactoryFloorPlan";
import { factoryItems, layoutFactory } from "@/data/smartFactoryFloor";
import { demoUrl } from "@/lib/urls";

const zones = [...new Set(factoryItems.map(item => item.zone!))].sort();
const links: [] = [];
const control =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-orange-400 hover:bg-slate-700 aria-pressed:border-orange-400 aria-pressed:bg-orange-500/15 aria-pressed:text-orange-200";

export function SmartFactoryTwin() {
  const [loaded, setLoaded] = useState<{
    Scene: typeof FactoryFloorScene;
  } | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [view, setView] = useState<"3d" | "plan">("3d");
  const [zone, setZone] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [reset, setReset] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [positions, setPositions] = useState<
    Record<string, { x: number; z: number }>
  >({});
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    void import("./SmartFactoryTwinScene")
      .then(module => {
        if (active) setLoaded({ Scene: module.default });
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  useEffect(() => {
    const change = () =>
      setExpanded(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", change);
    return () => document.removeEventListener("fullscreenchange", change);
  }, []);

  const layout = useMemo(() => {
    const base = layoutFactory(
      zone === "all"
        ? factoryItems
        : factoryItems.filter(item => item.zone === zone)
    );
    return {
      ...base,
      placements: base.placements.map(placement => ({
        ...placement,
        ...positions[`${zone}:${placement.item.ref}`],
      })),
    };
  }, [zone, positions]);
  const select = useCallback((ref: string) => setSelected(ref || null), []);
  const move = useCallback(
    (ref: string, x: number, z: number) => {
      setPositions(current => ({ ...current, [`${zone}:${ref}`]: { x, z } }));
    },
    [zone]
  );
  const active = layout.placements.find(
    placement => placement.item.ref === selected
  )?.item;

  function fit() {
    setSelected(null);
    setReset(value => value + 1);
  }
  async function fullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await root.current?.requestFullscreen?.();
  }

  return (
    <div
      ref={root}
      className={`overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/20 ${expanded ? "flex h-full flex-col" : ""}`}
      style={
        {
          "--info": "#38bdf8",
          "--warning": "#fbbf24",
          "--card": "#1e293b",
          "--muted": "#334155",
          "--border": "#64748b",
        } as React.CSSProperties
      }
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-4 py-3 sm:px-5">
        <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-100">
          <Factory aria-hidden="true" className="size-5 text-orange-400" />
          Factory floor
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="factory-zone">
            Factory zone
          </label>
          <select
            id="factory-zone"
            value={zone}
            onChange={event => {
              setZone(event.target.value);
              setSelected(null);
            }}
            className="min-h-11 max-w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white"
          >
            <option value="all">Whole factory</option>
            {zones.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            className={control}
            aria-label="3D view"
            aria-pressed={view === "3d"}
            onClick={() => setView("3d")}
          >
            <Box aria-hidden="true" className="size-4" />
            <span className="sr-only sm:not-sr-only">3D</span>
          </button>
          <button
            className={control}
            aria-label="Floor plan"
            aria-pressed={view === "plan"}
            onClick={() => setView("plan")}
          >
            <Layers aria-hidden="true" className="size-4" />
            <span className="sr-only sm:not-sr-only">Plan</span>
          </button>
          <button
            className={control}
            aria-label="Fit factory view"
            title="Show the complete factory"
            onClick={fit}
          >
            <Scan aria-hidden="true" className="size-4" />
          </button>
          <button
            className={control}
            aria-label={expanded ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={() => void fullscreen().catch(() => {})}
          >
            {expanded ? (
              <Minimize aria-hidden="true" className="size-4" />
            ) : (
              <Expand aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`relative w-full bg-[#182532] ${expanded ? "min-h-0 flex-1" : "aspect-[3/2] min-h-[220px] max-h-[76svh]"}`}
        data-testid="twin-viewport"
      >
        {view === "3d" && loaded && !error ? (
          <loaded.Scene
            key={attempt}
            layout={layout}
            links={links}
            selected={selected}
            onSelect={select}
            onMove={move}
            dark
            reset={reset}
            zone={zone}
            onRetry={() => setAttempt(value => value + 1)}
          />
        ) : (
          <FloorPlan
            layout={layout}
            links={links}
            selected={selected}
            onSelect={select}
            onMove={move}
            reset={reset}
          />
        )}
        {error && view === "3d" && (
          <div className="absolute left-3 top-3 rounded-lg border border-slate-600 bg-slate-950/95 px-3 py-2 text-sm">
            <p role="alert">3D could not load. The floor plan is available.</p>
            <button
              className={`${control} mt-2`}
              onClick={() => {
                setError(false);
                setAttempt(value => value + 1);
              }}
            >
              Retry 3D view
            </button>
          </div>
        )}
      </div>
      <div className="grid shrink-0 gap-4 border-t border-slate-700 px-5 py-4 sm:grid-cols-2 sm:items-end">
        <label className="grid gap-2 text-sm font-semibold text-slate-300">
          Select equipment
          <select
            value={selected ?? ""}
            onChange={event => select(event.target.value)}
            className="min-h-11 w-full min-w-0 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
          >
            <option value="">Whole factory</option>
            {layout.placements.map(({ item }) => (
              <option key={item.ref} value={item.ref}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <p
          className="text-sm leading-relaxed text-slate-300"
          aria-live="polite"
        >
          {active
            ? `${active.name} · ${active.zone}. Drag to move this item; arrow keys make small adjustments.`
            : "Move the mouse to rotate · drag equipment or the floor · scroll or pinch to zoom."}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-700 px-5 py-3 text-sm">
        <p className="text-xs text-slate-400">
          Illustrative factory layout · changes stay in this preview
        </p>
        {Object.keys(positions).length > 0 && (
          <button
            className={control}
            onClick={() => {
              setPositions({});
              fit();
            }}
          >
            Reset layout
          </button>
        )}
        <a
          href={demoUrl("smart-factory-iot")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-orange-300 underline underline-offset-4 hover:text-orange-200"
        >
          Open Smart Factory
        </a>
      </div>
    </div>
  );
}
