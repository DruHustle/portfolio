import type { layoutFactory } from "@/data/smartFactoryFloor";

export type FloorLayout = ReturnType<typeof layoutFactory>;
export type FloorSelect = (ref: string, revealDetails?: boolean) => void;
export type FloorMove = (ref: string, x: number, z: number) => void;
export function constrainFloorPosition(
  layout: FloorLayout,
  x: number,
  z: number
) {
  return {
    x: Math.max(-layout.width / 2 + 1, Math.min(layout.width / 2 - 1, x)),
    z: Math.max(-layout.depth / 2 + 1, Math.min(layout.depth / 2 - 1, z)),
  };
}
