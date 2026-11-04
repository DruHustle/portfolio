import {
  Matrix4,
  Mesh,
  Vector3,
  type Object3D,
  type OrthographicCamera,
} from "three";

export type FactoryFraming = "fill" | "fit";

/** Frame the rendered workshop surfaces instead of an inflated imaginary box. */
export function frameFactoryView(
  camera: OrthographicCamera,
  workshop: Object3D,
  width: number,
  height: number,
  mode: FactoryFraming
) {
  if (width <= 0 || height <= 0) return null;
  camera.updateMatrixWorld(true);
  workshop.updateWorldMatrix(true, true);
  const point = new Vector3();
  const transform = new Matrix4();
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  workshop.traverse(object => {
    if (!(object instanceof Mesh) || !object.visible) return;
    const positions = object.geometry.getAttribute("position");
    if (!positions) return;
    transform.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
    for (let i = 0; i < positions.count; i++) {
      point.fromBufferAttribute(positions, i).applyMatrix4(transform);
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }
  });
  if (!Number.isFinite(minX)) return null;
  const aspect = width / height;
  const halfWidth = (maxX - minX) / 2;
  const halfHeight = (maxY - minY) / 2;
  const extent =
    mode === "fill"
      ? Math.min(halfWidth / aspect, halfHeight) * 0.985
      : Math.max(halfWidth / aspect, halfHeight) * 1.04;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  camera.left = centerX - extent * aspect;
  camera.right = centerX + extent * aspect;
  camera.top = centerY + extent;
  camera.bottom = centerY - extent;
  camera.updateProjectionMatrix();
  const lower = new Vector3(minX, minY, 0).applyMatrix4(
    camera.projectionMatrix
  );
  const upper = new Vector3(maxX, maxY, 0).applyMatrix4(
    camera.projectionMatrix
  );
  return {
    left: (lower.x + 1) / 2,
    right: (upper.x + 1) / 2,
    top: (1 - upper.y) / 2,
    bottom: (1 - lower.y) / 2,
  };
}
