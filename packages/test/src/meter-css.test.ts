import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  resolve(import.meta.dirname, "../../meter-css/src/styles.css"),
  "utf8",
);

describe("meter.css styles", () => {
  it("keeps the distribution selector build-driven", () => {
    expect(source).toContain("__METER_SELECTOR__");
  });

  it("contains the native meter pseudo-elements", () => {
    expect(source).toContain("::-webkit-meter-bar");
    expect(source).toContain("::-webkit-meter-optimum-value");
    expect(source).toContain("::-webkit-meter-suboptimum-value");
    expect(source).toContain("::-webkit-meter-even-less-good-value");
    expect(source).toContain("::-moz-meter-bar");
    expect(source).toContain(":-moz-meter-optimum");
    expect(source).toContain(":-moz-meter-sub-optimum");
    expect(source).toContain(":-moz-meter-sub-sub-optimum");
    expect(source).toContain("appearance: none");
    expect(source).toContain("-webkit-appearance: none");
  });

  it("uses Firefox's native track fallback without overriding other browsers", () => {
    const nativeAppearanceRule = source.match(
      /:where\(__METER_SELECTOR__\) \{[\s\S]*?\n\}/,
    )?.[0];

    expect(nativeAppearanceRule).toBeDefined();
    expect(nativeAppearanceRule).not.toContain("background");
    expect(source).toContain(
      "@supports selector(:-moz-meter-optimum::-moz-meter-bar)",
    );
    expect(source).toContain(
      "background: var(--meter-css-track, transparent);",
    );
  });

  it("uses namespaced customization properties without authored defaults", () => {
    expect(source).toContain("--meter-css-track");
    expect(source).not.toContain("--meter-track:");
    expect(source).not.toContain("--meter-good:");
    expect(source).not.toContain("overflow: hidden");
  });
});
