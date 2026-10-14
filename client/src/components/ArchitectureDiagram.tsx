import { ExternalLink } from "lucide-react";
import { assetUrl } from "@/lib/urls";

interface ArchitectureDiagramProps {
  path: string;
  alt: string;
  width: number;
  height: number;
}

/** Keep dense diagrams readable on small screens without enlarging the page. */
export function ArchitectureDiagram({
  path,
  alt,
  width,
  height,
}: ArchitectureDiagramProps) {
  return (
    <figure>
      <a
        href={assetUrl(path)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size ${alt} (new tab)`}
        className="group block rounded-xl"
      >
        <img
          src={assetUrl(path)}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-xl"
        />
        <span className="flex min-h-11 items-center justify-center gap-2 px-3 py-3 text-sm font-semibold text-slate-200 group-hover:text-cyan-200">
          Open full-size diagram{" "}
          <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
        </span>
      </a>
    </figure>
  );
}
