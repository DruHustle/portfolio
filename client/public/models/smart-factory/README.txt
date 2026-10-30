Smart Factory whole-factory preview

Original Smart Factory workshop geometry, authored showcase layout, equipment
models and native renderer helpers; repository MIT license.

Authoritative source: https://github.com/DruHustle/smart-factory-frontend
- client/src/components/workspace/FactoryFloorScene.tsx
- client/src/components/workspace/FactoryEnvironment.ts
- client/src/components/workspace/factory-graphics.ts
- shared/factory-floor.ts
- scripts/showcase/factory-floor.ts (40 authored items across four zones)
- fixtures/equipment/factory/{conveyor,robot-arm,control-cabinet,valve,storage-tank}/model.glb
- fixtures/equipment/raspberry-pi-4b/model.glb
- fixtures/equipment/pump-motor.glb (illustrative revision 4, one part of the floor)
- client/src/assets/equipment/studio-environment.bin.gz

The preview loads automatically and retains the current whole-factory scene,
material batching, PBR surfaces, baked HDR lighting and accessible floor plan.
The inventory/layout is illustrative. No physical telemetry, live equipment
status or mechanical simulation is claimed. Preview edits stay in memory and do
not change the Smart Factory app. No supplier CAD is included.

Bundled asset SHA-256 hashes:
12eb0599c34a6e6843246342d2bb873cc5e92b429768e7919de739d96fb6ec33  control-cabinet.glb
3127dcbe4ef8b0390303ca83aba74c60dfbac2bd630ae5e9503f093618dda564  conveyor.glb
cb1d547822ae954d698ae330ee6d2083fa966f6af3aec889c4605c1305d29712  pump-motor.glb
423f210f487c1e933dd593aa5c8b0fd61cda33c6fd000d92c5cbdcdb0be3e6de  raspberry-pi-4b.glb
77b2a6a949aadecfdeed729788bf0c5c9c76c2552d06760748f8e5faa5b56dbe  robot-arm.glb
bdc99d2d642abcd194ce7286249cc1cf188361617819a76927eea08798b59e2b  storage-tank.glb
3d4bc621b6f4e366acbf683249afbeffa6a91febe23cd8f9f1c4d9eff2178199  studio-environment.bin.gz
d8af7eab9c46c06009def46d7acee6c275133b834e12add928d454b023be7780  valve.glb
