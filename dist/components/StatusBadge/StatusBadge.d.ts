type Status = "draft" | "published" | "archived";
type Props = {
    status: Status;
    size?: "sm" | "md";
    showIcon?: boolean;
};
export declare function StatusBadge({ status, size, showIcon }: Props): import("react/jsx-runtime").JSX.Element;
export {};
