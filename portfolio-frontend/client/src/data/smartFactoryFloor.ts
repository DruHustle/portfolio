import { assetUrl } from "@/lib/urls";

export interface InventoryItem {
  ref: string;
  id: string;
  name: string;
  itemType: string;
  zone: string | null;
  location: string | null;
  kind: "equipment" | "device" | "asset";
  mode: string;
  status: string;
  equipmentId: string | null;
}

export type FloorLink = {
  from: string;
  to: string;
  kind: "acquisition" | "gateway" | "process" | "fx";
  label: string;
};
export type FloorPlacement = {
  item: InventoryItem;
  x: number;
  z: number;
  model: string | null;
  rotation?: number;
};
export type FloorZone = {
  name: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  count: number;
};

/** Layout is illustrative; discovery does not establish physical coordinates. */
export function floorModel(
  item: Pick<InventoryItem, "itemType" | "name"> &
    Partial<Pick<InventoryItem, "kind">>
): string | null {
  const type = `${item.itemType} ${item.name}`.toLowerCase();
  // A sensor's monitored machine name does not make it another production machine.
  if (item.kind === "device") {
    if (/controller|plc|switch/.test(type)) return "control-cabinet";
    if (/gateway/.test(type)) return "raspberry-pi-4b";
    return null;
  }
  if (/conveyor|infeed|outfeed/.test(type)) return "conveyor";
  if (/robot|palletiz/.test(type)) return "robot-arm";
  if (/tank|vessel|mixer/.test(type)) return "storage-tank";
  if (/valve/.test(type)) return "valve";
  if (/cabinet|plc|controller|switch|transformer|workstation|server/.test(type))
    return "control-cabinet";
  if (/raspberry|gateway|edge/.test(type)) return "raspberry-pi-4b";
  if (/pump|motor|compressor|turbine/.test(type)) return "pump-motor";
  return null;
}

