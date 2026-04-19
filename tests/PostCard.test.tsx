import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostCard } from "../src";

describe("PostCard", () => {
  it("renders title, author, and excerpt", () => {
    render(
      <PostCard
        title="Hello"
        author="Ashley"
        status="draft"
        rawExcerpt="This is a test"
      />
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("by Ashley")).toBeInTheDocument();
    expect(screen.getByText("This is a test")).toBeInTheDocument();
  });

  it("renders footer actions without triggering onClick", () => {
    const onClick = vi.fn();

    render(
      <PostCard
        title="Test"
        author="User"
        status="published"
        onClick={onClick}
        footerActions={<button>Delete</button>}
      />
    );

    const btn = screen.getByText("Delete");
    fireEvent.click(btn);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when card is clicked", () => {
    const onClick = vi.fn();

    render(
      <PostCard
        title="Click me"
        author="User"
        status="published"
        onClick={onClick}
      />
    );

    fireEvent.click(screen.getByText("Click me"));

    expect(onClick).toHaveBeenCalled();
  });

  it("does not render invalid date", () => {
    render(
      <PostCard
        title="Test"
        author="User"
        status="draft"
        createdAt={new Date("invalid")}
      />
    );

    expect(screen.queryByText(/invalid date/i)).not.toBeInTheDocument();
  });
});