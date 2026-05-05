/**
 * Component tests for StatusBadge.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatusBadge from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it("renders 'completed' badge", () => {
    render(<StatusBadge status="completed" />);
    expect(screen.getByText("completed")).toBeInTheDocument();
  });

  it("renders 'incomplete' badge", () => {
    render(<StatusBadge status="incomplete" />);
    expect(screen.getByText("incomplete")).toBeInTheDocument();
  });

  it("renders 'missing' badge", () => {
    render(<StatusBadge status="missing" />);
    expect(screen.getByText("missing")).toBeInTheDocument();
  });
});
