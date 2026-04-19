import type { Meta, StoryObj } from "@storybook/react";
import { PostCard } from "./PostCard";

const meta: Meta<typeof PostCard> = {
  component: PostCard,
  title: "Components/PostCard",
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    title: "Hello World",
    author: "Ashley",
    status: "published",
    rawExcerpt: "This is a short excerpt from the post.",
    createdAt: new Date("2024-01-15"),
  },
};

export const Draft: Story = {
  args: {
    title: "Work in Progress",
    author: "Ashley",
    status: "draft",
  },
};

export const Archived: Story = {
  args: {
    title: "Old Post",
    author: "Ashley",
    status: "archived",
    rawExcerpt: "This post has been archived.",
  },
};

export const WithFooterActions: Story = {
  args: {
    title: "Post With Actions",
    author: "Ashley",
    status: "published",
    footerActions: <button>Delete</button>,
  },
};

export const Clickable: Story = {
  args: {
    title: "Click me",
    author: "Ashley",
    status: "published",
    onClick: () => alert("Card clicked!"),
  },
};