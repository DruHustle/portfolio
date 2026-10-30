import { describe, expect, it } from "vitest";
import { ProjectService } from "../services/projectService";
import { appRouter } from "../../../server/routers/index";

describe("Project lookups", () => {
  it.each(["toString", "constructor", "__proto__", "unknown"])(
    "treats %s as an unknown ID in both registries",
    async id => {
      expect(ProjectService.getProjectById(id)).toBeNull();
      expect(await appRouter.createCaller({}).getProject({ id })).toBeNull();
    }
  );
  it("preserves existing public project and anonymous-auth contracts", async () => {
    const caller = appRouter.createCaller({});
    expect(await caller.getProject({ id: "imsop" })).toMatchObject({
      id: "imsop",
    });
    expect(await caller.getProject({ id: "smart-factory-iot" })).toMatchObject({
      id: "smart-factory-iot",
      title: "Smart Factory",
    });
    expect((await caller.projects()).projects).toHaveLength(3);
    expect(await caller.auth.me()).toBeNull();
    expect(await caller.auth.logout()).toEqual({ success: true });
  });
});
