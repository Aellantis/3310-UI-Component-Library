import React from "react";
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
export declare function PostCard({ title, author, status, rawExcerpt, createdAt, onClick, footerActions, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
