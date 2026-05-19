import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UseCaseHero } from "@/components/use-case/UseCaseHero";
import { getUseCaseBySlug } from "@/content/use-cases";

describe("use case hero", () => {
  it("renders title, summary, and tag chips", () => {
    const useCase = getUseCaseBySlug("customizable-dashboard");

    expect(useCase).toBeDefined();

    render(<UseCaseHero useCase={useCase!} />);

    expect(screen.getByText(useCase!.title)).toBeInTheDocument();

    expect(
      screen.getByText(/Tracking energy was still difficult for households equipped with solar/i),
    ).toBeInTheDocument();
    expect(screen.getByText("generic dashboard")).toBeInTheDocument();
    expect(screen.getByText("personalized experience by household profile")).toBeInTheDocument();

    for (const tag of useCase!.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });
});
