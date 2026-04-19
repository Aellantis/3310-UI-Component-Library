import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  component: StatusBadge,
  title: "Components/StatusBadge",
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Published: Story = {
  args: { status: "published" },
};

export const Draft: Story = {
  args: { status: "draft" },
};

export const Archived: Story = {
  args: { status: "archived" },
};

export const WithIcon: Story = {
  args: { status: "published", showIcon: true },
};

export const Small: Story = {
  args: { status: "draft", size: "sm" },
};