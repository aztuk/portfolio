import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HighlightedText } from "@/components/shared/HighlightedText";
import { parseHighlightedText, stripHighlightTags } from "@/lib/rich-text";

describe("highlighted text", () => {
  it("parses b tags into highlighted text segments", () => {
    expect(parseHighlightedText("Make <b>important words</b> pop")).toEqual([
      { text: "Make ", highlighted: false },
      { text: "important words", highlighted: true },
      { text: " pop", highlighted: false },
    ]);
  });

  it("renders highlighted segments with the primary light style", () => {
    render(<p><HighlightedText text="Make <b>important words</b> pop" /></p>);

    expect(screen.getByText("important words")).toHaveClass("rich-text-highlight");
  });

  it("strips highlight tags for plain-text metadata", () => {
    expect(stripHighlightTags("Make <b>important words</b> pop")).toBe(
      "Make important words pop",
    );
  });
});
