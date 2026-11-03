import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { assetUrl } from "@/lib/urls";
import { safeSessionStorage } from "@/lib/storage";

interface PageNavigationProps {
  backHref?: string;
  backLabel?: string;
}

export function PageNavigation({
  backHref = "/",
  backLabel = "Back to Projects",
}: PageNavigationProps) {
  return (
    <nav
      aria-label="Page navigation"
      className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white"
    >
      <div className="container flex items-center justify-between gap-4 min-h-16 py-2">
        <Link
          href="/"
          className="flex items-center gap-3 min-h-11 font-bold hover:text-cyan-200"
        >
          <img
            src={assetUrl("images/profile-avatar.webp")}
            alt=""
            width="40"
            height="40"
            className="size-10 shrink-0 rounded-full border-2 border-cyan-400 object-cover"
          />
          <span className="hidden sm:inline">Andrew Gotora</span>
          <span className="sr-only sm:hidden">Andrew Gotora — Home</span>
        </Link>
        <Link
          href={backHref}
          onClick={() => {
            if (backLabel === "Back to Projects")
              safeSessionStorage.setItem("scrollToProjects", "true");
          }}
          className="inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-slate-200 hover:text-cyan-200"
        >
          <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
          {backLabel}
        </Link>
      </div>
    </nav>
  );
}