export function layoutFactory(items: InventoryItem[]) {
  const grouped = new Map<string, InventoryItem[]>();
  for (const item of [...items].sort(
    (a, b) => a.name.localeCompare(b.name) || a.ref.localeCompare(b.ref)
  )) {
    const name = item.zone?.trim() || item.location?.trim() || "Unassigned";
    grouped.set(name, [...(grouped.get(name) ?? []), item]);
  }
  const columns = Math.max(1, Math.ceil(Math.sqrt(grouped.size)));
  const groups = [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
  const widths = Array(columns).fill(0) as number[];
  const depths = Array(Math.ceil(groups.length / columns)).fill(0) as number[];
  const dimensions = groups.map(([, nodes], index) => {
    const machinery = nodes.filter(item => item.kind !== "device");
    const instruments = nodes.filter(item => item.kind === "device");
    const cols = Math.min(
      3,
      Math.max(2, Math.ceil(Math.sqrt(machinery.length)))
    );
    const instrumentCols = Math.min(
      6,
      Math.max(2, Math.floor((cols * 3.7) / 1.2))
    );
    const instrumentRows = Math.ceil(instruments.length / instrumentCols);
    const width = Math.max(cols * 3.7 + 2.2, instrumentCols * 1.2 + 2.4);
    const depth = Math.max(
      7,
      Math.ceil(machinery.length / cols) * 3.6 + instrumentRows * 1.25 + 3.4
    );
    widths[index % columns] = Math.max(widths[index % columns], width);
    depths[Math.floor(index / columns)] = Math.max(
      depths[Math.floor(index / columns)],
      depth
    );
    return {
      cols,
      width,
      depth,
      machinery,
      instruments,
      instrumentCols,
      instrumentRows,
    };
  });
  const width =
      widths.reduce((a, b) => a + b, 0) + Math.max(0, widths.length - 1) * 2,
    depth =
      depths.reduce((a, b) => a + b, 0) + Math.max(0, depths.length - 1) * 2;
  const placements: FloorPlacement[] = [],
    zones: FloorZone[] = [];
  groups.forEach(([name, nodes], index) => {
    const col = index % columns,
      row = Math.floor(index / columns),
      d = dimensions[index];
    const x = widths.slice(0, col).reduce((a, b) => a + b + 2, 0) - width / 2;
    const z = depths.slice(0, row).reduce((a, b) => a + b + 2, 0) - depth / 2;
    zones.push({
      name,
      x,
      z,
      width: d.width,
      depth: d.depth,
      count: nodes.length,
    });
    // Instrumentation occupies a compact service strip behind each work cell.
    // A sensor does not reserve the footprint of a production machine.
    d.instruments.forEach((item, n) =>
      placements.push({
        item,
        x: x + 1.8 + (n % d.instrumentCols) * 1.2,
        z: z + 1.8 + Math.floor(n / d.instrumentCols) * 1.25,
        model: floorModel(item),
      })
    );
    d.machinery.forEach((item, n) =>
      placements.push({
        item,
        x: x + 2.8 + (n % d.cols) * 3.7,
        z: z + d.instrumentRows * 1.25 + 3.1 + Math.floor(n / d.cols) * 3.6,
        model: floorModel(item),
      })
    );
  });
  return {
    placements,
    zones,
    width: Math.max(width, 12),
    depth: Math.max(depth, 12),
  };
}

export function floorModelUrl(slug: string) {
  return assetUrl("models/smart-factory/" + slug + ".glb");
}

/** Authored illustrative factory from scripts/showcase/factory-floor.ts; no live data. */
const authoredItems = [
  [
    "tank-03",
    "Finished product buffer tank",
    "storage-tank",
    "Process utilities",
    "equipment",
  ],
  [
    "cabinet-04",
    "Quality inspection cabinet",
    "control-cabinet",
    "Assembly",
    "equipment",
  ],
  [
    "conveyor-04",
    "Pallet dispatch conveyor",
    "conveyor",
    "Packaging",
    "equipment",
  ],
  ["robot-04", "Case packing robot", "robot-arm", "Packaging", "equipment"],
  [
    "tank-01",
    "Feed storage tank",
    "storage-tank",
    "Process utilities",
    "equipment",
  ],
  [
    "tank-02",
    "Buffer storage tank",
    "storage-tank",
    "Process utilities",
    "equipment",
  ],
  [
    "valve-01",
    "Feed isolation valve",
    "valve",
    "Process utilities",
    "equipment",
  ],
  [
    "pump-02",
    "Transfer pump and motor",
    "pump-motor",
    "Process utilities",
    "equipment",
  ],
  [
    "mixer-01",
    "Mixing vessel",
    "storage-tank",
    "Process utilities",
    "equipment",
  ],
  [
    "conveyor-01",
    "Assembly infeed conveyor",
    "conveyor",
    "Assembly",
    "equipment",
  ],
  [
    "conveyor-02",
    "Assembly transfer conveyor",
    "conveyor",
    "Assembly",
    "equipment",
  ],
  [
    "robot-01",
    "Assembly pick and place robot",
    "robot-arm",
    "Assembly",
    "equipment",
  ],
  [
    "robot-02",
    "Assembly finishing robot",
    "robot-arm",
    "Assembly",
    "equipment",
  ],
  [
    "cabinet-01",
    "Assembly control cabinet",
    "control-cabinet",
    "Assembly",
    "equipment",
  ],
  [
    "conveyor-03",
    "Packaging outfeed conveyor",
    "conveyor",
    "Packaging",
    "equipment",
  ],
  [
    "robot-03",
    "Packaging palletizing robot",
    "robot-arm",
    "Packaging",
    "equipment",
  ],
  ["valve-02", "Packaging pneumatic valve", "valve", "Packaging", "equipment"],
  [
    "cabinet-02",
    "Packaging control cabinet",
    "control-cabinet",
    "Packaging",
    "equipment",
  ],
  [
    "pi-02",
    "Raspberry Pi inspection gateway",
    "raspberry-pi-4b",
    "Edge and network",
    "equipment",
  ],
  [
    "cabinet-03",
    "Network control cabinet",
    "control-cabinet",
    "Edge and network",
    "equipment",
  ],
  [
    "showcase.gateway:process",
    "Process utilities gateway",
    "gateway",
    "Process utilities",
    "device",
  ],
  [
    "showcase.gateway:assembly",
    "Assembly gateway",
    "gateway",
    "Assembly",
    "device",
  ],
  [
    "showcase.gateway:packaging",
    "Packaging gateway",
    "gateway",
    "Packaging",
    "device",
  ],
  [
    "showcase.gateway:network",
    "Edge and network gateway",
    "gateway",
    "Edge and network",
    "device",
  ],
  [
    "showcase.fx.plc:process",
    "FX Process PLC",
    "controller",
    "Process utilities",
    "device",
  ],
  [
    "showcase.fx.plc:assembly",
    "FX Assembly PLC",
    "controller",
    "Assembly",
    "device",
  ],
  [
    "showcase.fx.robot:01",
    "FX Robot controller",
    "controller",
    "Assembly",
    "device",
  ],
  [
    "showcase.fx.plc:packaging",
    "FX Packaging PLC",
    "controller",
    "Packaging",
    "device",
  ],
  [
    "showcase.floor:feed-temperature",
    "Feed temperature sensor",
    "sensor",
    "Process utilities",
    "device",
  ],
  [
    "showcase.floor:feed-pressure",
    "Feed pressure sensor",
    "sensor",
    "Process utilities",
    "device",
  ],
  [
    "showcase.floor:pump-vibration",
    "Transfer pump vibration sensor",
    "sensor",
    "Process utilities",
    "device",
  ],
  [
    "showcase.floor:assembly-infeed",
    "Assembly infeed photoelectric sensor",
    "sensor",
    "Assembly",
    "device",
  ],
  [
    "showcase.floor:assembly-vision",
    "Assembly vision inspection sensor",
    "sensor",
    "Assembly",
    "device",
  ],
  [
    "showcase.floor:robot-vibration",
    "Robot vibration sensor",
    "sensor",
    "Assembly",
    "device",
  ],
  [
    "showcase.floor:packaging-count",
    "Packaging count sensor",
    "sensor",
    "Packaging",
    "device",
  ],
  [
    "showcase.floor:packaging-pressure",
    "Packaging air pressure sensor",
    "sensor",
    "Packaging",
    "device",
  ],
  [
    "showcase.floor:cabinet-environment",
    "Cabinet environment sensor",
    "sensor",
    "Edge and network",
    "device",
  ],
  [
    "showcase.floor:energy-meter",
    "Factory energy meter",
    "sensor",
    "Edge and network",
    "device",
  ],
  [
    "showcase.floor:tsn-switch",
    "TSN distribution switch",
    "edge_device",
    "Edge and network",
    "device",
  ],
  [
    "showcase.floor:grandmaster",
    "PTP grandmaster clock",
    "edge_device",
    "Edge and network",
    "device",
  ],
] as const;

export const factoryItems: InventoryItem[] = authoredItems.map(
  ([id, name, itemType, zone, kind]) => ({
    ref: `${kind}:${id}`,
    id,
    name,
    itemType,
    zone,
    location: zone,
    kind,
    mode: "simulated",
    status: "unknown",
    equipmentId: kind === "equipment" ? id : null,
  })
);
export type FactoryLayout = ReturnType<typeof layoutFactory>;
