import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UseCaseHero } from "@/components/use-case/UseCaseHero";
import { getUseCaseBySlug } from "@/content/use-cases";

describe("use case hero", () => {
  it("renders title, summary, and tag chips", () => {
    const useCase = getUseCaseBySlug("customizable-dashboard");

    expect(useCase).toBeDefined();

    render(<UseCaseHero useCase={useCase!} />);

    expect(
      screen.getByText("Raised first-week activation by making setup feel like progress"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Reshaped onboarding around one meaningful early win/i),
    ).toBeInTheDocument();

    for (const tag of useCase!.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });
});
