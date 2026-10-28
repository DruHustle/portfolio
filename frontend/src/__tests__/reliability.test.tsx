import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "../components/ErrorBoundary";
import { assetUrl, demoUrl } from "../lib/urls";
import { NavigationService } from "../services/navigationService";
import {
  csvCell,
  exportToPDF,
  generateHTMLTable,
  generateMetricsSummary,
} from "../lib/export";

describe("URL resolution", () => {
  it("recognizes navigation from the current portfolio origin", () => {
    vi.spyOn(document, "referrer", "get").mockReturnValue(
      `${window.location.origin}/#/projects/imsop`
    );
    expect(NavigationService.checkReferrer()).toBe(true);
  });
  it.each(["", "https://example.com/localhost", "https://example.com/druhustle.github.io/portfolio"])(
    "does not treat the external referrer %s as internal navigation",
    referrer => {
      vi.spyOn(document, "referrer", "get").mockReturnValue(referrer);
      expect(NavigationService.checkReferrer()).toBe(false);
    }
  );
  it.each([
    "docs/imsop/architecture.pdf",
    "/docs/imsop/architecture.pdf",
    "//docs/imsop/architecture.pdf",
  ])("normalizes asset path %s", path => {
    expect(assetUrl(path)).toBe("/docs/imsop/architecture.pdf");
  });
  it.each([
    ["imsop", "https://imsop-app.vercel.app/"],
    ["sap-btp-ai-hub", "https://tech-learning-hub-app.vercel.app/"],
    ["smart-factory-iot", "https://smart-factory-iot-app.vercel.app/"],
  ] as const)(
    "links %s to the live project instead of the portfolio",
    (project, expected) => {
      expect(demoUrl(project)).toBe(expected);
    }
  );
});

describe("Export safety", () => {
  it.each(["=SUM(1,2)", " +cmd", "@formula", "-formula", "\t=1+1"])(
    "neutralizes spreadsheet formula %s",
    value => {
      expect(csvCell(value)).toBe(`"'${value}"`);
    }
  );
  it("escapes quotes and retains numeric values and dates", () => {
    expect(csvCell('a,"b"')).toBe('"a,""b"""');
    expect(csvCell(-5)).toBe('"-5"');
    expect(csvCell(null)).toBe('""');
    expect(csvCell(new Date("2026-01-01"))).toBe('"2026-01-01T00:00:00.000Z"');
  });
  it("renders untrusted table and metric values as text", () => {
    const payload = '<img src=x onerror="alert(1)">';
    const html =
      generateHTMLTable(
        [{ name: payload }],
        [{ key: "name", label: payload }]
      ) +
      generateMetricsSummary([
        { label: payload, value: payload, change: payload },
      ]);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelector("img")).toBeNull();
    expect(doc.body.textContent).toContain(payload);
  });
  it("removes active print content and isolates the print window", () => {
    const printDocument = document.implementation.createHTMLDocument();
    const printWindow = {
      document: printDocument,
      opener: window,
      print: vi.fn(),
    };
    vi.spyOn(window, "open").mockReturnValue(printWindow as unknown as Window);
    exportToPDF(
      "<script>alert(1)</script>",
      '<p onclick="alert(1)">Report</p><script>alert(2)</script><iframe src="https://example.com"></iframe>',
      "report"
    );
    expect(printWindow.opener).toBeNull();
    expect(printDocument.querySelector("script, iframe, [onclick]")).toBeNull();
    expect(
      printDocument.querySelector('meta[http-equiv="Content-Security-Policy"]')
    ).not.toBeNull();
    expect(printDocument.body.textContent).toContain("Report");
    printDocument.querySelector("button")!.click();
    expect(printWindow.print).toHaveBeenCalledOnce();
  });
});

describe("Storage restrictions", () => {
  it("observes keys removed by another tab when storage is available", async () => {
    vi.resetModules();
    const { safeLocalStorage } = await import("../lib/storage");
    safeLocalStorage.setItem("removed-elsewhere", "value");
    localStorage.removeItem("removed-elsewhere");
    expect(safeLocalStorage.getItem("removed-elsewhere")).toBeNull();
  });

  it("retains empty strings and clears fallback values even when storage recovers", async () => {
    vi.resetModules();
    const { safeSessionStorage } = await import("../lib/storage");
    const failingSet = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new DOMException("blocked");
      });
    safeSessionStorage.setItem("empty", "");
    expect(safeSessionStorage.getItem("empty")).toBe("");
    failingSet.mockRestore();
    safeSessionStorage.removeItem("empty");
    expect(safeSessionStorage.getItem("empty")).toBeNull();
    safeSessionStorage.setItem("clear", "value");
    safeSessionStorage.clear();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked");
    });
    expect(safeSessionStorage.getItem("clear")).toBeNull();
  });
});

describe("Error recovery", () => {
  it("reports a load failure and retries the failed component", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    let fail = true;
    function BrokenPage() {
      if (fail) throw new Error("page failed");
      return <p>Recovered</p>;
    }
    render(
      <Router hook={useHashLocation}>
        <ErrorBoundary>
          <BrokenPage />
        </ErrorBoundary>
      </Router>
    );
    expect(
      screen.getByRole("heading", { name: "This page couldn’t load" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Coming soon")).not.toBeInTheDocument();
    fail = false;
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
