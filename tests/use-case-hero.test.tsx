import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UseCaseHero } from "@/components/use-case/UseCaseHero";
import { getUseCaseBySlug } from "@/content/use-cases";

describe("use case hero", () => {
  it("renders title, summary, and tag chips", () => {
    const useCase = getUseCaseBySlug("customizable-dashboard");

    expect(useCase).toBeDefined();

    render(<UseCaseHero useCase={useCase!} />);

    expect(screen.getByText("Personalize an energy dashboard")).toBeInTheDocument();

    expect(
      screen.getByText(/In 2018, our product helped households equipped with solar/i),
    ).toBeInTheDocument();
    expect(screen.getByText("single, generic dashboard")).toBeInTheDocument();
    expect(screen.getByText("personalized experience")).toBeInTheDocument();

    for (const tag of useCase!.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });
});
