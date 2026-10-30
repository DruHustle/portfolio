import { ArrowDown, ArrowRight, Network, Radio, Server } from "lucide-react";
import { smartFactoryGuides } from "@/data/smartFactory";

export function SmartFactoryNetwork() {
  return (
    <section aria-labelledby="industrial-networking" className="space-y-8">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400">
          Industrial communication
        </p>
        <h2
          id="industrial-networking"
          className="text-3xl font-bold sm:text-4xl"
        >
          OPC UA FX & TSN, made visible
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">
          Understand which controllers exchange data, how their clocks are
          synchronized, and what the available timing evidence says about
          delivery.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 sm:p-8">
          <Network aria-hidden="true" className="mb-5 size-7 text-orange-400" />
          <h3 className="text-xl font-bold">
            OPC UA FX: interoperable field exchange
          </h3>
          <p className="mt-4 leading-relaxed text-slate-300">
            Field eXchange models AutomationComponents, their FunctionalEntities
            and logical controller connections. OPC UA PubSub carries process
            data between endpoints. Smart Factory presents reported connections
            and monitoring coverage in its FX & TSN workspace.
          </p>
          <a
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-orange-300 underline underline-offset-4 hover:text-orange-200"
            href="https://reference.opcfoundation.org/specs/OPC-10000-81/5.5.6.1"
            target="_blank"
            rel="noopener noreferrer"
          >
            OPC Foundation reference
          </a>
        </article>
        <article className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 sm:p-8">
          <Radio aria-hidden="true" className="mb-5 size-7 text-cyan-300" />
          <h3 className="text-xl font-bold">TSN: time-aware Ethernet</h3>
          <p className="mt-4 leading-relaxed text-slate-300">
            Time-Sensitive Networking brings synchronized time and managed
            traffic to Ethernet. Capabilities include 802.1AS clock
            synchronization, scheduled traffic, preemption, policing and
            redundancy, according to the selected profile and supported
            hardware.
          </p>
          <a
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-cyan-200 underline underline-offset-4 hover:text-cyan-100"
            href="https://1.ieee802.org/tsn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IEEE TSN reference
          </a>
        </article>
      </div>
      <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-5 sm:p-8">
        <p className="mb-5 text-sm font-bold text-slate-300">
          Factory LAN · local process-data exchange
        </p>
        <div className="grid items-center gap-3 text-center md:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
          <div className="rounded-xl border border-slate-600 bg-slate-800 p-5">
            <Server
              aria-hidden="true"
              className="mx-auto mb-2 size-6 text-orange-300"
            />
            <p className="font-bold">Controller A</p>
            <p className="mt-1 text-sm text-slate-400">AutomationComponent</p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="mx-auto size-5 rotate-90 text-orange-400 md:rotate-0"
          />
          <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-5">
            <p className="font-bold text-cyan-100">OPC UA PubSub</p>
            <p className="mt-2 text-sm text-slate-300">
              Ethernet with commissioned TSN capabilities where supported
            </p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="mx-auto size-5 rotate-90 text-orange-400 md:rotate-0"
          />
          <div className="rounded-xl border border-slate-600 bg-slate-800 p-5">
            <Server
              aria-hidden="true"
              className="mx-auto mb-2 size-6 text-orange-300"
            />
            <p className="font-bold">Controller B</p>
            <p className="mt-1 text-sm text-slate-400">AutomationComponent</p>
          </div>
        </div>
        <div className="my-4 flex items-center justify-center gap-3 text-sm text-slate-400">
          <ArrowDown aria-hidden="true" className="size-5 text-cyan-300" />
          Read-only collector reports
        </div>
        <div className="rounded-xl border border-orange-500/40 bg-orange-950/20 p-5 text-center">
          <p className="font-bold text-orange-200">Smart Factory diagnostics</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Connections & coverage · Clock state & offset · Latency & jitter ·
            Packet loss & deadlines
          </p>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-slate-400">
          Control traffic and network scheduling stay on the factory LAN. The
          dashboard imports and displays diagnostic evidence; timing without
          valid synchronized clocks stays unknown. OPC UA polling and MQTT
          telemetry remain separate acquisition paths.
        </p>
      </div>
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-700 px-6 py-5 sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-slate-300">
          Explore four labelled network scenarios in the product:{" "}
          <strong className="text-white">
            normal, late delivery, lost synchronization and recovery.
          </strong>{" "}
          These illustrate the diagnostics workflow; hardware timing requires
          commissioning and measurement.
        </p>
        <a
          href={smartFactoryGuides.network}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-orange-300 underline underline-offset-4 hover:text-orange-200"
        >
          FX & TSN guide <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </section>
  );
}
