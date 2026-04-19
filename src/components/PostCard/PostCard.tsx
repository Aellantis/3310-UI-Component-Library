import React from "react";
import { StatusBadge } from "../StatusBadge/StatusBadge";

type Status = "draft" | "published" | "archived";

type Props = {
  title: string;
  author: string;
  status: Status;
  rawExcerpt?: string;
  createdAt?: Date;
  onClick?: () => void;
  footerActions?: React.ReactNode;
};

export function PostCard({
  title,
  author,
  status,
  rawExcerpt,
  createdAt,
  onClick,
  footerActions,
}: Props) {
  const isValidDate =
    createdAt instanceof Date && !isNaN(createdAt.getTime());

  return (
    <div
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <StatusBadge status={status} size="sm" />
      <h3>{title}</h3>
      <p>by {author}</p>

      {rawExcerpt && <p>{rawExcerpt}</p>}

      {isValidDate && (
        <time>{createdAt!.toLocaleDateString()}</time>
      )}

      {footerActions && (
        <div onClick={(e) => e.stopPropagation()}>
          {footerActions}
        </div>
      )}
    </div>
  );
}