import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router, Redirect, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const IMSOPDetail = lazy(() => import("./pages/IMSOPDetail"));
const LearningHubDetail = lazy(() => import("./pages/LearningHubDetail"));
const SmartFactoryIoTDetail = lazy(
  () => import("./pages/SmartFactoryIoTDetail")
);
const IMSOPDocumentation = lazy(() => import("./pages/IMSOPDocumentation"));
const SmartFactoryIoTDocumentation = lazy(
  () => import("./pages/SmartFactoryIoTDocumentation")
);
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));

const titles: Record<string, string> = {
  "/": "Andrew Gotora | Senior Industrial Software & Digitalization Engineer",
  "/analytics": "Analytics | Andrew Gotora",
  "/projects/imsop": "IMSOP | Andrew Gotora",
  "/projects/imsop/documentation": "IMSOP Documentation | Andrew Gotora",
  "/projects/sap-btp-ai-hub": "Learning Hub | Andrew Gotora",
  "/projects/smart-factory": "Smart Factory | Andrew Gotora",
  "/projects/smart-factory/documentation":
    "Smart Factory Documentation | Andrew Gotora",
};

function AppRouter() {
  const [location] = useLocation();
  const previousLocation = useRef(location);
  const routeContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = titles[location] ?? "Page Not Found | Andrew Gotora";
    if (previousLocation.current === location) return;
    previousLocation.current = location;
    window.scrollTo({ top: 0, behavior: "instant" });
    // Wait for a lazy route to mount before moving keyboard focus.
    const focusContent = () => {
      const content = routeContainer.current?.querySelector<HTMLElement>(
        "#main-content:not([data-loading])"
      );
      if (!content) return false;
      content.focus({ preventScroll: true });
      return true;
    };
    if (focusContent()) return;
    const observer = new MutationObserver(() => {
      if (focusContent()) observer.disconnect();
    });
    if (routeContainer.current)
      observer.observe(routeContainer.current, {
        childList: true,
        subtree: true,
      });
    return () => observer.disconnect();
  }, [location]);

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={event => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to main content
      </a>
      <div ref={routeContainer}>
        <ErrorBoundary key={location}>
          <Suspense
            fallback={
              <main
                data-loading
                id="main-content"
                tabIndex={-1}
                className="min-h-screen grid place-items-center bg-slate-950 text-slate-200"
              >
                <p role="status">Loading page…</p>
              </main>
            }
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/analytics" component={AnalyticsPage} />
              <Route path="/projects/imsop" component={IMSOPDetail} />
              <Route
                path="/projects/imsop/documentation"
                component={IMSOPDocumentation}
              />
              <Route
                path="/projects/sap-btp-ai-hub"
                component={LearningHubDetail}
              />
              <Route
                path="/projects/smart-factory"
                component={SmartFactoryIoTDetail}
              />
              <Route
                path="/projects/smart-factory/documentation"
                component={SmartFactoryIoTDocumentation}
              />
              <Route path="/projects/smart-factory-iot">
                <Redirect to="/projects/smart-factory" replace />
              </Route>
              <Route path="/projects/smart-factory-iot/documentation">
                <Redirect to="/projects/smart-factory/documentation" replace />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
      {import.meta.env.VITE_ENABLE_ANALYTICS === "true" && (
        <Analytics
          route={location}
          path={`${import.meta.env.BASE_URL}#${location}`}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster position="top-center" richColors />
        <Router hook={useHashLocation}>
          <AppRouter />
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  );
}
