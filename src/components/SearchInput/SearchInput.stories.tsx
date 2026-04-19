import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./SearchInput";
import { useState } from "react";

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: "Components/SearchInput",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "350px", width: "350px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <SearchInput value={value} onChange={setValue} placeholder="Search..." />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("hello world");
    return <SearchInput value={value} onChange={setValue} placeholder="Search..." />;
  },
};

export const Disabled: Story = {
  args: {
    value: "",
    placeholder: "Search...",
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div>
        <SearchInput value={value} onChange={setValue} placeholder="Type something..." />
        <p style={{ marginTop: "1rem" }}>Current value: {value}</p>
      </div>
    );
  },
};