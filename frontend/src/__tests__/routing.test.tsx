import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import App from "../App";
import { safeSessionStorage } from "../lib/storage";

const scrollIntoView = vi.fn();
beforeEach(() => {
  window.history.replaceState(null, "", "/#/");
  safeSessionStorage.clear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  HTMLElement.prototype.scrollIntoView = scrollIntoView;
  scrollIntoView.mockClear();
});

async function openRoute(path: string) {
  act(() => {
    window.history.replaceState(null, "", `/#${path}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
}

function assertLocalAssetsExist(container: HTMLElement) {
  for (const element of container.querySelectorAll<
    HTMLAnchorElement | HTMLImageElement
  >("a[href], img[src]")) {
    const url =
      element instanceof HTMLImageElement
        ? element.getAttribute("src")!
        : element.getAttribute("href")!;
    if (!url.startsWith("/")) continue;
    expect(url).not.toContain("//");
    expect(
      existsSync(
        resolve(
          import.meta.dirname,
          "../../public",
          url.slice(1)
        )
      )
    ).toBe(true);
  }
}

describe("Rendered portfolio routes", () => {
  it("navigates from a project card through documentation and back to projects", async () => {
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Senior Industrial"
    );
    expect(container.querySelector("a a")).toBeNull();
    fireEvent.click(
      screen.getByRole("link", { name: "View IMSOP project details" })
    );
    await screen.findByRole("heading", { name: "IMSOP", level: 1 });
    expect(document.title).toBe("IMSOP | Andrew Gotora");
    expect(screen.getByRole("link", { name: "Live Demo" })).toHaveAttribute(
      "href",
      "https://imsop-app.vercel.app/"
    );
    await waitFor(() => expect(screen.getByRole("main")).toHaveFocus());
    fireEvent.click(screen.getByRole("link", { name: "Documentation" }));
    await screen.findByRole("heading", {
      name: "IMSOP Documentation",
      level: 1,
    });
    expect(document.title).toBe("IMSOP Documentation | Andrew Gotora");
    assertLocalAssetsExist(container);
    expect(screen.getAllByRole("link", { name: /^View$/ })).toHaveLength(5);
    expect(screen.getAllByRole("link", { name: /^PDF$/ })).toHaveLength(5);
    expect(container.querySelector('a[href$=".md"]')).toBeNull();
    expect(container.querySelector("a a")).toBeNull();
    fireEvent.click(screen.getByRole("link", { name: "Back to Project" }));
    await screen.findByRole("heading", { name: "IMSOP", level: 1 });
    fireEvent.click(screen.getByRole("link", { name: "Back to Projects" }));
    await screen.findByRole("heading", { name: "Featured Projects" });
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
    expect(document.getElementById("projects")).toHaveFocus();
  });

  it.each([
    ["/projects/imsop", "IMSOP"],
    ["/projects/smart-factory-iot", "Smart Factory IoT"],
    ["/projects/sap-btp-ai-hub", "Learning Hub"],
    ["/projects/imsop/documentation", "IMSOP Documentation"],
    [
      "/projects/smart-factory-iot/documentation",
      "Smart Factory IoT Documentation",
    ],
    ["/analytics", "Analytics"],
  ])(
    "renders directly opened %s with working local assets and navigation",
    async (path, heading) => {
      await openRoute(path);
      const { container } = render(<App />);
      await screen.findByRole("heading", { level: 1, name: heading });
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "Page navigation" })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Back to/ })).toBeInTheDocument();
      expect(container.querySelector("a a")).toBeNull();
      assertLocalAssetsExist(container);
      expect(document.title).toContain(heading);
    }
  );

  it("returns home from an unknown route using the hash router", async () => {
    await openRoute("/missing-page");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Page Not Found" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Back to Home" }));
    await screen.findByRole("heading", { name: "Featured Projects" });
    expect(window.location.hash).toBe("#/");
  });

  it("supports skip navigation and reduced-motion section navigation", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(query => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: () => true,
    }));
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: "Skip to main content" }));
    expect(screen.getByRole("main")).toHaveFocus();
    fireEvent.click(
      within(
        screen.getByRole("navigation", { name: "Main navigation" })
      ).getByRole("link", { name: "Skills" })
    );
    expect(scrollIntoView).toHaveBeenLastCalledWith({ behavior: "instant" });
    expect(document.getElementById("skills")).toHaveFocus();
    expect(window.location.hash).toBe("#/");
  });

  it("opens the mobile dialog, closes it after section selection, and supports Escape", async () => {
    const error = vi.spyOn(console, "error");
    const warn = vi.spyOn(console, "warn");
    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" })
    );
    const dialog = screen.getByRole("dialog", { name: "Navigation Menu" });
    expect(dialog).toHaveAccessibleDescription("Choose a portfolio section.");
    fireEvent.click(within(dialog).getByRole("link", { name: "Experience" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(document.getElementById("experience")).toHaveFocus()
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" })
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    expect(error).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  it("does not claim live metrics or request an analytics script when disabled", async () => {
    await openRoute("/analytics");
    render(<App />);
    await screen.findByRole("heading", {
      name: "Analytics not enabled for this build",
    });
    expect(
      screen.queryByText("Vercel Analytics Active")
    ).not.toBeInTheDocument();
    expect(document.querySelector('script[src*="insights"]')).toBeNull();
  });
});
