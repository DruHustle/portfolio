import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";

interface ComingSoonProps {
  error?: Error;
  resetError?: () => void;
  isDevelopment?: boolean;
}

export default function ComingSoon({
  error,
  resetError,
  isDevelopment = false,
}: ComingSoonProps) {
  const [, navigate] = useLocation();
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen grid place-items-center bg-slate-950 text-slate-200 px-4 py-12"
    >
      <div className="max-w-md w-full text-center rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
        <AlertCircle
          aria-hidden="true"
          className="size-12 mx-auto text-cyan-300 mb-6"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          {error ? "This page couldn’t load" : "Coming soon"}
        </h1>
        <p role="alert" className="text-slate-300 mb-6">
          {error
            ? "Try again, reload the page, or return to the portfolio."
            : "This feature is currently under development."}
        </p>
        {isDevelopment && error && (
          <p className="text-sm font-mono break-words mb-6">{error.message}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => navigate("/")}
            className="bg-cyan-300 hover:bg-cyan-200 text-slate-950 min-h-11"
          >
            <Home aria-hidden="true" className="size-4" />
            Go Home
          </Button>
          {resetError && (
            <Button
              onClick={resetError}
              className="bg-slate-700 hover:bg-slate-600 text-white min-h-11"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              Retry
            </Button>
          )}
          {error && (
            <Button
              onClick={() => window.location.reload()}
              className="bg-slate-700 hover:bg-slate-600 text-white min-h-11"
            >
              Reload page
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
