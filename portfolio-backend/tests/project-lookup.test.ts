import { describe, expect, it } from "vitest";
import { appRouter } from "../src/routers/index";

describe("Project API", () => {
  it.each(["toString", "constructor", "__proto__", "unknown"])(
    "treats %s as an unknown API project ID",
    async id => {
      expect(await appRouter.createCaller({}).getProject({ id })).toBeNull();
    }
  );
  it("preserves existing public project and anonymous-auth contracts", async () => {
    const caller = appRouter.createCaller({});
    expect(await caller.getProject({ id: "imsop" })).toMatchObject({
      id: "smart-logistics",
      title: "Smart Logistics",
    });
    expect(await caller.getProject({ id: "smart-factory-iot" })).toMatchObject({
      id: "smart-factory",
      title: "Smart Factory",
    });
    expect((await caller.projects()).projects).toHaveLength(4);
    expect(await caller.getProject({ id: "smart-farmer" })).toMatchObject({
      id: "smart-farmer",
      title: "Smart Farmer",
    });
    expect(await caller.getProject({ id: "imsop" })).toMatchObject({ id: "smart-logistics" });
    expect(await caller.getProject({ id: "smart-factory-iot" })).toMatchObject({ id: "smart-factory" });
    expect(await caller.auth.me()).toBeNull();
    expect(await caller.auth.logout()).toEqual({ success: true });
  });
});
