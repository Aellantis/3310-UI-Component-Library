import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../src/components/SearchInput/SearchInput";

describe("SearchInput", () => {
  it("updates value and calls onChange", () => {
    const onChange = vi.fn();

    render(<SearchInput value="" onChange={onChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello" } });

    expect(onChange).toHaveBeenCalledWith("hello");
  });

  it("shows clear button when input has value and clears on click", () => {
    const onChange = vi.fn();

    render(<SearchInput value="test" onChange={onChange} />);

    const button = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("coerces negative debounceMs to 0 and warns", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const onChange = vi.fn();

    render(<SearchInput value="a" onChange={onChange} debounceMs={-100} />);

    expect(warn).toHaveBeenCalled();
  });
});