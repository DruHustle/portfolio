import {
  CubeUVReflectionMapping,
  DataTexture,
  HalfFloatType,
  LinearFilter,
  LinearSRGBColorSpace,
  RGBAFormat,
} from "three";
import { assetUrl } from "@/lib/urls";

/** Use the current Smart Factory reference viewer's baked studio lighting. */
export async function loadSmartFactoryStudio(signal: AbortSignal) {
  const response = await fetch(
    assetUrl("models/smart-factory/studio-environment.bin.gz"),
    { signal }
  );
  if (!response.ok) throw new Error("Studio lighting unavailable");
  let buffer = await response.arrayBuffer();
  const signature = new Uint8Array(buffer, 0, Math.min(4, buffer.byteLength));
  // Hosts may decompress .gz responses before returning their bytes.
  if (signature[0] === 31 && signature[1] === 139) {
    const stream = new Blob([buffer])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));
    buffer = await new Response(stream).arrayBuffer();
  }
  if (buffer.byteLength !== 12 + 384 * 512 * 8)
    throw new Error("Studio atlas size mismatch");
  const header = new DataView(buffer);
  if (
    header.getUint32(0, false) !== 0x53464531 ||
    header.getUint32(4, true) !== 384 ||
    header.getUint32(8, true) !== 512
  )
    throw new Error("Studio atlas format mismatch");
  const texture = new DataTexture(
    new Uint16Array(buffer, 12),
    384,
    512,
    RGBAFormat,
    HalfFloatType
  );
  texture.name = "Smart Factory baked HDR studio";
  texture.mapping = CubeUVReflectionMapping;
  texture.colorSpace = LinearSRGBColorSpace;
  texture.minFilter = texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}
