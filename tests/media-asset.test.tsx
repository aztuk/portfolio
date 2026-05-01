import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MediaAsset } from "@/components/shared/MediaAsset";

describe("media asset", () => {
  it("renders an image asset", () => {
    render(
      <MediaAsset
        asset={{
          type: "image",
          src: "/asset.svg",
          alt: "Static image",
        }}
        className="aspect-square"
      />,
    );

    expect(screen.getByAltText("Static image")).toBeInTheDocument();
  });

  it("renders a video asset", () => {
    render(
      <MediaAsset
        asset={{
          type: "video",
          src: "/asset.mp4",
          poster: "/poster.svg",
          alt: "Prototype video",
        }}
        className="aspect-square"
      />,
    );

    expect(screen.getByLabelText("Prototype video")).toBeInTheDocument();
  });
});
