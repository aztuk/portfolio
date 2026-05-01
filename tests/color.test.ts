import { describe, expect, it } from "vitest";

import { colorToRgbTuple, tryColorToRgbTuple } from "@/lib/color";

describe("colorToRgbTuple", () => {
  it("parses 6-digit hex colors", () => {
    expect(colorToRgbTuple("#292a35")).toBe("41,42,53");
  });

  it("parses 8-digit hex colors and ignores the alpha channel", () => {
    expect(colorToRgbTuple("#292a3541")).toBe("41,42,53");
  });

  it("parses 4-digit hex colors and ignores the alpha channel", () => {
    expect(colorToRgbTuple("#abcd")).toBe("170,187,204");
  });

  it("parses modern rgb space syntax with alpha", () => {
    expect(tryColorToRgbTuple("rgb(41 42 53 / 0.302)")).toBe("41,42,53");
  });
});
