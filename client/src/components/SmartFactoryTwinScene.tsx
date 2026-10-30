import { useEffect, useRef, useState } from "react";
import * as T from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { twinParts } from "@/data/smartFactoryModel";
import { assetUrl } from "@/lib/urls";

interface SceneApi {
  select: (name: string) => void;
  explode: (enabled: boolean) => void;
  ghost: (enabled: boolean) => void;
  reset: () => void;
  rotate: (direction: number) => void;
}

/** The portfolio preview uses the product's original model and authored poses. */
export default function SmartFactoryTwinScene({
  onRetry,
}: {
  onRetry: () => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const api = useRef<SceneApi | null>(null);
  const [status, setStatus] = useState("Loading the detailed equipment model…");
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState("Assembly");
  const [exploded, setExploded] = useState(false);
  const [ghosted, setGhosted] = useState(false);

  useEffect(() => {
    const host = viewport.current!;
    const canvas = document.createElement("canvas");
    canvas.setAttribute(
      "aria-label",
      "Interactive pump and motor: drag to orbit and pinch or scroll to zoom"
    );
    canvas.setAttribute("role", "img");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const controller = new AbortController();
    let disposed = false;
    let frame = 0;
    let renderer: T.WebGLRenderer | undefined;
    let controls: OrbitControls | undefined;
    let observer: ResizeObserver | undefined;
    let environment: T.WebGLRenderTarget | undefined;
    const scene = new T.Scene();
    scene.background = new T.Color("#0e1827");

    const disposeObject = (root: T.Object3D) =>
      root.traverse(node => {
        if (node instanceof T.Mesh || node instanceof T.LineSegments) {
          node.geometry.dispose();
          const materials = Array.isArray(node.material)
            ? node.material
            : [node.material];
          materials.forEach(material => material.dispose());
        }
      });
    const dispose = () => {
      if (disposed) return;
      disposed = true;
      controller.abort();
      cancelAnimationFrame(frame);
      observer?.disconnect();
      controls?.dispose();
      disposeObject(scene);
      environment?.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
      canvas.remove();
      document.removeEventListener("visibilitychange", draw);
      api.current = null;
    };
    function draw() {
      if (disposed || frame || document.hidden) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!disposed) renderer?.render(scene, camera);
      });
    }
    const fail = () => {
      dispose();
      setFailed(true);
      setStatus(
        "The interactive preview is unavailable in this browser. The model image and feature guide are still available."
      );
    };
    const camera = new T.PerspectiveCamera(38, 1, 0.01, 100);
    try {
      const context = canvas.getContext("webgl2", {
        antialias: true,
        alpha: false,
      });
      if (!context) {
        fail();
        return dispose;
      }
      renderer = new T.WebGLRenderer({ canvas, context, antialias: true });
      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          host.clientWidth < 600 ? 1.25 : 1.5
        )
      );
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      host.append(canvas);
      controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.minDistance = 0.3;
      controls.maxDistance = 15;
      controls.maxPolarAngle = Math.PI * 0.49;
      controls.addEventListener("change", draw);

      const room = new RoomEnvironment();
      const generator = new T.PMREMGenerator(renderer);
      environment = generator.fromScene(room, 0.04);
      scene.environment = environment.texture;
      scene.environmentIntensity = 0.65;
      room.dispose();
      generator.dispose();
      scene.add(new T.HemisphereLight(0xffffff, 0x63748b, 1.4));
      const key = new T.DirectionalLight(0xffffff, 2.3);
      key.position.set(3, 5, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = key.shadow.camera.bottom = -3;
      key.shadow.camera.right = key.shadow.camera.top = 3;
      key.shadow.normalBias = 0.02;
      scene.add(key);
      observer = new ResizeObserver(() => {
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer?.setSize(host.clientWidth, host.clientHeight, false);
        draw();
      });
      observer.observe(host);
      document.addEventListener("visibilitychange", draw);
      canvas.addEventListener("webglcontextlost", event => {
        event.preventDefault();
        if (!disposed) fail();
      });

      void fetch(assetUrl("models/smart-factory/pump-motor.glb"), {
        signal: controller.signal,
      })
        .then(response => {
          if (!response.ok) throw new Error("Model unavailable");
          return response.arrayBuffer();
        })
        .then(bytes => new GLTFLoader().parseAsync(bytes, ""))
        .then(gltf => {
          if (disposed) {
            disposeObject(gltf.scene);
            return;
          }
          const model = gltf.scene;
          scene.add(model);
          const nodes = new Map(
            twinParts.map(part => [
              part.name,
              model.getObjectByName(part.nodeName)!,
            ])
          );
          const bases = new Map<T.Object3D, T.Matrix4>();
          const materials = new Map<
            T.Mesh,
            {
              material: T.MeshStandardMaterial;
              emissive: T.Color;
              intensity: number;
              opacity: number;
              transparent: boolean;
            }
          >();
          model.traverse(node => {
            node.updateMatrix();
            bases.set(node, node.matrix.clone());
            if (
              node instanceof T.Mesh &&
              node.material instanceof T.MeshStandardMaterial
            ) {
              const original = node.material;
              const material = original.clone();
              node.material = material;
              node.castShadow = node.receiveShadow = true;
              materials.set(node, {
                material,
                emissive: material.emissive.clone(),
                intensity: material.emissiveIntensity,
                opacity: material.opacity,
                transparent: material.transparent,
              });
            }
          });
          const floor = new T.Mesh(
            new T.PlaneGeometry(20, 20),
            new T.ShadowMaterial({ opacity: 0.18 })
          );
          floor.rotation.x = -Math.PI / 2;
          floor.position.y = new T.Box3().setFromObject(model).min.y - 0.015;
          floor.receiveShadow = true;
          scene.add(floor);
          const fit = (target: T.Object3D) => {
            const bounds = new T.Box3().setFromObject(target, true);
            const center = bounds.getCenter(new T.Vector3());
            const direction = new T.Vector3(1.4, 0.85, 2).normalize();
            camera.position.copy(center).add(direction);
            camera.lookAt(center);
            const inverse = camera.quaternion.clone().invert();
            const tan = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
            let distance = 0.3;
            // Fit every bounding-box corner in perspective, including narrow screens.
            for (const x of [bounds.min.x, bounds.max.x]) {
              for (const y of [bounds.min.y, bounds.max.y]) {
                for (const z of [bounds.min.z, bounds.max.z]) {
                  const point = new T.Vector3(x, y, z)
                    .sub(center)
                    .applyQuaternion(inverse);
                  distance = Math.max(
                    distance,
                    point.z +
                      Math.max(
                        Math.abs(point.x) / (tan * camera.aspect),
                        Math.abs(point.y) / tan
                      )
                  );
                }
              }
            }
            controls!.target.copy(center);
            camera.position
              .copy(center)
              .add(direction.multiplyScalar(distance * 1.12));
            controls!.update();
            draw();
          };
          const select = (name: string) => {
            const selectedNode = nodes.get(name);
            for (const [mesh, base] of materials) {
              let node: T.Object3D | null = mesh;
              let highlighted = false;
              while (node) {
                if (node === selectedNode && name !== "Assembly")
                  highlighted = true;
                node = node.parent;
              }
              base.material.emissive.copy(
                highlighted ? new T.Color(0xf97316) : base.emissive
              );
              base.material.emissiveIntensity = highlighted
                ? 0.14
                : base.intensity;
            }
            setSelected(name);
            if (selectedNode) fit(selectedNode);
            draw();
          };
          const reset = () => {
            for (const [node, base] of bases)
              base.decompose(node.position, node.quaternion, node.scale);
            for (const [, base] of materials) {
              base.material.opacity = base.opacity;
              base.material.transparent = base.transparent;
              base.material.depthWrite = true;
              base.material.needsUpdate = true;
            }
            setExploded(false);
            setGhosted(false);
            select("Assembly");
          };
          api.current = {
            select,
            reset,
            explode: enabled => {
              for (const part of twinParts) {
                const node = nodes.get(part.name);
                const pose = part.explode;
                if (!node || !pose) continue;
                const amount = enabled ? 1 : 0;
                const pivot = new T.Vector3().fromArray(pose.pivot);
                const rotation = new T.Quaternion().setFromEuler(
                  new T.Euler(
                    pose.rotation[0] * amount,
                    pose.rotation[1] * amount,
                    pose.rotation[2] * amount
                  )
                );
                new T.Matrix4()
                  .makeTranslation(
                    pivot
                      .clone()
                      .add(
                        new T.Vector3()
                          .fromArray(pose.translation)
                          .multiplyScalar(amount)
                      )
                  )
                  .multiply(
                    new T.Matrix4().makeRotationFromQuaternion(rotation)
                  )
                  .multiply(new T.Matrix4().makeTranslation(pivot.negate()))
                  .multiply(bases.get(node)!)
                  .decompose(node.position, node.quaternion, node.scale);
              }
              setExploded(enabled);
              select("Assembly");
            },
            ghost: enabled => {
              for (const part of twinParts.filter(
                part => part.role === "housing" || part.role === "cover"
              )) {
                nodes.get(part.name)?.traverse(node => {
                  const base = materials.get(node as T.Mesh);
                  if (!base) return;
                  base.material.transparent = enabled || base.transparent;
                  base.material.opacity = enabled
                    ? Math.min(base.opacity, 0.16)
                    : base.opacity;
                  base.material.depthWrite = !enabled;
                  base.material.needsUpdate = true;
                });
              }
              setGhosted(enabled);
              draw();
            },
            rotate: direction => {
              const offset = camera.position.clone().sub(controls!.target);
              offset.applyAxisAngle(
                new T.Vector3(0, 1, 0),
                (direction * Math.PI) / 8
              );
              camera.position.copy(controls!.target).add(offset);
              controls!.update();
              draw();
            },
          };
          const pointer = new T.Vector2();
          const raycaster = new T.Raycaster();
          let down: { x: number; y: number } | null = null;
          canvas.addEventListener("pointerdown", event => {
            down = { x: event.clientX, y: event.clientY };
          });
          canvas.addEventListener("pointerup", event => {
            if (
              !down ||
              Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5
            ) {
              down = null;
              return;
            }
            down = null;
            const rect = canvas.getBoundingClientRect();
            pointer.set(
              ((event.clientX - rect.left) / rect.width) * 2 - 1,
              (-(event.clientY - rect.top) / rect.height) * 2 + 1
            );
            raycaster.setFromCamera(pointer, camera);
            const hit = raycaster.intersectObject(model, true)[0];
            let node: T.Object3D | null = hit?.object ?? null;
            while (node) {
              const part = twinParts.find(
                part => nodes.get(part.name) === node
              );
              if (part) {
                select(part.name);
                break;
              }
              node = node.parent;
            }
          });
          camera.aspect = host.clientWidth / host.clientHeight;
          camera.updateProjectionMatrix();
          renderer!.setSize(host.clientWidth, host.clientHeight, false);
          reset();
          setStatus("");
        })
        .catch(() => {
          if (!disposed) fail();
        });
    } catch {
      fail();
    }
    return dispose;
  }, []);

  const button =
    "min-h-11 rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-orange-400 hover:bg-slate-700 disabled:opacity-50";
  return (
    <div>
      <div
        className="relative h-[340px] sm:h-[460px] lg:h-[520px] bg-[#0e1827]"
        ref={viewport}
        data-testid="twin-viewport"
        aria-busy={!!status && !failed}
      >
        {failed && (
          <img
            src={assetUrl("models/smart-factory/pump-motor-preview.webp")}
            alt="Smart Factory pump and motor reference model"
            width={752}
            height={520}
            className="absolute inset-0 h-full w-full object-contain opacity-20"
          />
        )}
        {status && (
          <div className="absolute inset-0 z-10 grid place-items-center p-8 text-center text-slate-200">
            <div>
              <p role={failed ? "alert" : "status"}>{status}</p>
              {failed && (
                <button className={`${button} mt-4`} onClick={onRetry}>
                  Retry 3D preview
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-slate-700 bg-slate-900 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <button
            className={button}
            disabled={!!status}
            aria-pressed={exploded}
            onClick={() => api.current?.explode(!exploded)}
          >
            Exploded view
          </button>
          <button
            className={button}
            disabled={!!status}
            aria-pressed={ghosted}
            onClick={() => api.current?.ghost(!ghosted)}
          >
            Reveal internals
          </button>
          <button
            className={button}
            disabled={!!status}
            onClick={() => api.current?.reset()}
          >
            Reset view
          </button>
          <button
            className={button}
            disabled={!!status}
            onClick={() => api.current?.rotate(-1)}
          >
            Rotate left
          </button>
          <button
            className={button}
            disabled={!!status}
            onClick={() => api.current?.rotate(1)}
          >
            Rotate right
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-end">
          <label className="grid gap-2 text-sm font-semibold text-slate-300">
            Inspect a component
            <select
              value={selected}
              disabled={!!status}
              onChange={event => api.current?.select(event.target.value)}
              className="min-h-11 w-full min-w-0 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            >
              {twinParts.map(part => (
                <option key={part.name} value={part.name}>
                  {part.name}
                </option>
              ))}
            </select>
          </label>
          <p
            className="text-sm leading-relaxed text-slate-400"
            aria-live="polite"
          >
            {selected === "Assembly"
              ? "Drag to orbit · scroll or pinch to zoom · select a part to inspect."
              : `${selected} · ${twinParts.find(part => part.name === selected)?.material}. Select the whole Assembly or Reset view to return.`}
          </p>
        </div>
      </div>
    </div>
  );
}
