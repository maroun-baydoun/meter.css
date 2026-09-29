import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  resolve(import.meta.dirname, "../../meter-css/src/styles.css"),
  "utf8",
);

describe("meter.css scaffold", () => {
  it("keeps the distribution selector build-driven", () => {
    expect(source).toContain("__METER_SELECTOR__");
  });

  it("contains the native meter pseudo-elements", () => {
    expect(source).toContain("::-webkit-meter-bar");
    expect(source).toContain("::-moz-meter-bar");
    expect(source).toContain(":-moz-meter-optimum");
    expect(source).toContain("appearance: none");
    expect(source).toContain("-webkit-appearance: none");
  });

  it("uses namespaced customization properties without authored defaults", () => {
    expect(source).toContain("--meter-css-track");
    expect(source).not.toContain("--meter-track:");
    expect(source).not.toContain("--meter-good:");
    expect(source).not.toContain("overflow: hidden");
  });
});
