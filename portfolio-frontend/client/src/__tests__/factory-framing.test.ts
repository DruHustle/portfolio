import { describe, expect, it } from "vitest";
import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Vector3,
} from "three";
import { frameFactoryView } from "@/components/smart-factory/factory-framing";

describe("factory framing", () => {
  for (const [width, height] of [
    [343, 229],
    [720, 480],
    [1216, 760],
  ]) {
    it(`fills the ${width}×${height} view and fits the complete workshop on request`, () => {
      const workshop = new Group();
      const floor = new Mesh(
        new BoxGeometry(24, 0.3, 28),
        new MeshBasicMaterial()
      );
      const back = new Mesh(new BoxGeometry(24, 4.5, 0.2), floor.material);
      back.position.set(0, 2.1, -14);
      workshop.add(floor, back);
      workshop.position.set(2, 0, -1);
      const camera = new OrthographicCamera(-20, 20, 20, -20, 0.1, 500);
      camera.position.set(23, 24, 29);
      camera.lookAt(0, 0, 0);
      const project = () => {
        const points: Vector3[] = [];
        for (const mesh of [floor, back]) {
          const vertices = mesh.geometry.attributes.position;
          for (let i = 0; i < vertices.count; i++) {
            points.push(
              mesh
                .localToWorld(new Vector3().fromBufferAttribute(vertices, i))
                .project(camera)
            );
          }
        }
        return points;
      };
      frameFactoryView(camera, workshop, width, height, "fill");
      let points = project();
      expect(Math.min(...points.map(p => p.x))).toBeLessThan(-1);
      expect(Math.max(...points.map(p => p.x))).toBeGreaterThan(1);
      expect(Math.min(...points.map(p => p.y))).toBeLessThan(-1);
      expect(Math.max(...points.map(p => p.y))).toBeGreaterThan(1);
      frameFactoryView(camera, workshop, width, height, "fit");
      points = project();
      expect(points.every(p => Math.abs(p.x) < 1 && Math.abs(p.y) < 1)).toBe(
        true
      );
      floor.geometry.dispose();
      back.geometry.dispose();
      floor.material.dispose();
    });
  }
});
