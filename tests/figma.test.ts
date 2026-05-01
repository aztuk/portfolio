import { describe, expect, it } from "vitest";

import { buildFigmaEmbedUrl } from "@/lib/figma";

describe("buildFigmaEmbedUrl", () => {
  it("converts hostname to embed.figma.com", () => {
    const result = buildFigmaEmbedUrl(
      "https://www.figma.com/proto/abc123/File?node-id=1-2&starting-point-node-id=1-2",
    );
    expect(result).toContain("embed.figma.com");
  });

  it("passes through starting-point-node-id when present", () => {
    const result = buildFigmaEmbedUrl(
      "https://www.figma.com/proto/abc123/File?node-id=10-20&starting-point-node-id=10-20",
    );
    expect(result).toContain("starting-point-node-id=10-20");
  });

  it("injects starting-point-node-id from node-id when missing", () => {
    const result = buildFigmaEmbedUrl(
      "https://www.figma.com/proto/abc123/File?node-id=42-99",
    );
    expect(result).toContain("starting-point-node-id=42-99");
    expect(result).toContain("node-id=42-99");
  });

  it("applies fixed embed params", () => {
    const result = buildFigmaEmbedUrl(
      "https://www.figma.com/proto/abc123/File?node-id=1-2",
    );
    expect(result).toContain("hide-ui=1");
    expect(result).toContain("show-proto-sidebar=0");
    expect(result).toContain("embed-host=share");
  });

  it("keeps file embeds navigable instead of hiding the Figma UI", () => {
    const result = buildFigmaEmbedUrl(
      "https://www.figma.com/design/abc123/File?node-id=1-2",
    );

    expect(result).toContain("embed.figma.com");
    expect(result).toContain("embed-host=share");
    expect(result).not.toContain("hide-ui=1");
    expect(result).not.toContain("show-proto-sidebar=0");
    expect(result).not.toContain("node-id=1-2");
    expect(result).not.toContain("starting-point-node-id=1-2");
  });

  it("keeps file viewport camera state without scoping to the selected node", () => {
    const result = buildFigmaEmbedUrl(
      "https://www.figma.com/design/abc123/File?node-id=1-2&page-id=0%3A1&viewport=120%2C240%2C0.3",
    );

    expect(result).toContain("page-id=0%3A1");
    expect(result).toContain("viewport=120%2C240%2C0.3");
    expect(result).not.toContain("node-id=1-2");
  });

  it("returns src unchanged when URL is invalid", () => {
    const bad = "not-a-url";
    expect(buildFigmaEmbedUrl(bad)).toBe(bad);
  });
});
