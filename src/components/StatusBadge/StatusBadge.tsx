import React from "react";

type Status = "draft" | "published" | "archived";

type Props = {
  status: Status;
  size?: "sm" | "md";
  showIcon?: boolean;
};

export function StatusBadge({ status, size = "md", showIcon = false }: Props) {
  const config = {
    draft: { color: "#374151", bg: "#f3f4f6", label: "Draft" },
    published: { color: "#166534", bg: "#dcfce7", label: "Published" },
    archived: { color: "#92400e", bg: "#fef3c7", label: "Archived" },
  };

  const c = config[status];

  return (
    <span
      data-testid="status-badge"
      style={{
        background: c.bg,
        color: c.color,
        fontSize: size === "sm" ? "0.75rem" : "0.875rem",
      }}
    >
      {showIcon && "✓ "}{c.label}
    </span>
  );
}