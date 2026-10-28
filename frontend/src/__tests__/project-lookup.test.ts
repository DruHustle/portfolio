import { describe, expect, it } from "vitest";
import { ProjectService } from "../services/projectService";

describe("Project lookups", () => {
  it.each(["toString", "constructor", "__proto__", "unknown"])(
    "treats %s as an unknown frontend project ID",
    id => {
      expect(ProjectService.getProjectById(id)).toBeNull();
    }
  );
});
