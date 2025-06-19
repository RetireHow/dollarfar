import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import { HelpModal } from "./HelpModal";

describe("HelpModal", () => {
  const defaultProps = {
    title: "Test Title",
    content: "Test Content",
    visible: true,
    onClose: vi.fn(),
  };

  it("renders with correct title and content", () => {
    render(<HelpModal {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders Got it! button", () => {
    render(<HelpModal {...defaultProps} />);

    expect(screen.getByText("Got it!")).toBeInTheDocument();
  });

  it("calls onClose when Got it! button is clicked", () => {
    render(<HelpModal {...defaultProps} />);

    const button = screen.getByText("Got it!");
    fireEvent.click(button);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when visible is false", () => {
    render(<HelpModal {...defaultProps} visible={false} />);

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("applies correct styles to Got it! button", () => {
    render(<HelpModal {...defaultProps} />);

    const button = screen.getByText("Got it!");
    expect(button).toHaveStyle("background-color: #2b6777");
    expect(button).toHaveClass("px-4 py-2 rounded-md text-white");
  });

  it("applies correct classes to content div", () => {
    render(<HelpModal {...defaultProps} />);

    const content = screen.getByText("Test Content");
    expect(content).toHaveClass("text-gray-700 dark:text-gray-300");
  });
});
